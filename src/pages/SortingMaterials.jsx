import { useTheme } from "@mui/material/styles";
import MainLayout from "../MainLayout";
import SortingMaterialsForm from "../components/SortingMaterialsForm";

export default function SortingMaterials({ mode, toggleTheme }) {
  const theme = useTheme();

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="فرز المنتجات">
      <div
        className="w-full min-h-screen p-8 rounded-[20px] mx-auto"
        dir="rtl"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <SortingMaterialsForm />
      </div>
    </MainLayout>
  );
}
