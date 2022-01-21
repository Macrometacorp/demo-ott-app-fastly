let envDictionary

export const getBodyParameters = async (body) => {
    const reader = body.getReader()
    const decoder = new TextDecoder()
    let data = ""

    while (true) {
        const { done, value } = await reader.read()
        const chunkStr = decoder.decode(value)
        data += chunkStr

        if (done) {
            break
        }
    }

    return !!data ? JSON.parse(data) : {}
}

export const parseRequest = async (event) => {
    const headers = event.request.headers
    const method = event.request.method
    const url = new URL(event.request.url)
    const queryParams = url.searchParams
    const pathname = url.pathname
    const body = await getBodyParameters(event.request.body)
    const ip = event.client.address || "127.0.0.1"
    const geo = { country_name: "abcd" }

    return {
        url,
        queryParams,
        headers,
        method,
        ip,
        geo,
        body,
        pathname,
    }
}
