"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Create a new express application instance
const app = (0, express_1.default)();
// The port the express app will listen on
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(express_1.default.json()); // Middleware to parse JSON
// Hardcoded data
const learningPackages = [
    { id: 1, title: 'Learn TypeScript', description: 'TypeScript basics', category: 'Programming', targetAudience: 'Beginners', difficultyLevel: 3 },
    { id: 2, title: 'Learn NodeJs', description: 'NodeJs basics', category: 'Programming', targetAudience: 'Beginners', difficultyLevel: 3 },
    // Add other packages as needed
];
// Define the '/api/liveness' route
app.get('/api/liveness', (req, res) => {
    res.status(200).send('OK');
});
// GET all learning packages
app.get('/api/package', (req, res) => {
    res.status(200).json(learningPackages);
});
// GET a specific learning package by ID
app.get('/api/package/:id', (req, res) => {
    const packageId = parseInt(req.params.id);
    const learningPackage = learningPackages.find(p => p.id === packageId);
    if (learningPackage) {
        res.status(200).json(learningPackage);
    }
    else {
        res.status(404).send(`Entity not found for id: ${packageId}`);
    }
});
// POST a new learning package
app.post('/api/package', (req, res) => {
    const newPackage = req.body;
    newPackage.id = learningPackages.length + 1; // Simple ID assignment
    learningPackages.push(newPackage);
    res.status(200).json(newPackage);
});
// PUT - Update a learning package
app.put('/api/package/:id', (req, res) => {
    const packageId = parseInt(req.params.id);
    const packageIndex = learningPackages.findIndex(p => p.id === packageId);
    if (packageIndex > -1) {
        learningPackages[packageIndex] = Object.assign(Object.assign({}, learningPackages[packageIndex]), req.body);
        res.status(200).json(learningPackages[packageIndex]);
    }
    else {
        res.status(404).send(`Entity not found for id: ${packageId}`);
    }
});
// Serve the application at the given port
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
