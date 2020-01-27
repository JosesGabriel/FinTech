export default {   
    async setSSE({ commit }, data) {
      await commit("SET_SSE", data);
    },
    async setSSEInfo({ commit }, data) {
      await commit("SET_SSE_INFO", data);
    } 
  };
  