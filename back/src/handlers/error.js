const errorResponse = (message, code, data) => ({
    error: {
        code: code || 500,
        message,
        data,
    },
})

export const error404 = (req, res) => res
    .status(404)
    .json(errorResponse('Not Found', 404))

export const errorHandler = (env) => (error, req, res) => res
    .status(error.status || 500)
    .json(errorResponse(
        error.message,
        error.status,
        (env === 'development') ? error : undefined,
    ))
