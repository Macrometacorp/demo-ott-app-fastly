import jsC8 from "jsc8"

const jsc8Client = new jsC8({
    url: process.env.REACT_APP_GDN_URL,
    apiKey: process.env.REACT_APP_API_KEY,
})

export default jsc8Client
