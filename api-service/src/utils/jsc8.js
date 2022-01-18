const jsC8 = require("jsc8")

let jsc8Client

const initClient = () => {
    jsc8Client = new jsC8({
        url: "https://gdn.paas.macrometa.io/",
        apiKey: "XXXXXX",
        agent: fetch,
        agentOptions: {
            backend: "gdn_url",
            cacheOverride: new CacheOverride("override", { ttl: 0 }),
        },
    })
}

export const getJsc8Client = () => {
    if (!jsc8Client) {
        initClient()
    }
    return jsc8Client
}

export const executeRestQl = async (restql, params) => {
    const jsc8Client = getJsc8Client()
    return await jsc8Client.executeRestql(restql, params)
}

export const executeQuery = async (searchQuery, bindVars) => {
    const jsc8Client = getJsc8Client()
    return await jsc8Client.executeQuery({ query: searchQuery, bindVars })
}
