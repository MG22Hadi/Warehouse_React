import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
  Divider,
} from "@mui/material";
import { Moon, Sun } from "lucide-react";
import MainLayout from "../MainLayout";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

const fields = [
  { label: "الاسم الأول", icon: <PersonIcon /> },
  { label: "الكنية", icon: <BadgeIcon /> },
  { label: "تاريخ الميلاد", icon: <CalendarTodayIcon /> },
  { label: "البريد الإلكتروني", icon: <EmailIcon /> },
  { label: "رقم الهاتف", icon: <PhoneIcon /> },
  { label: "العنوان", icon: <HomeIcon /> },
];

export default function Settings({ mode, toggleTheme }) {
  const theme = useTheme();

  const sectionsRef = {
    info: useRef(null),
    password: useRef(null),
    twofa: useRef(null),
    delete: useRef(null),
  };

  const handleScroll = (section) => {
    sectionsRef[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="الإعدادات">
      {/* الحاوية الكبيرة */}
      <Box
        dir="rtl"
        sx={{
          minHeight: "100vh",
          bgcolor: (theme) => theme.palette.background.paper,
          
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
          {/* التبويبات الجانبية */}
          <Paper
            sx={{
              bgcolor: (theme) => theme.palette.background.ma2,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              aria-label="settings tabs"
              sx={{
                px: 2,
                py: 2,
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
            >
              <Tab
                icon={<AccountCircleIcon />}
                iconPosition="start"
                label="المعلومات الشخصية"
                onClick={() => handleScroll("info")}
              />
              <Tab
                icon={<LockIcon />}
                iconPosition="start"
                label="تغيير كلمة المرور"
                onClick={() => handleScroll("password")}
              />
              <Tab
                icon={<SecurityIcon />}
                iconPosition="start"
                label="التحقق بخطوتين"
                onClick={() => handleScroll("twofa")}
              />
              <Tab
                icon={<DeleteIcon />}
                iconPosition="start"
                label="حذف الحساب"
                onClick={() => handleScroll("delete")}
              />
            </Tabs>
          </Paper>

          {/* المحتوى */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* وضع الثيم */}
            <Paper
              sx={{
                bgcolor: (theme) => theme.palette.background.ma2,
                p: 3,
                borderRadius: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6">وضع الثيم</Typography>
                  <Typography variant="body2" color="text.secondary">
                    فاتح / داكن
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Switch
                    checked={theme}
                    onChange={toggleTheme}
                    color="primary"
                  />
                  {theme ? (
                    <Moon color="#FF8E29" />
                  ) : (
                    <Sun color="#FF8E29" />
                  )}
                </Box>
              </Box>
            </Paper>

            {/* المعلومات الشخصية */}
            <Paper
              ref={sectionsRef.info}
              sx={{
                bgcolor: (theme) => theme.palette.background.ma2,
                p: 3,
                borderRadius: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h6" gutterBottom>
                المعلومات الأساسية
              </Typography>
              <Box
                display="grid"
                gridTemplateColumns={{ sm: "1fr 1fr", xs: "1fr" }}
                gap={2}
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
                      backgroundColor: (theme) => theme.palette.background.ma,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "30px",
                        backgroundColor: (theme) => theme.palette.background.ma,
                        "& fieldset": { border: "none" },
                      },
                      "& label": {
                        color: (theme) => theme.palette.text.primary,
                      },
                    }}
                  />
                ))}

                <FormControl
                  fullWidth
                  sx={{
                    borderRadius: "30px",
                    backgroundColor: (theme) => theme.palette.background.ma,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    "& label": { color: (theme) => theme.palette.text.primary },
                  }}
                >
                  <InputLabel>الجنس</InputLabel>
                  <Select
                    value=""
                    label="الجنس"
                    sx={{
                      borderRadius: "30px",
                      backgroundColor: (theme) => theme.palette.background.ma,
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    <MenuItem value="Female">أنثى</MenuItem>
                    <MenuItem value="Male">ذكر</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  bgcolor: "primary.main",
                  color: "#fff",
                  borderRadius: "30px",
                }}
              >
                حفظ التغييرات
              </Button>
            </Paper>

            {/* تغيير كلمة المرور */}
            <Paper
              ref={sectionsRef.password}
              sx={{
                bgcolor: (theme) => theme.palette.background.ma2,
                p: 3,
                borderRadius: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h6" gutterBottom>
                تغيير كلمة المرور
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                {[
                  { label: "كلمة المرور الحالية", type: "password" },
                  { label: "كلمة المرور الجديدة", type: "password" },
                  { label: "تأكيد كلمة المرور", type: "password" },
                ].map((field) => (
                  <TextField
                    key={field.label}
                    label={field.label}
                    type={field.type}
                    fullWidth
                    sx={{
                      borderRadius: "30px",
                      backgroundColor: (theme) => theme.palette.background.ma,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "30px",
                        backgroundColor: (theme) => theme.palette.background.ma,
                        "& fieldset": { border: "none" },
                      },
                      "& label": {
                        color: (theme) => theme.palette.text.primary,
                      },
                    }}
                  />
                ))}

                <Box>
                  <Typography variant="subtitle2">
                    متطلبات كلمة المرور:
                  </Typography>
                  <ul style={{ paddingInlineStart: 20, opacity: 0.8 }}>
                    <li>رمز خاص واحد على الأقل</li>
                    <li>6 أحرف على الأقل</li>
                    <li>رقم واحد على الأقل (يفضل 2)</li>
                    <li>قم بتغييرها بانتظام</li>
                  </ul>
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "primary.main",
                    color: "#fff",
                    borderRadius: "30px",
                  }}
                >
                  تحديث كلمة المرور
                </Button>
              </Box>
            </Paper>

            {/* التحقق بخطوتين */}
            <Paper
              ref={sectionsRef.twofa}
              sx={{
                bgcolor: (theme) => theme.palette.background.ma2,
                p: 3,
                borderRadius: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h6" gutterBottom>
                التحقق بخطوتين
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                sx={{ borderRadius: "10px" }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>مفتاح الأمان</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ borderRadius: "30px" }}
                  >
                    إضافة
                  </Button>
                </Box>
                <Divider />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography>رقم SMS</Typography>
                    <Typography variant="body2" color="text.secondary">
                      رقمك: 0995658340
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ borderRadius: "30px" }}
                  >
                    تعديل
                  </Button>
                </Box>
                <Divider />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography>تطبيق المصادقة</Typography>
                    <Typography variant="body2" color="text.secondary">
                      لا يوجد تطبيق مفعّل
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ borderRadius: "30px" }}
                  >
                    إعداد
                  </Button>
                </Box>
              </Box>
            </Paper>

            {/* حذف الحساب */}
            <Paper
              ref={sectionsRef.delete}
              sx={{
                bgcolor: (theme) => theme.palette.background.ma2,
                p: 3,
                borderRadius: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h6" gutterBottom>
                حذف الحساب
              </Typography>
              <Typography variant="body2" color="text.secondary">
                عند حذف الحساب، سيتم فقدان الوصول إلى جميع خدمات Front وسيتم حذف
                بياناتك بشكل دائم. يمكنك التراجع خلال 14 يومًا.
              </Typography>
              <FormGroup sx={{ mt: 2 }}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="أؤكد أنني أرغب في حذف الحساب"
                />
              </FormGroup>
              <Box mt={2} display="flex" gap={2}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "primary.main",
                    color: "#fff",
                    borderRadius: "30px",
                  }}
                >
                  حذف
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}
