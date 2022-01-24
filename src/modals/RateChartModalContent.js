import React, { useState, useEffect } from 'react';
import {getUserRateHistory} from "../api/api";
import RateChart from "../components/RateChart";
import {Spinner} from "@vkontakte/vkui";


export default function RateChartModalContent () {
    const [ratingHistory, setRatingHistory] = useState([])
    useEffect(() => {
        async function fetchData () {
            const data = await getUserRateHistory()
            setRatingHistory(data)
        }
        fetchData()
    }, [])

    if (ratingHistory.length) {
        return (
            <RateChart rating_history={ratingHistory} />
        )
    } else {
        return (
            <div style={{height: 300}}>
                <Spinner size="m"/>
            </div>
        )
    }
}