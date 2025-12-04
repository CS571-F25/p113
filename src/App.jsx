import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { useState, useEffect } from 'react';
import StudyPartnerLayout from './components/StudyPartnerLayout';
import BrowseSessions from './components/BrowseSessions';
import CreateSession from './components/CreateSession';
import MySessions from './components/MySessions';
import About from './components/About';
import LoadingSpinner from './components/LoadingSpinner';

const API_BASE = 'https://cs571api.cs.wisc.edu/rest/f25/bucket';
const BADGER_ID = 'bid_ffb02167e976793fa672361dae5eed961488fbcf577d8621a9941532ca93fa58';

function App() {
  const [currentUserName, setCurrentUserName] = useState('');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all sessions on mount
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${API_BASE}/sessions`, {
        headers: {
          'X-CS571-ID': BADGER_ID
        }
      });
      const data = await response.json();
      
      console.log('API Response:', data); 
      
      
      let sessionList = [];
      
      if (data.results && typeof data.results === 'object') {

        sessionList = Object.entries(data.results).map(([id, item]) => ({
          id: id,
          ...item
        }));
      }
      
      console.log('Processed sessions:', sessionList);
      
      setSessions(sessionList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setLoading(false);
    }
  };

  const handleJoinSession = async (sessionId) => {
    if (!currentUserName.trim()) {
      alert('Please set your name first!');
      return;
    }

    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    if (session.attendees.includes(currentUserName)) {
      alert('You have already joined this session!');
      return;
    }

    if (session.attendees.length >= session.maxSize) {
      alert('This session is full!');
      return;
    }

    const updatedSession = {
      ...session,
      attendees: [...session.attendees, currentUserName]
    };

    try {
      const response = await fetch(`${API_BASE}/sessions?id=${sessionId}`, {
        method: 'PUT',
        headers: {
          'X-CS571-ID': BADGER_ID,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSession)
      });

      if (response.ok) {
        await fetchSessions(); // Refresh the list
      }
    } catch (error) {
      console.error('Error joining session:', error);
      alert('Failed to join session');
    }
  };

  const handleLeaveSession = async (sessionId) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    const updatedSession = {
      ...session,
      attendees: session.attendees.filter(name => name !== currentUserName)
    };

    try {
      const response = await fetch(`${API_BASE}/sessions?id=${sessionId}`, {
        method: 'PUT',
        headers: {
          'X-CS571-ID': BADGER_ID,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSession)
      });

      if (response.ok) {
        await fetchSessions(); // Refresh the list
      }
    } catch (error) {
      console.error('Error leaving session:', error);
      alert('Failed to leave session');
    }
  };

  const handleCreateSession = async (newSession) => {
    const sessionData = {
      ...newSession,
      attendees: currentUserName ? [currentUserName] : [],
      creator: currentUserName // Track who created the session
    };

    try {
      const response = await fetch(`${API_BASE}/sessions`, {
        method: 'POST',
        headers: {
          'X-CS571-ID': BADGER_ID,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionData)
      });

      if (response.ok) {
        await fetchSessions(); 
        alert('Session created successfully!');
      }
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session');
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm('Are you sure you want to delete this session? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/sessions?id=${sessionId}`, {
        method: 'DELETE',
        headers: {
          'X-CS571-ID': BADGER_ID
        }
      });

      if (response.ok) {
        await fetchSessions(); 
        alert('Session deleted successfully!');
      } else {
        alert('Failed to delete session');
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      alert('Failed to delete session');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading sessions..." />;
  }

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
              onDelete={handleDeleteSession}
            />
          } />
          <Route path="/sessions" element={
            <BrowseSessions 
              sessions={sessions} 
              currentUserName={currentUserName} 
              onJoin={handleJoinSession} 
              onLeave={handleLeaveSession}
              onDelete={handleDeleteSession}
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
              onDelete={handleDeleteSession}
            />
          } />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;