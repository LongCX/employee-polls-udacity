import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginSuccess } from '../actions';
import { Form, Alert, Button, Container, Row, Col } from 'react-bootstrap';
//import bcrypt from 'bcrypt';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listUsers = useSelector((state) => state.users.listUsers);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError(`Username or password can't empty`);
            return;
        }
        if (!listUsers[username]) {
            setError('Invalid user name or password');
            return;
        }
        const isPwdValid = password === listUsers[username].password;
        if (!isPwdValid) {
            setError('Invalid user name or password');
            return;
        }
        dispatch(loginSuccess(username));
        setError('');
        navigate("/");
    };

    return (
        <Container fluid="md">
            <h2>Page login</h2>
            {error && <Alert key="danger" variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
                </Form.Group>
                <Row className="text-center">
                    <Col>
                        <Button variant="primary" type="submit">Login</Button>{' '}
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default Login;