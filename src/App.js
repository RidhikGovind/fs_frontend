import { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import noteService from './services/notes';

function App(props) {
	const [notes, setNotes] = useState(props.notes);
	const [newNote, setNewNote] = useState('Enter a note');
	const [showAll, setShowAll] = useState(true);

	//fetching the api from the server and setting the 'newNote' state
	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	const addNote = (e) => {
		e.preventDefault();
		const noteObj = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
			id: notes.length + 1,
		};

		/**
		 * - sending the newnoteobj to the server
		 * - then grabbing the returnedNote from the server
		 * - and updating the 'notes' state which will update the
		 * current list of notes.
		 */
		noteService.create(noteObj).then((returnedNote) => {
			setNotes(notes.concat(returnedNote));
			setNewNote('');
		});

		setNotes(notes.concat(noteObj));
		setNewNote('');
	};

	/**
	 * create a function to toggle the importance of each note
	 */
	const toggleImportanceOf = (id) => {
		const note = notes.find((note) => note.id === id);
		// console.log(note);
		const toBeUpdatednoteObj = { ...note, importance: !note.important };
		console.log(toBeUpdatednoteObj);
		noteService
			.update(id, toBeUpdatednoteObj)
			.then((returnedNote) =>
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
			)
			.catch((err) => {
				alert(`the note ${note.content} was already deleted from the server`);
				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	const handleNoteChange = (e) => {
		setNewNote(e.target.value);
	};

	const notestoshow = showAll
		? notes
		: notes.filter((note) => note.important === true);

	return (
		<div className='App'>
			<h1>Notes</h1>
			<button onClick={() => setShowAll(!showAll)}>
				{showAll ? 'important' : 'all'}
			</button>
			<ul>
				{notestoshow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
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
