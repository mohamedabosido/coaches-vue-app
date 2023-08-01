export default {
  addRequest(state, payload) {
    console.log('addRequest mutation');
    console.log(payload);
    state.requests.push(payload);
  },
  setRequests(state, payload) {
    console.log('setRequests mutation');
    state.requests = payload;
  },
};
