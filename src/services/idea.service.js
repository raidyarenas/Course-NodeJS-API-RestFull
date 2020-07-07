const BaseService = require("./base.service");
const { __required, __entity } = require("../helpers");
let _ideaRepository = null;

class IdeaService extends BaseService {
    constructor({ IdeaRepository }) {
        super(IdeaRepository);
        _ideaRepository = IdeaRepository;
    }

    async getUserIdeas(author) {
        __required({ value: author, message: 'userId must be sent' });
        return await _ideaRepository.getUserIdeas(author);
    }

    async upVoteIdea(ideaId) {
        __required({ value: ideaId, message: 'userid must be sent' });
        const idea = await _ideaRepository.get(ideaId);
        __entity(idea);
        idea.upvotes.push(true);
        return await _ideaRepository.update(ideaId, { upvotes: idea.upvotes });
    }

    async downVoteIdea(ideaId) {
        __required({ value: ideaId, message: 'userid must be sent' });
        const idea = await _ideaRepository.get(ideaId);
        __entity(idea);
        idea.downvotes.push(true);
        return await _ideaRepository.downdate(ideaId, { downvotes: idea.downvotes });
    }
}

module.exports = IdeaService;