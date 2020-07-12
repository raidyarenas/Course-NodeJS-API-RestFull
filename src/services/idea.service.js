const BaseService = require("./base.service");
const { ErrorHelper } = require("../helpers");
let _ideaRepository = null;

class IdeaService extends BaseService {
    constructor({ IdeaRepository }) {
        super(IdeaRepository);
        _ideaRepository = IdeaRepository;
    }

    async getUserIdeas(author) {
        if (!author)
            ErrorHelper(400, 'userId must be sent');
        return await _ideaRepository.getUserIdeas(author);
    }

    async upVoteIdea(ideaId) {
        if (!ideaId)
            ErrorHelper(404, 'userid must be sent');
        const idea = await _ideaRepository.get(ideaId);
        if (!idea)
            ErrorHelper(400, "Entity not found");
        idea.upvotes.push(true);
        return await _ideaRepository.update(ideaId, { upvotes: idea.upvotes });
    }

    async downVoteIdea(ideaId) {
        if (!ideaId)
            ErrorHelper(404, 'userid must be sent');
        const idea = await _ideaRepository.get(ideaId);
        if(!idea)
            ErrorHelper(404, 'Entity not found');
        idea.downvotes.push(true);
        return await _ideaRepository.downdate(ideaId, { downvotes: idea.downvotes });
    }
}

module.exports = IdeaService;