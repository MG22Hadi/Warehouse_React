import React, { useState } from "react";
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
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Moon,
  Sun,
} from "lucide-react";
import MainLayout from "../MainLayout";

export default function Settings({ mode, toggleTheme }) {
  const [tab, setTab] = useState(0);
  const themeIsDark = mode === "dark";

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="الإعدادات">
      <Box
        dir="rtl"
        sx={{
          minHeight: "100vh",
          bgcolor: themeIsDark ? "background.default" : "background.default",
          color: "text.primary",
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
          <Paper sx={{ bgcolor: "background.paper" }}>
            <Tabs
              orientation="vertical"
              value={tab}
              onChange={(e, newVal) => setTab(newVal)}
              variant="scrollable"
              aria-label="settings tabs"
              sx={{ px: 2, py: 2 }}
              TabIndicatorProps={{ style: { background: "#FF8E29" } }}
            >
              <Tab label="المعلومات الشخصية" />
              <Tab label="تغيير كلمة المرور" />
              <Tab label="التحقق بخطوتين" />
              <Tab label="حذف الحساب" />
            </Tabs>
          </Paper>

          {/* المحتوى */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* وضع الثيم */}
            <Paper sx={{ bgcolor: "background.paper", p: 3 }}>
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
                    checked={themeIsDark}
                    onChange={toggleTheme}
                    color="primary"
                  />
                  {themeIsDark ? (
                    <Moon color="#FF8E29" />
                  ) : (
                    <Sun color="#FF8E29" />
                  )}
                </Box>
              </Box>
            </Paper>

            {/* المحتوى حسب التبويب */}
            {tab === 0 && (
              <Paper sx={{ bgcolor: "background.paper", p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  المعلومات الأساسية
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns={{ sm: "1fr 1fr", xs: "1fr" }}
                  gap={2}
                >
                  <TextField label="الاسم الأول" defaultValue="ملك" fullWidth />
                  <TextField label="الكنية" defaultValue="مبارك" fullWidth />
                  <FormControl fullWidth>
                    <InputLabel>الجنس</InputLabel>
                    <Select defaultValue="Female" label="الجنس">
                      <MenuItem value="Female">أنثى</MenuItem>
                      <MenuItem value="Male">ذكر</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="تاريخ الميلاد"
                    defaultValue="٥ فبراير ٢٠٠٤"
                    fullWidth
                  />
                  <TextField
                    label="البريد الإلكتروني"
                    defaultValue="malakmobark4@gmail.com"
                    fullWidth
                  />
                  <TextField
                    label="رقم الهاتف"
                    defaultValue="0995658340"
                    fullWidth
                  />
                  <TextField label="العنوان" defaultValue="دمشق" fullWidth />
                </Box>
                <Button
                  variant="contained"
                  sx={{ mt: 3, bgcolor: "primary.main", color: "#fff" }}
                >
                  حفظ التغييرات
                </Button>
              </Paper>
            )}

            {tab === 1 && (
              <Paper sx={{ bgcolor: "background.paper", p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  تغيير كلمة المرور
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField label="كلمة المرور الحالية" type="password" />
                  <TextField label="كلمة المرور الجديدة" type="password" />
                  <TextField label="تأكيد كلمة المرور" type="password" />
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
                    sx={{ bgcolor: "primary.main", color: "#fff" }}
                  >
                    تحديث كلمة المرور
                  </Button>
                </Box>
              </Paper>
            )}

            {tab === 2 && (
              <Paper sx={{ bgcolor: "background.paper", p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  التحقق بخطوتين
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>مفتاح الأمان</Typography>
                    <Button variant="outlined" color="primary">
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
                    <Button variant="outlined" color="primary">
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
                    <Button variant="outlined" color="primary">
                      إعداد
                    </Button>
                  </Box>
                </Box>
              </Paper>
            )}

            {tab === 3 && (
              <Paper sx={{ bgcolor: "background.paper", p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  حذف الحساب
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  عند حذف الحساب، سيتم فقدان الوصول إلى جميع خدمات Front وسيتم
                  حذف بياناتك بشكل دائم. يمكنك التراجع خلال 14 يومًا.
                </Typography>
                <FormGroup sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="أؤكد أنني أرغب في حذف الحساب"
                  />
                </FormGroup>
                <Box mt={2} display="flex" gap={2}>
                  <Button variant="outlined" color="primary">
                    معرفة المزيد
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "primary.main", color: "#fff" }}
                  >
                    حذف
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}
