export default {
    addRequest(state, payload) {
        console.log('addRequest mutation');
        console.log(payload);
        state.requests.push(payload);
    }
};