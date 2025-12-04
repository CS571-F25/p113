import React from 'react';
import { Card, Button } from 'react-bootstrap';

function SessionCard({ session, currentUserName, onJoin, onLeave, onDelete }) {
  const isJoined = session.attendees.includes(currentUserName);
  const isFull = session.attendees.length >= session.maxSize;
  const canJoin = currentUserName && !isJoined && !isFull;
  const isCreator = session.creator === currentUserName || session.attendees[0] === currentUserName;

  const dt = new Date(session.date);

  return (
    <Card style={{ margin: '0.5rem 0', padding: '0.5rem' }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <span className="badge bg-primary me-2">{session.course}</span>
            <h5 className="d-inline">{session.title}</h5>
            {isCreator && (
              <span className="badge bg-info ms-2">You created this</span>
            )}
          </div>
          <span className={`badge ${isFull ? 'bg-danger' : 'bg-success'}`}>
            {session.attendees.length} / {session.maxSize}
          </span>
        </div>
        
        <p className="mb-2">
          <strong>📅 Date:</strong> {dt.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </p>
        <p className="mb-2">
          <strong>🕐 Time:</strong> {session.startTime} - {session.endTime}
        </p>
        <p className="mb-2">
          <strong>📍 Location:</strong> {session.location}
        </p>
        <p className="mb-3">{session.description}</p>
        
        {session.attendees.length > 0 && (
          <div className="mb-3">
            <strong>👥 Attendees:</strong>
            <div className="mt-1">
              {session.attendees.map((attendee, idx) => (
                <span key={idx} className="badge bg-secondary me-1">
                  {attendee}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="d-flex gap-2">
          {canJoin && (
            <Button variant="success" onClick={() => onJoin(session.id)}>
              Join Session
            </Button>
          )}
          {isJoined && !isCreator && (
            <Button variant="warning" onClick={() => onLeave(session.id)}>
              Leave Session
            </Button>
          )}
          {isCreator && (
            <Button variant="danger" onClick={() => onDelete(session.id)}>
              Delete Session
            </Button>
          )}
          {!currentUserName && !isJoined && (
            <Button variant="secondary" disabled>
              Set your name to join
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default SessionCard;