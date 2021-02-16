import axios from 'axios';

const setTokenToHeader = () => {
    const token = localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
    }
}

export default setTokenToHeader;