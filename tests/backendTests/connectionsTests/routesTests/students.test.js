import pool from '../../../../backend/src/connections/database/client';
import express from 'express';
import students from '../../../../backend/src/connections/routes/students';
import request from 'supertest';

jest.mock('../../../../backend/src/connections/database/client.js', () => ({
    query: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/students', students);

describe('POST /students', () => {

	const postQuery = 'INSERT INTO `ensinosuperiordb`.`students` (`name`, `email`, `ra`, `cpf`) VALUES (?, ?, ?, ?)';

    test('create a new student - return status 201', async () => {
        const newStudent = {
			name: 'Arthur Feu',
			email: 'arthur.feu@gmail.com',
			ra: '12345678',
			cpf: '123.456.789-10',
		};

		// mock the query insertion with success
		const mockResult = [{ insertId: 1 }];
        pool.query.mockResolvedValue(mockResult);

        const response = await request(app)
            .post('/students')
            .send(newStudent);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 1, ...newStudent });
        expect(pool.query).toHaveBeenCalledWith(
            postQuery,
            [
				newStudent.name,
				newStudent.email,
				newStudent.ra,
				newStudent.cpf
			]
        );
    });

    test('database error - return status 500', async () => {
		const newStudent = {
			name: 'Arthur Feu',
			email: 'arthur.feu@gmail.com',
			ra: '12345678',
			cpf: '123.456.789-10',
		};

		// mock the query insertion with error
        const mockError = new Error('Database error');
        pool.query.mockRejectedValue(mockError);

        const response = await request(app)
            .post('/students')
            .send(newStudent);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Database error' });
    });

	test('duplicate error - return status 500', async () => {
		const newStudent = {
			name: 'Arthur Feu',
			email: 'arthur.feu@gmail.com',
			ra: '12345678',
			cpf: '123.456.789-10',
		};

		// mock the query insertion with duplicate entry error
        const mockError = new Error('Duplicate entry');
        mockError.code = 'ER_DUP_ENTRY'; 
        pool.query.mockRejectedValue(mockError);

        const response = await request(app)
            .post('/students')
            .send(newStudent);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Duplicate entry' });
	})
});

describe('GET /students', () => {
	test('get all students - return status 200', async () => {
		const mockStudents = [
			{
				id: 1,
				name: 'Arthur Feu',
				email: 'arthur.feu@gmail.com',
				ra: '12345678',
				cpf: '123.456.789-10'
			}
		];

		// mock the query selection with success
		const mockResult = [mockStudents];
		pool.query.mockResolvedValue(mockResult);

		const response = await request(app)
			.get('/students');
		
		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockStudents);
	});

	test('database error - return status 500', async () => {
		// mock the query selection with error
		const mockError = new Error('Database error');
		pool.query.mockRejectedValue(mockError);

		const response = await request(app)
			.get('/students');

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: 'Database error' });
	});

	test('get specific student - return status 200', async () => {
		const mockStudent = {
			id: 1,
			name: 'Arthur Feu',
			email: 'arthur.feu@gmail.com',
			ra: '12345678',
			cpf: '123.456.789-10'
		};

		// mock the query selection with success
		const mockResult = [[mockStudent]];
		pool.query.mockResolvedValue(mockResult);

		const response = await request(app)
			.get('/students/1');

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockStudent);
	});

	test('student not found - return status 404', async () => {
		// mock the query selection with empty result
		const mockResult = [[]];
		pool.query.mockResolvedValue(mockResult);

		const response = await request(app)
			.get('/students/1');

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: 'Aluno não encontrado' });
	});

	test('database error - return status 500', async () => {
		// mock the query selection with error
		const mockError = new Error('Database error');
		pool.query.mockRejectedValue(mockError);

		const response = await request(app)
			.get('/students/1');

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: 'Database error' });
	});
});

describe('PUT /students', () => {
	test('update a student - return status 200', async () => {
		const updatedStudent = {
			name: 'Arthur Feu',
			email: 'arthur.feu@gmail.com',
			ra: '23456789',
			cpf: '123.456.789-10'
		};

		// mock the query update with success
		const mockResult = { affectedRows: 1 };
		pool.query.mockResolvedValue([mockResult]);

		const response = await request(app)
			.put('/students/1')
			.send(updatedStudent);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ id: "1", ...updatedStudent });
	});

	test('student not found - return status 404', async () => {
		const updatedStudent = {
			name: 'Arthur Feu',
			email: 'arthur.feu@gmail.com',
			ra: '23456789',
			cpf: '123.456.789-10'
		};

		// mock the query update with no affected rows
		const mockResult = { affectedRows: 0 };
		pool.query.mockResolvedValue([mockResult]);
		
		const response = await request(app)
			.put('/students/1')
			.send(updatedStudent);

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: 'Aluno não encontrado' });
	});

	test('database error - return status 500', async () => {
		const updatedStudent = {
			name: 'Arthur Feu',
			email: 'arthur.feu@gmail.com',
			ra: '23456789',
			cpf: '123.456.789-10'
		};

		// mock the query update with error
		const mockError = new Error('Database error');
		pool.query.mockRejectedValue(mockError);

		const response = await request(app)
			.put('/students/1')
			.send(updatedStudent);
		
		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: 'Database error' });
	});
});

describe('DELETE /students', () => {
	test('delete a student - return status 200', async () => {
		// mock the query deletion with success
		const mockResult = { affectedRows: 1 };
		pool.query.mockResolvedValue([mockResult]);

		const response = await request(app)
			.delete('/students/1');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ message: 'Aluno removido com sucesso' });
	});

	test('student not found - return status 404', async () => {
		// mock the query deletion with no affected rows
		const mockResult = { affectedRows: 0 };
		pool.query.mockResolvedValue([mockResult]);

		const response = await request(app)
			.delete('/students/1');

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: 'Aluno não encontrado' });
	});

	test('database error - return status 500', async () => {
		// mock the query deletion with error
		const mockError = new Error('Database error');
		pool.query.mockRejectedValue(mockError);

		const response = await request(app)
			.delete('/students/1');

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: 'Database error' });
	});
});