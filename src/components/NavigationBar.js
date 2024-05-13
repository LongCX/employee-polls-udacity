import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logout } from '../actions';

const NavigationBar = () => {
  const infoAuth = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">Udacity-Polls</Navbar.Brand>
        <Nav fill variant="tabs" defaultActiveKey="/" className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
          <Nav.Link href="/new-poll">New Poll</Nav.Link>
        </Nav>
        {
          infoAuth.isLoggedIn ?
            (
              <Nav>
                <Navbar.Text>{infoAuth.username},</Navbar.Text>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            ) :
            (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            )
        }
      </Container>
    </Navbar>
  );
};

export default NavigationBar;