/* data.js — katalog ma'lumotlari: Oltin Qaychi sartaroshxonasi xizmatlari */

const kategoriyaNomlari = {
  soch: "Soch olish",
  soqol: "Soqol va mo'ylov",
  kombo: "Kombo xizmatlar",
  bolalar: "Bolalar uchun",
  parvarish: "Parvarish"
};

const mahsulotlar = [
  { id: 1, nomi: "Erkaklar soch turmagi", kategoriya: "soch", narx: 40000, mavjud: true,
    rasm: "rasmlar/soch.svg", teglar: ["mashhur", "klassik"], davomiylik: 30,
    tavsif: "Klassik va zamonaviy erkaklar soch turmagi. Usta avval maslahat beradi." },
  { id: 2, nomi: "Bolalar soch turmagi", kategoriya: "bolalar", narx: 30000, mavjud: true,
    rasm: "rasmlar/bolalar.svg", teglar: ["bolalar", "tez"], davomiylik: 25,
    tavsif: "12 yoshgacha bolalar uchun. Sabr bilan va ehtiyotkorlik bilan." },
  { id: 3, nomi: "Mashinkada qisqa olish", kategoriya: "soch", narx: 25000, mavjud: true,
    rasm: "rasmlar/soch.svg", teglar: ["tez", "qisqa"], davomiylik: 20,
    tavsif: "Sochni bir xil uzunlikda tez va tekis olish." },
  { id: 4, nomi: "Soqolni shakllantirish", kategoriya: "soqol", narx: 25000, mavjud: true,
    rasm: "rasmlar/soqol.svg", teglar: ["soqol", "shakl"], davomiylik: 20,
    tavsif: "Soqolga chiroyli shakl berish va chiziqlarini tekislash." },
  { id: 5, nomi: "Ustara bilan olish", kategoriya: "soqol", narx: 30000, mavjud: true,
    rasm: "rasmlar/soqol.svg", teglar: ["ustara", "mashhur"], davomiylik: 25,
    tavsif: "Issiq sochiq bilan tayyorlab, ustara bilan tekis olish." },
  { id: 6, nomi: "Soch + soqol kombo", kategoriya: "kombo", narx: 52000, mavjud: true,
    rasm: "rasmlar/kombo.svg", teglar: ["chegirma", "mashhur"], davomiylik: 55,
    tavsif: "Ikkala xizmat birga: umumiy narxdan 20% chegirma." },
  { id: 7, nomi: "Fade soch turmagi", kategoriya: "soch", narx: 50000, mavjud: true,
    rasm: "rasmlar/soch.svg", teglar: ["zamonaviy", "yangi"], davomiylik: 40,
    tavsif: "Yon tomonlari pastga qarab silliq qisqarib boradigan zamonaviy shakl." },
  { id: 8, nomi: "Ota va o'g'il kombo", kategoriya: "kombo", narx: 60000, mavjud: true,
    rasm: "rasmlar/kombo.svg", teglar: ["oila", "yangi"], davomiylik: 50,
    tavsif: "Ota va bola uchun birga soch olish, qulay narxda." },
  { id: 9, nomi: "Soch yuvish va massaj", kategoriya: "parvarish", narx: 20000, mavjud: true,
    rasm: "rasmlar/parvarish.svg", teglar: ["massaj", "dam olish"], davomiylik: 15,
    tavsif: "Iliq suvda yuvish va yengil bosh massaji." },
  { id: 10, nomi: "Yuz parvarishi (niqob)", kategoriya: "parvarish", narx: 35000, mavjud: false,
    rasm: "rasmlar/parvarish.svg", teglar: ["parvarish", "yangi"], davomiylik: 25,
    tavsif: "Yuz terisi uchun tozalovchi niqob. Hozircha vaqtincha mavjud emas." },
  { id: 11, nomi: "Mo'ylovni tartiblash", kategoriya: "soqol", narx: 15000, mavjud: true,
    rasm: "rasmlar/soqol.svg", teglar: ["tez", "mo'ylov"], davomiylik: 10,
    tavsif: "Mo'ylovni qaychi bilan toza va tekis qilib tartiblash." },
  { id: 12, nomi: "To'y oldi soch turmagi", kategoriya: "soch", narx: 80000, mavjud: false,
    rasm: "rasmlar/soch.svg", teglar: ["bayram", "maxsus"], davomiylik: 60,
    tavsif: "To'y va bayramlar uchun maxsus uslub. Oldindan band qilish kerak." }
];
