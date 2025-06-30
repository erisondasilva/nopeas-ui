import {useState} from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import MDBox from "shared-ui/components/md/MDBox";
import MDTypography from "shared-ui/components/md/MDTypography";
import MDButton from "shared-ui/components/md/MDButton";
import MDInput from "shared-ui/components/md/MDInput";
import {ServiceApi} from "commons/enums/ServiceApi";
import axios from "shared-ui/commons/axiosInstance";

function ChangePassword({setError, setSuccess}) {

  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if(formData.password !== formData.confirmPassword) {
      setError("Senhas não coincidem.");
      return;
    }

    try {
      await axios.post(
          ServiceApi.auth.CHANGE_PASSWORD.path,
          {
              currentPassword: formData.currentPassword,
              newPassword: formData.password,
          },
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      setSuccess("Senha alterada com sucesso!");

      setFormData({
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      setError("Erro ao alterar senha. Verifique a senha atual.");
    }
  };

  const passwordRequirements = [
    "Um caracter especial",
    "Min 6 caracteres",
    "Um número (2 são recomendados)",
    "Modifique com frequência",
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <MDBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <MDTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </MDTypography>
      </MDBox>
    );
  });

  return (
    <Card id="change-password">
      <MDBox p={3}>
        <MDTypography variant="h5">Modificar Senha</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="Senha Atual"
              name="currentPassword"
              required={true}
              value={formData.currentPassword}
              onChange={handleInputChange}
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="Nova Senha"
              name="password"
              required={true}
              value={formData.password}
              onChange={handleInputChange}
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="Confirmar Nova Senha"
              name="confirmPassword"
              required={true}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
        </Grid>
        <MDBox mt={6} mb={1}>
          <MDTypography variant="h5">Requisitos de senha</MDTypography>
        </MDBox>
        <MDBox mb={1}>
          <MDTypography variant="body2" color="text">
            Por favor siga os requisitos de senha para garantir a segurança da sua conta.
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
          <MDBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </MDBox>
          <MDBox ml="auto">
            <MDButton variant="gradient" color="dark" size="small" type="submit">
              Atualizar Senha
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ChangePassword;

