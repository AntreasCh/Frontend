import {LinkContainer} from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Menu ( ) {
    const dashboardClicked = localStorage.getItem('dashboardClicked');
    const handleDashboardClick = () => {
        if (!dashboardClicked) {
          alert('To access the dashboard please sign in!');
        }
      };
  return (
    <Navbar bg="light" expand="lg">

    <Container>
    <Navbar.Brand href="#">IC3</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="menu">

    <LinkContainer to="/admin"><Nav.Link>Login Page</Nav.Link></LinkContainer>
    <LinkContainer to="/admin"><Nav.Link onClick={handleDashboardClick}>Administrator Dashboard</Nav.Link></LinkContainer>
    <LinkContainer to="/register"><Nav.Link>Register Form</Nav.Link></LinkContainer>
    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
    );
}
export default Menu;