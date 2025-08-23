const year = document.getElementById('year'); 
year.textContent = new Date().getFullYear();

const notesGrid = document.getElementById('notesGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const pdfFrame = document.getElementById('pdfFrame');
const modalDownload = document.getElementById('modalDownload');
const themeToggle = document.getElementById('themeToggle');

// 🔹 Set your PDF notes here
const NOTES = [
  {title:"Python Basics", subject:"Python", url:"pdfs/Python notes.pdf"},
  {title:"Java Notes", subject:"Java", url:"pdfs/java notes.pdf"},
  {title:"C++ Guide", subject:"Css", url:"pdfs/CSS notes.pdf"}
];

function renderNotes(notes){
  notesGrid.innerHTML = notes.map(n=>`
    <div class="note-card">
      <h2>${n.title}</h2>
      <p><b>Subject:</b> ${n.subject}</p>
      <button class="download-btn" data-url="${n.url}">Preview / Download</button>
    </div>
  `).join('');
  emptyState.classList.toggle('hidden', notes.length>0);
  document.querySelectorAll('[data-url]').forEach(btn=>{
    btn.addEventListener('click', ()=> openModal(btn.getAttribute('data-url'), btn.closest('.note-card').querySelector('h2').textContent));
  });
}

function openModal(url,title){
  modalTitle.textContent = title;
  pdfFrame.src = url;
  modalDownload.href = url;
  modal.classList.remove('hidden');
}
function closeModal(){ modal.classList.add('hidden'); pdfFrame.src=''; }
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
window.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

searchInput.addEventListener('input',()=>{
  const q = searchInput.value.toLowerCase();
  renderNotes(NOTES.filter(n=>n.title.toLowerCase().includes(q) || n.subject.toLowerCase().includes(q)));
});

themeToggle.addEventListener('click', ()=>{
  const html = document.documentElement;
  if(html.getAttribute('data-theme')==='dark'){ html.removeAttribute('data-theme'); themeToggle.textContent='🌙'; }
  else { html.setAttribute('data-theme','dark'); themeToggle.textContent='☀️'; }
});

// Initial render
renderNotes(NOTES);


