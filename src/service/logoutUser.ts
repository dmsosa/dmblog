
export function logoutUser() {
    localStorage.removeItem("loggedUser");
    return { headers: null, isAuth: false, loggedUser: null };
}