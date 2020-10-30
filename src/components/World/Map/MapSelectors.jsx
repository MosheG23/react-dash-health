import React, { useState } from 'react';
import { FormControl, NativeSelect, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { MapTypeData } from "./mapTypeData";

import styles from "./MapSelectors.module.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));


export const MapSelectors = ({ handleMapTypeChange }) => {
   const classes = useStyles();

  return (
    <div className={styles.map_selectors}>
      <>
      <h4>התאמה אישית</h4>
        <FormControl className={classes.formControl}>
        <NativeSelect
          name="age"
          className={classes.selectEmpty}
          defaultValue = "deaths"
          onChange = {
             (e) => handleMapTypeChange(e.target.value)
           }
        >
          {MapTypeData.map((item, index) => {
                    return (
                    <option key={index} value={item.value}>
                        {item.text}
                    </option>
                    );
                })}
        </NativeSelect>
        <FormHelperText>לפי מיליון איש</FormHelperText>
      </FormControl>
      </>
    </div>
    )
}
