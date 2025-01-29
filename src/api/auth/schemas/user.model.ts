import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, Column} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity({ name: 'customers' }) // Table name
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    generateId() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
