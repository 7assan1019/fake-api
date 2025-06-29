// index.js
// The smart, stateless API server powered by Express.js

const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db.js'); // Import our generated database

const app = express();

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes
app.use(express.json()); // Enable parsing of JSON request bodies

// --- Static File Serving ---
// Serve the beautiful landing page we created
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// --- Dynamic API Routes ---

const router = express.Router();

// GET all items for a resource
router.get('/:resource', (req, res) => {
    const resource = req.params.resource;
    if (db[resource]) {
        res.json(db[resource]);
    } else {
        res.status(404).json({ error: `Resource '${resource}' not found.` });
    }
});

// GET a single item by ID
router.get('/:resource/:id', (req, res) => {
    const { resource, id } = req.params;
    if (!db[resource]) {
        return res.status(404).json({ error: `Resource '${resource}' not found.` });
    }
    const item = db[resource].find(item => item.id == id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: `Item with ID ${id} not found in '${resource}'.` });
    }
});

// POST (create) a new item
router.post('/:resource', (req, res) => {
    const { resource } = req.params;
    if (!db[resource]) {
        return res.status(404).json({ error: `Resource '${resource}' not found.` });
    }
    
    // --- The "SMART" Validation Part ---
    const body = req.body;
    // Example validation: for posts, title and body are required.
    if (resource === 'posts' || resource === 'articles') {
        if (!body.title || !body.body) {
            return res.status(400).json({ error: 'For posts, `title` and `body` fields are required.' });
        }
    }
     if (resource === 'products') {
        if (!body.name || !body.price) {
            return res.status(400).json({ error: 'For products, `name` and `price` fields are required.' });
        }
    }

    // --- Fake Creation ---
    const newId = (db[resource][db[resource].length - 1]?.id || 0) + 1;
    const newItem = { id: newId, ...body };
    
    // We send back the "created" item, but we DON'T save it. This is the stateless magic.
    res.status(201).json(newItem);
});

// PUT (update) an item
router.put('/:resource/:id', (req, res) => {
    const { resource, id } = req.params;
    if (!db[resource]) {
        return res.status(404).json({ error: `Resource '${resource}' not found.` });
    }
    const itemIndex = db[resource].findIndex(item => item.id == id);
    if (itemIndex === -1) {
        return res.status(404).json({ error: `Item with ID ${id} not found in '${resource}'.` });
    }
    
    // --- Fake Update ---
    const updatedItem = { ...req.body, id: parseInt(id) };
    res.status(200).json(updatedItem);
});

// DELETE an item
router.delete('/:resource/:id', (req, res) => {
    const { resource, id } = req.params;
    if (!db[resource]) {
        return res.status(404).json({ error: `Resource '${resource}' not found.` });
    }
    const item = db[resource].find(item => item.id == id);
    if (!item) {
        return res.status(404).json({ error: `Item with ID ${id} not found in '${resource}'.` });
    }
    
    // --- Fake Deletion ---
    // Just send a success response without actually deleting.
    res.status(200).json({});
});

// --- Nested Routes Example ---
// GET all posts for a specific user
router.get('/users/:id/posts', (req, res) => {
    const userId = parseInt(req.params.id);
    const posts = db.posts.filter(post => post.userId === userId);
    if (posts) {
        res.json(posts);
    } else {
        res.status(404).json({ error: `User with ID ${userId} or their posts not found.` });
    }
});

// GET all comments for a specific post
router.get('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const comments = db.comments.filter(comment => comment.postId === postId);
    if (comments) {
        res.json(comments);
    } else {
        res.status(404).json({ error: `Post with ID ${postId} or its comments not found.` });
    }
});

// Apply the router to the /api path
app.use('/api', router);


// --- Server Initialization ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`FakeAPI server running on http://localhost:${PORT}`);
});

// Export the app for Vercel
module.exports = app;

