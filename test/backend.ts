import express, { Request, Response } from 'express';

interface Flashcard {
    id: number;
    courseId: number;
    question: string;
    answer: string;
    nextReviewDate: Date;
    easeFactor: number;
    interval: number;
}

interface Course {
    id: number;
    name: string;
    description: string;
}
type UserResponse = 'Easy' | 'Medium' | 'Hard';

const app: express.Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(express.json());

// Sample data
const courses: Course[] = [
    { id: 1, name: 'Basic TypeScript', description: 'Introduction to TypeScript' },
    { id: 2, name: 'World Capitals', description: 'Learn about capitals around the world' }
];

const flashcards: Flashcard[] = [
    // Existing flashcards...
];

app.get('/api/course', (req: Request, res: Response) => {
    res.status(200).json(courses);
});

app.get('/api/course/:courseId/flashcard', (req: Request, res: Response) => {
    const courseId = parseInt(req.params.courseId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const courseFlashcards = flashcards.filter(f =>
        f.courseId === courseId && new Date(f.nextReviewDate).getTime() <= today.getTime()
    );
    res.status(200).json(courseFlashcards);
});

app.post('/api/course', (req: Request, res: Response) => {
    const newCourse: Course = { ...req.body, id: courses.length + 1 };
    courses.push(newCourse);
    res.status(200).json(newCourse);
});

app.post('/api/course/:courseId/flashcard', (req: Request, res: Response) => {
    const courseId = parseInt(req.params.courseId);
    const newFlashcard: Flashcard = { ...req.body, id: flashcards.length + 1, courseId, nextReviewDate: new Date(), interval: 1 };
    flashcards.push(newFlashcard);
    res.status(201).json(newFlashcard);
});

app.put('/api/flashcard/:id', (req: Request, res: Response) => {
    const flashcardId = parseInt(req.params.id);
    const flashcardIndex = flashcards.findIndex(f => f.id === flashcardId);

    if (flashcardIndex > -1) {
        const flashcard = flashcards[flashcardIndex];
        const userResponse: UserResponse = req.body.userResponse as UserResponse;
        const factorMap: { [key in UserResponse]: number } = { 'Easy': 3, 'Medium': 2, 'Hard': 1.5 };

        let currentInterval = flashcard.interval || 1;
        const newInterval: number = currentInterval * (factorMap[userResponse] || 1);
        const nextReviewDate: Date = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

        flashcards[flashcardIndex] = { ...flashcard, nextReviewDate, interval: newInterval };
        res.status(200).json(flashcards[flashcardIndex]);
    } else {
        res.status(404).send(`Flashcard not found for id: ${flashcardId}`);
    }
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
