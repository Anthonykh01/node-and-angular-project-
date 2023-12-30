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

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

const courses: Course[] = [
    { id: 1, name: 'Basic TypeScript', description: 'Introduction to TypeScript' },
    { id: 2, name: 'World Capitals', description: 'Learn about capitals around the world' },
    // ... Other courses ...
];

let flashcards: Flashcard[] = [
    { id: 1, courseId: 1, question: 'What is TypeScript?', answer: 'A superset of JavaScript', nextReviewDate: new Date(), easeFactor: 2.5, interval: 1 },
    { id: 2, courseId: 1, question: 'What are TypeScript interfaces?', answer: 'Custom types to describe object structures', nextReviewDate: new Date(), easeFactor: 2.5, interval: 1 },
    { id: 3, courseId: 1, question: 'What is TypeScript used for?', answer: 'Building large scale applications with JavaScript', nextReviewDate: new Date(), easeFactor: 2.5, interval: 1 },
    { id: 4, courseId: 2, question: 'What is the capital of France?', answer: 'Paris', nextReviewDate: new Date(new Date().setDate(new Date().getDate() - 1)), easeFactor: 2.5, interval: 1 },
    { id: 5, courseId: 2, question: 'What is the capital of Japan?', answer: 'Tokyo', nextReviewDate: new Date(new Date().setDate(new Date().getDate() - 2)), easeFactor: 2.5, interval: 1 },
    { id: 6, courseId: 2, question: 'What is the capital of Italy?', answer: 'Rome', nextReviewDate: new Date(new Date().setDate(new Date().getDate() - 3)), easeFactor: 2.5, interval: 1 },
    // ... Other flashcards ...
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
    res.status(201).json(newCourse);
});

app.post('/api/course/:courseId/flashcard', (req: Request, res: Response) => {
    const courseId = parseInt(req.params.courseId);
    const pastReviewDate = new Date();
    pastReviewDate.setDate(pastReviewDate.getDate() - 1); // Set to yesterday

    const newFlashcard: Flashcard = {
        ...req.body,
        id: flashcards.length + 1,
        courseId,
        nextReviewDate: pastReviewDate,
        interval: 1
    };
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
    console.log(`Server running on port ${port}`);
});
