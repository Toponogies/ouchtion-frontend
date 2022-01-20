<template>
    <div>
        <div class="container">
            <label for="password"><b>Password:</b></label>
            <input type="password" placeholder="Enter password" v-model="password" required />

            <button @click="reset">Reset</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "VerifyAccount",
    data() {
        return {
            password: "",
        };
    },
    methods: {
        ...mapActions("AuthModule", ["doReset"]),
        reset() {
            this.doReset({
                token:this.$route.query.token,
                password:this.password
            });
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