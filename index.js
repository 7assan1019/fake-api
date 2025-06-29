
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db.js');

const app = express();

// --- Middleware ---
app.use(cors({ exposedHeaders: ['X-Total-Count'] }));
app.use(express.json());

// --- Static File Serving ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- Dynamic API Router ---
const router = express.Router();

// Main handler for ALL general resource requests
router.get('/:resource', (req, res) => {
    const { resource } = req.params;
    if (!db[resource]) {
        return res.status(404).json({ error: `Resource '${resource}' not found.` });
    }
    let results = [...db[resource]];
    const { _page = 1, _limit = 10, _sort, _order = 'asc', q, ...filters } = req.query;

    Object.keys(filters).forEach(key => {
        results = results.filter(item => String(item[key]) === String(filters[key]));
    });
    if (q) {
        const searchTerm = q.toLowerCase();
        results = results.filter(item => Object.values(item).some(value => String(value).toLowerCase().includes(searchTerm)));
    }
    if (_sort) {
        results.sort((a, b) => {
            const valA = a[_sort];
            const valB = b[_sort];
            if (valA < valB) return _order === 'asc' ? -1 : 1;
            if (valA > valB) return _order === 'asc' ? 1 : -1;
            return 0;
        });
    }

    const totalCount = results.length;
    res.setHeader('X-Total-Count', totalCount);

    const page = parseInt(_page);
    const limit = parseInt(_limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    results = results.slice(startIndex, endIndex);

    res.json(results);
});

// GET a single item by ID
router.get('/:resource/:id', (req, res) => {
    const { resource, id } = req.params;
    if (!db[resource]) { return res.status(404).json({ error: `Resource '${resource}' not found.` }); }
    const item = db[resource].find(item => item.id == id);
    if (item) { res.json(item); } 
    else { res.status(404).json({ error: `Item with ID ${id} not found in '${resource}'.` }); }
});

// --- Smart POST with Enhanced Validation ---
router.post('/:resource', (req, res) => {
    const { resource } = req.params;
    if (!db[resource]) { return res.status(404).json({ error: `Resource '${resource}' not found.` }); }
    
    // --- Specific Validation Logic ---
    const body = req.body;
    let errors = [];
    if (resource === 'posts' || resource === 'articles') {
        if (!body.title) errors.push('`title` is required.');
        if (!body.body) errors.push('`body` is required.');
    } else if (resource === 'users') {
        if (!body.name) errors.push('`name` is required.');
        if (!body.email) errors.push('`email` is required.');
        else if (!body.email.includes('@')) errors.push('`email` must be a valid email address.');
    } else if (resource === 'reviews') {
        if (!body.rating) errors.push('`rating` is required.');
        else if (isNaN(body.rating) || body.rating < 1 || body.rating > 5) errors.push('`rating` must be a number between 1 and 5.');
        if (!body.productId) errors.push('`productId` is required.');
        if (!body.userId) errors.push('`userId` is required.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    // Fake Creation
    const newId = (db[resource][db[resource].length - 1]?.id || 0) + 1;
    res.status(201).json({ id: newId, ...body });
});

// --- Smart PUT with Validation ---
router.put('/:resource/:id', (req, res) => {
    const { resource, id } = req.params;
     if (!db[resource]) { return res.status(404).json({ error: `Resource '${resource}' not found.` }); }
    const itemExists = db[resource].some(item => item.id == id);
    if(!itemExists) { return res.status(404).json({ error: `Item with ID ${id} not found.` }); }

    // You can add validation for PUT as well
    // For simplicity, we'll just fake the update
    res.status(200).json({ ...req.body, id: parseInt(id) });
});

// --- DELETE ---
router.delete('/:resource/:id', (req, res) => res.status(200).json({}));

// Advanced Nested Routes
router.get('/products/:id/reviews', (req, res) => res.json(db.reviews.filter(r => r.productId === parseInt(req.params.id))));
router.get('/users/:id/posts', (req, res) => res.json(db.posts.filter(p => p.userId === parseInt(req.params.id))));
router.get('/users/:id/cart', (req, res) => res.json(db.carts.find(c => c.userId === parseInt(req.params.id))));
router.get('/categories/:id/products', (req, res) => res.json(db.products.filter(p => p.categoryId === parseInt(req.params.id))));

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`The ULTIMATE FakeAPI server running on http://localhost:${PORT}`));

module.exports = app;
