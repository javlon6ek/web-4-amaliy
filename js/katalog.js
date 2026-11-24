/* katalog.js — massivdan kartalarni chiqarish, qidiruv, filtr, saralash, statistika */

const konteyner = document.getElementById("konteyner");
const qidiruv = document.getElementById("qidiruv");
const kategoriya = document.getElementById("kategoriya");
const tartib = document.getElementById("tartib");
const faqatSevimli = document.getElementById("faqat-sevimli");
const soni = document.getElementById("soni");
const boshXabar = document.getElementById("bosh-xabar");

/* ---------- A qism: statistika (reduce va find bilan) ---------- */
function statistikaniChiqar() {
  const jami = mahsulotlar.reduce(function (hisob) { return hisob + 1; }, 0);

  const narxlarYigindisi = mahsulotlar.reduce(function (yigindi, m) { return yigindi + m.narx; }, 0);
  const ortachaNarx = Math.round(narxlarYigindisi / mahsulotlar.length);

  const engYuqoriNarx = mahsulotlar.reduce(function (eng, m) { return m.narx > eng ? m.narx : eng; }, 0);
  const engQimmat = mahsulotlar.find(function (m) { return m.narx === engYuqoriNarx; });

  document.getElementById("stat-jami").textContent = jami;
  document.getElementById("stat-ortacha").textContent = narxniFormatla(ortachaNarx) + " so'm";
  document.getElementById("stat-qimmat").textContent = engQimmat.nomi;
}

/* ---------- Kategoriya ro'yxatini ma'lumotdan yasash (map + Set) ---------- */
function kategoriyalarniToldir() {
  const noyob = [...new Set(mahsulotlar.map(function (m) { return m.kategoriya; }))];
  noyob.forEach(function (kod) {
    const variant = document.createElement("option");
    variant.value = kod;
    variant.textContent = kategoriyaNomlari[kod];
    kategoriya.append(variant);
  });
}

/* ---------- B qism: bitta karta yasash (faqat createElement va textContent) ---------- */
function kartaYasa(element) {
  const karta = document.createElement("article");
  karta.className = "karta";
  karta.dataset.id = element.id;

  if (!element.mavjud) {
    const belgi = document.createElement("span");
    belgi.className = "belgi";
    belgi.textContent = "Hozircha yo'q";
    karta.append(belgi);
  } else if (element.teglar.includes("mashhur")) {
    const belgi = document.createElement("span");
    belgi.className = "belgi";
    belgi.textContent = "Mashhur";
    karta.append(belgi);
  }

  const rasm = document.createElement("img");
  rasm.className = "karta-rasm";
  rasm.src = element.rasm;
  rasm.alt = element.nomi;
  rasm.width = 400;
  rasm.height = 250;
  rasm.loading = "lazy";

  const sarlavha = document.createElement("h3");
  sarlavha.textContent = element.nomi;

  const kategoriyaMatni = document.createElement("p");
  kategoriyaMatni.className = "izoh";
  kategoriyaMatni.textContent = kategoriyaNomlari[element.kategoriya];

  const narx = document.createElement("p");
  narx.className = "karta-narx";
  narx.textContent = narxniFormatla(element.narx) + " so'm \u00B7 " + element.davomiylik + " daqiqa";

  const teglar = document.createElement("div");
  teglar.className = "teglar";
  element.teglar.forEach(function (tegNomi) {
    const teg = document.createElement("span");
    teg.className = "teg";
    teg.textContent = tegNomi;
    teglar.append(teg);
  });

  const tugmalar = document.createElement("div");
  tugmalar.className = "karta-tugmalar";

  const batafsil = document.createElement("button");
  batafsil.type = "button";
  batafsil.className = "tugma";
  batafsil.dataset.amal = "batafsil";
  batafsil.textContent = "Batafsil";

  const sevimli = document.createElement("button");
  sevimli.type = "button";
  sevimli.className = "sevimli-tugma";
  sevimli.dataset.amal = "sevimli";
  sevimliHolatiniQoy(sevimli, sevimlilarniOl().includes(element.id));

  tugmalar.append(batafsil, sevimli);
  karta.append(rasm, sarlavha, kategoriyaMatni, narx, teglar, tugmalar);
  return karta;
}

function sevimliHolatiniQoy(tugma, sevimlimi) {
  tugma.setAttribute("aria-pressed", String(sevimlimi));
  tugma.textContent = sevimlimi ? "\u2665 Sevimli" : "\u2661 Saqlash";
}

/* ---------- Ro'yxatni sahifaga chiqarish ---------- */
function chiqar(royxat) {
  konteyner.textContent = "";
  const parcha = document.createDocumentFragment();
  royxat.forEach(function (element) {
    parcha.append(kartaYasa(element));
  });
  konteyner.append(parcha);

  soni.textContent = royxat.length;
  boshXabar.hidden = royxat.length !== 0;
}

/* ---------- Saralash (sort): asl massivni o'zgartirmaslik uchun nusxa olinadi ---------- */
function saralash(royxat, usul) {
  const nusxa = [...royxat];
  if (usul === "narx-osish") {
    nusxa.sort(function (a, b) { return a.narx - b.narx; });
  } else if (usul === "narx-kamayish") {
    nusxa.sort(function (a, b) { return b.narx - a.narx; });
  } else if (usul === "nom") {
    nusxa.sort(function (a, b) { return a.nomi.localeCompare(b.nomi, "uz"); });
  }
  return nusxa;
}

/* ---------- Qidiruv + filtr + saralash birgalikda ---------- */
function yangila() {
  const soz = qidiruv.value.trim().toLowerCase();
  const tanlanganKategoriya = kategoriya.value;
  const sevimlilar = sevimlilarniOl();

  const filtrlangan = mahsulotlar.filter(function (m) {
    const nomiMos = m.nomi.toLowerCase().includes(soz);
    const kategoriyaMos = tanlanganKategoriya === "hammasi" || m.kategoriya === tanlanganKategoriya;
    const sevimliMos = !faqatSevimli.checked || sevimlilar.includes(m.id);
    return nomiMos && kategoriyaMos && sevimliMos;
  });

  chiqar(saralash(filtrlangan, tartib.value));
}

/* ---------- C qism: event delegation — bitta tinglovchi ota konteynerda ---------- */
konteyner.addEventListener("click", function (e) {
  const tugma = e.target.closest("button[data-amal]");
  if (!tugma || !konteyner.contains(tugma)) {
    return;
  }
  const karta = tugma.closest(".karta");
  const id = Number(karta.dataset.id);

  if (tugma.dataset.amal === "batafsil") {
    const element = mahsulotlar.find(function (m) { return m.id === id; });
    modalOchish(element);
  } else if (tugma.dataset.amal === "sevimli") {
    const sevimlimi = sevimliniAlmashtir(id);
    if (faqatSevimli.checked) {
      yangila();
    } else {
      sevimliHolatiniQoy(tugma, sevimlimi);
    }
  }
});

qidiruv.addEventListener("input", yangila);
kategoriya.addEventListener("change", yangila);
tartib.addEventListener("change", yangila);
faqatSevimli.addEventListener("change", yangila);

/* ---------- Ishga tushirish ---------- */
statistikaniChiqar();
kategoriyalarniToldir();
faqatSevimli.checked = location.hash === "#sevimlilar";
yangila();
