<template>
    <v-app>
        <div id="top"></div>
        <nprogress-container></nprogress-container>
        <v-container>
            <v-row justify="center">
                <v-col class="ma-8" lg="10" xl="8">
                    <!-- Actual view starts here -->
                    <top-bar></top-bar>
                    <v-row id="content">
                        <router-view :key="$router.path" />
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <app-snackbar></app-snackbar>
    </v-app>
</template>

<script>
import "@fontsource/inter/variable.css";
import NprogressContainer from "vue-nprogress/src/NprogressContainer";

import TopBar from "@/components/topbar/TopBar.vue";
import AppSnackbar from "@/components/etc/snackbar";

import { socket } from "@/socket/connect";
import { BIDDING_ADD, BIDDING_ADD_AUTO, CATEGORY_LIST_UPDATE, USER_UPDATE_ROLE } from "./utils/constants";
import { mapActions, mapState } from 'vuex';
import { showSnack } from "./utils/showSnack";

export default {
    name: "App",
    components: { TopBar, NprogressContainer, AppSnackbar },
    computed: {
        ...mapState("CurrentUserModule", ["id","role"]),
    },
    methods: {
        ...mapActions("CategoryModule", ["fetchAll"]),
        ...mapActions("AuthModule", ["doLogout"]),
    },
    created() {
        socket.on(CATEGORY_LIST_UPDATE, () => {
            // Get category again and update the list
            this.fetchAll();
        });

        socket.on(USER_UPDATE_ROLE, (data) => {
            // Notify user and lgout
            if (data.user_id === this.id)
            {
                showSnack("User update role please login again");
                this.doLogout();
            }
        });

        socket.on(BIDDING_ADD, (data) => {
            console.log(data.product_id);
            console.log(data.users);
            // Notify these users about the bid
            let check = false;
            data.users?.forEach(user => {
                if (user.id === this.id)
                {
                    check = true;
                }
            });

            if (check === true)
            {
                showSnack(`Product id: ${data.product_id} have new bidding`);
            }
        });

        socket.on(BIDDING_ADD_AUTO, (data) => {
            console.log(data.product_id);
            console.log(data.users);
            // Notify these users about the bid
            let check = false;
            data.users?.forEach(user => {
                if (user.id === this.id)
                {
                    check = true;
                }
            });

            if (check === true)
            {
                showSnack(`Product id: ${data.product_id} have new bidding`);
            }
        });
    },
};
</script>

<style>
#nprogess .spinner,
#nprogress .spinner-icon {
    display: none !important;
}
#nprogress .bar {
    background: #007bff;
    height: 8px;
}
</style>
