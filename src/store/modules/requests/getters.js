export default {
    requests(state, getters, rootState, rootGetters) {
        const coachId = rootGetters.userId;
        const requests = state.requests.filter(req => req.coachId === coachId);
        return requests;
    },
    hasRequests(_, getters) {
        return getters.requests && getters.requests.length > 0;
    }
};