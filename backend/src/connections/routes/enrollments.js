import express from 'express';
import pool from '../database/client.js';

const router = express.Router();

// CREATE - Cadastrar nova matrícula
router.post('/', async (req, res) => {
	const { student_id, course_id } = req.body;
	try {
		const [result] = await pool.query(
			'INSERT INTO `ensinosuperiordb`.`enrollments` (`student_id`, `course_id`) VALUES (?, ?)',
			[student_id, course_id]
		);
		res.status(201).json({ id: result.insertId, student_id, course_id });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// READ - Listar todas as matrículas
router.get('/', async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM `ensinosuperiordb`.`enrollments`');
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// READ - Listar uma matrícula específica
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const [rows] = await pool.query('SELECT * FROM `ensinosuperiordb`.`enrollments` WHERE `id` = ?', [id]);
		if (rows.length) {
			res.json(rows[0]);
		} else {
			res.status(404).json({ error: 'Matrícula não encontrada' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// UPDATE - Atualizar uma matrícula
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { student_id, course_id } = req.body;
	try {
		const [result] = await pool.query(
			'UPDATE `ensinosuperiordb`.`enrollments` SET `student_id` = ?, `course_id` = ? WHERE `id` = ?',
			[student_id, course_id, id]
		);
		if (result.affectedRows) {
			res.json({ id, student_id, course_id });
		} else {
			res.status(404).json({ error: 'Matrícula não encontrada' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// DELETE - Remover uma matrícula
router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const [result] = await pool.query('DELETE FROM `ensinosuperiordb`.`enrollments` WHERE `id` = ?', [id]);
		if (result.affectedRows) {
			res.json({ message: 'Matrícula removida com sucesso' });
		} else {
			res.status(404).json({ error: 'Matrícula não encontrada' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
