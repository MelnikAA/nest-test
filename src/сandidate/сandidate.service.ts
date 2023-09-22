import { Injectable } from '@nestjs/common';
import { Candidate } from './сandidate.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import * as TelegramBot from 'node-telegram-bot-api';
import { FilesService } from 'src/files/files.service';
import * as fs from 'fs';

const bot = new TelegramBot('6413385319:AAEqPot5BoSPChfKqMdjJw6NRuGVjxluSjA', { polling: true });

@Injectable()
export class CandidateService {

    constructor(@InjectModel(Candidate) private candidateRepository: typeof Candidate,
    private filesService: FilesService) {

    }

    async createCandidate(dto: CreateCandidateDto, resume: any) {
        const backendFrameworksArray = Array.isArray(dto.backendFrameworks) ? dto.backendFrameworks : [dto.backendFrameworks];

const backendDBArray = Array.isArray(dto.backendDB) ? dto.backendDB : [dto.backendDB];

const frontendFrameworksArray = Array.isArray(dto.frontendFrameworks) ? dto.frontendFrameworks : [dto.frontendFrameworks];
        const fileData = await this.filesService.createFile(resume);
        const fileName = fileData.fileName;
        const path = fileData.filePath;
        const resumePath = `${path}/${fileName}`
        const candidate = await this.candidateRepository.create({
            ...dto, 
            resume: fileName,
            backendFrameworks: backendFrameworksArray,
            backendDB: backendDBArray,
            frontendFrameworks: frontendFrameworksArray,
            });
        const chatId = '358074354'; 
        
        const birthDateString = candidate.dateOfBirth;
        const birthDate = new Date(birthDateString);
        const correctedBirthDate = new Date(birthDate.getTime() + (11 * 60 * 60 * 1000)); 
        const formattedBirthDate = correctedBirthDate.toISOString().substr(0, 10);
        
        const commonMessage = `Новый кандидат: 
    <b>${candidate.name} ${candidate.surname} ${candidate.patronymic}</b>
    <u>Информация о кандидате:</u>
    <i>Направление:</i> ${candidate.direction}
    <i>Дата рождения:</i> <b>${formattedBirthDate}</b>
    <i>Место рождения:</i> <b>${candidate.placeOfBirth}</b>
    <i>Комментарий:</i> <b>${candidate.comment}</b>`;

let message;

if (candidate.direction === 'frontend') {
    message = `${commonMessage}
    <u>Технические навыки:</u>
    <code>Стек:</code> ${candidate.frontendFrameworks},${candidate.favoriteSSR}, ${candidate.favoriteMarkupFramework}, ${candidate.favoriteStateManager}`;
} else {
    message = `${commonMessage}
    <u>Технические навыки:</u>
    <b>Стек:</b> ${candidate.backendFrameworks},${candidate.backendDB}`;
}


   
    
    const newFileName = `Резюме ${candidate.name} ${candidate.surname}`
   
   bot.sendMessage(chatId,  message, { parse_mode: 'HTML' }, {document: resumePath })
   
    .then((response) => {
        console.log('Ответ от сервера Telegram:', response.data);
        console.log('Сообщение успешно отправлено');
      })
      .catch((error) => {
        console.error('Ошибка при отправке сообщения:', error);
      });
      
      bot.sendDocument(chatId, resumePath, {
        caption: `Резюме кандидата ${candidate.name} ${candidate.surname}`,
        filename: newFileName
      })
      .then(() => {
        console.log('Документ успешно отправлен');
      })
      .catch((error) => {
        console.error('Ошибка при отправке документа:', error);
      });

        return candidate;
    }

    
    async getAllCandidate() {
        const candidates = await this.candidateRepository.findAll();
        return candidates;
    }
}
