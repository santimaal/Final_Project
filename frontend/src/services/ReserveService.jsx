import http from "./http"

const ReservesService = {
    getReserves() {
        return http().get("/api/reserves")
    },
    getReservesByField(id, date) {
        return http().get(`/api/reserves/${id}`, { "date": date })
    },
    createReserve(date) {
        return http().post(`/api/ureserves`, date)
    }
}
export default ReservesService