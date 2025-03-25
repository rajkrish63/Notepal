document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('title-input');
    const contentInput = document.getElementById('content-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesContainer = document.getElementById('notes-container');

    // Load notes from localStorage on page load
    const loadNotes = () => {
        const savedNotes = localStorage.getItem('notepal-notes');
        if (savedNotes) {
            const notes = JSON.parse(savedNotes);
            notes.forEach(note => renderNote(note));
        }
    };

    // Save notes to localStorage
    const saveNotes = (notes) => {
        localStorage.setItem('notepal-notes', JSON.stringify(notes));
    };

    // Render a single note
    const renderNote = (note) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('data-id', note.id);

        if (note.title) {
            const titleElement = document.createElement('div');
            titleElement.classList.add('note-title');
            titleElement.textContent = note.title;
            noteElement.appendChild(titleElement);
        }

        const contentElement = document.createElement('div');
        contentElement.classList.add('note-content');
        contentElement.textContent = note.content;
        noteElement.appendChild(contentElement);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-note-btn');
        deleteButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;
        deleteButton.addEventListener('click', () => deleteNote(note.id));
        noteElement.appendChild(deleteButton);

        notesContainer.appendChild(noteElement);
    };

    // Add a new note
    const addNote = () => {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (title || content) {
            const newNote = {
                id: Date.now().toString(),
                title: title,
                content: content,
                color: "#ffd166"
            };

            renderNote(newNote);

            // Retrieve existing notes and save
            const savedNotes = localStorage.getItem('notepal-notes');
            const notes = savedNotes ? JSON.parse(savedNotes) : [];
            notes.push(newNote);
            saveNotes(notes);

            // Clear inputs
            titleInput.value = '';
            contentInput.value = '';
        }
    };

    // Delete a note
    const deleteNote = (id) => {
        const noteElement = document.querySelector(`.note[data-id="${id}"]`);
        if (noteElement) {
            noteElement.remove();

            // Retrieve and update notes in localStorage
            const savedNotes = localStorage.getItem('notepal-notes');
            const notes = savedNotes ? JSON.parse(savedNotes) : [];
            const updatedNotes = notes.filter(note => note.id !== id);
            saveNotes(updatedNotes);
        }
    };

    // Event Listeners
    addNoteBtn.addEventListener('click', addNote);

    // Load existing notes on page load
    loadNotes();
});