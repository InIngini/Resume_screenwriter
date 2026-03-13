// резюме-генератор/js/main.js

const DEFAULT_DATA = {
    name: "Дарья Воробьева",
    tagline: "сценарист · писатель · fullstack-разработчик",
    citizenship: "Россия",
    birthdate: "03.07.2003",
    telegram: "@InIngini",
    about: "Пишу 9 лет. Начинала с фанфиков (некоторые набирали больше 1000 лайков), сейчас работаю над собственным циклом книг в жанре фэнтези — «Пороки». Первая книга цикла уже написана. Параллельно работаю fullstack-разработчиком. Я — читатель Клуба Романтики.",
    motivation: "Я хочу работать там, где пересекаются мои интересы: литература и игры. Вакансия в Клубе Романтики дает возможность заниматься тем, что я люблю (писать истории), в среде, которую я хорошо знаю (интерактивные новеллы), и с людьми, чей язык понимаю (разработчиками).",
    quoteText: "Тьма не приходит извне — она рождается внутри",
    quoteAuthor: "из цикла «Пороки»",
    
    // Твои ссылки
    links: [
        { text: "Фикбук", url: "https://ficbook.net/authors/2049261" },
        { text: "Литнет", url: "https://litnet.com/ru/ingini-u3180748" },
        { text: "Telegram-канал", url: "https://t.me/InginiBlog" },
        { text: "Группа ВК", url: "https://vk.com/lngini" }
    ],
    
    // Твои навыки (группы)
    skillGroups: [
        {
            title: "Писательские",
            tags: ["сюжет", "диалоги", "персонажи", "редактура", "фэнтези", "dark romance", "young adult"]
        },
        {
            title: "Технические / командные",
            tags: ["Git / API", "понимание БД", "архитектура", "дедлайны", "кросс-функц.", "обратная связь"]
        }
    ],
    
    // Твои причины
    reasons: [
        { title: "Структура и эмоции.", text: "9 лет практики — сюжет, диалоги, персонажи, которым сопереживают." },
        { title: "Техническая сторона.", text: "Понимаю код, ветвления, что реализуемо в игре — упрощаю коммуникацию с командой." },
        { title: "Аудитория.", text: "Пишу не в стол, знаю платформу и запросы читателей КР." },
        { title: "Командная работа.", text: "Опыт в IT — умение слышать правки, отстаивать мнение, соблюдать сроки." }
    ],
    
    // Твои проекты
    projects: [
        {
            meta: "2024–2025 · самиздат",
            title: "Цикл книг «Пороки» (в процессе)",
            description: "Авторский цикл в жанре темное фэнтези / young adult.",
            achievements: [
                "Написана и готовится к публикации первая книга (28 глав). Веду блог, делюсь процессом, общаюсь с читателями.",
                "Проработана мифология мира, система магии, иерархия Ада, глубокие неоднозначные персонажи."
            ]
        },
        {
            meta: "9 лет · фикбук, сети",
            title: "Фанфикшн",
            description: "",
            achievements: [
                "Опыт написания разножанровых текстов, работа с разными вселенными и персонажами.",
                "Некоторые работы превысили отметку в 1000 лайков — понимание читательских ожиданий."
            ]
        },
        {
            meta: "текущий опыт · IT",
            title: "Fullstack-разработчик",
            description: "",
            achievements: [
                "Работа над крупными проектами, pet-проекты с нуля, взаимодействие в команде, оценка сроков.",
                "Этот опыт помогает смотреть на игру не только как автор, но и как человек, понимающий механику создания."
            ]
        }
    ],
    
    // Твое фото
    photos: [{
        url: "https://sun9-48.userapi.com/s/v1/ig2/5nLKXhwGRYTwhCCtouonfPIVls9heb9GT3KKzh8kVf8PEBr-DG13Tl6VoGZLfNh6nY4dN8EVNY0ha9guKNZqPAr-.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x214,240x320,360x480,480x641,540x721,640x854,720x961,959x1280&from=bu&cs=959x0"
    }],
    
    // Кастомные блоки (пока пусто)
    customBlocks: []
};

const RESUME_TEMPLATE = `
<div class="resume-card">
    <div class="header">
        <div class="name-title">
            <h1>{{name}}</h1>
            <div class="tagline">{{tagline}}</div>
        </div>
        <div class="quick-info">
            <span><i>гражданство</i> {{citizenship}}</span>
            <span><i>дата рождения</i> {{birthdate}}</span>
            <span><i>телеграм</i> {{telegram}}</span>
            <span><i>готовность</i> удаленная работа</span>
        </div>
    </div>

    <div class="main-grid">
        <div class="sidebar">
            {{photoBlock}}

            <div class="section">
                <div class="section-title">портфолио</div>
                <ul class="link-list">{{linksBlock}}</ul>
            </div>

            {{skillsBlocks}}

            <div class="section">
                <div class="section-title">знание платформы</div>
                <div style="color:#b5c0d0; font-size:0.9rem;">
                    читатель Клуба Романтики, понимание механик и аудитории
                </div>
            </div>

            {{customSidebarBlocks}}
            {{quoteBlock}}
        </div>

        <div class="main-content">
            <div class="content-block">
                <div class="section-title">обо мне</div>
                <p>{{about}}</p>
            </div>

            <div class="content-block">
                <div class="section-title">почему я подхожу вам</div>
                <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                    {{reasonsBlock}}
                </div>
            </div>

            <div class="content-block">
                <div class="section-title">ключевые проекты</div>
                {{projectsBlock}}
            </div>

            {{customMainBlocks}}

            <div class="content-block">
                <div class="section-title">почему эта вакансия</div>
                <div class="quote-line">{{motivation}}</div>
            </div>

            <div class="footer-note">
                резюме обновлено {{currentDate}}
            </div>
        </div>
    </div>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
    const formHandler = new ResumeFormHandler('resumeForm', 'resumePreview', RESUME_TEMPLATE, DEFAULT_DATA);
    
    document.getElementById('downloadPdfBtn').addEventListener('click', (event) => {
        PDFGenerator.generateFromElement('resumePreview', 'resume.pdf');
    });
});