# Бекенд для регистрации

Для запуска приложения напишите команду
### `docker-compose up`

Бекенд запустится на [http://localhost:5000](http://localhost:5000) 

Документация доступна по ссылке [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

Входящие данные при записи в бд так же отправляются через чат-бота [CandidateInfo](https://t.me/TestCandidates_Bot). Для начала работы с ним необходимо поменять CHAT_ID в .env на id того человека, которому должны приходить сообщения, а так же начать чат с ботом, нажав на /start. Свой chat_id можно узнать через бота [Get My ID](https://t.me/getmyid_bot).

Если есть необходимость запустить через `npm run start:dev ` ~~или если я неправильно оформила docker~~, то в .env POSTGRES_HOST нужно поменять на 'localhost'.
