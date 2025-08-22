import { useTheme } from "@mui/material/styles";
import MainLayout from "../MainLayout";
import Purchase from "../components/Purchase";

export default function PurchaseRequests({ mode, toggleTheme }) {
  const theme = useTheme();
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="">
      <div
        className="w-full min-h-screen p-8 rounded-[20px] mx-auto"
        dir="rtl"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Purchase />
      </div>
    </MainLayout>
  );
}
