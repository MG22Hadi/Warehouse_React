import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MainLayout from "../MainLayout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { BASE_URL } from "../api/axiosInstance";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

export default function AddUsers({ mode, toggleTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const initialData = location.state?.data || location.state || {};

  const token = localStorage.getItem("token");
  const realId = id || initialData.id;

  useEffect(() => {
    if (realId) {
      axios
        .get(`${BASE_URL}/v1/users/${realId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const user = res.data?.data || res.data || {};
          setName(user.name || "");
          setPhone(user.phone || "");
          setEmail(user.email || "");
          setPassword("");
          setShowPasswordInput(false); // خفي حقل التغيير افتراضياً
          setIsPasswordDirty(false);
          setJobTitle(user.job_title ?? user.jobTitle ?? "");
          setDepartmentId(user.department_id ?? user.departmentId ?? "");
          setGender(user.gender ?? "");
          setAddress(user.address ?? "");
          setFacebookUrl(user.facebook_url ?? "");
          setInstagramUrl(user.instagram_url ?? "");
        })
        .catch((err) => console.error(err));
    }
  }, [id, token]);

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

  const steps = [
    { label: "معلومات المستخدم", key: "info" },
    { label: "العنوان الحالي", key: "password" },
    { label: "مواقع التواصل", key: "twofa" },
    { label: "مراجعة", key: "delete" },
  ];

  // State لكل الحقول
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState(initialData.name || "");
  const [phone, setPhone] = useState(initialData.phone || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isPasswordDirty, setIsPasswordDirty] = useState(false);
  const [jobTitle, setJobTitle] = useState(
    initialData.job_title ?? initialData.jobTitle ?? ""
  );
  const [departmentId, setDepartmentId] = useState(
    initialData.department_id ?? initialData.departmentId ?? ""
  );
  const [gender, setGender] = useState(initialData.gender ?? "");
  const [address, setAddress] = useState(initialData.address ?? "");
  const [facebook_url, setFacebookUrl] = useState(
    initialData.facebook_url ?? ""
  );
  const [instagram_url, setInstagramUrl] = useState(
    initialData.instagram_url ?? ""
  );
  // const [gender, setGender] = useState(initialData.gender ?? "");
  // const [gender, setGender] = useState(initialData.gender ?? "");

  const fields = [
    {
      label: "الاسم الكامل",
      icon: <PersonIcon />,
      value: name,
      setter: setName,
    },
    { label: "الهاتف", icon: <PhoneIcon />, value: phone, setter: setPhone },
    {
      label: "البريد الإلكتروني",
      icon: <EmailIcon />,
      value: email,
      setter: setEmail,
    },
    {
      label: "كلمة المرور",
      icon: <LockIcon />,
      value: password,
      setter: setPassword,
    },
    {
      label: "القسم",
      icon: <CategoryIcon />,
      value: departmentId,
      setter: setDepartmentId,
      select: true,
      options: departments.map((d) => ({ value: d.id, label: d.name })),
    },
    {
      label: "المسمى الوظيفي",
      icon: <WorkIcon />,
      value: jobTitle,
      setter: setJobTitle,
    },
    {
      label: "الجنس",
      icon: <PersonIcon />,
      value: gender,
      setter: setGender,
      select: true,
      options: [
        { value: "ذكر", label: "ذكر" },
        { value: "أنثى", label: "أنثى" },
      ],
    },
  ];

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/departments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setDepartments(res.data.data);
      } catch (err) {
        console.error("خطأ في جلب الأقسام:", err);
      }
    };
    fetchDepartments();
  }, [token]);

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
          bgcolor: theme.palette.background.paper,
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
                          bgcolor: "#FF8E29",
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

          {/* العمود الرئيسي */}
          <Paper
            sx={{
              bgcolor: theme.palette.background.ma2,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              المعلومات الأساسية
            </Typography>
            <Box
              display="grid"
              gridTemplateColumns={{ sm: "1fr 1fr", xs: "1fr" }}
              justifyItems="center"
              gap={3}
            >
              {fields.map((field) => {
                // لو الحقل هو كلمة المرور نطبّق إعدادات خاصة (نوع الحقل + أيقونة العين)
                const isPasswordField = field.label === "كلمة المرور";

                return (
                  <TextField
                    key={field.label}
                    label={field.label}
                    // لو هو كلمة المرور نستخدم state password، وإلا نستخدم value الاعتيادي
                    value={isPasswordField ? password : field.value}
                    onChange={(e) => {
                      if (isPasswordField) {
                        setPassword(e.target.value);
                        setIsPasswordDirty(e.target.value.length > 0); // فقط إذا كتب كلمة مرور
                      } else {
                        field.setter(e.target.value);
                      }
                    }}
                    fullWidth
                    // لو هو password نغير النوع بناء على showPassword
                    type={
                      isPasswordField
                        ? showPassword
                          ? "text"
                          : "password"
                        : undefined
                    }
                    select={field.select || false}
                    InputProps={{
                      startAdornment: field.icon && (
                        <Box
                          sx={{
                            mr: 1,
                            display: "flex",
                            alignItems: "center",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {field.icon}
                        </Box>
                      ),
                      endAdornment: isPasswordField ? (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((s) => !s)}
                            edge="end"
                            size="large"
                            sx={{ p: 0.4 }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ) : undefined,
                    }}
                    sx={{
                      borderRadius: "30px",
                      backgroundColor: theme.palette.background.note1,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "30px",
                        backgroundColor: theme.palette.background.note1,
                        "& fieldset": { border: "none" },
                      },
                      ...(field.label === "الجنس" && {
                        gridColumn: "1 / -1",
                        maxWidth: "400px",
                        mx: "auto",
                      }),
                      ...isPasswordField,
                    }}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            borderRadius: "30px",
                            backgroundColor: theme.palette.background.note1,
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                            mt: 1,
                          },
                        },
                      },
                    }}
                    placeholder={
                      isPasswordField && id
                        ? "اتركه فارغًا إذا لم ترد تغييره"
                        : undefined
                    }
                  >
                    {field.select &&
                      field.options?.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                  </TextField>
                );
              })}
            </Box>

            <Box display="flex" mt={8}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: "#fff",
                  borderRadius: "30px",
                  px: 6,
                  py: 1.5,
                  fontSize: "16px",
                  "&:hover": { bgcolor: "#ff7f00" },
                  mr: "auto",
                }}
                onClick={() =>
                  navigate("/AddUsers2", {
                    state: {
                      // تمرير id بشكل صريح دائماً
                      id: id || initialData.id || undefined,
                      name,
                      phone,
                      email,
                      ...(isPasswordDirty ? { password } : {}),
                      isPasswordDirty,
                      job_title: jobTitle,
                      department_id: departmentId
                        ? Number(departmentId)
                        : undefined,
                      department_name:
                        departments.find((d) => d.id === Number(departmentId))
                          ?.name ||
                        initialData.department_name ||
                        "",
                      gender,
                      address: address ?? initialData.address ?? "",
                      detailedAddress: initialData.detailedAddress ?? "",
                      city: initialData.city ?? "",
                      country: initialData.country ?? "",
                      facebook_url:
                        facebook_url ?? initialData.facebook_url ?? "",
                      instagram_url:
                        instagram_url ?? initialData.instagram_url ?? "",
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
