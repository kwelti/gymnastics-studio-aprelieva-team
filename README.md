# Aprelieva Team — статичний сайт

Експорт із Webstudio. Сайт використовує абсолютні шляхи (`/assets/...`), тому **не працює** при відкритті HTML-файлів напряму (через `file://`). Потрібен веб-сервер.

## Структура проєкту

```
Gymnastics_Studio_-_Aprelieva_team/   ← <папка_проєкту>
├── index.html          # Головна сторінка
├── coaches/
│   └── index.html      # Сторінка тренерів
├── events/
│   └── index.html      # Сторінка подій
├── assets/             # CSS, JS, зображення, шрифти
└── favicon.ico
```

## Локальний запуск

### Windows — двічі клікни `start.bat`

Або вручну:

```cmd
python -m http.server 8080
```

### macOS / Linux — запусти `start.sh`

```bash
./start.sh
```

Або вручну:

```bash
python3 -m http.server 8080
```

Після запуску відкрий http://localhost:8080 у браузері. Щоб зупинити — `Ctrl+C`.

## Деплой на хостинг

### 1. Підготовка

Завантаж **вміст** `<папка_проєкту>` на сервер так, щоб `index.html` опинився в корені сайту.

Куди саме заливати — залежить від хостингу:
- `public_html/`, `www/`, `htdocs/` — на shared-хостингу
- `/var/www/html/` — на VPS з Linux
- `C:\inetpub\wwwroot\` — на Windows Server з IIS

**Важливо:** структура папок має зберегтися:
- `/index.html`
- `/coaches/index.html`
- `/events/index.html`
- `/assets/...`

### 2. Налаштування сервера

**Nginx** (Linux VPS):

```nginx
server {
    listen 80;
    server_name <твій-домен.com>;

    root /var/www/<папка_проєкту>;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }
}
```

**Apache** (Linux VPS / shared-хостинг) — створи файл `.htaccess` у корені `<папка_проєкту>`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)$ $1.html [NC,L]
```

**IIS** (Windows Server) — через `web.config` у корені `<папка_проєкту>`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <defaultDocument>
            <files>
                <clear />
                <add value="index.html" />
            </files>
        </defaultDocument>
        <rewrite>
            <rules>
                <rule name="Clean URLs" stopProcessing="true">
                    <match url="^(.*)$" />
                    <conditions>
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="{R:1}.html" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

**Vercel / Netlify / Firebase Hosting:** просто залий папку як є, додаткових налаштувань не потрібно. Прив'яжи свій домен у налаштуваннях платформи.

## Що треба замінити на своє

| Що підставити           | Де                                  |
|-------------------------|-------------------------------------|
| `<папка_проєкту>`       | шлях до папки з сайтом              |
| `<твій-домен.com>`      | доменне ім'я (в конфігу Nginx)      |

## Швидкий деплой на Netlify (безкоштовно)

1. Відкрий [app.netlify.com/drop](https://app.netlify.com/drop)
2. Перетягни **всю теку проєкту** в браузер
3. Сайт онлайн за ~30 секунд. У Site settings → Change site name зміни URL.

Або через CLI: `npx netlify-cli deploy --prod --dir=.`

## Як додати новий відгук

1. Закинь PNG-файл у `assets/reviews/`
2. Відкрий `assets/reviews/list.json`
3. Додай назву файлу в масив: `["IMG_4674.PNG", ..., "новий_відгук.PNG"]`
4. Карусель підхопить автоматично — перебудовувати нічого не треба.

## Чому не працює без сервера

Всі шляхи в HTML прописані як `/assets/...` (від кореня). Браузер при `file://` шукає `/assets` у корені файлової системи, а не поруч із `index.html`. Через веб-сервер `/` = корінь проєкту, і все резолвиться правильно.
