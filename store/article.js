const state = () => ({
  articles: [],
})

const getters = {
  articles: (state) => state.articles,
};

const actions = {
  addArticle({commit}, data) {
    commit("addArticle", data);
  },
  editArticle({commit}, data) {
    commit("editArticle", data);
  },
  removeArticle({commit}, id) {
    commit("removeArticle", id)
  },
}

const mutations = {
  addArticle: (state, data) => {
    state.articles.unshift(data)
  },
  editArticle: (state, data) => {
    const indexObj = state.articles.findIndex(x => x.id === data.id)
    state.articles[indexObj].title = data.title
    state.articles[indexObj].content = data.content
  },
  removeArticle: (state, data) => {
    const indexObj = state.articles.findIndex(x => x.id === data.id)
    state.articles.splice(indexObj, 1)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
};
