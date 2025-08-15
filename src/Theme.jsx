import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#FFF4EA", // خلفية الصفحة
              paper: "#FFFFFF", // كروت أو الحاويات
              calender: "#FFFFFF",
              card1: "#F5F5F5",
              card2: "#FFFFFF",
            },
            text: {
              primary: "#050F24", // النص الأساسي
              secondary: "#6F757E", // رمادي معتدل للنصوص الثانوية
            },
            primary: {
              main: "#FF8E29",
            },
            action: {
              selected: "#FFE9D6",
              hover: "#FFF4EA",
            },
            error: {
              main: "#DC2626",
              light: "#FEE2E2",
            },
          }
        : {
            background: {
              default: "#151D32",
              paper: "#292F45", // سطح العناصر
              calender: "#151D32",
              card1: "#353C56",
              card2: "#151D32",
            },
            text: {
              primary: "#FFFFFF", // نص واضح وأنيق
              secondary: "#9199AD", // رمادي فاتح للنص الثانوي
            },
            primary: {
              main: "#FF8E29", // يبقى ثابت لتمييز الزر الأساسي
            },
            action: {
              selected: "#3D2B1F",
              hover: "#151D32",
            },
            error: {
              main: "#F87171",
              light: "#7F1D1D",
            },
          }),
    },
  });

export default getTheme;

/**
 * export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#FFF4EA",
              paper: "#ffffff",
            },
            text: {
              primary: "#1E293B",
              secondary : "#050F24",
            },
            primary: {
              main: "#FF8E29",
            },
            action: {
              selected: "#FFF3E6", // لون خلفية العنصر النشط
            },
            error: {
              main: "#EF4444",
              light: "#FEE2E2",
            },
          }
        : {
            background: {
              default: "#151D32",
              paper: "#1E293B",
            },
            text: {
              primary: "#CCCDCD",
              secondary : "FFFFFF",
            },
            primary: {
              main: "#FF8E29", // نفس اللون بالوضع الداكن
            },
            action: {
              selected: "#452B00",
            },
            error: {
              main: "#EF4444",
              light: "#7F1D1D",
            },
          }),
    },
  });

 */
