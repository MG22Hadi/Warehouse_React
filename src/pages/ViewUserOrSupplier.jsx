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
} from "@mui/material";

export default function ViewUserOrSupplier({ mode, toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, type } = location.state || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url =
          type === "user"
            ? `http://localhost:8000/api/v1/users/${id}`
            : `http://localhost:8000/api/supplier/show/${id}`;

        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setData(response.data.data);
        } else {
          alert("فشل جلب البيانات");
        }
      } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
        alert("فشل جلب البيانات");
      } finally {
        setLoading(false);
      }
    };

    if (id && type) fetchData();
  }, [id, type]);

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

          <Box mt={4}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#FF8E29", borderRadius: "30px", px: 4 }}
              onClick={() => navigate(-1)}
            >
              رجوع
            </Button>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}
