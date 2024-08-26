import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
  } from "typeorm";
import { Continent } from "./continent";
 
 @ObjectType()
  @Entity()
  export class Country extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;
  
    @Field()
    @Column()
    code: string;
  
    @Field()
    @Column()
    name: string;
  
    @Field()
    @Column()
    emoji: string;

    @Field(() => Continent, { nullable: true }) 
    @ManyToOne(() => Continent, (continent) => continent.countries, { nullable: true})
    continent: Continent | null;
}