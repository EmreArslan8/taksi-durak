"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  CarFront,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  LayoutDashboard,
  MapPin,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  CarTaxiFront,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Status = "Bekliyor" | "Onaylandı" | "Tamamlandı" | "İptal";
type Ride = { id: string; name: string; phone: string; pickup: string; destination: string; date: string; time: string; status: Status; driver?: string; };

const seeds: Ride[] = [
  { id: "TD-1048", name: "Mert Aksoy", phone: "0532 144 28 19", pickup: "Atatürk Mah. 12. Sk.", destination: "Sabiha Gökçen Havalimanı", date: "02 Ağu", time: "09:30", status: "Onaylandı", driver: "Mehmet K." },
  { id: "TD-1047", name: "Ece Yılmaz", phone: "0554 828 11 04", pickup: "Çınar Sitesi, B Blok", destination: "Marmara Eğitim Araştırma", date: "02 Ağu", time: "10:00", status: "Bekliyor" },
  { id: "TD-1046", name: "Barış Öztürk", phone: "0507 621 90 33", pickup: "Merkez Camii yanı", destination: "Pendik YHT Garı", date: "02 Ağu", time: "10:30", status: "Bekliyor" },
  { id: "TD-1045", name: "Selin Arslan", phone: "0539 471 42 80", pickup: "Yenişehir Mah. Rüzgar Sk.", destination: "Kadıköy Rıhtım", date: "02 Ağu", time: "11:30", status: "Onaylandı", driver: "Ahmet D." },
  { id: "TD-1044", name: "Can Demir", phone: "0543 336 71 22", pickup: "Kentpark AVM girişi", destination: "Kozyatağı Metro", date: "01 Ağu", time: "17:30", status: "Tamamlandı", driver: "Serkan A." },
];
const drivers = ["Mehmet K.", "Ahmet D.", "Serkan A.", "Hakan T."];

export default function AdminPage() {
  const [rides, setRides] = useState<Ride[]>(seeds);
  const [filter, setFilter] = useState<Status | "Tümü">("Tümü");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Ride | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("taksi-demo-bookings") || "[]");
    if (local.length) {
      const mapped: Ride[] = local.map((item: any) => ({ ...item, date: item.date, status: item.status || "Bekliyor" }));
      setRides([...mapped, ...seeds]);
    }
  }, []);

  const shown = useMemo(() => rides.filter((ride) => (filter === "Tümü" || ride.status === filter) && `${ride.name} ${ride.id} ${ride.pickup}`.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))), [rides, filter, query]);
  const updateRide = (id: string, values: Partial<Ride>) => {
    setRides((current) => current.map((ride) => ride.id === id ? { ...ride, ...values } : ride));
    setSelected((current) => current?.id === id ? { ...current, ...values } : current);
  };

  return (
    <main className="min-h-screen bg-[#efeee9] text-[#191914]">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#171711] p-5 text-white transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-10 flex items-center justify-between"><Link href="/" className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#f5bf20] text-black"><CarTaxiFront className="size-5" /></span><div><strong className="block text-sm">MERKEZ TAKSİ</strong><span className="text-[9px] tracking-[.2em] text-white/40">OPERASYON</span></div></Link><button onClick={() => setMenuOpen(false)} className="lg:hidden"><X /></button></div>
        <nav className="space-y-1"><Nav active icon={<LayoutDashboard />} label="Genel bakış" /><Nav icon={<CalendarDays />} label="Takvim" /><Nav icon={<CarFront />} label="Araç & şoförler" badge="6" /><Nav icon={<Users />} label="Müşteriler" /><Nav icon={<BarChart3 />} label="Raporlar" /></nav>
        <div className="absolute bottom-5 left-5 right-5"><Nav icon={<Settings />} label="Ayarlar" /><div className="mt-4 flex items-center gap-3 rounded-xl bg-white/[.07] p-3"><div className="grid size-9 place-items-center rounded-lg bg-white/10"><CircleUserRound className="size-5" /></div><div className="min-w-0"><p className="truncate text-xs font-bold">Burak Yılmaz</p><p className="text-[10px] text-white/40">Durak yöneticisi</p></div></div></div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-black/10 bg-[#efeee9]/90 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3"><button className="lg:hidden" onClick={() => setMenuOpen(true)}><Menu /></button><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-black/40">2 Ağustos 2026, Pazar</p><h1 className="mt-1 text-xl font-black tracking-tight">Operasyon merkezi</h1></div></div>
          <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold sm:flex"><span className="size-2 rounded-full bg-emerald-500" /> 6 araç müsait</div><Link href="/" className="grid size-10 place-items-center rounded-full border border-black/10 bg-white" title="Müşteri ekranı"><ArrowLeft className="size-4" /></Link></div>
        </header>

        <div className="space-y-7 p-5 sm:p-8">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Metric label="Bugünkü talepler" value={String(rides.filter(r => r.date.includes("02") || r.date.includes("2026")).length)} trend="Düne göre +%18" accent />
            <Metric label="Onay bekleyen" value={String(rides.filter(r => r.status === "Bekliyor").length)} trend="2 talep 15 dk geçti" />
            <Metric label="Aktif araçlar" value="8 / 10" trend="2 araç molada" />
            <Metric label="Ort. yanıt süresi" value="2:48" trend="Hedefin 12 sn altında" />
          </section>

          <section className="grid gap-5 xl:grid-cols-[1fr_330px]">
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
              <div className="flex flex-col gap-4 border-b border-black/10 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-black">Randevular</h2><p className="mt-1 text-xs text-black/45">Tüm çağrı ve ileri tarih talepleri</p></div><div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black/35"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="İsim, adres veya no ara" className="h-10 w-full rounded-lg border border-black/10 bg-[#f6f5f1] pl-9 pr-3 text-xs outline-none focus:border-black/30 sm:w-56" /></div></div>
              <div className="flex gap-1 overflow-x-auto border-b border-black/10 px-4 pt-3">{(["Tümü", "Bekliyor", "Onaylandı", "Tamamlandı", "İptal"] as const).map(item => <button key={item} onClick={() => setFilter(item)} className={`whitespace-nowrap border-b-2 px-3 pb-3 text-xs font-bold ${filter === item ? "border-black text-black" : "border-transparent text-black/40"}`}>{item}{item === "Bekliyor" && <span className="ml-2 rounded-full bg-[#f5bf20] px-1.5 py-0.5 text-[9px] text-black">{rides.filter(r => r.status === "Bekliyor").length}</span>}</button>)}</div>
              <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead><tr className="border-b border-black/10 text-[10px] uppercase tracking-[.12em] text-black/35"><th className="px-5 py-4">Müşteri</th><th className="px-4 py-4">Güzergâh</th><th className="px-4 py-4">Tarih / saat</th><th className="px-4 py-4">Şoför</th><th className="px-4 py-4">Durum</th><th className="px-4 py-4" /></tr></thead><tbody>{shown.map(ride => <tr key={ride.id} className="border-b border-black/[.06] text-xs transition hover:bg-[#faf9f5]"><td className="px-5 py-4"><p className="font-extrabold">{ride.name}</p><p className="mt-1 text-[10px] text-black/40">{ride.id} · {ride.phone}</p></td><td className="max-w-[210px] px-4 py-4"><p className="truncate font-semibold">{ride.pickup}</p><p className="mt-1 truncate text-[10px] text-black/40">→ {ride.destination}</p></td><td className="px-4 py-4"><p className="font-bold">{ride.date}</p><p className="mt-1 text-[10px] text-black/45">{ride.time}</p></td><td className="px-4 py-4 font-semibold text-black/60">{ride.driver || "Atanmadı"}</td><td className="px-4 py-4"><StatusBadge status={ride.status} /></td><td className="px-4 py-4"><button onClick={() => setSelected(ride)} className="grid size-8 place-items-center rounded-lg border border-black/10"><MoreHorizontal className="size-4" /></button></td></tr>)}</tbody></table></div>
              <div className="flex items-center justify-between p-4 text-[11px] text-black/40"><span>{shown.length} kayıt gösteriliyor</span><button className="flex items-center gap-1 font-bold text-black">Tümünü gör <ChevronRight className="size-3" /></button></div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl bg-[#171711] p-5 text-white"><div className="mb-6 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/40">Bugünkü yoğunluk</p><h3 className="mt-1 font-black">Saatlik talep</h3></div><BarChart3 className="size-5 text-[#f5bf20]" /></div><div className="flex h-36 items-end gap-2">{[26,45,38,74,93,62,44,55,36].map((height, i) => <div key={i} className="group flex h-full flex-1 flex-col items-center justify-end gap-2"><div style={{ height: `${height}%` }} className={`w-full rounded-t-sm ${i === 4 ? "bg-[#f5bf20]" : "bg-white/15"}`} /><span className="text-[8px] text-white/30">{9 + i}</span></div>)}</div><p className="mt-4 border-t border-white/10 pt-4 text-xs text-white/50"><strong className="text-[#f5bf20]">13:00–14:00</strong> günün en yoğun aralığı</p></div>
              <div className="rounded-2xl border border-black/10 bg-white p-5"><div className="mb-4 flex items-center justify-between"><h3 className="font-black">Yaklaşan seferler</h3><Clock3 className="size-4 text-black/35" /></div>{rides.filter(r => r.status === "Onaylandı").slice(0,3).map((ride, i) => <div key={ride.id} className="flex gap-3 border-t border-black/[.07] py-3 first:border-0"><span className="text-xs font-black">{ride.time}</span><span className={`mt-1 size-2 shrink-0 rounded-full ${i === 0 ? "bg-[#f5bf20]" : "bg-emerald-500"}`} /><div className="min-w-0"><p className="truncate text-xs font-bold">{ride.name}</p><p className="mt-1 truncate text-[10px] text-black/40">{ride.driver} · {ride.destination}</p></div></div>)}</div>
            </div>
          </section>
        </div>
      </div>

      {selected && <div className="fixed inset-0 z-[60] flex justify-end bg-black/35 backdrop-blur-sm" onClick={() => setSelected(null)}><aside onClick={e => e.stopPropagation()} className="h-full w-full max-w-md overflow-y-auto bg-[#f6f5f1] p-6 shadow-2xl"><div className="mb-8 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-black/40">{selected.id}</p><h2 className="mt-1 text-2xl font-black">Talep detayı</h2></div><button onClick={() => setSelected(null)} className="grid size-10 place-items-center rounded-full border border-black/10 bg-white"><X className="size-4" /></button></div><div className="rounded-2xl border border-black/10 bg-white p-5"><h3 className="font-black">{selected.name}</h3><p className="mt-1 text-sm text-black/50">{selected.phone}</p><div className="mt-5 space-y-4 border-t border-black/10 pt-5"><Info icon={<MapPin />} label="Alış" value={selected.pickup}/><Info icon={<CarFront />} label="Varış" value={selected.destination}/><Info icon={<CalendarDays />} label="Zaman" value={`${selected.date} · ${selected.time}`}/></div></div><div className="mt-5 rounded-2xl border border-black/10 bg-white p-5"><label className="text-xs font-bold text-black/45">Şoför / araç ata</label><select value={selected.driver || ""} onChange={e => updateRide(selected.id, { driver: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-[#f6f5f1] px-3 text-sm font-bold outline-none"><option value="">Atanmadı</option>{drivers.map(driver => <option key={driver}>{driver}</option>)}</select></div><div className="mt-5 grid grid-cols-2 gap-3"><button onClick={() => updateRide(selected.id, { status: "Onaylandı" })} className="flex items-center justify-center gap-2 rounded-xl bg-[#f5bf20] px-4 py-4 text-sm font-black"><Check className="size-4"/> Onayla</button><button onClick={() => updateRide(selected.id, { status: "İptal" })} className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-black text-red-700">İptal et</button><button onClick={() => updateRide(selected.id, { status: "Tamamlandı" })} className="col-span-2 rounded-xl bg-[#171711] px-4 py-4 text-sm font-black text-white">Tamamlandı olarak işaretle</button></div><p className="mt-5 text-center text-[10px] leading-5 text-black/35">Durum değişikliğinde müşteriye otomatik SMS ve e-posta bildirimi gönderilir.</p></aside></div>}
    </main>
  );
}

function Nav({ icon, label, active, badge }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string }) { return <button className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-bold ${active ? "bg-[#f5bf20] text-black" : "text-white/50 hover:bg-white/[.06] hover:text-white"}`}><span className="[&>svg]:size-4">{icon}</span><span className="flex-1">{label}</span>{badge && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px]">{badge}</span>}</button>; }
function Metric({ label, value, trend, accent }: { label: string; value: string; trend: string; accent?: boolean }) { return <div className={`rounded-2xl border p-5 ${accent ? "border-[#f5bf20] bg-[#f5bf20]" : "border-black/10 bg-white"}`}><p className={`text-[10px] font-bold uppercase tracking-[.13em] ${accent ? "text-black/55" : "text-black/35"}`}>{label}</p><p className="mt-3 text-3xl font-black tracking-tight">{value}</p><p className={`mt-2 text-[10px] ${accent ? "text-black/60" : "text-black/40"}`}>{trend}</p></div>; }
function StatusBadge({ status }: { status: Status }) { const style = { Bekliyor: "bg-amber-100 text-amber-800", Onaylandı: "bg-emerald-100 text-emerald-800", Tamamlandı: "bg-slate-100 text-slate-600", İptal: "bg-red-100 text-red-700" }[status]; return <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${style}`}>{status}</span>; }
function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f5bf20] [&>svg]:size-4">{icon}</span><div><p className="text-[10px] font-bold uppercase text-black/35">{label}</p><p className="mt-1 text-sm font-bold leading-5">{value}</p></div></div>; }
