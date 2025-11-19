import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function CreateSession({ currentUserName, onCreateSession }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course: '',
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    maxSize: 4,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentUserName) {
      alert('Please set your name first!');
      return;
    }

    onCreateSession(formData);
    
    setFormData({
      course: '',
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      maxSize: 4,
      description: ''
    });

    alert('Session created successfully!');
    navigate('/sessions');
  };

  return (
    <div>
      <h3 className="mb-4">Create a New Study Session</h3>
      <div className="card">
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Label htmlFor="course">Course *</Form.Label>
                <Form.Control
                  id="course"
                  name="course"
                  placeholder="e.g., CS 300"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label htmlFor="title">Session Title *</Form.Label>
                <Form.Control
                  id="title"
                  name="title"
                  placeholder="e.g., Midterm Review"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <Form.Label htmlFor="date">Date *</Form.Label>
                <Form.Control
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <Form.Label htmlFor="startTime">Start Time *</Form.Label>
                <Form.Control
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <Form.Label htmlFor="endTime">End Time *</Form.Label>
                <Form.Control
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-8">
                <Form.Label htmlFor="location">Location *</Form.Label>
                <Form.Control
                  id="location"
                  name="location"
                  placeholder="e.g., College Library, 3rd Floor"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <Form.Label htmlFor="maxSize">Max Group Size *</Form.Label>
                <Form.Control
                  id="maxSize"
                  name="maxSize"
                  type="number"
                  min="2"
                  max="20"
                  value={formData.maxSize}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="What will you be studying? What should participants bring?"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <Button type="submit" variant="primary">
                  Create Session
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateSession;