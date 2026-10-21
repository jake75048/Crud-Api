const express = require("express");
const { sql, poolPromise } = require("./config/db");

const app = express();


app.use(express.json());


app.post("/produtos", async (req, res) => {
    const { nome, preco, quantidade } = req.body;

    if (!nome || preco == null || quantidade == null) {
        return res.status(400).json({
            erro: "Informe nome, preço e quantidade."
        });
    }

    if (preco < 0 || quantidade < 0) {
        return res.status(400).json({
            erro: "Preço e quantidade não podem ser negativos."
        });
    }

    try {
        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("nome", sql.NVarChar(100), nome)
            .input("preco", sql.Decimal(10, 2), preco)
            .input("quantidade", sql.Int, quantidade)
            .query(`
                INSERT INTO Produtos (Nome, Preco, Quantidade)
                OUTPUT INSERTED.Id
                VALUES (@nome, @preco, @quantidade)
            `);

        res.status(201).json({
            mensagem: "Produto cadastrado com sucesso!",
            id: resultado.recordset[0].Id
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao cadastrar produto."
        });
    }
});

app.get("/produtos", async (req, res) => {
    try {
        const pool = await poolPromise;

        const resultado = await pool.request().query(`
            SELECT Id, Nome, Preco, Quantidade
            FROM Produtos
            ORDER BY Id
        `);

        res.json(resultado.recordset);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao consultar produtos."
        });
    }
});


app.get("/produtos/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "ID inválido." });
    }

    try {
        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, id)
            .query(`
                SELECT Id, Nome, Preco, Quantidade
                FROM Produtos
                WHERE Id = @id
            `);

        if (resultado.recordset.length === 0) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        res.json(resultado.recordset[0]);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao consultar o produto."
        });
    }
});


app.put("/produtos/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { nome, preco, quantidade } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "ID inválido." });
    }

    if (!nome || preco == null || quantidade == null) {
        return res.status(400).json({
            erro: "Informe nome, preço e quantidade para atualizar."
        });
    }

    try {
        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, id)
            .input("nome", sql.NVarChar(100), nome)
            .input("preco", sql.Decimal(10, 2), preco)
            .input("quantidade", sql.Int, quantidade)
            .query(`
                UPDATE Produtos
                SET Nome = @nome,
                    Preco = @preco,
                    Quantidade = @quantidade
                WHERE Id = @id
            `);

        if (resultado.rowsAffected[0] === 0) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        res.json({ mensagem: "Produto atualizado com sucesso!" });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao atualizar produto."
        });
    }
});


app.delete("/produtos/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "ID inválido." });
    }

    try {
        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM Produtos WHERE Id = @id");

        if (resultado.rowsAffected[0] === 0) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        res.json({ mensagem: "Produto excluído com sucesso!" });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao excluir produto."
        });
    }
});


const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});