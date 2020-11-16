import React from 'react';
import PropTypes from 'prop-types';
import PoliticianName from './PoliticianName';

export default function PoliticianBody({
    name, website, district, party, chamber,
}) {
    return (
        <div className="politician-body">
            <PoliticianName name={name} /> 
            {website}  {district}  {party}  {chamber}
        </div>
    );
}

PoliticianBody.propTypes = {
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    district: PropTypes.string.isRequired,
    party: PropTypes.string.isRequired,
    chamber: PropTypes.string.isRequired,
};
