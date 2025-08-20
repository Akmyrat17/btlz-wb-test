# WB Tariffs Service

Комплексный Node.js сервис для автоматического получения тарифов Wildberries и обновления Google Sheets в реальном времени.

### 1. Клонирование и настройка

```bash
git clone <repository-url>
cd btlz-wb-test-1
npm install
```

### 2. Конфигурация окружения

Скопируйте файл примера окружения и настройте ваши параметры:

```bash
cp example.env .env
```

### Настройка credentials для Google Sheets

1.  **Поместите** ваш `credentials.json` (ключ сервисного аккаунта) в корень проекта.

2.  **Убедитесь**, что сервисный аккаунт имеет права **Редактора (Editor)** на всех Google Sheets, которые вы хотите обновлять.

3.  **Обновите** файл `.env`, указав ваши ID таблиц, например:

<!-- end list -->

```ini
GOOGLE_SHEET_IDS=<ваш-sheet-id-1>,<ваш-sheet-id-2>
GOOGLE_SHEET_TAB=stocks_coefs
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS=./credentials.json
```
