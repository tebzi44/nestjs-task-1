import { Column, Entity, IsNull, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Actor } from "./actor.entity";
import { Director } from "./director.entity";
import { Genre } from "./genre.entity";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({
        type: 'date',
    })
    release_date: Date

    @Column()
    runtime: number

    @Column({ nullable: true })
    posterURL: string

    @ManyToMany(() => Genre, (genre) => genre.movie)
    @JoinTable()
    genre: Genre[];

    @ManyToMany(() => Actor, (actor) => actor.movie)
    @JoinTable()
    actor: Actor[];

    @ManyToMany(() => Director, (director) => director.movie )
    @JoinTable()
    director: Director[];
}