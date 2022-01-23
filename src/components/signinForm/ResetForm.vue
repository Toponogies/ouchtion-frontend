<template>
    <div>
        <div class="container">
            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter email" v-model="email" required />

            <button @click="register">Reset</button>
            <div>{{ resetError }}</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
    name: "ResetForm",
    data() {
        return {
            email: "",
        };
    },

    computed: {
        ...mapState("CurrentUserModule", ["isModalOpen"]),
        ...mapState("CurrentUserModule", ["resetError"]),
    },

    watch: {
        isModalOpen() {
            this.email = "";
        },
    },

    methods: {
        ...mapActions("CurrentUserModule", ["doSendReset"]),
        ...mapMutations("CurrentUserModule", ["setModalOpen"]),
        register() {
            this.doSendReset(this.email);
        },
    },
};
</script>

<style scoped>
form {
    border: 3px solid #f1f1f1;
}

input[type="text"] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

button {
    background-color: #04aa6d;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}

button[disabled="disabled"],
button:disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
}

.container {
    padding: 16px;
}
</style>
