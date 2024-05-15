import { useSelector } from 'react-redux';
import { Container, Card, Row } from 'react-bootstrap';
import PollCard from '../components/PollCard';

function Home() {
    const noData = <span>Not data to display</span>;
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
                            listPollsNew.length > 0 ? listPollsNew.map((poll, index) => (
                                <PollCard key={index} poll={poll} />
                            )) : noData
                        }
                    </Row>
                </Card.Body>
            </Card>
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
        </Container>
    );
}

export default Home;