module.exports = (value) => { 
    if (!value) { 
        const error = new Error();
        error.status = 404;
        error.message = "Entity not found";
        throw error;
    }
}