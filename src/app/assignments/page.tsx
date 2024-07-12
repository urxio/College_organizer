'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../../styles/Assignments.module.css';

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  description: string;
}

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', title: 'CS Project', course: 'Introduction to Computer Science', dueDate: '2023-07-15', description: 'Build a simple web application' },
    { id: '2', title: 'Math Homework', course: 'Calculus I', dueDate: '2023-07-12', description: 'Complete problems 1-20 in Chapter 3' },
    { id: '3', title: 'Essay Draft', course: 'English Composition', dueDate: '2023-07-18', description: 'Write a 5-page essay on modern literature' },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [newAssignment, setNewAssignment] = useState({ title: '', course: '', dueDate: '', description: '' });

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const assignment = {
      id: (assignments.length + 1).toString(),
      ...newAssignment
    };
    setAssignments([...assignments, assignment]);
    setNewAssignment({ title: '', course: '', dueDate: '', description: '' });
    setIsAddingAssignment(false);
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setNewAssignment(assignment);
    setIsAddingAssignment(true);
  };

  const handleUpdateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAssignment) {
      setAssignments(assignments.map(a => a.id === editingAssignment.id ? { ...newAssignment, id: a.id } : a));
      setEditingAssignment(null);
    }
    setNewAssignment({ title: '', course: '', dueDate: '', description: '' });
    setIsAddingAssignment(false);
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
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
        
        <h2 className={styles.header}>My Assignments</h2>
        
        <div className={styles.assignmentList}>
          {assignments.map(assignment => (
            <div key={assignment.id} className={styles.assignmentCard}>
              <h3 className={styles.assignmentTitle}>{assignment.title}</h3>
              <p className={styles.assignmentDetails}>Course: {assignment.course}</p>
              <p className={styles.assignmentDetails}>Due Date: {assignment.dueDate}</p>
              <p className={styles.assignmentDescription}>{assignment.description}</p>
              <div className={styles.assignmentActions}>
                <button onClick={() => handleEditAssignment(assignment)} className={styles.editButton}>Edit</button>
                <button onClick={() => handleDeleteAssignment(assignment.id)} className={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {!isAddingAssignment ? (
          <button 
            onClick={() => setIsAddingAssignment(true)} 
            className={styles.addButton}
          >
            Add New Assignment
          </button>
        ) : (
          <form onSubmit={editingAssignment ? handleUpdateAssignment : handleAddAssignment} className={styles.addForm}>
            <input
              type="text"
              placeholder="Assignment Title"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
              className={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Course"
              value={newAssignment.course}
              onChange={(e) => setNewAssignment({...newAssignment, course: e.target.value})}
              className={styles.input}
              required
            />
            <input
              type="date"
              placeholder="Due Date"
              value={newAssignment.dueDate}
              onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
              className={styles.input}
              required
            />
            <textarea
              placeholder="Description"
              value={newAssignment.description}
              onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
              className={styles.textarea}
              required
            />
            <button type="submit" className={styles.submitButton}>
              {editingAssignment ? 'Update Assignment' : 'Add Assignment'}
            </button>
            <button 
              type="button" 
              onClick={() => {
                setIsAddingAssignment(false);
                setEditingAssignment(null);
                setNewAssignment({ title: '', course: '', dueDate: '', description: '' });
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

export default AssignmentsPage;