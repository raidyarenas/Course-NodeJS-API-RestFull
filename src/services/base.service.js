const { ErrorHelper } = require("../helpers");
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    async get(id) {
        if (!id)
            ErrorHelper(400, "id must be sent");
        const currentEntities = await this.repository.get(id);
        if (!currentEntities)
            ErrorHelper(400, "Entity not found");
        return currentEntities;
    }

    async getAll(pageSize, pageNum) {
        return await this.repository.getAll(pageSize, pageNum);
    }

    async create(entity) {
        return await this.repository.create(entity)
    }

    async update(id, entity) { 
        if (!id)
            ErrorHelper(400, "id must be sent");
        return await this.repository.update(id, entity)
    }
    
    async delete(id) { 
        if (!id)
            ErrorHelper(400, "id must be sent");
        return this.repository.delete(id);
    }
}

module.exports = BaseService;