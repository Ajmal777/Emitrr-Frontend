import { Table, Tooltip } from "antd";
import React from "react";
import getProficiencyLevel from "./getProficiencyLevel";

const Stats = ({ data }) => {
    function filterData(data) {
        const newData = [];
        const levels = ["easy", "medium", "hard"];
        
        for (const language of data) {
            const obj = {};
            obj.solved = 0;
            obj.attempted = 0;

            for (const level of levels) {
                obj.solved += language.proficiency[level].solved;
                obj.attempted += language.proficiency[level].total;
            }

            obj.score = language.score;
            obj.proficiency = getProficiencyLevel(obj.solved, obj.attempted);
            obj.status = language.completed ? "Finished" : "In progress";
            obj.language = language.language;
            newData.push(obj);
        }
        return newData;
    }
    const columns = [
        {
            title: "Language",
            dataIndex: "language",
        },
        {
            title: "Solved",
            dataIndex: "solved",
        },
        {
            title: "Attempted",
            dataIndex: "attempted",
        },
        {
            title: "Proficienct level",
            dataIndex: "proficiency",
        },
        {
            title: "Score",
            dataIndex: "score",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (val) => <Tooltip title="Status is marked as finished if you correctly answer atleast 70% of attempted questions">{val}</Tooltip>
        },
    ];
    return (
        <Table
            columns={columns}
            style={{ marginTop: "1rem" }}
            dataSource={filterData(data)}
        />
    );
};

export default Stats;
