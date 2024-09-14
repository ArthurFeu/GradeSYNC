import express from 'express';
import pool from '../database/client.js';

const router = express.Router();

// CREATE - Cadastrar nova escola
router.post('/', async (req, res) => {
	const { name, description } = req.body;
	try {
		const [result] = await pool.query(
			'INSERT INTO `ensinosuperiordb`.`schools` (`name`, `description`) VALUES (?, ?)',
			[name, description]
		);
		res.status(201).json({ id: result.insertId, name, description });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// READ - Listar todas as escolas
router.get('/', async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM `ensinosuperiordb`.`schools`');
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// READ - Listar uma escola específica
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const [rows] = await pool.query('SELECT * FROM `ensinosuperiordb`.`schools` WHERE `id` = ?', [id]);
		if (rows.length) {
			res.json(rows[0]);
		} else {
			res.status(404).json({ error: 'Escola não encontrada' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// UPDATE - Atualizar uma escola
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;
	try {
		const [result] = await pool.query(
			'UPDATE `ensinosuperiordb`.`schools` SET `name` = ?, `description` = ? WHERE `id` = ?',
			[name, description, id]
		);
		if (result.affectedRows) {
			res.json({ id, name, description });
		} else {
			res.status(404).json({ error: 'Escola não encontrada' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// DELETE - Remover uma escola
router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const [result] = await pool.query('DELETE FROM `ensinosuperiordb`.`schools` WHERE `id` = ?', [id]);
		if (result.affectedRows) {
			res.json({ message: 'Escola removida com sucesso' });
		} else {
			res.status(404).json({ error: 'Escola não encontrada' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
