import { forwardRef } from "react";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 3 PRO React components
import MDBox from "shared-ui/components/md/MDBox";
import MDTypography from "shared-ui/components/md/MDTypography";

// custom styles for the DefaultItem
import defaultItemIconBox from "shared-ui/components/DefaultItem/styles";

const DefaultItem = forwardRef(({ color="info", icon, title, description, ...rest }, ref) => (
  <MDBox {...rest} ref={ref} display="flex" alignItems="center">
    <MDBox sx={(theme) => defaultItemIconBox(theme, { color })}>
      <Icon>{icon}</Icon>
    </MDBox>
    <MDBox ml={2} mt={0.5} lineHeight={1.4}>
      {title && (
      <MDTypography display="block" variant="button" fontWeight="medium">
        {title}
      </MDTypography>
      )}
      {description && (
        <MDTypography variant="button" fontWeight="regular" color="text">
          {description}
        </MDTypography>
      )}
    </MDBox>
  </MDBox>
));

export default DefaultItem;
