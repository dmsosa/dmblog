import axios from "axios";

export async function loginUser({ login, password } : { login: string, password: string }) {
    const url = "http://localhost:9000/api/auth/login";
    try {
        const { data } = await axios.post(url, {login: login, password: password});

        const headers = { "Authorization" : "Bearer "+data.token};
        const loggedIn = { headers: headers, isAuth: true, loggedUser: data.loggedUser }
        localStorage.setItem("loggedUser", JSON.stringify(loggedIn));
        document.write("<h1>GENAU!</h1>");
        return data.loggedUser;
    } catch (error) {
        console.log("CORS")
    }
}