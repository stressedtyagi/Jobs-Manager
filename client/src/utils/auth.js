import axios from "axios";

const auth = {
    get: async (url, params) => {
        const token = params?.token;
        return await axios.get(url, {
            headers: {
                Authorization: token,
            },
        });
    },
};

export default auth;
