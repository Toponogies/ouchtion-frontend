/* A helper function used in specific views (at beforeCreate):
 * Redirect to Home if current user role is not in the given role list.
 *
 * This also has the side effect of redirecting to Home *regardless* of whether the current user
 * has logged in or not, which can be considered a desirable thing here:
 * we want our users to e.g. access their profile from the dropdown menu,
 * not from the direct URL.
 */
export const redirectToHomeIf = (vmInstance, roleList) => {
    const currentRole = vmInstance.$store.state.CurrentUserModule.role;
    if (roleList.indexOf(currentRole) === -1) {
        vmInstance.$router.push({ name: "Home" });
    }
};
