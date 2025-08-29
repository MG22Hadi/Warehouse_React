import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound({ showManagerLink = false }) {
  const nav = useNavigate();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        gap: 4,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, md: 6 },
        px: { xs: 3, md: 6 },
        boxSizing: "border-box",
        overflow: "hidden",
        textAlign: "center",
        bgcolor: "background.default",
      }}
      aria-live="polite"
    >
      <Box
        component="img"
        src="/assets/404.svg"
        alt="404 - الصفحة غير موجودة"
        loading="lazy"
        sx={{
          width: "100%",
          maxWidth: 1100,
          height: "auto",
          maxHeight: "calc(100vh - 220px)",
          objectFit: "contain",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      <Typography variant="h6" color="text.secondary">
        الصفحة المطلوبة غير موجودة أو ليس لديك صلاحية للوصول إليها.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" sx={{ color: "#fff" }} onClick={() => nav("/")}>
          تسجيل الدخول
        </Button>

        <Button variant="outlined" onClick={() => nav(-1)}>
          الرجوع
        </Button>

        {showManagerLink && (
          <Button color="secondary" onClick={() => nav("/Manager")}>
            صفحة المدير
          </Button>
        )}
      </Box>
    </Box>
  );
}
