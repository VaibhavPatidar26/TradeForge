export function validate(schema) {
    return function (req, res, next) {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid input",
                errors: result.error.issues
            });
        }
        req.body = result.data;
        next();
    };
}
//# sourceMappingURL=validateFields.js.map