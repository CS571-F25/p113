import React from 'react';

function About() {
  return (
    <div>
      <h3 className="mb-4">About Study Partner Finder</h3>
      <div className="card">
        <div className="card-body">
          <p className="lead">
            Study Partner Finder helps UW-Madison students connect with peers to make studying easier
          </p>
          <h4 className="mt-4">Features</h4>
          <ul>
            <li>Browse upcoming study sessions for your courses</li>
            <li>Create and host your own study sessions</li>
            <li>Join sessions with available spots</li>
            <li>Filter and search by course or keywords</li>
            <li>See if your friends are attending</li>
          </ul>
          <h4 className="mt-4">How to Use</h4>
          <ol>
            <li>Enter your name in the header</li>
            <li>Browse available study sessions</li>
            <li>Join sesssions that fit your schedule</li>
            <li>Create your own sessions to find study partners</li>
          </ol>
          <div className="alert alert-info mt-4">
            <strong>Created by:</strong> Garrick Fuller<br />
            <strong>Course:</strong> CS571 - Building User Interfaces
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;