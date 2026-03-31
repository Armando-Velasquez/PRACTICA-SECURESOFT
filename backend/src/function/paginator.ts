


export function paginate(page: number, limit: number, search: string) {

    // Validar con expresion regular (page)
    const pageRegex = /^[1-9]\d*$/;
    if (!pageRegex.test(page.toString())) {
        page = 1;
    }

    // Validar con expresion regular (limit)
    const limitRegex = /^[1-9]\d*$/;
    if (!limitRegex.test(limit.toString())) {
        limit = 10;
    }

    // Validar con expresion regular (search)
    const searchStr = search.trim();

    return {
        page,
        limit,
        search: searchStr
    }

}