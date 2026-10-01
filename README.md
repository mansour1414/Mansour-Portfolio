# موقع بورتفوليو منصور قصقوص

Vite + React + TypeScript، والتصميم CSS عادي (`src/styles.css`). لا Tailwind ولا مكتبات إضافية.

```
src/data.ts      ← كل المحتوى (عربي/إنجليزي). عدّل هنا فقط: الشهادات، الروابط، المشاريع، الخدمات
src/*.tsx        ← المكونات (لا تحتوي نصوصًا)
public/          ← favicon.svg, robots.txt, theme-init.js
supabase/        ← schema.sql لجدول رسائل التواصل
admin-draft/     ← لوحة إدارة تجريبية (واجهة فقط، بلا دخول) — خارج الموقع، لا تُنشر
vercel.json      ← إعدادات النشر + ترويسات الأمان
```

## تشغيل محلي
```
npm install
npm run dev        # http://localhost:5173
npm run build      # فحص الأنواع + بناء الإنتاج إلى dist/
```
يتطلب Node 20.19 أو أحدث.

## 1) GitHub
أنشئ مستودعًا فارغًا ثم: `git init && git add . && git commit -m "init" && git branch -M main && git remote add origin <URL> && git push -u origin main`
(`node_modules` و`dist` و`.env` مستثناة في `.gitignore`).

## 2) Supabase (اختياري، وبدونه يفتح النموذج واتساب)
1. أنشئ مشروعًا ← SQL Editor ← الصق `supabase/schema.sql` ← Run.
2. Project Settings ← API ← انسخ **Project URL** و**anon public key**.
3. محليًا: انسخ `.env.example` إلى `.env` وضع القيمتين. على Vercel: Settings ← Environment Variables بنفس الاسمين.
4. الرسائل تظهر في Table Editor ← `messages`. لا تضع **service_role key** في المشروع أبدًا.

## 3) Vercel
Add New ← Project ← اختر المستودع ← Framework: **Vite** (يُلتقط تلقائيًا) ← أضف متغيرَي Supabase إن استخدمتهما ← Deploy.
أي تغيير على متغيرات البيئة يحتاج Redeploy.

## ناقص قبل تقديم الرابط (كلها في `src/data.ts`)
- `certificates` (من certificates.pdf: الاسم والجهة والسنة).
- `github` و`linkedin`، و`url` لكل مشروع.
- الصورة الشخصية (اختياري)، و`og:url`/`og:image` في `index.html` بعد معرفة النطاق.
