<template>
    <v-card class="pa-4" color="#142a46" dark outlined>
        <v-form enctype="multipart/form-data">
            <v-avatar size="38" class="postField__avatar">
                <img
                alt="Avatar"
                src="https://picsum.photos/500/300?image=15"
                >
            </v-avatar>
            <div class="postField__textareaContainer">
                <v-textarea
                label="Hey Eazy, penny for your thoughts?"
                class="pt-0"
                rows="3"
                row-height="25"
                v-model="postFieldModel"
                color="primary"
                required
                :loading="postField__loading"
                >{{ postFieldModel }}</v-textarea>
                <div>
                    <input type="file" class="d-none" multiple @change="onInputFileChange" ref="postField__inputRef" accept=".jpg, .jpeg, .png, .mp4, .webm">
                    <div class="postField__preview pt-2">
                        <!-- <v-btn @click="removeImage" color="rgba(000,000,000,0.70)" fab x-small dark absolute>
                            <v-icon color="white">mdi-close</v-icon>
                        </v-btn> -->
                        <!-- <img :src="postField__previewImage" class="postField__previewImage" v-if="post__isImage"/>
                        <video controls :src="postField__previewImage" class="postField__previewImage" v-if="!post__isImage"/> -->
                        <div class="postField__imageWrapper">
                            <div class="postField__imageCard px-1" v-for="n in postField__imagesArray.length" :key="n" v-show="postField__imagesArray[n - 1] != ''">
                                <v-btn @click="removeImage(n)" color="rgba(000,000,000,0.70)" fab x-small dark class="postField__imageWrapper--close-btn">
                                    <v-icon color="white">mdi-close</v-icon>
                                </v-btn>
                                <video controls :src="postField__imagesArray[n - 1]" class="postField__imageWrapper--image" v-if="!post__isImage"/>
                                <img :src="postField__imagesArray[n - 1]" class="postField__imageWrapper--image" v-else>
                            </div>
                        </div>
                    </div>
                    <v-btn small dark @click="onClickImageUploadBtn" icon>
                        <v-icon color="primary">mdi-image-outline</v-icon>
                    </v-btn>
                    <v-btn rounded outlined small right absolute color="primary" :disabled="!postFieldModel" @click="postField__submit">
                        Post
                    </v-btn>
                </div>
            </div>
        </v-form>
        <v-snackbar
            v-model="postField__alert"
            :color="postField__alertState ? 'success' : 'error' "
            >
            {{ post__responseMsg }}
            <v-btn
                color="white"
                text
                @click="postField__alert = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-card>
</template>
<style>
.postField__preview img, .postField__preview video {
    max-width: 100%;
    max-height: 120px;
}
.postField__avatar {
    position: absolute;
}
.postField__textareaContainer {
    margin-left: 50px;
}
.postField__previewImage {
    border-radius: 10px;
}
.postField__imageWrapper {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 100%;
}
.postField__imageCard {
    flex: 0 0 auto;
}
.postField__imageWrapper--close-btn {
    position: relative;
    bottom: 96px;
    right: 3px;
    z-index: 1;
}
.postField__imageWrapper--image {
    margin-left: -40px;
}
</style>
<script>
export default {
    data() {
        return {
            postField__alertState: null,
            post__responseMsg: null,
            post__isImage: null,
            postFieldModel: null,
            postField__previewImage: [],
            postField__loading: false,
            postField__alert: false,
            postField__imagesArray: []
        }
    },
    methods: {
        postField__submit: function () {
            this.postField__loading = true;
            const formData = new FormData();
            formData.append('file', this.$refs.postField__inputRef.files[0]);
            console.log(this.$refs.postField__inputRef.files[0]);
            if(this.$refs.postField__inputRef.files[0]) { //text + image
                this.$axios.$post('https://dev-api.arbitrage.ph/api/storage/upload',formData)
                .then((response) => {
                    this.$axios.$post('https://dev-api.arbitrage.ph/api/social/posts', {
                        user_id: '76f0f772-0de8-47cb-944e-c903d810a7ca',
                        content: this.postFieldModel,
                        attachments: [response.data.file.url],
                        visibility: 'public',
                        status: 'active',
                    })
                    .then((response) => {
                        this.post__responseMsg = response.message;
                        this.clearInputs('success');
                    })
                    .catch((error) => {
                        this.post__responseMsg = error.response.data.message;
                        this.clearInputs('error');
                    });
                })
                .catch((error) => {
                    this.post__responseMsg = error.response.data.message;
                    this.clearInputs('error');
                });
            } else { // can't reuse axios code above bc its asynchronous. Suggestions on how to improve r welcome
                this.$axios.$post('https://dev-api.arbitrage.ph/api/social/posts', {
                    user_id: '76f0f772-0de8-47cb-944e-c903d810a7ca',
                    content: this.postFieldModel,
                    visibility: 'public',
                    status: 'active',
                })
                .then((response) => {
                    this.post__responseMsg = response.message;
                    this.clearInputs('success');
                })
                .catch((error) => {
                    this.post__responseMsg = error.response.data.message;
                    this.clearInputs('error');
                });
            }
        },
        onClickImageUploadBtn: function() { 
            this.$refs.postField__inputRef.click(); // clicks actual input type file button. lisod i-style ang <input type="file">
        },
        onInputFileChange: function(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            for(var i = 0; i < files.length; i++) {
                var filetype = (files[i].type).split("/")[0];
                this.generateImagePreviews(files[i], filetype);
            }
        },
        generateImagePreviews: function(file, type) {
            var reader = new FileReader();
            reader.onload = (e) => {
                type == 'image' ? this.post__isImage = true : this.post__isImage = false;
                console.log(this.post__isImage);
                this.postField__imagesArray.push(e.target.result);
            };
            reader.readAsDataURL(file);
        },
        removeImage: function(closeId) {
            this.$set(this.postField__imagesArray,closeId - 1, '');
        },
        clearInputs: function(type) {
            type == 'success' ? this.postField__alertState = true : this.postField__alertState = false;
            this.postField__alert = true;
            this.postFieldModel = '';
            this.postField__loading = false;
            this.removeImage();
        }
    }
}
</script>