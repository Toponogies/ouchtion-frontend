<template>
    <div>
        <div class="container">
            <label for="email"><b>Email</b></label>
            <input type="email" placeholder="Enter Email" v-model="email" required />
            <p class="red--text">{{ validateEmail }}</p>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" v-model="password" required />

            <button :disabled="isValid" @click="login">Login</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "SignInForm",
    data() {
        return {
            email: "",
            password: "",
        };
    },

    computed: {
        ...mapState("CurrentUserModule", ["isModalOpen"]),
        isValid() {
            const regexPatternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
            if (regexPatternEmail.test(this.email) && this.password !== "") return false;
            return true;
        },
        validateEmail() {
            const regexPatternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
            return regexPatternEmail.test(this.email) ? null : "Must be email";
        },
    },

    watch: {
        isModalOpen() {
            this.email = "";
            this.password = "";
        },
    },

    methods: {
        ...mapActions("CurrentUserModule", ["doLogin"]),
        async login() {
            await this.doLogin({
                email: this.email,
                password: this.password,
            });
        },
    },
};
</script>

<style scoped>
form {
    border: 3px solid #f1f1f1;
}

/* Full-width inputs */
input[type="text"],
[type="email"],
input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

/* Set a style for all buttons */
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

/* Add padding to containers */
.container {
    padding: 16px;
}
</style>
