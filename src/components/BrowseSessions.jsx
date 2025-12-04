import React, { useState } from 'react';
import SessionFilters from './sessions/SessionFilters';
import SessionCard from './sessions/SessionCard';
import SessionCountBadge from './sessions/SessionCountBadge';
import EmptyState from './sessions/EmptyState';

function BrowseSessions({ sessions, currentUserName, onJoin, onLeave, onDelete }) {
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
      <h3 className="mb-4">
        Browse Study Sessions
        <SessionCountBadge count={filteredSessions.length} />
      </h3>
      <SessionFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCourse={selectedCourse}
        onCourseChange={setSelectedCourse}
        courses={courses}
      />
      
      {filteredSessions.length === 0 ? (
        <EmptyState 
          message="No sessions found. Try adjusting your filters or create a new session!"
          actionText="Create a Session"
          actionPath="/create"
        />
      ) : (
        filteredSessions.map(session => (
          <SessionCard
            key={session.id}
            session={session}
            currentUserName={currentUserName}
            onJoin={onJoin}
            onLeave={onLeave}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default BrowseSessions;