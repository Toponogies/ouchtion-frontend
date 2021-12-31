<template>
    <div>
        <v-tabs>
            <v-tab @click="setTab();profile=true">My profile </v-tab>
            <v-tab v-if="role === 'seller'" @click="setTab();product=true">My product </v-tab>
            <v-tab v-if="role === 'bidder'" @click="setTab();bidding=true">My bidding </v-tab>
        </v-tabs>
        <div>
            <ProductVue v-if="this.product" />
            <ProfileVue v-if="this.profile"/>
            <BiddingVue v-if="this.bidding"/>
        </div>
    </div>
</template>

<script>
import ProfileVue from "./UserProfile.vue";
import ProductVue from "./UserProduct.vue";
import BiddingVue from "./UserBidding.vue";
export default {
    name: "UserTabs",
    components: { ProductVue,ProfileVue,BiddingVue },
    data() {
        return {
            profile: true,
            product: false,
            bidding: false,
            role: "bidder"
        };
    },
    methods:{
        setTab(){
            this.profile = false;
            this.product = false;
            this.bidding = false;
        }
    }
};
</script>
