
// --- UTILITY FUNCTIONS ---
const createItems = (count, generator) => Array.from({ length: count }, (_, i) => generator(i + 1));
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const LOREM_IPSUM_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const LOREM_IPSUM_MEDIUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const LOREM_IPSUM_LONG = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. " + LOREM_IPSUM_MEDIUM;

// --- DATA BLUEPRINTS ---
const USERS_COUNT = 100;
const PRODUCTS_COUNT = 500;
const CATEGORIES_COUNT = 15;
const REVIEWS_COUNT = 1000;
const ORDERS_COUNT = 250;
const POSTS_COUNT = 200;
const COMMENTS_COUNT = 1000;
const BOOKS_COUNT = 100;
const COMPANIES_COUNT = 50;
const EMPLOYEES_COUNT = 300;
const PROJECTS_COUNT = 100;
const TASKS_COUNT = 500;

// E-COMMERCE: Categories
const categories = createItems(CATEGORIES_COUNT, (id) => ({
    id,
    name: ['Electronics', 'Books', 'Clothing', 'Home & Kitchen', 'Sports & Outdoors', 'Health & Beauty', 'Toys & Games', 'Automotive', 'Groceries', 'Computers', 'Smart Home', 'Video Games', 'Jewelry', 'Watches', 'Office Supplies'][id - 1],
    image: `https://picsum.photos/seed/cat${id}/600/400`
}));

// E-COMMERCE: Products
const products = createItems(PRODUCTS_COUNT, (id) => ({
    id,
    name: `Pro ${getRandomItem(['Headphones', 'Laptop', 'Watch', 'T-Shirt', 'Blender', 'Dumbbells', 'Action Figure', 'Drill Kit', 'Novel', 'Monitor', 'Keyboard'])} Model #${id}`,
    description: LOREM_IPSUM_LONG,
    price: parseFloat((Math.random() * 500 + 20).toFixed(2)),
    categoryId: (id % CATEGORIES_COUNT) + 1,
    brand: ['GlobalTech', 'Essentials', 'ProGear', 'HomeLuxe', 'Quantum'][id % 5],
    sku: `SKU-${String(id).padStart(8, '0')}`,
    stock: Math.floor(Math.random() * 100),
    images: [ `https://picsum.photos/seed/prod${id}a/800/800`, `https://picsum.photos/seed/prod${id}b/800/800`, `https://picsum.photos/seed/prod${id}c/800/800` ],
    specifications: { weight: `${(Math.random() * 5).toFixed(2)} kg`, dimensions: `${Math.ceil(Math.random()*20)}x${Math.ceil(Math.random()*20)}x${Math.ceil(Math.random()*20)} cm`, material: getRandomItem(['Plastic', 'Metal', 'Cotton', 'Wood', 'Ceramic']) },
    avgRating: parseFloat((3.0 + Math.random() * 2.0).toFixed(2)),
    tags: ['new-arrival', 'best-seller', 'eco-friendly'].slice(0, 1 + (id % 3))
}));

// E-COMMERCE: Users
const users = createItems(USERS_COUNT, (id) => ({
    id,
    name: ['John Smith', 'Daniel Garcia', 'Kenji Tanaka', 'David Miller', 'Omar Khan', 'Alex Chen', 'Mohammed Al-Farsi', 'Ivan Petrov', 'Marco Rossi', 'Leo Müller'][id % 10],
    username: `user_${id}`,
    email: `user${id}@example.com`,
    address: { street: `${id * 100} Commerce St`, city: 'Metro City', zipcode: `${10000 + id}` },
    phone: `1-555-123-${String(id).padStart(4, '0')}`,
    avatar: `https://i.pravatar.cc/150?u=user${id}`,
    cartId: id
}));

// E-COMMERCE: Carts
const carts = createItems(USERS_COUNT, (id) => ({
    id, userId: id,
    items: createItems(1 + (id % 4), (i) => ({ productId: (id * i) % PRODUCTS_COUNT + 1, quantity: 1 + (i % 2) })),
}));

// E-COMMERCE: Reviews
const reviews = createItems(REVIEWS_COUNT, (id) => ({ id, productId: (id % PRODUCTS_COUNT) + 1, userId: (id % USERS_COUNT) + 1, rating: Math.ceil(Math.random() * 5), title: getRandomItem(['Amazing Product!', 'Good value', 'Not what I expected']), comment: LOREM_IPSUM_MEDIUM, date: `2025-06-${(id % 30) + 1}` }));

// E-COMMERCE: Orders
const orders = createItems(ORDERS_COUNT, (id) => {
    const items = createItems(1 + (id % 4), (i) => {
        const product = products[(id * i) % PRODUCTS_COUNT];
        return { productId: product.id, productName: product.name, quantity: 1 + (i % 2), pricePerUnit: product.price };
    });
    const subtotal = items.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);
    return { id, userId: (id % USERS_COUNT) + 1, items: items, total: parseFloat((subtotal * 1.14 + 15.00).toFixed(2)), status: getRandomItem(['pending', 'processing', 'shipped', 'delivered']), orderDate: `2025-05-${(id % 30) + 1}`, trackingNumber: `TN${String(id).padStart(10, '0')}` }
});

// SOCIAL & CONTENT
const posts = createItems(POSTS_COUNT, (id) => ({ id, userId: (id % USERS_COUNT) + 1, title: `Insight into ${['Global Economics', 'Tech Innovations', 'Art History', 'Healthy Lifestyles'][id % 4]} - Entry #${id}`, body: LOREM_IPSUM_LONG, tags: ['discussion', 'deep-dive', 'analysis'], likes: Math.floor(Math.random() * 1000) }));
const comments = createItems(COMMENTS_COUNT, (id) => ({ id, postId: Math.ceil(id / (COMMENTS_COUNT/POSTS_COUNT)), userId: (id % USERS_COUNT) + 1, body: `Replying: ${LOREM_IPSUM_MEDIUM}`, likes: Math.floor(Math.random() * 50) }));
const books = createItems(BOOKS_COUNT, (id) => ({ id, title: `The ${getRandomItem(['Crimson', 'Silent', 'Forgotten'])} ${getRandomItem(['Cipher', 'Garden', 'Witness'])}`, authorId: (id % USERS_COUNT) + 1, isbn: `978-0-${String(200000000 + id).padStart(9, '0')}`, publicationYear: 2024 - (id % 50), genre: 'Mystery', pages: 300 + (id % 200), description: LOREM_IPSUM_LONG, coverImage: `https://picsum.photos/seed/book${id}/400/600` }));

// CORPORATE & PRODUCTIVITY
const companies = createItems(COMPANIES_COUNT, (id) => ({ id, name: `Innovate Corp ${id}`, industry: "FinTech", location: "New York", numberOfEmployees: 50 + id * 5, website: `innovate${id}.com`}));
const employees = createItems(EMPLOYEES_COUNT, (id) => ({id, name: `Employee #${id}`, email: `emp${id}@innovate.corp`, companyId: (id % COMPANIES_COUNT)+1, position: 'Software Engineer'}));
const projects = createItems(PROJECTS_COUNT, (id) => ({ id, companyId: (id % COMPANIES_COUNT) + 1, name: `Project Phoenix ${id}`, status: getRandomItem(['planning', 'in-progress', 'completed']), budget: 50000 + id * 1000}));
const tasks = createItems(TASKS_COUNT, (id) => ({id, projectId: (id % PROJECTS_COUNT)+1, employeeId: (id % EMPLOYEES_COUNT)+1, title: `Develop module ${id}`, status: getRandomItem(['todo', 'in-progress', 'done']), dueDate: `2025-08-${(id%30)+1}`}));

// REAL ESTATE & LISTINGS
const createProperty = (type) => (id) => ({ id, type, title: `Luxurious ${type} with Ocean View`, description: LOREM_IPSUM_LONG, price: (type === 'Villa' ? 1250000 : 450000) + (id * 10000), address: { street: `${id} Ocean Drive`, city: 'Miami'}, area_sqm: (type === 'Villa' ? 350 : 130) + (id * 5), bedrooms: (type === 'Villa' ? 5 : 3), bathrooms: (type === 'Villa' ? 4 : 2), amenities: ['Swimming Pool', 'Gym', 'Private Garden'], images: [`https://picsum.photos/seed/prop${id}a/1024/768`, `https://picsum.photos/seed/prop${id}b/1024/768`] });
const vehicles = createItems(100, (id) => ({id, make: getRandomItem(['Honda','Toyota','Ford','BMW']), model: `Model Z${id}`, year: 2024 - (id%10), price: 15000 + id*100, type: 'Sedan', mileage: 10000 + id*500, fuelType: 'Gasoline'}));

// EDUCATION
const courses = createItems(50, (id) => ({id, title: `Introduction to ${getRandomItem(['Quantum Physics', 'Web Development', 'Ancient History', 'Digital Marketing'])}`, instructorId: (id%USERS_COUNT)+1, duration: `${10+id} hours`, level: 'Beginner'}));
const students = createItems(200, (id) => ({id, name: `Student #${id}`, email:`student${id}@university.edu`, major: 'Computer Science', enrollmentYear: 2022}));
const enrollments = createItems(400, (id) => ({id, studentId: (id%STUDENTS_COUNT)+1, courseId: (id%COURSES_COUNT)+1, grade: getRandomItem(['A','B','C','D','In Progress'])}));

// HEALTHCARE
const patients = createItems(200, (id) => ({id, name: `Patient #${id}`, dob: `1990-01-${(id%30)+1}`, bloodType: getRandomItem(['A+','B+','O-','AB+'])}));
const doctors = createItems(50, (id) => ({id, name: `Dr. ${getRandomItem(['Smith','Jones','Williams'])}`, specialty: getRandomItem(['Cardiology','Neurology','Pediatrics'])}));
const appointments = createItems(500, (id) => ({id, patientId: (id%PATIENTS_COUNT)+1, doctorId: (id%DOCTORS_COUNT)+1, date: `2025-09-${(id%30)+1}`, reason: 'Check-up'}));

// FINANCE
const transactions = createItems(1000, (id) => ({id, fromAccountId: (id%USERS_COUNT)+1, toAccountId: ((id+10)%USERS_COUNT)+1, amount: parseFloat((Math.random()*1000).toFixed(2)), currency: 'USD', date: new Date().toISOString()}));
const accounts = createItems(USERS_COUNT, (id) => ({id, userId: id, account_number: `ACC${String(id).padStart(12, '0')}`, balance: parseFloat((Math.random()*50000).toFixed(2)), currency: 'USD'}));

// MISC
const todos = createItems(200, (id) => ({ id, userId: (id % USERS_COUNT) + 1, title: `Complete report #${id}`, completed: Math.random() > 0.5 }));
const photos = createItems(500, (id) => ({ id, albumId: (id % 50)+1, title: `Photo from vacation ${id}`, url: `https://picsum.photos/seed/photo${id}/600/600`}));
const albums = createItems(50, (id) => ({id, userId: (id%USERS_COUNT)+1, title: `Trip to ${getRandomItem(['The Mountains','The Beach','The City'])}`}));


const db = {
    // E-Commerce
    users, products, categories, reviews, carts, orders,
    // Social & Content
    posts, comments, books,
    // Corporate
    companies, employees, projects, tasks,
    // Listings
    apartments: createItems(50, createProperty('Apartment')),
    villas: createItems(50, createProperty('Villa')),
    vehicles,
    // Education
    courses, students, enrollments,
    // Healthcare
    patients, doctors, appointments,
    // Finance
    transactions, accounts,
    // Misc
    todos, photos, albums
};

module.exports = db;
