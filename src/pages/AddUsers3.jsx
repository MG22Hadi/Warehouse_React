import React, { useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useNavigate, useLocation ,useParams} from "react-router-dom";
import { Facebook, Instagram } from "@mui/icons-material";
import MainLayout from "../MainLayout";

export default function AddUsers3({ mode, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const prevData = location.state || {};

  const sectionsRef = {
    info: useRef(null),
    social: useRef(null),
    review: useRef(null),
    final: useRef(null),
  };
  const handleScroll = (section) => {
    sectionsRef[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  const [activeStep, setActiveStep] = useState(2);
  const steps = [
    { label: "معلومات المستخدم", key: "info" },
    { label: "العنوان الحالي", key: "social" },
    { label: "مواقع التواصل", key: "review" },
    { label: "مراجعة", key: "final" },
  ];

  const [facebook, setFacebook] = useState(prevData.facebook || "");
  const [instagram, setInstagram] = useState(prevData.instagram || "");

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
          {/* العمود الجانبي */}
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
              {steps.map((step, index) => {
                const isFirstThree = index < 3;
                const circleColor = isFirstThree ? "#FF8E29" : "#FFC794";
                const lineColor = isFirstThree ? "#FF8E29" : "#FFC794";
                const textColor = isFirstThree ? "#FF8E29" : "#A0A0A0";
                return (
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
                        bgcolor: circleColor,
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
                            bgcolor: lineColor,
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Box>
                    <Box
                      sx={{
                        color: textColor,
                        fontWeight: isFirstThree ? "bold" : "normal",
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
                );
              })}
            </Box>
          </Paper>

          {/* العمود الرئيسي */}
          <Paper
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              p: 4,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#000", fontWeight: "bold" }}
            >
              ملف التواصل الاجتماعي
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ color: "#6F757E", mb: 3 }}
            >
              اربط ملفات التواصل الاجتماعي
            </Typography>

            <Box display="grid" gridTemplateColumns="1fr" gap={3}>
              <TextField
                label="Facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Facebook sx={{ color: "#1877F2" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "#F5F5F5",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    backgroundColor: "#F5F5F5",
                    "& fieldset": { border: "none" },
                  },
                }}
              />
              <TextField
                label="Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Instagram sx={{ color: "#E4405F" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "#F5F5F5",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    backgroundColor: "#F5F5F5",
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
                  color: "#FF8E29",
                  borderColor: "#FF8E29",
                }}
                onClick={() => navigate("/AddUsers2", { state: prevData })}
              >
                السابق
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
                onClick={() =>
                  navigate("/AddUsers4", {
                    state: { ...prevData, facebook, instagram ,id},
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
