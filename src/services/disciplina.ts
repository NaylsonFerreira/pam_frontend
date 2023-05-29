import { APIParams, APIResponse } from '@/models/http'
import ServiceInterface from '@/models/service'
import http from './http'

const disciplinaService: ServiceInterface = {
    getList: async (params?: APIParams) => {
        return http.getList('disciplina', params)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    getById(id) {
        return http.getById('disciplina', id)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    getByField(field: string, value: any) {
        return http.getByField('disciplina', field, value)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    deleteByID(id) {
        return http.deleteByID('disciplina', id)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    editByID(id, payload) {
        return http.editByID('disciplina', id, payload)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
}

export default disciplinaService;