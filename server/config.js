import dotenv from 'dotenv'

dotenv.config()

function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue
    if (value === null) {
        throw new Error(`❌ Key ${key} is undefined`)
    }
    return value
}

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresIn: required('JWT_EXPIRES', '2d')
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
    },
    host: {
        port: required('HOST_PORT', 8080)
    }
}