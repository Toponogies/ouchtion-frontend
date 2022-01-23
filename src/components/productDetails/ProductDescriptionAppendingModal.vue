<template>
    <v-dialog v-model="isAppendDescriptionOpen" persistent max-width="960">
        <v-card>
            <!-- Header -->
            <v-row no-gutters class="px-4 py-4">
                <div class="text-h6 font-weight-bold">Append description</div>
                <v-spacer></v-spacer>
                <v-btn icon @click="handleCancel()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-row>

            <!-- Tiptap Editor -->
            <v-row no-gutters class="px-4 py-4">
                <tiptap-vuetify
                    v-model="description"
                    :extensions="tiptapExtensions"
                    style="flex-grow: 1"
                    placeholder="Enter your appendix here."
                ></tiptap-vuetify>
            </v-row>

            <!-- Confirm button -->
            <v-row no-gutters class="px-4 pb-4">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="handleSubmit()" :disabled="isDescriptionEmpty">Append</v-btn>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import {
    TiptapVuetify,
    HardBreak,
    ListItem,
    History,
    Heading,
    Paragraph,
    Blockquote,
    HorizontalRule,
    Bold,
    Italic,
    Strike,
    Underline,
    Link,
    Code,
    BulletList,
    OrderedList,
} from "tiptap-vuetify";

export default {
    name: "ProductDescriptionAppendingModal",
    components: { TiptapVuetify },
    data() {
        return {
            description: "<p></p>",
            tiptapExtensions: [
                // Base extensions (these do not have buttons on toolbar)
                HardBreak,
                ListItem,

                // Undo/Redo
                History,

                // Block formatting
                [Heading, { options: { levels: [1, 2, 3] } }],
                Paragraph,
                Blockquote,
                HorizontalRule,

                // Inline formatting
                [Bold, { renderIn: "bubbleMenu" }],
                [Italic, { renderIn: "bubbleMenu" }],
                [Underline, { renderIn: "bubbleMenu" }],
                [Strike, { renderIn: "bubbleMenu" }],
                [Link, { renderIn: "bubbleMenu" }],
                [Code, { renderIn: "bubbleMenu" }],

                // Lists
                BulletList,
                OrderedList,
            ],
        };
    },
    computed: {
        ...mapState("CurrentProductDetailsSellerModule", ["isAppendDescriptionOpen"]),
        isDescriptionEmpty: function () {
            const htmlElement = document.createElement("div");
            htmlElement.innerHTML = this.description;
            return htmlElement.textContent.trim().length === 0;
        },
    },
    methods: {
        ...mapActions("CurrentProductDetailsSellerModule", ["appendProductDescription"]),
        ...mapMutations("CurrentProductDetailsSellerModule", ["setAppendDescriptionModalState"]),
        handleSubmit() {
            this.appendProductDescription({
                description: this.description,
                product_id: this.$route.params.id,
            });
            this.clearDescription();
            this.setAppendDescriptionModalState(false);
        },
        handleCancel() {
            this.clearDescription();
            this.setAppendDescriptionModalState(false);
        },
        clearDescription() {
            this.description = "<p></p>";
        },
    },
};
</script>
