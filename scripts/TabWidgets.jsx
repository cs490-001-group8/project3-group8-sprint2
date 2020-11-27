import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TrafficWidget from './Traffic_React/TrafficWidget';
import NewsList from './News_React/NewsList';
import WeatherModule from './Weather_React/WeatherModule';
import TweetWidget from './Tweet_React/TweetWidget';
import BillsWidget from './Bills_React/BillsWidget';
import SportsModule from './Sports_React/SportsModule';
import PoliticiansWidget from './Politicians_React/PoliticiansWidget';
import NationalParks from './National_Parks/NationalParks';
import TabChooser from './TabChooser'
import { Socket } from './Socket';

export default function TabWidgets({ currTab }) {
    const [personalTabs, setPersonalTabs] = useState(() => []);
    
    useEffect(() => {
        Socket.on('update personal tab', (data) => {
            setPersonalTabs([])
            const iterWidgets = [];
            let keyIndex = 0
            for (var key of Object.keys(data)) {
                if (key === "News"){
                    if (data[key]){
                        iterWidgets.push(<NewsList key={keyIndex}/>)
                    }
                } else if (key === "Weather"){
                    if (data[key]){
                        iterWidgets.push(<WeatherModule key={keyIndex}/>)
                    }
                } else if (key === "Traffic"){
                    if (data[key]){
                        iterWidgets.push(<TrafficWidget key={keyIndex}/>)
                    }
                } else if (key === "Bills"){
                    if (data[key]){
                        iterWidgets.push(<BillsWidget key={keyIndex}/>)
                    }
                } else if (key === "Politician_Twitter"){
                    if (data[key]){
                        iterWidgets.push(<TweetWidget key={keyIndex}/>)
                    }
                } else if (key === "Hiking_Destinations"){
                    if (data[key]){
                        iterWidgets.push(<NationalParks key={keyIndex}/>)
                    }
                } else if (key === "Sports"){
                    if (data[key]){
                        iterWidgets.push(<SportsModule key={keyIndex}/>)
                    }
                }
                
                keyIndex += 1;
            }
            setPersonalTabs((personalTabs) => [...personalTabs, iterWidgets])
            console.log(personalTabs.length)
        });
    }, []);
    
    if (currTab === 'Commuter') {
        return (
            <div className="tab-widgets-section">
                <WeatherModule />
                <TrafficWidget />
            </div>
        );
    }

    if (currTab === 'Politics') {
        return (
            <div className="tab-widgets-section">
                <TweetWidget />
                <PoliticiansWidget />
                <BillsWidget />
            </div>
        );
    }

    if (currTab === 'Recreation') {
        return (
            <div className="tab-widgets-section">
                <SportsModule />
                <NationalParks />
            </div>
        );
    }
    
    if (currTab === 'Personal') {
        return (
            <div className="tab-widgets-section">
                <TabChooser />
                {personalTabs}
            </div>
        );
    }

    return (
        <div className="tab-widgets-section">
            <NewsList />
            <WeatherModule />
        </div>
    );
}

TabWidgets.propTypes = {
    currTab: PropTypes.string.isRequired,
};
