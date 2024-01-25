import { Button, Card, Form, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/Store";
import { UserContext } from "../Context/User";
import axios from "axios";
import { NotificationContext } from "../Context/Notification";
import Quiz from "../Components/Quiz/Quiz";
import FlexBox from "../Components/Common/FlexBox";

const Exercises = () => {
    const { languages, URL, token } = useContext(StoreContext);
    const { localUserData } = useContext(UserContext);
    const { onError } = useContext(NotificationContext);

    const preferredLanguage = localUserData.languagePreference;

    const [select, setSelect] = useState(preferredLanguage);
    const [showQuiz, setShowQuiz] = useState(false);
    const [questions, setQuestions] = useState();

    function getOptions() {
        return languages.map((lang) => {
            return {
                value: lang,
                label: lang[0].toUpperCase() + lang.substr(1),
            };
        });
    }

    function start() {
        axios
            .get(`${URL}/language/${select}`, {
                headers: { token },
                params: { perPage: 30 },
            })
            .then((res) => {
                setQuestions(res.data.data);
                setShowQuiz(true);
            })
            .catch((err) => {
                console.log(err);
                const res = err.response;
                onError(res.statusText, res.data.message);
            });
    }

    return (
        <div>
            {!showQuiz && (
                <>
                    <FlexBox flexDir={"column"}>
                        <Form.Item
                            style={{ marginBottom: "0px !important" }}
                            label="Select a language: "
                        >
                            <Select
                                onChange={(e) => setSelect(e)}
                                defaultValue={
                                    preferredLanguage[0].toUpperCase() +
                                    preferredLanguage.substr(1)
                                }
                                style={{ width: 120 }}
                                options={getOptions()}
                            />
                        </Form.Item>
                        <Button type="primary" onClick={start}>
                            Start Quiz
                        </Button>
                    </FlexBox>
                    <FlexBox>
                        <Card
                            title="Instructions"
                            style={{
                                marginTop: "2.5rem",
                                width: 500,
                            }}
                        >
                            <ul>
                                <li>You will be given 10 questions.</li>
                                <li>You have to select one option and click next.</li>
                                <li>For every correct answer, the difficulty of the next question will increase.</li>
                                <li>For every wrong answer, the difficulty of the next question will decrease.</li>
                                <li>Every easy level questions you solve, you'll get 1 point.</li>
                                <li>For every medium level questions, you'll get 3 points.</li>
                                <li>And for every hard level questions, you'll get 5 points.</li>
                            </ul>
                        </Card>
                    </FlexBox>
                </>
            )}
            {showQuiz && (
                <>
                    <Quiz
                        questions={questions}
                        language={select}
                        setShowQuiz={setShowQuiz}
                        turns={10}
                    />
                </>
            )}
        </div>
    );
};

export default Exercises;
