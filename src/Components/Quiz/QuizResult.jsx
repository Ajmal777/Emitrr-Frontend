import React from "react";
import { Button, Result } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

const QuizResult = ({ data, setShowQuiz }) => {
    const percentageScore = Math.round((data.score / data.totalScore) * 100);

    return (
        <div>
            <Result
                icon={
                    data.completedExercise ? (
                        <SmileOutlined />
                    ) : (
                        <FrownOutlined />
                    )
                }
                title={`You scored ${percentageScore}%. ${
                    data.completedExercise
                        ? "Congratulations on clearing this exercise."
                        : "You need 70% score to clear this exercise."
                }`}
                extra={
                    <Button
                        type="primary"
                        onClick={() => setShowQuiz(false)}
                    >
                        {data.completedExercise
                            ? "Back to Exercises?"
                            : "Retry?"}
                    </Button>
                }
            />
        </div>
    );
};

export default QuizResult;
