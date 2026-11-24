/* ui.js — umumiy interfeys komponentlari:
   narx formati, localStorage, tungi rejim, mobil menyu, sevimlilar, modal, forma tekshiruvi */

const SEVIMLI_KALIT = "sevimlilar";
const TEMA_KALIT = "tema";

/* ---------- Yordamchi: 350000 -> "350 000" ---------- */
function narxniFormatla(narx) {
  return String(narx).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/* ---------- localStorage (xatolikdan himoyalangan) ---------- */
function saqlashdanOl(kalit, standart) {
  try {
    const matn = localStorage.getItem(kalit);
    return matn === null ? standart : JSON.parse(matn);
  } catch (xato) {
    return standart;
  }
}

function saqlashgaYoz(kalit, qiymat) {
  try {
    localStorage.setItem(kalit, JSON.stringify(qiymat));
  } catch (xato) {
    /* saqlab bo'lmasa, sayt baribir ishlayveradi */
  }
}

/* ---------- Tungi rejim (tanlov 2) ---------- */
const temaTugma = document.getElementById("tema-tugma");

function temaniQoy(tema) {
  document.documentElement.dataset.tema = tema;
  if (temaTugma) {
    temaTugma.textContent = tema === "tungi" ? "\u2600" : "\u263E";
    temaTugma.setAttribute(
      "aria-label",
      tema === "tungi" ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"
    );
  }
}

temaniQoy(saqlashdanOl(TEMA_KALIT, "kunduzi"));

if (temaTugma) {
  temaTugma.addEventListener("click", function () {
    const yangiTema = document.documentElement.dataset.tema === "tungi" ? "kunduzi" : "tungi";
    temaniQoy(yangiTema);
    saqlashgaYoz(TEMA_KALIT, yangiTema);
  });
}

/* ---------- Mobil menyu (tanlov 1) ---------- */
const menyuTugma = document.getElementById("menyu-tugma");
const menyu = document.getElementById("menyu");

if (menyuTugma && menyu) {
  menyuTugma.addEventListener("click", function () {
    const ochiq = menyu.classList.toggle("ochiq");
    menyuTugma.setAttribute("aria-expanded", String(ochiq));
  });
}

/* ---------- Sevimlilar (tanlov 3) ---------- */
function sevimlilarniOl() {
  const royxat = saqlashdanOl(SEVIMLI_KALIT, []);
  return Array.isArray(royxat) ? royxat : [];
}

function sevimliHisoblagichniYangila() {
  const hisoblagich = document.getElementById("sevimli-soni");
  if (hisoblagich) {
    hisoblagich.textContent = sevimlilarniOl().length;
  }
}

/* id sevimlilarda bo'lsa olib tashlaydi, bo'lmasa qo'shadi. Yangi holatni qaytaradi. */
function sevimliniAlmashtir(id) {
  let royxat = sevimlilarniOl();
  const bormi = royxat.includes(id);
  if (bormi) {
    royxat = royxat.filter(function (x) { return x !== id; });
  } else {
    royxat.push(id);
  }
  saqlashgaYoz(SEVIMLI_KALIT, royxat);
  sevimliHisoblagichniYangila();
  return !bormi;
}

sevimliHisoblagichniYangila();

/* ---------- Modal oyna ---------- */
const modal = document.getElementById("modal");
let oxirgiFokus = null;

function modalOchish(element) {
  if (!modal) {
    return;
  }
  document.getElementById("modal-rasm").src = element.rasm;
  document.getElementById("modal-rasm").alt = element.nomi;
  document.getElementById("modal-sarlavha").textContent = element.nomi;
  document.getElementById("modal-tavsif").textContent = element.tavsif;

  const malumot = document.getElementById("modal-malumot");
  malumot.textContent = "";
  const qatorlar = [
    ["Kategoriya", kategoriyaNomlari[element.kategoriya]],
    ["Narxi", narxniFormatla(element.narx) + " so'm"],
    ["Davomiyligi", element.davomiylik + " daqiqa"],
    ["Holati", element.mavjud ? "Mavjud" : "Hozircha mavjud emas"],
    ["Teglar", element.teglar.join(", ")]
  ];
  qatorlar.forEach(function (qator) {
    const orama = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = qator[0];
    dd.textContent = qator[1];
    orama.append(dt, dd);
    malumot.append(orama);
  });

  oxirgiFokus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-ochiq");
  document.getElementById("modal-yopish").focus();
}

function modalYop() {
  if (!modal || modal.hidden) {
    return;
  }
  modal.hidden = true;
  document.body.classList.remove("modal-ochiq");
  if (oxirgiFokus) {
    oxirgiFokus.focus();
  }
}

if (modal) {
  /* 1) × tugmasi */
  document.getElementById("modal-yopish").addEventListener("click", modalYop);

  /* 2) fon ustiga bosish (oynaning o'ziga emas) */
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modalYop();
    }
  });

  /* 3) Escape tugmasi */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modalYop();
    }
  });
}

/* ---------- Forma tekshiruvi (aloqa.html) ---------- */
const forma = document.getElementById("navbat-forma");

function bugunSanasi() {
  const hozir = new Date();
  const oy = String(hozir.getMonth() + 1).padStart(2, "0");
  const kun = String(hozir.getDate()).padStart(2, "0");
  return hozir.getFullYear() + "-" + oy + "-" + kun;
}

/* Xatolar obyektini qaytaradi: { maydonNomi: "xato matni" }. Bo'sh obyekt = hammasi to'g'ri. */
function formaniTekshir(f) {
  const xatolar = {};

  const ism = f.elements["ism"].value.trim();
  if (ism === "") {
    xatolar.ism = "Ismingizni kiriting.";
  } else if (ism.length < 2 || ism.length > 50) {
    xatolar.ism = "Ism 2 tadan 50 tagacha belgidan iborat bo'lsin.";
  }

  const telefon = f.elements["telefon"].value.trim();
  if (telefon === "") {
    xatolar.telefon = "Telefon raqamingizni kiriting.";
  } else if (!/^\+998\d{9}$/.test(telefon)) {
    xatolar.telefon = "Raqamni +998901234567 ko'rinishida yozing.";
  }

  const pochta = f.elements["pochta"].value.trim();
  if (pochta !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(pochta)) {
    xatolar.pochta = "Elektron pochta noto'g'ri. Masalan: ism@pochta.uz";
  }

  const sana = f.elements["sana"].value;
  if (sana === "") {
    xatolar.sana = "Sanani tanlang.";
  } else if (sana < bugunSanasi()) {
    xatolar.sana = "O'tgan sanani tanlab bo'lmaydi.";
  }

  const izoh = f.elements["izoh"].value.trim();
  if (izoh.length > 300) {
    xatolar.izoh = "Izoh 300 belgidan oshmasin (hozir: " + izoh.length + ").";
  }

  if (!f.elements["rozilik"].checked) {
    xatolar.rozilik = "Davom etish uchun rozilik bering.";
  }

  return xatolar;
}

function xatolarniKorsat(f, xatolar) {
  const maydonlar = ["ism", "telefon", "pochta", "sana", "izoh", "rozilik"];
  maydonlar.forEach(function (nom) {
    const xatoElementi = document.getElementById("xato-" + nom);
    const maydon = f.elements[nom];
    xatoElementi.textContent = xatolar[nom] || "";
    if (xatolar[nom]) {
      maydon.setAttribute("aria-invalid", "true");
    } else {
      maydon.removeAttribute("aria-invalid");
    }
  });
}

if (forma) {
  const muvaffaqiyat = document.getElementById("muvaffaqiyat");

  forma.addEventListener("submit", function (e) {
    e.preventDefault();
    muvaffaqiyat.hidden = true;

    const xatolar = formaniTekshir(forma);
    xatolarniKorsat(forma, xatolar);

    const birinchiXato = Object.keys(xatolar)[0];
    if (birinchiXato) {
      forma.elements[birinchiXato].focus();
      return;
    }

    const ism = forma.elements["ism"].value.trim();
    muvaffaqiyat.textContent = "Rahmat, " + ism + "! Arizangiz qabul qilindi. Usta siz bilan bog'lanadi.";
    muvaffaqiyat.hidden = false;
    forma.reset();
  });

  /* Foydalanuvchi maydonni tuzatganda xato matni o'chadi */
  forma.addEventListener("input", function (e) {
    const xatoElementi = document.getElementById("xato-" + e.target.name);
    if (xatoElementi) {
      xatoElementi.textContent = "";
      e.target.removeAttribute("aria-invalid");
    }
  });
}
