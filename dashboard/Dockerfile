# انتخاب تصویر پایه
FROM node:18

# تنظیم دایرکتوری کاری داخل کانتینر
WORKDIR /app

# کپی فقط فایل‌های package.json و package-lock.json
COPY package*.json ./

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
