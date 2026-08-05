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