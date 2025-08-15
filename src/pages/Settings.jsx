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
////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Tabs,
//   Tab,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Switch,
//   Divider,
//   OutlinedInput,
//   InputAdornment,
// } from "@mui/material";
// import { Moon, Sun } from "lucide-react";
// import MainLayout from "../MainLayout";

// // icons
// import { ReactComponent as UserIcon } from "../../assets/icons-settings/name.svg";

// export default function Settings({ mode, toggleTheme }) {
//   const [tab, setTab] = useState(0);
//   const themeIsDark = mode === "dark";

//   return (
//     <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="الإعدادات">
//       <Box
//         dir="rtl"
//         sx={{
//           minHeight: "100vh",
//           bgcolor: themeIsDark ? "background.default" : "background.default",
//           color: "text.primary",
//           px: 4,
//           py: 6,
//         }}
//       >
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: { lg: "240px 1fr", xs: "1fr" },
//             gap: 4,
//           }}
//         >
//           {/* التبويبات الجانبية */}
//           <Paper sx={{ bgcolor: "background.paper" }}>
//             <Tabs
//               orientation="vertical"
//               value={tab}
//               onChange={(e, newVal) => setTab(newVal)}
//               variant="scrollable"
//               aria-label="settings tabs"
//               sx={{ px: 2, py: 2 }}
//               TabIndicatorProps={{ style: { background: "#FF8E29" } }}
//             >
//               <Tab
//                 label="المعلومات الشخصية"
//                 icon={<img src={name} alt="" width={20} />}
//                 iconPosition="start"
//               />
//               <Tab
//                 label="تغيير كلمة المرور"
//                 icon={<img src="/* SVG_ICON */" alt="" width={20} />}
//                 iconPosition="start"
//               />
//               <Tab
//                 label="التحقق بخطوتين"
//                 icon={<img src="/* SVG_ICON */" alt="" width={20} />}
//                 iconPosition="start"
//               />
//               <Tab
//                 label="حذف الحساب"
//                 icon={<img src="/* SVG_ICON */" alt="" width={20} />}
//                 iconPosition="start"
//               />
//             </Tabs>
//           </Paper>

//           {/* المحتوى */}
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//             {/* وضع الثيم */}
//             <Paper sx={{ bgcolor: "background.paper", p: 3 }}>
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
//                 <Box>
//                   <Typography variant="h6">وضع الثيم</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     فاتح / داكن
//                   </Typography>
//                 </Box>
//                 <Box display="flex" alignItems="center" gap={2}>
//                   <Switch
//                     checked={themeIsDark}
//                     onChange={toggleTheme}
//                     color="primary"
//                   />
//                   {themeIsDark ? (
//                     <Moon color="#FF8E29" />
//                   ) : (
//                     <Sun color="#FF8E29" />
//                   )}
//                 </Box>
//               </Box>
//             </Paper>

//             {/* المحتوى حسب التبويب */}
//             {tab === 0 && (
//               <Paper sx={{ bgcolor: "background.paper", p: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   المعلومات الأساسية
//                 </Typography>
//                 <Box
//                   display="grid"
//                   gridTemplateColumns={{ sm: "1fr 1fr", xs: "1fr" }}
//                   gap={2}
//                 >
//                   <FormControl fullWidth variant="outlined">
//                     <InputLabel htmlFor="first-name">الاسم الأول</InputLabel>
//                     <OutlinedInput
//                       id="first-name"
//                       label="الاسم الأول"
//                       defaultValue="ملك"
//                       autoComplete="off"
//                       startAdornment={
//                         <InputAdornment position="start">
//                           <UserIcon style={{ width: 20, height: 20 }} />
//                         </InputAdornment>
//                       }
//                         />
//                   </FormControl>

//                   <FormControl fullWidth>
//                     <InputLabel htmlFor="last-name">الكنية</InputLabel>
//                     <OutlinedInput
//                       id="last-name"
//                       label="الكنية"
//                       defaultValue="مبارك"
//                       autoComplete="off"
//                     />
//                   </FormControl>

//                   <FormControl fullWidth>
//                     <InputLabel id="gender-label">الجنس</InputLabel>
//                     <Select
//                       labelId="gender-label"
//                       defaultValue="Female"
//                       label="الجنس"
//                     >
//                       <MenuItem value="Female">أنثى</MenuItem>
//                       <MenuItem value="Male">ذكر</MenuItem>
//                     </Select>
//                   </FormControl>

//                   <FormControl fullWidth>
//                     <InputLabel htmlFor="dob">تاريخ الميلاد</InputLabel>
//                     <OutlinedInput
//                       id="dob"
//                       label="تاريخ الميلاد"
//                       defaultValue="٥ فبراير ٢٠٠٤"
//                       autoComplete="off"
//                     />
//                   </FormControl>

//                   <FormControl fullWidth>
//                     <InputLabel htmlFor="email">البريد الإلكتروني</InputLabel>
//                     <OutlinedInput
//                       id="email"
//                       label="البريد الإلكتروني"
//                       defaultValue="malakmobark4@gmail.com"
//                       autoComplete="off"
//                     />
//                   </FormControl>

//                   <FormControl fullWidth>
//                     <InputLabel htmlFor="phone">رقم الهاتف</InputLabel>
//                     <OutlinedInput
//                       id="phone"
//                       label="رقم الهاتف"
//                       defaultValue="0995658340"
//                       autoComplete="off"
//                     />
//                   </FormControl>

//                   <FormControl fullWidth>
//                     <InputLabel htmlFor="address">العنوان</InputLabel>
//                     <OutlinedInput
//                       id="address"
//                       label="العنوان"
//                       defaultValue="دمشق"
//                       autoComplete="off"
//                     />
//                   </FormControl>
//                 </Box>

//                 <Button
//                   variant="contained"
//                   sx={{ mt: 3, bgcolor: "primary.main", color: "#fff" }}
//                 >
//                   حفظ التغييرات
//                 </Button>
//               </Paper>
//             )}

//             {/* كلمة المرور */}
//             {tab === 1 && (
//               <Paper sx={{ bgcolor: "background.paper", p: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   تغيير كلمة المرور
//                 </Typography>
//                 <Box display="flex" flexDirection="column" gap={2}>
//                   <FormControl fullWidth>
//                     <InputLabel>كلمة المرور الحالية</InputLabel>
//                     <OutlinedInput
//                       type="password"
//                       autoComplete="off"
//                       label="كلمة المرور الحالية"
//                     />
//                   </FormControl>
//                   <FormControl fullWidth>
//                     <InputLabel>كلمة المرور الجديدة</InputLabel>
//                     <OutlinedInput
//                       type="password"
//                       autoComplete="off"
//                       label="كلمة المرور الجديدة"
//                     />
//                   </FormControl>
//                   <FormControl fullWidth>
//                     <InputLabel>تأكيد كلمة المرور</InputLabel>
//                     <OutlinedInput
//                       type="password"
//                       autoComplete="off"
//                       label="تأكيد كلمة المرور"
//                     />
//                   </FormControl>

//                   <Box>
//                     <Typography variant="subtitle2">
//                       متطلبات كلمة المرور:
//                     </Typography>
//                     <ul style={{ paddingInlineStart: 20, opacity: 0.8 }}>
//                       <li>رمز خاص واحد على الأقل</li>
//                       <li>6 أحرف على الأقل</li>
//                       <li>رقم واحد على الأقل (يفضل 2)</li>
//                       <li>قم بتغييرها بانتظام</li>
//                     </ul>
//                   </Box>

//                   <Button
//                     variant="contained"
//                     sx={{ bgcolor: "primary.main", color: "#fff" }}
//                   >
//                     تحديث كلمة المرور
//                   </Button>
//                 </Box>
//               </Paper>
//             )}

//             {/* التحقق بخطوتين */}
//             {tab === 2 && (
//               <Paper sx={{ bgcolor: "background.paper", p: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   التحقق بخطوتين
//                 </Typography>
//                 <Box display="flex" flexDirection="column" gap={2}>
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Typography>مفتاح الأمان</Typography>
//                     <Button variant="outlined" color="primary">
//                       إضافة
//                     </Button>
//                   </Box>
//                   <Divider />
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Box>
//                       <Typography>رقم SMS</Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         رقمك: 0995658340
//                       </Typography>
//                     </Box>
//                     <Button variant="outlined" color="primary">
//                       تعديل
//                     </Button>
//                   </Box>
//                   <Divider />
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Box>
//                       <Typography>تطبيق المصادقة</Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         لا يوجد تطبيق مفعّل
//                       </Typography>
//                     </Box>
//                     <Button variant="outlined" color="primary">
//                       إعداد
//                     </Button>
//                   </Box>
//                 </Box>
//               </Paper>
//             )}

//             {/* حذف الحساب */}
//             {tab === 3 && (
//               <Paper sx={{ bgcolor: "background.paper", p: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   حذف الحساب
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   عند حذف الحساب، سيتم فقدان الوصول إلى جميع خدمات Front وسيتم
//                   حذف بياناتك بشكل دائم. يمكنك التراجع خلال 14 يومًا.
//                 </Typography>
//                 <FormGroup sx={{ mt: 2 }}>
//                   <FormControlLabel
//                     control={<Checkbox color="primary" />}
//                     label="أؤكد أنني أرغب في حذف الحساب"
//                   />
//                 </FormGroup>
//                 <Box mt={2} display="flex" gap={2}>
//                   <Button variant="outlined" color="primary">
//                     معرفة المزيد
//                   </Button>
//                   <Button
//                     variant="contained"
//                     sx={{ bgcolor: "primary.main", color: "#fff" }}
//                   >
//                     حذف
//                   </Button>
//                 </Box>
//               </Paper>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </MainLayout>
//   );
// }
/////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { Card, CardContent } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import { Switch } from "../components/ui/switch";
// import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
// } from "../components/ui/select";
// import { Checkbox } from "../components/ui/checkbox";
// import {
//   Sun,
//   Moon,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   CalendarDays,
// } from "lucide-react";
// import MainLayout from "../MainLayout";

// export default function Settings({ mode, toggleTheme }) {
//   const [darkMode, setDarkMode] = useState(true);
//   const [tab, setTab] = useState("profile");

//   return (
//     <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="الإعدادات">
//       <div
//         dir="rtl"
//         className={`min-h-screen p-6 ${
//           darkMode ? "bg-[#1e2235] text-white" : "bg-[#fffaf7] text-black"
//         }`}
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
//           {/* التبويبات الجانبية */}
//           <Tabs
//             defaultValue="profile"
//             value={tab}
//             onValueChange={setTab}
//             className="w-[240px]"
//           >
//             <TabsList className="flex flex-col gap-3 items-start bg-transparent">
//               <TabsTrigger value="profile">المعلومات الشخصية</TabsTrigger>
//               <TabsTrigger value="password">تغيير كلمة المرور</TabsTrigger>
//               <TabsTrigger value="2f">التحقق بخطوتين</TabsTrigger>
//               <TabsTrigger value="delete">حذف الحساب</TabsTrigger>
//             </TabsList>
//           </Tabs>

//           {/* المحتوى */}
//           <div className="flex-1 space-y-6">
//             {/* الوضع الليلي */}
//             <Card className={darkMode ? "bg-[#292d41]" : "bg-white"}>
//               <CardContent className="p-6 flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg font-semibold">وضع الثيم</h2>
//                   <span className="text-sm opacity-70">فاتح / داكن</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Switch
//                     checked={darkMode}
//                     onCheckedChange={() => setDarkMode(!darkMode)}
//                   />
//                   {darkMode ? (
//                     <Moon className="text-yellow-400" />
//                   ) : (
//                     <Sun className="text-yellow-400" />
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* المعلومات الشخصية */}
//             {tab === "profile" && (
//               <Card className={darkMode ? "bg-[#292d41]" : "bg-white"}>
//                 <CardContent className="p-6 space-y-4">
//                   <h2 className="text-lg font-semibold">المعلومات الأساسية</h2>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label>الاسم الأول</Label>
//                       <div className="relative">
//                         <User className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50" />
//                         <Input className="pr-10" defaultValue="ملك" />
//                       </div>
//                     </div>
//                     <div>
//                       <Label>الكنية</Label>
//                       <div className="relative">
//                         <User className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50" />
//                         <Input className="pr-10" defaultValue="مبارك" />
//                       </div>
//                     </div>
//                     <div>
//                       <Label>الجنس</Label>
//                       <Select defaultValue="Female">
//                         <SelectTrigger>اختر الجنس</SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Female">أنثى</SelectItem>
//                           <SelectItem value="Male">ذكر</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div>
//                       <Label>تاريخ الميلاد</Label>
//                       <div className="relative">
//                         <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50" />
//                         <Input className="pr-10" defaultValue="٥ فبراير ٢٠٠٤" />
//                       </div>
//                     </div>
//                     <div>
//                       <Label>البريد الإلكتروني</Label>
//                       <div className="relative">
//                         <Mail className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50" />
//                         <Input
//                           className="pr-10"
//                           defaultValue="malakmobark4@gmail.com"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <Label>رقم الهاتف</Label>
//                       <div className="relative">
//                         <Phone className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50" />
//                         <Input className="pr-10" defaultValue="0995658340" />
//                       </div>
//                     </div>
//                     <div className="col-span-2">
//                       <Label>العنوان</Label>
//                       <div className="relative">
//                         <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50" />
//                         <Input className="pr-10" defaultValue="دمشق" />
//                       </div>
//                     </div>
//                   </div>
//                   <Button className="bg-orange-500 text-white">
//                     حفظ التغييرات
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}

//             {/* تغيير كلمة المرور */}
//             {tab === "password" && (
//               <Card className={darkMode ? "bg-[#292d41]" : "bg-white"}>
//                 <CardContent className="p-6 space-y-4">
//                   <h2 className="text-lg font-semibold">تغيير كلمة المرور</h2>
//                   <Label>كلمة المرور الحالية</Label>
//                   <Input type="password" placeholder="********" />
//                   <Label>كلمة المرور الجديدة</Label>
//                   <Input type="password" placeholder="********" />
//                   <Label>تأكيد كلمة المرور</Label>
//                   <Input type="password" placeholder="********" />
//                   <div>
//                     <h4 className="font-medium text-sm">
//                       متطلبات كلمة المرور:
//                     </h4>
//                     <ul className="text-sm list-disc pr-5 mt-1 space-y-1 opacity-80">
//                       <li>رمز خاص واحد على الأقل</li>
//                       <li>6 أحرف على الأقل</li>
//                       <li>رقم واحد على الأقل (يفضل 2)</li>
//                       <li>قم بتغييرها بانتظام</li>
//                     </ul>
//                   </div>
//                   <Button className="bg-orange-500 text-white">
//                     تحديث كلمة المرور
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}

//             {/* التحقق بخطوتين */}
//             {tab === "2f" && (
//               <Card className={darkMode ? "bg-[#292d41]" : "bg-white"}>
//                 <CardContent className="p-6 space-y-4">
//                   <h2 className="text-lg font-semibold">التحقق بخطوتين</h2>
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center">
//                       <span>مفتاح الأمان</span>
//                       <Button
//                         variant="outline"
//                         className="border-orange-500 text-orange-500"
//                       >
//                         إضافة
//                       </Button>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span>رقم SMS</span>
//                       <span className="text-sm opacity-70">
//                         رقمك: 0995658340
//                       </span>
//                       <Button
//                         variant="outline"
//                         className="border-orange-500 text-orange-500"
//                       >
//                         تعديل
//                       </Button>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span>تطبيق المصادقة</span>
//                       <span className="text-sm opacity-70">
//                         لا يوجد تطبيق مفعّل
//                       </span>
//                       <Button
//                         variant="outline"
//                         className="border-orange-500 text-orange-500"
//                       >
//                         إعداد
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* حذف الحساب */}
//             {tab === "delete" && (
//               <Card className={darkMode ? "bg-[#292d41]" : "bg-white"}>
//                 <CardContent className="p-6 space-y-4">
//                   <h2 className="text-lg font-semibold">حذف الحساب</h2>
//                   <p className="text-sm opacity-80">
//                     عند حذف الحساب، سيتم فقدان الوصول إلى جميع خدمات Front وسيتم
//                     حذف بياناتك بشكل دائم. يمكنك التراجع خلال 14 يومًا.
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <Checkbox id="delete-check" />
//                     <Label htmlFor="delete-check">
//                       أؤكد أنني أرغب في حذف الحساب
//                     </Label>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       variant="outline"
//                       className="border-orange-500 text-orange-500"
//                     >
//                       معرفة المزيد
//                     </Button>
//                     <Button className="bg-orange-500 text-white">حذف</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }
