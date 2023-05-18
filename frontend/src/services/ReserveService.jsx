import http from "./http"

const ReservesService = {
    getReserves() {
        return http().get("/api/areserves")
    },
    updateReserve(data) {
        return http().put(`/api/areserves`, data)
    },
    getReservesByField(id, date) {
        return http().post(`/api/reserves/${id}`, { "day": date })
    },
    createReserve(date) {
        return http().post(`/api/ureserves`, date)
    },
    getReservesByUser() {
        return http().get(`/api/ureserves`)
    }
}
export default ReservesService