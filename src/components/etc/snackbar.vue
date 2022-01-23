<!-- Stolen from https://stackoverflow.com/a/62809325; thanks @kalana-mihiranga -->

<template>
    <v-snackbar v-model="show" :timeout="3000"
        >{{ text }}
        <template v-slot:action="{ attrs }">
            <v-btn icon v-bind="attrs" @click="handleSnackbarActionClick">
                <v-icon>mdi-close</v-icon>
            </v-btn></template
        >
    </v-snackbar>
</template>

<script>
export default {
    name: "AppSnackbar",
    data() {
        return {
            text: null,
            show: false,
        };
    },
    methods: {
        handleSnackbarActionClick() {
            this.show = false;
        },
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === "SnackbarModule/showSnackbar") {
                this.text = state.SnackbarModule.text;
                this.show = true;
            }
        });
    },
};
</script>
