/**
=========================================================
* Material Dashboard 3 PRO React - v2.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme } from "@mui/material/styles";
// import Fade from "@mui/material/Fade";

// Material Dashboard 3 PRO React base styles
import colors from "shared-ui/assets/theme/base/colors";
import breakpoints from "shared-ui/assets/theme/base/breakpoints";
import typography from "shared-ui/assets/theme/base/typography";
import boxShadows from "shared-ui/assets/theme/base/boxShadows";
import borders from "shared-ui/assets/theme/base/borders";
import globals from "shared-ui/assets/theme/base/globals";

// Material Dashboard 3 PRO React helper functions
import boxShadow from "shared-ui/assets/theme/functions/boxShadow";
import hexToRgb from "shared-ui/assets/theme/functions/hexToRgb";
import linearGradient from "shared-ui/assets/theme/functions/linearGradient";
import pxToRem from "shared-ui/assets/theme/functions/pxToRem";
import rgba from "shared-ui/assets/theme/functions/rgba";

// Material Dashboard 3 PRO React components base styles for @mui material components
import sidenav from "shared-ui/assets/theme/components/sidenav";
import list from "shared-ui/assets/theme/components/list";
import listItem from "shared-ui/assets/theme/components/list/listItem";
import listItemText from "shared-ui/assets/theme/components/list/listItemText";
import card from "shared-ui/assets/theme/components/card";
import cardMedia from "shared-ui/assets/theme/components/card/cardMedia";
import cardContent from "shared-ui/assets/theme/components/card/cardContent";
import button from "shared-ui/assets/theme/components/button";
import iconButton from "shared-ui/assets/theme/components/iconButton";
import input from "shared-ui/assets/theme/components/form/input";
import inputLabel from "shared-ui/assets/theme/components/form/inputLabel";
import inputOutlined from "shared-ui/assets/theme/components/form/inputOutlined";
import textField from "shared-ui/assets/theme/components/form/textField";
import menu from "shared-ui/assets/theme/components/menu";
import menuItem from "shared-ui/assets/theme/components/menu/menuItem";
import switchButton from "shared-ui/assets/theme/components/form/switchButton";
import divider from "shared-ui/assets/theme/components/divider";
import tableContainer from "shared-ui/assets/theme/components/table/tableContainer";
import tableHead from "shared-ui/assets/theme/components/table/tableHead";
import tableCell from "shared-ui/assets/theme/components/table/tableCell";
import linearProgress from "shared-ui/assets/theme/components/linearProgress";
import breadcrumbs from "shared-ui/assets/theme/components/breadcrumbs";
import slider from "shared-ui/assets/theme/components/slider";
import avatar from "shared-ui/assets/theme/components/avatar";
import tooltip from "shared-ui/assets/theme/components/tooltip";
import appBar from "shared-ui/assets/theme/components/appBar";
import tabs from "shared-ui/assets/theme/components/tabs";
import tab from "shared-ui/assets/theme/components/tabs/tab";
import stepper from "shared-ui/assets/theme/components/stepper";
import step from "shared-ui/assets/theme/components/stepper/step";
import stepConnector from "shared-ui/assets/theme/components/stepper/stepConnector";
import stepLabel from "shared-ui/assets/theme/components/stepper/stepLabel";
import stepIcon from "shared-ui/assets/theme/components/stepper/stepIcon";
import select from "shared-ui/assets/theme/components/form/select";
import formControlLabel from "shared-ui/assets/theme/components/form/formControlLabel";
import formLabel from "shared-ui/assets/theme/components/form/formLabel";
import checkbox from "shared-ui/assets/theme/components/form/checkbox";
import radio from "shared-ui/assets/theme/components/form/radio";
import autocomplete from "shared-ui/assets/theme/components/form/autocomplete";
import flatpickr from "shared-ui/assets/theme/components/flatpickr";
import container from "shared-ui/assets/theme/components/container";
import popover from "shared-ui/assets/theme/components/popover";
import buttonBase from "shared-ui/assets/theme/components/buttonBase";
import icon from "shared-ui/assets/theme/components/icon";
import svgIcon from "shared-ui/assets/theme/components/svgIcon";
import link from "shared-ui/assets/theme/components/link";
import dialog from "shared-ui/assets/theme/components/dialog";
import dialogTitle from "shared-ui/assets/theme/components/dialog/dialogTitle";
import dialogContent from "shared-ui/assets/theme/components/dialog/dialogContent";
import dialogContentText from "shared-ui/assets/theme/components/dialog/dialogContentText";
import dialogActions from "shared-ui/assets/theme/components/dialog/dialogActions";

export default createTheme({
  direction: "rtl",
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...flatpickr,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
