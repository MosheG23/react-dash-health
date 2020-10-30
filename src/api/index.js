import axios from "axios";
import polygonData from "../assets/data/countries.geojson";
import mosheJSON from "../assets/data/hi.json";

export const fetchByCountryData = async () => {
    try {
        const {data} = await axios.get(`https://disease.sh/v3/covid-19/countries`);
        // const countryItems = (data.countryitems[0]);
        // console.log((data));
        return data;
    } catch (error) {
    }
}

export const fetchCountriesList = async () => {
    try {
        const countryListURL = "https://disease.sh/v3/covid-19/countries";
        const { data } = await axios.get(countryListURL);
        const countriesList = data.map((country) => ({
            name: country.country,
            id: country.countryInfo._id,
            flag: country.countryInfo.flag
        }));
        return countriesList;
    } catch (error) {
        
    }
}

export const fetchDataByCountry = async (countryID) => {
    try {
        let dataByCountryURL = "";
        if (countryID === {} || countryID === "Global") {
            dataByCountryURL = `https://disease.sh/v3/covid-19/all`;
        } else {
            dataByCountryURL = `https://disease.sh/v3/covid-19/countries/${countryID}?yesterday=true`
        }
        const data = await axios.get(dataByCountryURL);
        const modifyData = {
            population: data.data.population,
            active: data.data.active,
            activePerOneMillion: data.data.activePerOneMillion,
            recovered: data.data.recovered,
            recoveredPerOneMillion: data.data.recoveredPerOneMillion,
            cases: data.data.todayCases,
            critical: data.data.critical,
            criticalPerOneMillion: data.data.criticalPerOneMillion,
            deaths: data.data.deaths, 
            deathsPerOneMillion: data.data.deathsPerOneMillion,
            todayDeaths: data.data.todayDeaths,
            update: data.data.updated,
            todayRecovered: data.data.todayRecovered,
            tests: data.data.tests
        }
        return modifyData;
    } catch (error) {
        return "אין מידע על המדינה הנוכחית.";
    }
}

export const fetchIsraelGovData = async () => {
    try {
        const israelFetchURL = `https://disease.sh/v3/covid-19/gov/Israel`;
        const {data} = await axios.get(israelFetchURL);
        const newData = data.data;
        return newData;
    } catch (error) {
        
    }
}

export const fetchGlobalTimeline = async () => {
    try {
        const globalTimelineURL = "https://disease.sh/v3/covid-19/historical/all?lastdays=60";
        const { data } = await axios.get(globalTimelineURL);
        return data;
    } catch (error) {
        
    }
}

export const getCountriesPolygons = async  () => {
    try {
        // const data = await axios.get("../assets/data/countries.geojson");
        const newData = {
            countryName: polygonData.properties.ADMIN,
            countryPolygon: polygonData.geometry.polygon
        };
        console.log((newData));
    } catch (error) {

    }
}