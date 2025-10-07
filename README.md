# Visionyze – Test Technique Backend

## 📊 Aperçu

Ce projet est une mini API REST pour un site e-commerce, développé dans le cadre d'un test technique. L'API repose sur une stack moderne incluant **Fastify**, **TypeScript**, **Prisma**, **PostgreSQL** et **Redis**.

---

## ✨ Fonctionnalités

### 🔐 Authentification & Autorisation

* Inscription, connexion et protection des routes via **JWT**.
* Gestion des rôles utilisateurs avec un rôle **ADMIN**.

### 🛏️ Gestion des Produits

* CRUD complet sur les produits.
* Mise en cache des listes produits via **Redis** pour des performances accrues.

### 🧾 Gestion des Commandes

* Création de commandes avec validation du stock et calcul automatique du total.
* Transactions sécurisées via **Prisma**.

### 📊 Métriques Administrateur

* Endpoint sécurisé permettant aux administrateurs de visualiser les statistiques clés de la plateforme.

---

## ⚙️ Stack Technique

* **Framework** : Fastify
* **Langage** : TypeScript
* **ORM** : Prisma
* **Base de données** : PostgreSQL
* **Cache** : Redis
* **Validation** : Zod
* **Tests** : Vitest

---

## 🚀 Démarrage Rapide

Ce projet est entièrement conteneurisé avec **Docker**. Assurez-vous d'avoir **Docker** et **Docker Compose** installés.

### 1. Cloner le dépôt

```bash
git clone https://github.com/ilyas-exe/technical-test-backend.git
cd technical-test-backend
```

### 2. Configurer les variables d'environnement

Copiez le fichier d'exemple `.env.example` :

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

### 3. Lancer les services

Construit et lance tous les conteneurs (API, PostgreSQL, Redis) :

```bash
docker compose up --build
```

L'API sera disponible sur : **[http://localhost:3001](http://localhost:3001)**

### 4. Initialiser la base de données

Dans un nouveau terminal :

```bash
# Appliquer les migrations Prisma
docker compose exec app npm run prisma:migrate

# Générer des données de test (admin + produits)
docker compose exec app npm run seed
```

Votre environnement est prêt ✨

---

## 🥳 Lancer les Tests

```bash
# Installer les dépendances
npm install

# Exécuter les tests
npm run test
```

---

## 🔗 Endpoints Principaux

### Authentification (`/auth`)

| Méthode | Endpoint         | Description                     | Auth |
| ------- | ---------------- | ------------------------------- | ---- |
| POST    | `/auth/register` | Créer un utilisateur            | ❌    |
| POST    | `/auth/login`    | Se connecter (retourne un JWT)  | ❌    |
| GET     | `/auth/me`       | Infos de l'utilisateur connecté | ✅    |
| GET     | `/auth/users`    | Liste des utilisateurs (admin)  | 🛡️  |

### Produits (`/products`)

| Méthode | Endpoint        | Description                                 | Auth |
| ------- | --------------- | ------------------------------------------- | ---- |
| GET     | `/products`     | Liste des produits (pagination & recherche) | ❌    |
| POST    | `/products`     | Créer un produit (admin)                    | 🛡️  |
| PATCH   | `/products/:id` | Modifier un produit (admin)                 | 🛡️  |

### Commandes (`/orders`)

| Méthode | Endpoint          | Description                                 | Auth |
| ------- | ----------------- | ------------------------------------------- | ---- |
| POST    | `/orders`         | Créer une commande                          | ✅    |
| GET     | `/orders/:id`     | Détails d'une commande (propriétaire/admin) | ✅    |
| POST    | `/orders/:id/pay` | Marquer une commande comme payée            | ✅    |

### Administration (`/admin`)

| Méthode | Endpoint         | Description                   | Auth |
| ------- | ---------------- | ----------------------------- | ---- |
| GET     | `/admin/metrics` | Statistiques de la plateforme | 🛡️  |

---

## 🛠️ Scripts Utiles

| Commande                 | Description                   |
| ------------------------ | ----------------------------- |
| `npm run dev`            | Lancer le serveur en mode dev |
| `npm run build`          | Compiler le projet TypeScript |
| `npm run start`          | Lancer la version compilée    |
| `npm run prisma:migrate` | Appliquer les migrations      |
| `npm run seed`           | Remplir la base de test       |
| `npm run test`           | Exécuter les tests            |

---

## 👤 Auteur

**Ilyas**
[GitHub](https://github.com/ilyas-exe)

---

> Ce projet a été réalisé dans le cadre d'un test technique backend pour Visionyze.
