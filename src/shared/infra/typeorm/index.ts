import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// interface IOptions {
//     host: string;
// }

// getConnectionOptions().then(options => {
//     const newOptions = options as IOptions;
//     newOptions.host = 'database';
//     createConnection({
//         ...options,
//     });
// });

export default async (host = "database") : Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    console.log('meu host', host)

    return createConnection(
        Object.assign(defaultOptions, {
            host: process.env.NODE_ENV === "test" ? "localhost" : host,
            database: process.env.NODE_ENV === "test" ? "db_teste" : defaultOptions.database,
        })
    )
}