import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Form, Alert, Button, Container, Row, Col, Card, Image, Spinner } from 'react-bootstrap';
import { createPoll, startLoading, stopLoading } from '../actions';
import { _saveQuestion } from '../utils/_DATA';

function PollCreation() {
    const [optionOne, setoptionOne] = useState('');
    const [optionTwo, setoptionTwo] = useState('');
    const [error, setError] = useState('');
    const infoAuth = useSelector((state) => state.authUser);
    const isLoading = useSelector((state) => state.loading.isLoading);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOptionOneChange = (e) => {
        setoptionOne(e.target.value);
    };
    const handleOptionTwoChange = (e) => {
        setoptionTwo(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!optionOne || !optionTwo) {
            setError(`Option can't empty`);
            return;
        }

        const question = {
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: infoAuth.username,
        }
        dispatch(startLoading());

        _saveQuestion(question).then((question) => {
            dispatch(createPoll(question));

            dispatch(stopLoading());

            setError('');
            navigate("/");
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
                            <Form.Control type="text" placeholder="Enter option one" value={optionOne} onChange={handleOptionOneChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="optionTwo">
                            <Form.Label>Second Option:</Form.Label>
                            <Form.Control type="text" placeholder="Enter option two" value={optionTwo} onChange={handleOptionTwoChange} />
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