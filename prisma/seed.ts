import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const pool = new Pool({ connectionString: DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // =====================
  // 1. ADMIN USER
  // =====================
  const email = "aziza@gmail.com";
  const password = "root1234";
  const hashedPassword = await bcrypt.hash(password, 10);

  let adminUser = await prisma.user.findUnique({ where: { email } });

  if (adminUser) {
    adminUser = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN", password: hashedPassword },
    });
    console.log("✅ Admin yangilandi:", email);
  } else {
    adminUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName: "Admin",
        age: 30,
        province: "Toshkent",
        region: "Toshkent",
        schoolName: "PIRLS Admin",
        role: "ADMIN",
      },
    });
    console.log("✅ Admin yaratildi:", email);
  }

  // =====================
  // 2. AQLLI GRETEL PASSAGE
  // =====================
  const passageTitle = "Aqlli Gretel";
  const existingPassage = await prisma.passage.findFirst({
    where: { title: passageTitle },
  });

  if (existingPassage) {
    console.log("ℹ️  'Aqlli Gretel' passage allaqachon mavjud, o'tkazib yuborildi.");
  } else {
    await prisma.passage.create({
      data: {
        title: passageTitle,
        grade: "GRADE_3",
        imageUrl: "/gretel.jpg",
        teacherId: adminUser.id,
        content: `Bir savdogarning Gretel ismli oshpazi bor edi. U epchil, quvnoq, ertalabdan kechgacha qo'shiq kuylashni va baland poshnali oyoq kiyim kiyib yurishni yoqtirardi. Ko'zgu oldida o'ng tomonga yoki chap tomonga burilib, o'z-o'ziga "Faqatgina men chiroyli qizman" derdi. Quvonganidan bir ho'plam sharbatni ichib ishga kirishar edi. Shunda uning qo'l - qo'liga tegmas, sho'rvasi har doim shirin, qovurdog'i esa undanda shirinroq bo'lar edi.

Bir kuni xo'jayini "Gretel, choyxonachi Mixel menikiga mehmonga keladi. Ikkita tovuqni qovur, iltimos, bir tovuq unga kamlik qiladi" - dedi.
- Yaxshi, dedi xo'jayin va mehmonni olib kelishga ketdi.

Gretel esa deraza oldiga o'tirib, ozgina dam olish uchun bir stakan sharbat ichdi. Shu vaqt yo'ldan bir kambag'al ayol to'rtta bolasi bilan o'tib ketayotgan edi. Bolalar qovurilgan tovuq hidini sezishdi va yig'lay boshlashdi.
- Oyijon, oyi biz och qoldik!..

Gretel "nima uchun qorni to'qlarni ovqatlantirishim kerak, ochlarni hech narsasiz yuboraymi, uydan haydaymi?" dedida. "Ey, yaxshi ayol, bu yoqqa kel", deb ayolni chaqirdi va har bir bolaga tovuq qanotidan uzib, derazadan uzatdi. Och bolalar esa yanada ko'proq yeyishni xohlab "Biz yana xohlaymiz! Biz yana xohlaymiz!" deb qichqirishdi.

"Ey Gretel quvnoqroq bo'l! Agar daryoni o'rtasigacha suzgan bo'lsang, oxirigacha suzib borish kerak", - dedi qiz o'ziga o'zi. U qovurilgan tovuqlarning oyoqlarini kesib, kichkintoylarni to'ygunicha ovqatlantirdi.

U qolgan tovuqlarni o'rab, ayolga berdi, yana xaltasiga non ham soldi va o'zining sandig'idan ikki kumush tanga olib berdi. Onasi va bolalari unga egilib-egilib ta'zim qilib, yo'llarida davom etishdi.

"O'ylaymanki, men xayrli ish qildim va uni nishonlash gunoh emas", - dedi o'ziga o'zi Gretel. "Menda yana botirlik paydo bo'lishi uchun, yana bir qultum sharbat ichaman". U shunday qildi ham.

Shu vaqtda xo'jayin qaytib keldi.
- Gretel, tovuqlar tayyormi? Tez orada bizning mehmonimiz keladi.
- Tayyor, xo'jayin hammasini keragicha qildim. Faqat sizga ma'lum qilamanki, tovuqlarni kesadigan pichog'imiz o'tmas bo'lib qoldi. Uni o'tkirlash kerak.

Xo'jayin pichoqni oldi va o'tkirlay boshladi. Pichoq bilan egov o'rtasidagi g'ij-g'ij degan ovoz butun ko'chaga taralar edi.

Epchil Gretel bir sakrab mehmonga peshvoz chiqdi va sekin shivirladi: "O janob Mixel, mening xo'jayinim dahshatli ish o'ylab topdi. U sizni kechki ovqatga taklif qildi, ammo uning niyati yomon. U sizning quloqlaringizni kesib olmoqchi. Eshityapsizmi, u pichoqni qanday o'tkirlayapti?"

Mehmon qo'rqib ketdi va oyog'ini qo'liga olib uyga chopdi. Aqlli Gretel esa xo'jayiniga borib shunday dedi: "Voh-voh! Siz qanday mehmonni taklif qildingiz! Janob Mixel lagandan tovuqlarni olib, qochib ketdi. Uyatsiz, sizga qanotlarini ham qoldirmadi".

Xo'jayin qo'lida o'tkirlayotgan pichog'i bilan ayvongacha sakrab chiqdi va Mixelni ushlab olish uchun ko'chaga yugurib ketdi. Lekin bu paytda ancha kech tushib, qorong'ulik quyuqlashgan edi.

Xo'jayin Mixeldan hech bo'lmasa tovuqning bitta qanotini berishini so'rar, Mixel esa xo'jayin undan hech bo'lmasa bir qulog'ingni ber deyapti deb tushunayotgandi. Mixel quloqlarini qutqarish uchun uyga kirib eshikni ustidan qulfladi.

Aqlli Gretel esa shu vaqtda yerto'laga tushib quvonchidan yana bir qadah sharbat ichdi. "Savobli ish qilish va uni nishonlash gunoh emas" - dedi o'ziga o'zi. Shundan buyon xo'jayin bilan semiz Mixel har uchrashganda salomlashmasdan bir-birlariga xuddi urushqoq mushuklardek hurpayadigan bo'ldilar.`,
        questions: {
          create: [
            {
              content: "Gretel kim edi?",
              type: "CLOSED",
              options: ["Savdogar", "Oshpaz", "Nonvoy", "Dehqon"],
              correctOptionIndex: 1,
              correctAnswer: null,
            },
            {
              content: "Gretelga xos bo'lgan xususiyatlarni aniqlang.",
              type: "CLOSED",
              options: ["Epchil", "Quvnoq", "Qo'shiq kuylashni yoqtiradigan", "Barcha javoblar to'g'ri"],
              correctOptionIndex: 3,
              correctAnswer: null,
            },
            {
              content: "Gretel ovqat tayyorlashdan oldin odatda nima qilardi?",
              type: "OPEN",
              options: [],
              correctOptionIndex: 0,
              correctAnswer: "Sharbat ichardi.",
            },
            {
              content: "Bolalar nima uchun yig'lay boshlashdi?",
              type: "OPEN",
              options: [],
              correctOptionIndex: 0,
              correctAnswer: "Qovurilgan tovuq hidini sezib, och bo'lgani uchun.",
            },
            {
              content: "Nima sababdan bolalar tovuq yeyishni xohlab qolishdi?",
              type: "CLOSED",
              options: [
                "Chunki ularni xo'jayin chaqirdi",
                "Chunki och edilar",
                "Chunki Gretel taklif qildi",
                "Chunki ovqat sovib qoldi",
              ],
              correctOptionIndex: 1,
              correctAnswer: null,
            },
            {
              content: "Gretelning bolalarga yordam berishi uning qaysi sifatini ko'rsatadi?",
              type: "CLOSED",
              options: ["Ayyorlik", "Mehribonlik", "Dangasalik", "Beparvolik"],
              correctOptionIndex: 1,
              correctAnswer: null,
            },
            {
              content: `"Agar daryoni o'rtasigacha suzgan bo'lsang, oxirigacha suzib borish kerak" degan gapni Gretel nima ma'noda aytdi?`,
              type: "OPEN",
              options: [],
              correctOptionIndex: 0,
              correctAnswer: "Yaxshilikni oxirigacha qilish kerakligi, boshlagan ishni yakunlash zarurligini anglatadi.",
            },
            {
              content: "Gretel ayol va bolalarga nimalar berdi?",
              type: "CLOSED",
              options: [
                "Faqat non",
                "Tovuqlar va sharbat",
                "Tovuqlar, non va kumush tanga",
                "Faqat pul",
              ],
              correctOptionIndex: 2,
              correctAnswer: null,
            },
            {
              content: `Nima uchun Mixel xo'jayin "qulog'ingni ber" deyapti deb o'yladi?`,
              type: "OPEN",
              options: [],
              correctOptionIndex: 0,
              correctAnswer: "Gretel uni qo'rqitib, xo'jayin quloqlarini kesmoqchi deb aytgani uchun.",
            },
            {
              content: "Gretelning Mixelga aytgan gaplari hikoyada qanday rol o'ynadi?",
              type: "CLOSED",
              options: [
                "Mehmonni xursand qildi",
                "Voqealarni yanada murakkablashtirdi",
                "Mehmonni qochishga majbur qildi",
                "Ovqatni saqlab qoldi",
              ],
              correctOptionIndex: 2,
              correctAnswer: null,
            },
            {
              content: "Siz Gretelning xo'jayini va Mixelga qilgan ishini to'g'ri deb hisoblaysizmi? Nima uchun?",
              type: "OPEN",
              options: [],
              correctOptionIndex: 0,
              correctAnswer: "O'quvchining shaxsiy fikri asosida baholanadi.",
            },
            {
              content: "Hikoya uchun eng mos sarlavhani tanlang.",
              type: "CLOSED",
              options: [
                "Och bolalar",
                "Mehmon va xo'jayin",
                "Aqlli Gretel",
                "Tovuqlar mojarosi",
              ],
              correctOptionIndex: 2,
              correctAnswer: null,
            },
          ],
        },
      },
    });
    console.log("✅ 'Aqlli Gretel' passage va 12 ta savol qo'shildi!");
  }
}

main()
  .catch((e) => {
    console.error("❌ Xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
