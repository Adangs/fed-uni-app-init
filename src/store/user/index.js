import http from '@/utils/x-request'

export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_DATA: (state, data) => {
      for (const key in data) {
        state[key] = data[key]
      }
    }
  },
  actions: {
    async oauth({ commit }, data) {
      const res = await http({
        method: 'post',
        url: '/user/oauth/login',
        data
      })
      commit('SET_DATA', res.data)
      return res.data
    }
  }
}
