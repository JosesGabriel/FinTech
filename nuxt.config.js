import colors from "vuetify/es5/util/colors";

require("dotenv").config();

export default {
  mode: "spa",
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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
    "~/plugins/bus",
    "~/plugins/repository",
    { src: "~/plugins/tradingview", ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/dotenv"],

  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    defaultAssets: {
      font: true,
      icons: "md"
    },
    icons: {
      iconfont: "md"
    },
    theme: {
      themes: {
        light: {
          background: colors.grey.lighten5,
          primary: colors.blue,
          accent: colors.grey.darken3,
          secondary: colors.blueGrey,
          info: colors.purple,
          warning: colors.orange,
          error: colors.red,
          success: colors.green
        },
        dark: {
          background: colors.blue.darken3
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
