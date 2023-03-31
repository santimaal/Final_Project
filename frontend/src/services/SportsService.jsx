import http from "./http"

const AuthService = {
    getSports() {
        return http().get("/api/sports")
    },
}
export default AuthService