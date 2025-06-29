// db.js
// This file programmatically generates a rich and compliant mock database.

/**
 * A utility function to create a specified number of items using a generator function.
 * @param {number} count - The number of items to create.
 * @param {function} generator - A function that returns a single item object.
 * @returns {Array<object>} - An array of generated items.
 */
const createItems = (count, generator) => {
    return Array.from({ length: count }, (_, i) => generator(i + 1));
};

// --- Data Generators ---

const createGenericUser = (id) => ({
    id,
    name: ['John Smith', 'Daniel Garcia', 'Kenji Tanaka', 'David Miller', 'Omar Khan'][id % 5],
    username: ['john.s', 'daniel.g', 'kenji.t', 'david.m', 'omar.k'][id % 5],
    email: `user${id}@example.com`,
    phone: `1-555-123-${String(id).padStart(4, '0')}`,
    website: `global-tech-${id}.com`,
});

const createPost = (id) => ({
    id,
    userId: (id % 10) + 1, // Link to one of the first 10 users
    title: `Post Title Number ${id}: A Topic of Interest`,
    body: `This is the body content for post number ${id}. It contains details and explanations about the main topic, structured to be clear and informative for the reader.`,
});

const createComment = (id) => ({
    id,
    postId: (id % 50) + 1, // Link to one of the first 50 posts
    name: `Commenter Name ${id}`,
    email: `commenter${id}@example.com`,
    body: `This is a useful comment on the post. It adds value and perspective to the discussion. Comment ID: ${id}.`,
});

const createProduct = (id) => ({
    id,
    name: ['Organic Honey', 'Yoga Mat', 'Art Print', 'Premium Coffee Beans', 'Reusable Water Bottle'][id % 5],
    price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
    description: `A high-quality, universally appealing product. Model number: P${id}.`,
});

const createBook = (id) => ({
    id,
    title: ['The Seeker\'s Guide', 'A Brief History of Time', 'The Principles of Science', 'Stories of Innovators', 'The Art of Focus'][id % 5],
    author: `Global Author ${id % 10 + 1}`,
    genre: ['Spirituality', 'Science', 'Non-Fiction', 'Biography', 'Self-Help'][id % 5],
    isbn: `978-3-16-148410-${id % 10}`,
});

const createPhoto = (id) => ({
    id,
    albumId: (id % 10) + 1,
    title: `Photo Title ${id}`,
    url: `https://placehold.co/600x600/1e293b/ffffff?text=Photo+${id}`,
    thumbnailUrl: `https://placehold.co/150x150/1e293b/ffffff?text=Thumb+${id}`,
});

const createTodo = (id) => ({
    id,
    userId: (id % 10) + 1,
    title: `Task to be completed number ${id}`,
    completed: id % 2 === 0,
});

const createRestaurant = (id) => ({
    id,
    name: `The Global Kitchen ${id}`,
    cuisine: ['Italian', 'Japanese', 'Mediterranean', 'Grill', 'Fusion'][id % 5],
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // Rating between 3.0 and 5.0
    address: `${id * 10} International Blvd, Global City`,
});

const createPhone = (id) => ({
    id,
    brand: ['TechUp', 'Connecta', 'Innovate'][id % 3],
    model: `Model X${id}`,
    price: parseFloat((Math.random() * 800 + 200).toFixed(2)),
    storage: [64, 128, 256][id % 3] + 'GB',
});

const createProperty = (type) => (id) => ({
    id,
    type,
    title: `Spacious ${type} in a prime location`,
    price: (type === 'Villa' ? 1000000 : 250000) + id * 10000,
    area_sqm: (type === 'Villa' ? 300 : 120) + id * 5,
    bedrooms: (type === 'Villa' ? 5 : 3) + (id % 2),
    location: `District ${id % 10 + 1}, Metro City`,
});


// The main database object
const db = {
    users: createItems(50, createGenericUser),
    posts: createItems(100, createPost),
    comments: createItems(200, createComment),
    products: createItems(50, createProduct),
    books: createItems(50, createBook),
    photos: createItems(100, createPhoto),
    albums: createItems(10, (id) => ({ id, userId: (id % 5) + 1, title: `Album Title ${id}` })),
    todos: createItems(100, createTodo),
    recipes: createItems(50, (id) => ({ id, name: `Healthy Recipe ${id}`, ingredients: ['Ingredient A', 'Ingredient B'] })),
    restaurants: createItems(50, createRestaurant),
    companies: createItems(50, (id) => ({ id, name: `Global Tech Solutions ${id}`, sector: 'IT' })),
    orders: createItems(50, (id) => ({ id, userId: (id % 10) + 1, productId: (id % 20) + 1, quantity: (id % 5) + 1 })),
    invoices: createItems(50, (id) => ({ id, orderId: id, amount: parseFloat((Math.random() * 500 + 50).toFixed(2)), status: 'paid' })),
    vehicles: createItems(50, (id) => ({ id, make: 'AutoBrand', model: `Model Y${id}`, year: 2020 + (id % 5) })),
    articles: createItems(100, createPost), // re-using post generator for simplicity
    events: createItems(50, (id) => ({ id, title: `Community Event ${id}`, date: '2025-10-26' })),
    teams: createItems(20, (id) => ({ id, name: `Development Team ${id}` })),
    projects: createItems(30, (id) => ({ id, teamId: (id % 20) + 1, name: `Project Alpha ${id}` })),
    reviews: createItems(100, (id) => ({ id, productId: (id % 50) + 1, rating: (id % 5) + 1, text: 'Great product!' })),
    locations: createItems(50, (id) => ({ id, name: `City Center ${id}`, lat: 34.0522, lon: -118.2437 })),
    jobs: createItems(50, (id) => ({ id, title: `Software Engineer ${id}`, companyId: (id % 50) + 1 })),
    tasks: createItems(100, (id) => ({ id, projectId: (id % 30) + 1, title: `Develop feature ${id}` })),
    forums: createItems(10, (id) => ({ id, name: `General Discussion ${id}` })),
    threads: createItems(50, (id) => ({ id, forumId: (id % 10) + 1, title: `Interesting Thread ${id}` })),
    messages: createItems(200, (id) => ({ id, threadId: (id % 50) + 1, userId: (id % 50) + 1, text: 'This is a reply.' })),
    phones: createItems(50, createPhone),
    apartments: createItems(50, createProperty('Apartment')),
    villas: createItems(50, createProperty('Villa')),
};

// CommonJS export for Node.js environment
module.exports = db;
