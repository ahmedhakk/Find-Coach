export default {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return !!state.token; // true if the are any word // false if null
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    }
}
