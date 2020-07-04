import React from "react";
import {Form, Input, Button} from 'antd';
import styled from "styled-components";
import {useStores} from "../stores";

const Wrapper = styled.div`
    max-width: 600px;
    margin: 10px auto;
    padding: 10px;
    box-shadow: 1px 1px 1px rgba(0,0,0,0.2);
`;

const Title = styled.h1`
    text-align: center;
`;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 18,
    },
};

const Component = () => {
    const {AuthStore} = useStores();

    const onFinish = values => {
        console.log('Success:', values);
        AuthStore.setUsername(values.username);
        AuthStore.setPassword(values.password);
        AuthStore.register().then(() => {
            window.alert("Register-注册成功");
        }).catch(() => {
            window.alert("Register-注册失败");
        });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Wrapper>
            <Title>注册</Title>
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '输入用户名',
                        },
                        {
                            min: 4,
                            max: 10,
                            message: '长度为4～10个字符'
                        },
                        () => ({
                            validator(rule, value) {
                                if (/\W/.test(value)) {
                                    return Promise.reject('只能包含数字字母和下划线');
                                }
                                return Promise.resolve();
                            }
                        })
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '输入密码',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label="确认密码"
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '再次确认密码',
                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('两次输入的密码不一致!');
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </Wrapper>
    );
};

export default Component;

