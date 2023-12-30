"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(express_1.default.json());
// Sample data
const courses = [
    { id: 1, name: 'Basic TypeScript', description: 'Introduction to TypeScript' },
    { id: 2, name: 'World Capitals', description: 'Learn about capitals around the world' },
    // Add more courses as needed
];
const flashcards = [
    { id: 1, courseId: 1, question: 'What is TypeScript?', answer: 'A superset of JavaScript', nextReviewDate: new Date(), easeFactor: 2.5, interval: 1 },
    { id: 2, courseId: 1, question: 'What are TypeScript interfaces?', answer: 'Custom types to describe object structures', nextReviewDate: new Date(), easeFactor: 2.5, interval: 1 },
    { id: 3, courseId: 1, question: 'What is TypeScript used for?', answer: 'Building large scale applications with JavaScript', nextReviewDate: new Date(), easeFactor: 2.5, interval: 1 },
    // Additional flashcards for World Capitals course, with past nextReviewDate
    { id: 4, courseId: 2, question: 'What is the capital of France?', answer: 'Paris', nextReviewDate: new Date(new Date().setDate(new Date().getDate() - 1)), easeFactor: 2.5, interval: 1 },
    { id: 5, courseId: 2, question: 'What is the capital of Japan?', answer: 'Tokyo', nextReviewDate: new Date(new Date().setDate(new Date().getDate() - 2)), easeFactor: 2.5, interval: 1 },
    { id: 6, courseId: 2, question: 'What is the capital of Italy?', answer: 'Rome', nextReviewDate: new Date(new Date().setDate(new Date().getDate() - 3)), easeFactor: 2.5, interval: 1 },
    // Add more flashcards as needed
    // Add more flashcards as needed
];
// GET all courses
app.get('/api/course', (req, res) => {
    res.status(200).json(courses);
});
// GET flashcards for a specific course
app.get('/api/course/:courseId/flashcard', (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of today
    const courseFlashcards = flashcards.filter(f => f.courseId === courseId &&
        new Date(f.nextReviewDate).getTime() <= today.getTime() // Include past due dates
    );
    res.status(200).json(courseFlashcards);
});
// POST a new course
app.post('/api/course', (req, res) => {
    const newCourse = Object.assign(Object.assign({}, req.body), { id: courses.length + 1 });
    courses.push(newCourse);
    res.status(200).json(newCourse);
});
// POST a new flashcard
app.post('/api/flashcard', (req, res) => {
    const newFlashcard = Object.assign(Object.assign({}, req.body), { id: flashcards.length + 1, nextReviewDate: new Date(), interval: 1 }); // Set a default interval
    flashcards.push(newFlashcard);
    res.status(200).json(newFlashcard);
});
// PUT - Update a flashcard (for user responses)
app.put('/api/flashcard/:id', (req, res) => {
    const flashcardId = parseInt(req.params.id);
    const flashcardIndex = flashcards.findIndex(f => f.id === flashcardId);
    if (flashcardIndex > -1) {
        const flashcard = flashcards[flashcardIndex];
        const userResponse = req.body.userResponse; // 'Easy', 'Medium', or 'Hard'
        // Set the multiplication factors for the interval
        const factorMap = {
            'Easy': 3,
            'Medium': 2,
            'Hard': 1.5 // Smaller factor
        };
        // Calculate the next review date
        let currentInterval = flashcard.interval || 1; // Provide a default if not set
        const newInterval = currentInterval * (factorMap[userResponse] || 1);
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
        // Update flashcard details
        flashcards[flashcardIndex] = Object.assign(Object.assign({}, flashcard), { nextReviewDate: nextReviewDate, interval: newInterval });
        res.status(200).json(flashcards[flashcardIndex]);
    }
    else {
        res.status(404).send(`Flashcard not found for id: ${flashcardId}`);
    }
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
