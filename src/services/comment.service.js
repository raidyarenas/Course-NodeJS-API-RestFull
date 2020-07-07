const BaseService = require('./base.service');
const { __required, __entity } = require('../helpers');
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
        __required({ value: ideaId, message: "ideaId must be sent" });
        const idea = await _ideaRepository.get(ideaId);
        __entity(idea);
        const { comments } = idea;
        return comments;
    }

    async createComment(comment, ideaId) { 
        __required({ value: ideaId, message: 'ideaId must be sent' });
        const idea = await _ideaRepository.get(ideaId);
        __entity(idea);
        const createdComment = await _commentRepository.create(comment);
        idea.comments.push(createdComment);
        return await _ideaRepository.update(ideaId, { comments: idea.comments });
    }
}

module.exports = CommentService;