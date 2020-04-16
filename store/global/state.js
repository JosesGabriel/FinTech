export default () => ({
    //region configs
    lightSwitch: 0,
    //endregion configs

    //region stock data
    stockList: [],
    //endregion stock data
    favicon: `${process.env.APP_URL}/favicon/favicon.ico?v=${Math.round(
    Math.random() * 999
  )}`,

    //Global snackbar
    alert: {
        model: false,
        state: "",
        message: "",
        redirect: ""
    },
    //end global snackbar

    //Global notification
    notification: null,
    //end global notification

    //Global ALL newposts
    newPosts: {
        number_posts: 0,
        event_name: "",
        message: "",
        data: null,
    },
    //end global all newposts

    //Global dialog alert
    alertDialog: {
        model: false,
        header: "",
        state: "",
        body: "",
        subtext: ""
    },
    //end global dialog alert

    //Global Updated Settings 
    settings: null,
    //end global update settings
    markAll: 0,
    swipe: ''
});