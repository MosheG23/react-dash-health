import React from 'react';
import { NativeSelect, FormControl } from "@material-ui/core";

import { MapTypeData } from "./mapTypeData";

import styles from "./MapType.module.css";

function MapType({ handleMapTypeChange }) {

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleMapTypeChange(e.target.value)} >
                {/* <option value="deaths">מקרי מוות</option>
                <option value="mask">לבישת מסכה</option>
                <option value="crowd">התקהלות עד 10%</option> */}

                {MapTypeData.map((item, index) => {
                    return (
                    <option key={index} value={item.value}>
                        {item.text}
                    </option>
                    );
                })}
            </NativeSelect>
        </FormControl>
    )
}

export default MapType;