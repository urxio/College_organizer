'use client';

import React, { useState } from 'react';

interface Course {
  id: string;
  name: string;
  instructor: string;
  schedule: string;
}

const CourseManager: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<Omit<Course, 'id'>>({
    name: '',
    instructor: '',
    schedule: '',
  });

  const inputStyle = {
    color: 'black',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '4px',
    width: '100%',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id ? { ...course, ...formData } : course
      ));
      setEditingCourse(null);
    } else {
      const courseWithId = { ...formData, id: Date.now().toString() };
      setCourses(prev => [...prev, courseWithId]);
    }
    setFormData({ name: '', instructor: '', schedule: '' });
  };

  const startEditing = (course: Course) => {
    setEditingCourse(course);
    setFormData({ name: course.name, instructor: course.instructor, schedule: course.schedule });
  };

  const cancelEditing = () => {
    setEditingCourse(null);
    setFormData({ name: '', instructor: '', schedule: '' });
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Course Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="instructor" className="block text-gray-700 text-sm font-bold mb-2">Instructor:</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="schedule" className="block text-gray-700 text-sm font-bold mb-2">Schedule:</label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            value={formData.schedule}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {editingCourse ? 'Update Course' : 'Add Course'}
          </button>
          {editingCourse && (
            <button type="button" onClick={cancelEditing} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-4">
        {courses.map(course => (
          <li key={course.id} className="bg-white shadow-md rounded px-8 py-6">
            <h3 className="font-bold text-xl mb-2">{course.name}</h3>
            <p className="text-gray-700 mb-2">Instructor: {course.instructor}</p>
            <p className="text-gray-700 mb-4">Schedule: {course.schedule}</p>
            <div className="flex space-x-2">
              <button onClick={() => startEditing(course)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit
              </button>
              <button onClick={() => deleteCourse(course.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManager;