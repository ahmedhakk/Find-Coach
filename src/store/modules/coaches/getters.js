export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        // if (state.coaches?.length > 0) {
        //     return true;
        // }
        // == OR ==
        // return state.coaches && state.coaches.length > 0;  // true / false
        // == OR ==
        return state.coaches?.length > 0; // true / false
    },
    isCoach(state, getters, rootState, rootGetters) {
        const coaches = getters.coaches;
        const userId = rootGetters.userId; // c3
        return coaches.some(coach => coach.id === userId); // true / false
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch)
            return true;
        const currentTimeStamp = new Date().getTime(); // im ms => to convert to sec => /1000
        return (currentTimeStamp - lastFetch) / 1000 > 60; // is more than minute age ( > 60 sec)
        // return true > 1 min, false < 1 min
    },
    // contacted(state) {
    //     return state.isContact;
    // },
};
