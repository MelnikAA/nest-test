import { ApiProperty } from "@nestjs/swagger";

export class CreateCandidateDto {

    @ApiProperty({example: 'Иванов', description:'Фамилия'})
    readonly surname: string;
    @ApiProperty({example: 'Иван', description:'Имя'})
    readonly name: string;
    @ApiProperty({example: 'Иванович', description:'Отчество'})
    readonly patronymic: string;
    @ApiProperty({example: '28.06.2000', description:'Дата рождения'})
    readonly dateOfBirth: Date;
    @ApiProperty({example: 'г. Хабаровск', description:'Место рождение'})
    readonly placeOfBirth: string;
    @ApiProperty({example: 'backend', description:'Направление'})
    readonly direction: 'frontend' | 'backend';
    @ApiProperty({example: 'Next', description:'Любимый SSR-фреймворк'})
    readonly favoriteSSR: string;
    @ApiProperty({example: 'Mobx', description:'Любимый стейт-менеджер'})
    readonly favoriteStateManager: string;
    @ApiProperty({example: 'bootstrap', description:'Любимый фреймворк для разметки'})
    readonly favoriteMarkupFramework: string;
    @ApiProperty({ example: ['Express', 'Node.js'], description: 'Фреймворки бекенд' })
    readonly backendFrameworks: string[]; // Поле с массивом фреймворков
    @ApiProperty({ example: ['Mongo', 'PostgreSQL'], description: 'Базы данных' })
    readonly backendDB: string[]; // Поле с массивом фреймворков
    @ApiProperty({ example: ['React', 'Angular'], description: 'Фреймворки фронтенд' })
    readonly frontendFrameworks: string[]; // Поле с массивом фреймворков

}