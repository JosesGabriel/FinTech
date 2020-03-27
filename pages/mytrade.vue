<template>
    <v-content>      
            <v-row no-gutters class="mb-12">                 
                    <v-img
                        src="mytrade_image1.webp"
                        width="100%"
                    >
                    </v-img>
                    <v-img  
                        class="mytrade_logo"
                        src="mytrade_logo.webp"
                        width="23%"
                    >
                    </v-img>
                    <v-row 
                        class="mytrade_headertext"
                        style="color:#000000;"
                    >
                        <v-row class="mytrade_headertext_title">
                            <v-col cols="12" class="ma-0 pa-0">
                            <p class="ma-0 pa-0" style="letter-spacing: 0.05em;">Trade with</p>
                            <p style="letter-spacing: 0.05em;">Confidence</p>
                            </v-col>
                        </v-row>
                        <v-row>  
                            <v-col cols="12" class="ma-0 pa-0">                 
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and 
                                    typesetting industry. Lorem Ipsum has been the 
                                    industry's standard dummy text ever since the 1500s, 
                                    when an unknown printer took a galley of type and 
                                    scrambled it to make a type specimen book.
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
                                    >
                                    <span style="color:#ffffff;">Open new account</span>
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col class="ml-0 pl-0">
                                <div class="text-center">
                                    <v-btn 
                                        rounded 
                                        outlined
                                        class="text-capitalize"
                                        width="180"
                                        color="#0f911e"
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
                    <v-col>
                        <v-row>
                            <v-col cols="4">
                                <span class="mytrade__numtitle ma-0 pa-0">01</span>
                            </v-col>
                            <v-col cols="8" class="mytrade__numtext">
                                <p class="ma-0 pa-0">Valuable Research</p>
                                <p class="ma-0 pa-0">Based Recommendations</p>
                            </v-col>
                        </v-row>
                        <v-divider class="mytrade_divider"></v-divider>
                        <v-row>
                            <v-col cols="12">
                                <p class="mytrade__indent">
                                    Value-added & relevant research done by the country's 
                                    top market analyst spearheaded by Forbe's Top 5 stock 
                                    picker in Asia, Mr. Raymond Niel Franco. 
                                </p>
                                <ul class="mytrade__indent">
                                    <li>Better investment insights</li>
                                    <li>See investments in innovative angles</li>
                                    <li>Stop investing blindly - see the entire landscape</li>
                                    <li>Access high-value recommendations</li>
                                    <li>Smart & easy to follow market reports</li>
                                </ul>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="mytrade__indent">
                                 <v-btn 
                                        rounded 
                                        class="text-capitalize"
                                        width="150"
                                        color="#0f911e"
                                    >
                                    <span style="color:#ffffff;">Subscribe now</span>
                                    </v-btn>
                            </v-col>
                        </v-row>

                    </v-col>

                    <v-col>
                        <v-img
                            class="mytrade_image2"
                            src="13715.webp"
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
                    <v-col>
                        <v-row>
                            <v-col cols="4">
                                <span class="mytrade__numtitle ma-0 pa-0">02</span>
                            </v-col>
                            <v-col cols="8" class="mytrade__numtext">
                                <p class="ma-0 pa-0">Manage Multiple</p>
                                <p class="ma-0 pa-0">Portfolios</p>
                            </v-col>
                        </v-row>
                        <v-divider class="mytrade_divider"></v-divider>
                        <v-row>
                            <v-col cols="12">
                                <p class="mytrade__indent">
                                    Create & manage multiple portfolios 
                                    in a single account. Now you have the power 
                                    to separate portfolios accordingly.  
                                </p>
                                <ul class="mytrade__indent">
                                    <li>Separate your investing & trading portfolio</li>
                                    <li>Manage multiple portfolios with ease</li>
                                    <li>Everything in a single platform</li>
                                </ul>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="mytrade__indent">
                                 <v-btn 
                                        rounded 
                                        class="text-capitalize"
                                        width="150"
                                        color="#0f911e"
                                    >
                                    <span style="color:#ffffff;">Try it now</span>
                                    </v-btn>
                            </v-col>
                        </v-row>

                    </v-col>
                </v-row>
            </v-row>
    </v-content>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.mytrade_logo {
    position: absolute;
    top: 60px;
    right: 15%;
}
.mytrade_headertext {
    position: absolute;
    top: 270px;
    right: 10%;
    background: transparent;
    width: 30%;
}
.mytrade_headertext_title {
    font-size: 45px;
    font-weight: bolder;
    font-family:montserrat,sans-serif;
    line-height: 1.1em;
}
.google_play,
.app_store {
    cursor: pointer;
}
.mytrade__container {
    max-width: 1050px;
    margin: 0 auto;
    color:#000000;
}
.mytrade__numtitle{
    font-size:87px;
    text-align: center;
    padding-left: 34px !important;
}
.mytrade__numtext{
    font-size:25px;
    font-weight: bold;
    padding-top: 40px;
}
.mytrade_divider{
    border-color: rgb(53, 212, 65);
    border-width: 2px;
    width: 380px;
    margin-left: 40px;
    position: relative;
    top: -18px;
}
.mytrade__indent{
    margin-left: 40px; 
}
.mytrade_image2 {
    position: absolute;
    transform: rotate(5deg);
}
</style>
<style>
.container {
    max-width: unset;
    padding: unset;
}
</style>