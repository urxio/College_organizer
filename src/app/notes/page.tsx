'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../../styles/Notes.module.css';

interface Note {
  id: string;
  title: string;
  content: string;
  course: string;
  date: string;
}

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Introduction to Programming', content: 'Variables, data types, and basic syntax', course: 'Computer Science 101', date: '2023-07-10' },
    { id: '2', title: 'Limits and Continuity', content: 'Definition of limits and continuity in calculus', course: 'Calculus I', date: '2023-07-11' },
    { id: '3', title: 'Essay Structure', content: 'Introduction, body paragraphs, and conclusion', course: 'English Composition', date: '2023-07-12' },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '', course: '', date: '' });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const note = {
      id: (notes.length + 1).toString(),
      ...newNote,
      date: new Date().toISOString().split('T')[0], // Current date
    };
    setNotes([...notes, note]);
    setNewNote({ title: '', content: '', course: '', date: '' });
    setIsAddingNote(false);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNewNote(note);
    setIsAddingNote(true);
  };

  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNote) {
      setNotes(notes.map(n => n.id === editingNote.id ? { ...newNote, id: n.id } : n));
      setEditingNote(null);
    }
    setNewNote({ title: '', content: '', course: '', date: '' });
    setIsAddingNote(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
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
        
        <h2 className={styles.header}>My Notes</h2>
        
        <div className={styles.noteList}>
          {notes.map(note => (
            <div key={note.id} className={styles.noteCard}>
              <h3 className={styles.noteTitle}>{note.title}</h3>
              <p className={styles.noteDetails}>Course: {note.course}</p>
              <p className={styles.noteDetails}>Date: {note.date}</p>
              <p className={styles.noteContent}>{note.content}</p>
              <div className={styles.noteActions}>
                <button onClick={() => handleEditNote(note)} className={styles.editButton}>Edit</button>
                <button onClick={() => handleDeleteNote(note.id)} className={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {!isAddingNote ? (
          <button 
            onClick={() => setIsAddingNote(true)} 
            className={styles.addButton}
          >
            Add New Note
          </button>
        ) : (
          <form onSubmit={editingNote ? handleUpdateNote : handleAddNote} className={styles.addForm}>
            <input
              type="text"
              placeholder="Note Title"
              value={newNote.title}
              onChange={(e) => setNewNote({...newNote, title: e.target.value})}
              className={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Course"
              value={newNote.course}
              onChange={(e) => setNewNote({...newNote, course: e.target.value})}
              className={styles.input}
              required
            />
            <textarea
              placeholder="Note Content"
              value={newNote.content}
              onChange={(e) => setNewNote({...newNote, content: e.target.value})}
              className={styles.textarea}
              required
            />
            <button type="submit" className={styles.submitButton}>
              {editingNote ? 'Update Note' : 'Add Note'}
            </button>
            <button 
              type="button" 
              onClick={() => {
                setIsAddingNote(false);
                setEditingNote(null);
                setNewNote({ title: '', content: '', course: '', date: '' });
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

export default NotesPage;