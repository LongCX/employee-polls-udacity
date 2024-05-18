import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import { logout } from '../actions';

const NavigationBar = () => {
  const infoAuth = useSelector((state) => state.authUser);
  const listUsers = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand>Udacity Polls</Navbar.Brand>
        <Nav fill variant="underline" defaultActiveKey="/" className="me-auto">
          <Nav.Link data-testid="home" as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link data-testid="leaderboard" as={NavLink} to="/leaderboard">Leaderboard</Nav.Link>
          <Nav.Link data-testid="add" as={NavLink} to="/add">New Poll</Nav.Link>
        </Nav>
        {
          infoAuth.isLoggedIn ?
            (
              <Nav>
                <Navbar.Text><Image style={{ width: '2rem' }} src={listUsers[infoAuth.username].avatarURL} roundedCircle /> {infoAuth.username},</Navbar.Text>
                <Nav.Link as={NavLink} to="/" onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            ) :
            (
              <Nav>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </Nav>
              
            )
        }
      </Container>
    </Navbar>
  );
};

export default NavigationBar;