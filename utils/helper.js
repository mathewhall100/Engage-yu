// helper functions

const throwError = (code, errorType, errorMessage) => error => {
    if (!error) error = new Error(errorMessage || 'Default Error')
    error.code = code
    error.errorType = errorType
    throw error
}

const throwIf = (fn, code, errorType, errorMessage) => result => {
    if (fn(result)) {
        return throwError(code, errorType, errorMessage) ()
    }
    return result
}

const sendSuccess = (res, message) => data => {
    console.log("Controller success: ", data)
    res.status(200).json({type: 'success', message, data})
}

const sendData = (res, message) => data => {
    console.log("Controller success: ", data)
    res.json(data)
}

const sendError = (res, message) => error => {
    console.log("Controller error: ", error)
    let status;
    let errorResponse;
    if (error && error.response) {
        status = error.response.status
        errorResponse = error.response.data
    } else if (error && error.code) {
        status = error.code
        errorResponse = error
    } else if (error) {
        status = 422
        errorResponse = error
    } else {
        status = 422
        errorResponse = {}
    }
    console.log("Controller error status: ", status)
    console.log("Controller error response: ", errorResponse)
    res.status(status).json({type: "Error", message, errorResponse});
}

module.exports = {
    throwError, 
    throwIf,
    sendSuccess,
    sendData,
    sendError
}