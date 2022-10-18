export default {
    addRequest(state, payload) {
        state.requests.push(payload);
    },
    setRequests(state, payload) { // payload = [{requests}]
        state.requests = payload;
    }
};