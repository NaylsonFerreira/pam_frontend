import http from './http'

const authService = {
    login(payload: any) {
        return http.post('login', payload)
            .then(resp => resp)
            .catch(err => {
                return Promise.reject(err)
            })
    },
}

export default authService;