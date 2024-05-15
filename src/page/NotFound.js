import { Alert, Container } from 'react-bootstrap';

function NotFound() {

    return (
        <Container>
            <Alert className="mx-auto mt-5" style={{ width: '40rem' }} variant="danger">
                <Alert.Heading>URL not found </Alert.Heading>
            </Alert>
        </Container>
    );
}

export default NotFound;