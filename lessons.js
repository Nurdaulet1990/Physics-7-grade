// 课程清单：主页（index.html）和老师页（teacher.html）共用。
// 新课：把课程页上传到 GitHub，然后在这里加一行（或把 file: null 改成文件名）。
// 什么时候对学生开放，在 teacher.html 的“课程开放时间”里设置。
window.LESSONS = [
  { n: "9",     file: "sanaq_denesi.html", id: "07-sanaq-denesi", para: "§7–8", title: "Механикалық қозғалыс. Санақ денесі", q: "Бір дене әрі қозғалып, әрі тыныштықта бола ала ма?", concepts: ["C01","C02","C05","C06"] },
  { n: "10",    file: "traektoriya.html",  id: "10-traektoriya",  para: "§7–8", title: "Траектория. Жүрілген жол. Орын ауыстыру", q: "Мектепке барып, үйге қайттың. Жолың 2 км. Орын ауыстыруың қанша?", concepts: ["C03","C04"] },
  { n: "11",    file: "birqalypty.html",   id: "11-birqalypty",   para: "§9",   title: "Түзусызықты бірқалыпты және бірқалыпсыз қозғалыстар", q: "Дене қалай қозғалып жатқанын қарап тұрып емес, ізінен қалай білеміз?", concepts: ["C08"] },
  { n: "12",    file: "zhyldamdyq.html",   id: "12-zhyldamdyq",   para: "§10",  title: "Жылдамдық және орташа жылдамдықты есептеу", q: "Екі дене жарысты. Кім жылдам және оны санмен қалай айтамыз?", concepts: ["C09","C10"] },
  { n: "13",    file: "grafik_turgyzu.html", id: "13-grafik-turgyzu", para: "§11",  title: "Қозғалыс графигі: кестеден сызыққа", q: "Қозғалысты қағаз бетіндегі бір сызыққа қалай айналдырамыз?", concepts: ["C11","C12"] },
  { n: "ТЖБ",   file: "tzhb_dayyndyq.html", id: "qaytalau-tzhb1", para: "I тоқсан", title: "ТЖБ-ға дайындық: жылдамдық және орташа жылдамдық", q: "Орташа жылдамдық неге жылдамдықтардың жай ортасы емес?", concepts: ["C09","C10","C04","C02"] },
  { n: "14",    file: null,                id: "14-grafik-oqu",   para: "§11",  title: "Графикті оқу: тыныштық, жылдамдық", q: "", concepts: ["C13","C14"] },
  { n: "17",    file: "massa.html",        id: "17-massa",        para: "§11",  title: "Масса және массаны өлшеу", q: "Денедегі заттың мөлшерін қалай өлшейміз — және ол ғарышта өзгере ме?", concepts: ["C15","C16","C17"] },
  { n: "18",    file: "tygyzdyq_kolem.html",   id: "18-kolem",           para: "§12",     title: "Денелердің көлемін өлшеу", q: "Пішіні дұрыс емес тастың көлемін қалай табамыз?", concepts: [] },
  { n: "19",    file: "tygyzdyq19.html",       id: "19-tygyzdyq",        para: "§13",     title: "Тығыздықты есептеу", q: "Бес белгісіз кесек. Қайсылары бір заттан жасалған?", concepts: [] },
  { n: "20",    file: "tygyzdyq20.html",       id: "20-tygyzdyq-magyna", para: "§13",     title: "Заттың тығыздығы және бірлігі", q: "Неге бір заттың тығыздығы әрқашан бірдей?", concepts: [] },
  { n: "21",    file: "tygyzdyq21.html",       id: "21-lab",             para: "№3 лаб",  title: "№3 зертханалық: тығыздықты анықтау", q: "Тығыздықты өзің өлше", concepts: [] },
  { n: "22",    file: "tygyzdyq22.html",       id: "22-tygyzdyq",        para: "§13",     title: "Тығыздық — қорытынды · БЖБ №3", q: "Бәрін қайталап, БЖБ-ға дайындал", concepts: [] },
  { n: "Есеп",  file: "tygyzdyq_esepter.html", id: "tygyzdyq-esepter",   para: "§11–13",  title: "Тығыздық — есеп шығару (17–22)", q: "Әр сабақтың 5 есебі бір жерде", concepts: [] },
  { n: "23",    file: "inerciya.html",     id: "23-inerciya",     para: "§14",  title: "Инерция құбылысы", q: "Денені не тоқтатады — тоқтататын ештеңе болмаса ше?", concepts: ["C18","C19"] }
];
