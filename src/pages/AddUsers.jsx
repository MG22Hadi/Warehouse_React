import React, { useRef, useState } from "react";
import {
  Box,
  Paper,
  Tabs,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import MainLayout from "../MainLayout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";

export default function AddUsers({ mode, toggleTheme }) {
  const navigate = useNavigate();
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
  const [role, setRole] = useState("");

  const steps = [
    { label: "معلومات المستخدم", key: "info" },
    { label: "العنوان الحالي", key: "password" },
    { label: "مواقع التواصل", key: "twofa" },
    { label: "مراجعة", key: "delete" },
  ];

  const fields = [
    { label: "الاسم الكامل", icon: <PersonIcon /> },
    { label: "الهاتف", icon: <PhoneIcon /> },
    { label: "البريد الإلكتروني", icon: <EmailIcon /> },
    { label: "كلمة المرور", icon: <LockIcon /> },
    { label: "القسم", icon: <CategoryIcon /> },
    { label: "المسمى الوظيفي", icon: <WorkIcon /> },
  ];

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="اضافة مستخدم">
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
                  {/* الدائرة */}
                  <Box
                    sx={{
                      position: "relative",
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      bgcolor: index === activeStep ? "#FF8E29" : "#FFC794",
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
                          bgcolor: "#FFC794",
                          zIndex: 1,
                        }}
                      />
                    )}
                  </Box>

                  <Box
                    sx={{
                      color: index === activeStep ? "#FF8E29" : "#A0A0A0",
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

            <Tabs
              orientation="vertical"
              variant="scrollable"
              aria-label="users tabs"
              sx={{
                mt: 4,
                "& .MuiTab-root": {
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 1.5,
                  alignItems: "center",
                  minHeight: "48px",
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 142, 41, 0.1)",
                    color: "#FF8E29",
                  },
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "20px",
                  color: "inherit",
                },
              }}
              TabIndicatorProps={{ style: { background: "#FF8E29" } }}
            />
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
            <Typography variant="h6" gutterBottom>
              المعلومات الأساسية
            </Typography>

            {/* الحقول */}
            <Box
              display="grid"
              gridTemplateColumns={{ sm: "1fr 1fr", xs: "1fr" }}
              gap={3}
            >
              {fields.map((field) => (
                <TextField
                  key={field.label}
                  label={field.label}
                  fullWidth
                  value=""
                  InputProps={{
                    startAdornment: field.icon && (
                      <Box
                        sx={{
                          mr: 1,
                          display: "flex",
                          alignItems: "center",
                          color: "gray",
                        }}
                      >
                        {field.icon}
                      </Box>
                    ),
                  }}
                  sx={{
                    borderRadius: "30px",
                    backgroundColor: "#F5F5F5",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                      backgroundColor: "#F5F5F5",
                      "& fieldset": { border: "none" },
                    },
                  }}
                />
              ))}
            </Box>

            {/* حقل نوع الحساب */}
            <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
              <TextField
                select
                label="نوع الحساب"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  width: 300,
                  borderRadius: "30px",
                  backgroundColor: "#F5F5F5",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    backgroundColor: "#F5F5F5",
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiSelect-select": {
                    textAlign: "center",
                  },
                }}
              >
                <MenuItem value="user">موظف</MenuItem>
                <MenuItem value="moderator">مورد</MenuItem>
              </TextField>
            </Box>
            {/* زر التالي أسفل كل الحقول وعلى اليمين */}
<Box display="flex" mt={8}>
  <Button
    variant="contained"
    sx={{
      bgcolor: "#FF8E29",
      color: "#fff",
      borderRadius: "30px",
      px: 6,
      py: 1.5,
      fontSize: "16px",
      "&:hover": { bgcolor: "#ff7f00" },
      ml: "auto", // يحرك الزر لليمين مهما كان اتجاه الصفحة
    }}
    onClick={() => navigate("/AddUsers2")}
  >
    التالي
  </Button>
</Box>

          </Paper>
        </Box>
      </Box>
    </MainLayout>
  );
}
