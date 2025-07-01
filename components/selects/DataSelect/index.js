import React, { useEffect, useState } from 'react';
import qs from 'qs';

import MenuItem from "@mui/material/MenuItem";
import MDInput from "shared-ui/components/md/MDInput";
import axiosInstance from "shared-ui/commons/axiosInstance";
import MDBox from "shared-ui/components/md/MDBox";
import MDTypography from "shared-ui/components/md/MDTypography";

function DataSelect({ url, setSelected, filter, checkbox, itemsRender, ...props }) {

    const [options, setOptions] = useState([]);
    const [localSelectedValue, setLocalSelectedValue] = useState(
        props.selected ? props.selected : (props.multiple ? [] : "")
    );

    useEffect(() => {
        setLocalSelectedValue(
            props.selected !== undefined && props.selected !== null
                ? props.selected
                : (props.multiple ? [] : "")
        );
    }, [props.selected, props.multiple]);

    useEffect(() => {
        if(url) {
            fetchOptions();
        }
    }, [url, JSON.stringify(filter)]);

    const fetchOptions = async () => {
        if (url) {
            try {
                const response = await axiosInstance.get(url, {
                        params: filter,
                        paramsSerializer: params => qs.stringify(filter, { arrayFormat: 'repeat' })
                    }
                )
                setOptions(response.data);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        }
    };

    // Select logic
    const handleChange = (event) => {
        const value = event.target.value;

        if (props.multiple && props.maxOptions && value.length > props.maxOptions) {
          return;
        }

        setLocalSelectedValue(value);
        setSelected && setSelected(props.name, value);
    };

    // Checkbox logic
    const isChecked = (id) => {
        return props.selected?.includes(id);
    };

    const handleCheckboxChange = (id, checked) => {
        const updatedValues = checked
            ? [...(props.selected || []), id]
            : props.selected?.filter((valueId) => valueId !== id);

        setSelected && setSelected(props.name, updatedValues);
    };

    return (
        <>
        {!checkbox? (
            <MDInput select
                   variant={"outlined"}
                   label={props.label}
                   onChange={handleChange}
                   value={localSelectedValue}
                   required={props.required}
                   disabled={props.disabled}
                   inputProps={{
                       multiple: props.multiple,
                       ...(props.maxOptions && props.multiple ? { maxOptions: props.maxOptions } : {})
                   }}
                   sx={{
                      height: props.height ? props.height : "40px",
                      width: props.width ? props.width : "280px",
                      "& .MuiInputBase-root": {
                          height: "100%",
                      },
                      minWidth: props.minWidth ? props.minWidth : "250px",
                  }}>
              {!props.required &&
                <MenuItem value="">&nbsp;</MenuItem>
              }
              {props.children
                  ? props.children
                  : itemsRender
                  ? options.map((item) => itemsRender(item))
                  : options.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                          {props.fieldLabel ? item[props.fieldLabel] : item.name? item.name : item.label}
                      </MenuItem>
                  ))
              }
            </MDInput>
        ):
        (
            <MDBox maxHeight={props.maxHeight? props.maxHeight : "150px"} overflow="auto" width="250px">
                {options.map((option) => (
                    <MDBox display="flex" alignItems="left" gap={1} pl={2} key={option.id}>
                        <MDInput
                            variant="standard"
                            inputProps={{ type: "checkbox",  checked: isChecked(option.id) }}
                            value={option.id}
                            onChange={(e) => handleCheckboxChange(option.id, e.target.checked)}
                        />
                        <MDTypography variant="button" fontWeight="light">
                             {props.fieldLabel ? option[props.fieldLabel] : option.name? option.name : option.label}
                        </MDTypography>
                    </MDBox>
                ))}
            </MDBox>
        )}
        </>
    );
    }

export default DataSelect;

