import React from "react";
import { GiDeathSkull } from "react-icons/gi";
import { RiSurgicalMaskLine } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";

export const MapTypeData = [
    {
        value: "deathsPerOneMillion",
        text: "מתים",
        icon: <GiDeathSkull />
    }, {
        value: "activePerOneMillion",
        text: "מקרים פעילים",
        icon: <RiSurgicalMaskLine />
    }, {
        value: "casesPerOneMillion",
        text: "מקרים", 
        icon: <BsPeopleFill />
    }, {
        value: "testsPerOneMillion",
        text: "בדיקות",
        icon: < BsPeopleFill / >
    }
]