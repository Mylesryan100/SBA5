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
const postIdInput = $('#submitBtn');
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
// this function sets up form validation
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
