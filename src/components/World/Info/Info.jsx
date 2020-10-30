import React from "react";
import { CircularProgress } from "@material-ui/core";
import { fetchGlobalTimeline } from "../../../api"

import styles from "./Info.module.css";

const Info = (props) => {
    var sorted10Countries;
    const arrayTop10FromObject = () => {
        sorted10Countries = props.data.slice(0);
        sorted10Countries.sort(function (a, b) {
            return b[props.type] - a[props.type];
        });
        sorted10Countries = sorted10Countries.slice(0, 5);
    }
    if (props.data.length > 20 || sorted10Countries) {
        arrayTop10FromObject();
    }

    if(!sorted10Countries){
        return (
            <CircularProgress />
        )
    }
    return (
        <div className={styles.info}>
            <span>{props.title}</span>
            {sorted10Countries.map((item, index) => {
                return (
                    <>
                        <hr />
                        <li key={index}>
                            <div className = {styles.country__title}>
                                {item[props.type]}
                            </div>
                            <div className={styles.country__title}>
                                {item.name}
                            </div>
                        </li>
                    </>
                )
            })}
        </div>
    )
}

export default Info;