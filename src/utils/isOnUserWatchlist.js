import store from "@/store/index";

export const isOnUserWatchlist = async (id) => {
    const targetId = parseInt(id);

    // if the user watchlist is empty, dispatch an action to refresh it
    if (store.state["BidderWatchlistModule"].items.length === 0) {
        console.log(`Watchlist stale, refreshing`);
        await store.dispatch("BidderWatchlistModule/getItems");
    }

    const existingIds = store.state["BidderWatchlistModule"].items.map((each) => each.id);
    console.log(existingIds);

    return existingIds.indexOf(targetId) !== -1;
};
