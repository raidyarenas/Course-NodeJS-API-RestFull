/**
 * Routers main, inyect middlewares etc
 */
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");


module.exports = function ({ HomeRoutes, CommentRoutes, IdeaRoutes, UserRoutes }) {
    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());
    
    apiRoutes.use("/home", HomeRoutes);
    apiRoutes.use("/user", CommentRoutes);
    apiRoutes.use("/idea", IdeaRoutes);
    apiRoutes.use("/comment", UserRoutes);

    router.use("/v1/api", apiRoutes);
    
    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);

    return router;
};
