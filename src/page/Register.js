import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginSuccess, register } from '../actions';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import bcrypt from 'bcryptjs';

const Register = () => {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listUsers = useSelector((state) => state.users.users);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password || !fullname) {
            setError(`Username or password or fullname can't empty`);
            return;
        }
        if (listUsers[username]) {
            setError('Username already exist, try other username');
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(password, salt);
        const newUser = {
            username: username,
            fullname: fullname,
            password: hashPwd,
        }
        dispatch(register(newUser));
        dispatch(loginSuccess(username));
        setError('');
        navigate("/");
    };

    return (
        <Container className="mt-2">
            <Row className="mx-auto text-center" style={{ width: '40rem' }}>
                <Col><h1>Employee Polls</h1></Col>
            </Row>
            <Row className="mx-auto text-center" style={{ width: '40rem' }}>
                <Col className="mt-3 mb-3"><Image style={{ width: '20rem' }} src="/assets/images/login/work.jpg" /></Col>
            </Row>
            <Card className="mx-auto" style={{ width: '40rem' }}>
                <Card.Header as="h5">Register</Card.Header>
                <Card.Body>
                    {error && <Alert key="danger" variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>User:</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="fullname">
                            <Form.Label>Full name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter full name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Row className="text-center">
                            <Col>
                                <Button variant="primary" type="submit">Register</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Register;