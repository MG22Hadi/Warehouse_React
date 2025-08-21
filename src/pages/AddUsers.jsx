import React, { useRef, useState ,useEffect} from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../MainLayout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import axios from "axios";

export default function AddUsers({ mode, toggleTheme }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/v1/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setName(res.data.name);
          setPhone(res.data.phone);
          setEmail(res.data.email);
          setPassword(""); // كلمة المرور عادة لا تُرجع
          setJobTitle(res.data.jobTitle);
          setDepartmentId(res.data.departmentId);
        });
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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [departmentId, setDepartmentId] = useState("");

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
    },
    {
      label: "المسمى الوظيفي",
      icon: <WorkIcon />,
      value: jobTitle,
      setter: setJobTitle,
    },
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
            <Typography variant="h6" gutterBottom>
              المعلومات الأساسية
            </Typography>
            <Box
              display="grid"
              gridTemplateColumns={{ sm: "1fr 1fr", xs: "1fr" }}
              gap={3}
            >
              {fields.map((field) => (
                <TextField
                  key={field.label}
                  label={field.label}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  fullWidth
                  // select={field.select || false}
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
                >
                  {/* {field.select &&  (
                    <>
                      <MenuItem value={1}>IT</MenuItem>
                      <MenuItem value={2}>HR</MenuItem>
                      <MenuItem value={3}>Finance</MenuItem>
                    </>
                  )} */}
                </TextField>
              ))}
            </Box>

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
                  ml: "auto",
                }}
                onClick={() =>
                  navigate("/AddUsers2", {
                    state: {
                      name,
                      phone,
                      email,
                      password,
                      jobTitle,
                      departmentId,
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
