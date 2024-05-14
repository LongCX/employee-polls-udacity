import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
        <Navbar.Brand>Udacity Polls</Navbar.Brand>
        <Nav fill variant="underline" defaultActiveKey="/" className="me-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/leaderboard">Leaderboard</Nav.Link>
          <Nav.Link as={NavLink} to="/new-poll">New Poll</Nav.Link>
        </Nav>
        {
          infoAuth.isLoggedIn ?
            (
              <Nav>
                <Navbar.Text>{infoAuth.username},</Navbar.Text>
                <Nav.Link as={NavLink} to="/" onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            ) :
            (
              <Nav>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              </Nav>
            )
        }
      </Container>
    </Navbar>
  );
};

export default NavigationBar;