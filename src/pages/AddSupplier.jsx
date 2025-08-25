import React, { useState ,useEffect} from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../MainLayout";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";

export default function AddSupplier({ mode, toggleTheme }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const token = localStorage.getItem("token");

  //  إذا في id → جلب بيانات المورد
  useEffect(() => {
    if (id) {
      const fetchSupplier = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/suppliers/${id}`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const supplier = response.data;
          setName(supplier.name);
          setContact(supplier.contact_info);
        } catch (error) {
          console.error("خطأ في جلب بيانات المورد:", error);
        }
      };
      fetchSupplier();
    }
  }, [id, token]);

  //  إضافة أو تعديل مورد
  const handleSaveSupplier = async () => {
    try {
      let response;
      if (id) {
        // تعديل
        response = await axios.put(
          `http://localhost:8000/api/suppliers/${id}`,
          { name, contact_info: contact },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // إضافة
        response = await axios.post(
          "http://localhost:8000/api/suppliers/store",
          { name, contact_info: contact },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.data.success) {
        // alert(response.data.message);
        navigate("/AllUsers");
      }
    } catch (error) {
      console.error("خطأ في الحفظ:", error);
      alert("حدث خطأ أثناء حفظ المورد");
    }
  };

  return (
    <MainLayout
      mode={mode}
      toggleTheme={toggleTheme}
      pageTitle={id ? "تعديل مورد" : "إضافة مورد"}
    >
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
          <Typography variant="h6" gutterBottom>
            {id ? "تعديل المعلومات الأساسية" : "المعلومات الأساسية"}
          </Typography>

          {/* الحقول */}
          <Box display="grid" gridTemplateColumns="1fr" gap={3}>
            {/* الاسم */}
            <TextField
              label="الاسم الكامل"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Box
                    sx={{
                      mr: 1,
                      display: "flex",
                      alignItems: "center",
                      color: "gray",
                    }}
                  >
                    <PersonIcon />
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

            {/* معلومات الاتصال */}
            <TextField
              label="معلومات الاتصال"
              fullWidth
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Box
                    sx={{
                      position: "relative",
                      width: 60,
                      height: 24,
                      borderRadius: "50%",

                      cursor: "pointer",
                      zIndex: 2,
                    }}
                  >
                    <PhoneIcon />
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
          </Box>

          {/* زر التالي */}
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
              onClick={handleSaveSupplier}
            >
              {id ? "حفظ التعديلات" : "التالي"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}
