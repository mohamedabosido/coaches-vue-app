let timer;
export default {
  async login(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQGVU8aUyQU8wvM-c0Ajy6n0OZKUUDabU
            `,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }
    console.log(responseData);
    const expirationDate = new Date().getTime() + responseData.expiresIn * 1000;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function () {
      context.dispatch('logout');
    }, responseData.expiresIn * 1000);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  async signup(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQGVU8aUyQU8wvM-c0Ajy6n0OZKUUDabU`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }
    console.log(responseData);
    const expirationDate = new Date().getTime() + responseData.expiresIn * 1000;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  logout(state) {
    state.commit('setUser', {
      token: null,
      userId: null,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    clearTimeout(timer);
  },
  tryLogin(state) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }
    setTimeout(function () {
      state.dispatch('logout');
    }, expiresIn);

    if (token && userId) {
      state.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },
  authLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout'); 
  },
};
