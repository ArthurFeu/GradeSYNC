import express from 'express';
import studentsRouter from '../routes/students.js';
import coursesRouter from '../routes/courses.js';
import enrollmentsRouter from '../routes/enrollments.js';
import schoolsRouter from '../routes/schools.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

const corsOption = {
	origin: ['http://localhost:3000'],
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"],
}

app.use(cors(corsOption))
app.use(express.json());
app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);
app.use('/enrollments', enrollmentsRouter);
app.use('/schools', schoolsRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
