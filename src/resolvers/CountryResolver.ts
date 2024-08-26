import { Resolver, Query, InputType, Field, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/country";
import { Like } from "typeorm";

@InputType()
class NewCountryInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;

  @Field()
  continent: string;
}

@Resolver(Country)
class CountryResolver {
    @Query(() => [Country])
    async getAllCountries() {
        const article = await Country.find();
        return article;
    }

    @Query(() => Country)
    async getCountryByCode(@Arg("countryCode") countryCode: string) {
      try {
      const country = await Country.findOneByOrFail({ code: countryCode });
      return country} 
      catch (err) 
      {
        console.log(err)
        return "error"
      }
    }

    @Query(() => [Country])
    async getCountriesByContinent(@Arg("continent") continent: string) {
      const countries = await Country.find({
        where: [{ continent: Like(`${continent}`) }],
      });
      return countries;
    }
    

    @Mutation(() => Country)
    async createNewCountry(@Arg("data") newCountryData: NewCountryInput) {
        const resultFromSave = await Country.save({
        ...newCountryData,
      })
        return resultFromSave;
    }



}

export default CountryResolver;
