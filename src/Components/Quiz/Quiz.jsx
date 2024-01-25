import React, { useContext, useEffect, useState } from "react";
import filterQuestions from "../../Functions/filterQuestions";
import Question from "../Common/Question";
import axios from "axios";
import { StoreContext } from "../../Context/Store";
import { NotificationContext } from "../../Context/Notification";
import { Spin } from "antd";
import QuizResult from "./QuizResult";

// dMap -> Difficulty Map
const dMap = {
    1: "easy",
    2: "medium",
    3: "hard",
};

const Quiz = ({ questions, language, turns, setShowQuiz }) => {
    const { URL, token } = useContext(StoreContext);
    const { onError } = useContext(NotificationContext);

    // difficulty level
    const [questionNumber, setQuestionNumber] = useState(0);
    const [level, setLevel] = useState(1);
    const [questionList, setQuestionList] = useState(() =>
        filterQuestions(questions)
    );
    const [index, setIndex] = useState([0, 0, 0]);
    const [userAnswer, setUserAnswer] = useState({});
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState();

    useEffect(() => {
        if(questionList){
            setLoading(false);
        }
    }, [questionList]);

    function handleSelect(option) {
        if(!option){
            onError("Error", "Select an option before moving on to the next question.")
            return;
        }
        const questionObj = questionList[dMap[level]][index[level - 1]];
        const id = questionObj._id;
        setIndex((arr) => {
            arr[level - 1]++;
            return arr;
        });
        if (questionObj.answer === option) {
            setLevel((d) => (d == 3 ? 3 : d + 1));
        } else {
            setLevel((d) => (d == 1 ? 1 : d - 1));
        }
        setUserAnswer((obj) => ({ ...obj, [id]: option }));
        setQuestionNumber((v) => v + 1);
    }

    useEffect(() => {
        if(questionNumber == turns){
            handleSubmitQuiz();
        }
    }, [questionNumber])

    function handleSubmitQuiz() {
        setLoading(true);
        axios
            .post(
                `${URL}/question/eval`,
                { data: { responseList: userAnswer, language } },
                { headers: { token } }
            )
            .then((res) => {
                setResult(res.data.data);
            })
            .catch((err) => {
                const res = err.response;
                onError(res.statusText, res.data.message);
            })
            .finally(() => setLoading(false));
    }
    return (
        <div>
            {loading && (
                <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin>
            )}
            {!loading && questionNumber <= turns && (
                <Question
                    data={questionList[dMap[level]][index[level - 1]]}
                    handleAnswer={handleSelect}
                    level={dMap[level]}
                    lastQuestion={questionNumber === turns ? true : false}
                />
            )}
            {!loading && result && <QuizResult data={result} setShowQuiz={setShowQuiz} />}
        </div>
    );
};

export default Quiz;
