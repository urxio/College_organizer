'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../../styles/Courses.module.css';

interface Course {
  id: string;
  name: string;
  instructor: string;
  schedule: string;
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Introduction to Computer Science', instructor: 'Dr. Smith', schedule: 'MWF 10:00 AM' },
    { id: '2', name: 'Calculus I', instructor: 'Prof. Johnson', schedule: 'TTH 2:00 PM' },
    { id: '3', name: 'English Composition', instructor: 'Dr. Brown', schedule: 'MWF 1:00 PM' },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({ name: '', instructor: '', schedule: '' });

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const course = {
      id: (courses.length + 1).toString(),
      ...newCourse
    };
    setCourses([...courses, course]);
    setNewCourse({ name: '', instructor: '', schedule: '' });
    setIsAddingCourse(false);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setNewCourse(course);
    setIsAddingCourse(true);
  };

  const handleUpdateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...newCourse, id: c.id } : c));
      setEditingCourse(null);
    }
    setNewCourse({ name: '', instructor: '', schedule: '' });
    setIsAddingCourse(false);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? '' : styles.sidebarHidden}`}>
        <h1 className={styles.sidebarHeader}>College Organizer</h1>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/courses" className={styles.navLink}>Courses</Link>
          <Link href="/assignments" className={styles.navLink}>Assignments</Link>
          <Link href="/notes" className={styles.navLink}>Notes</Link>
          <Link href="/profile" className={styles.navLink}>Profile</Link>
        </nav>
      </div>

      {/* Main content */}
      <div className={styles.main}>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={styles.toggleButton}
        >
          {isSidebarOpen ? '◀' : '▶'}
        </button>
        
        <h2 className={styles.header}>My Courses</h2>
        
        <div className={styles.courseList}>
          {courses.map(course => (
            <div key={course.id} className={styles.courseCard}>
              <h3 className={styles.courseName}>{course.name}</h3>
              <p className={styles.courseDetails}>Instructor: {course.instructor}</p>
              <p className={styles.courseDetails}>Schedule: {course.schedule}</p>
              <div className={styles.courseActions}>
                <button onClick={() => handleEditCourse(course)} className={styles.editButton}>Edit</button>
                <button onClick={() => handleDeleteCourse(course.id)} className={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {!isAddingCourse ? (
          <button 
            onClick={() => setIsAddingCourse(true)} 
            className={styles.addButton}
          >
            Add New Course
          </button>
        ) : (
          <form onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse} className={styles.addForm}>
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.name}
              onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
              className={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Instructor"
              value={newCourse.instructor}
              onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
              className={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Schedule"
              value={newCourse.schedule}
              onChange={(e) => setNewCourse({...newCourse, schedule: e.target.value})}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.submitButton}>
              {editingCourse ? 'Update Course' : 'Add Course'}
            </button>
            <button 
              type="button" 
              onClick={() => {
                setIsAddingCourse(false);
                setEditingCourse(null);
                setNewCourse({ name: '', instructor: '', schedule: '' });
              }} 
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;