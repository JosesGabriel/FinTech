<template>
   <v-content  
    class="content"
   > 
        <v-row>

            <v-row no-gutters class="mb-12">                 
                    <v-img
                        src="4168.png"
                        width="100%"
                    >
                    </v-img>
                    <v-img  
                        class="header__content--logo"
                        src="mytrade_logo.webp"
                        width="23%"
                    >
                    </v-img>
                    <v-row 
                        class="header__content"
                        style="color:#000000;"
                    >
                        <v-row class="header__content--title">
                            <v-col cols="12" class="ma-0 pa-0">
                            <p class="ma-0 pa-0 header__content--subtitle">Trade with</p>
                            <p class="header__content--subtitle">Confidence</p>
                            </v-col>
                        </v-row>
                        <v-row>  
                            <v-col cols="12" class="ma-0 pa-0">                 
                                <p class="content--text">
                                    Guaranteed 99% uptime so you don't miss out on 
                                    important market opportunities and react in realtime 
                                    when the things diverge against your investment 
                                    forecast. MyTrade™ platform in simple words; <span style="color:#0f911e"> reliable.</span>
                                </p> 
                            </v-col>
                        </v-row>
                        <v-row class="mb-4">
                            <v-col class="mr-0 pr-0">
                                <div class="text-center">
                                    <v-btn 
                                        rounded 
                                        class="text-capitalize"
                                        width="180"
                                        color="#0f911e"
                                        @click="openAccount"
                                    >
                                    <span style="color:#ffffff;">Open new account</span>
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col class="ml-0 pl-1">
                                <div class="text-center">
                                    <v-btn 
                                        rounded 
                                        outlined
                                        class="text-capitalize"
                                        width="170"
                                        color="#0f911e"
                                         @click="openAccount"
                                    >Learn more</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col 
                                class="my-0 py-0"
                                style="padding-left: 48px;"
                            >
                                <v-img
                                    src="google_play2.webp"
                                    width="150px"
                                    class="google_play"
                                >
                                </v-img>
                            </v-col>
                            <v-col class="ma-0 pa-0">
                                 <v-img
                                    src="app_store2.webp"
                                    width="136px"
                                    style="margin-top: 8px;"
                                    class="app_store"
                                >
                                </v-img>
                            </v-col>
                        </v-row>
                    </v-row>         
            </v-row> 
            <v-row 
                class="mytrade__container mt-12"
            >
                <v-row class="px-12 my-12">
                    <v-col class="container__valuableResearch">

                        <v-row style="color:#0B1C4D;">
                            <v-col cols="3" >
                                <span class="container--numlogo ma-0 pa-0">
                                    <v-img
                                        src="01.png"
                                        width="130"
                                        class="mytrade__image"
                                        id="mytrade__01"
                                        
                                    >
                                    </v-img>
                                </span>
                            </v-col>
                            <v-col cols="9" class="container__valuableResearch--title">
                                <p class="ma-0 pa-0 container--subtitle">Valuable Research</p>
                                <p class="ma-0 pa-0 container--subtitle">Based Recommendations</p>
                            </v-col>
                        </v-row>
                        <v-divider class="mytrade_divider" id="mytrade_divider_1"></v-divider>
                                    <v-img
                                        src="image8.png"
                                        width="270"
                                        class="mytrade__image"
                                        id="mytrade_image8"
                                    >
                                    </v-img>
                        <v-row >
                            <v-col cols="12" class="pt-8">
                                <p class="content--text">
                                    Value-added & relevant research done by the country's 
                                    top market analyst spearheaded by Forbe's Top 5 stock 
                                    picker in Asia, Mr. Raymond Niel Franco. 
                                </p>
                                <ul class="content--text">
                                    <li>Better investment insights</li>
                                    <li>See investments in innovative angles</li>
                                    <li>Stop investing blindly - see the entire landscape</li>
                                    <li>Access high-value recommendations</li>
                                    <li>Smart & easy to follow market reports</li>
                                </ul>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                 <v-btn 
                                        rounded 
                                        class="text-capitalize"
                                        width="150"
                                        color="#0f911e"
                                         @click="openAccount"
                                    >
                                    <span style="color:#ffffff;">Subscribe now</span>
                                    </v-btn>
                            </v-col>
                        </v-row>
                                

                    </v-col>

                    <v-col>
                        <v-img
                            id="mytrade_image2"
                            src="13715.webp"
                            width="435"
                        >
                        </v-img>
                    </v-col>
                </v-row>

                <v-row class="px-12 mt-12">
                    <v-col>
                        <v-img
                            class="mytrade_image3"
                            src="50301.jpg"
                            width="500"
                        >
                        </v-img>
                    </v-col>
                    <v-col class="container__managePortfolio">
                        <v-row style="color:#0B1C4D;">
                            <v-col cols="4">
                                <span class="container--numlogo ma-0 pa-0">
                                    <v-img
                                        src="02.png"
                                        width="130"
                                        class="mytrade__image"
                                        
                                    >
                                    </v-img>
                                </span>
                            </v-col>
                            <v-col cols="8" class="container__managePortfolio--title">
                                <p class="ma-0 pa-0 container--subtitle">Manage Multiple</p>
                                <p class="ma-0 pa-0 container--subtitle">Portfolios</p>
                            </v-col>
                        </v-row>
                        <v-divider  class="mytrade_divider" id="mytrade_divider_2"></v-divider>
                                    <v-img
                                        src="image7_flip.png"
                                        width="230"
                                        class="mytrade__image" 
                                        id="mytrade_image7"      
                                    >
                                    </v-img>

                        <v-row>
                            <v-col cols="12" class="pt-8">
                                <p class="content--text">
                                    Create & manage multiple portfolios 
                                    in a single account. Now you have the power 
                                    to separate portfolios accordingly.  
                                </p>
                                <ul class="content--text">
                                    <li>Separate your investing & trading portfolio</li>
                                    <li>Manage multiple portfolios with ease</li>
                                    <li>Everything in a single platform</li>
                                </ul>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                 <v-btn 
                                        rounded 
                                        class="text-capitalize"
                                        width="150"
                                        color="#0f911e"
                                        @click="openAccount"
                                    >
                                    <span style="color:#ffffff;">Try it now</span>
                                    </v-btn>
                            </v-col>
                        </v-row>

                    </v-col>
                </v-row>
                
                <v-row class="px-12 my-12">
                    <v-col class="container__orderRoutes">
                        <v-row style="color:#0B1C4D;">
                            <v-col cols="4">
                                <span class="container--numlogo ma-0 pa-0">
                                    <v-img
                                        src="03.png"
                                        width="130"
                                        class="mytrade__image"
                                        
                                    >
                                    </v-img>
                                </span>
                            </v-col>
                            <v-col cols="8" class="container__orderRoutes--title">
                                <p class="ma-0 pa-0 container--subtitle">High-speed</p>
                                <p class="ma-0 pa-0 container--subtitle">Order routes</p>
                            </v-col>
                        </v-row>
                        <v-divider  class="mytrade_divider" id="mytrade_divider_3"></v-divider>
                                <v-img
                                        src="image9.png"
                                        width="430"
                                        class="mytrade__image" 
                                        id="mytrade_image9"      
                                    >
                                    </v-img>

                        <v-row>
                            <v-col cols="12" class="pt-8">
                                <p class="content--text">
                                   We have a skyway of orders that lets you stay
                                   ahead of the rest so you buy & sell based on the 
                                   best price available. We recognize that every 
                                   second counts so we guarantee that our leased 
                                   order lines are never congested and constantly 
                                   up to the volume our users require. 
                                </p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                 <v-btn 
                                        rounded 
                                        class="text-capitalize"
                                        width="180"
                                        color="#0f911e"
                                        @click="openAccount"
                                    >
                                    <span style="color:#ffffff;">Open new account</span>
                                    </v-btn>
                            </v-col>
                        </v-row>

                    </v-col>

                    <v-col>
                        <v-img
                            class="mytrade__image"
                            src="green.webp"
                            width="560"
                        >
                        </v-img>
                    </v-col>
                </v-row>

                <v-row class="px-12 mt-12">
                    <v-col>
                        <v-img
                            class="mytrade__image"
                            src="MyTrade Performance.webp"
                            width="450"
                        >
                        </v-img>
                    </v-col>
                    <v-col class="container__performance">
                        <v-row style="color:#0B1C4D;">
                            <v-col cols="4">
                                <span class="container--numlogo ma-0 pa-0">
                                    <v-img
                                        src="04.png"
                                        width="130"
                                        class="mytrade__image"
                                        
                                    >
                                    </v-img>
                                </span>
                            </v-col>
                            <v-col cols="8" class="container__performance--title">
                                <p class="ma-0 pa-0 container--subtitle">Proven decades-long</p>
                                <p class="ma-0 pa-0 container--subtitle">Performance</p>
                            </v-col>
                        </v-row>
                        <v-divider  class="mytrade_divider" id="mytrade_divider_4"></v-divider>
                                    <v-img
                                        src="image10.png"
                                        width="350"
                                        class="mytrade__image"
                                        id="mytrade_image10"       
                                    >
                                    </v-img>
                        <v-row>
                            <v-col cols="12" class="pt-8">
                                <p class="content--text">
                                    We are considered to be one of the larger, if not 
                                    the largest, local brokerage firms in terms of 
                                    volume from our institutional business activities. 
                                    We have made institutional money experience 
                                    exponential growth through our research-based 
                                    guidance and recommendations. If big funds 
                                    love us, you would too.   
                                </p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                 <v-btn 
                                        rounded 
                                        class="text-capitalize"
                                        width="150"
                                        color="#0f911e"
                                        @click="openAccount"
                                    >
                                    <span style="color:#ffffff;">Try it now</span>
                                    </v-btn>
                            </v-col>
                        </v-row>

                    </v-col>
                </v-row>
                <v-row class="px-12 mt-12">
                    <v-col cols="12">
                        <h2 class="mytrade__learn">
                            We are bringing the benefits enjoyed by our institutional 
                            clients to retailers. Learn why our clients love us.
                        </h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col style="text-align:center;">
                        <iframe width="876" height="491" src="https://www.youtube.com/embed/Pom51NlTXAA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </v-col>
                </v-row>
                
                <v-row class="px-12 mt-12">
                    <v-col>
                        <v-row>
                            <v-col>
                                <v-img
                                    class="mytrade__image"
                                    id="mytrade_image6"
                                    src="my_trade_5.gif"
                                    width="500"
                                >
                                </v-img>
                            </v-col>
                        </v-row>
                        <v-row>    
                            <v-col 
                                class="my-0 py-0"
                                style="padding-left: 75px;"
                            >
                                <v-img
                                    src="google_play2.webp"
                                    width="150px"
                                    class="google_play2 mytrade__indent"
                                >
                                </v-img>
                            </v-col>
                            <v-col class="ma-0 pa-0">
                                 <v-img
                                    src="app_store2.webp"
                                    width="136px"
                                    style="margin-top: 8px;"
                                    class="app_store2"
                                >
                                </v-img>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col style="z-index: 2;">
                        <v-row>
                            <v-col cols="12" class="container__available--title">
                                <p class="pl-12 mytrade__available">Available on all devices</p>
                            </v-col>
                        </v-row>
                        <v-divider  class="mytrade_divider" id="mytrade_divider_5" style="margin-left:40px;"></v-divider>
                        <v-row>
                            <v-col cols="12">
                                <p class="mytrade__indent mytrade__availableText">
                                    Trading is a lifestyle. Trade anywhere 
                                    with MyTrade Mobile Apps. Now everything 
                                    thing you need to trades is in your pocket.   
                                </p>
                                <p class="mytrade__indent content--text">
                                   Your accounts will always be safe and 
                                   secure with our bank-grade security 
                                   and encryption systems
                                </p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

                <!---------------------------------->
            </v-row>

            <v-row class="mytrade__subcontainer--testimonial pb-10" >
                <v-col>
                <v-row class="mytrade__subcontainer pb-0 mb-0">
                    <v-col cols="4" style="text-align:center;">
                        <v-row>
                            <v-col class="mytrade__people">
                                <v-img
                                    class="people_img"
                                    src="derekchua.png"
                                    width="200"
                                >
                                </v-img>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="mytrade__people">
                                <h3 class="mytrade__people--name">Derrick Chua</h3>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="mytrade__people">
                                <p class="mytrade__people--text">
                                   One of the reasons why I opened an account 
                                   in MyTrade is because of Sir Nicky. I really 
                                   really like his market reports. I also see the 
                                   increased price of his recommendations. 
                                   After that, I always follow his recos. Because of that, 
                                   my account stayed positive.
                                </p>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="4" style="text-align:center">
                        <v-row>
                            <v-col style="text-align:center" class="mytrade__people">
                                <v-img
                                    class="people_img"
                                    src="marafrancisco.png"
                                    width="200"
                                >
                                </v-img>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="mytrade__people">
                                <h3 class="mytrade__people--name">Mara Francisco</h3>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="mytrade__people">
                                <p class="mytrade__people--text">
                                    My money is either in the bank 
                                    or insurance companies. Being a mother 
                                    of two, I wanted my money to be more 
                                    secured and I wanted faster returns. 
                                    I would encourage others to try MyTrade
                                    because it’s an easier way of investing, 
                                    your money’s secure and it’s convenient.
                                </p>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="4" style="text-align:center">
                        <v-row>
                            <v-col style="text-align:center" class="mytrade__people">
                                <v-img
                                    class="people_img"
                                    src="kassyparajillo.png"
                                    width="200"
                                >
                                </v-img>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="mytrade__people">
                                <h3 class="mytrade__people--name">Kassy Pajarillo</h3>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="mytrade__people">
                                <p class="mytrade__people--text">
                                    I choose MyTrade because 
                                    they have an app. I find it 
                                    convenient. It’s just within my 
                                    pocket and I can just check 
                                    how my stocks are.
                                </p>
                            </v-col>
                        </v-row>
                    </v-col>     
                </v-row>
                <v-row class="mytrade__subcontainer--quotes mt-0 pt-0">
                    <v-col cols="4">
                        <v-img
                            class="qoute"
                            src="quote.png"
                            width="50"
                        ></v-img>
                    </v-col>
                    <v-col cols="4">
                        <v-img
                            class="qoute"
                            src="quote.png"
                            width="50"
                        ></v-img>
                    </v-col>
                    <v-col cols="4">
                        <v-img
                            class="qoute"
                            src="quote.png"
                            width="50"
                        ></v-img>
                    </v-col>
                </v-row>
                </v-col>
            </v-row>
                
            <v-row class="footer pt-10">
                    <v-row class="footer__content mt-12">
                        <v-col cols="4">
                            <v-row class="mb-12 pl-3">
                                <h3 class="container--subtitle footer__title">Reach out to us</h3>
                            </v-row>
                            <v-divider class="divider__footer" id="divider__footer1"></v-divider>
                            <v-row>
                                <v-col cols="12 py-0 pr-12">
                                    <v-text-field
                                        dark
                                        class="mytrade_input"
                                        dense
                                        label="Name"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12 py-0 pr-12">
                                    <v-text-field
                                        dark
                                        class="mytrade_input"
                                        dense
                                        flat
                                        label="Email"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                             <v-row>
                                <v-col cols="12 py-0 pr-12">
                                    <v-text-field
                                        dark
                                        dense
                                        class="mytrade_input"
                                        flat
                                        label="Phone"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12 py-0 pr-12">
                                    <v-textarea
                                    dark
                                    class="mytrade_input"
                                    label="Type your message here.."
                                    auto-grow
                                    outlined
                                    rows="5"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12 pr-12" style="text-align:right;">
                                    <v-btn text dark class="text-capitalize">Submit</v-btn>
                                </v-col>
                            </v-row>

                        </v-col>
                        <v-col cols="4">
                            <v-row class="mb-12 pl-3">
                                <h3 class="container--subtitle footer__title">Download MyTrade</h3>
                            </v-row>
                            <v-divider class="divider__footer" id="divider__footer2"></v-divider>
                            <v-row>
                                <v-col>
                                    <v-img
                                        src="google_play2.webp"
                                        width="100px"
                                        class="google_play3"
                                    >
                                    </v-img>
                                </v-col>
                                <v-col class="px-0">
                                    <v-img
                                        src="app_store2.webp"
                                        width="90px"
                                        style="margin-top: 6px;"
                                        class="app_store3"
                                    >
                                    </v-img>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                   <v-icon dark class="footer__icon" @click="iconClick('https://www.facebook.com/MyTradePH')">mdi-facebook</v-icon>
                                   <v-icon dark class="pl-2 footer__icon" @click="iconClick('https://twitter.com/MyTradePH')">mdi-twitter</v-icon>
                                   <v-icon dark class="pl-2 footer__icon" @click="iconClick('https://www.youtube.com/channel/UCiMf3n7NBlNehq0EokACbJw')">mdi-youtube</v-icon>                             
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col style="font-size:12px;" class="my-0 py-0">
                                   <span>&copy; 2020 by MyTrade. All Rights Reserved. </span>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="4">
                            <v-row class="mb-12 pl-12">
                                <h3 class="container--subtitle footer__title">Contact</h3>
                            </v-row>
                            <v-divider class="ml-10 divider__footer" id="divider__footer3"></v-divider>
                            <v-row style="font-size: 12px;" class="pl-12">
                                <p class="content--text footer__text">2904-A East Tower, <br />
                                Philippine Stock Exchange Center, <br />
                                Exchange Road, Ortigas Center, <br />
                                Pasig City, 1600</p>

                                <p class="content--text footer__text">Call us: +63 (8) 667-8918<br />
                                    +63 (8) 667-8900<br />
                                    Mobile: +63 928-503-7112<br />
                                    Email:  marketing@mytrade.com.ph
                                </p>
                            </v-row>
                        </v-col>
                    </v-row>
            </v-row>

        </v-row>

    </v-content>
</template>
<script>
export default {
  data() {
    return {
        divscrolltop: 0,
        animate: 0,
        isScrolled01: false,
        isScrolled02: false,
        isScrolled03: false,
        isScrolled04: false,
        isScrolled05: false,
        isScrolled06: false,

    };
  },
  head: {
      meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: 'MyTrade is one of the most competitive online brokerage houses in the Philippines. Open an account and start trading today!' || ""
      },
      {
        hid: "og:image",
        property: "og:image",
        content: process.env.APP_URL + "/og/mytrade_og-image.png"
      }
    ],
  },
  metaInfo() {
    return {
      meta: [
          // Twitter Card
          {name: 'twitter:card', content: 'summary'},
          {name: 'twitter:title', content: 'MyTrade | Online Broker in the Philippines'},
          {name: 'twitter:description', content: 'MyTrade is one of the most competitive online brokerage houses in the Philippines. Open an account and start trading today!'},
          // image must be an absolute path
          {name: 'twitter:image', content: ''},
          // Facebook OpenGraph
          {property: 'og:title', content: 'MyTrade | Online Broker in the Philippines'},
          {property: 'og:type', content: 'website'},
          {property: 'og:image', content:  ''},
          {property: 'og:description', content: 'MyTrade is one of the most competitive online brokerage houses in the Philippines. Open an account and start trading today!'}
      ]
    }
  },
  mounted () {
      //*TODO // for discussion.. to be deleted soon
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
      //*TODO // for discussion.. to be deleted soon
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
      /**
       * trigger button to open account page in myTrade
       *
       */
    openAccount(){
        window.open("https://bit.ly/3bq3Qvp", "_blank");
      },
      /**
       * trigger when mdi icon is clicked
       *
       * @param   {string}  icon  name of icons
       *
       */
    iconClick(icon){
        window.open(icon, "_blank");
    },

      /**TODO // for discussion.. to be deleted soon
       * Trigger line animation on scroll event
       * 
       */
    handleScroll () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if(scrollTop >= 1000 && scrollTop <= 1180){
            const item = document.getElementById('mytrade_divider_1');
           if(!this.isScrolled01){ 
                this.lineAnimation(item);
                this.isScrolled01 = true;  
           }
         }else if(scrollTop >= 1320 && scrollTop <= 1700){
            const item = document.getElementById('mytrade_divider_2');
            if(!this.isScrolled02){ 
                this.lineAnimation(item);
                this.isScrolled02 = true;  
           }     
         }else if(scrollTop >= 1980 && scrollTop <= 2300){
            const item = document.getElementById('mytrade_divider_3');
            if(!this.isScrolled03){ 
                this.lineAnimation(item);
                this.isScrolled03 = true;  
           }     
         }else if(scrollTop >= 2400 && scrollTop <= 2700){
            const item = document.getElementById('mytrade_divider_4');
            if(!this.isScrolled04){ 
                this.lineAnimation(item);
                this.isScrolled04 = true;  
           }     
         }else if(scrollTop >= 3500 && scrollTop <= 3800){
            const item = document.getElementById('mytrade_divider_5');
            if(!this.isScrolled05){ 
                this.lineAnimation(item);
                this.isScrolled05 = true;  
           }     
         }else if(scrollTop >= 4450 && scrollTop <= 4700){
            const item1 = document.getElementById('divider__footer1');
            const item2 = document.getElementById('divider__footer2');
            const item3 = document.getElementById('divider__footer3');
            let div = 'footer';
            if(!this.isScrolled06){        
                   this.lineAnimation(item1, div);      
                   this.lineAnimation(item2, div);
                   this.lineAnimation(item3, div);
                this.isScrolled06 = true;  
           }     
         }
        
        
    },
    /**TODO // for discussion.. to be deleted soon
     * set line animation effect
     *
     * @param   {string}  item  name of a line (class)
     * @param   {string}  div   footer lines division
     *
     */
    lineAnimation(item, div){
            let max = 0;
            if(div != null){
                max = 170;
            }else{
                max = 380;
            }
            let width = 0;             
                setInterval(function() {
                        if (width >= max) {
                                clearInterval();              
                            } else {
                                width = width + 4;
                                item.style.width = width + 'px';
                            }
                    }, 10);    
    },
  }
}
</script>
<style scoped>
.content {
    background: #ffffff !important;
}
.header__content--logo {
    position: absolute;
    top: 30px;
    right: 15%;
}
.header__content {
    position: absolute;
    top: 260px;
    right: 10%;
    background: transparent;
    width: 30%;
}
.header__content--title{
    font-size: 40px;
    font-weight: bolder;
    line-height: 1.1em;
}

.header__content--subtitle {
    letter-spacing: 0.05em; 
    font-family:montserrat,sans-serif !important;
}

.mytrade__available {
    font-family:montserrat,sans-serif !important; 
    color:#0B1C4D;
}

.mytrade__availableText{
    font-size: 20px;
    font-family: poppins,sans-serif !important;
    font-weight: bold;
    color:#0B1C4D;
}

.content--text {
    font-family: poppins,sans-serif !important;
}
.mytrade__people{
    padding: 10px 80px;
}
.mytrade__people--name {
    font-family: poppins,sans-serif !important;
    font-size: 26px;
    color:#0f911e;
}
.mytrade__people--text {
    font-size: 15px;
    font-family: poppins,sans-serif !important;
}
.google_play,
.app_store,
.google_play2,
.app_store2 {
    cursor: pointer;
}
.mytrade__container {
    max-width: 1050px;
    margin: 0 auto;
    color:#000000;
}
.mytrade__subcontainer--testimonial {
    background: #f0f0f0;
    margin-top: 150px;
}
.mytrade__subcontainer {
    max-width: 1100px;
    margin: 0 auto;
    color:#000000;
    margin-top: 50px;
}
.mytrade__subcontainer--quotes{
    max-width: 1100px;
    margin: 0 auto;
}

.footer__content {
    max-width: 900px;
    margin: 0 auto;
}
.footer__title {
    font-size: 22px;
}
.footer__icon {
    cursor: pointer;
}
.footer__text {
    font-size: 13px;
}
.container--numlogo{
    font-size:87px;
    text-align: center;
}
.container__valuableResearch--title,
.container__managePortfolio--title,
.container__orderRoutes--title,
.container__performance--title,
.container__available--title{
    font-size:25px;
    font-weight: bold;
    padding-top: 20px;
}
.container--subtitle {
    font-family:montserrat,sans-serif !important;
}
.mytrade__learn {
    text-align:center; 
    font-family:montserrat,sans-serif !important;
}
.mytrade_divider{
    border-color: #0f911e;
    background: #0f911e;
    border-width: 2px;
    width: 0%;
    margin-left: 0px;
    position: relative;
    top: 5px;
}

.divider__footer {
    border: 1px solid rgba(212, 210, 0, 1);
    background: rgba(212, 210, 0, 1);
    width: 0px;
    margin-bottom: 20px;
}
.mytrade__indent{
    margin-left: 40px; 
}
#mytrade_image2 {
    position: absolute;
    transform: rotate(3deg);
}
.mytrade__image {
    position: absolute;
}
#mytrade__01 {
    left: -5px;
}
#mytrade_image6 {
    /*left: 90px;*/
    z-index: 0;
}
#mytrade_image8{  
    transform: rotate(10deg);
    left: 105px;
    z-index: -1;
    top: 20px;
}
#mytrade_image7 {
    z-index: -1;
    left: 220px;
    top: 35px;
}
.container__valuableResearch,
.container__managePortfolio,
.container__orderRoutes,
.container__performance {
    position:relative; 
    z-index:1;
}
#mytrade_image9 {
    z-index: -1;
    transform: rotate(-9deg);
    top: 10px;
    left: 39px;
}
#mytrade_image10 {
    z-index: -1;
    top: 10px;
    left: 75px;
}
.google_play2,
.app_store2{
    position: relative;
    top: 340px;
}
.people_img {
    border-radius: 50%;
    background-color: #e5e5e5;
}
.qoute {
    margin: 0 auto;
}
.footer {
    background: #0F911E;
    color: #ffffff !important;
}
</style>
<style>
.container {
    max-width: unset;
    padding: unset;
    background: #ffffff;
}
.mytrade_input > .v-input__control > .v-text-field__details {
    display: none;
}

</style>