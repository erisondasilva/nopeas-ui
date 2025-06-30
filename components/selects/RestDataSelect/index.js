import React from 'react';
import PropTypes from 'prop-types';

import DataSelect from "shared-ui/components/selects/DataSelect";

function RestDataSelect({label, name, apiPath, setSelected, ...props }) {
    return (
        <DataSelect
            url={apiPath}
            label={label}
            name={name}
            setSelected={setSelected}
            {...props}
        />
    );
}

RestDataSelect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    apiPath: PropTypes.string.isRequired,
    setSelected: PropTypes.func,
};

export default RestDataSelect;

