import countries from "world-countries";

const formmatedContries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    latlng: country.latlng,
    region: country.region,
    flag: country.flag
}))

const useCountries = () => {
    const getAllCountries = () => formmatedContries;

    const getSingleCountry = (value: string) => {
        return formmatedContries.find((item) => item.value === value)
    }

    return {
        getAllCountries,
        getSingleCountry
    }
}

export default useCountries