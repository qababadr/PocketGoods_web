# PocketGoods (Web Version)

PocketGoods is a web application built with **Laravel**, **Vue 3**, **Pinia (store management)**, **TypeScript**, and **Vuetify**.  
This project serves as the web version of PocketGoods, focusing on modern, scalable, and maintainable architecture.

---

## 🚀 Tech Stack
- **Backend:** Laravel (PHP)
- **Frontend:** Vue 3 with TypeScript
- **State Management:** Pinia
- **UI Framework:** Vuetify
- **Package Manager:** npm / yarn
- **Testing:** Cypress (E2E testing)

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/qababadr/PocketGoods_web.git
cd pocketgoods_web
```

### 2. Install dependencies
For Laravel (backend):
```bash
composer install
```

For Vue (frontend):
```bash
npm install
```

### 3. Environment setup
- Copy `.env.example` to `.env` and configure database + other environment variables.

### 4. Run migrations (Laravel)
```bash
php artisan migrate
```

### 5. Run the development servers
Backend (Laravel):
```bash
php artisan serve
```
Frontend (Vue):
```bash
npm run dev
```

---

## 🛠️ Features
- 📱 Responsive design with Vuetify  
- 🔐 Authentication & authorization (Laravel + Vue)  
- 🛍️ Product listing & details  
- ❤️ Wishlist management
- ⚡ Modern TypeScript frontend  

---

## 📂 Project Structure
```
pocketgoods/
├── app/ # Laravel app code
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
│ └── js/
│ └── src/ # Vue 3 + TypeScript + Vuetify app
├── routes/
├── storage/
├── tests/
└── README.md
```
---

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.

---

## 📜 License
This project is licensed under the MIT License.
