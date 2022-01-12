<template>
    <v-container class="ma-0 pa-0">
        <v-card class="mb-4">
            <v-row no-gutters class="pa-6">
                <v-col>
                    <v-row no-gutters class="pb-4" align="center">
                        <v-icon left>mdi-image-multiple</v-icon>
                        <div class="font-weight-bold">Images</div>
                    </v-row>
                    <v-row no-gutters>
                        <p>
                            Upload at least 3 images.<br />
                            The first image in this list will be the primary image of this product.
                        </p>
                    </v-row>
                    <v-row no-gutters>
                        <v-file-input
                            chips
                            counter
                            multiple
                            show-size
                            accept="image/*"
                            v-model="images"
                            :rules="[imageChooserRules.atLeast3]"
                        ></v-file-input>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mb-4">
            <!-- Product name -->
            <v-row no-gutters class="px-6 pt-6 pb-6">
                <v-text-field
                    filled
                    class="new-product-field"
                    hide-details="auto"
                    placeholder="Product name"
                    v-model="name"
                ></v-text-field>
            </v-row>

            <!-- Bid/Buy now options -->
            <v-row no-gutters class="px-6 pb-6">
                <!-- Bid -->
                <v-col cols="6">
                    <v-card color="orange darken-3 white--text" class="pa-4 mr-2">
                        <!-- Header -->
                        <v-row no-gutters align="center" class="mb-4">
                            <div class="font-weight-bold">BID</div>
                            <v-spacer></v-spacer>
                            <v-switch
                                disabled
                                input-value="true"
                                hide-details="true"
                                color="white"
                                class="ma-0 pa-0"
                            ></v-switch>
                        </v-row>

                        <!-- Price field -->
                        <v-row no-gutters class="mb-4">
                            <v-text-field
                                filled
                                hide-details="auto"
                                placeholder="Starting price"
                                class="price-field"
                                v-model="bidStartingPrice"
                                dark
                            >
                                <template v-slot:prepend>
                                    <div>&#x20AB;</div>
                                </template></v-text-field
                            >
                        </v-row>

                        <!-- Price increment field -->
                        <v-row no-gutters class="mb-4">
                            <v-text-field
                                filled
                                hide-details="auto"
                                placeholder="Increment"
                                class="price-field"
                                v-model="bidIncrement"
                                dark
                            >
                                <template v-slot:prepend>
                                    <div>&#x20AB;</div>
                                </template>
                            </v-text-field>
                        </v-row>
                    </v-card>
                </v-col>

                <!-- Buy now -->
                <v-col cols="6">
                    <v-card color="red darken-3 white--text" class="pa-4 ml-2">
                        <!-- Header -->
                        <v-row no-gutters align="center" class="mb-4">
                            <div class="font-weight-bold">BUY NOW</div>
                            <v-spacer></v-spacer>
                            <v-switch
                                hide-details="auto"
                                color="white"
                                class="ma-0 pa-0"
                                v-model="enableBuyNow"
                            ></v-switch>
                        </v-row>

                        <!-- Hint -->
                        <v-row no-gutters class="mb-4">
                            <p>
                                Toggle the switch to allow immediate purchase. <br />
                                This price must be higher than starting bid price.
                            </p>
                        </v-row>

                        <!-- Price field -->
                        <v-row no-gutters class="mb-4">
                            <v-text-field
                                filled
                                hide-details="auto"
                                placeholder="Buy now price"
                                class="price-field"
                                v-model="buyNowPrice"
                                dark
                                :disabled="!enableBuyNow"
                            >
                                <template v-slot:prepend>
                                    <div>&#x20AB;</div>
                                </template>
                            </v-text-field>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Date/time pickers -->
            <v-row no-gutters class="px-6 pb-6">
                <v-col cols="12">
                    <v-card flat color="grey lighten-4">
                        <!-- Header -->
                        <v-row no-gutters class="px-4 pt-4" align="center">
                            <v-icon left>mdi-clock-outline</v-icon>
                            <div class="font-weight-bold">Ends at &hellip;</div>
                        </v-row>

                        <!-- Actual pickers -->
                        <v-row no-gutters class="pa-4" align="center">
                            <!-- Date picker -->
                            <v-menu
                                v-model="datePickerOpened"
                                :close-on-content-click="false"
                                transition="slide-y-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="endDate"
                                        v-on="on"
                                        v-bind="attrs"
                                        label="Date"
                                        readonly
                                        filled
                                        class="mr-2"
                                        hide-details="auto"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="endDate" @input="datePickerOpened = false"></v-date-picker>
                            </v-menu>

                            <!-- Time picker -->
                            <v-menu
                                v-model="timePickerOpened"
                                :close-on-content-click="false"
                                transition="slide-y-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="endTime"
                                        v-on="on"
                                        v-bind="attrs"
                                        label="Time"
                                        readonly
                                        filled
                                        class="ml-2"
                                        hide-details="auto"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-model="endTime"
                                    @input="timePickerOpened = false"
                                    use-seconds
                                ></v-time-picker>
                            </v-menu>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Auto-extension -->
            <v-row no-gutters class="px-6 pb-6">
                <v-col cols="12">
                    <v-card flat color="grey lighten-4">
                        <v-row no-gutters class="px-4 pt-4" align="center">
                            <v-icon left>mdi-clock-outline</v-icon>
                            <div class="font-weight-bold">Auto-extend end time</div>
                        </v-row>
                        <v-row no-gutters class="px-4 pt-4">
                            <p>
                                When a new bid appears within the last 5 minutes of the auctioning time window for this
                                product, the end time will automagically be extended to have 10 more minutes.
                            </p>
                        </v-row>
                        <v-row no-gutters class="px-4">
                            <v-switch v-model="allowAutoExtension" label="Enable auto-extension"></v-switch>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Category pickers -->
            <v-row no-gutters class="px-6 pb-6">
                <v-col cols="12">
                    <v-card flat color="grey lighten-4">
                        <v-row no-gutters class="px-4 pt-4">
                            <v-icon left>mdi-shape</v-icon>
                            <div class="font-weight-bold">Category</div>
                        </v-row>
                        <v-row no-gutters class="px-4 pt-4">
                            <p>
                                Type to search, then select with arrows and press Enter to add.<br />
                                You can select multiple categories.
                            </p>
                        </v-row>
                        <v-row no-gutters class="pa-4">
                            <!-- https://stackoverflow.com/a/55809183 -->
                            <v-autocomplete
                                v-model="selectedCategories"
                                :items="availableCategories"
                                :search-input.sync="categorySearchString"
                                multiple
                                chips
                                deletable-chips
                                @change="categorySearchString = ''"
                            ></v-autocomplete>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <v-divider class="mb-6"></v-divider>

            <!-- Description editor -->
            <v-row no-gutters class="px-6 pb-6">
                <v-col cols="12">
                    <v-row no-gutters class="pb-4">
                        <div class="text-h6 font-weight-bold">Description</div>
                    </v-row>
                    <v-row no-gutters class="pb-4">
                        <p>
                            The description must not be empty. <br />
                            You can only append to the description, not edit the whole thing, after this product has
                            been created.
                        </p>
                    </v-row>
                    <v-row no-gutters>
                        <tiptap-vuetify v-model="description" :extensions="tiptapExtensions"></tiptap-vuetify>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
        <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-btn large color="primary" @click="submit" :disabled="!elligibleForCreation">
                <v-icon left>mdi-plus-box</v-icon>
                <span>Create product</span>
            </v-btn>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
import { generateCategories } from "@/utils/mockUtils";
import {
    TiptapVuetify,
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    Paragraph,
    BulletList,
    OrderedList,
    ListItem,
    Link,
    Blockquote,
    HardBreak,
    HorizontalRule,
    History,
} from "tiptap-vuetify";

export default {
    name: "ProductCreator",
    components: { TiptapVuetify },
    data() {
        return {
            name: null,
            bidStartingPrice: null,
            bidIncrement: null,
            enableBuyNow: false,
            buyNowPrice: null,
            datePickerOpened: false,
            timePickerOpened: false,
            endDate: null,
            endTime: null,
            allowAutoExtension: false,
            availableCategories: [],
            selectedCategories: [],
            categorySearchString: "",
            description: "",
            tiptapExtensions: [
                History,
                Blockquote,
                Link,
                Underline,
                Strike,
                Italic,
                ListItem,
                BulletList,
                OrderedList,
                [Heading, { options: { levels: [1, 2, 3] } }],
                Bold,
                Code,
                HorizontalRule,
                Paragraph,
                HardBreak,
            ],
            images: [],
            imageChooserRules: {
                atLeast3: (files) => files.length >= 3,
            },
        };
    },
    computed: {
        elligibleForCreation: function () {
            const conditions = [
                this.name && this.name.trim().length > 0,
                this.bidStartingPrice !== null,
                this.bidStartingPrice > 0,
                this.bidIncrement !== null,

                /* ENTER: CLASSICAL PROPOSITIONAL LOGIC.
                 * Given A = "buy-now option is enabled",
                 * and B = "the buy-now price must not be empty",
                 * and the desired behavior is "if A is true, then B must also be true",
                 * the only corresponding expression is "A -> B" (if A then B).
                 * The equivalent of A -> B is "NOT A OR B",
                 * hence this JS expression below.
                 */
                !this.enableBuyNow ||
                    (this.buyNowPrice !== null && this.buyNowPrice > 0 && this.buyNowPrice > this.bidStartingPrice),

                this.endDate !== null,
                this.endTime !== null,
                this.selectedCategories.length > 0,
                this.description && this.description.trim().length > 0,
                this.images.length >= 3,
            ];
            return conditions.every((each) => each === true);
        },
    },
    methods: {
        getCategories() {
            const fetchedCategories = generateCategories();
            this.availableCategories = fetchedCategories.map((each) => ({ text: each.name, value: each.category_id }));
        },
        submit() {
            console.log(`Call API create new product`);
        },
    },
    mounted() {
        this.getCategories();
    },
};
</script>

<style scoped>
.new-product-field >>> input {
    font-size: 2.125rem;
    font-weight: 300;
}
.price-field >>> .v-input__prepend-outer,
.price-field >>> input {
    font-size: 2em;
}
</style>
