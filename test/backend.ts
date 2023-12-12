import express, { Request, Response } from 'express';

interface Flashcard {
    id: number;
    courseId: number;
    question: string;
    answer: string;
    nextReviewDate: Date;
    easeFactor: number;
    interval: number; // Added interval property
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
    { id: 1, courseId: 1, question: 'What is TypeScript?', answer: 'A superset of JavaScript', nextReviewDate: new Date(), easeFactor: 2.5, interval: 1 },
    { id: 2, courseId: 2, question: 'What is the capital of France?', answer: 'Paris', nextReviewDate: new Date(), easeFactor: 2.5, interval: 1 },
    // Add more flashcards as needed
];

// GET all courses
app.get('/api/course', (req: Request, res: Response) => {
    res.status(200).json(courses);
});

// GET flashcards for a specific course
app.get('/api/course/:courseId/flashcard', (req: Request, res: Response) => {
    const courseId = parseInt(req.params.courseId);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of today

    const courseFlashcards = flashcards.filter(f =>
        f.courseId === courseId &&
        new Date(f.nextReviewDate).getTime() <= today.getTime() // Include past due dates
    );
    res.status(200).json(courseFlashcards);
});

// POST a new course
app.post('/api/course', (req: Request, res: Response) => {
    const newCourse: Course = { ...req.body, id: courses.length + 1 };
    courses.push(newCourse);
    res.status(200).json(newCourse);
});

// POST a new flashcard
app.post('/api/flashcard', (req: Request, res: Response) => {
    const newFlashcard: Flashcard = { ...req.body, id: flashcards.length + 1, nextReviewDate: new Date(), interval: 1 }; // Set a default interval
    flashcards.push(newFlashcard);
    res.status(200).json(newFlashcard);
});

// PUT - Update a flashcard (for user responses)
app.put('/api/flashcard/:id', (req: Request, res: Response) => {
    const flashcardId = parseInt(req.params.id);
    const flashcardIndex = flashcards.findIndex(f => f.id === flashcardId);

    if (flashcardIndex > -1) {
        const flashcard = flashcards[flashcardIndex];
        const userResponse = req.body.userResponse; // 'Easy', 'Medium', or 'Hard'

        // TypeScript: Define the possible keys for factorMap to be more explicit
        type UserResponse = 'Easy' | 'Medium' | 'Hard';

        // Set the multiplication factors for the interval
        const factorMap: { [key in UserResponse]: number } = {
            'Easy': 3, // Larger factor for easier cards
            'Medium': 2, // Moderate factor
            'Hard': 1.5 // Smaller factor
        };

        // Calculate the next review date
        let currentInterval = flashcard.interval || 1; // Provide a default if not set
        const newInterval: number = currentInterval * (factorMap[userResponse as UserResponse] || 1);
        const nextReviewDate: Date = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

        // Update flashcard details
        flashcards[flashcardIndex] = {
            ...flashcard,
            nextReviewDate: nextReviewDate,
            interval: newInterval
        };

        res.status(200).json(flashcards[flashcardIndex]);
    } else {
        res.status(404).send(`Flashcard not found for id: ${flashcardId}`);
    }
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
