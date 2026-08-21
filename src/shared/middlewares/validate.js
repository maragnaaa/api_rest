export function validate(schema, source = "body") {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            return res.status(400).json({ error: result.error.flatten() });
        }

        if (source !== "query") {
            req[source] = result.data;
        } 

        req.valid = req.valid || {};
        req.valid[source] = result.data;

        next();
    };
}