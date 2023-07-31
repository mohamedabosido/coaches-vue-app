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
        const response = await fetch(`https://vue-http-demo-1b6a9-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
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
    async loadCoaches(context) {
        const userId = context.rootGetters.userId;
        const response = await fetch(`https://vue-http-demo-1b6a9-default-rtdb.firebaseio.com/coaches/${userId}.json`);

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
    }

};