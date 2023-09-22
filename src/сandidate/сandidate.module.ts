import { Module } from '@nestjs/common';
import { CandidateController } from './сandidate.controller';
import { CandidateService } from './сandidate.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Candidate } from './сandidate.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [CandidateController],
  providers: [CandidateService],
  imports: [
    SequelizeModule.forFeature([Candidate]),
    FilesModule,
    
  ]
})
export class CandidateModule {}
