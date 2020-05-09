

const populateResponse = (res, result) => {
    if (result.success) {
        return res.status(200).json(result.data);
    }
    if (!result.isValid) {
        return res.status(400).json(result.message);
    } else {
        return res.status(500).json(result.message);
    }
}

const populateInternalErrorResponse = (res, message ='Internal error, please try again later') => {
    return res.status(500).json(message);
}

module.exports ={ populateResponse, populateInternalErrorResponse };