import { APIParams, APIResponse } from '@/models/http'
import ServiceInterface from '@/models/service'
import http from './http'

const cursoService: ServiceInterface = {
    getList: async (params?: APIParams) => {
        return http.getList('curso', params)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    getById(id) {
        return http.getById('curso', id)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    getByField(field: string, value: any) {
        return http.getByField('curso', field, value)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    deleteByID(id) {
        return http.deleteByID('curso', id)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    editByID(id, payload) {
        return http.editByID('curso', id, payload)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
}

export default cursoService;