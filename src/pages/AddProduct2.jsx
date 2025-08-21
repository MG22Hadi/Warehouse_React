import { useTheme } from "@mui/material/styles";
import MainLayout from "../MainLayout";
import Product2 from "../components/Product2";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddProduct2({ mode, toggleTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const location = useLocation();
  const initialData = location.state || {};

  const handleNext = (formData) => {
    navigate("/Addproduct3", { state: { formData } });
  };

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="اضافة منتج">
      <div
        className="w-full min-h-screen p-8 rounded-[20px] mx-auto"
        dir="rtl"
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Product2 onNext={handleNext} initialData={initialData} />
      </div>
    </MainLayout>
  );
}
