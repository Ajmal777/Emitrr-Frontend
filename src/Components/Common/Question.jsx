import { Button, Card, Radio, Space } from "antd";
import React, { useState } from "react";
import './Question.css'
import Description from "./Description";
const Question = ({ data, handleAnswer, lastQuestion, level }) => {
    const [value, setValue] = useState();
    return (
        <>
            <Card
                title={data.question}
                bordered={false}
                style={{
                    width: "100%",
                    margin: "1rem auto",
                    whiteSpace: "unset !important",
                }}
            >
                <Radio.Group onChange={(e) => setValue(e.target.value)}>
                    <Space direction="vertical">
                        {data.options.map((op) => (
                            <Radio key={op} value={op}>{op}</Radio>
                        ))}
                    </Space>
                </Radio.Group>
            </Card>
            {!lastQuestion && (
                <Button type="primary" onClick={() => handleAnswer(value)}>
                    Next
                </Button>
            )}
            {lastQuestion && (
                <Button
                    type="primary"
                    onClick={handleAnswer(value)}
                >
                    Submit
                </Button>
            )}
            <Description level={level} />
        </>
    );
};

export default Question;
