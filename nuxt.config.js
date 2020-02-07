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
        link: [{
                rel: "icon",
                type: "image/x-icon",
                href: `${process.env.APP_URL}/_/favicon.ico?v2`
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap"
            }
        ],
        script: [{
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
        { src: "~/plugins/bus", mode: "client" },
        { src: "~/plugins/repository", mode: "client" },
        { src: "~/plugins/tradingview", mode: "client" },
        { src: "~/plugins/vue-numeral-filter.js", mode: "client" },
        { src: "~/plugins/components/chart/vue-apexcharts", mode: "client" },
        { src: "~/plugins/components/alerts/vue-snotify", mode: "client" },
        { src: "~/plugins/components/profile/vue-croppa", mode: "client" },
        { src: "~/plugins/vue-native-websocket", mode: "client" },
        { src: "~/plugins/vue-html2canvas", mode: "client" },
        { src: "~/plugins/custom-filters", mode: "client" },
        { src: "~/plugins/vue-at", mode: "client" }
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
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/dotenv",
        "@nuxtjs/auth",
        "@nuxtjs/google-gtag"
    ],
    auth: {
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
        },
        plugins: [
            { src: "~/plugins/axios", mode: "client" },
            { src: "~/plugins/auth", mode: "client" }
        ]
    },
    "google-gtag": {
        id: "UA-157586166-1",
        config: {
            anonymize_ip: true, // anonymize IP
            send_page_view: false, // might be necessary to avoid duplicated page track on page reload
            linker: {
                domains: ["lyduz.com"]
            }
        },
        debug: true, // enable to track in dev mode
        disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...).
        additionalAccounts: [
            // {
            //   id: "AW-XXXX-XX", // required if you are adding additional accounts
            //   config: {
            //     send_page_view: false // optional configurations
            //   }
            // }
        ]
    },
    router: {
        middleware: ["auth"]
    },
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
                // working level of theme
                light: {
                    background: colors.grey.lighten5,
                    primary: colors.blue,
                    accent: colors.grey.darken3,
                    secondary: "#E5E5E5",
                    info: colors.purple,
                    warning: colors.orange,
                    error: "#F44336",
                    success: "#03DAC5",
                    tertiary: "#B6B6B6",
                    darkcard: "#0c1a2b",
                    lightcard: "#f2f2f2",
                    darkchart: "#00121e",
                    lightchart: "#f2f2f2",
                    successhover: "#4ee5d6",
                    headlinedark: "#263238"
                },
                theme: {
                    themes: {
                        light: {
                            background: colors.grey.lighten5,
                            primary: colors.blue,
                            accent: colors.grey.darken3,
                            secondary: "#E5E5E5",
                            info: colors.purple,
                            warning: colors.orange,
                            error: "#F44336",
                            success: "#03DAC5",
                            tertiary: "#B6B6B6",
                            darkoutline: "#1f2f39",
                            lightoutline: "#DADADA",
                            darkcard: "#0c1a2b",
                            lightcard: "#f2f2f2",
                            darkchart: "#00121e",
                            lightchart: "#f2f2f2"
                        },
                        dark: {
                            anchor: colors.blue
                        }
                    }
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