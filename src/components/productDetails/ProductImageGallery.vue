<template>
    <v-slide-group show-arrows>
        <v-slide-item v-for="image in allImages" :key="image.product_image_id">
            <v-card class="mx-2">
                <v-img :src="image.path" width="200" @click="openLargeImageDialog(image.path)">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma=0" align="center" justify="center">
                            <v-progress-circular indeterminate></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-card>
        </v-slide-item>
        <v-dialog v-model="largeImageDialogOpened" max-width="fit-content" persistent>
            <v-card>
                <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-btn icon tile @click="closeLargeImageDialog()" class="px-6">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-row>
                <v-img :src="largeImageDialogSelectedUrl">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma=0" align="center" justify="center">
                            <v-progress-circular indeterminate></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-card>
        </v-dialog>
    </v-slide-group>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ProductImageGallery",
    data() {
        return {
            largeImageDialogOpened: false,
            largeImageDialogSelectedUrl: null,
        };
    },
    computed: {
        ...mapState("CurrentProductModule", ["primaryImage", "secondaryImages"]),
        allImages() {
            return [this.primaryImage].concat(this.secondaryImages);
        },
    },
    methods: {
        openLargeImageDialog(url) {
            this.largeImageDialogOpened = true;
            this.largeImageDialogSelectedUrl = url;
        },
        closeLargeImageDialog() {
            this.largeImageDialogOpened = false;
            this.largeImageDialogSelectedUrl = null;
        },
    },
    mounted() {
        console.log(this.primaryImage);
        console.log(this.secondaryImages);
    },
};
</script>
