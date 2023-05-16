import axios from "axios"
import JWTService from "./JWTService";
import secret from "./secret";

export default function http() {
    let api
    const token = JWTService.getToken() || localStorage.getItem('rftoken');
    api = axios.create({
        baseURL: secret.DJANGO_APP_URL,
        headers: {
            "Content-type": "application/json",
            "Authorization": token ? `Bearer ${token}` : undefined
        }
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 403 &&
                error.response.data.detail != 'Authentication credentials were not provided.' &&
                error.response.data.detail != 'You are not staff') {
                if (!localStorage.getItem('token')) {
                    JWTService.destroyAllTokens();
                }
                JWTService.destroyToken();
                window.location.reload();
            }
            return Promise.reject(error);
        }
    );

    return api

}