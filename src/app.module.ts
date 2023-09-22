import { Module } from "@nestjs/common";

import { SequelizeModule } from "@nestjs/sequelize";
import { CandidateModule } from './сandidate/сandidate.module';
import { ConfigModule } from "@nestjs/config";
import { Candidate } from "./сandidate/сandidate.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path'

@Module({
    controllers: [],
    providers: [],
    imports: [
       ConfigModule.forRoot({
        envFilePath: `.env`
       
       }), 
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: String(process.env.POSTGRES_HOST),
            port: Number(process.env.POSTGRES_PORT) ,
            username: String(process.env.POSTGRES_USER),
            password: String(process.env.POSTGRES_PASSWORD),
            database: String(process.env.POSTGRES_DB),
            models: [Candidate],
            autoLoadModels: true
          }),
          CandidateModule,
          FilesModule,
          ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname ,'static'),
          })
    ]
})
export class AppModule {}