/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import * as mysql2 from 'mysql2/promise';

@Module({})
export class DatabaseModule {
  static pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '4332wurx',
    database: 'hanpoom_database',
  });

  static async getConnection() {
    return this.pool.getConnection();
  }
}