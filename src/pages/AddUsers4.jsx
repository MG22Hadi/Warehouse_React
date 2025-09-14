import React, { useRef, useState } from "react";
import { Box, Paper, Typography, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../MainLayout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CategoryIcon from "@mui/icons-material/Category";
import PublicIcon from "@mui/icons-material/Public";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { BASE_URL } from "../api/axiosInstance";
import CircularProgress from "@mui/material/CircularProgress";
import FacebookIcon from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";

export default function AddUsers4({ mode, toggleTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};
  // تحقق من وصول id عند التعديل
  React.useEffect(() => {
    if (!data.id && data.isEdit) {
      setSnackbar({
        open: true,
        message: "لم يتم العثور على معرف المستخدم للتعديل!",
        severity: "error",
      });
    }
  }, [data]);
  const [isSaving, setIsSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success'|'error'|'info'|'warning'
  });

  const buildPayload = (raw) => {
    // تجهيز البيانات للإرسال
    const normalized = {
      name: raw.name ?? raw.fullName ?? "",
      phone: raw.phone ?? "",
      email: raw.email ?? "",
      department_id:
        raw.department_id ?? raw.departmentId ?? raw.department ?? null,
      job_title: raw.job_title ?? raw.jobTitle ?? raw.job ?? "",
      country: raw.country ?? raw.country_name ?? "",
      city: raw.city ?? "",
      address: raw.address ?? "",
      facebook_url: raw.facebook_url ?? raw.facebook ?? "",
      instagram_url: raw.instagram_url ?? raw.instagram ?? "",
      gender: raw.gender ?? "",
      // كلمة المرور فقط إذا تم تعديلها
    };
    if (raw.isPasswordDirty && raw.password && raw.password.trim().length > 0) {
      normalized.password = raw.password;
    }
    Object.keys(normalized).forEach((k) => {
      if (normalized[k] === null || normalized[k] === undefined)
        delete normalized[k];
    });
    return normalized;
  };

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
    // إزالة أي طباعة كونسول
    try {
      const confirm = window.confirm("هل أنت متأكد من حفظ بيانات المستخدم؟");
      if (!confirm) return;
      setIsSaving(true);
      const payload = buildPayload(data);
      // تحقق من العملية: تعديل أم إضافة
      let response;
      if (data.id) {
        // تعديل مستخدم
        response = await axios.put(`${BASE_URL}/v1/users/${data.id}`, payload, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // إضافة مستخدم جديد
        if (!payload.password || payload.password.length < 6) {
          setSnackbar({
            open: true,
            message:
              "يجب إدخال كلمة مرور صالحة (6 أحرف على الأقل) عند الإضافة.",
            severity: "error",
          });
          setIsSaving(false);
          return;
        }
        response = await axios.post(`${BASE_URL}/v1/users`, payload, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      if (response?.data?.success) {
        setSnackbar({
          open: true,
          message:
            response.data.message || response.data.success || "تم الحفظ بنجاح",
          severity: "success",
        });
        setTimeout(() => navigate("/AllUsers"), 800);
      } else {
        setSnackbar({
          open: true,
          message: response?.data?.message || "حدث خطأ أثناء الحفظ",
          severity: "error",
        });
      }
    } catch (error) {
      // لا تطبع في الكونسول، فقط أظهر رسالة للمستخدم
      let errorMsg = error.response?.data?.message || "حدث خطأ في الخادم";
      if (error.response?.data?.errors) {
        const errs = error.response.data.errors;
        let details = [];
        Object.entries(errs).forEach(([field, messages]) => {
          let label = field;
          if (field === "email") label = "البريد الإلكتروني";
          else if (field === "phone") label = "رقم الهاتف";
          else if (field === "password") label = "كلمة المرور";
          else if (field === "name") label = "الاسم";
          else if (field === "department_id") label = "القسم";
          else if (field === "job_title") label = "المسمى الوظيفي";
          details.push(`${label}: ${messages.join(" ")}`);
        });
        errorMsg += "\n" + details.join("\n");
      }
      setSnackbar({
        open: true,
        message: errorMsg,
        severity: "error",
      });
    } finally {
      setIsSaving(false);
    }
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
    {
      label: "القسم",
      value: data.department_name || "",
      icon: <CategoryIcon />,
    },
    {
      label: "Facebook",
      value: data.facebook_url || "",
      icon: <FacebookIcon />,
    },
    {
      label: "Instagram",
      value: data.instagram_url || "",
      icon: <Instagram />,
    },
    { label: "المدينة", value: data.city || "" },
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
          {/* العمود الجانبي للخطوات */}
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
              bgcolor: theme.palette.background.ma2,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              p: 4,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: "26px", color: theme.palette.text.primary }}
            >
              مراجعة الملف الشخصي
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              color="text.secondary"
              sx={{ fontSize: "18px", color: theme.palette.text.secondary }}
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
                        <Box sx={{ color: theme.palette.primary.main }}>
                          {field.icon}
                        </Box>
                      )}
                      <Typography
                        variant="subtitle2"
                        color="black"
                        sx={{
                          fontSize: "18px",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {field.label}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "16px",
                      }}
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
                    sx={{ fontSize: "18px", color: theme.palette.text.primary }}
                  >
                    {field.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      mt: 0.5,
                      fontSize: "16px",
                    }}
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
                sx={{
                  borderRadius: "30px",
                  px: 4,
                  py: 1.5,
                  fontSize: "16px",
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                }}
                onClick={() => navigate("/AddUsers", { state: data })}
              >
                تعديل المعلومات
              </Button>
              <Button
                variant="contained"
                disabled={isSaving}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  opacity: isSaving ? 0.7 : 1,
                  color: "#fff",
                  borderRadius: "30px",
                  px: 6,
                  py: 1.5,
                  fontSize: "16px",
                }}
                onClick={handleSave}
              >
                {isSaving ? <CircularProgress size={20} /> : "حفظ المستخدم"}
              </Button>
            </Box>

            <Snackbar
              open={snackbar.open}
              autoHideDuration={3000}
              onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                severity={snackbar.severity}
                sx={{ width: "100%" }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
          </Paper>
        </Box>
      </Box>
    </MainLayout>
  );
}
