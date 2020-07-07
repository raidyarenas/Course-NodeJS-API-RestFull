const { __required, __entity } = require("../helpers");
const entity = require("../helpers/entity");
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    async get(id) {
        __required({ value: id, message: "id must be sent" });
        const currentEntities = await this.repository.get(id);
        __entity(currentEntities);
        return currentEntities;
    }

    async getAll() {
        return await this.repository.getAll();
    }

    async create(entity) {
        return await this.repository.create(entity)
    }

    async update(id, entity) { 
        __required({ value: id, message: "id must be sent" });
        return await this.repository.update(id, entity)
    }
    
    async delete(id) { 
        __required({ value: id, message: "id must be sent" });
        return this.repository.delete(id);
    }
}

module.exports = BaseService;