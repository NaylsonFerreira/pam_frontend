import { APIParams, APIResponse } from '@/models/http'
import ServiceInterface from '@/models/service'
import http from './http'

const turmaService: ServiceInterface = {
    getList: async (params?: APIParams) => {
        return http.getList('turma', params)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    getById(id) {
        return http.getById('turma', id)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    getByField(field: string, value: any) {
        return http.getByField('turma', field, value)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    deleteByID(id) {
        return http.deleteByID('turma', id)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    editByID(id, payload) {
        return http.editByID('turma', id, payload)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
}

export default turmaService;