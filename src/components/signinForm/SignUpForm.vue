<template>
    <div>
        <div class="container">
            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter email" v-model="email" required />
            <p class="red--text">{{ validateEmail }}</p>

            <label for="password"><b>Password</b></label>
            <input type="password" placeholder="Enter password" v-model="password" required />

            <label for="full_name"><b>Full name</b></label>
            <input type="text" placeholder="Enter full name" v-model="full_name" required />
            <p class="red--text">{{ validateFullName }}</p>

            <label for="address"><b>Address</b></label>
            <input type="text" placeholder="Enter address" v-model="address" required />

            <vue-hcaptcha sitekey="ae0869bd-27d8-4b1f-a965-d8e6d9f9e11f" @verify="captchaOk"></vue-hcaptcha>
            <button :disabled="isValid" @click="register">Sign up</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import VueHcaptcha from "@hcaptcha/vue-hcaptcha";

export default {
    name: "SignUpForm",
    components: { VueHcaptcha },
    data() {
        return {
            email: "",
            password: "",
            address: "",
            full_name: "",
            checkCaptcha: false,
        };
    },

    computed: {
        ...mapState("AuthModule", ["isModalOpened"]),
        isValid() {
            const regexPatternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
            const regexPatternFullName = /[a-zA-Z] [a-zA-Z]/;
            if (
                regexPatternEmail.test(this.email) &&
                this.password !== "" &&
                this.address !== "" &&
                regexPatternFullName.test(this.full_name) &&
                this.checkCaptcha === true
            )
                return false;
            return true;
        },
        validateEmail() {
            const regexPatternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
            return regexPatternEmail.test(this.email) ? null : "Must be email";
        },
        validateFullName() {
            const regexPatternFullName = /[a-zA-Z] [a-zA-Z]/;
            return regexPatternFullName.test(this.full_name) ? null : "Must be full name";
        },
    },

    watch: {
        isModalOpened() {
            this.email = "";
            this.password = "";
            this.address = "";
            this.full_name = "";
            this.checkCaptcha = false;
        },
    },

    methods: {
        ...mapActions("AuthModule", ["doRegister"]),
        ...mapMutations("AuthModule", ["setModalState"]),
        captchaOk() {
            this.checkCaptcha = true;
        },
        register() {
            this.doRegister({
                email: this.email,
                password: this.password,
                full_name: this.full_name,
                address: this.address,
            });
        },
    },

    mounted() {
        this.email = "";
        this.password = "";
        this.address = "";
        this.full_name = "";
        this.checkCaptcha = false;
    },
};
</script>

<style scoped>
form {
    border: 3px solid #f1f1f1;
}

input[type="text"],
input[type="password"] {
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
