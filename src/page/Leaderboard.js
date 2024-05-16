import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';

function Leaderboard() {
    const listUsers = useSelector((state) => state.users.listUsers);
    let dataLeaderBoard = Object.entries(listUsers).map(([user, value]) => {
        let answerCount = Object.keys(value.answers).length;
        let questionCount = value.questions.length;
        return {
            user,
            answerCount,
            questionCount
        };
    });

    return (
        <Container className="mt-5">
            <Card className="mx-auto" style={{ width: '50rem' }}>
                <Table>
                    <thead>
                        <tr>
                            <th>Users</th>
                            <th>Answers</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataLeaderBoard.map((data, index) => (
                            <tr key={index}>
                                <td>{data.user}</td>
                                <td>{data.answerCount}</td>
                                <td>{data.questionCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
}

export default Leaderboard;