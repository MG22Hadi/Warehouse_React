import React, { useRef, useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import MainLayout from "../MainLayout";
import { useTheme } from "@mui/material/styles";

export default function AddUsers2({ mode, toggleTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const prevData = location.state || {};

  const [address, setAddress] = useState(prevData.address || "");
  const [detailedAddress, setDetailedAddress] = useState(
    prevData.detailedAddress || ""
  );
  const [city, setCity] = useState(prevData.city || "");
  const [country, setCountry] = useState(prevData.country || "");

  const sectionsRef = {
    info: useRef(null),
    password: useRef(null),
    twofa: useRef(null),
    delete: useRef(null),
  };
  const handleScroll = (section) => {
    sectionsRef[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { label: "معلومات المستخدم", key: "info" },
    { label: "العنوان الحالي", key: "password" },
    { label: "مواقع التواصل", key: "twofa" },
    { label: "مراجعة", key: "delete" },
  ];

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="اضافة مستخدم">
      <Box
        dir="rtl"
        sx={{
          minHeight: "100vh",
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
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
          {/* العمود الجانبي */}
          <Paper
            sx={{
              position: "relative",
              bgcolor: theme.palette.background.ma2,
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
                      bgcolor:
                        index === 0 || index === activeStep
                          ? "#FF8E29"
                          : "#FFC794",
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
                          bgcolor: index < activeStep ? "#FF8E29" : "#FFC794",
                          zIndex: 1,
                        }}
                      />
                    )}
                  </Box>

                  <Box
                    sx={{
                      color:
                        index === activeStep
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                      fontWeight:
                        index === 0 || index === activeStep ? "bold" : "normal",
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

          {/* العمود الرئيسي */}
          <Paper
            sx={{
              bgcolor: theme.palette.background.ma2,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              p: 4,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: theme.palette.text.primary }}
            >
              العنوان
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ color: theme.palette.text.secondary, mb: 3 }}
            >
              ضع عنوانك الشخصي
            </Typography>

            <Box display="grid" gridTemplateColumns="1fr" gap={3}>
              <TextField
                label="عنوان المنزل"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                sx={{
                  borderRadius: "30px",
                  backgroundColor: theme.palette.background.note1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    backgroundColor: theme.palette.background.note1,
                    "& fieldset": { border: "none" },
                  },
                }}
              />
              <TextField
                label="العنوان التفصيلي"
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
                fullWidth
                sx={{
                  borderRadius: "30px",
                  backgroundColor: theme.palette.background.note1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    backgroundColor: theme.palette.background.note1,
                    "& fieldset": { border: "none" },
                  },
                }}
              />
            </Box>

            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mt={3}>
              <TextField
                label="المدينة"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
                sx={{
                  borderRadius: "30px",
                  backgroundColor: theme.palette.background.note1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    backgroundColor: theme.palette.background.note1,
                    "& fieldset": { border: "none" },
                  },
                }}
              />
              <TextField
                label="البلد"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                fullWidth
                sx={{
                  borderRadius: "30px",
                  backgroundColor: theme.palette.background.note1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    backgroundColor: theme.palette.background.note1,
                    "& fieldset": { border: "none" },
                  },
                }}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" mt={8}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "30px",
                  px: 6,
                  py: 1.5,
                  fontSize: "16px",
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                }}
                onClick={() => navigate("/AddUsers")}
              >
                السابق
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  borderRadius: "30px",
                  px: 6,
                  py: 1.5,
                  fontSize: "16px",
                }}
                onClick={() =>
                  navigate("/AddUsers3", {
                    state: {
                      ...prevData,
                      address,
                      detailedAddress,
                      city,
                      country,
                      id,
                    },
                  })
                }
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
