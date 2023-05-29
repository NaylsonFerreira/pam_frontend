function capitalize(str: string): string {
    return str[0].toUpperCase() + str.slice(1);

}
function handleValues(data: any, source = 'nome', join = true) {
    if (['string', 'number'].includes(typeof data)) {
        return data
    }
    if (typeof data == 'boolean') {
        return data ? 'Sim' : 'Não'
    }
    if (!data) {
        return '--'
    }
    if (typeof data == 'object') {
        if (data[source]) {
            return data[source]
        }
    }
    const output = data.map((x: any) => handleValues(x, source, join))
    return join ? output.join(', ') : output
}

export {
    capitalize,
    handleValues
}