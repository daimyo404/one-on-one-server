import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class UserService {
  getUser(): void {
    const config = {
      host: process.env.HOST_NAME,
      user: process.env.DATABASE_USER_NAME,
      password: process.env.DATABASE_USER_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: 3306,
      //   ssl: {
      //     ca: fs.readFileSync('./BaltimoreCyberTrustRoot.crt.pem'),
      //   },
    };

    const conn = mysql.createConnection(config);

    conn.connect((err) => {
      if (err) {
        console.log('!!! Cannot connect !!! Error:');
        throw err;
      } else {
        console.log('Connection established.');
        readData();
      }
    });

    const readData = () => {
      conn.query('SELECT * FROM users', (err, results, fields) => {
        if (err) throw err;
        else console.log('Selected ' + results.length + ' row(s).');
        for (let i = 0; i < results.length; i++) {
          console.log('Row: ' + JSON.stringify(results[i]));
        }
        console.log('Done.');
      });
      conn.end(function (err) {
        if (err) throw err;
        else console.log('Closing connection.');
      });
    };
  }
}
