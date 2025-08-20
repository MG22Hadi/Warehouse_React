import { useTheme } from "@mui/material/styles";
import MainLayout from "../MainLayout";
import Product1 from "../components/Product1";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddProduct1({ mode, toggleTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // استقبال البيانات القادمة من الصفحة الثانية عند الرجوع
  const initialFormData = location.state?.formData || {};

  const handleNext = (formData) => {
    navigate("/Addproduct2", { state: { formData } });
  };

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="اضافة منتج">
      <div
        className="w-full min-h-screen p-8 rounded-[20px] mx-auto"
        dir="rtl"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Product1 onNext={handleNext} initialData={initialFormData} />
      </div>
    </MainLayout>
  );
}
