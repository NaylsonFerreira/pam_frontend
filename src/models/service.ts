import { APIParams, APIResponse } from './http';

export default interface ServiceInterface {
    getList: (params?: APIParams) => Promise<APIResponse>,
    getById: (id: string) => Promise<any>,
    getByField: (field: string, value: any) => Promise<any>,
    deleteByID: (id: string) => Promise<any>,
    editByID: (id: string, payload: any) => Promise<any>,
}