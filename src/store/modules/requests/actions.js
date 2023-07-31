export default {
    async contactCoach(context, payload) {
        const userId = context.rootGetters.userId;
        const newRequest = {
            id: new Date().toISOString(),
            coachId: payload.coachId,
            email: payload.email,
            message: payload.message
        };
        const response = await fetch(`https://vue-http-demo-1b6a9-default-rtdb.firebaseio.com/requests/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(newRequest)
        });
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }
        
        context.commit('addRequest', {
            ...newRequest,
            id: userId
        });
    }
};