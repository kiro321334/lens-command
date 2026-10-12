# Lens Command Studio — الموقع + لوحة التحكم

## التشغيل المحلي
```bash
npm i
cp .env.example .env.local   # وعبّي القيم (الخطوات تحت)
npm run dev
```
الموقع: http://localhost:3000 — لوحة التحكم: http://localhost:3000/admin
(الموقع بيشتغل بمحتوى افتراضي حتى قبل ربط Firebase.)

## 1) Firebase (Auth + Firestore) — مجاني
1. https://console.firebase.google.com ← Add project.
2. **Authentication** ← Get started ← Sign-in method ← فعّل **Email/Password**.
3. Authentication ← Users ← **Add user** (إيميل وباسورد العميل). انسخ الـ **User UID** → ده `ADMIN_UID`.
4. **Firestore Database** ← Create database (Production mode).
5. Firestore ← **Rules** ← الصق ده (بدّل `PASTE_ADMIN_UID` في **مكانين**) ← Publish:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    // محتوى الموقع: قراءة للكل، كتابة للأدمن بس
    match /site/{doc} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == 'PASTE_ADMIN_UID';
    }
    // رسايل الزوار: أي زائر يقدر يبعت (بشروط)، والقراءة والحذف للأدمن بس
    match /messages/{id} {
      allow create: if request.resource.data.keys().hasOnly(['name','phone','scope','brief','read','createdAt'])
        && request.resource.data.keys().hasAll(['name','phone','scope','brief','read','createdAt'])
        && request.resource.data.name is string && request.resource.data.name.size() > 0 && request.resource.data.name.size() <= 100
        && request.resource.data.phone is string && request.resource.data.phone.size() >= 7 && request.resource.data.phone.size() <= 30
        && request.resource.data.scope is string && request.resource.data.scope.size() <= 100
        && request.resource.data.brief is string && request.resource.data.brief.size() <= 2000
        && request.resource.data.read == false
        && request.resource.data.createdAt is timestamp;
      allow read, update, delete: if request.auth != null && request.auth.uid == 'PASTE_ADMIN_UID';
    }
  }
}
```
6. Project settings ← Your apps ← Web (</>) ← انسخ apiKey / authDomain / projectId / appId في `.env.local`.

## 2) Cloudinary (رفع الصور والفيديوهات) — مجاني، بديل يوتيوب
1. https://cloudinary.com ← Sign up (Free).
2. Dashboard ← انسخ **Cloud name** و **API Key** و **API Secret** في `.env.local`.
> الرفع بيتم من الداشبورد مباشرة لـ Cloudinary بتوقيع آمن من السيرفر (API Secret عمره ما بيوصل للمتصفح).
> الحد المجاني للملف: فيديو 100MB وصورة 10MB. اضغط الفيديو قبل الرفع (720p–1080p، H.264).

## 3) النشر على Vercel
أضف كل المتغيرات من `.env.example` في Vercel ← Settings ← Environment Variables، وخلّي `NEXT_PUBLIC_SITE_URL` رابط الموقع النهائي، وبعدين Deploy.
ويفضّل تشتري دومين خاص بدل `vercel.app`.

## الرسايل (Inbox)
- الزائر يبعت من الفورم ← الرسالة تتحفظ في Firestore ← تظهر لحظياً في `/admin` ← **Messages** (مع عدّاد للغير مقروء).
- من هناك: رد على واتساب، اتصال، علّم كمقروء، أو احذف.
- الحماية من السبام: حقل مخفي (honeypot) + حد زمني + حد 5 رسايل/10 دقايق لكل IP (على قد الإمكان) + شروط في القواعد. لو السبام زاد فكّر في Firebase App Check أو Cloudflare Turnstile.
- مفيش إشعار على الإيميل حالياً — الرسايل بتتشاف من الداشبورد.

## الاستخدام
- ادخل `/admin` ← سجّل دخول ← عدّل أي قسم ← **Save & publish**. التعديل بيظهر على الموقع فوراً.
- المشاريع: كل مشروع ليه صفحة تفاصيل (Case Study) فيها معرض صور وفيديوهات.
- لو اتغيّر شيء في أسعار أو حدود Cloudinary/Firebase المجانية، راجع صفحاتهم الرسمية.
