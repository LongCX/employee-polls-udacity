import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { answerVotePoll, answerVoteOfUser } from '../actions';
import NotFound from './NotFound';
//import { _saveQuestionAnswer } from '../utils/_DATA'

function Poll() {
    const [isVoted, setIsVoted] = useState(false);
    const dispatch = useDispatch();
    const { questionId } = useParams();

    const username = useSelector((state) => state.authUser.username);
    const listPolls = useSelector((state) => state.polls.listPolls);
    const infoPoll = listPolls[questionId];

    if (typeof infoPoll === "undefined") {
        return <NotFound />
    }

    const isVoteOptionOne = (infoPoll.optionOne.votes).includes(username);
    const isVoteOptionTwo = (infoPoll.optionTwo.votes).includes(username);
    const voteOneOfPoll = infoPoll.optionOne.text;
    const voteTwoOfPoll = infoPoll.optionTwo.text;

    const handleVote = (e) => {
        const optionAnswer = e.target.value

        dispatch(answerVoteOfUser({ user: username, qid: questionId, answer: optionAnswer }));
        dispatch(answerVotePoll({ user: username, qid: questionId, answer: optionAnswer }));

        // Comment because error occurred when call API with message: Uncaught TypeError: Cannot read properties of undefined (reading 'answers') at _DATA.js:193:1
        // I think cause is: redux app can't write data to file js so data not mapping
        /* _saveQuestionAnswer({ username, questionId, optionAnswer })
            .then(() => {
                setIsVoted(true);
            })
            .catch((e) => {
                console.log("Error in handle toggle: ", e);
            }) */
        setIsVoted(true);
    };

    return (
        <Container className="mt-5">
            <Row className="mx-auto text-center" style={{ width: '70rem' }}>
                <Col><h1>Poll by {username}</h1></Col>
            </Row>
            <Row className="mx-auto" style={{ width: '70rem' }}>
                <Col className="mt-3 mb-3"><Image src="" roundedCircle /></Col>
            </Row>
            <Card className="mx-auto" style={{ width: '70rem' }}>
                <Card.Header as="h5">Would You Rather</Card.Header>
                <Card.Body>
                    {(isVoted || isVoteOptionOne || isVoteOptionTwo) && <Alert key="warning" variant="warning">You was vote for this poll. Can't change your result vote !</Alert>}
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title as="h5">Option one to vote</Card.Title>
                                    <Card.Text>{voteOneOfPoll} {(isVoteOptionOne) && <Badge bg="success">voted</Badge>}</Card.Text>
                                    {
                                        (isVoted || isVoteOptionOne || isVoteOptionTwo) ? <Button variant="primary" disabled>Vote</Button> :
                                            <Button variant="primary" value="optionOne" onClick={handleVote} >Vote</Button>
                                    }
                                </Card.Body>
                            </Card>
                            {isVoteOptionOne && (
                                <Card className="mt-3" border="info">
                                    <Card.Body>
                                        <Card.Title as="h5">More information of your vote</Card.Title>
                                        <Card.Text>Number of people who voted for this option:  </Card.Text>
                                        <Card.Text>Percentage of people who voted for this option:  </Card.Text>
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title as="h5">Option two to vote</Card.Title>
                                    <Card.Text>{voteTwoOfPoll} {(isVoteOptionTwo) && <Badge bg="success">voted</Badge>}</Card.Text>
                                    {
                                        (isVoted || isVoteOptionOne || isVoteOptionTwo) ? <Button variant="primary" disabled>Vote</Button> :
                                            <Button variant="primary" value="optionTwo" onClick={handleVote} >Vote</Button>
                                    }
                                </Card.Body>
                            </Card>
                            {isVoteOptionTwo && (
                                <Card className="mt-3" border="info">
                                    <Card.Body>
                                        <Card.Title as="h5">More information of your vote</Card.Title>
                                        <Card.Text>Number of people who voted for this option:  </Card.Text>
                                        <Card.Text>Percentage of people who voted for this option:  </Card.Text>
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Poll;