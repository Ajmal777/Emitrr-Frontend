import { Button, Form, Input, Popconfirm, Select, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/User";
import axios from "axios";
import { NotificationContext } from "../Context/Notification";
import { StoreContext } from "../Context/Store";
import { useNavigate } from "react-router-dom";
import FlexBox from "../Components/Common/FlexBox";
import LanguageSelect from "../Components/Common/LanguageSelect";
import Stats from "../Components/Stats/Stats";

const Profile = () => {
    const { onError, onSuccess } = useContext(NotificationContext);
    const { localUserData, setUserData, logoutUser } = useContext(UserContext);
    const { token, URL, setToken, loading, setLoading } =
        useContext(StoreContext);

    const userPreferredLanguage = localUserData?.languagePreference;

    const [editProfile, setEditProfile] = useState(false);
    const [preferredLanguage, setPreferredLanguage] = useState(
        userPreferredLanguage
    );

    useEffect(() => {
        setUserData();
    }, []);

    useEffect(() => {
        if (localUserData != undefined) {
            setLoading(false);
        }
    }, [localUserData]);

    const navigate = useNavigate();

    function submitData(values) {
        axios
            .put(`${URL}/profile`, values, { headers: { token } })
            .then((res) => {
                onSuccess("Success", res.data.message);
                setUserData();
            })
            .catch((err) => {
                const res = err.response;
                onError(res.statusText, res.data.message);
            });
    }

    function changePreferredLanguage() {
        axios
            .put(
                `${URL}/profile/language?preferredLanguage=${preferredLanguage}`,
                {},
                { headers: { token } }
            )
            .then((res) => {
                onSuccess("Success", res.data.message);
                setUserData();
            })
            .catch((err) => {
                const res = err.response;
                onError(res.statusText, res.data.message);
            });
    }
    return (
        <>
            {loading && (
                <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin>
            )}
            {!loading && (
                <div className="profile">
                    <FlexBox>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600, flexGrow: 1 }}
                            disabled={!editProfile}
                            onFinish={submitData}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ message: "Please input your name!" }]}
                            >
                                <Input placeholder={localUserData?.name} />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        message: "Enter a valid email",
                                        type: "email",
                                    },
                                ]}
                            >
                                <Input placeholder={localUserData?.email} />
                            </Form.Item>
                            {editProfile && (
                                <>
                                    <Form.Item
                                        label="Password"
                                        name="oldPassword"
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item
                                        label="New Password"
                                        name="newPassword"
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item
                                        wrapperCol={{
                                            offset: 10,
                                            span: 16,
                                        }}
                                    >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form>
                    </FlexBox>

                    <FlexBox>
                        <LanguageSelect
                            label={"Preferred langugae"}
                            onChange={(e) => setPreferredLanguage(e)}
                            defaultValue={
                                (userPreferredLanguage?.[0]?.toUpperCase() +
                                userPreferredLanguage?.substr(1))
                            }
                        >
                            <Button
                                style={{ marginLeft: "1rem" }}
                                onClick={changePreferredLanguage}
                                type="primary"
                            >
                                Change Preference
                            </Button>
                        </LanguageSelect>
                    </FlexBox>
                    
                    <FlexBox style={{ gap: "1rem" }}>
                        <Button
                            type="primary"
                            onClick={() => setEditProfile(!editProfile)}
                        >
                            {!editProfile ? "Edit profile" : "Cancel"}
                        </Button>
                        <Popconfirm
                            title="Logout"
                            description="Are you sure you want to logout?"
                            onConfirm={() => {
                                logoutUser();
                                setToken("");
                                navigate("/");
                            }}
                        >
                            <Button danger type="primary">
                                Logout
                            </Button>
                        </Popconfirm>
                    </FlexBox>

                    <Stats data={localUserData.progress}/>
                </div>                
            )}
        </>
    );
};

export default Profile;
