

const populateResponse = (res, result) => {
    if (result.success) {
        return res.status(200).json(result.data);
    }
    if (!result.isValid) {
        res.status(400);
    } else {
        res.status(500);
    }
    return res.json(result.message);
}

const populateInternalErrorResponse = (res, message ='Internal error, please try again later') => {
    return res.status(500).json(message);
}

module.exports ={ populateResponse, populateInternalErrorResponse };