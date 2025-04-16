# Tsikonina Admin - Panel d'Administration

Panel d'administration pour la gestion des recettes malgaches de l'application Tsikonina.

## À Propos

Tsikonina Admin est l'interface d'administration qui permet de gérer le contenu de l'application mobile Tsikonina. Cette plateforme permet aux administrateurs de :

- Gérer les recettes (ajout, modification, suppression)
- Gérer les catégories de recettes
- Gérer les utilisateurs et leurs permissions
- Modérer les commentaires et contributions

## Fonctionnalités

- 🔐 Authentification sécurisée avec Supabase
- 📝 Gestion complète des recettes (CRUD)
- 🖼️ Gestion des images avec Supabase Storage
- 📊 Tableau de bord avec statistiques
- 👥 Gestion des utilisateurs et rôles
- 🔍 Recherche et filtrage avancés

## Technologies Utilisées

- Next.js (App Router + TypeScript)
- Supabase (PostgreSQL + Auth + Storage)
- ShadCN/UI pour l'interface utilisateur
- React Hook Form + Zod pour la validation
- Lucide-React pour les icônes

## Prérequis

- Node.js 18+
- pnpm
- Compte Supabase

## Installation

1. Clonez le dépôt :

```bash
git clone [URL_DU_REPO]
```

2. Installez les dépendances :

```bash
pnpm install
```

3. Configurez les variables d'environnement :

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

4. Lancez le serveur de développement :

```bash
pnpm dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du Projet

```
tsikonina-admin/
├── app/                    # Pages et routes
├── components/            # Composants réutilisables
├── lib/                  # Utilitaires et configurations
├── public/               # Fichiers statiques
└── types/               # Types TypeScript
```

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forker le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Sécurité

- Toutes les routes d'administration sont protégées
- Validation des données côté serveur
- Protection CSRF
- Gestion des permissions basée sur les rôles

## Contact

Pour toute question ou suggestion, contactez-nous à [VOTRE_EMAIL].

## Licence

Ce projet est sous licence [VOTRE_LICENCE].
