import { APIParams, APIResponse } from '@/models/http'
import ServiceInterface from '@/models/service'
import http from './http'

const alunoService: ServiceInterface = {
    getList: async (params?: APIParams) => {
        return http.getList('aluno', params)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    getById(id) {
        return http.getById('aluno', id)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    getByField(field: string, value: any) {
        return http.getByField('aluno', field, value)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    deleteByID(id) {
        return http.deleteByID('aluno', id)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    editByID(id, payload) {
        return http.editByID('aluno', id, payload)
            .then(async resp => {
                let response = resp || {} as APIResponse
                return response
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
}

export default alunoService;