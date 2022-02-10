import React from 'react';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import {scheme} from "../../utils/utils";

const tickFormatter = (value) => {
    const date = new Date(value)
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (month < 10) month = "0" + month
    if (day < 10) day = "0" + day
    return day + "." + month
}

export default function RateChart ({rating_history}) {
    return (
        <LineChart
            width={Math.min(document.documentElement.clientWidth, 700) - 12}
            height={300}
            data={rating_history}
            margin={{
                top: 12,
                bottom: 5,
                right: 12
            }}
        >
            <XAxis dataKey="date" tickFormatter={tickFormatter} minTickGap={14}  />
            <YAxis width={50} type="number" tickFormatter={(value) => Math.floor(value)} domain={['dataMin - 10', 'dataMax + 10']} tickCount={100}/>
            <Tooltip content={<CustomTooltip/>} />
            <CartesianGrid strokeDasharray="3 3" stroke={scheme() === "dark" ? "#232324" : "#e0e0e0"} />
            <Line type="monotone" dataKey="rating" stroke="#8884d8" dot={false} />
        </LineChart>
    )
}