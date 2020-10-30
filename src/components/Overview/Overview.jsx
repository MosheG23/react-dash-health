import React from "react";
import styles from "./Overview.module.css";
import CountryPicker from "./CountryPicker";
import CountryInfo from "./CountryInfo";
import { fetchCountriesList, fetchDataByCountry } from "../../api";

class Overview extends React.Component {
    state = {
        countryList: {},
        currentCountryName: "Global",
        currentCountryData: {}
    };

    handleCountryChange = async (countryName) => {
        const fetchedCountry = await fetchDataByCountry(countryName);
        // fetch the data
        this.setState({
            currentCountryName: countryName,
            currentCountryData: fetchedCountry
        });
    };

    async componentDidMount() {
        const fetchedCountryList = await fetchCountriesList();
        const fetchedData = await fetchDataByCountry(this.state.currentCountryName);
        this.setState({
            countryList: fetchedCountryList,
            currentCountryData: fetchedData
        });
    }

    render() {
        const { countryList, currentCountryData } = this.state;

        return (
            <div className={styles.App}>
                <div className={styles.container}>
                    <div className={styles.cardsUpper}>
                    <h2>סינון על פי מדינה</h2>
                        <CountryPicker data={countryList} handleCountryChange={this.handleCountryChange} />
                        <CountryInfo data={currentCountryData} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Overview;