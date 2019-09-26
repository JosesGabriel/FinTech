<template>
    <v-card class="pa-4" color="#142a46" dark outlined>
        <v-form>
            <v-avatar size="38" class="postField__avatar">
                <img
                alt="Avatar"
                src="test.jpg"
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
                    <div v-if="!postField__previewImage">
                        <input type="file" @change="onFileChange" class="d-none" ref="postField__inputRef" accept=".jpg, .jpeg, .png, .gif, .mp4, .webm">
                    </div>
                    <div v-else class="postField__preview pt-2">
                        <v-btn @click="removeImage" color="rgba(000,000,000,0.70)" fab x-small dark absolute>
                            <v-icon color="white">mdi-close</v-icon>
                        </v-btn>
                        <img :src="postField__previewImage" class="postField__previewImage" v-if="post__isImage"/>
                        <video controls :src="postField__previewImage" class="postField__previewImage" v-if="!post__isImage"/>
                    </div>
                    <v-btn small dark @click="postField__imageUploadBtn" icon>
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
            color="success"
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
    max-height: 500px;
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
</style>
<script>
import axios from '~/node_modules/axios'
export default {
    data() {
        return {
            postField__alert: false,
            post__responseMsg: null,
            post__isImage: null,
            postFieldModel: null,
            postField__previewImage: null,
            postField__loading: false
        }
    },
    methods: {
        postField__submit: function (event) {
            this.postField__loading = true
            axios.post('https://dev-api.arbitrage.ph/api/social/posts', {
                user_id: '76f0f772-0de8-47cb-944e-c903d810a7ca',
                content: this.postFieldModel,
                visibility: 'public',
                status: 'active'
            })
            .then((response) => {
                this.post__responseMsg = response.data.message;
                this.postField__alert = true;
                this.postFieldModel = '';
                this.postField__loading = false;
            })
            .catch(function (error) {
                console.log(error)
            });
        },
        postField__imageUploadBtn: function(e) {
            const elem = this.$refs.postField__inputRef
            elem.click()
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            var filetype = (files[0].type).split("/")[0];
            if(filetype == 'image')
                this.post__isImage = true;
            else
                this.post__isImage = false;
            this.createImage(files[0]);
        },
        createImage(file) {
            var postField__previewImage = new Image();
            var reader = new FileReader();
            reader.onload = (e) => {
                this.postField__previewImage = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.postField__previewImage = '';
        }
    },
    mounted() {
        
    }
}
</script>