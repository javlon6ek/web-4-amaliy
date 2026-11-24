# 4-amaliy ish

**Talaba:** Qurbonov Javlonbek
**Guruh:** 941-24
**Loyiha mavzusi:** Kichik biznes sayti — «Oltin Qaychi» sartaroshxonasi (Urganch)

## Qo'shilgan imkoniyatlar

- **katalog.html** — 12 ta xizmat `js/data.js` massividan JavaScript orqali chiqariladi
- Statistika: jami xizmatlar, o'rtacha narx, eng qimmat xizmat
- Qidiruv (katta-kichik harf farqlanmaydi), kategoriya filtri, narx va nom bo'yicha saralash — hammasi birgalikda ishlaydi
- «Hech narsa topilmadi» xabari va ko'rsatilayotgan elementlar soni
- Modal oyna (×, fon ustiga bosish, Escape bilan yopiladi)
- Event delegation: karta tugmalari uchun bitta tinglovchi (`#konteyner`)
- **aloqa.html** — forma tekshiruvi (`preventDefault`, har maydon ostida xato matni, muvaffaqiyat xabari)
- Tanlov komponentlari: mobil menyu (hamburger), tungi rejim (localStorage), sevimlilar hisoblagichi (localStorage)

## Massiv metodlari qayerda

| Metod | Fayl va funksiya |
|-------|------------------|
| `map` | `katalog.js` → `kategoriyalarniToldir()` |
| `filter` | `katalog.js` → `yangila()`; `ui.js` → `sevimliniAlmashtir()` |
| `reduce` | `katalog.js` → `statistikaniChiqar()` |
| `sort` | `katalog.js` → `saralash()` |
| `find` | `katalog.js` → `statistikaniChiqar()` va tugma bosilganda (delegation) |

## Fayllar

- `js/data.js` — ma'lumotlar massivi
- `js/katalog.js` — chiqarish, qidiruv, filtr, saralash, statistika
- `js/ui.js` — modal, forma tekshiruvi, tema, menyu, sevimlilar

Ishga tushirish: `index.html` ni brauzerda oching (yoki Live Server), F12 → Console.
