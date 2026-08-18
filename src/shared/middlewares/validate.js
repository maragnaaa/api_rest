export function validate(schema, source = "body") {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.sucess) {
            return res.status(400).json({ error: result.error.flatten().fieldErrors });
        }
        req[source] = result.data;
        next();
    };
}