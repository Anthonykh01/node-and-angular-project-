import express, { Request, Response } from 'express';

interface Flashcard {
    id: number;
    courseId: number;
    question: string;
    answer: string;
    nextReviewDate: Date;
    easeFactor: number;
}

interface Course {
    id: number;
    name: string;
    description: string;
}

const app: express.Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(express.json());

// Sample data
const courses: Course[] = [
    { id: 1, name: 'Basic TypeScript', description: 'Introduction to TypeScript' },
    { id: 2, name: 'World Capitals', description: 'Learn about capitals around the world' },
    // Add more courses as needed
];

const flashcards: Flashcard[] = [
    { id: 1, courseId: 1, question: 'What is TypeScript?', answer: 'A superset of JavaScript', nextReviewDate: new Date(), easeFactor: 2.5 },
    { id: 2, courseId: 2, question: 'What is the capital of France?', answer: 'Paris', nextReviewDate: new Date(), easeFactor: 2.5 },
    // Add more flashcards as needed
];

// GET all courses
app.get('/api/course', (req: Request, res: Response) => {
    res.status(200).json(courses);
});

// GET flashcards for a specific course
app.get('/api/course/:courseId/flashcard', (req: Request, res: Response) => {
    const courseId = parseInt(req.params.courseId);
    const courseFlashcards = flashcards.filter(f => f.courseId === courseId);
    res.status(200).json(courseFlashcards);
});

// POST a new flashcard
app.post('/api/flashcard', (req: Request, res: Response) => {
    const newFlashcard: Flashcard = { ...req.body, id: flashcards.length + 1, nextReviewDate: new Date() };
    flashcards.push(newFlashcard);
    res.status(200).json(newFlashcard);
});

// PUT - Update a flashcard (for user responses)
app.put('/api/flashcard/:id', (req: Request, res: Response) => {
    const flashcardId = parseInt(req.params.id);
    const flashcardIndex = flashcards.findIndex(f => f.id === flashcardId);

    if (flashcardIndex > -1) {
        // Update nextReviewDate based on user response
        const userResponse = req.body.userResponse; // 'Easy', 'Medium', or 'Hard'
        // Logic to calculate nextReviewDate based on userResponse goes here
        // ...

        flashcards[flashcardIndex] = { ...flashcards[flashcardIndex], ...req.body };
        res.status(200).json(flashcards[flashcardIndex]);
    } else {
        res.status(404).send(`Flashcard not found for id: ${flashcardId}`);
    }
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
