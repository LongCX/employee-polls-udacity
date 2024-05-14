import React from 'react';
import { Card } from 'react-bootstrap';

function CardWarningLogin() {

    return (
        <Card bg="light" className="mx-auto mt-5" style={{ width: '25rem' }}>
            <Card.Header>Infomation</Card.Header>
            <Card.Body>
                <Card.Title>Warning </Card.Title>
                <Card.Text>
                    Need login to see content
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CardWarningLogin;