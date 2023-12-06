// eslint-disable-next-line no-unused-vars
function deleteNote(noteId) {
    fetch('/delete-note', {
        method: 'POST',
        body: JSON.stringify({ noteId: noteId })
    // eslint-disable-next-line no-unused-vars
    }).then((_res) => {
        window.location.href = "/";

    })
}