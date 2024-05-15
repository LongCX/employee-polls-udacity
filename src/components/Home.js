import { useSelector } from 'react-redux';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import formatDate from '../utils/helpers';

function Home() {
    // Get list answer polls of user
    const infoAuth = useSelector((state) => state.authUser);
    const answerOfUser = (useSelector((state) => state.users.listUsers))[infoAuth.username];
    const arrAnswerOfUser = Object.entries(answerOfUser.answers).map(([ida]) => ({ ida }));

    // Get list polls with sort data newest
    const pollCreated = Object.values(useSelector((state) => state.polls.pollCreated));
    const listQuestions = Object.values(useSelector((state) => state.polls.listQuestions));
    const combinePollsSortNewst = listQuestions.concat(pollCreated).sort((a, b) => b.timestamp - a.timestamp);

    // List polls to render
    const listPollsNew = combinePollsSortNewst.filter((poll) => !poll.id.includes(arrAnswerOfUser.ida));
    const listPollsDone = combinePollsSortNewst.filter((poll) => poll.id.includes(arrAnswerOfUser.ida));

    return (
        <Container className="mt-5">
            <Card className="mx-auto" style={{ width: '60rem' }}>
                <Card.Header as="h5">New questions</Card.Header>
                <Card.Body>
                    <Row>
                        {
                            listPollsNew.length > 0 ? listPollsNew.map((poll) => (
                                <Col xs={3} key={poll.id}>
                                    <Card className="mb-2 mt-2" style={{ width: '13rem' }}>
                                        <Card.Body>
                                            <Card.Title>{poll.author}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {formatDate(poll.timestamp)}
                                            </Card.Subtitle>
                                            <Button variant="primary">Show</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )) : <span>Not data to display</span>
                        }
                    </Row>
                </Card.Body>
            </Card>
            <Card className="mx-auto mt-3" style={{ width: '60rem' }}>
                <Card.Header as="h5">Done</Card.Header>
                <Card.Body>
                    <Row>
                        {
                            listPollsDone.length > 0 ? listPollsDone.map((poll) => (
                                <Col xs={3} key={poll.id}>
                                    <Card className="mb-2 mt-2" style={{ width: '13rem' }}>
                                        <Card.Body>
                                            <Card.Title>{poll.author}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {formatDate(poll.timestamp)}
                                            </Card.Subtitle>
                                            <Button variant="primary">Show</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )) : <span>Not data to display</span>
                        }
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Home;