import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import CardWarningLogin from './CardWarningLogin'

function Home() {
    const infoAuth = useSelector((state) => state.authUser);

    return (
        <Container fluid='true'>
            {
                infoAuth.isLoggedIn ? (
                    <h1>AA</h1>
                ) : (
                    <CardWarningLogin />
                )
            }

        </Container>
    );
}

export default Home;