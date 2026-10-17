# Thiệp mời tốt nghiệp

## Lưu RSVP vào Google Sheets

1. Tạo một Google Sheet mới.
2. Trong Sheet, mở **Tiện ích mở rộng > Apps Script**.
3. Dán nội dung file `google-apps-script/Code.gs` vào trình soạn thảo và lưu.
4. Chọn **Triển khai > Lần triển khai mới > Ứng dụng web**.
5. Chọn **Thực thi với tư cách: Tôi** và **Ai có quyền truy cập: Bất kỳ ai**.
6. Triển khai, cấp quyền, rồi sao chép URL kết thúc bằng `/exec`.
7. Tạo file `.env.local` ở thư mục gốc:

```env
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

8. Khởi động lại `npm run dev`. Dữ liệu sẽ xuất hiện trong tab **RSVP** của Sheet.

Nếu sửa mã Apps Script sau này, vào **Quản lý hoạt động triển khai**, chỉnh sửa và tạo phiên bản mới.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
