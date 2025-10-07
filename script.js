// These are the Global state references and element references
const STORAGE_KEY = 'blogPosts';
let posts = [];
let editingId = null;
// This is the Utlity/tool to select elements
const $ = (sel, ctx=document) => ctx.querySelector(sel);

// These are all the elements for the form
const postForm = $('#postForm');
const titleInput = $('#title');
const contentInput = $('#content');
const postIdInput = $('#postId');
const submitBtn = $('#submitBtn');
const cancelEditBtn = $('#cancelEditBtn');

// These are the error containers
const titleError = $('#titleError');
const contentError = $('#contentError');
const formErrors = $('#formErrors');

// These are Post display containers
const postsList = $('#postsList');
const emptyState = $('#emptyState');
const countHint = $('#countHint');

// Helps format the timestamp
const fmt = (ts) => new Date(ts).toLocaleString();

// This function helps with the persistence of the LocalStorage
function loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    posts = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(posts)) posts = [];
}

function saveToStorage() {
localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}
// this section sets up form validation
function validateForm() {
let ok = true;
const title = titleInput.value.trim();
const content = contentInput.value.trim();
// this section clears all previous errors
titleError.textContent = '';
contentError.textContent = '';
formErrors.textContent = '';

if (!title) { titleError.textContent = 'Please enter a title.'; ok = false; }

if (!content) { contentError.textContent = 'Please enter some content.'; ok = false; }

if (!ok) {
formErrors.textContent = 'Form has errors. Please fix them and try again.';
if (!title) titleInput.focus(); else if (!content) contentInput.focus();
return false;
}
return { title, content };
}

function clearForm() {
postForm.reset();
postIdInput.value = '';
editingId = null;
submitBtn.textContent = 'Add Post';
cancelEditBtn.hidden = true;
titleError.textContent = '';
contentError.textContent = '';
formErrors.textContent = '';
}
// this section renders the posts
function render() {
postsList.innerHTML = '';
const sorted = [...posts].sort((a,b) => b.updatedAt - a.updatedAt);
countHint.textContent = `${sorted.length} ${sorted.length === 1 ? 'post' : 'posts'}`;

if (sorted.length === 0) { emptyState.style.display = ''; return; }
emptyState.style.display = 'none';

for (const p of sorted) {
const wrapper = document.createElement('article');
wrapper.className = 'post';
wrapper.dataset.id = p.id;
wrapper.setAttribute('aria-labelledby', `title-${p.id}`);

const h3 = document.createElement('h3'); h3.id = `title-${p.id}`; h3.textContent = p.title;

const meta = document.createElement('div'); meta.className = 'meta';
meta.textContent = p.updatedAt !== p.createdAt ? `Created ${fmt(p.createdAt)} • Updated ${fmt(p.updatedAt)}` : `Created ${fmt(p.createdAt)}`;

const body = document.createElement('div'); body.className = 'content'; body.textContent = p.content;
// this section is for the edit and delete buttons/actions
const actions = document.createElement('div'); actions.className = 'row';
const editBtn = document.createElement('button'); editBtn.type = 'button'; editBtn.className = 'btn-muted'; editBtn.textContent = 'Edit'; editBtn.setAttribute('data-action', 'edit');
const delBtn = document.createElement('button'); delBtn.type = 'button'; delBtn.className = 'btn-danger'; delBtn.textContent = 'Delete'; delBtn.setAttribute('data-action', 'delete');
actions.append(editBtn, delBtn);

wrapper.append(h3, meta, body, actions);
postsList.appendChild(wrapper);
}
}
// This section is for the CRUD (create,read,update,and delete) Operations 
function createPost({ title, content }) {
    const now = Date.now();
    const post = { id: String(now), title, content, createdAt: now, updatedAt: now };
    posts.push(post);
    saveToStorage();
    render();
}

function updatePost (id, { title, content }) {
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return;
    posts[idx] = { ...posts[idx], title, content, updatedAt: Date.now() };
    saveToStorage();
    render();
}

function deletePost(id) {
    posts = posts.filter(p=> p.id !== id);
    saveToStorage();
    render();
}

// This section is for event listeners
postForm.addEventListener('submit', (e) => {
e.preventDefault();
const result = validateForm();
if (!result) return;
if (editingId) updatePost(editingId, result); else createPost(result);
clearForm();
});

cancelEditBtn.addEventListener('click', () => { clearForm(); titleInput.focus(); });

// This is a delegated event listener for the edit and delete buttons
postsList.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const postEl = btn.closest('.post');
    if(!postEl) return;
    const id = postEl.dataset.id;

    if (action === 'edit') {
        const post = posts.find(p => p.id === id);
        if (!post) return;
        editingId = id;
        postIdInput.value = id;
        titleInput.value = post.title;
        contentInput.value = post.content;
        submitBtn.textContent = 'Update Post';
        cancelEditBtn.hidden = false;
        titleInput.focus();
    }

    if (action === 'delete') {
        if (confirm('Delete this post? This cannot be undone.')) {
            deletePost(id);
            if (editingId === id) clearForm();
        }
    }
    });

    window.addEventListener('DOMContentLoaded', () => { loadFromStorage(); render(); });













