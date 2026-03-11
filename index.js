const express = require('express')
const cors = require('cors')
const logger = require('./src/middlewares/logger')
const contatosRouter = require('./src/routes/contatos')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.use('/contatos', contatosRouter)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!')
})