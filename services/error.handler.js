const handleDBError = async (err, userMessage) => {
    let result = {success: false};
    if (err.code == 11000) {
        result.isValid = false;
        if (userMessage) {
            result.message = userMessage;
        } else {
            result.message = userMessage;
        }
    } else {
        console.log(err);
        result.message = 'Internal error please try again later';
    }
    return result;
}

module.exports= {handleDBError};