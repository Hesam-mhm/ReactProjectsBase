# 🚀 راهنمای استقرار

این راهنما نحوه راه‌اندازی استقرار خودکار برای برنامه React فرانت‌اند مهریر را توضیح می‌دهد.

## 📋 پیش‌نیازها

- مخزن GitHub
- سرور Ubuntu/Debian با دسترسی SSH
- Docker و Docker Compose نصب شده روی سرور

## 🔧 راه‌اندازی سرور

### ۱. اجرای اسکریپت راه‌اندازی روی سرور:

```bash
# دانلود و اجرای اسکریپت راه‌اندازی
curl -fsSL https://raw.githubusercontent.com/your-username/your-repo/main/scripts/setup-server.sh | bash
```

### ۲. تولید کلید SSH برای GitHub Actions:

```bash
# روی سرور
ssh-keygen -t rsa -b 4096 -C "github-actions@your-domain.com"
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/id_rsa  # این کلید خصوصی را کپی کنید
```

## 🔐 رازهای مخزن GitHub

این رازها را به مخزن GitHub خود اضافه کنید (Settings > Secrets and variables > Actions):

| نام راز | توضیحات | مثال |
|---------|---------|-------|
| `SSH_PRIVATE_KEY` | کلید خصوصی SSH برای دسترسی به سرور | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SERVER_HOST` | آدرس IP یا دامنه سرور شما | `192.168.1.100` یا `your-domain.com` |
| `SERVER_USER` | نام کاربری SSH روی سرور | `ubuntu` یا `root` |

## 🚀 فرآیند استقرار

### استقرار خودکار
- Push به شاخه `dev` یا `main`
- GitHub Actions به طور خودکار روی سرور استقرار می‌دهد
- برنامه در `http://your-server:5173` در دسترس خواهد بود

### استقرار دستی
```bash
# روی سرور
cd /var/www/mahyar-frontend
git pull origin dev
docker compose up --build -d
```

## 📁 ساختار فایل

```
.github/
├── workflows/
│   ├── deploy.yml              # استقرار ساده
│   └── deploy-advanced.yml     # پیشرفته با بررسی سلامت
scripts/
├── setup-server.sh             # اسکریپت راه‌اندازی سرور
DEPLOYMENT.md                   # این فایل
```

## 🔍 نظارت

### بررسی وضعیت استقرار:
```bash
# روی سرور
docker compose ps
docker compose logs -f frontend
```

### بررسی سلامت:
```bash
curl http://your-server:5173/health
```

## 🛠️ عیب‌یابی

### مشکلات رایج:

۱. **اتصال SSH ناموفق**
   - تأیید راز SSH_PRIVATE_KEY
   - بررسی SERVER_HOST و SERVER_USER
   - اطمینان از اضافه شدن کلید SSH به سرور

۲. **ساخت Docker ناموفق**
   - بررسی فضای کافی دیسک سرور
   - تأیید اجرای Docker: `sudo systemctl status docker`

۳. **دسترسی به پورت ۵۱۷۳**
   - بررسی فایروال: `sudo ufw status`
   - تأیید اجرای کانتینر: `docker compose ps`

### لاگ‌ها:
```bash
# لاگ‌های GitHub Actions
# بررسی در مخزن GitHub > تب Actions

# لاگ‌های سرور
docker compose logs frontend
```

## 🔄 بازگشت

اگر استقرار ناموفق باشد، می‌توانید بازگشت کنید:

```bash
# روی سرور
cd /var/www/mahyar-frontend
git reset --hard HEAD~1
docker compose up --build -d
```

## 📞 پشتیبانی

برای مشکلات:
۱. بررسی لاگ‌های GitHub Actions
۲. بررسی لاگ‌های سرور: `docker compose logs`
۳. تأیید اتصال سرور: `ssh user@server`

---

**🎉 برنامه React شما به طور خودکار با هر push به شاخه‌های dev/main استقرار خواهد یافت!** 