export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        console.log(data);
        const coachData = {
            id: context.rootGetters.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            areas: data.areas,
            description: data.description,
            hourlyRate: data.hourlyRate,
        };
        const token = context.rootGetters.token;
        const response = await fetch(`https://vue-http-demo-6d2b8-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context, payload) {
        const token = context.rootGetters.token;

        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }
        const response = await fetch(`https://vue-http-demo-6d2b8-default-rtdb.europe-west1.firebasedatabase.app/coaches.json?auth=${token}`);

        const responseData = await response.json();

        if (!response.ok) { 
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }
         
        const coaches = [];
        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                areas: responseData[key].areas,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
            };
            coaches.push(coach);
        }
        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    }

};