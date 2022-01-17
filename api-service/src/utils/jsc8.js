const jsC8 = require("jsc8")

let jsc8Client

const initClient = () => {
    jsc8Client = new jsC8({
        url: "https://gdn.paas.macrometa.io/",
        apiKey: "XXXXXX",
        agent: fetch,
        agentOptions: {
            backend: "gdn_url",
        },
    })
}

export const getJsc8Client = () => {
    if (!jsc8Client) {
        initClient()
    }
    return jsc8Client
}
