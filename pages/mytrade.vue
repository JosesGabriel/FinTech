<template>
    <v-content>      
            <v-row no-gutters >                 
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
                    <v-row class="mytrade_headertext">
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
            <v-row>
                <v-col>
                    <v-row>
                        <v-col>
                            <span>01</span>
                        </v-col>
                        <v-col>
                            <span>Strong Market</span>
                            <span>Research Report</span>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col>
                </v-col>
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
</style>
<style>
.container {
    max-width: unset;
    padding: unset;
}
</style>