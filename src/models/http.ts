export type APIFilter = {
    field: string,
    condition: string
    value: string
}

export type APIParams = {
    page?: number,
    perPage?: number,
    order?: 'asc' | 'desc',
    orderBy?: string,
    filter?: APIFilter[],
    refresh?: boolean,
    count?: number
}

export type APIRequest = {
    [key: string]: string | number | boolean;
};


export type APIResponse = {
    count?: number,
    next?: string,
    previous?: string,
    results?: []
}

export type httpProps = {
    resource: string,
    method: string,
    params?: APIParams,
    body?: APIRequest,
}