import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
  } from "typeorm";
import { Country } from "./country";
 
 @ObjectType()
  @Entity()
  export class Continent extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;
  
    @Field()
    @Column()
    name: string;
    
    @Field(() => [Country])
    @OneToMany(() => Country, (country) => country.continent, { nullable: true, eager: true })
    countries: Country[];
}