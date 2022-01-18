<template>
    <div>
        {{ verifyError }}
    </div>
</template>

<script>
import { mapActions,mapState } from "vuex";

export default {
    name: "VerifyAccount",
    computed: {
        ...mapState("AuthModule", ["verifyError"]),
    },
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
