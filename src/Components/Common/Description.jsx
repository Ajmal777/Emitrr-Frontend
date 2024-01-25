import { Descriptions } from "antd";
import React from "react";

const Description = ({ level }) => {
    const scoreMap = {
        easy: 1,
        medium: 3,
        hard: 5,
    }
    const items = [
        {
            key: "1",
            label: "Question Difficulty",
            children: level,
        },
        {
            key: "2",
            label: "Max Score",
            children: scoreMap[level],
        },
    ];
    return <Descriptions style={{ marginTop: "2.5rem"}} items={items} />;
};

export default Description;
