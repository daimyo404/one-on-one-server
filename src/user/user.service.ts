import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql';
import { Connection } from 'mysql';
import * as dotenv from 'dotenv';
import { Users, Config } from './user.interface';

dotenv.config();

const config: Config = {
  host: process.env.HOST_NAME,
  user: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_USER_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 3306,
  //   ssl: {
  //     ca: fs.readFileSync('./BaltimoreCyberTrustRoot.crt.pem'),
  //   },
};

@Injectable()
export class UserService {
  async getUser(): Promise<Users> {
    const conn: Connection = mysql.createConnection(config);

    const fetchUsers = () => {
      return new Promise((resolve, reject) => {
        conn.connect((err) => {
          if (err) reject(err);
          conn.query('SELECT * FROM users', (err, results) => {
            if (err) reject(err);
            resolve(results);
          });
          conn.end((err) => {
            if (err) reject(err);
          });
        });
      });
    };

    //NOTE: [RowDataPacket {key: value}]の形式で返却
    //TODO: any修正
    const usersAddRowDataPacket: any = await fetchUsers().catch((err) => {
      throw err;
    });

    const users: Users = usersAddRowDataPacket.map((data) => {
      //NOTE: RowDataPacket {key: value}から
      //　　　 {key: value}を取得するため、stringify→parseを行う
      const convertedJson = JSON.stringify(data);
      const convertedObject = JSON.parse(convertedJson);
      return convertedObject;
    });

    return users;
  }
}
