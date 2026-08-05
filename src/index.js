import express from "express";

import usersRoutes from "./routes/usersRoutes.js"
import errorHandler from "./middlewares/errorHandler.js"
import notFound from "./utils/notFound.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: "ok", message: "API running..." });
});

app.use("/users", usersRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});


// app.get('/products', async (req, res) => {
//     try {
//         const products = await prisma.products.findMany()
//         res.json(products)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json(error)
//     }
// });

// app.post('/products', async (req, res) => {
//     try {
//         const newProduct = await prisma.products.create({
//             data: req.body
//         });
//         res.json(newProduct)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json(error)
//     }
// });

// app.put('/products/:code', async (req, res) => {
//     try {
//         const updateProduct = await prisma.products.update({
//             where: {
//                 code: Number(req.params.code)
//             },
//             data: req.body
//         });
//         res.json(updateProduct)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json(error)
//     }
// });

// app.delete('/products/:code', async (req, res) => {
//     try {
//         const deleteProduct = await prisma.products.delete({
//             where: {
//                 code: Number(req.params.code)
//             }
//         });
    
//         const users = await prisma.products.findMany()
//         res.json(users)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json(error)
//     }
// });

