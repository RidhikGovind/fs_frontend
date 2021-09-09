import { useState } from 'react';
import './App.css';
import Note from './components/Note';

function App(props) {
	const [notes, setNotes] = useState(props.notes);
	const [newNote, setNewNote] = useState('Enter a note');
	const [showAll, setShowAll] = useState(true);

	const addNote = (e) => {
		e.preventDefault();
		const noteObj = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
			id: notes.length + 1,
		};
		setNotes(notes.concat(noteObj));
		setNewNote('');
	};

	const handleNoteChange = (e) => {
		setNewNote(e.target.value);
	};

	const notestoshow = showAll
		? notes
    : notes.filter(note => note.important === true);
  
  
	return (
		<div className='App'>
      <h1>Notes</h1>
      <button onClick={setShowAll(!showAll)}>
        { showAll ? 'important': 'all'}
      </button>
			<ul>
				{notes.map((note) => (
					<Note key={note.id} note={note} />
				))}
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type='submit'>Save</button>
			</form>
		</div>
	);
}

export default App;
