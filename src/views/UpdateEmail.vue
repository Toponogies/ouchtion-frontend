<template>
    <div>

    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "UpdateEmail",
    methods: {
        ...mapActions("CurrentUserModule", ["doUpdateEmail"]),
        updateEmail() {
            this.doUpdateEmail(this.$route.query.token);
        },
    },
    mounted(){
        this.updateEmail()
    }
};
</script>
