import React from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "shared-ui/components/md/MDBox";
import MDTypography from "shared-ui/components/md/MDTypography";

function Header({realName = "Usuário", username = ""}) {
  return (
    <Card id="profile">
      <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {realName}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                {username}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default Header;
