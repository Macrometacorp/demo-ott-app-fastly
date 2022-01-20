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

    return JSON.parse(data)
}

const getEnvDictionary = () => {
    if (!envDictionary) {
        envDictionary = new Dictionary("env")
    }

    return envDictionary
}

export const getEnv = (key) => {
    const envDictionary = getEnvDictionary()
    return envDictionary.get(key)
}
