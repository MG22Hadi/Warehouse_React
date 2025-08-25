import React, { useRef, useState } from "react";
import { Box, Paper, Typography, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../MainLayout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import PublicIcon from "@mui/icons-material/Public";
import axios from "axios";

export default function AddUsers4({ mode, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  const sectionsRef = {
    info: useRef(null),
    password: useRef(null),
    twofa: useRef(null),
    delete: useRef(null),
  };

  const handleScroll = (section) => {
    sectionsRef[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const steps = [
    { label: "معلومات المستخدم", key: "info" },
    { label: "العنوان الحالي", key: "password" },
    { label: "مواقع التواصل", key: "twofa" },
    { label: "مراجعة", key: "delete" },
  ];
  const token = localStorage.getItem("token");
  const handleSave = async () => {
    try {
      const payload = { ...data };
      delete payload.department_name;
      
      let response;
      if (data.id) {
        // تعديل المستخدم
        response = await axios.put(
          `http://localhost:8000/api/v1/users/${data.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // إضافة مستخدم جديد
        response = await axios.post(
          "http://localhost:8000/api/v1/users",
          payload,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.data.success) {
        navigate("/AllUsers");
      } else {
        alert("حدث خطأ: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // إعادة تنظيم الحقول لعرضها بشكل متطابق مع التصميم
  const fields = [
    { label: "الاسم", value: data.name || "", icon: <PersonIcon /> },
    { label: "الهاتف", value: data.phone || "", icon: <PhoneIcon /> },
    {
      label: "البريد الإلكتروني",
      value: data.email || "",
      icon: <EmailIcon />,
    },
    { label: "البلد", value: data.country || "", icon: <PublicIcon /> },
    { label: "القسم", value: data.department_name  || "", icon: <CategoryIcon /> },
    {
      label: "Facebook",
      value: data.facebook || "",
      icon: <WorkIcon />,
    },
    {
      label: "Instagram",
      value: data.instagram || "",
      icon: <WorkIcon />,
    },
    { label: "المدينة", value: data.city || "" },
    { label: "الدولة", value: data.state || "" },
  ];

  return (
    <MainLayout
      mode={mode}
      toggleTheme={toggleTheme}
      pageTitle="مراجعة المستخدم"
    >
      <Box
        dir="rtl"
        sx={{
          minHeight: "100vh",
          bgcolor: "white",
          color: "text.primary",
          borderRadius: 6,
          px: 4,
          py: 6,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { lg: "240px 1fr", xs: "1fr" },
            gap: 4,
          }}
        >
          {/* العمود الجانبي للخطوات */}
          <Paper
            sx={{
              position: "relative",
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              px: 2,
              py: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              {steps.map((step, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 6,
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      bgcolor: "#FF8E29",
                      cursor: "pointer",
                      zIndex: 2,
                    }}
                    onClick={() => {
                      setActiveStep(index);
                      handleScroll(step.key);
                    }}
                  >
                    {index < steps.length - 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 24,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 2,
                          height: 72,
                          bgcolor: "#FF8E29",
                          zIndex: 1,
                        }}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      color: "#FF8E29",
                      fontWeight: index === activeStep ? "bold" : "normal",
                      cursor: "pointer",
                      mr: 2,
                    }}
                    onClick={() => {
                      setActiveStep(index);
                      handleScroll(step.key);
                    }}
                  >
                    {step.label}
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* العمود الرئيسي للمحتوى */}
          <Paper
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              p: 4,
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontSize: "26px" }}>
              مراجعة الملف الشخصي
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              color="text.secondary"
              sx={{ fontSize: "18px" }}
            >
              مراجعة المعلومات المقدمة
            </Typography>

            {/* عرض المعلومات */}
            <Box display="grid" gap={3}>
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
                {fields.slice(0, 6).map((field, index) => (
                  <Box key={index}>
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      {field.icon && (
                        <Box sx={{ color: "#FF8E29" }}>{field.icon}</Box>
                      )}
                      <Typography
                        variant="subtitle2"
                        color="black"
                        sx={{ fontSize: "18px" }}
                      >
                        {field.label}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{ color: "#6F757E", fontSize: "16px" }}
                    >
                      {field.value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {fields.slice(6).map((field, index) => (
                <Box key={index}>
                  <Typography
                    variant="subtitle2"
                    color="black"
                    sx={{ fontSize: "18px" }}
                  >
                    {field.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#6F757E", mt: 0.5, fontSize: "16px" }}
                  >
                    {field.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* أزرار */}
            <Box display="flex" mt={4} justifyContent="space-between">
              <Button
                variant="outlined"
                sx={{ borderRadius: "30px", px: 4, py: 1.5, fontSize: "16px" }}
                onClick={() => navigate("/AddUsers")}
              >
                تعديل المعلومات
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#FF8E29",
                  color: "#fff",
                  borderRadius: "30px",
                  px: 6,
                  py: 1.5,
                  fontSize: "16px",
                }}
                onClick={handleSave}
              >
                حفظ المستخدم
              </Button>
            </Box>

            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity="success"
                sx={{ width: "100%" }}
              >
                تم حفظ المستخدم بنجاح!
              </Alert>
            </Snackbar>
          </Paper>
        </Box>
      </Box>
    </MainLayout>
  );
}
