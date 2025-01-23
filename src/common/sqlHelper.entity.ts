import * as mysql from 'mysql';

export class SqlHelper {

    static async connect(host, user, password, port, database) {
        const result: any = await new Promise((resolve, reject) => {
            const con = mysql.createConnection({
                host,
                user,
                password,
                port,
                database
            });
            con.connect(((err) => {
                console.log('connected');
                resolve({con, err});
            }).bind(this));
        });

        if (result.err) {
            return null;
        }

        return result.con;
    }

    static async run(con, sql, output: any = {}) {
        return new Promise( ( resolve, reject ) => {
            con.query(sql, [], (err, response) => {
                if ( err ) {
                    console.log(err);
                    return reject( err );
                }
                resolve(response);
            })
        }).then(response => {
            output.response = response;
            return response;
        }).catch(err => {
            throw err;
        });
    }
}
