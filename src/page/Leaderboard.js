import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
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
                            <th className="text-center">Answers</th>
                            <th className="text-center">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataLeaderBoard.map((data, index) => (
                            <tr key={index}>
                                <td><Image style={{ width: '3rem' }} src={listUsers[data.user].avatarURL} roundedCircle /> {listUsers[data.user].name} <Badge bg="secondary">{data.user}</Badge></td>
                                <td className="text-center">{data.answerCount}</td>
                                <td className="text-center">{data.questionCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
}

export default Leaderboard;