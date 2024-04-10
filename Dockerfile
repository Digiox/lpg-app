# Étape 1: Construire votre application
FROM node:16-alpine as builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers 'package.json' et 'package-lock.json' (ou 'yarn.lock')
COPY package*.json ./
COPY yarn.lock .

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier les fichiers et dossiers restants du projet dans le répertoire de travail du conteneur
COPY . .

# Construire l'application pour la production
RUN yarn build

# Étape 2: Exécuter l'application
FROM node:16-alpine as runner

WORKDIR /app

# Copier les dépendances et les builds à partir de l'étape de construction
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exposer le port que Next.js va écouter
EXPOSE 3000

# Définir la variable d'environnement pour le mode production
ENV NODE_ENV production

# Commande pour démarrer l'application
CMD ["yarn", "start"]
