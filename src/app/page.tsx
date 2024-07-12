'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Placeholder data
  const recentCourses = [
    { id: '1', name: 'Introduction to Computer Science' },
    { id: '2', name: 'Calculus I' },
    { id: '3', name: 'English Composition' },
  ];

  const upcomingAssignments = [
    { id: '1', name: 'CS Project', dueDate: '2023-07-15' },
    { id: '2', name: 'Math Homework', dueDate: '2023-07-12' },
    { id: '3', name: 'Essay Draft', dueDate: '2023-07-18' },
  ];

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
        
        <h2 className={styles.header}>Dashboard</h2>
        
        <div className={styles.grid}>
          {/* Recent Courses Card */}
          <div className={styles.card}>
            <h3 className={styles.cardHeader}>Recent Courses</h3>
            <ul className={styles.list}>
              {recentCourses.map(course => (
                <li key={course.id} className={styles.listItem}>
                  <Link href={`/courses/${course.id}`} className={styles.link}>
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/courses" className={styles.link}>
              View all courses →
            </Link>
          </div>

          {/* Upcoming Assignments Card */}
          <div className={styles.card}>
            <h3 className={styles.cardHeader}>Upcoming Assignments</h3>
            <ul className={styles.list}>
              {upcomingAssignments.map(assignment => (
                <li key={assignment.id} className={styles.listItem}>
                  <span>{assignment.name}</span>
                  <span>{assignment.dueDate}</span>
                </li>
              ))}
            </ul>
            <Link href="/assignments" className={styles.link}>
              Manage assignments →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <h3 className={styles.cardHeader}>Quick Actions</h3>
          <div>
            <Link href="/courses/new" className={`${styles.button} ${styles.buttonPrimary}`}>
              Add New Course
            </Link>
            <Link href="/assignments/new" className={`${styles.button} ${styles.buttonSecondary}`}>
              Create Assignment
            </Link>
            <Link href="/notes/new" className={`${styles.button} ${styles.buttonTertiary}`}>
              New Note
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;