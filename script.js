async function loadNotes() {
  const response = await fetch("notes.json");
  const notes = await response.json();

  const container = document.getElementById("notes-list");
  container.innerHTML = "";

  notes.forEach(note => {
    const card = document.createElement("div");
    card.className = "note-card";

    card.innerHTML = `
      <h2>${note.title}</h2>
      <p><b>Subject:</b> ${note.subject}</p>
      <p><b>Size:</b> ${(note.size/1024).toFixed(1)} KB</p>
      <a href="${note.url}" download class="download-btn">⬇ Download</a>
    `;

    container.appendChild(card);
  });
}

loadNotes();
