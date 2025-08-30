// printUtils.js — طباعة محسّنة A4 مع header مخصوص وإخفاء أزرار/روابط
export function printElementForA4(element) {
  try {
    if (!element) {
      console.warn("printElementForA4: العنصر غير موجود");
      return;
    }

    // خذ فقط روابط CSS الخارجية (لا نأخذ <style> الكبيرة)
    const linkNodes = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    );
    const linksHtml = linkNodes.map((ln) => ln.outerHTML).join("\n");
    const base = `<base href="${location.origin}">`;

    // انشاء iframe مخفي
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);

    const iDoc = iframe.contentDocument || iframe.contentWindow.document;

    const docStart = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          ${base}
          ${linksHtml}
          <style>
            /* صف A4، مساحات بسيطة */
            @page { size: A4 portrait; margin: 12mm; }
            html, body {
              margin:0; padding:0; direction: rtl;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
              -webkit-print-color-adjust: exact; print-color-adjust: exact;
              color: #111;
            }

            /* الهيدر المطبوع: التاريخ على اليمين، الدولة على اليسار */
            .print-header {
              display:flex;
              justify-content: space-between;
              align-items: center;
              padding: 6px 8px;
              margin-bottom: 6px;
              border-bottom: 1px solid rgba(0,0,0,0.12);
              font-size: 14px;
              font-weight: 600;
            }

            .print-wrapper {
              box-sizing: border-box;
              padding: 6px;
            }

            /* نجعل الجدول يشغل العرض ويظهر أوضح في الطباعة */
            table {
              width: 100% !important;
              border-collapse: collapse;
              table-layout: fixed;
              font-size: 12px;
            }
            thead th {
              padding: 8px;
              text-align: right;
              font-weight: 700;
            }
            tbody td {
              padding: 8px;
              vertical-align: top;
              word-break: break-word;
              border-top: 1px solid rgba(0,0,0,0.08);
            }

            /* إجبار الصفوف على عدم الانقسام داخل الصفحة */
            tr { page-break-inside: avoid; -webkit-page-break-inside: avoid; }

            /* بعض التعديلات لجعل المحتوى يملأ الصفحة أكثر */
            .print-wrapper .mb-6 { margin-bottom: 12px !important; }
            .print-wrapper h2 { font-size: 18px; margin: 0 0 6px 0; }
            .print-meta p { font-size: 13px; margin: 2px 0; color: rgba(0,0,0,0.7); }

            /* اخفاء أي عنصر معنونا no-print */
            .no-print { display: none !important; }

          </style>
        </head>
        <body>
        </body>
      </html>`;

    iDoc.open();
    iDoc.write(docStart);
    iDoc.close();

    // clone العنصر (بدون لمس الأصل)
    const clone = element.cloneNode(true);

    // إزالة أزرار الطباعة والـ input/button داخل النسخة
    const toRemove = clone.querySelectorAll(
      "button, input, .no-print, [data-no-print]"
    );
    toRemove.forEach((n) => n.remove());

    // تحويل الروابط إلى نص (نبدّل <a> بنص الرابط لعدم ظهور الروابط كرابط)
    const links = clone.querySelectorAll("a");
    links.forEach((a) => {
      const txt = document.createTextNode(a.textContent || "");
      a.parentNode.replaceChild(txt, a);
    });

    // إنشاء header المطبوع (التاريخ / الدولة)
    const dateStr = new Date().toLocaleDateString("ar-EG");
    const headerHtml = iDoc.createElement("div");
    headerHtml.className = "print-header";
    // التاريخ على اليمين (لـ RTL: نضع التاريخ في العنصر الثاني ليظهر جهة اليمين)
    const rightSpan = iDoc.createElement("div");
    rightSpan.textContent = dateStr;
    const leftSpan = iDoc.createElement("div");
    leftSpan.textContent = "الجمهورية العربية السورية";
    // append in order: left then right (flex with justify-content:space-between)
    headerHtml.appendChild(leftSpan);
    headerHtml.appendChild(rightSpan);

    // لف المحتوى داخل wrapper لطباعة مرتبة
    const wrapper = iDoc.createElement("div");
    wrapper.className = "print-wrapper";

    // لو في عناصر داخل clone تريد تعديلها (مثلاً تقليص القيمة width:1205px) نقدر ننزع inline widths
    // لكن بما إنك منعت التعديل على التصميم الأصلي، نعالج فقط داخل الـ iframe: نزّل أي عرض صريح كبير جداً
    const nodesWithWidth = clone.querySelectorAll("[style]");
    nodesWithWidth.forEach((n) => {
      try {
        // نحذف خاصية width إن كانت كبيرة جداً (px > 1000)
        const s = n.getAttribute("style") || "";
        const newStyle = s.replace(/width\s*:\s*\d+px;?/gi, "");
        n.setAttribute("style", newStyle);
      } catch (e) {
        /* ignore */
      }
    });

    // أدخل header و النسخة إلى body الـ iframe
    try {
      iDoc.body.appendChild(headerHtml);
      wrapper.appendChild(clone);
      iDoc.body.appendChild(wrapper);
    } catch (appendErr) {
      // fallback: كتابة outerHTML مقطوع إذا append فشل
      iDoc.body.innerHTML = headerHtml.outerHTML + wrapper.outerHTML;
    }

    // اطبع ثم ازل الإطار
    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (err) {
        alert("تعذّر تنفيذ أمر الطباعة داخل الإطار.");
      }
      setTimeout(() => {
        try {
          document.body.removeChild(iframe);
        } catch (e) {}
      }, 800);
    }, 400);
  } catch (err) {
    alert("فشل إعداد الطباعة. جرّب إعادة تحميل الصفحة.");
  }
}
