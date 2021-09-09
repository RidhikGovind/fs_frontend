import React from 'react';

function Note({ note }) {
	return (
		<div>
			<li>{note.content}</li>
		</div>
	);
}

export default Note;
