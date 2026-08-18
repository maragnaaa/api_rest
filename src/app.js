import express from "express";
import routes from "./routes.js"
import errorHandler from "./middlewares/errorHandler.js"
import notFound from "./utils/notFound.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: "ok", message: "API running..." });
});

app.use(routes);

app.use(notFound);
app.use(errorHandler);

export default app