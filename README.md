# 🚀 Visionyze – Test Backend Confirmé (Candidat)

Ce test a pour objectif d’évaluer ta capacité à concevoir et implémenter une **API REST moderne, propre et robuste**, en utilisant les bonnes pratiques de développement backend.

Le projet est déjà initialisé avec **Fastify + TypeScript + Prisma + Redis**.  
Ton rôle est d’implémenter les fonctionnalités clés manquantes.

---

## ⚙️ Stack technique
- **Framework** : Fastify 4.x (TypeScript)
- **ORM** : Prisma (PostgreSQL)
- **Cache** : Redis
- **Validation** : Zod
- **Auth** : JWT (Fastify JWT)
- **Logs** : Pino
- **Tests** : Vitest (ou Jest)

---

## 🧭 Objectif général
Développer une **mini API e-commerce simplifiée** permettant :
- L’enregistrement et la connexion d’utilisateurs.
- La gestion des produits (CRUD + cache Redis).
- La création et le paiement de commandes (transactions).
- L’accès à des métriques administrateur.

---

## 🐳 Lancement avec Docker

```bash
docker compose up --build
# API accessible sur http://localhost:3001
```

> Par défaut, PostgreSQL et Redis se lancent automatiquement avec le projet.

---

## 🧩 Prisma & base de données

```bash
npm run prisma:migrate
npm run seed
```

> Le fichier `prisma/schema.prisma` contient déjà une structure de base (User, Product, Order, OrderItem).

---

## 🧠 À implémenter (TODO)

### 🔐 Authentification
- `POST /auth/register` → création utilisateur, hash mot de passe.
- `POST /auth/login` → retour JWT.
- Middleware JWT pour protéger les routes.
- Guard **admin** pour les routes d’administration.

---

### 🛍️ Produits
- `GET /products` → liste paginée avec `?search=&page=&limit=`.
- `POST /products` / `PATCH /products/:id` → accessible **admin uniquement**.
- Mise en **cache Redis (60s)** pour la liste des produits.
- Invalidation du cache après création, modification ou suppression.

---

### 🧾 Commandes
- `POST /orders` → crée une commande et ses items :
  - Vérifie le stock.
  - Calcule le total.
  - Effectue une **transaction Prisma**.
- `POST /orders/:id/pay` → change le statut en `PAID`, décrémente le stock.
- `GET /orders/:id` → accessible uniquement au propriétaire ou à un admin.

---

### 📊 Metrics (admin uniquement)
- `GET /admin/metrics` → retourne :
  - nombre total d’utilisateurs
  - nombre de commandes sur 7 jours
  - chiffre d’affaires total sur 7 jours

---

### 🧱 Validation et qualité
- Validation des entrées avec **Zod**.
- Erreurs formatées (Fastify `sensible`).
- Logs propres avec **Pino**.
- Types stricts TypeScript.
- Tests unitaires (services) et 1–2 tests d’intégration.

---

## 💾 Bonus possibles
- Pagination et filtres avancés sur `/products`.
- Commandes “simulées” avec Stripe Test Mode.
- Dockerfile parfaitement fonctionnel (déjà prêt).
- Postman/Insomnia Collection incluse.

---

## 🧪 Tests (optionnel mais recommandé)

```bash
npm run test
```

> Vitest ou Jest au choix.  
> Minimum attendu : 2 tests unitaires + 1 test d’intégration.

---

## 🧰 Structure indicative
```
project/
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ src/
│  ├─ index.ts
│  └─ ...
├─ package.json
├─ Dockerfile
├─ docker-compose.yml
└─ .env(.example)
```

---

## 🕓 Modalités du test
- **Durée** : 48 heures à partir de la réception du projet.
- **Temps estimé** : 6 à 8 heures de travail réel.
- **Livrable attendu** :
  - Lien vers un dépôt Git public ou un zip.
  - `.env.example` complet.
  - README avec instructions pour lancer ton code.

> Tu peux utiliser ChatGPT ou la documentation, **mais le code doit rester personnel et compréhensible**.

---

## 📈 Évaluation (sur 100 points)

| Critère | Détail | Points |
|----------|---------|--------|
| **Fonctionnalités** | Auth, produits, commandes, metrics fonctionnels | **35** |
| **Structure et rigueur** | Architecture claire, transactions, validations | **20** |
| **Qualité du code** | Lisibilité, typage, cohérence, bonnes pratiques | **20** |
| **Sécurité et robustesse** | Auth JWT, validations, gestion erreurs | **15** |
| **Tests & Dev Experience** | Tests, README, Docker fonctionnel | **10** |

---

## 💬 Exemple rapide
```bash
curl http://localhost:3001/health
# {"ok":true}
```

---

Souviens-toi :  
👉 Le but n’est pas de tout faire “parfaitement”, mais de **montrer ta logique, ton organisation et ton approche technique**.
