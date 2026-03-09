const express = require('express')
const router = express.Router()

let contatos = []

router.get('/', (req, res) => {
    res.json(contatos)
})

router.post('/', (req, res) => {
    const { nome, email, telefone } = req.body

    if (!nome || !email || !telefone) {
        return res.status(400).json({ 
            erro: 'Nome, email e telefone são obrigatórios!' 
        })
    }

    const novoContato = {
        id: Date.now(),
        nome,
        email,
        telefone
    }

    contatos.push(novoContato)
    res.status(201).json(novoContato)
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { nome, email, telefone } = req.body

    const contato = contatos.find(c => c.id === Number(id))
    
    if (!contato) {
        return res.status(404).json({ 
            erro: 'Contato não encontrado!' 
        })
    }

    contatos = contatos.map(c =>
        c.id === Number(id)
        ? { ...c, nome, email, telefone }
        : c
    )
    res.json({ mensagem: 'Contato atualizado!' })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    const contato = contatos.find(c => c.id === Number(id))

    if (!contato) {
        return res.status(404).json({ 
            erro: 'Contato não encontrado!' 
        })
    }

    contatos = contatos.filter(c => c.id !== Number(id))
    res.json({ mensagem: 'Contato deletado!' })
})

module.exports = router