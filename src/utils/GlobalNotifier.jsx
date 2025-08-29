import { useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

/**
 * دالة بسيطة لتخمين نوع الرسالة (variant) من النص:
 * - لو تحتوي كلمات مثل: 'خطأ' 'error' 'فشل' => error
 * - لو تحتوي 'نجح' 'تم' 'success' => success
 * - لو تحتوي 'تحذير' 'warning' => warning
 * - غير ذلك => info
 */
function detectVariant(message) {
  if (!message && message !== 0) return "info";
  const m = String(message).toLowerCase();
  const errorWords = ["خطأ", "error", "failed", "فشل", "fail"];
  const successWords = ["نجح", "تم", "success", "saved", "تمت", "تم الحفظ"];
  const warnWords = ["تحذير", "warning", "تنبيه"];

  if (errorWords.some((w) => m.includes(w))) return "error";
  if (successWords.some((w) => m.includes(w))) return "success";
  if (warnWords.some((w) => m.includes(w))) return "warning";
  return "info";
}

export default function GlobalNotifier() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // احفظ الـ original للفوليباك لو ضروري
    const originalAlert = window.alert;
    const originalConsoleError = console.error;

    // إعادة تعريف window.alert
    window.alert = (msg, options = {}) => {
      // لو المستخدم مرّر كائن بدل نص، حاول أخذ الحقل message
      const text = typeof msg === "object" && msg !== null ? (msg.message || JSON.stringify(msg)) : String(msg);
      const variant = options.variant || detectVariant(text);
      enqueueSnackbar(text, { variant, autoHideDuration: options.autoHideDuration ?? 3500 });
    };

    // اختياري: لو في console.error نبي نعرض toast سريع (غير مطلوب لكن مفيد أثناء التطوير)
    console.error = (...args) => {
      try {
        const text = args.map(a => (typeof a === "object" ? (a.message || JSON.stringify(a)) : String(a))).join(" | ");
        enqueueSnackbar(text || "Error", { variant: "error", autoHideDuration: 6000 });
      } catch (e) {
        // لا تفشل لو صار خطأ هنا
      }
      originalConsoleError.apply(console, args);
    };

    // axios interceptor عام لالتقاط الأخطاء وعرضها كتوست
    const resInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // استخرج رسالة مفيدة إن أمكن
        const serverMessage =
          error?.response?.data?.message ||
          error?.response?.data?.errors ||
          error?.message ||
          "حصل خطأ في الاتصال بالخادم";
        // لو serverMessage عبارة عن كائن errors، حوّله إلى نص
        let text = serverMessage;
        if (typeof serverMessage === "object") {
          try {
            // لو صيغة Laravel-like errors
            if (serverMessage.errors) {
              const flat = Object.values(serverMessage.errors).flat();
              text = flat.join(" - ");
            } else {
              text = JSON.stringify(serverMessage);
            }
          } catch (e) {
            text = String(serverMessage);
          }
        }
        enqueueSnackbar(text, { variant: "error", autoHideDuration: 6000 });
        return Promise.reject(error);
      }
    );

    // تنظيف عند التفكيك
    return () => {
      window.alert = originalAlert;
      console.error = originalConsoleError;
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [enqueueSnackbar]);

  return null; // لا يُعرض شيء في الـ DOM
}
