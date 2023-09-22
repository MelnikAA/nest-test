import { Controller, Post, Body, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { CandidateService } from './сandidate.service';
import { ApiConflictResponse, ApiOperation } from '@nestjs/swagger';
import { Candidate } from './сandidate.model';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('candidate')
export class CandidateController {

    constructor(private candidateService: CandidateService) {}
    
    @ApiOperation({summary: 'Созданиe кандидата'})
    @ApiConflictResponse({status: 200, type: [Candidate]})
    @Post()
    @UseInterceptors(FileInterceptor('resume'))
    create(@Body() candidateDto: CreateCandidateDto,
           @UploadedFile() resume) {
        return this.candidateService.createCandidate(candidateDto, resume);
    }
    @ApiOperation({summary: 'Получение всех кандидатов'})
    @ApiConflictResponse({status: 200, type: [Candidate]})
    @Get()
    getAll() {
        return this.candidateService.getAllCandidate();
    }
}
