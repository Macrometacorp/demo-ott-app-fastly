import { getBodyParameters } from "../utils/helper"
import { getJsc8Client } from "../utils/jsc8"

const jsC8 = require("jsc8")
const crypto = require("crypto")
const { v4: uuid } = require("uuid")

export const signup = async (request) => {
    const headers = new Headers()

    try {
        const jsc8Client = getJsc8Client()

        const bodyData = await getBodyParameters(request.body)

        const { email, password, displayName: name } = bodyData

        const passwordHash = await crypto.createHash("sha256").update(password, "utf-8").digest("hex")

        const customerId = uuid()

        const restQlResponse = await jsc8Client.executeRestql("signUp", {
            email,
            passwordHash,
            customerId,
            name,
        })

        headers.set("Content-Type", "application/json")

        return new Response(JSON.stringify(restQlResponse.result), {
            status: 200,
            headers,
            url: request.url,
        })
    } catch (error) {
        headers.set("Content-Type", "text/plain")
        return new Response("User already exists", {
            status: 400,
            headers,
            url: request.url,
        })
    }
}
