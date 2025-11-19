import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { useState } from 'react';
import StudyPartnerLayout from './components/StudyPartnerLayout';
import BrowseSessions from './components/BrowseSessions';
import CreateSession from './components/CreateSession';
import MySessions from './components/MySessions';
import About from './components/About';

function App() {
  const [currentUserName, setCurrentUserName] = useState('');
  // I am going to move this over to using the bucket API, I just needed it to be working before I set that up
  const [sessions, setSessions] = useState([
    {
      id: "1",
      course: "CS 300",
      title: "Midterm Review",
      date: "2025-03-10",
      startTime: "14:00",
      endTime: "17:00",
      location: "College Library, 1st Floor",
      description: "Going over practice exam problems. Bring your notes!",
      maxSize: 5,
      attendees: ["Alice", "Bob"]
    },
    {
      id: "2",
      course: "MATH 222",
      title: "Calculus Study Group",
      date: "2025-03-08",
      startTime: "10:00",
      endTime: "12:00",
      location: "Memorial Library, 2nd Floor",
      description: "Working through calculus problems together.",
      maxSize: 4,
      attendees: ["Charlie"]
    },
    {
      id: "3",
      course: "CS 300",
      title: "Project Help Session",
      date: "2025-03-12",
      startTime: "15:00",
      endTime: "18:00",
      location: "Morgridge hall 2543",
      description: "Getting help with current project and debugging together.",
      maxSize: 6,
      attendees: []
    }
  ]);

  const handleJoinSession = (sessionId) => {
    if (!currentUserName.trim()) {
      alert('Please set your name first!');
      return;
    }

    setSessions(sessions.map(session => {
      if (session.id === sessionId && !session.attendees.includes(currentUserName)) {
        return {
          ...session,
          attendees: [...session.attendees, currentUserName]
        };
      }
      return session;
    }));
  };

  const handleLeaveSession = (sessionId) => {
    setSessions(sessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          attendees: session.attendees.filter(name => name !== currentUserName)
        };
      }
      return session;
    }));
  };

  const handleCreateSession = (newSession) => {
    const sessionWithId = {
      ...newSession,
      id: Date.now().toString(),
      attendees: currentUserName ? [currentUserName] : []
    };
    setSessions([...sessions, sessionWithId]);
  };

  return (
    <BrowserRouter basename="/p113">
      <Routes>
        <Route path="/" element={
          <StudyPartnerLayout 
            currentUserName={currentUserName}
            setCurrentUserName={setCurrentUserName}
          />
        }>
          <Route index element={
            <BrowseSessions 
              sessions={sessions} 
              currentUserName={currentUserName} 
              onJoin={handleJoinSession} 
              onLeave={handleLeaveSession} 
            />
          } />
          <Route path="/sessions" element={
            <BrowseSessions 
              sessions={sessions} 
              currentUserName={currentUserName} 
              onJoin={handleJoinSession} 
              onLeave={handleLeaveSession} 
            />
          } />
          <Route path="/create" element={
            <CreateSession 
              currentUserName={currentUserName} 
              onCreateSession={handleCreateSession} 
            />
          } />
          <Route path="/my-sessions" element={
            <MySessions 
              sessions={sessions} 
              currentUserName={currentUserName} 
              onLeave={handleLeaveSession} 
            />
          } />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;