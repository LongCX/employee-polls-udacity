import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginSuccess } from '../actions';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
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
        <Container className="mt-5">
            <Row className="mx-auto text-center" style={{ width: '40rem' }}>
                <Col><h1>Employee Polls</h1></Col>
            </Row>
            <Row className="mx-auto" style={{ width: '40rem' }}>
                <Col className="mt-3 mb-3"><Image src="" roundedCircle /></Col>
            </Row>
            <Card className="mx-auto" style={{ width: '40rem' }}>
                <Card.Header as="h5">Log in</Card.Header>
                <Card.Body>
                    {error && <Alert key="danger" variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>User:</Form.Label>
                            <Form.Control type="text" autoComplete='true' placeholder="Enter username" value={username} onChange={handleUsernameChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
                        </Form.Group>
                        <Row className="text-center">
                            <Col>
                                <Button variant="primary" type="submit">Login</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;