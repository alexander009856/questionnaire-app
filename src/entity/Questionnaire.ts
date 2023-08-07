import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Questionnaire {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('text', { array: true, default: [] })
    answers: string[];
}