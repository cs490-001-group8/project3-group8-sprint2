import React from 'react';
import PropTypes from 'prop-types';

export default function WidgetTitle({ title }) {
  return (
    <div className="widget-title">
        {title}
    </div>
  );
}

WidgetTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
