import React from "react";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

import MDBox from "shared-ui/components/md/MDBox";

function PopupWindow({children,
                         edit=false,
                         handleClose,
                         width="450px",
                         maxHeight="620px",
                         top="13%",
                         left="32%"}) {

  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 990,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
      onClick={handleClose}
    >
      <Card
        sx={{
          position: 'fixed',
          width: {width},
          maxHeight: {maxHeight},
          top: {top},
          left: {left},
          zIndex: 999,
          background: '#fefefe',
        }}
        onClick={handleCardClick}
      >
        <CardContent>
            <Grid container>
                <Grid item xs={12}>
                    <MDBox sx={{display: "flex", justifyContent:"flex-end"}} >
                        {edit &&
                            <MDBox pl={2} onClick={handleClose} sx={{cursor: "pointer"}}>
                                <Icon fontSize="small" sx={{cursor: "pointer"}}>edit</Icon>
                            </MDBox>
                        }
                        <MDBox pl={2} pt={0.3} onClick={handleClose} sx={{cursor: "pointer"}}>
                            <Icon fontSize="medium">close</Icon>
                        </MDBox>
                    </MDBox>
                </Grid>
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default PopupWindow;
