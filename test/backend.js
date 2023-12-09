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
// Hardcoded data for flashcards
const flashcards = [
    // Example flashcard
    { id: 1, question: 'What is TypeScript?', answer: 'A superset of JavaScript', nextReviewDate: new Date(), repetition: 0, interval: 1, easeFactor: 2.5 },
    // Add other flashcards as needed
];
// GET all flashcards
app.get('/api/flashcard', (req, res) => {
    res.status(200).json(flashcards);
});
// GET a specific flashcard by ID
app.get('/api/flashcard/:id', (req, res) => {
    const flashcardId = parseInt(req.params.id);
    const flashcard = flashcards.find(f => f.id === flashcardId);
    if (flashcard) {
        res.status(200).json(flashcard);
    }
    else {
        res.status(404).send(`Flashcard not found for id: ${flashcardId}`);
    }
});
// POST a new flashcard
app.post('/api/flashcard', (req, res) => {
    const newFlashcard = Object.assign(Object.assign({}, req.body), { id: flashcards.length + 1, nextReviewDate: new Date(), repetition: 0, interval: 1, easeFactor: 2.5 });
    flashcards.push(newFlashcard);
    res.status(200).json(newFlashcard);
});
// PUT - Update a flashcard
app.put('/api/flashcard/:id', (req, res) => {
    const flashcardId = parseInt(req.params.id);
    const flashcardIndex = flashcards.findIndex(f => f.id === flashcardId);
    if (flashcardIndex > -1) {
        flashcards[flashcardIndex] = Object.assign(Object.assign({}, flashcards[flashcardIndex]), req.body);
        res.status(200).json(flashcards[flashcardIndex]);
    }
    else {
        res.status(404).send(`Flashcard not found for id: ${flashcardId}`);
    }
});
// Serve the application at the given port
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
