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
