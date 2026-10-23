const express = require('express');
const { poolPromise } = require('./config/db'); 

const app = express();
app.use(express.json());


app.get('/produtos', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Produtos');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
});


app.get('/produtos/inner-join', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT p.id, p.nome AS produto, p.preco, c.nome AS categoria
            FROM Produtos p
            INNER JOIN Categorias c ON p.categoria_id = c.id
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
});

app.get('/produtos/left-join', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT p.id, p.nome AS produto, p.preco, c.nome AS categoria
            FROM Produtos p
            LEFT JOIN Categorias c ON p.categoria_id = c.id
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
});

app.get('/produtos/right-join', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT p.id, p.nome AS produto, p.preco, c.nome AS categoria
            FROM Produtos p
            RIGHT JOIN Categorias c ON p.categoria_id = c.id
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor a rodar na porta ${PORT}`);
});