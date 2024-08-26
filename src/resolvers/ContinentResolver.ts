import { Resolver, Query } from "type-graphql";
import { Continent } from "../entities/continent";

const continentsData = [
    { name: "Afrique" },
    { name: "Asie" },
    { name: "Europe" },
    { name: "Amérique" },
    { name: "Australie" },
  ];

  
@Resolver()
export class ContinentResolver {

  @Query(() => [Continent])
  async getAllContinents() {
    const existingContinents = await Continent.find()
        if (existingContinents.length === 0) {
         await Continent.insert(continentsData)
    }
        return Continent.find()
  }
}

