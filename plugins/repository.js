import createRepository from "~/api/repository";
import stockRepository from "~/api/chart/stockRepository";
import chartRepository from "~/api/chart/chartRepository";
import socialRepository from "~/api/social/socialRepository";
import journalRepository from "~/api/journal/journalRepository";
// import repository for case to case end point

export default (ctx, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const initApiRepository = createRepository(ctx.$axios);

  const api = {
    social: {
      posts: socialRepository(ctx.$axios),
      create: initApiRepository("/social/posts"),
      upload: initApiRepository("/storage/upload"),
      deletePost: initApiRepository("/social/posts"),
      updatePost: initApiRepository("/social/posts"),
      searchPost: initApiRepository("/social/posts")
    },
    chart: {
      stocks: stockRepository(ctx.$axios),
      charts: chartRepository(ctx.$axios)
    },
    journal: {
      portfolio: journalRepository(ctx.$axios)
    },
    watchlist: {
      watchlists: initApiRepository("/journal/watchlist")
    },
    game: {
      login: initApiRepository("/game/players"),
      ongoing: initApiRepository("/game/series/ongoing"),
      leaderboards: initApiRepository("/game/players/leaderboard?page=1")
    },
    authentication: {
      register: initApiRepository("/register"),
      verify: initApiRepository("/verify")
    }
  };

  inject("api", api);
};
