import createRepository from "~/api/repository";

// import repository for case to case end point

export default (ctx, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const initApiRepository = createRepository(ctx.$axios);

  const api = {
    social: {
      posts: initApiRepository("/social/posts")
    },
    journal: {},
    chart: {},
    watcher: {},
    game: {}
  };

  inject("api", api);
};
