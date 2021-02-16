import axios from 'axios';
let apiEndpoint = process.env.REACT_APP_API_URL;

export default function login(data) {
    let {email, password} = data;
    return  axios.post(`${apiEndpoint}/auth/signin`, { email, password });
}

export function register(data) {
    let {name, email, password} = data;
    return  axios.post(`${apiEndpoint}/auth/signup`, { name, email, password });
}

export function createFrom(data) {
    let {name, region, description, latitude, longitude } = data;
    return  axios.post(`${apiEndpoint}/forms`, { name, region, description, latitude, longitude });
}

export function updateForm(id, data) {
    let {name, region, description, latitude, longitude } = data;
    return  axios.put(`${apiEndpoint}/forms/${id}`, { name, region, description, latitude, longitude });
}

export function getForms() {
    return  axios.get(`${apiEndpoint}/forms`);
}

export function getForm(id) {
    return  axios.get(`${apiEndpoint}/forms/${id}`);
}

