import { getBodyParameters } from "../utils/helper"
import { getJsc8Client } from "../utils/jsc8"
const crypto = require("crypto")

export const signin = async (request) => {
    const headers = new Headers()
    try {
        const jsc8Client = getJsc8Client()

        const bodyData = await getBodyParameters(request.body)

        const { email, password } = bodyData

        const passwordHash = await crypto.createHash("sha256").update(password, "utf-8").digest("hex")

        const restQlResponse = await jsc8Client.executeRestql("signIn", {
            email,
            passwordHash,
        })

        if (restQlResponse && !restQlResponse.result.length) {
            throw new Error()
        }

        headers.set("Content-Type", "application/json")

        return new Response(JSON.stringify(restQlResponse.result), {
            status: 200,
            headers,

            url: request.url,
        })
    } catch (error) {
        headers.set("Content-Type", "text/plain")
        return new Response("User does not exist", {
            status: 404,
            headers,
            url: request.url,
        })
    }
}
