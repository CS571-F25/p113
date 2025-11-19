import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router';

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
              <Navbar.Text className="text-white d-flex align-items-center gap-2">
                <label className="mb-0">Your Name:</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={currentUserName}
                  onChange={(e) => setCurrentUserName(e.target.value)}
                  className="form-control form-control-sm"
                  style={{ width: '180px' }}
                />
              </Navbar.Text>
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