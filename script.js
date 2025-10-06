
const STORAGE_KEY = 'blogPosts';
let posts = [];
let editingId = null;

const $ = (sel, ctx=document) => ctx.querySelector(sel);

const postForm = $('#postForm');
const titleInput = $('#title');
const contentInput = $('#content');
const postIdInput = $('#submitBtn');
const cancelEditBtn = $('#cancelEditBtn');