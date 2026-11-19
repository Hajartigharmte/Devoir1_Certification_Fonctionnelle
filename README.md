# 🎓 Projet de Certification Blockchain (DApp)

Projet académique de fin d'études permettant d'émettre, de vérifier et de révoquer des certificats académiques sur la blockchain Ethereum de manière sécurisée et traçable.

## 🛠️ Technologies Utilisées
- **Smart Contract :** Solidity, Hardhat
- **Frontend :** HTML5, CSS3 (Design Pastel Rose/Mauve), JavaScript
- **Web3 & Bibliothèques :** Ethers.js v6, SheetJS (XLSX) pour l'importation Excel/CSV
- **Environnement de test :** Hardhat Local Network

---

## 📂 Structure du Projet
```text
📦 Devoir-Certificat/
├── artifacts/                  # Fichiers de compilation du contrat
├── cache/                      # Cache Hardhat
├── contracts/
│   └── CertificateRegistry.sol # Contrat intelligent (gestion admin et certificats)
├── frontend/
│   └── index.html              # Interface utilisateur DApp (Web3, Rose & Mauve)
├── node_modules/               # Dépendances Node.js
├── scripts/
│   └── deploy.js               # Script de déploiement Hardhat
├── test/
│   └── CertificateRegistry.test.js # Tests unitaires Hardhat (5 tests validés)
├── capture_import_excel.jpeg   # Capture d'écran de l'importation en lot réussie
├── Capture-mint-reussi.jpeg    # Capture d'écran du mint individuel & vérification
├── exemple_etudiants.csv       # Fichier CSV d'exemple pour le batch mint
├── hardhat.config.js           # Configuration Hardhat
├── package.json                # Configuration et dépendances npm
├── package-lock.json           # Arborescence exacte des packages
└── README.md                   # Documentation du projet
---

## ⚙️ Guide d'Installation et Exécution
-**Installer les dépendances :**  npm install

-**Lancer le nœud local Hardhat :** npx hardhat node

-**Déployer le Smart Contract (dans un second terminal) :** npx hardhat run scripts/deploy.js --network localhost

-**Lancer les tests unitaires : ** npx hardhat test

-**Lancer l'interface Web :** Ouvrir le fichier frontend/index.html via Live Server et connecter MetaMask au réseau local (Chain ID: 31337).

##📌 Informations Clés du Déploiement
-**Adresse du Contrat :** 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

-**Adresse Admin (Constructeur) : ** 0x4f848c26204Eb3Ecbabe556a3A645F1f7a7e41fA

