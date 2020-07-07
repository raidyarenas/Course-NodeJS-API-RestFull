module.exports = ({ value, message }) => { 
    if (!value) { 
        const error = new Error();
        error.status = 404;
        error.message = message;
        throw error;
    }
}