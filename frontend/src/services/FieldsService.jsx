import http from "./http"

const AuthService = {
    getFields() {
        return http().get("/api/fields")
    },
}
export default AuthService