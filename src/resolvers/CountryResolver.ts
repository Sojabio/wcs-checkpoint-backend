import { Resolver, Query, InputType, Field, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/country";

@InputType()
class NewCountryInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;
}

@Resolver(Country)
class CountryResolver {
    @Query(() => [Country])
    async getAllCountries() {
        const article = await Country.find();
        return article;
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
