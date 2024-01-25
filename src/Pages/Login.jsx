import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input } from "antd";
import { UserContext } from "../Context/User";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../Context/Notification";
import { StoreContext } from "../Context/Store";

const Login = () => {
    const { setLogin, setUserData, login } = useContext(UserContext);
    const { onError, onSuccess } = useContext(NotificationContext);
    const { initializeStore, setLoading } = useContext(StoreContext);

    const navigate = useNavigate();

    const onFinish = (values) => {
        const url = import.meta.env.VITE_BACKEND_URL;
        axios
            .post(`${url}/user/login`, values)
            .then((res) => {
                setLoading(true);
                localStorage.setItem("token", res.data.data.token);
                setUserData();
                initializeStore();
                setLogin(true);
                onSuccess("Login", "Successful");
            })
            .catch((err) => {
                console.log(err);
                const res = err.response;
                onError(res.statusText, res.data.message);
            });
    };

    useEffect(() => {
        if(login == true){
            navigate('/profile');
        }
    }, [login])
    
    return (
        <>
            <Form
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    margin: "auto",
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Enter a valid email!",
                            type: "email"
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Login;
