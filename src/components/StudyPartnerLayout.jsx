import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router';
import UserNameInput from './UserNameInput';

function StudyPartnerLayout({ currentUserName, setCurrentUserName }) {
  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Study Partner Finder
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/sessions">Browse Sessions</Nav.Link>
              <Nav.Link as={Link} to="/create">Create Session</Nav.Link>
              <Nav.Link as={Link} to="/my-sessions">My Sessions</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav>
            <Nav>
              <UserNameInput 
                currentUserName={currentUserName}
                setCurrentUserName={setCurrentUserName}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ marginTop: '2rem' }}>
        <Outlet />
      </Container>
    </div>
  );
}

export default StudyPartnerLayout;