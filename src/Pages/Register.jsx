import React, { useContext } from "react";
import axios from "axios";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../Context/Notification";

const Register = () => {
    const { onError, onSuccess } = useContext(NotificationContext);
    const navigate = useNavigate();

    const onFinish = (values) => {
        const url = import.meta.env.VITE_BACKEND_URL;
        axios
            .post(`${url}/user/register`, values)
            .then((res) => {
                onSuccess("Registeration", "Successful");
                navigate("/");
            })
            .catch((err) => {
                const res = err.response;
                onError(res.statusText, res.data.message);
                console.log(err);
            });
    };

    return (
        <>
            <Form
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
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: "Please input your name!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Enter a valid email",
                            type: "email",
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

export default Register;
