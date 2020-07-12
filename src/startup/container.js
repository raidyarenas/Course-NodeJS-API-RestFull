/**
 * Aqui configuraremos el contenedor de inyección de depencias
 */
const { createContainer, asClass, asValue, asFunction } = require('awilix');

const app = require('.');
const config = require("../config");
const routesMain = require('../routers');

const { AuthService, HomeService, CommentService, IdeaService, UserService } = require('../services');
const { AuthController, HomeController, CommentController, IdeaController, UserController } = require('../controllers');
const { HomeRoutes, CommentRoutes, IdeaRoutes, UserRoutes, AuthRoutes } = require('../routers/index.routes');
const { User, Idea, Comment } = require("../models");
const { UserRepository, CommentRepository, IdeaRepository } = require("../repositories");


const routes = {
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    CommentRoutes: asFunction(CommentRoutes).singleton(),
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    IdeaRoutes: asFunction(IdeaRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
};

const controllers = {
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    CommentController: asClass(CommentController.bind(CommentController)).singleton(),
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
};

const services = {
    AuthService: asClass(AuthService).singleton(),
    CommentService: asClass(CommentService).singleton(),
    HomeService: asClass(HomeService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    UserService: asClass(UserService).singleton(),
};

const repositories = {
    CommentRepository: asClass(CommentRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    UserRepository: asClass(UserRepository).singleton(),
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
