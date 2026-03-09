const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', (req, res) => {
    const contatos = db.prepare('SELECT * FROM contatos').all()
    res.json(contatos)
})

router.post('/', (req, res) => {
    const { nome, email, telefone } = req.body

    if (!nome || !email || !telefone) {
        return res.status(400).json({ 
            erro: 'Nome, email e telefone são obrigatórios!' 
        })
    }

    const result = db.prepare(
        'INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?)'
    ).run(nome, email, telefone)

    res.status(201).json({ id: result.lastInsertRowid, nome, email, telefone })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { nome, email, telefone } = req.body

    const contato = db.prepare('SELECT * FROM contatos WHERE id = ?').get(id)

    if (!contato) {
        return res.status(404).json({ erro: 'Contato não encontrado!' })
    }

    db.prepare(
        'UPDATE contatos SET nome = ?, email = ?, telefone = ? WHERE id = ?'
    ).run(nome, email, telefone, id)

    res.json({ mensagem: 'Contato atualizado!' })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    const contato = db.prepare('SELECT * FROM contatos WHERE id = ?').get(id)

    if (!contato) {
        return res.status(404).json({ erro: 'Contato não encontrado!' })
    }

    db.prepare('DELETE FROM contatos WHERE id = ?').run(id)
    res.json({ mensagem: 'Contato deletado!' })
})

module.exports = router