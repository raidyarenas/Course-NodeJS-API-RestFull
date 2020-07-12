module.exports = (status, message) => {
    if (status) {
        const error = new Error();
        error.status = status;
        error.message = message;
        throw error;
    }
}