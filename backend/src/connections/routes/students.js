import express from 'express';
import pool from '../database/client.js';

const router = express.Router();

// CREATE - Cadastrar novo aluno
router.post('/', async (req, res) => {
	const { name, email, ra, cpf } = req.body;
	try {
		const [result] = await pool.query(
			'INSERT INTO `ensinosuperiordb`.`students` (`name`, `email`, `ra`, `cpf`) VALUES (?, ?, ?, ?)',
			[name, email, ra, cpf]
		);
		res.status(201).json({ id: result.insertId, name, email, ra, cpf });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// READ - Listar todos os alunos
router.get('/', async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM `ensinosuperiordb`.`students`');
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// READ - Listar um aluno específico
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const [rows] = await pool.query('SELECT * FROM `ensinosuperiordb`.`students` WHERE `id` = ?', [id]);
		if (rows.length) {
			res.json(rows[0]);
		} else {
			res.status(404).json({ error: 'Aluno não encontrado' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// UPDATE - Atualizar um aluno
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { name, email, ra, cpf } = req.body;
	try {
		const [result] = await pool.query(
			'UPDATE `ensinosuperiordb`.`students` SET `name` = ?, `email` = ?, `ra` = ?, `cpf` = ? WHERE `id` = ?',
			[name, email, ra, cpf, id]
		);
		if (result.affectedRows) {
			res.json({ id, name, email, ra, cpf });
		} else {
			res.status(404).json({ error: 'Aluno não encontrado' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// DELETE - Remover um aluno
router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const [result] = await pool.query('DELETE FROM `ensinosuperiordb`.`students` WHERE `id` = ?', [id]);
		if (result.affectedRows) {
			res.json({ message: 'Aluno removido com sucesso' });
		} else {
			res.status(404).json({ error: 'Aluno não encontrado' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
