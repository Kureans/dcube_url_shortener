import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function UrlHeader(props) {
  console.log(props);
  const urlListNavLink = (props.isLoggedIn) ? <Nav.Link href="/urls">Your URLs</Nav.Link> : <></>;
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">URL Shortener</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            { urlListNavLink }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UrlHeader;