export default {
    async contactCoach(context, payload) { // payload = {}
        // data send to server
        const newRequest = {
            userEmail: payload.email,
            message: payload.message,
        };
        const response = await fetch(`https://find-a-coach-4e5bf-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest),
        });
        const responseData = await response.json();
        // using firebase it returns responseData = { name: id }
        // console.log(responseData); // { name: '-NDXWj5cdcJ7BDwNgVbu' }
        if (!response.ok) throw new Error(responseData.message || 'Failed to send request.');

        // local data
        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;
        context.commit('addRequest', newRequest);
    },

    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const response = await fetch(`https://find-a-coach-4e5bf-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`);
        const responseData = await response.json();
        if (!response.ok) throw new Error(responseData.message || 'Failed to fetch requests.');
        // console.log(responseData); // { -NDXWj5cdcJ7BDwNgVbu: {…} }

        const requests = [];
        for (const key in responseData) {
            const request = {
                id: key,
                coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message,
            }
            requests.push(request);
        }

        context.commit('setRequests', requests);
    },
}