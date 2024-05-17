import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

const NotFound = () => {

    return (
        <Container>
            <Alert className="mx-auto mt-5" style={{ width: '40rem' }} variant="danger">
                <Alert.Heading>URL not found </Alert.Heading>
            </Alert>
        </Container>
    );
}

export default NotFound;