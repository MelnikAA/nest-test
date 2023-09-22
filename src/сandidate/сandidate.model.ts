
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface CandidateCreationAttributes {
    surname: string;
    name: string;
    patronymic: string;
    dateOfBirth: Date;
    placeOfBirth: string;
    resume: string;
    direction: 'frontend' | 'backend';
    favoriteSSR: string;
    favoriteStateManager: string;
    favoriteMarkupFramework: string;
    backendFrameworks: string[];
    backendDB: string[];
    frontendFrameworks: string[];
}

@Table({tableName:'сandidate'})
export class Candidate extends Model<Candidate, CandidateCreationAttributes> {

    @ApiProperty({example: '1', description:'Уникальный индетификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Иванов', description:'Фамилия'})
    @Column({type: DataType.STRING, allowNull: false})
    surname: string;

    @ApiProperty({example: 'Иван', description:'Имя'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'Иванович', description:'Отчество'})
    @Column({type: DataType.STRING, allowNull: false})
    patronymic: string;
    
    @ApiProperty({example: '07.10.2000', description:'Дата рождения'})
    @Column({type: DataType.DATE, allowNull: false})
    dateOfBirth: Date;
    
    @ApiProperty({example: 'р.п. Мухен', description:'Место рождения'})
    @Column({type: DataType.STRING, allowNull: false})
    placeOfBirth: string;

    @ApiProperty({example: '', description:'Резюме'})
    @Column({type: DataType.STRING})
    resume: string;

    @ApiProperty({example: 'backend', description:'Направление'})
    @Column({type: DataType.STRING, allowNull: false})
    direction: 'frontend' | 'backend';

    @Column({type: DataType.STRING})
    favoriteSSR: string;

    @Column({type: DataType.STRING})
    favoriteStateManager: string;

    @Column({type: DataType.STRING})
    favoriteMarkupFramework: string;

    @Column({ type: DataType.ARRAY(DataType.STRING)})
    backendFrameworks: string[];

    @Column({ type: DataType.ARRAY(DataType.STRING)})
    backendDB: string[];

    @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [],})
    frontendFrameworks: string[];
        

}