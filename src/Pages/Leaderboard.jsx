import React, { useContext, useEffect, useState } from "react";
import FlexBox from "../Components/Common/FlexBox";
import LanguageSelect from "../Components/Common/LanguageSelect";
import { StoreContext } from "../Context/Store";
import axios from "axios";
import { NotificationContext } from "../Context/Notification";
import { Spin, Table } from "antd";

const Leaderboard = () => {
    const { URL, token } = useContext(StoreContext);
    const { onError } = useContext(NotificationContext);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('English')
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        handleChange('english');
    }, []);

    function handleChange(e) {
        setValue(e);
        setLoading(true);
        axios
            .get(`${URL}/profile/leaderboard/${e}`, {
                headers: { token },
            })
            .then((res) => {
                setTableData(filterData(res.data.data, e));
            })
            .catch((err) => {
                console.log(err);
                const res = err.response;
                onError(res.statusText, res.data.message);
            })
            .finally(() => setLoading(false));
    }

    function filterData(data, language) {
        const list = [];
        data.forEach((obj) => {
            const userObj = {};
            userObj.name = obj.name;
            userObj.language = language;
            for (const i of obj.progress) {
                if (i.language == language) {
                    userObj.score = i.score;
                    break;
                }
            }
            list.push(userObj);
        });
        return list.sort((a, b) => b.score - a.score);
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Language",
            dataIndex: "language",
            key: "language",
        },
        {
            title: "Score",
            dataIndex: "score",
            key: "score",
        },
    ];

    return (
        <div>
            <FlexBox>
                {!loading && (
                    <LanguageSelect
                        label="Select language"
                        onChange={handleChange}
                        defaultValue={value}
                    ></LanguageSelect>
                )}
                {loading && (
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                )}
            </FlexBox>
            {!loading && <Table columns={columns} dataSource={tableData} />}
        </div>
    );
};

export default Leaderboard;
