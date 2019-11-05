import createRepository from "~/api/repository";
import stockRepository from "~/api/chart/stockRepository";
import chartRepository from "~/api/chart/chartRepository";
// import repository for case to case end point

export default (ctx, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const initApiRepository = createRepository(ctx.$axios);

  const api = {
    social: {
      posts: initApiRepository("/social/posts")
    },
    chart: {
      stocks: stockRepository(ctx.$axios),
      charts: chartRepository(ctx.$axios)
    },
    journal: {},
    watcher: {},
    game: {}
  };

  inject("api", api);
};
