/**
 * Smoothly scroll to top of page (div#top in App.vue)
 * This function is meant to be called inside methods in component;
 * in most case just pass `this` as `vmInstance`.
 */
export const scrollToTop = (vmInstance) => {
    vmInstance.$vuetify.goTo("#top", {
        duration: 500,
        easing: "easeOutQuint",
    });
};
