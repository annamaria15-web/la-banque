# 💳 PayPal Web & Mobile Application (React + Vite + Tailwind CSS)

Ce projet est prêt pour le développement et le déploiement depuis **Visual Studio Code** et sur **Vercel / GitHub Pages**.

---

## ⚡ Démarrage rapide dans VS Code

1. **Ouvrir le dossier dans VS Code** :
   ```bash
   code .
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```
   L'application sera accessible sur : **http://localhost:3000** (ou le port indiqué par Vite).

4. **Tester le build de production** :
   ```bash
   npm run build
   npm run preview
   ```

---

## 🚀 Options de Déploiement

### Option 1 : Vercel (Recommandé - 1 clic)
1. Installez le CLI Vercel si besoin : `npm i -g vercel`
2. Tapez : `vercel`
3. Paramètres de build par défaut :
   - Framework : **Vite**
   - Build Command : `npm run build`
   - Output Directory : `dist`

### Option 2 : GitHub Pages
Poussez simplement sur votre dépôt GitHub (branche `main`).
Le workflow `.github/workflows/deploy.yml` compile et publie automatiquement le site.
