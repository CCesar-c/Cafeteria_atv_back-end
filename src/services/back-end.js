import express from 'express'
import configuracao from './connection.js'
import cors from 'cors';
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/clientes", async (req, res) => {
    const repons = await configuracao.query('select * from clientes')
    res.json(repons.rows);
})

app.post("/clientes", async (req, res) => {
    const { nome, email } = req.body
    if (nome != null || email != null) {
        const repons = await configuracao.query('insert into clientes values (Default, $1, $2) returning *', [nome, email]);
        res.json(repons.rows);
    } else {
        res.status(400).send("Erro do clientes")
    }
})

app.put("/clientes", async (req, res) => {
    const { id, nome, email } = req.body
    const repons = await configuracao.query('update clientes set nome = $1, email = $2 where id = $3 returning *', [nome, email, id])
    res.json(repons.rows);
})

app.delete("/clientes", async (req, res) => {
    const { id } = req.body
    const repons = await configuracao.query('drop column from clientes where id = $1 returning *', [id])
    res.json(repons.rows);
})

// pedidos
app.get('/pedidos', async (req, res) => {
    const response = await configuracao.query("select * from pedidos")
    res.json(response.rows)
})

app.post('/pedidos', async (req, res) => {
    const { produto, valor, status, cliente_id } = req.body
    const response = await configuracao.query("insert into pedidos values (Default, $1, $2, $3, $4) returning *", [produto, valor, status, cliente_id])
    res.json(response.rows)
})

app.put('/pedidos', async (req, res) => {
    const { id, status } = req.body
    const response = await configuracao.query('update pedidos set status = $1 where id = $3 returning *', [status, id])
    res.json(response.rows)
})
app.get('/pedidos_especifico', async (req, res) => {
    const { status } = req.body
    const response = await configuracao.query("select * from pedidos where status = $1", [status])
    res.json(response.rows)
})



app.listen(3000, () =>{
    console.log("http://localhost:3000/")
})