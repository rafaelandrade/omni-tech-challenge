
const transformEnvToObj = (envName: string) => {
    console.log('envName -> ', envName)
    return JSON.parse(process.env[envName]);
}

const buildMongoDbUrl = (mongoCredentials: any) => {
    return `mongodb://${mongoCredentials.host}`;
};

export default () => {
    const mongoCredentials = transformEnvToObj('MONGO_CREDENTIALS')
    const auth = transformEnvToObj('AUTH')

    console.log('test -> ', mongoCredentials)

    return {
        nodeEnv: process.env.NODE_ENV,
        auth: {
            jwtPrivateKey: auth.jwtPrivateKey,
            salt: auth.salt
        },
        mongoDb: {
            database: mongoCredentials.database,
            url: buildMongoDbUrl(mongoCredentials),
            clusterName: mongoCredentials.clusterName,
        }
    }
}