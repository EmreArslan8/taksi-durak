"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Headphones,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  CarTaxiFront,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

const slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:30"];

type Booking = {
  id: string;
  name: string;
  phone: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  note: string;
  status: "Bekliyor";
  createdAt: string;
};

export default function Home() {
  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  }, []);
  const [tripType, setTripType] = useState<"now" | "later">("later");
  const [selectedTime, setSelectedTime] = useState("10:30");
  const [submitted, setSubmitted] = useState<Booking | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const booking: Booking = {
      id: `TD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: String(form.get("name")),
      phone: String(form.get("phone")),
      pickup: String(form.get("pickup")),
      destination: String(form.get("destination")),
      date: tripType === "now" ? new Date().toISOString().split("T")[0] : String(form.get("date")),
      time: tripType === "now" ? "En kısa sürede" : selectedTime,
      note: String(form.get("note") || ""),
      status: "Bekliyor",
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("taksi-demo-bookings") || "[]");
    localStorage.setItem("taksi-demo-bookings", JSON.stringify([booking, ...existing]));
    setSubmitted(booking);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#171711]">
      <nav className="sticky top-0 z-40 border-b border-black/10 bg-[#f3f0e8]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-[#f5bf20] shadow-[3px_3px_0_#171711]">
              <CarTaxiFront className="size-6" strokeWidth={2.2} />
            </span>
            <span><strong className="block text-[17px] font-extrabold leading-none tracking-tight">MERKEZ TAKSİ</strong><small className="mt-1 block text-[10px] font-bold tracking-[.24em] text-black/50">7/24 YANINIZDA</small></span>
          </Link>
          <div className="flex items-center gap-2">
            <a href="tel:4440824" className="hidden items-center gap-2 rounded-full border border-black/15 px-4 py-2.5 text-sm font-bold sm:flex"><Phone className="size-4" /> 444 08 24</a>
            <Link href="/admin" className="rounded-full bg-[#171711] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5">Yönetim paneli</Link>
          </div>
        </div>
      </nav>

      {submitted ? (
        <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-3xl items-center px-5 py-14">
          <div className="w-full rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_25px_80px_rgba(22,22,17,.12)] sm:p-12">
            <div className="mb-8 grid size-16 place-items-center rounded-2xl bg-[#f5bf20]"><Check className="size-8" strokeWidth={3} /></div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[.25em] text-black/45">Talep numarası {submitted.id}</p>
            <h1 className="max-w-xl text-4xl font-black leading-[1.05] tracking-[-.04em] sm:text-5xl">Aracınız için talebinizi aldık.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-black/60">Durak görevlisi talebi kontrol ettiğinde <strong>{submitted.phone}</strong> numarasına SMS gönderilecek.</p>
            <div className="my-8 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2">
              <div className="bg-[#faf9f5] p-5"><span className="text-xs font-bold text-black/45">ALIŞ NOKTASI</span><p className="mt-2 font-bold">{submitted.pickup}</p></div>
              <div className="bg-[#faf9f5] p-5"><span className="text-xs font-bold text-black/45">TARİH / SAAT</span><p className="mt-2 font-bold">{submitted.date} · {submitted.time}</p></div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row"><button onClick={() => setSubmitted(null)} className="rounded-xl bg-[#171711] px-6 py-4 font-bold text-white">Yeni talep oluştur</button><Link href="/admin" className="rounded-xl border border-black/15 px-6 py-4 text-center font-bold">Panelde görüntüle</Link></div>
          </div>
        </section>
      ) : (
        <>
          <section className="relative overflow-hidden border-b border-black/10">
            <div className="absolute -right-32 top-20 hidden size-[34rem] rotate-12 rounded-[7rem] border-[80px] border-[#f5bf20]/25 lg:block" />
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[.88fr_1.12fr] lg:px-8 lg:py-20">
              <div className="relative flex flex-col justify-center">
                <div className="mb-7 flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3.5 py-2 text-xs font-extrabold"><span className="size-2 animate-pulse rounded-full bg-emerald-500" /> Şu an 6 aracımız müsait</div>
                <h1 className="max-w-2xl text-[3.25rem] font-black leading-[.93] tracking-[-.065em] sm:text-7xl lg:text-[5.4rem]">Gideceğiniz yere <span className="relative inline-block"><span className="relative z-10">tam vaktinde.</span><span className="absolute bottom-1 left-0 -z-0 h-5 w-full -rotate-1 bg-[#f5bf20] sm:h-7" /></span></h1>
                <p className="mt-7 max-w-xl text-lg leading-8 text-black/60">Mahallenizin taksisi şimdi cebinizde. Hemen araç çağırın veya yolculuğunuzu ileri bir saate planlayın.</p>
                <div className="mt-9 grid max-w-xl grid-cols-3 gap-3 border-t border-black/10 pt-7">
                  <div><strong className="block text-2xl font-black">4.9</strong><span className="text-xs font-semibold text-black/45">müşteri puanı</span></div>
                  <div><strong className="block text-2xl font-black">7/24</strong><span className="text-xs font-semibold text-black/45">kesintisiz hizmet</span></div>
                  <div><strong className="block text-2xl font-black">8 dk</strong><span className="text-xs font-semibold text-black/45">ortalama varış</span></div>
                </div>
              </div>

              <div id="rezervasyon" className="relative rounded-[2rem] bg-[#171711] p-2 shadow-[0_30px_90px_rgba(22,22,17,.24)]">
                <div className="rounded-[1.6rem] border border-white/10 bg-[#20201a] p-5 text-white sm:p-8">
                  <div className="mb-6 flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#f5bf20]">Yolculuk planla</p><h2 className="mt-2 text-2xl font-black tracking-tight">Nereye gidiyoruz?</h2></div><Sparkles className="size-6 text-[#f5bf20]" /></div>
                  <div className="mb-6 grid grid-cols-2 rounded-xl bg-black/25 p-1.5">
                    <button onClick={() => setTripType("now")} className={`rounded-lg px-4 py-3 text-sm font-bold transition ${tripType === "now" ? "bg-[#f5bf20] text-black" : "text-white/55"}`}>Hemen çağır</button>
                    <button onClick={() => setTripType("later")} className={`rounded-lg px-4 py-3 text-sm font-bold transition ${tripType === "later" ? "bg-[#f5bf20] text-black" : "text-white/55"}`}>İleri tarih</button>
                  </div>
                  <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2"><Field name="name" label="Ad soyad" placeholder="Örn. Ece Yılmaz" required /><Field name="phone" label="Telefon" placeholder="05xx xxx xx xx" required /></div>
                    <Field name="pickup" label="Alınacak adres" placeholder="Mahalle, sokak, bina no" icon={<MapPin />} required />
                    <Field name="destination" label="Gidilecek adres" placeholder="Varış noktanız" icon={<Navigation />} required />
                    {tripType === "later" && <><div className="grid gap-4 sm:grid-cols-2"><Field name="date" type="date" label="Tarih" defaultValue={tomorrow} min={new Date().toISOString().split("T")[0]} icon={<CalendarDays />} required /><div><label className="mb-2 block text-xs font-bold text-white/55">Saat</label><div className="flex h-[52px] items-center gap-3 rounded-xl border border-white/10 bg-white/[.06] px-4"><Clock3 className="size-4 text-[#f5bf20]"/><span className="text-sm font-bold">{selectedTime}</span></div></div></div><div><p className="mb-2 text-xs font-bold text-white/55">Müsait saatler</p><div className="grid grid-cols-4 gap-2">{slots.map((slot) => <button type="button" key={slot} onClick={() => setSelectedTime(slot)} className={`rounded-lg border py-2.5 text-xs font-bold transition ${slot === selectedTime ? "border-[#f5bf20] bg-[#f5bf20] text-black" : "border-white/10 bg-white/[.04] text-white/65 hover:border-white/30"}`}>{slot}</button>)}</div></div></>}
                    <Field name="note" label="Sürücüye not (isteğe bağlı)" placeholder="Kapı kodu, valiz bilgisi vb." />
                    <button className="group flex w-full items-center justify-between rounded-xl bg-[#f5bf20] px-5 py-4 font-black text-black transition hover:bg-[#ffd451]"><span>{tripType === "now" ? "Taksi çağır" : "Rezervasyon oluştur"}</span><ArrowRight className="size-5 transition group-hover:translate-x-1" /></button>
                    <p className="text-center text-[11px] leading-5 text-white/35">Talep sonrası SMS ile bilgilendirileceksiniz. Ödeme araçta yapılır.</p>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="grid gap-4 md:grid-cols-3">
              <Feature icon={<Clock3 />} title="Dakik planlama" text="Yoğunluğa göre yalnızca gerçekten müsait saatleri gösteririz." />
              <Feature icon={<ShieldCheck />} title="Güvenilir yolculuk" text="Tüm şoför ve araç bilgileri durak tarafından doğrulanır." />
              <Feature icon={<Headphones />} title="İnsan desteği" text="Bir sorun olduğunda otomatik yanıt değil, durak görevlisi yanınızda." />
            </div>
          </section>
        </>
      )}
    </main>
  );
}

function Field({ label, icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon?: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-xs font-bold text-white/55">{label}</span><div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.06] px-4 transition focus-within:border-[#f5bf20]/70">{icon && <span className="[&>svg]:size-4 text-[#f5bf20]">{icon}</span>}<input {...props} className="h-[50px] min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25 [color-scheme:dark]" /></div></label>;
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="rounded-2xl border border-black/10 bg-white/60 p-6"><div className="mb-5 grid size-11 place-items-center rounded-xl bg-[#f5bf20] [&>svg]:size-5">{icon}</div><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-black/55">{text}</p></div>;
}
