let token = localStorage["auth._token.local"];
// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default $axios => resource => ({
  index() {
    $axios.setToken(token);
    return $axios.$get(`${resource}`);
  },
  show(id) {
    return $axios.$get(`${resource}/${id}`);
  },

  create(payload) {
    $axios.setToken(token);
    return $axios.$post(`${resource}`, payload);
  },

  update(id, payload) {
    return $axios.$post(`${resource}/${id}`, payload);
  },

  delete(id) {
    return $axios.$delete(`${resource}/${id}`);
  }
});
