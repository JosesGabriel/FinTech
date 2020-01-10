import colors from "vuetify/es5/util/colors";

require("dotenv").config();

export default {
  mode: "universal",
  server: {
    port: process.env.SERVER_PORT, // default: 3000
    host: process.env.SERVER_HOST // default: localhost
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.APP_TITLE,
    title: process.env.APP_TITLE || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: `${process.env.CURRENT_DOMAIN}/lyduz.ico`
      }
    ],
    script: [
      {
        src: "/vendor/charting_library/charting_library.min.js",
        type: "text/javascript"
      },
      {
        src: "/vendor/datafeeds/udf/dist/polyfills.js",
        type: "text/javascript"
      },
      { src: "/vendor/datafeeds/udf/dist/bundle.js", type: "text/javascript" }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#142b46" },
  /*
   ** Global CSS
   */
  css: ["@/assets/css/global.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/global-method",
    { src: '~/plugins/axios', mode: "client" },
    { src: "~/plugins/bus", mode: "client" },
    { src: "~/plugins/repository", mode: "client"},
    { src: "~/plugins/tradingview", mode: "client"},
    { src: "~/plugins/vue-numeral-filter", mode: "client" },
    { src: "~/plugins/components/chart/vue-apexcharts", mode: "client" },
    { src: "~/plugins/vue-native-websocket", mode: "client" }
    // { src: "~/plugins/numeral", ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/moment"],
  //   moment: {
  //     locales: ["ph"]
  //   },
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/dotenv", "@nuxtjs/auth"],
  auth: {
    watchLoggedIn: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/auth/login",
            method: "post",
            propertyName: "data.token.access_token"
          },
          user: {
            url: "/auth/user",
            method: "get",
            propertyName: false
          },
          logout: {
            url: "/auth/logout",
            method: "post",
            propertyName: false
          }
        }
      }
    },
    redirect: {
      login: "/login",
      home: "/",
      logout: "/login"
    }
  },
  router: {
    middleware: ["auth"]
  },
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    // defaultAssets: {
    //   //breaks vuetify icons if added, use other method
    //   font: true,
    //   icons: "md"
    // },
    icons: {
      iconfont: "md"
    },
    theme: {
      themes: {
        light: {
          background: colors.grey.lighten5,
          primary: colors.blue,
          accent: colors.grey.darken3,
          secondary: "#78909c",
          info: colors.purple,
          warning: colors.orange,
          error: "#F44336",
          success: "#03DAC5",
          darkcard: "#0c1a2b",
          lightcard: "#f2f2f2",
          darkchart: "00121e",
          lightchart: "#f2f2f2"
        },
        dark: {
          anchor: colors.blue
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.node = {
        console: false,
        fs: "empty",
        net: "empty",
        tls: "empty"
      };
    }
  }
};
