import React from "react";
import { exitNotes } from "../../data/exitNotesData";
import { useTheme } from "@mui/material";
import MainLayout from "../../MainLayout";


export default function ReceivingNotes({ mode, toggleTheme }) {
  const theme = useTheme();

  const cardColors = ["#FFFFFF", "#F5F5F5"]; 

  return (
    <MainLayout
      mode={mode}
      toggleTheme={toggleTheme}
      pageTitle="طلبات شراء"
    >
      <div
        className="min-h-screen w-full "
        style={{ backgroundColor: "#FFF4EA" }}
        dir="rtl"
      >
        <div className="space-y-4 pl-[31.33px] pr-[31.33px]">
          {eitNotes.map((note, index) => (
            <div
              key={note.id}
              className="w-full rounded-[20px] p-6 shadow-sm flex justify-between items-center px-8 py-8"
              style={{
                backgroundColor: cardColors[index % 2],
                border: "1px solid #E0E0E0",
              }}
            >
              <div className="p-[28.5px] w-[1077px] h-[87px] ">
                <div className="grid grid-cols-6 gap-6 w-full text-sm text-gray-700">
                  <div className="font-semibold">
                    <div className="text-gray-500 w-[38px] h-[21px] pt[15px] pb[15px]">
                      Code
                    </div>
                    <div className="w-[110px] h-[21px] pt[15px] pb[15px]">
                      {note.code}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 w-[35px] h-[21px] pt[15px] pb[15px]">
                      Date
                    </div>
                    <div className="w-[110px] h-[21px] pt[15px] pb[15px]">
                      {note.date}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 w-[133px] h-[21px]">
                      Target Warehouse
                    </div>
                    <div className="w-[110px] h-[21px]">{note.warehouse}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 w-[91px] h-[21px]">
                      Items Count
                    </div>
                    <div className="w-[110px] h-[21px]">{note.itemsCount}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 w-[48px] h-[21px]">
                      Status
                    </div>
                    <div className="flex items-center gap-1">
                      {note.status === "completed" ? (
                        <span className="text-green-600 w-[110px] h-[21px]">
                          ✔ Completed
                        </span>
                      ) : (
                        <span className="text-yellow-600 w-[110px] h-[21px]">
                          ⏳ Pending
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 w-[56px] h-[21px]">
                      Actions
                    </div>
                    <div className="text-blue-600 cursor-pointer w-[110px] h-[21px]">
                      purchase notes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
