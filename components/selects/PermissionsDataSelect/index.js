import React, { useEffect, useState } from 'react';

import MDBox from "shared-ui/components/md/MDBox";
import MDTypography from "shared-ui/components/md/MDTypography";
import MDInput from "shared-ui/components/md/MDInput";
import axiosInstance from "shared-ui/commons/axiosInstance";
import {ServiceApi} from "commons/enums/ServiceApi";
import Grid from "@mui/material/Grid";

function PermissionsDataSelect({ setSelected, selected, handleChange, ...props}) {
  const [checkboxOptions, setCheckboxOptions] = useState([]);

  const apiUrl = ServiceApi.auth.PERMISSIONS.path;

  useEffect(() => {
    axiosInstance
      .get(apiUrl)
        .then((response) => {
          setCheckboxOptions(response.data);
        })
      .catch((error) => {
        console.error("Error fetching data for checkboxes:", error);
      });
  }, [null]);

  const isChecked = (id) => {
    return selected?.includes(id);
  };

  const handleCheckboxChange = (id, checked) => {
    const updatedPermissions = checked
      ? [...(selected || []), id] // Add the ID if checked
      : selected.filter((permissionId) => permissionId !== id);

      setSelected && setSelected("permissionIds", updatedPermissions);
  };

    const handleSelectChange = (event) => {
        setSelected && setSelected(props.name, event.target.value);
    };

  return (
      <MDBox width="350px">
            <MDBox width="300px">
                  <MDTypography variant="button" fontWeight="medium">
                    Permissions
                  </MDTypography>
                  <MDBox maxHeight="250px" overflow="auto" width="100%">
                    {checkboxOptions.map((option) => (
                        <Grid container spacing={0}>
                          <Grid item xs={1} pt={1}>
                            <MDInput
                                variant="standard"
                                inputProps={{ type: "checkbox",  checked: isChecked(option.id) }}
                                value={option.id}
                                onChange={(e) => handleCheckboxChange(option.id, e.target.checked)} // Handle checkbox changes
                            />
                          </Grid>
                          <Grid item xs={11}>
                            <MDBox width="100%">
                              <MDTypography variant="button" fontWeight="light" width="100%">
                                {option.name}
                              </MDTypography>
                            </MDBox>
                            <MDBox width="100%" mt={-2}>
                              <MDTypography variant="caption" fontWeight="light" color="secondary" fullWidth>
                                {option.description}
                              </MDTypography>
                            </MDBox>
                          </Grid>
                        </Grid>
                    ))}
                  </MDBox>
            </MDBox>
        </MDBox>
    )
}

export default PermissionsDataSelect;
