import React, { useState } from 'react';
import SessionFilters from './sessions/SessionFilters';
import SessionCard from './sessions/SessionCard';

function BrowseSessions({ sessions, currentUserName, onJoin, onLeave }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const courses = [...new Set(sessions.map(s => s.course))];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = searchQuery === '' || 
      session.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = selectedCourse === '' || session.course === selectedCourse;
    
    return matchesSearch && matchesCourse;
  });

  return (
    <div>
      <h3 className="mb-4">Browse Study Sessions</h3>
      <SessionFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCourse={selectedCourse}
        onCourseChange={setSelectedCourse}
        courses={courses}
      />
      
      {filteredSessions.length === 0 ? (
        <div className="alert alert-info">
          No sessions found. Try adjusting your filters or create a new session!
        </div>
      ) : (
        filteredSessions.map(session => (
          <SessionCard
            key={session.id}
            session={session}
            currentUserName={currentUserName}
            onJoin={onJoin}
            onLeave={onLeave}
          />
        ))
      )}
    </div>
  );
}

export default BrowseSessions;