import { useTheme } from "@mui/material/styles";
import MainLayout from "../MainLayout";
import Product3 from "../components/Product3";

export default function AddProduct3({ mode, toggleTheme }) {
  const theme = useTheme();

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="اضافة منتج">
      <div
        className="w-full min-h-screen p-8 rounded-[20px] mx-auto"
        dir="rtl"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Product3 />
      </div>
    </MainLayout>
  );
}
