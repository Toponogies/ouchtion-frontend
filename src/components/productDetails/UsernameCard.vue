<template>
    <v-card class="pa-2 rounded-pill" height="fit-content" width="fit-content" outlined>
        <div class="d-flex flex-row">
            <div class="mr-4 d-flex flex-align-center">
                <v-icon left>mdi-account-circle</v-icon>
                <span>{{ username }}</span>
            </div>
            <div class="ml-4 d-flex flex-align-center">
                <v-icon left small color="yellow darken-4">mdi-star</v-icon>
                <span class="yellow--text text--darken-4">{{ rating }}</span>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    name: "UsernameCard",
    props: {
        username: String,
        rating: Number,
    },
};
</script>
