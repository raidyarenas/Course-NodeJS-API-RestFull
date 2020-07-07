/**
 * Aqui configuraremos el contenedor de inyección de depencias
 */
const { createContainer, asClass, asValue, asFunction } = require('awilix');

const app = require('.');
const config = require("../config");
const routesMain = require('../routers');

const { HomeService } = require('../services');
const { HomeController } = require('../controllers');
const { HomeRoutes } = require('../routers/index.routes');
const { User, Idea, Comment } = require("../models");


const routes = {
    HomeRoutes: asFunction(HomeRoutes).singleton(),
};

const controllers = {
    HomeController: asClass(HomeController.bind(HomeController)).singleton()
};

const services = {
    HomeService: asClass(HomeService).singleton()
};

const repositories = {};

const models = {
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment),
}

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(routesMain).singleton(),
        config: asValue(config)
    })
    .register(routes)
    .register(controllers)
    .register(services)
    .register(repositories)
    .register(models);

module.exports = container;
