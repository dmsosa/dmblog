import axios from "axios";

export async function getUser({ headers } : { headers: object }) {

    try {
        const { data } = await axios({url: "http://localhost:7099/api/auth/login", headers});
        return data.loggedUser;
    } catch (error) {

    }
}

