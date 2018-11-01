module.exports = {
    // TODO: important! modify this secret in production
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'NYiRpZkTjIhkvx2LdAw1HonLrPVQVH67ozeOi03SCGSmmZFV8bD15Mbnu8uakpEp',
    SERVER_PORT: process.env.SERVER_PORT || 8081,
    DB_USERNAME: process.env.DB_USERNAME || 'username',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password'
}