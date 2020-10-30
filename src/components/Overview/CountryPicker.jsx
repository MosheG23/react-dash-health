import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from "@material-ui/core";

import * as API from "../../api";

import styles from "./CountryInfo.module.css";

function CountryPicker(props) {
    const [fetchedCountryList, setCountryList] = useState([]);

    useEffect (() => {
        const fetchCountryList = async () => {
            setCountryList(await API.fetchCountriesList());
        }

        fetchCountryList();
    }, []);

    return (
        <div className={styles.container}>
            <FormControl>
            <NativeSelect defaultValue="Global" onChange={(e) => props.handleCountryChange(e.target.value)}>
                <option key="Global" value="Global">Global</option>
                {fetchedCountryList.map((item) => {
                    return (
                    <option key={item.id} value={item.value}>{item.name}</option>
                    )
                })};
            </NativeSelect>
        </FormControl>
        </div>
    )
}

export default CountryPicker;