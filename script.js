document.addEventListener('DOMContentLoaded', loadNotes);

function addNote() {
    const noteContent = document.getElementById('noteContent').value;
    const noteColor = document.getElementById('noteColor').value;

    if (noteContent.trim() === '') {
        alert('Please enter note content.');
        return;
    }

    const note = {
        content: noteContent,
        color: noteColor,
        timestamp: new Date().getTime(),
    };

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));

    loadNotes();
    document.getElementById('addNoteForm').reset();
}

function editNote(timestamp) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.timestamp === timestamp);

    if (!noteToEdit) {
        alert('Note not found for editing.');
        return;
    }

    const updatedContent = prompt('Edit Note Content:', noteToEdit.content);
    if (updatedContent === null) {
        // User clicked Cancel
        return;
    }

    const updatedColor = prompt('Edit Note Color (green, yellow, red):', noteToEdit.color);
    if (updatedColor === null) {
        // User clicked Cancel
        return;
    }

    // Update the note
    noteToEdit.content = updatedContent;
    noteToEdit.color = updatedColor;

    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

function deleteNote(timestamp) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.timestamp !== timestamp);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

function loadNotes() {
    const notesContainer = document.getElementById('notesList');
    notesContainer.innerHTML = '';

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.sort((a, b) => a.timestamp - b.timestamp);

    notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.style.borderLeft = `5px solid ${note.color}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'note-content';
        contentDiv.textContent = note.content;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'note-buttons';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.onclick = () => editNote(note.timestamp);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(note.timestamp);

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        noteDiv.appendChild(contentDiv);
        noteDiv.appendChild(buttonContainer);
        notesContainer.appendChild(noteDiv);
    });
}
