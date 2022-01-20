<template>
    <div>

    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "VerifyAccount",
    methods: {
        ...mapActions("AuthModule", ["doVerify"]),
        verify() {
            this.doVerify(this.$route.query.token);
        },
    },
    mounted(){
        this.verify()
    }
};
</script>
