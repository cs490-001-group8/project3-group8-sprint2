import React from 'react';
import PropTypes from 'prop-types';
import TweetList from './TweetList';
import SectionTitle from './SectionTitle';

export default function TweetsSection({ tweets, sectionTitle }) {
    return (
        <div title="TweetsSection">
            <SectionTitle title={sectionTitle} />
            <TweetList tweets={tweets} />
        </div>
    );
}

TweetsSection.propTypes = {
    tweets: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        sname: PropTypes.string,
        ppic: PropTypes.string,
        uname: PropTypes.string,
        time: PropTypes.string,
        date: PropTypes.string,
    })).isRequired,
    sectionTitle: PropTypes.string.isRequired,
};
