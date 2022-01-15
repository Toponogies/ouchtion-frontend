import { find } from "lodash-es";

export default {
    primaryDescription(state) {
        return find(state.descriptions, { isInit: true });
    },
    appendices(state) {
        return state.descriptions.filter((each) => each.isInit !== 1);
    },
};
