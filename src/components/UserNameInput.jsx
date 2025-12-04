import React from 'react';
import { Navbar } from 'react-bootstrap';

function UserNameInput({ currentUserName, setCurrentUserName }) {
  return (
    <Navbar.Text className="text-white d-flex align-items-center gap-2">
      <label htmlFor="userName" className="mb-0">Your Name:</label>
      <input
        id="userName"
        type="text"
        placeholder="Enter your name..."
        value={currentUserName}
        onChange={(e) => setCurrentUserName(e.target.value)}
        className="form-control form-control-sm"
        style={{ width: '180px' }}
        aria-label="Enter your name"
      />
    </Navbar.Text>
  );
}

export default UserNameInput;