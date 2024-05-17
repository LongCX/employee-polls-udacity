import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Link, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const infoAuth = useSelector((state) => state.authUser);

    if (!infoAuth.isLoggedIn) {
        return (
            <Card bg="light" className="mx-auto mt-5" style={{ width: '25rem' }}>
                <Card.Header>Unauthorized </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Need <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to see content
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    return <Outlet />
}

export default ProtectedRoute;