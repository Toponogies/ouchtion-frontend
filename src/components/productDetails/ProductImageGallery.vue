<template>
    <v-slide-group show-arrows>
        <v-slide-item v-for="image in images" :key="image.product_image_id">
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
import { getProductImage } from "@/api/product";

export default {
    name: "ProductImageGallery",
    props: {
        productId: String,
    },
    data() {
        return {
            largeImageDialogOpened: false,
            largeImageDialogSelectedUrl: null,
            images: [],
        };
    },
    methods: {
        async getProductImages() {
            try{
                this.images = await getProductImage(this.productId)
                this.images.forEach(image => {
                    image.path = "http://localhost:3000/" + image.path;
                });
            }
            catch(error){
                console.log(error);
            }
        },
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
        this.getProductImages();
    },
};
</script>
