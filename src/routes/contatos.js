const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM contatos')
    res.json(result.rows)
})

router.post('/', async (req, res) => {
    const { nome, email, telefone } = req.body

    if (!nome || !email || !telefone) {
        return res.status(400).json({ 
            erro: 'Nome, email e telefone são obrigatórios!' 
        })
    }

    const result = await db.query(
        'INSERT INTO contatos (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
        [nome, email, telefone]
    )

    res.status(201).json(result.rows[0])
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { nome, email, telefone } = req.body

    const contato = await db.query(
        'SELECT * FROM contatos WHERE id = $1', [id]
    )

    if (contato.rows.length === 0) {
        return res.status(404).json({ erro: 'Contato não encontrado!' })
    }

    await db.query(
        'UPDATE contatos SET nome = $1, email = $2, telefone = $3 WHERE id = $4',
        [nome, email, telefone, id]
    )

    res.json({ mensagem: 'Contato atualizado!' })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    const contato = await db.query(
        'SELECT * FROM contatos WHERE id = $1', [id]
    )

    if (contato.rows.length === 0) {
        return res.status(404).json({ erro: 'Contato não encontrado!' })
    }

    await db.query('DELETE FROM contatos WHERE id = $1', [id])
    res.json({ mensagem: 'Contato deletado!' })
})

module.exports = router