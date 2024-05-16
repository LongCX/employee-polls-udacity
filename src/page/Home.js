import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import PollCard from '../components/PollCard';

function Home() {
    const noData = <span>Not data to display</span>;

    const infoAuth = useSelector((state) => state.authUser);
    const answerOfUser = (useSelector((state) => state.users.listUsers))[infoAuth.username].answers;
    const arrIdAnswerOfUser =  Object.keys(answerOfUser);

    const listPollsSortNewst = Object.values(useSelector((state) => state.polls.listPolls)).sort((a, b) => b.timestamp - a.timestamp);

    const listPollsNew = listPollsSortNewst.filter((poll) => !arrIdAnswerOfUser.includes(poll.id));
    const listPollsDone = listPollsSortNewst.filter((poll) => arrIdAnswerOfUser.includes(poll.id));

    return (
        <Container className="mt-5">
            <Card className="mx-auto" style={{ width: '60rem' }}>
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