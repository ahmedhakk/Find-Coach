export default {
    async registerCoach(context, data) { // data = payload => formData 
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas,
        };

        const token = context.rootGetters.token;

        const response = await fetch(`https://find-a-coach-4e5bf-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`, {
            method: 'PUT', // will create it , can update it
            body: JSON.stringify(coachData),
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(`Something went wrong ${responseData.message} (${response.status})`);
        }
        context.commit('registerCoach', { ...coachData, id: userId });
    },

    async loadCoaches(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }
        const response = await fetch(`https://find-a-coach-4e5bf-default-rtdb.firebaseio.com/coaches.json`);
        const responseData = await response.json(); // { coachIds => inside it coach data } => { c3, c4, c5 }
        if (!response.ok) {
            throw new Error(responseData.message || 'Faild To Fetch!!!');
        }
        const coaches = [];
        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas,
            };
            coaches.push(coach);
        }
        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    },
};