import { Resolver, Query, InputType, Field, Mutation, Arg, ID } from "type-graphql";
import { Country } from "../entities/country";
import { Continent } from "../entities/continent";

@InputType()
class NewCountryInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;

  @Field(() => ID, { nullable: true })
  continentId?: number;
}

@Resolver(Country)
class CountryResolver {
    @Query(() => [Country])
    async getAllCountries() {
        const country = await Country.find({ relations: { continent: true }});
        return country;
    }

    @Query(() => Country, { nullable: true }) 
    async getCountryByCode(@Arg("countryCode") countryCode: string) {
        try {
            const country = await Country.findOne({
                where: { code: countryCode },
                relations: ["continent"],
            })

            if (!country) {
                console.log(`no country with this country code`);
                return null
            }
            return country
        } catch (error) {
            console.error( error);
            throw new Error("Failed to fetch country");
        }
    }

    @Query(() => [Country])
      async getCountriesByContinent(@Arg("continentId") continentId: number){
      const countries = await Country.find({
      where: { continent: { id: continentId } },
      relations: { continent: true }
    })

    return countries
  }

  @Mutation(() => Country)
  async createNewCountry(@Arg("data") newCountryData: NewCountryInput) {
      let continent: Continent | null = null
      if (newCountryData.continentId) {
          continent = await Continent.findOne({
              where: { id: Number(newCountryData.continentId) }
          });
          if (!continent) {
              throw new Error(`continent not found`);
          }
      }
      const newCountry = Country.create({
          ...newCountryData,
          continent : continent 
      });

      await newCountry.save();
      return newCountry;
  }

}

export default CountryResolver;
