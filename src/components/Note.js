import React from 'react';

function Note({ note,toggleImportance }) {

	return (
		<div>
			<li>
				{note.content}
				<button onClick={toggleImportance}>Press</button>
			</li>
		</div>
	);
}

export default Note;
