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
import Spinner from 'react-bootstrap/Spinner';
import { answerVotePoll, answerVoteOfUser, startLoading, stopLoading } from '../actions';
import NotFound from './NotFound';
import { _saveQuestionAnswer, _saveQuestionAnswerForNewRegistUser } from '../utils/_DATA'
import { initUser } from '../utils/helpers';

const Poll = () => {
    const [option, setOption] = useState('');
    const dispatch = useDispatch();
    const { questionId } = useParams();

    const username = useSelector((state) => state.authUser.username);
    const listPolls = useSelector((state) => state.questions.questions);
    const listUsers = useSelector((state) => state.users.users);
    const isLoading = useSelector((state) => state.loading.isLoading);
    const infoPoll = listPolls[questionId];
    if (typeof infoPoll === "undefined") {
        return <NotFound />
    }

    const btnLoading = <Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />Loading...</Button>

    const isVoteOptionOne = (infoPoll.optionOne.votes).includes(username);
    const isVoteOptionTwo = (infoPoll.optionTwo.votes).includes(username);
    const voteOneOfPoll = infoPoll.optionOne.text;
    const voteTwoOfPoll = infoPoll.optionTwo.text;

    const numVoteOptionOneOfPoll = (infoPoll.optionOne.votes).length;
    const numVoteOptionTwoOfPoll = (infoPoll.optionTwo.votes).length;
    const totalVoteOfPoll = numVoteOptionOneOfPoll + numVoteOptionTwoOfPoll;
    const totalUsers = Object.keys(listUsers).length;
    const arrListUserVoted = (infoPoll.optionOne.votes).concat(infoPoll.optionTwo.votes).join(', ');
    const percentVoteOfPoll = (totalVoteOfPoll / totalUsers) * 100;

    const handleVote = (option) => {
        dispatch(startLoading());
        setOption(option);

        if (username.includes(initUser)) {
            _saveQuestionAnswer({ authedUser: username, qid: questionId, answer: option })
                .then(() => {
                    dispatch(answerVoteOfUser({ user: username, qid: questionId, answer: option }));
                    dispatch(answerVotePoll({ user: username, qid: questionId, answer: option }));
                    dispatch(stopLoading());
                })
                .catch((e) => {
                    console.log("Error in handle toggle: ", e);
                })
        } else { // Handle for function regist new user not have in _DATA.js
            _saveQuestionAnswerForNewRegistUser({ authedUser: username, qid: questionId, answer: option })
                .then(() => {
                    dispatch(answerVoteOfUser({ user: username, qid: questionId, answer: option }));
                    dispatch(answerVotePoll({ user: username, qid: questionId, answer: option }));
                    dispatch(stopLoading());
                })
                .catch((e) => {
                    console.log("Error in handle toggle: ", e);
                })
        }
    };

    return (
        <Container className="mt-5">
            <Row className="mx-auto text-center" style={{ width: '70rem' }}>
                <Col><h1>Poll by {infoPoll.author}</h1></Col>
            </Row>
            <Row className="mx-auto text-center" style={{ width: '70rem' }}>
                <Col className="mt-3 mb-3"><Image style={{ width: '10rem' }} src={listUsers[infoPoll.author].avatarURL} roundedCircle /></Col>
            </Row>
            <Card className="mx-auto" style={{ width: '70rem' }}>
                <Card.Header as="h5">Would You Rather</Card.Header>
                <Card.Body>
                    {(isVoteOptionOne || isVoteOptionTwo) && <Alert key="warning" variant="warning">You was vote for this poll. Can't change your result vote !</Alert>}
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title as="h5">Option one to vote</Card.Title>
                                    <Card.Text>{voteOneOfPoll} {(isVoteOptionOne) && <Badge bg="success">your vote</Badge>}</Card.Text>
                                    {
                                        (isVoteOptionOne || isVoteOptionTwo) ? <Button variant="primary" disabled>Vote</Button> :
                                            (isLoading && option === 'optionOne' ? btnLoading : <Button variant="primary" value="optionOne" onClick={(e) => handleVote(e.target.value)} >Vote</Button>)
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title as="h5">Option two to vote</Card.Title>
                                    <Card.Text>{voteTwoOfPoll} {(isVoteOptionTwo) && <Badge bg="success">your vote</Badge>}</Card.Text>
                                    {
                                        (isVoteOptionOne || isVoteOptionTwo) ? <Button variant="primary" disabled>Vote</Button> :
                                            (isLoading && option === 'optionTwo' ? btnLoading : <Button variant="primary" value="optionTwo" onClick={(e) => handleVote(e.target.value)} >Vote</Button>)
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {(isVoteOptionOne || isVoteOptionTwo) && (
                        <Row>
                            <Col>
                                <Card className="mt-3" border="info">
                                    <Card.Body>
                                        <Card.Title as="h5">Statistics for this vote</Card.Title>
                                        <Card.Text>Number of people who vote: <Badge bg="secondary">{totalVoteOfPoll}</Badge> {arrListUserVoted && (<span>({arrListUserVoted})</span>)}</Card.Text>
                                        <Card.Text>Percentage of people who vote: <Badge data-testid="percent" bg="secondary">{percentVoteOfPoll.toFixed(2)}%</Badge> </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>)}
                </Card.Body>
            </Card>

        </Container>
    );
}

export default Poll;