\# Troubleshooting.md



\# 開發常見踩坑與問題資料庫



> 本文件用來記錄常見的開發錯誤、原因、排查方向與解決方式。

>

> 適用範圍：

> HTML / CSS / JavaScript / Vue / Bootstrap / PHP / Laravel / MySQL / Python / Flask / Git / GitHub / npm / Composer / XAMPP / Docker / API / 前後端整合 / AI Coding



\---



\# 目錄



1\. Windows / 開發環境

2\. VS Code

3\. Git

4\. GitHub

5\. HTML

6\. CSS

7\. JavaScript

8\. Bootstrap

9\. API / REST API

10\. HTTP Status Code

11\. PHP

12\. Composer

13\. Laravel

14\. Laravel Routing

15\. Laravel Controller / Model

16\. Laravel Blade

17\. Laravel Migration

18\. Laravel Database / Eloquent

19\. Laravel Authentication

20\. Laravel API

21\. Laravel 多使用者資料隔離

22\. MySQL

23\. XAMPP

24\. Python

25\. Flask

26\. SQLite

27\. Node.js

28\. npm

29\. Vue

30\. Vite

31\. 前端與後端整合

32\. CORS

33\. JSON

34\. Git / GitHub 部署

35\. Docker

36\. Docker Compose

37\. Docker + Laravel

38\. 環境變數

39\. 網路 / Port

40\. 檔案與路徑

41\. 編碼問題

42\. Authentication / Authorization

43\. Web Security

44\. CRUD

45\. Session / Cookie / Token

46\. 資料庫設計

47\. RWD / 瀏覽器相容性

48\. 效能問題

49\. 測試與 Debug

50\. Production / Deployment

51\. AI / Codex Coding

52\. 常見「看起來沒錯但就是不能用」問題

53\. 問題排查流程

54\. 個人實際踩坑紀錄



\---



\# 1. Windows / 開發環境



\## 1.1 指令找不到



常見錯誤：



\* command not found

\* is not recognized as an internal or external command

\* xxx is not recognized



可能原因：



\* 沒有安裝

\* PATH 沒設定

\* PATH 指向錯誤版本

\* Terminal 沒有重新啟動



排查：



\* where php

\* where python

\* where node

\* where npm

\* where git

\* where composer



\---



\## 1.2 多版本環境



電腦可能同時存在：



\* 多個 PHP

\* 多個 Python

\* 多個 Node.js

\* 多個 Java

\* 多個 Git



可能導致：



「我明明安裝了，為什麼 VS Code / Terminal 使用的不是這個版本？」



處理：



確認 PATH 與實際執行檔位置。



\---



\## 1.3 PATH 環境變數



常見問題：



\* Terminal 找不到程式

\* VS Code 找不到程式

\* 新安裝的程式沒有立即生效



通常需要：



1\. 確認安裝位置

2\. 加入 PATH

3\. 關閉 Terminal

4\. 重新開啟 Terminal

5\. 再確認版本



\---



\## 1.4 Port 被占用



常見：



\* 80

\* 443

\* 3000

\* 3306

\* 5173

\* 8000

\* 8080



症狀：



\* Server 無法啟動

\* Apache 無法啟動

\* MySQL 無法啟動

\* Vite 無法啟動



\---



\## 1.5 權限問題



可能出現：



\* Access denied

\* Permission denied

\* Cannot write file

\* Cannot create directory



可能原因：



\* Windows 權限

\* 資料夾權限

\* 程式正在使用檔案

\* Antivirus / Security software

\* Docker volume 權限



\---



\# 2. VS Code



\## 2.1 Terminal 找不到指令



確認：



\* PATH

\* VS Code Terminal 使用的 Shell

\* 系統 Terminal 是否正常



\---



\## 2.2 VS Code 使用錯誤的 Python



檢查：



Python interpreter。



\---



\## 2.3 VS Code 使用錯誤的 PHP



檢查：



PHP executable path。



\---



\## 2.4 Extension 沒有效果



檢查：



\* Extension 是否安裝

\* 是否啟用

\* Workspace 是否正確

\* 是否需要 Reload Window

\* Extension 是否支援目前語言 / 版本



\---



\## 2.5 IntelliSense 不工作



可能原因：



\* 專案沒有正確開啟

\* Extension 問題

\* Language Server 問題

\* Dependency 未安裝



\---



\## 2.6 Git 沒有顯示



檢查：



\* 是否在 Git repository

\* `.git` 是否存在

\* Git 是否安裝

\* VS Code 是否偵測到 Git



\---



\# 3. Git



\## 3.1 git init



如果沒有初始化 Git：



git status



可能會出現：



not a git repository



\---



\## 3.2 git add 沒有加入檔案



檢查：



git status



可能原因：



\* `.gitignore`

\* 檔案在其他資料夾

\* Git repository 根目錄錯誤



\---



\## 3.3 .gitignore



常見問題：



檔案明明存在，但 Git 不追蹤。



檢查：



\* `.gitignore`

\* global gitignore



\---



\## 3.4 commit 失敗



常見原因：



\* 沒有設定 user.name

\* 沒有設定 user.email

\* 沒有 staged files



\---



\## 3.5 push rejected



可能原因：



Remote repository 有本地沒有的 commit。



處理前：



先確認 remote 與 branch。



不要不明原因直接：



git push --force



\---



\## 3.6 merge conflict



原因：



兩邊修改同一區域。



處理：



1\. 找到 conflict

2\. 判斷要保留哪個版本

3\. 修改檔案

4\. git add

5\. commit



\---



\## 3.7 branch 搞錯



常見問題：



\* 修改在錯誤 branch

\* push 到錯誤 branch

\* main / master 搞混

\* branch 沒有同步



\---



\## 3.8 git reset



特別注意：



git reset --hard



可能造成尚未提交的修改遺失。



使用前先確認。



\---



\## 3.9 remote URL 錯誤



檢查：



git remote -v



\---



\## 3.10 commit 了錯誤檔案



可能包含：



\* `.env`

\* 密碼

\* API Key

\* node\_modules

\* vendor

\* 暫存檔



如果已經 push 到公開 Repository，不能只靠刪除檔案就認為秘密已經安全。



\---



\# 4. GitHub



\## 4.1 GitHub 看不到本機檔案



檢查：



git status



git add



git commit



git push



\---



\## 4.2 推送到錯誤 Repository



檢查：



git remote -v



\---



\## 4.3 GitHub branch 不一致



本地：



main



遠端：



master



或反過來。



確認目前 branch。



\---



\## 4.4 GitHub Repository 太大



常見原因：



\* node\_modules

\* vendor

\* 大型圖片

\* build files

\* ZIP

\* video



\---



\## 4.5 GitHub 上傳敏感資料



禁止上傳：



\* Password

\* API Key

\* Access Token

\* Database password

\* `.env`



\---



\# 5. HTML



\## 5.1 HTML 標籤沒有關閉



例如：



<div>



卻沒有：



</div>



\---



\## 5.2 CSS 沒有載入



檢查：



<link rel="stylesheet">



路徑是否正確。



\---



\## 5.3 JavaScript 沒有載入



檢查：



<script src="...">



\---



\## 5.4 圖片不顯示



檢查：



\- src

\- 路徑

\- 檔名

\- 副檔名

\- 大小寫



\---



\## 5.5 相對路徑錯誤



例如：



./images/a.jpg



與：



../images/a.jpg



代表不同位置。



\---



\## 5.6 表單沒有資料



檢查：



\- form

\- action

\- method

\- input name



\---



\## 5.7 id 重複



HTML 中不要讓不同元素使用相同 id。



\---



\## 5.8 class 名稱錯誤



HTML：



class="container"



CSS：



.container



必須一致。



\---



\# 6. CSS



\## 6.1 CSS 沒有效果



檢查：



1\. CSS 是否載入

2\. selector

3\. class

4\. specificity

5\. 是否被其他 CSS 覆蓋



\---



\## 6.2 margin / padding 搞混



margin：



元素外部空間。



padding：



元素內部空間。



\---



\## 6.3 Flex 排版



檢查：



\- display

\- flex-direction

\- justify-content

\- align-items

\- gap

\- flex-wrap



\---



\## 6.4 Grid 排版



檢查：



\- grid-template-columns

\- gap

\- width

\- parent container



\---



\## 6.5 z-index 沒效果



z-index 通常需要配合正確的 positioning / stacking context。



\---



\## 6.6 position absolute 跑版



`position: absolute` 通常相對於適當的 positioned ancestor 定位。



\---



\## 6.7 overflow



常見：



overflow: hidden



把內容切掉。



\---



\## 6.8 RWD 跑版



檢查：



\- 固定 width

\- min-width

\- max-width

\- media query

\- flex-wrap

\- overflow



\---



\# 7. JavaScript



\## 7.1 undefined



代表取得的值不是預期的資料。



\---



\## 7.2 null



代表值可能明確為空。



\---



\## 7.3 Cannot read properties of null



通常：



JavaScript 找不到 DOM 元素。



\---



\## 7.4 Cannot read properties of undefined



通常：



物件、陣列或 API 資料不存在。



\---



\## 7.5 DOM 找不到



檢查：



\- id

\- class

\- selector

\- script 執行時間



\---



\## 7.6 Event 沒有觸發



檢查：



\- event listener

\- selector

\- function

\- HTML element



\---



\## 7.7 async / await



常見問題：



\- 忘記 async

\- 忘記 await

\- Promise 尚未完成

\- try/catch 沒處理



\---



\## 7.8 fetch



檢查：



\- URL

\- method

\- headers

\- body

\- response status

\- JSON



\---



\## 7.9 Axios



檢查：



\- URL

\- method

\- params

\- data

\- headers

\- response



\---



\## 7.10 JSON



常見：



JSON 格式錯誤。



注意：



JSON 字串通常使用雙引號。



\---



\# 8. Bootstrap



\## 8.1 Bootstrap 沒載入



檢查 CDN / CSS 路徑。



\---



\## 8.2 Bootstrap JavaScript 沒載入



Modal / Dropdown / Collapse 等互動可能失效。



\---



\## 8.3 Bootstrap 版本錯誤



Bootstrap 4 與 Bootstrap 5 的部分語法不同。



\---



\## 8.4 Grid



Bootstrap Grid 基本概念：



12 columns。



例如：



col-md-4 + col-md-8 = 12。



\---



\## 8.5 Modal



檢查：



\- Bootstrap JS

\- Modal ID

\- data-bs-\* 屬性

\- Bootstrap version



\---



\## 8.6 Bootstrap 與自訂 CSS 衝突



檢查：



CSS specificity。



\---



\# 9. API / REST API



\## 9.1 URL 錯誤



檢查：



\- Domain

\- Port

\- Path

\- Prefix



\---



\## 9.2 HTTP Method 錯誤



常見：



GET

POST

PUT

PATCH

DELETE



不要把 POST / GET 搞混。



\---



\## 9.3 Request Body



檢查：



JSON 格式與 Content-Type。



\---



\## 9.4 Header



常見：



Content-Type



Authorization



Accept



\---



\## 9.5 API 回傳格式不同



例如前端預期：



data



後端實際：



results



會造成 undefined。



\---



\## 9.6 API 欄位名稱不同



前端：



category\_id



後端：



categoryId



可能造成資料沒有正確綁定。



\---



\# 10. HTTP Status Code



\## 200



成功。



\## 201



成功建立資料。



\## 204



成功，但沒有回傳內容。



\## 400



Bad Request。



\## 401



Unauthorized。



通常是身份驗證問題。



\## 403



Forbidden。



已理解請求，但沒有權限。



\## 404



Not Found。



Route / Resource 不存在。



\## 405



Method Not Allowed。



HTTP method 不符合 Route。



\## 409



Conflict。



例如資料衝突。



\## 422



Validation 失敗。



\## 429



Too Many Requests。



可能觸發 Rate Limit。



\## 500



伺服器內部錯誤。



\---



\# 11. PHP



\## 11.1 PHP 找不到



確認：



where php



php -v



\---



\## 11.2 PHP 版本錯誤



確認：



php -v



\---



\## 11.3 Undefined variable



變數沒有正確初始化。



\---



\## 11.4 Undefined array key



陣列中沒有指定 key。



\---



\## 11.5 Class not found



檢查：



\- namespace

\- use

\- class name

\- Composer autoload



\---



\## 11.6 Call to undefined function



可能：



\- function 不存在

\- extension 沒有啟用

\- namespace 問題



\---



\## 11.7 include / require 錯誤



檢查檔案路徑。



\---



\# 12. Composer



\## 12.1 Composer 找不到



確認：



composer -V



\---



\## 12.2 composer install 失敗



檢查：



\- PHP version

\- PHP extensions

\- composer.json

\- composer.lock

\- dependency versions



\---



\## 12.3 vendor 不存在



通常：



composer install



\---



\## 12.4 Autoload 問題



可以嘗試：



composer dump-autoload



\---



\## 12.5 composer update



不要沒有原因就直接大量更新 dependency。



可能造成版本相容性問題。



\---



\# 13. Laravel



\## 13.1 php artisan 找不到



如果 PHP 沒有加入 PATH：



C:\\xampp\\php\\php.exe artisan ...



\---



\## 13.2 Laravel 專案無法啟動



檢查：



\- PHP

\- Composer

\- `.env`

\- APP\_KEY

\- Database

\- vendor



\---



\## 13.3 APP\_KEY



如果沒有：



php artisan key:generate



\---



\## 13.4 .env



檢查：



\- DB\_DATABASE

\- DB\_USERNAME

\- DB\_PASSWORD

\- DB\_HOST

\- DB\_PORT



\---



\## 13.5 Config Cache



修改 `.env` 後可能仍使用舊設定。



可以清除：



php artisan config:clear



必要時：



php artisan optimize:clear



\---



\## 13.6 Route Not Found



檢查：



\- routes/web.php

\- routes/api.php

\- HTTP method

\- URL

\- Controller



\---



\## 13.7 Controller 找不到



檢查：



\- namespace

\- use

\- class name

\- 檔案位置



\---



\## 13.8 View 找不到



檢查：



resources/views



與：



return view(...)



\---



\## 13.9 Blade 語法錯誤



檢查：



\- @if

\- @endif

\- @foreach

\- @endforeach

\- {{ }}

\- @extends

\- @section

\- @yield



\---



\# 14. Laravel Routing



\## 常見問題



\- URL 錯

\- Method 錯

\- Controller 錯

\- Prefix 錯

\- Middleware 錯

\- Route cache



排查：



php artisan route:list



\---



\# 15. Laravel Controller / Model



\## Controller 找不到 Model



檢查：



use App\\Models\\xxx;



\---



\## Model 找不到



檢查：



\- 檔案位置

\- namespace

\- class name



\---



\## Mass Assignment



使用：



Model::create()



時確認：



$fillable



或：



$guarded



\---



\## Request 資料不存在



檢查：



$request



與 validation。



\---



\# 16. Laravel Blade



\## View 顯示變數不存在



檢查 Controller 是否傳資料。



\---



\## foreach 錯誤



確認資料是否真的為 array / collection。



\---



\## Blade 與 JavaScript 衝突



Blade：



{{ }}



JavaScript template / framework 也可能使用類似符號。



需要注意解析方式。



\---



\# 17. Laravel Migration



\## Migration 失敗



檢查：



\- database

\- migration order

\- table

\- column

\- foreign key



\---



\## Foreign Key errno: 150



常見原因：



外鍵欄位與被參照欄位型別不相容。



\---



\## Migration 順序錯誤



例如：



先建立 child table，



但 parent table 還不存在。



\---



\## migrate:fresh



會刪除所有資料表再重新建立。



\*\*執行前確認資料是否可以刪除。\*\*



\---



\## rollback



會回滾 migration。



使用前確認影響範圍。



\---



\# 18. Laravel Database / Eloquent



\## Table 不存在



檢查：



\- migration

\- database

\- table name



\---



\## Column 不存在



檢查：



\- migration

\- model

\- controller

\- frontend 欄位



\---



\## SQLSTATE



不要只看最後一行。



應該看：



\- SQL

\- table

\- column

\- constraint

\- connection



\---



\## Eloquent 查詢錯誤



檢查：



\- Model

\- relationship

\- where

\- select

\- orderBy



\---



\# 19. Laravel Authentication



\## Login 失敗



檢查：



\- email

\- password

\- validation

\- authentication logic

\- database



\---



\## Session 沒有保存



檢查：



\- session configuration

\- cookie

\- domain

\- HTTPS



\---



\## 401



通常是身份驗證沒有通過。



\---



\## 403



通常是身份驗證通過，但沒有權限。



\---



\## 419



常見：



CSRF / Session 問題。



\---



\# 20. Laravel API



常見問題：



\- Route 不存在

\- Controller 不存在

\- JSON 格式錯

\- Validation 失敗

\- Authentication 失敗

\- CORS

\- API Resource 格式錯誤

\- HTTP Method 錯誤

\- Token 錯誤



\---



\# 21. Laravel 多使用者資料隔離



\## 問題



User A 看到了 User B 的資料。



\---



\## 常見原因



查詢：



Attraction::all();



沒有按照 user\_id 過濾。



\---



\## 建立資料



建立資料時必須正確關聯 authenticated user。



\---



\## 修改資料



不能只依照：



/attractions/10



就允許任何登入者修改。



應確認：



資料屬於目前使用者。



\---



\## 刪除資料



同樣需要檢查 ownership。



\---



\## 前端隱藏不是安全機制



即使前端不顯示資料，



後端 API 如果仍然可以取得，



資料仍然沒有真正隔離。



\---



\# 22. MySQL



\## Access denied



檢查：



\- username

\- password

\- host

\- port



\---



\## Unknown database



Database 不存在。



\---



\## Table doesn't exist



Table 不存在。



\---



\## Unknown column



程式使用的欄位名稱與資料庫不一致。



\---



\## Duplicate entry



通常違反：



UNIQUE



或其他唯一限制。



\---



\## Cannot be null



欄位禁止 NULL，但程式沒有提供值。



\---



\## Data too long



資料長度超過欄位限制。



\---



\## Incorrect integer value



輸入資料型別錯誤。



\---



\## Foreign key constraint fails



檢查：



\- parent

\- child

\- foreign key

\- type

\- order



\---



\## UPDATE / DELETE 忘記 WHERE



非常危險。



執行前確認條件。



\---



\# 23. XAMPP



\## Apache 無法啟動



常見：



Port 80 被占用。



\---



\## MySQL 無法啟動



常見：



Port 3306 被占用。



\---



\## localhost 無法開啟



檢查：



Apache。



\---



\## phpMyAdmin 無法開啟



檢查：



Apache + MySQL。



\---



\## XAMPP PHP 與系統 PHP 不一致



確認：



C:\\xampp\\php\\php.exe



以及：



where php



\---



\# 24. Python



\## Python 找不到



檢查：



python --version



\---



\## ModuleNotFoundError



例如：



No module named 'flask'



代表目前 Python environment 沒有找到該套件。



\---



\## pip 安裝到錯誤環境



可能：



系統 Python 與 venv 不同。



\---



\## venv



確認：



目前 Terminal 是否已啟用 virtual environment。



\---



\# 25. Flask



\## Flask 沒有安裝



確認：



pip list



\---



\## Route 問題



檢查：



@app.route()



與 HTTP method。



\---



\## POST JSON



確認：



Content-Type: application/json



以及 JSON 格式。



\---



\## Flask API 回傳錯誤



檢查：



\- route

\- method

\- request

\- database

\- exception



\---



\## Flask Port



常見：



5000。



如果被占用需要更換或找出占用程式。



\---



\# 26. SQLite



\## Database 找不到



確認 database path。



\---



\## 建立了兩個 database



常見原因：



相對路徑不同。



程式可能在不同工作目錄執行。



\---



\## 資料沒有出現在 VS Code



確認：



實際使用的 database 檔案位置。



\---



\## SQLite locked



可能有其他程式正在使用 database。



\---



\# 27. Node.js



\## node 找不到



檢查：



node -v



\---



\## Node version 不相容



確認：



package / framework 所要求的 Node version。



\---



\## npm 找不到



檢查：



npm -v



\---



\# 28. npm



\## npm install 失敗



檢查：



\- Node version

\- npm version

\- package.json

\- dependency

\- network



\---



\## node\_modules 不存在



通常：



npm install



\---



\## Dependency conflict



可能：



不同套件要求不同版本。



\---



\## package-lock.json



不要沒有原因就刪除。



\---



\## npm run dev



檢查：



package.json scripts。



\---



\# 29. Vue



\## Vue 沒有載入



檢查：



\- CDN

\- npm

\- import

\- script



\---



\## ref



需要注意：



JavaScript 中可能需要使用：



.value



\---



\## reactive



注意 reactive object 的使用方式。



\---



\## v-if



資料尚未載入時可能導致畫面問題。



\---



\## v-for



檢查：



\- array

\- key

\- data



\---



\## v-model



檢查：



綁定欄位是否存在。



\---



\## API 資料沒有更新



檢查：



\- ref

\- reactive

\- API response

\- assignment



\---



\## undefined



可能 API 尚未完成。



需要處理 loading / null state。



\---



\# 30. Vite



\## Vite 無法啟動



檢查：



\- Node version

\- npm install

\- package.json

\- port



\---



\## Vite port 被占用



確認：



5173 或目前使用的 port。



\---



\## Build 失敗



查看第一個真正的 error。



不要只看最後一行。



\---



\# 31. 前端與後端整合



常見問題：



\- URL 不一致

\- Port 不一致

\- API Route 不一致

\- 欄位名稱不一致

\- JSON 格式不一致

\- Authentication 不一致

\- Token 問題

\- CORS

\- 日期格式不同

\- ID 型別不同

\- CRUD 不同步



\---



\# 32. CORS



\## 問題



前端與後端使用不同 Origin。



\---



\## 常見症狀



Browser Console：



CORS policy error。



\---



\## 排查



確認：



\- frontend URL

\- backend URL

\- backend CORS configuration

\- HTTP / HTTPS

\- request headers



\---



\# 33. JSON



\## JSON syntax error



檢查：



\- 雙引號

\- comma

\- 大括號

\- 中括號



\---



\## JSON 與 JavaScript Object 不完全相同



不要直接把 JavaScript object 語法當 JSON。



\---



\## API JSON 欄位不同



例如：



後端：



{

&#x20; "category\_id": 1

}



前端：



categoryId



就需要統一或轉換。



\---



\# 34. Git / GitHub 部署



常見問題：



\- build files 沒有建立

\- environment variables 不正確

\- production URL 錯誤

\- API URL 還是 localhost

\- CORS

\- database connection

\- permission

\- HTTPS

\- domain

\- DNS

\- GitHub Actions failure



\---



\# 35. Docker



\## Docker 沒啟動



Docker Desktop / daemon 必須正常運作。



\---



\## Image build failed



檢查：



\- Dockerfile

\- base image

\- package

\- network

\- command



\---



\## Container 無法啟動



查看：



docker logs



\---



\## Container 一直重啟



檢查：



\- application crash

\- environment variables

\- database connection

\- command

\- healthcheck



\---



\## Port conflict



例如：



80:80



如果 host 端 80 已經使用，Container 可能無法啟動。



\---



\## Volume



常見：



\- 資料沒有同步

\- 資料消失

\- permission

\- mount path 錯誤



\---



\## Container 裡的 localhost



重要：



Container 裡的 localhost 通常指向該 Container 自己。



不要直接假設：



localhost = Host machine。



\---



\# 36. Docker Compose



常見：



\- service name 錯誤

\- environment 錯誤

\- ports 錯誤

\- volumes 錯誤

\- networks 錯誤

\- depends\_on 誤解

\- container name 衝突



\---



\# 37. Docker + Laravel



常見：



\- PHP extension 缺少

\- Composer dependency

\- `.env`

\- DB\_HOST

\- MySQL container

\- permission

\- storage

\- cache

\- vendor

\- npm build

\- Vite

\- Nginx

\- PHP-FPM



在 Docker Compose 中，Laravel 與資料庫通常透過 Compose service name 互相連線，而不是把 container 內的 DB\_HOST 當成 localhost。Laravel 官方 Sail 文件也以 `mysql` 作為 DB\_HOST 範例。



\---



\# 38. 環境變數



常見：



.env



.env.example



\---



\## 不要把秘密放進 Git



禁止：



\- Password

\- API Key

\- Secret

\- Token



\---



\## .env 修改後沒有生效



Laravel 可能存在 config cache。



\---



\# 39. 網路 / Port



常見 Port：



80

443

3000

3306

5000

5173

8000

8080



問題：



\- Port 被占用

\- Firewall

\- localhost

\- HTTPS

\- HTTP

\- Proxy

\- DNS



\---



\# 40. 檔案與路徑



\## 相對路徑



例如：



./file



../file



意義不同。



\---



\## Windows 路徑



例如：



C:\\xampp\\php\\php.exe



不同工具對：



\\

/



可能有不同處理方式。



\---



\## 空白與中文路徑



某些舊工具或腳本可能對特殊字元處理不好。



\---



\# 41. 編碼



常見：



\- UTF-8

\- UTF-8 BOM

\- Big5

\- 中文亂碼



\---



\## HTML



確認：



<meta charset="UTF-8">



\---



\## CSV



Excel 開啟 CSV 時可能出現中文亂碼。



\---



\# 42. Authentication / Authorization



Authentication：



「你是誰？」



Authorization：



「你有沒有權限做這件事？」



兩者不能混淆。



\---



\## 常見漏洞



使用者登入了，



但可以透過修改 ID：



/users/2



取得別人的資料。



這屬於權限檢查不足。



\---



\# 43. Web Security



\## SQL Injection



不要把使用者輸入直接拼接進 SQL。



\---



\## XSS



不要直接把未處理的使用者輸入當 HTML 執行。



\---



\## CSRF



需要適當的 CSRF 防護。



\---



\## API Authentication



不要只依靠前端判斷使用者是否登入。



\---



\## Authorization



後端必須驗證：



目前使用者是否有權限存取該資源。



\---



\## Sensitive Data



不要在 API response 中回傳不必要的：



\- Password

\- Secret

\- Token

\- Internal credentials



\---



\# 44. CRUD



CRUD：



Create

Read

Update

Delete



\---



\## Create



確認：



\- Validation

\- Required fields

\- Authentication

\- Authorization



\---



\## Read



確認：



\- Query

\- Filter

\- Pagination

\- User ownership



\---



\## Update



確認：



\- ID

\- Ownership

\- Validation

\- Mass assignment



\---



\## Delete



確認：



\- ID

\- Ownership

\- Foreign key

\- Cascade



\---



\# 45. Session / Cookie / Token



\## Session



可能問題：



\- Session 沒保存

\- Session 過期

\- Domain 不一致



\---



\## Cookie



檢查：



\- domain

\- path

\- secure

\- same-site

\- expiration



\---



\## Token



檢查：



\- Token 是否存在

\- Token 是否過期

\- Authorization header

\- Bearer 格式



\---



\# 46. 資料庫設計



常見問題：



\- Primary Key

\- Foreign Key

\- Unique

\- Nullable

\- Data Type

\- Index

\- Relationship

\- Cascade



\---



\## Foreign Key



兩邊欄位型別需要相容。



\---



\## Index



查詢大量資料時需要考慮適當 index。



\---



\## Duplicate Data



需要判斷是否應該使用：



UNIQUE。



\---



\# 47. RWD / 瀏覽器相容性



常見：



\- Desktop 正常，Mobile 壞掉

\- iPhone 排版錯

\- Android 排版錯

\- Chrome 正常，Safari 異常

\- 固定 width

\- overflow

\- viewport

\- font size

\- touch interaction



\---



\# 48. 效能問題



常見：



\- 圖片太大

\- API 太慢

\- Database query 太多

\- N+1 Query

\- JavaScript 太多

\- CSS 太大

\- Bundle 太大

\- 未使用 cache

\- 沒有 pagination

\- 一次載入全部資料



\---



\# 49. 測試與 Debug



\## 不要只看畫面



需要檢查：



1\. Browser Console

2\. Network

3\. Server log

4\. Database

5\. API response

6\. Request payload

7\. HTTP status



\---



\## Laravel



查看：



storage/logs



\---



\## Browser



查看：



Console



Network



\---



\## API



使用：



Postman



或：



Browser DevTools



\---



\# 50. Production / Deployment



上線前檢查：



\- APP\_DEBUG=false

\- `.env`

\- Database

\- HTTPS

\- Domain

\- CORS

\- Authentication

\- File permissions

\- Storage

\- Cache

\- Queue

\- Cron

\- Logs

\- Error handling

\- Secrets



Laravel 官方文件特別提醒，production 不應開啟 `APP\_DEBUG=true`，因為可能暴露敏感設定。



\---



\# 51. AI / Codex Coding



\## AI 修改太多檔案



先要求：



「先分析，不要修改。」



確認方案後再修改。



\---



\## AI 自己刪除功能



明確要求：



「不要刪除現有功能。」



\---



\## AI 自行重構



要求：



「只修改與目前需求相關的部分。」



\---



\## AI 使用不存在的套件



要求：



「先檢查目前 package.json / composer.json。」



\---



\## AI 使用錯誤版本語法



要求：



「先確認目前 framework / package version。」



\---



\## AI 沒有理解現有架構



先讓 AI：



\- 查看專案

\- 說明架構

\- 找相關檔案

\- 再修改



\---



\## AI 修 A 壞 B



修改後：



\- 測試原功能

\- 測試新功能

\- 檢查 Console

\- 檢查 API

\- 檢查 Database



\---



\## AI 在錯誤資料夾工作



執行前確認：



目前工作目錄。



\---



\## AI 修改資料庫



不要讓 AI 在沒有理解資料結構的情況下直接修改 migration。



\---



\# 52. 「看起來沒錯但就是不能用」



\## 檔案路徑正確但找不到



可能：



實際 working directory 不同。



\---



\## CSS 正確但沒有作用



可能：



specificity / cache / selector。



\---



\## JavaScript 正確但沒有執行



可能：



script 載入順序。



\---



\## API 正確但前端沒有資料



可能：



CORS / JSON / 欄位名稱 / API URL。



\---



\## Database 正確但 Laravel 找不到



可能：



.env / config cache / database connection。



\---



\## Git 正確但 GitHub 沒有更新



可能：



push 到其他 branch / repository。



\---



\## 程式正確但 Docker 不工作



可能：



container environment 與本機 environment 不同。



\---



\# 53. 問題排查流程



遇到錯誤時，不要直接亂改。



按照：



\## Step 1



先看完整錯誤訊息。



\---



\## Step 2



確認錯誤發生在哪一層：



Frontend

Backend

Database

Environment

Network

Deployment



\---



\## Step 3



確認最近改了什麼。



\---



\## Step 4



確認實際使用的：



\- URL

\- Port

\- File

\- Database

\- Environment

\- Version



\---



\## Step 5



查看：



Browser Console



Network



Server Logs



Database



\---



\## Step 6



最小化問題。



先確認最簡單的版本是否正常。



\---



\## Step 7



一次只改一個主要因素。



\---



\## Step 8



修改後立即測試。



\---



\# 54. 個人實際踩坑紀錄



這一區用來記錄「自己真的遇到過的問題」。



\---



\## 2026 - Laravel PHP



問題：



PowerShell 執行：



php artisan



出現 PHP 找不到。



原因：



PHP 沒有加入 PATH。



解決：



使用：



C:\\xampp\\php\\php.exe artisan ...



\---



\## 2026 - Laravel Migration



問題：



Migration 出現：



errno: 150



原因：



Foreign Key 欄位與被參照欄位型別不一致。



\---



\## 2026 - Flask



問題：



ModuleNotFoundError: No module named 'flask'



原因：



目前 Python environment 沒有 Flask。



\---



\## 2026 - Laravel Multi User



問題：



不同使用者看到相同資料。



原因：



後端查詢沒有正確依照 authenticated user 過濾資料。



\---



\## 2026 - Git



問題：



本機有大量 HTML / CSS / JS 練習檔案，不確定是否全部上傳 GitHub。



解決方向：



使用 git status 確認檔案，再選擇需要加入 Git 的檔案。



\---



\# 55. 新增踩坑紀錄格式



以後遇到新的問題，使用以下格式：



\## 問題名稱



\### 日期



YYYY-MM-DD



\### 技術



Laravel / Vue / Git / MySQL / etc.



\### 錯誤



貼完整錯誤訊息。



\### 發生原因



說明真正原因。



\### 解決方法



記錄實際有效的方法。



\### 為什麼會發生



記錄背景。



\### 如何避免



記錄未來預防方式。



\### 是否已驗證



\- \[ ] 尚未驗證

\- \[ ] 已驗證

\- \[ ] 多次驗證



\### 備註



補充資訊。



\---



\# 56. 重要原則



1\. 不要把密碼寫進本文件。

2\. 不要把 API Key 寫進本文件。

3\. 不要把 Access Token 寫進本文件。

4\. 不要把 `.env` 真實內容貼進本文件。

5\. 不確定的解法標記為「待確認」。

6\. 同一個問題不要重複建立。

7\. 新問題優先記錄完整錯誤訊息。

8\. 記錄真正的原因，而不只是表面解法。

9\. 記錄自己環境的特殊設定。

10\. 如果同一個問題再次發生，更新原紀錄。

11\. AI 修復問題後，也記錄 AI 做了什麼。

12\. 重要問題最好記錄驗證方式。

13\. 資料庫操作前先確認是否會造成資料遺失。

14\. Git destructive commands 執行前先確認。

15\. Production 環境與 Local 環境要分開考慮。

16\. 不要因為錯誤看起來簡單就跳過排查。

17\. 優先查看錯誤訊息與 Log。

18\. 一次修改一個主要因素。

19\. 修改後一定重新測試。

20\. 保留能幫助未來快速定位問題的資訊。



