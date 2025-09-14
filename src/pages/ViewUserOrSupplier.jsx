import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../MainLayout";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { BASE_URL } from "../api/axiosInstance";

export default function ViewUserOrSupplier({ mode, toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, type } = location.state || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url =
          type === "user"
            ? `${BASE_URL}/v1/users/${id}`
            : `${BASE_URL}/supplier/show/${id}`;

        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setData(response.data.data);
        } else {
          setSnackbar({
            open: true,
            message: "فشل جلب البيانات من السيرفر.",
            severity: "error",
          });
        }
      } catch (err) {
        setSnackbar({
          open: true,
          message: "تعذر الاتصال بالخادم أو البيانات غير موجودة.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id && type) fetchData();
  }, [id, type, token]);

  if (loading) {
    return (
      <MainLayout
        mode={mode}
        toggleTheme={toggleTheme}
        pageTitle="عرض البيانات"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (!data) {
    return (
      <MainLayout
        mode={mode}
        toggleTheme={toggleTheme}
        pageTitle="عرض البيانات"
      >
        <Box p={4}>
          <Typography color="error">لم يتم العثور على بيانات</Typography>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="عرض البيانات">
      <Box p={4}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            {type === "user" ? "بيانات الموظف" : "بيانات المورد"}
          </Typography>

          <Box mt={2} display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <Typography>
              <strong>الاسم:</strong> {data.name || "-"}
            </Typography>
            {type === "user" && (
              <>
                <Typography>
                  <strong>البريد:</strong> {data.email || "-"}
                </Typography>
                <Typography>
                  <strong>الهاتف:</strong> {data.phone || "-"}
                </Typography>
                <Typography>
                  <strong>الوظيفة:</strong> {data.job_title || "-"}
                </Typography>
                <Typography>
                  <strong>الجنس:</strong> {data.gender || "-"}
                </Typography>
                <Typography>
                  <strong>العنوان:</strong> {data.address || "-"}
                </Typography>
                <Typography>
                  <strong>الفيسبوك:</strong> {data.facebook_url || "-"}
                </Typography>
                <Typography>
                  <strong>الانستغرام:</strong> {data.instagram_url || "-"}
                </Typography>
              </>
            )}

            {type === "supplier" && (
              <>
                <Typography>
                  <strong>معلومات الاتصال:</strong> {data.contact_info || "-"}
                </Typography>
              </>
            )}
          </Box>

          <Box mt={4} mr={130}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#FF8E29",
                color: "#fff",
                borderRadius: "30px",
                px: 4,
              }}
              onClick={() => navigate(-1)}
            >
              رجوع
            </Button>
          </Box>
        </Paper>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </MainLayout>
  );
}
