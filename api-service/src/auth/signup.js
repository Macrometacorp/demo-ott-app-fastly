import { getBodyParameters } from "../utils/helper"
import { getJsc8Client } from "../utils/jsc8"

const jsC8 = require("jsc8")
const crypto = require("crypto")
const { v4: uuid } = require("uuid")

export const signup = async (body, response) => {
    try {
        const jsc8Client = getJsc8Client()

        const { email, password, displayName: name } = body
        const passwordHash = await crypto.createHash("sha256").update(password, "utf-8").digest("hex")
        const customerId = uuid()

        const restQlResponse = await jsc8Client.executeRestql("signUp", {
            email,
            passwordHash,
            customerId,
            name,
        })

        response.body = JSON.stringify(restQlResponse.result)
    } catch (error) {
        response.status = 400
        response.body = "User already exists"
    }
    return response
}
