import { getJsc8Client } from "../utils/jsc8"
const crypto = require("crypto")

export const signin = async (body, response) => {
    try {
        const jsc8Client = getJsc8Client()

        const { email, password } = body
        const passwordHash = await crypto.createHash("sha256").update(password, "utf-8").digest("hex")

        const restQlResponse = await jsc8Client.executeRestql("signIn", {
            email,
            passwordHash,
        })

        if (restQlResponse && !restQlResponse.result.length) {
            throw new Error()
        }

        response.body = JSON.stringify(restQlResponse.result)
    } catch (error) {
        response.status = 404
        response.body = "User does not exist"
    }
    return response
}
