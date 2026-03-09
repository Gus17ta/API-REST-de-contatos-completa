const Database = require('better-sqlite3')

const db = new Database('contatos.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS contatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        telefone TEXT NOT NULL
    )
`)
module.exports = db