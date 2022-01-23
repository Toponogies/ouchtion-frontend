export default {
    suggestedBidPrice(state) {
        return state.bid.highestPrice + state.bid.priceIncrement;
    },
};
