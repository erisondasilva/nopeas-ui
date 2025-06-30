import React, {useEffect, useState} from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 3 PRO React components
import MDBox from "shared-ui/components/md/MDBox";

// Settings page components
import Header from "shared-ui/pages/usuario/components/Header";
import ChangePassword from "shared-ui/pages/usuario/components/ChangePassword";
import DashboardNavbar from "shared-ui/layout/DashboardNavbar";
import Footer from "shared-ui/layout/Footer";
import DashboardLayout from "shared-ui/layout/DashboardLayout";
import UserPermissions from "shared-ui/commons/UserPermissions";
import MDAlert from "shared-ui/components/md/MDAlert";

function Settings() {

    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        setUserInfo(UserPermissions.getUser());
    }, []);

  return (
      <DashboardLayout>
          <DashboardNavbar absolute={true}/>
          <MDBox mt={4}>
              <Grid container spacing={3}>
                  <Grid item xs={12} lg={9}>
                      <MDBox mb={3}>
                          {error && <MDAlert color="error" fontSize="small" dismissible={true}>{error}</MDAlert>}
                          {success && <MDAlert color="success" fontSize="small" dismissible={true}>{success}</MDAlert>}
                          <Grid container spacing={3}>
                              <Grid item xs={12}>
                                  <Header realName={userInfo.realName} username={userInfo.username}/>
                              </Grid>
                              <Grid item xs={12}>
                                  <ChangePassword setError={setError} setSuccess={setSuccess}/>
                              </Grid>
                          </Grid>
                      </MDBox>
                  </Grid>
              </Grid>
          </MDBox>
          <Footer/>
      </DashboardLayout>
  );
}

export default Settings;
