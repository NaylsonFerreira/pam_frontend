import { APIFilter, APIParams } from '@/models/http';


const baseUrl = `${process.env.NEXT_PUBLIC_API_HOST}`

function buildFilters(filters: APIFilter[]) {
    return filters?.map(({ field, condition, value }) => {
        return `${field}${condition}${value}`
    }).join('&')
}

function buildParams(params: APIParams): string {
    const _params = {
        page: params?.page || 1,
        perPage: params?.perPage || 40,
        order: `${params?.order}` == 'desc' ? '-' : '',
        orderBy: params?.orderBy || '',
        filter: params?.filter || []
    };

    const offset = (_params.page - 1) * _params.perPage
    let pagination = `page=${_params.page}&limit=${_params.perPage}&offset=${offset}&`;
    let order = _params.orderBy ? `ordering=${_params.order}${_params.orderBy}&` : '';
    let filter = buildFilters(_params.filter);
    return `${pagination}${order}${filter || ''}`;
}

async function httpClient(
    resource = '',
    method = 'GET',
    params = {},
    body = undefined
) {
    let token: string = await localStorage.getItem('token') || ''
    const headers: any = { 'Content-Type': 'application/json;charset=UTF-8' }

    let query = ''
    if (method == 'GET' && params) {
        query = `?${buildParams(params)}`
    }

    if (token) {
        headers['Authorization'] = token
    }
    const url = `${baseUrl}/${resource}/${query}`;

    try {
        const response = await fetch(url, {
            method, headers: headers,
            body: body ? JSON.stringify(body) : undefined
        })
        if (response.status == 403) {
            return Promise.reject({ 'level': 'ERROR', 'message': 'Error 403' })
        }
        const resp = await response.json()
        return Promise.resolve(resp)
    } catch (error) {
        return Promise.reject({ 'level': 'ERROR', 'message': 'Error 500' })
    }

}

export const http = {
    getList(resource: string, params?: APIParams) {
        return httpClient(`${resource}`, 'GET', params, undefined)
    },
    getById(resource: string, id: string) {
        if (id == '') {
            return Promise.reject('missing id parameter')
        }
        return httpClient(`${resource}/${id}`, 'GET', undefined)
    },
    getByField(resource: string, field: string, value: any) {
        const params: APIParams = {
            filter: [{
                field: field,
                condition: '=',
                value: value
            }]
        }
        return httpClient(`${resource}`, 'GET', params, undefined)
    },
    deleteByID(resource: string, id: string) {
        if (id == '') {
            return Promise.reject('missing id parameter')
        }
        return httpClient(`${resource}/${id}`, 'DELETE', undefined)
    },
    editByID(resource: string, id: string, payload: any) {
        if (id == '') {
            return Promise.reject('missing id parameter')
        }
        return httpClient(`${resource}/${id}`, 'PUT', undefined, payload)
    },
    post(resource: string, payload: any) {
        return httpClient(`${resource}`, 'POST', undefined, payload)
    },
}

export default http