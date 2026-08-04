import express from "express";
import { prisma } from "./utils/prisma.js"

const app = express();
const PORT = 3100;

app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.users.findMany()
        res.json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
});


app.post('/users', async (req, res) => {
    try {  
        const newUser = await prisma.users.create({ 
            data: req.body
        });
        res.json(newUser)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
});

app.put('/users/:id_', async (req, res) => {
    try {
        const updateUser = await prisma.users.update({
            where: {
                id_: Number(req.params.id_)
            },
            data: req.body
        });
        res.json(updateUser)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
});

app.delete('/users/:id_', async (req, res) => {
    try {
        const deleteUser = await prisma.users.delete({
            where: {
                id_: Number(req.params.id_)
            }
        })
        res.json(deleteUser)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await prisma.products.findMany()
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
});

app.post('/products', async (req, res) => {
    try {
        const newProduct = await prisma.products.create({
            data: req.body
        });
        res.json(newProduct)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
});

app.put('/products/:code', async (req, res) => {
    try {
        const updateProduct = await prisma.products.update({
            where: {
                code: Number(req.params.code)
            },
            data: req.body
        });
        res.json(updateProduct)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
});

app.delete('/products/:code', async (req, res) => {
    try {
        const deleteProduct = await prisma.products.delete({
            where: {
                code: Number(req.params.code)
            }
        });
    
        const users = await prisma.products.findMany()
        res.json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
});

app.listen(PORT, () => {
    console.log(`server connected to port ${PORT}`);
});