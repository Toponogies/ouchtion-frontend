import { find } from "lodash-es";

export default {
    suggestedBidPrice(state) {
        return state.bid.highestPrice + state.bid.priceIncrement;
    },
    primaryDescription(state) {
        return find(state.descriptions, { isInit: true });
    },
    appendices(state) {
        return state.descriptions.filter((each) => each.isInit !== 1);
    },
};
