# 🚀 مهریر فرانت‌اند - React

یک برنامه React پیشرفته با قابلیت‌های کامل برای مدیریت سیستم‌های صنعتی و تولیدی.

## 📋 فهرست مطالب

- [معرفی](#معرفی)
- [ویژگی‌ها](#ویژگی‌ها)
- [پیش‌نیازها](#پیش‌نیازها)
- [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
- [استفاده](#استفاده)
- [ساختار پروژه](#ساختار-پروژه)
- [تکنولوژی‌ها](#تکنولوژی‌ها)
- [استقرار](#استقرار)
- [مشارکت](#مشارکت)
- [لایسنس](#لایسنس)

## 🎯 معرفی

مهریر فرانت‌اند یک برنامه React پیشرفته است که برای مدیریت سیستم‌های صنعتی و تولیدی طراحی شده است. این برنامه شامل قابلیت‌های مدیریت سفارشات، تولید، ماشین‌آلات و گزارش‌گیری می‌باشد.

### 🌟 ویژگی‌های کلیدی

- **رابط کاربری مدرن**: طراحی زیبا و کاربرپسند با Material-UI
- **پشتیبانی از RTL**: پشتیبانی کامل از زبان فارسی و راست‌چین
- **تقویم شمسی**: تقویم جلالی برای تاریخ‌های فارسی
- **مدیریت حالت**: Redux Toolkit برای مدیریت state
- **فرم‌های پیشرفته**: Formik و React Hook Form
- **نمودارها و گراف‌ها**: ApexCharts و Chart.js
- **درگ و دراپ**: قابلیت drag & drop پیشرفته
- **چاپ**: قابلیت چاپ گزارش‌ها
- **بین‌المللی‌سازی**: پشتیبانی از چند زبان

## ✨ ویژگی‌ها

### 🏭 مدیریت تولید
- مدیریت سفارشات عادی و ویژه
- پیگیری فرآیند تولید
- مدیریت ماشین‌آلات
- گزارش‌گیری پیشرفته

### 📊 داشبورد و نمودارها
- نمودارهای تعاملی
- آمار و گزارش‌های زنده
- داشبورد قابل تنظیم

### �� مدیریت سیستم
- مدیریت کاربران و نقش‌ها
- تنظیمات سیستم
- پروفایل کاربری

### 📱 رابط کاربری
- طراحی ریسپانسیو
- پشتیبانی از تم‌های مختلف
- انیمیشن‌های روان

## 📋 پیش‌نیازها

قبل از شروع، مطمئن شوید که موارد زیر نصب شده‌اند:

- **Node.js** (نسخه ۱۸ یا بالاتر)
- **npm** یا **yarn**
- **Git**

### بررسی نسخه‌ها

```bash
node --version
npm --version
git --version
```

## 🚀 نصب و راه‌اندازی

### ۱. کلون کردن مخزن

```bash
git clone https://github.com/your-username/mahyar-frontend.git
cd mahyar-frontend
```

### ۲. نصب وابستگی‌ها

```bash
# با npm
npm install

# یا با yarn
yarn install
```

### ۳. راه‌اندازی محیط توسعه

```bash
# اجرای سرور توسعه
npm run dev

# یا با yarn
yarn dev
```

برنامه در آدرس `http://localhost:5173` در دسترس خواهد بود.

## 🛠️ استفاده

### دستورات موجود

```bash
# اجرای سرور توسعه
npm run dev

# ساخت نسخه تولید
npm run build

# پیش‌نمایش نسخه تولید
npm run preview

# بررسی کد
npm run lint

# تست با Cypress
npm run cypress:open

# ساخت نسخه RTL
npm run rtl
```

### متغیرهای محیطی

فایل `.env` را در ریشه پروژه ایجاد کنید:

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=مهریر فرانت‌اند
NODE_ENV=development
```

## 📁 ساختار پروژه

```
mahyar-frontend/
├── public/                 # فایل‌های استاتیک
│   ├── media/             # تصاویر و فایل‌های چندرسانه‌ای
│   ├── fonts/             # فونت‌ها
│   └── icons/             # آیکون‌ها
├── src/
│   ├── app/               # کامپوننت‌های اصلی
│   │   ├── components/    # کامپوننت‌های عمومی
│   │   ├── modules/       # ماژول‌های مختلف
│   │   ├── pages/         # صفحات
│   │   └── services/      # سرویس‌ها
│   ├── _metronic/         # تم Metronic
│   ├── hooks/             # React Hooks
│   └── types/             # تعاریف TypeScript
├── cypress/               # تست‌های E2E
├── scripts/               # اسکریپت‌های کمکی
└── nginx/                 # تنظیمات Nginx
```

## 🛠️ تکنولوژی‌ها

### فریم‌ورک اصلی
- **React 18** - کتابخانه UI
- **TypeScript** - زبان برنامه‌نویسی
- **Vite** - ابزار ساخت

### UI/UX
- **Material-UI (MUI)** - کامپوننت‌های UI
- **Ant Design** - کتابخانه UI
- **Bootstrap** - فریم‌ورک CSS
- **Framer Motion** - انیمیشن‌ها

### مدیریت حالت
- **Redux Toolkit** - مدیریت state
- **React Query** - مدیریت داده‌ها

### فرم‌ها و اعتبارسنجی
- **Formik** - مدیریت فرم‌ها
- **React Hook Form** - فرم‌های پیشرفته
- **Yup** - اعتبارسنجی

### نمودارها و گراف‌ها
- **ApexCharts** - نمودارهای تعاملی
- **Chart.js** - نمودارهای ساده

### تاریخ و زمان
- **date-fns** - مدیریت تاریخ
- **date-fns-jalali** - تقویم شمسی
- **moment-jalaali** - تاریخ جلالی

### ابزارهای کمکی
- **Axios** - درخواست‌های HTTP
- **Lodash** - توابع کمکی
- **React Router** - مسیریابی

## 🚀 استقرار

### استقرار با Docker

```bash
# ساخت و اجرای کانتینر
docker compose up --build -d

# مشاهده لاگ‌ها
docker compose logs -f frontend
```

### استقرار خودکار

برای اطلاعات کامل در مورد استقرار خودکار، فایل [DEPLOYMENT.md](./DEPLOYMENT.md) را مطالعه کنید.

## 🧪 تست

### تست‌های E2E با Cypress

```bash
# اجرای Cypress
npm run cypress:open

# اجرای تست‌ها در حالت headless
npx cypress run
```

### تست‌های واحد

```bash
# اجرای تست‌ها
npm test

# اجرای تست‌ها با coverage
npm test -- --coverage
```

## 🔧 توسعه

### قوانین کدنویسی

- از **ESLint** برای بررسی کد استفاده می‌شود
- از **Prettier** برای فرمت‌بندی کد استفاده می‌شود
- از **TypeScript** برای type safety استفاده می‌شود

### ساخت کامپوننت جدید

```bash
# ایجاد کامپوننت جدید
mkdir src/app/components/NewComponent
touch src/app/components/NewComponent/index.tsx
touch src/app/components/NewComponent/styles.scss
```

### ساخت صفحه جدید

```bash
# ایجاد صفحه جدید
mkdir src/app/pages/NewPage
touch src/app/pages/NewPage/index.tsx
touch src/app/pages/NewPage/styles.scss
```

## 🤝 مشارکت

ما از مشارکت شما استقبال می‌کنیم! لطفاً مراحل زیر را دنبال کنید:

### ۱. Fork کردن پروژه

### ۲. ایجاد شاخه جدید

```bash
git checkout -b feature/amazing-feature
```

### ۳. اعمال تغییرات

```bash
git add .
git commit -m "Add amazing feature"
```

### ۴. Push کردن تغییرات

```bash
git push origin feature/amazing-feature
```

### ۵. ایجاد Pull Request

## 📞 پشتیبانی

برای گزارش مشکلات یا درخواست ویژگی‌های جدید:

- **Issues**: از بخش Issues در GitHub استفاده کنید
- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **Telegram**: [@your-telegram](https://t.me/your-telegram)

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است. برای اطلاعات بیشتر فایل [LICENSE](./LICENSE) را مطالعه کنید.

## 🙏 تشکر

از تمامی افرادی که در توسعه این پروژه مشارکت داشته‌اند تشکر می‌کنیم.

---

**⭐ اگر این پروژه برای شما مفید بود، لطفاً آن را ستاره‌دار کنید!**
# ReactProjectsBase
