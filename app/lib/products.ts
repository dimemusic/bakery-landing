// Single source of truth for the menu.
//
// Every sellable item is a `Product`. The landing page groups them into `Category` cards
// (one card per category, one chip per product). Prices, descriptions, ingredients,
// allergens, storage, shelf life and kcal are DEMO data — see the footer note on the site.

/** The 14 allergens that EU Regulation 1169/2011 requires to be declared (Ukrainian names). */
export const EU_ALLERGENS = [
  "глютен",
  "ракоподібні",
  "яйця",
  "риба",
  "арахіс",
  "соя",
  "молоко",
  "горіхи",
  "селера",
  "гірчиця",
  "кунжут",
  "сульфіти",
  "люпин",
  "молюски",
] as const;
export type Allergen = (typeof EU_ALLERGENS)[number];

export type ArtKind =
  "cake" | "cookie" | "dessert" | "bun" | "eclair" | "muffin";

export type CategoryId =
  "torty" | "pechyvo" | "deserty" | "bulochky" | "tistechka" | "mafiny";

export type Category = {
  id: CategoryId;
  /** Card title */
  name: string;
  /** Short intro for the category page */
  intro: string;
  /** Cartoon sticker on the card */
  art: ArtKind;
  /** Card photo (shared by the whole category) */
  cover: { src: string; alt: string };
};

export type ProductSize = {
  id: string;
  /** "шматочок", "1 кг", "2 кг" */
  label: string;
  /** UAH */
  price: number;
  weight: string;
};

export type Product = {
  slug: string;
  category: CategoryId;
  /** Full name, e.g. "Булочка з корицею" */
  name: string;
  /** Short chip label on the category card, e.g. "З корицею" */
  label: string;
  /** One or two lines for the card */
  shortDescription: string;
  /** 2–3 warm sentences for a product page / details */
  longDescription: string;
  /** UAH per `unit` */
  price: number;
  /** What one piece is: "шматочок", "шт.", "баночка" */
  unit: string;
  /** Optional bigger formats (cakes) */
  sizes?: ProductSize[];
  /** Weight of one `unit` */
  weight: string;
  ingredients: string[];
  allergens: Allergen[];
  storage: string;
  shelfLife: string;
  kcalPer100g: number;
  image: { src: string; alt: string };
};

/** The bits of a product shown in the "Як зберігати та алергени" panel. */
export type CareInfo = Pick<Product, "storage" | "shelfLife" | "allergens">;

const IMG = "/images/products";

export const CATEGORIES: Category[] = [
  {
    id: "torty",
    intro:
      "Вісім тортів — від бабусиного медовика до нью-йоркського чізкейка. Беріть шматочок до кави або цілий торт на свято: 1 чи 2 кілограми.",
    name: "Торти",
    art: "cake",
    cover: {
      src: `${IMG}/cake.jpg`,
      alt: "Багатошаровий торт із кремом і шоколадною стружкою",
    },
  },
  {
    id: "pechyvo",
    intro:
      "Печемо невеликими партіями щодня: хрусткі краї, м’яка серединка. Добре тримається в коробці, тому його зручно брати в дорогу.",
    name: "Печиво",
    art: "cookie",
    cover: {
      src: `${IMG}/cookies.jpg`,
      alt: "Свіжоспечене печиво з шоколадними краплями на решітці",
    },
  },
  {
    id: "deserty",
    intro:
      "Десерти в баночках, які приємно взяти з собою: шари крему, ягід і бісквіту. Ложку кладемо в пакет — не забудемо.",
    name: "Десерти",
    art: "dessert",
    cover: {
      src: `${IMG}/desserts.jpg`,
      alt: "Шоколадний мус у склянці з ягодою та листком м’яти",
    },
  },
  {
    id: "bulochky",
    intro:
      "Здобні булочки на домашньому тісті з щедрою начинкою. Найсмачніші в день випікання — або після 5 хвилин у духовці.",
    name: "Булочки",
    art: "bun",
    cover: {
      src: `${IMG}/buns.jpg`,
      alt: "Булочки з корицею та випічка на прилавку",
    },
  },
  {
    id: "tistechka",
    intro:
      "Маленькі тістечка для великого настрою: заварні еклери й «Картопка» зі шкільних спогадів.",
    name: "Тістечка",
    art: "eclair",
    cover: {
      src: `${IMG}/pastries.jpg`,
      alt: "Ряди шоколадних тістечок у вітрині кондитерської",
    },
  },
  {
    id: "mafiny",
    intro:
      "Вологі мафіни з ягодами, шоколадом і лимоном. Сніданок, перекус або подарунок колезі — підходить на все.",
    name: "Мафіни",
    art: "muffin",
    cover: {
      src: `${IMG}/muffins.jpg`,
      alt: "Мафіни з лохиною на дерев’яному столі",
    },
  },
];

// Shared care texts per kind of product
const CAKE_STORAGE =
  "У холодильнику при 2–6 °C. Перед подачею дайте постояти 15 хвилин.";
const DRY_STORAGE = "У щільно закритій коробці при кімнатній температурі.";
const CHILLED_STORAGE = "Лише в холодильнику при 2–6 °C. Не заморожувати.";
const BUN_STORAGE =
  "Закрита коробка або пакет, кімнатна температура. Можна підігріти 5 хвилин у духовці при 160 °C.";
const PASTRY_STORAGE = "В холодильнику при 2–6 °C у закритій коробці.";
const MUFFIN_STORAGE =
  "У закритій коробці при кімнатній температурі, подалі від сонця.";

/** Slice / 1 kg / 2 kg for cakes. */
const cakeSizes = (slice: number, kg1: number, kg2: number): ProductSize[] => [
  { id: "slice", label: "шматочок", price: slice, weight: "≈150 г" },
  { id: "1kg", label: "1 кг", price: kg1, weight: "1 кг" },
  { id: "2kg", label: "2 кг", price: kg2, weight: "2 кг" },
];

export const PRODUCTS: Product[] = [
  /* ---------- Торти ---------- */
  {
    slug: "medovyk",
    category: "torty",
    name: "Медовик",
    label: "Медовик",
    shortDescription:
      "Тонкі медові коржі й ніжний сметанний крем. Чим довше стоїть — тим смачніший, але в нас не доживає.",
    longDescription:
      "Вісім тонких коржів на гречаному меді, промазаних сметанним кремом, — за рецептом, який у нашій родині передають разом із качалкою. За ніч у холодильнику коржі стають м’якими, як пух. Ідеальний до чаю в неділю.",
    price: 95,
    unit: "шматочок",
    sizes: cakeSizes(95, 620, 1180),
    weight: "≈150 г",
    ingredients: [
      "борошно пшеничне",
      "мед",
      "цукор",
      "яйця",
      "вершкове масло",
      "сметана",
      "сода",
    ],
    allergens: ["глютен", "яйця", "молоко"],
    storage: CAKE_STORAGE,
    shelfLife: "72 години",
    kcalPer100g: 430,
    image: {
      src: `${IMG}/cake.jpg`,
      alt: "Шматочок багатошарового медового торта з кремом",
    },
  },
  {
    slug: "napoleon",
    category: "torty",
    name: "Наполеон",
    label: "Наполеон",
    shortDescription:
      "Хрусткі листки тіста з заварним кремом. Їсти акуратно не вийде — це частина досвіду.",
    longDescription:
      "Листкове тісто, яке ми розкачуємо вручну до прозорості, і заварний крем на вершковому маслі. Верх присипаний крихтою з тих самих коржів — як у бабусі. Хрумтить зверху й тане всередині.",
    price: 90,
    unit: "шматочок",
    sizes: cakeSizes(90, 590, 1120),
    weight: "≈150 г",
    ingredients: [
      "борошно пшеничне",
      "вершкове масло",
      "молоко",
      "цукор",
      "яйця",
      "ваніль",
    ],
    allergens: ["глютен", "яйця", "молоко"],
    storage: CAKE_STORAGE,
    shelfLife: "48 годин",
    kcalPer100g: 420,
    image: {
      src: `${IMG}/cake.jpg`,
      alt: "Шматочок шаруватого торта з кремом",
    },
  },
  {
    slug: "chervonyi-oksamyt",
    category: "torty",
    name: "Червоний оксамит",
    label: "Червоний оксамит",
    shortDescription:
      "Вологий червоний корж і сирний крем. Святковий навіть тоді, коли свята немає.",
    longDescription:
      "Оксамитовий бісквіт на кефірі з ледь помітним какао і легкий крем із вершкового сиру. Яскравий на розрізі, ніжний на смак. Беруть на дні народження, а потім повертаються просто так.",
    price: 110,
    unit: "шматочок",
    sizes: cakeSizes(110, 720, 1380),
    weight: "≈150 г",
    ingredients: [
      "борошно пшеничне",
      "кефір",
      "цукор",
      "яйця",
      "какао",
      "вершковий сир",
      "вершкове масло",
      "харчовий барвник",
    ],
    allergens: ["глютен", "яйця", "молоко"],
    storage: CAKE_STORAGE,
    shelfLife: "72 години",
    kcalPer100g: 390,
    image: {
      src: `${IMG}/red-velvet.jpg`,
      alt: "Шматочок торта «Червоний оксамит» із білим кремом",
    },
  },
  {
    slug: "kyivskyi",
    category: "torty",
    name: "Київський",
    label: "Київський",
    shortDescription:
      "Хрусткі горіхові безе й масляний крем. Легенда, яку колись возили з Києва в круглих коробках.",
    longDescription:
      "Два шари повітряного безе з фундуком і кешью, між ними — масляний крем із какао. Печемо його повільно, щоб безе лишалося хрустким, а всередині трохи тягнулося. Той самий смак, що й у дитинстві.",
    price: 120,
    unit: "шматочок",
    sizes: cakeSizes(120, 780, 1500),
    weight: "≈130 г",
    ingredients: [
      "яєчні білки",
      "цукор",
      "фундук",
      "кешью",
      "вершкове масло",
      "какао",
      "борошно пшеничне",
    ],
    allergens: ["яйця", "горіхи", "молоко", "глютен"],
    storage: CAKE_STORAGE,
    shelfLife: "5 діб",
    kcalPer100g: 470,
    image: {
      src: `${IMG}/cake.jpg`,
      alt: "Шматочок святкового торта з кремом",
    },
  },
  {
    slug: "prazkyi",
    category: "torty",
    name: "Празький",
    label: "Празький",
    shortDescription:
      "Шоколадний бісквіт, абрикосовий джем і шоколадна глазур. Строгий на вигляд, ніжний усередині.",
    longDescription:
      "Три шоколадні коржі, тонкий шар абрикосового джему й крем «Празький» на згущеному молоці. Зверху — дзеркальна шоколадна глазур. Для тих, хто любить шоколад без зайвих прикрас.",
    price: 105,
    unit: "шматочок",
    sizes: cakeSizes(105, 680, 1300),
    weight: "≈150 г",
    ingredients: [
      "борошно пшеничне",
      "какао",
      "цукор",
      "яйця",
      "вершкове масло",
      "згущене молоко",
      "абрикосовий джем",
      "чорний шоколад",
    ],
    allergens: ["глютен", "яйця", "молоко", "соя"],
    storage: CAKE_STORAGE,
    shelfLife: "72 години",
    kcalPer100g: 400,
    image: { src: `${IMG}/prague.jpg`, alt: "Шоколадний бісквітний торт" },
  },
  {
    slug: "morkvianyi",
    category: "torty",
    name: "Морквяний",
    label: "Морквяний",
    shortDescription:
      "Пряний бісквіт із морквою й волоськими горіхами під хмаринкою сирного крему.",
    longDescription:
      "Свіжа морква, кориця, мускатний горіх і жменя волоських горіхів — бісквіт виходить вологим і ароматним. Зверху — крем із вершкового сиру з цедрою апельсина. Осінній на смак у будь-яку пору року.",
    price: 100,
    unit: "шматочок",
    sizes: cakeSizes(100, 650, 1240),
    weight: "≈150 г",
    ingredients: [
      "морква",
      "борошно пшеничне",
      "цукор",
      "яйця",
      "олія",
      "волоські горіхи",
      "кориця",
      "вершковий сир",
      "апельсинова цедра",
    ],
    allergens: ["глютен", "яйця", "горіхи", "молоко"],
    storage: CAKE_STORAGE,
    shelfLife: "72 години",
    kcalPer100g: 380,
    image: {
      src: `${IMG}/carrot-cake.jpg`,
      alt: "Шматочок морквяного торта з сирним кремом",
    },
  },
  {
    slug: "shokoladnyi-z-vyshneiu",
    category: "torty",
    name: "Шоколадний з вишнею",
    label: "Шоколадний з вишнею",
    shortDescription:
      "Шоколадний бісквіт, вишня й вершки. Темний, соковитий, з кислинкою в кожному шарі.",
    longDescription:
      "Шоколадний бісквіт, просочений вишневим сиропом, ціла вишня й легкі вершки між шарами. Кислинка вишні робить шоколад ще глибшим. Найпопулярніший торт на сімейних святах.",
    price: 115,
    unit: "шматочок",
    sizes: cakeSizes(115, 740, 1420),
    weight: "≈150 г",
    ingredients: [
      "борошно пшеничне",
      "какао",
      "цукор",
      "яйця",
      "вишня",
      "вершки",
      "чорний шоколад",
    ],
    allergens: ["глютен", "яйця", "молоко", "соя"],
    storage: CAKE_STORAGE,
    shelfLife: "48 годин",
    kcalPer100g: 360,
    image: {
      src: `${IMG}/chocolate-cherry.jpg`,
      alt: "Шоколадний торт із вишнею зверху",
    },
  },
  {
    slug: "chizkeik-niu-iork",
    category: "torty",
    name: "Чізкейк Нью-Йорк",
    label: "Чізкейк Нью-Йорк",
    shortDescription:
      "Щільний вершковий сир на пісочній основі з печива. Класика, запечена повільно й без поспіху.",
    longDescription:
      "Вершковий сир, сметана й ваніль на основі з подрібненого печива з маслом. Запікаємо на водяній бані, щоб поверхня лишалася гладкою, а текстура — шовковою. Смачний сам по собі, але з ягідним соусом — ще краще.",
    price: 120,
    unit: "шматочок",
    sizes: cakeSizes(120, 790, 1520),
    weight: "≈150 г",
    ingredients: [
      "вершковий сир",
      "сметана",
      "цукор",
      "яйця",
      "пісочне печиво",
      "вершкове масло",
      "ваніль",
    ],
    allergens: ["молоко", "яйця", "глютен"],
    storage: CAKE_STORAGE,
    shelfLife: "5 діб",
    kcalPer100g: 320,
    image: {
      src: `${IMG}/ny-cheesecake.jpg`,
      alt: "Шматочок класичного чізкейка з лохиною",
    },
  },

  /* ---------- Печиво ---------- */
  {
    slug: "vivsiane-z-rodzynkamy",
    category: "pechyvo",
    name: "Вівсяне печиво з родзинками",
    label: "Вівсяне з родзинками",
    shortDescription:
      "М’яке всередині, з хрусткими краями. Родзинок рівно стільки, щоб кожен укус був із сюрпризом.",
    longDescription:
      "Вівсяні пластівці, коричневий цукор і темні родзинки, вимочені в чаї. Печемо невеликими партіями, щоб краї хрустіли, а серединка лишалася м’якою. Найкращий друг склянки молока.",
    price: 28,
    unit: "шт.",
    weight: "≈45 г",
    ingredients: [
      "вівсяні пластівці",
      "борошно пшеничне",
      "вершкове масло",
      "коричневий цукор",
      "яйця",
      "родзинки",
      "кориця",
    ],
    allergens: ["глютен", "молоко", "яйця"],
    storage: DRY_STORAGE,
    shelfLife: "7 діб",
    kcalPer100g: 430,
    image: { src: `${IMG}/oat-cookies.jpg`, alt: "Стос вівсяного печива" },
  },
  {
    slug: "z-shokoladnymy-krapliamy",
    category: "pechyvo",
    name: "Печиво з шоколадними краплями",
    label: "З шоколадними краплями",
    shortDescription:
      "Золотисте печиво з шматочками шоколаду, що ще трохи тануть у руці.",
    longDescription:
      "Вершкове масло, коричневий цукор і щедра жменя бельгійського шоколаду. Тісто відпочиває добу в холодильнику, тому смак виходить карамельним і глибоким. Розламайте теплим — і побачите, як тягнеться шоколад.",
    price: 32,
    unit: "шт.",
    weight: "≈50 г",
    ingredients: [
      "борошно пшеничне",
      "вершкове масло",
      "коричневий цукор",
      "яйця",
      "чорний шоколад",
      "ваніль",
      "сіль",
    ],
    allergens: ["глютен", "молоко", "яйця", "соя"],
    storage: DRY_STORAGE,
    shelfLife: "7 діб",
    kcalPer100g: 480,
    image: {
      src: `${IMG}/cookies.jpg`,
      alt: "Печиво з шоколадними краплями на решітці",
    },
  },
  {
    slug: "myhdalne",
    category: "pechyvo",
    name: "Мигдальне печиво",
    label: "Мигдальне",
    shortDescription:
      "Ніжне, трохи хрумке, з мигдалевим ароматом. До кави — ідеально.",
    longDescription:
      "Мигдальне борошно, білки й тонкі пластівці мигдалю зверху. Хрумке ззовні й ледь в’язке всередині, з легким ароматом апельсинової цедри. Саме те, що хочеться до вечірньої кави.",
    price: 35,
    unit: "шт.",
    weight: "≈35 г",
    ingredients: [
      "мигдальне борошно",
      "мигдальні пластівці",
      "цукор",
      "яєчні білки",
      "апельсинова цедра",
      "борошно пшеничне",
    ],
    allergens: ["горіхи", "яйця", "глютен"],
    storage: DRY_STORAGE,
    shelfLife: "10 діб",
    kcalPer100g: 470,
    image: {
      src: `${IMG}/almond-cookies.jpg`,
      alt: "Кошик із домашнім печивом",
    },
  },

  /* ---------- Десерти ---------- */
  {
    slug: "tiramisu",
    category: "deserty",
    name: "Тірамісу",
    label: "Тірамісу",
    shortDescription:
      "Кавове, ніжне, з какао зверху. Вистачає однієї ложки, щоб замовкнути.",
    longDescription:
      "Савоярді, просочені міцним еспресо, і крем із маскарпоне — шар за шаром у баночці. Ми витримуємо його добу, щоб смаки встигли подружитися. Какао зверху — в останню мить перед тим, як віддати вам.",
    price: 95,
    unit: "баночка",
    weight: "150 г",
    ingredients: [
      "маскарпоне",
      "печиво савоярді",
      "кава еспресо",
      "цукор",
      "яйця",
      "вершки",
      "какао",
    ],
    allergens: ["молоко", "яйця", "глютен"],
    storage: CHILLED_STORAGE,
    shelfLife: "72 години",
    kcalPer100g: 290,
    image: { src: `${IMG}/desserts.jpg`, alt: "Тірамісу в склянці з ягодою" },
  },
  {
    slug: "chizkeik-u-banochtsi",
    category: "deserty",
    name: "Чізкейк у баночці",
    label: "Чізкейк",
    shortDescription:
      "Вершковий сир, пісочна основа й ягідний соус — усе в одній баночці.",
    longDescription:
      "Хрустка основа з печива, ніжний крем із вершкового сиру й соус із лісових ягід. Зручно взяти з собою на роботу або на прогулянку. Ложку кладемо в пакет — не забудемо.",
    price: 90,
    unit: "баночка",
    weight: "150 г",
    ingredients: [
      "вершковий сир",
      "вершки",
      "пісочне печиво",
      "вершкове масло",
      "цукор",
      "лісові ягоди",
    ],
    allergens: ["молоко", "глютен"],
    storage: CHILLED_STORAGE,
    shelfLife: "72 години",
    kcalPer100g: 300,
    image: {
      src: `${IMG}/cheesecake-dessert.jpg`,
      alt: "Чізкейк із ягідним соусом",
    },
  },
  {
    slug: "panakota-z-yahodamy",
    category: "deserty",
    name: "Панакота з ягодами",
    label: "Панакота з ягодами",
    shortDescription: "Легка, як хмаринка, з кисло-солодкими ягодами.",
    longDescription:
      "Вершки з ваніллю, ледь застиглі до ніжного тремтіння, і свіжі ягоди зверху. Без борошна й без яєць — найлегший десерт у нашій вітрині. Гарна крапка після ситного обіду.",
    price: 85,
    unit: "баночка",
    weight: "150 г",
    ingredients: [
      "вершки",
      "молоко",
      "цукор",
      "желатин",
      "ваніль",
      "полуниця",
      "малина",
    ],
    allergens: ["молоко"],
    storage: CHILLED_STORAGE,
    shelfLife: "48 годин",
    kcalPer100g: 220,
    image: {
      src: `${IMG}/panna-cotta.jpg`,
      alt: "Десерт у склянці з полуницею",
    },
  },

  /* ---------- Булочки ---------- */
  {
    slug: "bulochka-z-korytseiu",
    category: "bulochky",
    name: "Булочка з корицею",
    label: "З корицею",
    shortDescription:
      "Закручені, пахучі, з карамельною скоринкою. Запах — безкоштовний бонус.",
    longDescription:
      "Здобне тісто, закручене з маслом, корицею й коричневим цукром. Виходить ніжна серединка й карамельна скоринка знизу. Розігрійте на 5 хвилин — і кухня запахне неділею.",
    price: 55,
    unit: "шт.",
    weight: "≈110 г",
    ingredients: [
      "борошно пшеничне",
      "молоко",
      "вершкове масло",
      "цукор",
      "коричневий цукор",
      "яйця",
      "кориця",
      "дріжджі",
    ],
    allergens: ["глютен", "молоко", "яйця"],
    storage: BUN_STORAGE,
    shelfLife: "48 годин",
    kcalPer100g: 350,
    image: { src: `${IMG}/buns.jpg`, alt: "Булочки з корицею на прилавку" },
  },
  {
    slug: "bulochka-z-makom",
    category: "bulochky",
    name: "Булочка з маком",
    label: "З маком",
    shortDescription: "Пухке тісто й щедра макова начинка. Українська класика.",
    longDescription:
      "Мак ми запарюємо й перетираємо з медом — як роблять на Святвечір. Начинки кладемо не шкодуючи, щоб у кожному шматочку було видно темну спіраль. Смак, знайомий з дитинства.",
    price: 45,
    unit: "шт.",
    weight: "≈110 г",
    ingredients: [
      "борошно пшеничне",
      "мак",
      "мед",
      "молоко",
      "вершкове масло",
      "цукор",
      "яйця",
      "дріжджі",
    ],
    allergens: ["глютен", "молоко", "яйця"],
    storage: BUN_STORAGE,
    shelfLife: "48 годин",
    kcalPer100g: 340,
    image: { src: `${IMG}/buns.jpg`, alt: "Здобні булочки на прилавку" },
  },
  {
    slug: "bulochka-z-vyshneiu",
    category: "bulochky",
    name: "Булочка з вишнею",
    label: "З вишнею",
    shortDescription: "М’яка булочка з кисло-солодкою вишнею всередині.",
    longDescription:
      "Пухка здоба з цілою вишнею без кісточок і краплею вершкового сиру. Зверху — цукрова пудра, яка неодмінно опиниться на вашому светрі. Літо, яке можна з’їсти в будь-який місяць.",
    price: 50,
    unit: "шт.",
    weight: "≈110 г",
    ingredients: [
      "борошно пшеничне",
      "вишня",
      "молоко",
      "вершкове масло",
      "вершковий сир",
      "цукор",
      "яйця",
      "дріжджі",
    ],
    allergens: ["глютен", "молоко", "яйця"],
    storage: BUN_STORAGE,
    shelfLife: "48 годин",
    kcalPer100g: 300,
    image: {
      src: `${IMG}/cherry-bun.jpg`,
      alt: "Здобна булочка з ягідною начинкою",
    },
  },

  /* ---------- Тістечка ---------- */
  {
    slug: "ekler-vanilnyi",
    category: "tistechka",
    name: "Еклер ванільний",
    label: "Еклер ванільний",
    shortDescription:
      "Заварне тісто, ванільний крем і тонка глазур. Класика, що не втомлює.",
    longDescription:
      "Хрустке заварне тісто, наповнене кремом на справжній ванілі, і тонка біла глазур. Наповнюємо щоранку, щоб тісто не встигало розм’якнути. Маленьке свято на один укус — ну, максимум на два.",
    price: 65,
    unit: "шт.",
    weight: "≈80 г",
    ingredients: [
      "борошно пшеничне",
      "вершкове масло",
      "яйця",
      "молоко",
      "вершки",
      "цукор",
      "ваніль",
    ],
    allergens: ["глютен", "яйця", "молоко"],
    storage: PASTRY_STORAGE,
    shelfLife: "24 години",
    kcalPer100g: 280,
    image: {
      src: `${IMG}/choux.jpg`,
      alt: "Тістечка із заварного тіста з цукровою пудрою",
    },
  },
  {
    slug: "ekler-shokoladnyi",
    category: "tistechka",
    name: "Еклер шоколадний",
    label: "Еклер шоколадний",
    shortDescription:
      "Шоколадний крем, шоколадна глазур. Без жодних компромісів.",
    longDescription:
      "Заварне тісто з густим кремом на чорному шоколаді й блискуча шоколадна глазур. Для тих, хто вважає, що шоколаду забагато не буває. Ми з ними згодні.",
    price: 70,
    unit: "шт.",
    weight: "≈80 г",
    ingredients: [
      "борошно пшеничне",
      "вершкове масло",
      "яйця",
      "молоко",
      "вершки",
      "чорний шоколад",
      "какао",
      "цукор",
    ],
    allergens: ["глютен", "яйця", "молоко", "соя"],
    storage: PASTRY_STORAGE,
    shelfLife: "24 години",
    kcalPer100g: 300,
    image: { src: `${IMG}/pastries.jpg`, alt: "Шоколадні тістечка у вітрині" },
  },
  {
    slug: "kartopka",
    category: "tistechka",
    name: "Тістечко «Картопка»",
    label: "«Картопка»",
    shortDescription:
      "Бісквітні крихти, какао й крем. Дитяче тістечко, яке подобається всім.",
    longDescription:
      "Бісквітні крихти, масляний крем, какао й крапля коньячної есенції без алкоголю. Ліпимо вручну, тому кожне трохи інше — як справжня картоплинка. Те саме, що купували в шкільній їдальні, тільки смачніше.",
    price: 50,
    unit: "шт.",
    weight: "≈70 г",
    ingredients: [
      "бісквітна крихта",
      "вершкове масло",
      "згущене молоко",
      "какао",
      "цукор",
      "яйця",
      "борошно пшеничне",
    ],
    allergens: ["глютен", "молоко", "яйця"],
    storage: PASTRY_STORAGE,
    shelfLife: "72 години",
    kcalPer100g: 410,
    image: { src: `${IMG}/pastries.jpg`, alt: "Шоколадні тістечка у вітрині" },
  },

  /* ---------- Мафіни ---------- */
  {
    slug: "mafin-z-lokhynoiu",
    category: "mafiny",
    name: "Мафін з лохиною",
    label: "З лохиною",
    shortDescription:
      "Вологий мафін із цілими ягодами. Синя посмішка гарантована.",
    longDescription:
      "Ніжне тісто на йогурті з цілими ягодами лохини й хрусткою цукровою крихтою зверху. Ягоди лопаються під час випікання й лишають фіолетові доріжки. Сніданок, який хочеться розтягнути.",
    price: 55,
    unit: "шт.",
    weight: "≈100 г",
    ingredients: [
      "борошно пшеничне",
      "лохина",
      "йогурт",
      "цукор",
      "яйця",
      "вершкове масло",
      "розпушувач",
    ],
    allergens: ["глютен", "молоко", "яйця"],
    storage: MUFFIN_STORAGE,
    shelfLife: "72 години",
    kcalPer100g: 360,
    image: {
      src: `${IMG}/muffins.jpg`,
      alt: "Мафіни з лохиною на дерев’яному столі",
    },
  },
  {
    slug: "mafin-shokoladnyi",
    category: "mafiny",
    name: "Мафін шоколадний",
    label: "Шоколадний",
    shortDescription: "Темний, насичений, з шоколадною серединкою.",
    longDescription:
      "Какао, чорний шоколад і шматочок шоколаду в самому центрі, який тане під час випікання. Вологий і насичений, як брауні в паперовій обгортці. Розігрійте на 10 секунд — і серединка знову потече.",
    price: 55,
    unit: "шт.",
    weight: "≈100 г",
    ingredients: [
      "борошно пшеничне",
      "какао",
      "чорний шоколад",
      "цукор",
      "яйця",
      "вершкове масло",
      "молоко",
    ],
    allergens: ["глютен", "яйця", "молоко", "соя"],
    storage: MUFFIN_STORAGE,
    shelfLife: "72 години",
    kcalPer100g: 410,
    image: {
      src: `${IMG}/chocolate-muffin.jpg`,
      alt: "Шоколадні мафіни на тарілці",
    },
  },
  {
    slug: "mafin-lymonno-makovyi",
    category: "mafiny",
    name: "Мафін лимонно-маковий",
    label: "Лимонно-маковий",
    shortDescription:
      "Свіжий лимонний присмак і хрусткий мак. Легший за інші, але не менш щасливий.",
    longDescription:
      "Цедра й сік свіжих лимонів, жменя маку й тонка лимонна глазур зверху. Свіжий, трохи кислуватий, з приємним хрускотом маку. Найкращий вибір, коли хочеться солодкого, але не надто.",
    price: 50,
    unit: "шт.",
    weight: "≈100 г",
    ingredients: [
      "борошно пшеничне",
      "лимон",
      "мак",
      "цукор",
      "яйця",
      "вершкове масло",
      "йогурт",
    ],
    allergens: ["глютен", "яйця", "молоко"],
    storage: MUFFIN_STORAGE,
    shelfLife: "72 години",
    kcalPer100g: 370,
    image: {
      src: `${IMG}/lemon-muffin.jpg`,
      alt: "Мафін із хрусткою скоринкою",
    },
  },
];

/** Allergens the kitchen also handles: listed as "may contain traces" when a product doesn't contain them already (demo). */
export const KITCHEN_TRACES: Allergen[] = ["горіхи", "арахіс", "кунжут", "соя"];

export function mayContain(product: Product): Allergen[] {
  return KITCHEN_TRACES.filter((a) => !product.allergens.includes(a));
}

export const categoryHref = (id: CategoryId) => `/menu/${id}`;
export const productHref = (p: Pick<Product, "category" | "slug">) =>
  `/menu/${p.category}/${p.slug}`;

/** Up to `n` other products: same category first, then the next categories in menu order. */
export function relatedProducts(product: Product, n = 3): Product[] {
  const same = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  );
  // prefer products whose photo differs from this one and from each other
  const seen = new Set([product.image.src]);
  const fresh = same.filter(
    (p) => !seen.has(p.image.src) && seen.add(p.image.src),
  );
  const rest = same.filter((p) => !fresh.includes(p));
  same.splice(0, same.length, ...fresh, ...rest);
  if (same.length >= n) return same.slice(0, n);
  const start = CATEGORIES.findIndex((c) => c.id === product.category);
  const order = [...CATEGORIES.slice(start + 1), ...CATEGORIES.slice(0, start)];
  const others = order.flatMap((c) =>
    PRODUCTS.filter((p) => p.category === c.id).slice(0, 1),
  );
  return [...same, ...others].slice(0, n);
}

export function findCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id);
}

export function productsInCategory(id: CategoryId) {
  return PRODUCTS.filter((p) => p.category === id);
}
