import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import { createPoll, updatePollOfUser, startLoading, stopLoading } from '../actions';
import { _saveQuestion } from '../utils/_DATA';

const PollCreation = () => {
    const [optionOne, setoptionOne] = useState('');
    const [optionTwo, setoptionTwo] = useState('');
    const [error, setError] = useState('');
    const infoAuth = useSelector((state) => state.authUser);
    const isLoading = useSelector((state) => state.loading.isLoading);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!optionOne || !optionTwo) {
            setError(`Option can't empty`);
            return;
        }
        dispatch(startLoading());
        _saveQuestion({ optionOneText: optionOne, optionTwoText: optionTwo, author: infoAuth.username, })
            .then((question) => {
                dispatch(createPoll(question));
                dispatch(updatePollOfUser(question));
                dispatch(stopLoading());
                setError('');
                navigate("/");
            })
            .catch((e) => {
                console.log("Error in handle create: ", e);
            })
    };

    return (
        <Container className="mt-5">
            <Row className="mx-auto text-center" style={{ width: '40rem' }}>
                <Col><h1>Would You Rather</h1></Col>
            </Row>
            <Row className="mx-auto" style={{ width: '40rem' }}>
                <Col className="mt-3 mb-3"><Image src="" roundedCircle /></Col>
            </Row>
            <Card className="mx-auto" style={{ width: '40rem' }}>
                <Card.Header as="h5">Create Your Own Poll</Card.Header>
                <Card.Body>
                    {error && <Alert key="danger" variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="optionOne">
                            <Form.Label>First Option:</Form.Label>
                            <Form.Control type="text" placeholder="Enter option one" value={optionOne} onChange={(e) => setoptionOne(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="optionTwo">
                            <Form.Label>Second Option:</Form.Label>
                            <Form.Control type="text" placeholder="Enter option two" value={optionTwo} onChange={(e) => setoptionTwo(e.target.value)} />
                        </Form.Group>
                        <Row className="text-center">
                            <Col>
                                {
                                    isLoading ?
                                        (<Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />Loading...</Button>) :
                                        (<Button variant="primary" type="submit">Create</Button>)
                                }

                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PollCreation;