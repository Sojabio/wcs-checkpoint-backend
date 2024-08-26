import { Continent } from "../entities/continent";
import { Country } from "../entities/country";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    entities: [Country, Continent],
  });