# انتخاب تصویر پایه
FROM node:18

# تنظیم دایرکتوری کاری داخل کانتینر
WORKDIR /app

# نصب وابستگی‌ها
COPY package.json yarn.lock ./
RUN yarn install

# کپی فایل‌های پروژه
COPY . .

# ساخت پروژه برای تولید (در صورت نیاز)
RUN yarn build

# پیکربندی پورت
EXPOSE 5173

# اجرای پروژه (برای حالت توسعه)
CMD ["yarn", "dev"]
