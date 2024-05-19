import { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import PollCard from '../components/PollCard';

const Home = () => {
    const noData = <span>Not data to display</span>;
    const [tabActive, setTabActive] = useState('unanswer');
    const infoAuth = useSelector((state) => state.authUser);
    const answerOfUser = (useSelector((state) => state.users.users))[infoAuth.username].answers;
    const arrIdAnswerOfUser = Object.keys(answerOfUser);

    const listPollsSortNewst = Object.values(useSelector((state) => state.questions.questions)).sort((a, b) => b.timestamp - a.timestamp);

    const listPollsNew = listPollsSortNewst.filter((poll) => !arrIdAnswerOfUser.includes(poll.id));
    const listPollsDone = listPollsSortNewst.filter((poll) => arrIdAnswerOfUser.includes(poll.id));

    return (
        <Container className="mt-5">
            <Row className="text-center">
                <Col>
                    <ToggleButtonGroup type="radio" name="options" defaultValue='unanswer'>
                        <ToggleButton id="tbg-radio-1" value='unanswer' onChange={(e) => setTabActive(e.target.value)}>
                            Unanswer questions
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-2" value='answer' onChange={(e) => setTabActive(e.target.value)}>
                            Answer questions
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            </Row>
            {
                tabActive === 'unanswer' ? (
                    <Card className="mx-auto mt-3" style={{ width: '60rem' }}>
                        <Card.Header as="h5">New Polls</Card.Header>
                        <Card.Body>
                            <Row>
                                {
                                    listPollsNew.length > 0 ? listPollsNew.map((poll, index) => (
                                        <PollCard key={index} poll={poll} />
                                    )) : noData
                                }
                            </Row>
                        </Card.Body>
                    </Card>
                ) : (
                    <Card className="mx-auto mt-3" style={{ width: '60rem' }}>
                        <Card.Header as="h5">Done</Card.Header>
                        <Card.Body>
                            <Row>
                                {
                                    listPollsDone.length > 0 ? listPollsDone.map((poll, index) => (
                                        <PollCard key={index} poll={poll} />
                                    )) : noData
                                }
                            </Row>
                        </Card.Body>
                    </Card>
                )
            }
        </Container>
    );
}

export default Home;