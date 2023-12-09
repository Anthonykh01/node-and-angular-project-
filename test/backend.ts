import express, { Request, Response } from 'express';

// TypeScript interface for Flashcards
interface Flashcard {
    id: number;
    question: string;
    answer: string;
    nextReviewDate: Date;
    repetition: number;
    interval: number;
    easeFactor: number;
}

// Create a new express application instance
const app: express.Application = express();

// The port the express app will listen on
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json()); // Middleware to parse JSON

// Hardcoded data for flashcards
const flashcards: Flashcard[] = [
    // Example flashcard
    { id: 1, question: 'What is TypeScript?', answer: 'A superset of JavaScript', nextReviewDate: new Date(), repetition: 0, interval: 1, easeFactor: 2.5 },
    // Add other flashcards as needed
];

// GET all flashcards
app.get('/api/flashcard', (req: Request, res: Response) => {
    res.status(200).json(flashcards);
});

// GET a specific flashcard by ID
app.get('/api/flashcard/:id', (req: Request, res: Response) => {
    const flashcardId = parseInt(req.params.id);
    const flashcard = flashcards.find(f => f.id === flashcardId);

    if (flashcard) {
        res.status(200).json(flashcard);
    } else {
        res.status(404).send(`Flashcard not found for id: ${flashcardId}`);
    }
});

// POST a new flashcard
app.post('/api/flashcard', (req: Request, res: Response) => {
    const newFlashcard: Flashcard = {
        ...req.body,
        id: flashcards.length + 1, // Simple ID assignment
        nextReviewDate: new Date(), // Initialize with current date
        repetition: 0,
        interval: 1,
        easeFactor: 2.5
    };
    flashcards.push(newFlashcard);
    res.status(200).json(newFlashcard);
});

// PUT - Update a flashcard
app.put('/api/flashcard/:id', (req: Request, res: Response) => {
    const flashcardId = parseInt(req.params.id);
    const flashcardIndex = flashcards.findIndex(f => f.id === flashcardId);

    if (flashcardIndex > -1) {
        flashcards[flashcardIndex] = { ...flashcards[flashcardIndex], ...req.body };
        res.status(200).json(flashcards[flashcardIndex]);
    } else {
        res.status(404).send(`Flashcard not found for id: ${flashcardId}`);
    }
});

// Serve the application at the given port
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
