# Merkez Taksi — Randevu ve Operasyon Paneli Demo

Yerel bir taksi durağı için hazırlanmış, mobil öncelikli rezervasyon ekranı ve operasyon paneli demosu.

## Demo özellikleri

- Hemen araç çağırma veya ileri tarihli rezervasyon
- Müsait saat seçimi ve talep onay ekranı
- Admin panelinde talep arama ve durum filtreleme
- Şoför atama; onaylama, iptal ve tamamlama akışı
- Günlük özet, yaklaşan seferler ve yoğun saat grafiği
- Mobil ve masaüstü uyumlu arayüz

Demo verileri tarayıcının `localStorage` alanında tutulur. Müşteri ekranında oluşturulan talep aynı tarayıcıdaki `/admin` ekranında görünür.

## Çalıştırma

```bash
npm install
npm run dev
```

- Müşteri ekranı: `http://localhost:3000`
- Yönetim paneli: `http://localhost:3000/admin`

Üretim kontrolü:

```bash
npm run build
npm run start
```

## Teknoloji

- Next.js 14 ve React 18
- TypeScript
- Tailwind CSS
- Lucide ikonları

## Canlı sisteme geçiş planı

Demo aşamasından sonra `localStorage` yerine PostgreSQL + Prisma, admin oturumu için Auth.js ve zamanlanmış bildirimler için cron/queue katmanı önerilir.

- SMS: Türkiye operasyonu için ilk tercih Netgsm REST API; alternatif İleti Merkezi
- E-posta: Resend veya SMTP
- Bildirimler: oluşturma, onay, tarih değişikliği, iptal ve randevu öncesi hatırlatma
- Müsaitlik: aynı saat dilimi için araç kapasitesine bağlı kota

İncelenen kamuya açık referans proje, randevu/admin/SMS mimarisine sahip [HealthCare Appointment Management System](https://github.com/arnobt78/HealthCare-Doctor-Appointment-Management-System--NextJS-FullStack) oldu. Bu taksi demosunun müşteri ve admin arayüzleri iş alanına göre yeniden yazıldı. Referans depoda açık bir lisans dosyası bulunmadığından, ticari üretim sürümünde kalan eski referans dosyaları temizlenmeli veya hak sahibinden kullanım izni doğrulanmalıdır.
