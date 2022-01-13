import { find } from "core-js/core/array";

export default {
    primaryDescription(state) {
        return find(state.descriptions, { isInit: true });
    },
    appendices(state) {
        return state.descriptions.filter((each) => each.isInit !== 1);
    },
};
