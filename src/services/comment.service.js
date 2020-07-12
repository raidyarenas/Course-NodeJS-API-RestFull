const BaseService = require('./base.service');
const { ErrorHelper } = require('../helpers');
let _commentRepository = null;
let _ideaRepository = null;

class CommentService extends BaseService {
    constructor({ CommentRepository, IdeaRepository }) {
        super(CommentRepository);
        _commentRepository = CommentRepository;
        _ideaRepository = IdeaRepository;
    }

    async getUserByUsername(username) {
        return await _commentRepository.getUserByUsername(username);
    }

    async getIdeaComments(ideaId) { 
        if (!ideaId)
           ErrorHelper(400, "id must be sent");
        const idea = await _ideaRepository.get(ideaId);
        if (!idea)
            ErrorHelper(400, "Entity not found");
        const { comments } = idea;
        return comments;
    }

    async createComment(comment, ideaId) { 
        if (!ideaId)
            ErrorHelper(400, "id must be sent");
        const idea = await _ideaRepository.get(ideaId);
        if (!idea)
            ErrorHelper(400, "Entity not found");
        const createdComment = await _commentRepository.create(comment);
        idea.comments.push(createdComment);
        return await _ideaRepository.update(ideaId, { comments: idea.comments });
    }
}

module.exports = CommentService;