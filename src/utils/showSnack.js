// This is overkill but acceptable
import store from "@/store";

export const showSnack = (message) => {
    // output to console for debugging
    console.log(message);

    // show as snackbar on UI
    store.dispatch("SnackbarModule/showSnackbar", {
        text: message,
    });
};
