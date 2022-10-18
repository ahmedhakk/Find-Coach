let timer;
export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login',
        });
    },

    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup',
        });
    },

    async auth(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDsqda6PirnbmuHZiqtqYOPpIj_vsvOVlw';
        if (mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsqda6PirnbmuHZiqtqYOPpIj_vsvOVlw';
        }
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to authenticate ${data.message} (${res.status})`);
        }

        // const expiresIn = 5000; // for test
        const expiresIn = +data.expiresIn * 1000; // 3600 sec => convert it to ms by * 1000
        const expirationDate = new Date().getTime() + expiresIn; // in ms => new Date().getTime() // if date in ms is (for EX: 4:00) we will add 1 H to suto logout in 5:00
        // expirationDate = 5:00

        // save token in local storage to auto login 
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expiresIn);

        context.commit('setUser', {
            token: data.idToken,
            userId: data.localId,
        });
    },

    tryLogin(context) { // run it whenever the application starts => So in App.vue
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration'); // for EX: 5:00 

        const expiresIn = +tokenExpiration - new Date().getTime();// 5:00 - 4:20 = 40 min // 5:00 - 5:30 = -30 min

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                token,
                userId,
            });
        }
    },

    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
        });
    },

    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    },
};