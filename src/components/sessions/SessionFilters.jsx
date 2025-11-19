import React from 'react';
import { Form, Card } from 'react-bootstrap';

function SessionFilters({ searchQuery, onSearchChange, selectedCourse, onCourseChange, courses }) {
  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="row g-3">
          <div className="col-md-6">
            <Form.Label htmlFor="searchQuery">Search Sessions</Form.Label>
            <Form.Control
              id="searchQuery"
              type="text"
              placeholder="Search by course, title, or description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <Form.Label htmlFor="courseFilter">Filter by Course</Form.Label>
            <Form.Select
              id="courseFilter"
              value={selectedCourse}
              onChange={(e) => onCourseChange(e.target.value)}
            >
              <option value="">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </Form.Select>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SessionFilters;
