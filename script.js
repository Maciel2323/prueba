// Se va a activar cuando el contenido del documento HTML ha sido completamente cargado
document.addEventListener('DOMContentLoaded', loadNotes);

function addNote() {// Esta función se llama cuando se presiona el botón "SAVE" para agregar una nueva nota
      // Se obtienen los valores del contenido y color de la nueva nota desde los elementos HTML
    const noteContent = document.getElementById('noteContent').value;
    const noteColor = document.getElementById('noteColor').value;

    if (noteContent.trim() === '') { // Se valida que el contenido de la nota no esté vacío
        alert('Please enter note content.');// si esta vacío envia el mensaje
        return;
    }

    const note = {// Se crea un objeto que representa la nueva nota.
        content: noteContent,//contenido de la nota
        color: noteColor,//color de la nota
        timestamp: new Date().getTime(),
    };
     // con esto se crea un objeto que representa la nueva nota
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    // Se vuelve a cargar la lista de notas que ya existeny se restablece el formulario.
    loadNotes();
    document.getElementById('addNoteForm').reset();
}

// Esta función se llama cuando se presiona el botón "Edit" para editar una nota existente.
function editNote(timestamp) {
    // Se obtienen las notas existentes del almacenamiento local.
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.timestamp === timestamp);
 // Se encuentra la nota que corresponde 
    if (!noteToEdit) {
        alert('Note not found for editing.');
        return;
    }
    // Si no se encuentra la se muestra una alerta si la nota.
    const updatedContent = prompt('Edit Note Content:', noteToEdit.content);
    if (updatedContent === null) {
        return;
    }
 // Se solicita al usuario que ingrese el nuevo contenido para la nota
    const updatedColor = prompt('Edit Note Color (green, yellow, red):', noteToEdit.color);
    if (updatedColor === null) {
        return;
    }

    // se edita el contenido de la nota y el color
    noteToEdit.content = updatedContent;
    noteToEdit.color = updatedColor;

    // Se actualizan las notas en el almacenamiento local y se vuelve a cargar la lista.
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

function deleteNote(timestamp) {
     // Se obtienen las notas existentes del almacenamiento local.
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.timestamp !== timestamp);
     // Se actualizan las notas en el almacenamiento local y se vuelve a cargar la lista.
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}
// Esta función se llama para cargar y mostrar todas las notas en la interfaz.
function loadNotes() {
    // Se obtiene el contenedor de notas desde el documento HTML.
    const notesContainer = document.getElementById('notesList');
    // Se limpia el contenido actual del contenedor.
    notesContainer.innerHTML = '';
  // Se obtienen las notas existentes del almacenamiento local y se ordenan por sello temporal.
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.sort((a, b) => a.timestamp - b.timestamp);
 // Se itera sobre cada nota para crear elementos HTML que las representen en la interfaz.
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
