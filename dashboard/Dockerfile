# انتخاب تصویر پایه
FROM node:18

# تنظیم دایرکتوری کاری داخل کانتینر
WORKDIR /app

# کپی فقط فایل‌های package.json و package-lock.json
COPY package*.json ./

# حذف node_modules و package-lock.json (در صورت وجود)
RUN rm -rf node_modules package-lock.json

RUN rm -rf node_modules package-lock.json

# نصب وابستگی‌ها با npm (با استفاده از legacy-peer-deps برای رفع تضاد وابستگی‌ها)
RUN npm install --legacy-peer-deps

# کپی فایل‌های پروژه
COPY . .

# ساخت پروژه برای تولید (در صورت نیاز)
RUN npm run build

# پیکربندی پورت
EXPOSE 5173

# اجرای پروژه (برای حالت توسعه)
CMD ["npm", "run", "dev"]
