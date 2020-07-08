/**
 * Aqui configuraremos el contenedor de inyección de depencias
 */
const { createContainer, asClass, asValue, asFunction } = require('awilix');

const app = require('.');
const config = require("../config");
const routesMain = require('../routers');

const { HomeService, CommentService, IdeaService, UserService } = require('../services');
const { HomeController, CommentController, IdeaController, UserController } = require('../controllers');
const { HomeRoutes, CommentRoutes, IdeaRoutes, UserRoutes } = require('../routers/index.routes');
const { User, Idea, Comment } = require("../models");
const { UserRepository, CommentRepository, IdeaRepository } = require("../repositories");


const routes = {
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    IdeaRoutes: asFunction(IdeaRoutes).singleton(),
    CommentRoutes: asFunction(CommentRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
};

const controllers = {
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    CommentController: asClass(CommentController.bind(CommentController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
};

const services = {
    CommentService: asClass(CommentService).singleton(),
    HomeService: asClass(HomeService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    UserService: asClass(UserService).singleton(),
};

const repositories = {
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton(),
};

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
