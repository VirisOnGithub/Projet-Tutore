# MovieFinder

## Sommaire


## Introduction

Le but de _MovieFinder_ est de permettre à l'utilisateur de pouvoir avoir des nouvelles idées de films à regarder.

L'application propose ainsi de nouveaux films tendances à l'utilisateur chaque jour.

## Utilisation

Pour pouvoir utiliser l'application, il faut se rendre à la racine du projet et lancer :

```bash
npm i
```

qui installe l'entièreté des dépendances nécessaires au bon fonctionnement de l'application.

### Pour le développement

Pour lancer l'application en mode développement, il suffit de lancer :

```bash
npm run dev
```

Cette commande lance le serveur de développement par défaut sur le port 3000.
(Il faut laisser le temps pour que le serveur se lance. Ainsi, si vous voyez une page avec le logo Nuxt, c'est que le serveur démarre. Selon la puissance de votre ordinateur, cette opération peut prendre de quelques secondes à quelques dizaines de secondes.)

### Pour la préproduction

Pour lancer l'application en mode préproduction, il suffit de lancer :

```bash
npm run build
npm run preview
```

Ces commandes lancent l'application aussi sur le port 3000

### Pour la production

Pour lancer l'application en mode production, il suffit de lancer :

```bash
npm run build
node .output/server/main.mjs
```

### Base de données

Pour plus de praticité, la base de données est dockerisée. Elle est lancée automatiquement dès que les commandes `dev` ou `build` sont lancées.

> [!WARNING]  
> Après avoir fini votre utilisation de l'application, il est recommandé de stopper la base de données en utilisant la commande `npm run stop`.