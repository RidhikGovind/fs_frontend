import { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import noteService from './services/notes';
import loginService from './services/login';
import login from './services/login';

function App() {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('Enter a note');
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	//fetching the api from the server and setting the 'newNote' state
	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	/* helper functions to show login and notes details */
	const loginForm = () => {
		<form onSubmit={handleLogin}>
			<div>
				<label>Username</label>
				<input
					type='text'
					value={username}
					name='username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				<label>Password</label>
				<input
					type='text'
					value={password}
					name='password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit'>Login</button>
		</form>;
	};

	const noteForm = () => {
		<form onSubmit={addNote}>
			<input value={newNote} onChange={handleNoteChange} />
			<button type='submit'>Save</button>
		</form>;
	};

	/* Login handler function */
	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			setUser(user);
			setUsername(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}

		console.log('loggin in with', username, password);
	};

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
	 * function to toggle the importance of each note
	 */
	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
			})
			.catch((error) => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
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

			<div>{errorMessage}</div>
			{/* conditional rendering helper functions*/}
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>{user.name} logger in</p>
					{noteForm()}
				</div>
			)}
			{user !== null && noteForm()}

			<button onClick={() => setShowAll(!showAll)}>
				show {showAll ? 'important' : 'all'}
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
		</div>
	);
}

export default App;
