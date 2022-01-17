import { showSnack } from "@/utils/showSnack";

export default {
    fetchOngoing({ commit }) {
        commit("setOngoingBidsLoadingState", true);
        const data = [
            {
                primaryImage: "https://picsum.photos/200",
                id: "1",
                name: "Product name",
                endTime: "2022-01-04T12:34:56.789Z",
                highestBidPrice: 1699000,
            },
        ];
        setTimeout(() => {
            commit("setOngoingBidsItems", data);
            commit("setOngoingBidsLoadingState", false);
        }, 500);
    },

    fetchCompleted({ commit }) {
        commit("setCompletedBidsLoadingState", true);
        const data = [
            {
                primaryImage: "https://picsum.photos/200?random=1",
                id: "1",
                name: "Product name",
                highestBidPrice: 1699000,

                // seller -> bidder, read-only
                reviewToBidder: {
                    rating: null,
                    comment: null,
                },

                // bidder -> seller, can only write once
                reviewToSeller: {
                    rating: null,
                    comment: null,
                },
            },
            {
                primaryImage: "https://picsum.photos/200?random=2",
                id: "2",
                name: "Product name",
                highestBidPrice: 1699000,

                // seller -> bidder, read-only
                reviewToBidder: {
                    rating: null,
                    comment: null,
                },

                // bidder -> seller, can only write once
                reviewToSeller: {
                    rating: null,
                    comment: null,
                },
            },
        ];
        setTimeout(() => {
            commit("setCompletedBidsItems", data);
            commit("setCompletedBidsLoadingState", false);
        }, 500);
    },

    leaveReviewCompleted({ commit }, { id, rating, comment }) {
        commit("setCompletedBidsLoadingState", true);
        setTimeout(() => {
            commit("setCompletedBidReview", { id, rating, comment });
            commit("setCompletedBidsLoadingState", false);
            showSnack(`Review submitted for bid id: ${id}`);
        }, 250);
    },
};
