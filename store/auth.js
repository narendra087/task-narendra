const state = () => ({
  token: "",
  user: null,
})

const getters = {
  token: (state) => state.token,
  user: (state) => state.user,
};

const actions = {
  setUser({commit}, user) {
    commit("setUser", user);
  },
  setToken({commit}, token) {
    commit("setToken", token);
  },
}

const mutations = {
  setUser: (state, user) => {
    state.user = user;
    localStorage.user = user
  },
  setToken: (state, token) => {
    state.token = token;
    localStorage.token = token;
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
};
