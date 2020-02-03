import createRepository from "~/api/repository";
import stockRepository from "~/api/chart/stockRepository";
import chartRepository from "~/api/chart/chartRepository";
import socialRepository from "~/api/social/socialRepository";
import journalRepository from "~/api/journal/journalRepository";
import providerRepository from "~/api/authentication/providerRepository";
// import repository for case to case end point

export default (ctx, inject) => {
    // inject the repository in the context (ctx.app.$repository)
    // And in the Vue instances (this.$repository in your components)
    const initApiRepository = createRepository(ctx.$axios);

    const api = {
        social: {
            posts: socialRepository(ctx.$axios),
            actions: initApiRepository("/social/posts"),
            upload: initApiRepository("/storage/upload"),
            trendingStocks: initApiRepository("/social/posts/trending"),
            follow: socialRepository(ctx.$axios),
            notification: socialRepository(ctx.$axios),
            suggestedUsers: initApiRepository("/social/suggested")
        },
        chart: {
            stocks: stockRepository(ctx.$axios),
            charts: chartRepository(ctx.$axios)
        },
        journal: {
            portfolio: journalRepository(ctx.$axios)
        },
        watchlist: {
            watchlists: initApiRepository("/journal/watchlist"),
            mostwatched: initApiRepository("/journal/watchlist/watched")
        },
        game: {
            login: initApiRepository("/game/players"),
            ongoing: initApiRepository("/game/series/ongoing"),
            leaderboards: initApiRepository("/game/players/leaderboard?page=1")
        },
        authentication: {
            register: initApiRepository("/register"),
            providers: providerRepository(ctx.$axios),
            verify: initApiRepository("/verify"),
            forgotPassword: initApiRepository("/auth/password/reset")
        },
        accounts: {
            account: initApiRepository("/users"),
            updateSettings: initApiRepository("/users/settings")
        }
    };

    inject("api", api);
};