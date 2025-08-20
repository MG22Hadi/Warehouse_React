import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

export default function CreateEntryNote({ open, onClose }) {
  const [rows, setRows] = useState(
    Array.from({ length: 11 }, () => ({
      material: null,
      quantity: "",
      details: {}, // باقي المعلومات
    }))
  );

  const [materials, setMaterials] = useState([]);

  // جلب المواد من API
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMaterials(res.data);
      })
      .catch((err) => {
        console.error("خطأ في جلب المواد:", err);
      });
  }, []);

  // تغيير اختيار مادة
  const handleMaterialChange = (index, material) => {
    const updated = [...rows];
    updated[index].material = material;
    updated[index].details = material || {}; // تعبئة باقي المعلومات
    setRows(updated);
  };

  // تغيير الكمية
  const handleQuantityChange = (index, value) => {
    const updated = [...rows];
    updated[index].quantity = value;
    setRows(updated);
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8000/api/entry-notes",
        { rows },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error("خطأ في الحفظ:", err);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>إضافة مذكرة إدخال</DialogTitle>
      <DialogContent>
        <table className="w-full border-collapse border text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">اسم المادة</th>
              <th className="border p-2">الكمية</th>
              <th className="border p-2">الوصف</th>
              <th className="border p-2">الكود</th>
              <th className="border p-2">الوحدة</th>
              {/* فيك تضيف باقي الحقول حسب جدولك */}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <Autocomplete
                    options={materials}
                    getOptionLabel={(option) => option.name || ""}
                    onChange={(e, value) => handleMaterialChange(index, value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="اختر مادة"
                        variant="outlined"
                      />
                    )}
                  />
                </td>
                <td className="border p-2">
                  <TextField
                    type="number"
                    value={row.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                  />
                </td>
                <td className="border p-2">{row.details.description || "-"}</td>
                <td className="border p-2">{row.details.code || "-"}</td>
                <td className="border p-2">{row.details.unit || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          إلغاء
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}
