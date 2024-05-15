import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import formatDate from '../utils/helpers';

function PollCard({ poll }) {

    return (
        <Col xs={3}>
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
    );
}

export default PollCard;