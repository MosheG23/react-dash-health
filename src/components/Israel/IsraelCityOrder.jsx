import React from 'react';
import { NativeSelect, FormControl } from "@material-ui/core";

function IsraelCityOrder(props) {

    return (
        <div>
            <FormControl>
                <NativeSelect defaultValue = "actualSick"
                onChange = {
                    (e) => props.handleCityOrder(e.target.value)
                } >
                    <option key="actualSick" value="actualSick">כמות חולים פעילים</option>
                    <option key="sickCount" value="sickCount">מספר חולים סך הכל</option>
                    <option key="positivePercent" value="positivePercent">אחוז חיוביים</option>
                    <option key="verifiedLast7Days" value="verifiedLast7Days">כמות חולים חדשים בשבוע האחרון</option>
                    <option key="testLast7Days" value="testLast7Days">כמות בדיקות בחודש האחרון</option>
                </NativeSelect>
            </FormControl>
        </div>
    )
}

export default IsraelCityOrder;