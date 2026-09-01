# Audit complet — tmfcompta.be

**Date de l'audit :** 31 août – 1er septembre 2026
**Cible :** https://tmfcompta.be (10 pages, FR + RO)
**Nature :** audit externe « boîte noire ». Aucun accès au code source, aucune modification effectuée sur le site.

---

## Comment lire ce document

Chaque affirmation porte une étiquette :

| Étiquette | Signification |
|---|---|
| **[VÉRIFIÉ]** | J'ai reproduit le fait moi-même (commande, mesure, ou source officielle citée). |
| **[MESURÉ]** | Résultat d'un outil de mesure, avec l'outil et les conditions indiqués. |
| **[HYPOTHÈSE]** | Interprétation plausible, non prouvée. Signalée comme telle. |
| **[RECOMMANDATION]** | Proposition d'action, pas un constat. |

Une section **« Ce que j'ai corrigé »** en fin de document liste les constats que j'ai
d'abord formulés puis **infirmés** en vérifiant. Elle est là pour que vous puissiez juger
de la fiabilité du reste.

**Avertissement :** je ne suis pas juriste. La partie conformité est une analyse documentée
avec sources, pas un avis juridique. Elle appelle une validation par un conseil belge.

---

# PARTIE 0 — LE CONSTAT QUI PRIME SUR TOUS LES AUTRES

> **Révision du 1er septembre 2026.** La première version de cette partie concluait que
> l'entreprise avait quitté Zaventem. **C'était faux**, faute de connaître le nouveau numéro
> d'entreprise. La réalité, vérifiée ci-dessous, est différente — et le problème reste réel,
> mais il change entièrement de nature. Voir la Partie 13 pour le détail de cette correction.

## 0.1 Le site publie le numéro d'entreprise d'une AUTRE société

**[VÉRIFIÉ — source officielle BCE/KBO, consultée le 31/08/2026]**

Il existe **deux entités distinctes**, et le site les confond.

### L'entité qui exploite réellement le cabinet

```bash
curl -s 'https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?lang=fr&ondernemingsnummer=1027440826'
```

| Champ BCE | Valeur | Depuis |
|---|---|---|
| Numéro d'entreprise | **1027.440.826** | — |
| Dénomination | **TMF COMPTA** *(dénomination en néerlandais)* | 10/09/2025 |
| **Siège** | **Sterrebeekstraat 154, 1930 Zaventem** | 10/09/2025 |
| **Forme légale** | **Société à responsabilité limitée (SRL/BV)** | 10/09/2025 |
| **Administrateur** et délégué à la gestion journalière | **Tamine, Michel** | 10/09/2025 |
| **Autorisation** | **Expert-comptable (fiscaliste) ITAA** | **26/03/2026** |
| Assujettie à la TVA | oui | 20/09/2025 |
| Employeur ONSS | oui | 01/04/2026 |
| Activité (NACE 2025) | 69.201 — experts-comptables (fiscalistes) certifiés | 20/09/2025 |
| Exercice comptable | clôture au 31 décembre (1er exercice : 09/09/2025 → 31/12/2026) | — |

### L'entité dont le site publie le numéro

| Champ BCE | Valeur | Depuis |
|---|---|---|
| Numéro d'entreprise | **0505.985.850** | — |
| Dénomination | **TMF Assist** | 01/03/2026 |
| Siège | Rue César Franck 52, **1050 Ixelles** | 01/03/2026 |
| Forme légale | Société en nom collectif (SNC) | 01/11/2018 |
| Gérant | Trufin, Marius | 05/12/2014 |
| Activités TVA | 70.200 / 62.200 / 82.990 / 82.100 — **conseil, plus comptabilité** | 01/03/2026 |

C'est la société sœur, qui exploite `tmfassist.be`.

### Ce que le site publie sur `/fr/legal` et `/ro/legal`

**[VÉRIFIÉ]** Cinq champs sur cinq sont inexacts :

| Le site écrit | La BCE dit | Verdict |
|---|---|---|
| « Nom de la société : TMF Compta **SNC** » | TMF COMPTA **SRL** | ❌ forme juridique |
| « Forme juridique : Société en nom » | Société à responsabilité limitée | ❌ |
| « Siège social : Sterrebeekstraat **154A** » | Sterrebeekstraat **154** | ❌ (le « A » est de trop) |
| « Numéro d'entreprise : **BE0505985850** » | **BE 1027.440.826** | ❌ **numéro d'une autre personne morale** |
| « Directeur de la publication : **Marius Trufin** » | Administrateur : **Michel Tamine** | ❌ |

**Le plus grave est le numéro d'entreprise.** Le site de TMF Compta publie le numéro qui
identifie aujourd'hui **TMF Assist**, une personne morale distincte, établie à une autre
adresse, avec un autre dirigeant et d'autres codes d'activité. Un prospect, un fournisseur
ou un contrôleur qui vérifie ce numéro à la BCE — réflexe courant avant de confier une
comptabilité — tombe sur une société de conseil à Ixelles, pas sur le cabinet qu'il consulte.

L'article XII.6 du Code de droit économique impose de rendre accessibles « de manière facile,
directe et permanente » la dénomination, l'adresse géographique et **le numéro d'entreprise**
du prestataire. Aucun des trois n'est exact.

## 0.2 Ce qui, en revanche, est correct — et que j'avais eu tort de remettre en cause

**[VÉRIFIÉ]**

- **« Zaventem » est exact.** TMF Compta SRL a bien son siège à Sterrebeekstraat 154,
  1930 Zaventem. Tout le positionnement SEO local sur Zaventem est **légitime et à conserver**.
- **L'adresse de la page contact (« Sterrebeekstraat 154 ») est la bonne.** C'est celle des
  mentions légales (« 154A ») qui est erronée — l'inverse de ce que j'avais d'abord écrit.
- **L'agrément ITAA est officiel et inscrit à la BCE** : « Expert-comptable (fiscaliste) ITAA »
  depuis le **26 mars 2026**. Ce n'est donc pas seulement un argument commercial, c'est une
  **autorisation publique vérifiable** — et le site n'en dit pas un mot (voir §7.4 et §9.2).

## 0.3 Deux points nouveaux que cette découverte fait apparaître

### a) [MAJEUR] L'ancienneté affichée n'est pas celle de cette société

**[VÉRIFIÉ]** TMF Compta SRL existe depuis le **10 septembre 2025**, soit moins d'un an.
Or le site affiche :

> « Notre cabinet comptable à Zaventem cumule **plus de 10 années d'expérience** »

et une frise « Notre histoire » qui démarre en **2014** — l'année de création de l'*autre*
entité (aujourd'hui TMF Assist).

**[HYPOTHÈSE, à valider juridiquement]** Présenter l'historique d'une société sœur comme
celui de l'entité qui contracte peut relever de la pratique commerciale trompeuse
(livre VI du CDE). **[RECOMMANDATION]** La formulation honnête et tout aussi vendeuse existe :
parler de l'**expérience de l'équipe** et de la **continuité du groupe**, pas de l'ancienneté
de la personne morale. Par exemple : « Une équipe qui accompagne les indépendants et les PME
depuis 2014, aujourd'hui réunie au sein de TMF Compta SRL. »

### b) [MAJEUR] La dénomination officielle est enregistrée en NÉERLANDAIS

**[VÉRIFIÉ]** La BCE indique : « TMF COMPTA — **Dénomination en néerlandais**, depuis le
10 septembre 2025 ». L'entité est établie à Zaventem, **commune de la Région flamande**.

Cela renforce nettement l'arbitrage sur la langue néerlandaise (§7.5 et Partie 12) : une
société à dénomination néerlandaise, domiciliée en Flandre, dont le site n'existe qu'en
français et en roumain. **[RECOMMANDATION]** Reconsidérer sérieusement l'ajout d'une version
NL — c'est désormais un enjeu d'alignement, et plus seulement d'opportunité commerciale.

## 0.4 [RECOMMANDATION] Ce qu'il faut corriger, et dans quel ordre

1. **Mentions légales** — reprendre les cinq champs de la BCE : dénomination *TMF Compta SRL*,
   forme *société à responsabilité limitée*, siège *Sterrebeekstraat 154, 1930 Zaventem*,
   numéro **BE 1027.440.826**, et le responsable réel. *(minutes)*
2. **Numéro de TVA** — l'afficher dans le pied de page de toutes les pages, au format
   `BE 1027.440.826`. *(minutes)*
3. **Agrément ITAA** — l'afficher : titre exact « expert-comptable (fiscaliste) », mention de
   l'Institut comme autorité de contrôle, lien vers `search.itaa.be`. *(heures)*
4. **Ancienneté** — reformuler « plus de 10 années d'expérience » et la frise, pour distinguer
   l'expérience de l'équipe de l'âge de la société. *(heures)*
5. **Lien vers `tmfassist.be`** — les deux marques sont désormais deux sociétés distinctes du
   même groupe. Clarifier qui fait quoi, et lier dans les deux sens (§11). *(heures)*
6. **Arbitrage NL** — à instruire (§0.3b).

# PARTIE 1 — SYNTHÈSE

## 1.1 Notes par dimension

| Dimension | Note | Verdict en une phrase |
|---|---|---|
| Identité légale / conformité | **2/10** | Publie une identité que la BCE ne reconnaît plus, et décrit des traitements de données qui n'existent pas. |
| SEO local & contenu | **3/10** | Aucune donnée structurée, aucun contenu, positionnement sur une ville quittée. |
| Conversion (CRO) & UX | **3/10** | Aucun appel à l'action au-dessus de la ligne de flottaison, aucun téléphone dans la navigation. |
| Accessibilité | **3/10** | Zéro repère sémantique, aucun focus visible, 17 éléments interactifs sans nom. |
| SEO technique | **3,5/10** | Site dupliqué intégralement sur `www`, aucun canonical, hreflang invalide, 20 liens 404. |
| Performance | **3,5/10** | Excellente en desktop, dégradée en mobile par trois causes précises et corrigeables. |
| Code & architecture | **4/10** | Fondations Next.js saines, mais aucun garde-fou : 8 classes CSS mortes, liens vers routes supprimées. |
| Sécurité | **5/10** | Bon socle d'en-têtes, mais aucune protection anti-usurpation d'email et framework de 9 mois. |

**Ces notes ne sont pas un jugement sur le travail fourni.** La plupart des défauts sont des
**oublis de configuration** — pas des erreurs d'architecture. Le socle technique est correct
(rendu serveur intégral, CLS parfait, TTFB à 70 ms, HSTS preload). C'est précisément ce qui
rend la remise à niveau rapide.

## 1.2 Les 10 corrections les plus rentables

Classées par rapport (impact ÷ effort). Les cinq premières tiennent en une demi-journée.

| # | Correction | Effort | Gain |
|---|---|---|---|
| 1 | Ajouter `priority` sur l'image hero (`next/image`) | **1 ligne** | LCP mobile 3,8 s → ~2 s |
| 2 | Réparer les liens `/fr/services` et `/fr/projects` du pied de page | **2 lignes** | Supprime 20 liens 404 internes |
| 3 | Corriger `md:w[85%]` → `md:w-[85%]` | **1 caractère** | Répare l'affichage entre 768 et 1024 px |
| 4 | Corriger les deux « pentru » roumains dans la page française | **2 mots** | Supprime une faute visible par tout francophone |
| 5 | Rediriger `www` en 301 vers l'apex + ajouter les `canonical` | **~10 lignes** | Supprime la duplication intégrale du site |
| 6 | Corriger les 5 champs des mentions légales (dont le n° d'entreprise, qui est celui d'une autre société) | heures | Traite le risque juridique n°1 |
| 7 | Publier SPF + DKIM + DMARC | heures | Bloque l'usurpation de `info@tmfcompta.be` |
| 8 | Ajouter le JSON-LD `AccountingService` (copiable depuis tmfassist.be) | heures | Levier SEO local le plus rentable |
| 9 | Optimiser / externaliser le SVG de la roue (153 Ko inline) | heures | −67 % du poids des 2 plus grosses pages |
| 10 | Ajouter un CTA + le téléphone dans l'en-tête | heures | Crée le premier vrai chemin de conversion |

---

# PARTIE 2 — CARTE D'IDENTITÉ TECHNIQUE

**[VÉRIFIÉ]** Relevé complet.

## 2.1 Infrastructure

| Élément | Valeur |
|---|---|
| Hébergement | OVH — VPS unique, `54.37.231.69`, rDNS `vps-19a246fe.vps.ovh.net` |
| IPv6 | **Aucun** |
| CDN | **Aucun** |
| Registrar du domaine | IONOS SE — domaine `.be` créé le 12/04/2022 |
| DNS | `ns1101.ui-dns.biz`, `ns1111.ui-dns.org`, `ns1061.ui-dns.de`, `ns1113.ui-dns.com` |
| Messagerie | Google Workspace (`MX 1 smtp.google.com`) |
| TLS | Let's Encrypt, 2 certificats mono-domaine distincts (apex + `www`), valides jusqu'au 04/11/2026 |
| OCSP stapling | **Absent** (« OCSP responses: no responses sent ») |
| CAA | **Aucun enregistrement** |
| Protocole | HTTP/2, `alt-svc: h3` annoncé |
| Framework | **Next.js 16.0.8** (App Router + Turbopack) — empreinte `window.next={version:"16.0.8",appDir:!0}` |
| Analytics | Umami auto-hébergé — `umami.kago-group.com`, site ID `c40ec6e4-93cf-4161-81a1-27b2b1fc2490` |
| Prestataire | Kago Group SRL (`kago-group.com`) |

### Le serveur est mutualisé avec le prestataire

**[VÉRIFIÉ]** Tous ces domaines résolvent vers **la même IP `54.37.231.69`** :

```
tmfcompta.be · www.tmfcompta.be · kago-group.com · umami.kago-group.com
forms.kago-group.com · status.kago-group.com · prospecta.kago-group.com
bildconceptdemo.kago-group.com · ibgestiondemo.kago-group.com
```

Le site du cabinet comptable, le site de l'agence, son service de formulaires, sa page de
statut, son outil d'analytics et au moins trois sites de démonstration client partagent
**une seule machine sans CDN**.

**[HYPOTHÈSE]** Conséquences probables : point de défaillance unique (une panne ou une
compromission affecte tout), et surface d'attaque commune. **[RECOMMANDATION]** À discuter
avec le prestataire : isolation, sauvegardes, engagement de disponibilité.

## 2.2 Next.js 16.0.8 : 9 mois de retard

**[VÉRIFIÉ]**

| | |
|---|---|
| Version servie | **16.0.8**, publiée le **08/12/2025** (registre npm) |
| Dernière version stable | **16.3.4** |
| Retard | **~267 jours (8,8 mois)** |
| Ligne 16.0.x | Abandonnée — les correctifs vont sur les lignes supérieures |

**[RECOMMANDATION]** Planifier la montée de version. Une application vitrine sans
middleware complexe migre généralement sans douleur en mineur. À faire relire par le
prestataire, avec test de non-régression sur les 10 pages.

## 2.3 En-têtes HTTP

**Présents (bon socle) :** `strict-transport-security: max-age=63072000; includeSubDomains; preload`,
`x-content-type-options: nosniff`, `x-frame-options: SAMEORIGIN`,
`referrer-policy: origin-when-cross-origin`, `permissions-policy: camera=(), microphone=(), geolocation=()`.

**Absents :** `Content-Security-Policy`, `Cross-Origin-Opener-Policy`,
`Cross-Origin-Resource-Policy`, `Cross-Origin-Embedder-Policy`,
`X-Permitted-Cross-Domain-Policies`.

**Obsolète conservé :** `x-xss-protection: 1; mode=block` — cet en-tête est retiré des
navigateurs modernes et a lui-même causé des failles. À supprimer.

**Divulgation :** `x-powered-by: Next.js` — à désactiver (`poweredByHeader: false`).

---

# PARTIE 3 — BUGS FONCTIONNELS

Ce sont des défauts objectifs, indiscutables, et corrigeables en minutes.

## 3.1 [CRITIQUE] 20 liens internes en 404 dans le pied de page

**[VÉRIFIÉ]** Le pied de page contient **deux menus** : un correct au-dessus, un cassé en
dessous. Le second pointe vers des routes supprimées :

| Lien | Libellé affiché | Code HTTP |
|---|---|---|
| `/fr/services` | « Comptabilité générale » | **404** |
| `/fr/projects` | « À propos » | **404** |
| `/ro/services` | « Contabilitate generală » | **404** |
| `/ro/projects` | « Despre noi » | **404** |

Présents sur **les 10 pages** → **20 liens morts**.

Le libellé a été mis à jour lors d'un renommage de routes, **le `href` non**. Et la page
d'atterrissage est la page 404 par défaut de Next.js : **en anglais, sans attribut `lang`,
sans logo, sans navigation, sans lien de retour** (voir §3.4).

**Correctif :** remplacer `/fr/services` → `/fr/general-accounting` et `/fr/projects` →
`/fr/about` (idem RO). Puis supprimer le menu dupliqué.

## 3.2 [MAJEUR] Une classe Tailwind invalide sur l'image la plus importante du site

**[VÉRIFIÉ]** Dans le HTML servi, sur l'image hero (qui est l'élément LCP) :

```html
class="w-[60%] md:w[85%] lg:w-[70%] mx-auto"
                 ↑ tiret manquant
```

`md:w[85%]` n'est pas une classe Tailwind valide : elle n'existe donc pas dans le CSS
compilé. Entre 768 px et 1024 px, l'image conserve `w-[60%]` au lieu de 85 %.

Confirmé indépendamment par l'instantané DOM de Lighthouse.

**[VÉRIFIÉ]** Ce n'est pas un cas isolé : **aucun linter Tailwind n'est en place**.
L'analyse des classes utilisées dans le HTML face à celles définies dans `main.css` révèle
**8 classes mortes** en production.

**Correctif :** `md:w-[85%]`, puis ajouter `eslint-plugin-tailwindcss` ou
`prettier-plugin-tailwindcss` au projet pour que ce type d'erreur ne repasse plus.

## 3.3 [MAJEUR] Un mot roumain dans la page française

**[VÉRIFIÉ]** Inventaire exhaustif des fuites de traduction (balayage de 24 mots-sondes
dans les deux sens sur les 10 pages) :

**Roumain dans les pages FR** — 2 occurrences, toutes sur `/fr/general-accounting` :

> « …ou de conseils pour les investissements, notre équipe dédiée est là **pentru** vous
> guider à chaque étape du chemin. »

> « Nos experts comptables sont là **pentru** vous accompagner dans la compréhension des
> règles… »

(*pentru* = « pour » en roumain.)

**Français dans les pages RO** — 6 occurrences : « **Mentions legale** » au lieu de
« Mențiuni legale », dans le pied de page des 5 pages RO **et** en `<h1>` de `/ro/legal`.

Aucune autre fuite détectée.

**[VÉRIFIÉ]** Autres défauts rédactionnels dans la version roumaine (`/ro/about`) :
« continuăa creșterii » (faute de frappe), « devenind o companie de PME » (tournure
incorrecte), « Ne mutăm în noi locuri » (calque littéral de « nouveaux locaux » ; correct :
« sedii noi »).

**[VÉRIFIÉ — point positif]** Les diacritiques roumains sont correctement saisis : 73
occurrences avec virgule souscrite (`ș`, `ț`), **zéro** avec la cédille obsolète (`ş`, `ţ`).
C'est un détail que la plupart des sites ratent.

## 3.4 [MAJEUR] La page 404 est celle de Next.js par défaut

**[VÉRIFIÉ]**

```bash
curl -s https://tmfcompta.be/fr/inexistant
```

```html
<html>                                        <!-- aucun attribut lang -->
<title>404: This page could not be found.</title>   <!-- en anglais -->
```

Aucun logo, aucune navigation, aucun lien de retour, aucune version roumaine. Ironie : elle
contient `@media (prefers-color-scheme: dark)` — **la seule règle de mode sombre de tout
le site**.

C'est la page que voient les visiteurs qui cliquent sur les 20 liens cassés du §3.1.

## 3.5 [MOYEN] La roue de services contient un segment dupliqué

**[VÉRIFIÉ]** Le SVG de la roue contient 15 éléments `<a>`. Les segments 2 et 3 ont des
données de tracé `d=` **strictement identiques** et pointent tous deux vers `#section2`,
avec des remplissages différents (`#D0E3FF` puis `#BDD8FF`) :

```
seg2: section2  fill=#D0E3FF  d=M586.223 123.872C617.039 162.515 6...
seg3: section2  fill=#BDD8FF  d=M586.223 123.872C617.039 162.515 6...  ← géométrie identique
```

Deux formes superposées au même endroit, la seconde recouvrant la première. Copier-coller
non corrigé.

**[VÉRIFIÉ — point positif]** Les 7 ancres cibles (`#section1` à `#section7`) existent bien
sur `/fr/general-accounting` : les liens fonctionnent.

## 3.6 [MOYEN] Contenus et dates figés en dur

**[VÉRIFIÉ]**

- Copyright « **© 2023-2025** » sur les 10 pages, alors que nous sommes en 2026.
- Frise « Notre histoire » qui s'arrête à **2022**.
- Avis clients avec ancienneté écrite en dur : « il y a 3 ans », « acum un an » — ces
  mentions ne bougeront jamais.
- Le middleware i18n intercepte **tous** les chemins, y compris ceux qui devraient être
  réservés :
  `/.well-known/security.txt` → 307 → `/fr/.well-known/security.txt` → 404.
  Aucun fichier `/.well-known/` n'est donc servable (security.txt, `assetlinks.json`,
  `apple-app-site-association`).

---

# PARTIE 4 — SEO TECHNIQUE

## 4.1 [CRITIQUE] Le site existe en double exemplaire intégral

**[VÉRIFIÉ]**

```bash
curl -s https://www.tmfcompta.be/fr  -o www.html   # 200, 227 547 octets
curl -s https://tmfcompta.be/fr      -o apex.html  # 200, 227 547 octets
diff www.html apex.html                            # identiques
```

`www` et l'apex servent tous deux le site **entier**, en HTTP 200, avec des certificats
Let's Encrypt valides **chacun de leur côté** (`CN=tmfcompta.be` et `CN=www.tmfcompta.be`).

Il n'y a **ni redirection de l'un vers l'autre, ni balise `canonical`**. Google voit donc
deux copies complètes du site, sans le moindre signal indiquant laquelle fait foi.

## 4.2 [CRITIQUE] Aucune balise canonical (0 sur 10 pages)

**[VÉRIFIÉ]** `grep -c 'rel="canonical"'` = **0** sur les 10 pages.

Combiné au point précédent et à un espace d'URL dupliquées non borné (paramètres
arbitraires, slashes multiples, suffixe `_rsc`), rien ne consolide les signaux.

## 4.3 [CRITIQUE] hreflang invalide sur cinq critères simultanément

**[VÉRIFIÉ]** Balises servies sur les pages FR :

```html
<link rel="alternate" hreflang="fr" href="/"/>
<link rel="alternate" hreflang="ro" href="/ro"/>
```

Cinq défauts cumulés :

1. **URL relatives** — la spécification exige des URL absolues.
2. **Non auto-référentes** — une page doit se déclarer elle-même.
3. **Non réciproques** — les pages FR déclarent `fr → "/"`, les pages RO déclarent
   `fr → "/fr"`. Signaux contradictoires.
4. **Cible en redirection** — `/` renvoie un 307 vers `/fr/`.
5. **Aucun `x-default`.**

Et surtout : **les balises sont identiques sur toutes les pages.** Depuis `/ro/contact`,
elles pointent vers `/fr` et `/ro` — les **accueils**, pas `/fr/contact` et `/ro/contact`.
Aucune page interne ne déclare donc son équivalent traduit.

Confirmé indépendamment : Lighthouse échoue l'audit « Document doesn't have a valid
`hreflang` » sur les 5 pages testées, en citant textuellement ces deux balises.

## 4.4 [MAJEUR] Aucun lien crawlable entre le français et le roumain

**[VÉRIFIÉ]** Le sélecteur de langue est composé de deux `<button>`, pas de liens :

```html
<button class="px-2 py-1 rounded bg-[#002859] text-white">FR</button>
<button class="px-2 py-1 rounded bg-gray-200 text-gray-700">RO</button>
```

Aucun `href`, aucun `lang`, aucun `hreflang`, aucun `aria-pressed`, aucun `aria-current`,
aucun `aria-label`.

**[VÉRIFIÉ — point positif]** Le comportement JS est bon : depuis `/fr/contact`, le clic
sur « RO » mène bien à `/ro/contact`. Le chemin est préservé.

**Mais** : Googlebot ne peut suivre aucun lien entre les deux langues, et un visiteur ne
peut pas ouvrir l'autre version dans un nouvel onglet (clic milieu, clic droit).

**Correctif :** utiliser des `<a href>` (avec `hreflang` et `aria-current="true"` sur la
langue active) plutôt que des `<button>`. Le comportement JS peut être conservé.

## 4.5 [MAJEUR] Aucune donnée structurée (0 sur 10 pages)

**[VÉRIFIÉ]** `grep -c 'application/ld+json'` = **0**.

Pour un commerce local, c'est le levier de visibilité le plus rentable inexploité : pas de
`LocalBusiness` / `AccountingService`, pas de `FAQPage`, pas de `BreadcrumbList`, pas
d'`Organization`, pas de `WebSite`.

**Le correctif est déjà écrit en interne** — voir la Partie 10 sur `tmfassist.be`.
Un modèle prêt à coller figure en Annexe A.

## 4.6 [MAJEUR] Aucune balise Open Graph ni Twitter Card

**[VÉRIFIÉ]** 0 balise `og:`, 0 balise `twitter:` sur les 10 pages.

Tout partage du site — WhatsApp, LinkedIn, Facebook, Messenger, Slack, e-mail — affiche un
lien nu, sans titre, sans description, sans image. Pour un cabinet dont l'acquisition passe
largement par le bouche-à-oreille et la messagerie, c'est une perte directe.

## 4.7 [MAJEUR] Sept services enfermés dans une seule URL

**[VÉRIFIÉ]** `/fr/general-accounting` décrit 7 métiers distincts (conseil en création
d'entreprise, missions spéciales, aide à la gestion, accompagnement de la personne, social,
conseil fiscal, tenue de comptabilité), accessibles uniquement via des ancres `#section1`
à `#section7`, dont **le texte d'ancre est vide** (ce sont des tracés SVG).

Sept pages de destination potentielles, chacune capable de se positionner sur ses propres
requêtes, réduites à une seule URL et à zéro texte d'ancre exploitable.

## 4.8 [MOYEN] Autres défauts SEO techniques

**[VÉRIFIÉ]**

| Défaut | Détail |
|---|---|
| Redirections temporaires | `http://` → `https://www` → `/fr/` → `/fr` : chaîne de 3 sauts, toutes en **307/308 temporaires** au lieu de 301 permanentes |
| `lastmod` figé | `2026-03-01T20:03:11Z` (± 1 ms) sur les 10 URL — horodatage de build, pas de date de contenu |
| Sitemap sans hreflang | Le namespace `xmlns:xhtml` est absent : aucune annotation de langue. C'était le dernier filet de sécurité, puisque les balises HTML sont invalides |
| Titles courts et dupliqués | `/fr/contact` et `/ro/contact` portent le **même** title au caractère près : « Contact \| TMF Compta » (20 car.) |
| Hiérarchie de titres cassée | `H1` puis `H3` directement — **aucun `H2`** sur 8 pages sur 10 (seule `/legal` en a) |
| Slugs en anglais | `general-accounting`, `about`, `legal` sur un site FR/RO |
| Ratio texte/HTML | **1,6 %** — 227 Ko de HTML pour 634 mots sur l'accueil (voir §5.3) |
| Icônes modernes | Aucun `manifest`, aucun `apple-touch-icon`, aucun `theme-color` — un seul `favicon.ico` |

**[VÉRIFIÉ — points positifs]** Le socle d'indexation est sain : rendu 100 % côté serveur
(HTML identique pour Googlebot et pour un navigateur), aucun cloaking, aucun `noindex`
accidentel, `robots.txt` correct, vrais codes 404, sitemap syntaxiquement valide dont les
10 URL correspondent exactement aux 10 pages réelles.

---

# PARTIE 5 — PERFORMANCE

## 5.1 Mesures

**[MESURÉ — Lighthouse 12.8.2 exécuté en local, Chrome headless]**

| Page | Perf | A11y | BP | SEO | FCP | **LCP** | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/fr` mobile | 89 | 95 | 100 | 92 | 1,2 s | **3,8 s** | 10 ms | 0 |
| **`/fr` desktop** | **99** | 95 | 100 | 92 | 0,3 s | **0,8 s** | 0 ms | 0 |
| `/ro` mobile | 89 | 95 | 100 | 92 | 1,2 s | **3,8 s** | 0 ms | 0 |
| `/fr/general-accounting` mobile | 96 | 94 | 100 | 92 | 1,1 s | 2,7 s | 10 ms | 0 |
| **`/fr/contact` mobile** | **79** | **90** | 100 | 92 | 0,9 s | **5,8 s** | 0 ms | 0 |

**Trois enseignements :**

1. **En desktop, le site est excellent** (99/100, LCP 0,8 s). Le problème est
   **spécifiquement mobile** — le pire cas possible, la recherche locale (« comptable près
   de moi ») étant majoritairement mobile.
2. **La page contact est la plus dégradée du site** (79/100, LCP 5,8 s). C'est la page la
   plus critique pour la conversion.
3. **CLS à 0 et TBT à 10 ms partout** : la stabilité visuelle et la réactivité sont
   excellentes. Il n'y a qu'**un seul** problème de performance, et il porte un nom : le LCP.

> **Note :** aucune donnée terrain CrUX n'a pu être obtenue (quota de l'API PageSpeed
> Insights dépassé au moment de l'audit). Les chiffres ci-dessus sont des mesures en
> laboratoire. **[RECOMMANDATION]** Vérifier les données réelles dans la Search Console.

## 5.2 [CRITIQUE] La cause du LCP : l'image hero est en chargement paresseux

**[VÉRIFIÉ]** L'élément LCP est cette image, telle que servie :

```html
<img alt="working" loading="lazy" width="663" height="497" decoding="async"
     data-nimg="1" class="w-[60%] md:w[85%] lg:w-[70%] mx-auto" ...>
```

`loading="lazy"` sur l'image LCP. C'est le comportement **par défaut** de `next/image`
quand la prop `priority` est omise.

Trois audits Lighthouse en échec, tous sur ce point : « Largest Contentful Paint image was
lazily loaded », « LCP request discovery », « Preload LCP image ».

**Statistique révélatrice — [VÉRIFIÉ] sur les 10 pages :**

| Attribut | Nombre d'images |
|---|---|
| `loading="lazy"` | **102 / 102** |
| `loading="eager"` | 0 |
| `fetchpriority="high"` | 0 |

**La prop `priority` n'est utilisée nulle part sur le site.**

**Correctif — une ligne :**

```jsx
<Image src={homeIllustration} alt="…" priority />
```

**[HYPOTHÈSE]** Gain attendu : LCP mobile de 3,8 s vers ~1,5–2,0 s. C'est le meilleur
rapport gain/effort de tout le site.

## 5.3 [CRITIQUE] Un SVG décoratif de 153 Ko inline dans le HTML

**[VÉRIFIÉ]** Décomposition de `fr.html` (227 241 octets) :

| Composant | Octets | Part |
|---|---|---|
| `<head>` | 1 953 | 0,9 % |
| Scripts inline (charge RSC) | 11 435 | 5,0 % |
| Attributs `class` | 10 393 | 4,6 % |
| **SVG inline (la roue de services)** | **153 928** | **67,7 %** |

Le SVG à lui seul : **40 `<path>`, 15 `<a>`, 7 `<filter>`/`<mask>`**, dont les attributs
`d=` totalisent 150 168 octets — **et le plus long fait à lui seul 33 596 octets**. C'est
un export vectoriel brut, non optimisé (décimales en pleine précision, typique d'un export
Figma ou Illustrator).

**Répartition par page — [VÉRIFIÉ] :**

| Page | HTML total | SVG inline | Part |
|---|---|---|---|
| `/fr` | 227 241 | 153 928 | **67,7 %** |
| `/fr/general-accounting` | 183 934 | 153 928 | **83,7 %** |
| `/ro` | 235 829 | 162 676 | **69,0 %** |
| `/ro/general-accounting` | 192 426 | 162 676 | **84,5 %** |

**Et il est aussi dans le bundle JavaScript. [VÉRIFIÉ] :** le chunk
`402311184ab6d8b7.js` (324 962 octets bruts, 117 Ko transférés) contient 16 attributs `d=`
de plus de 500 caractères, totalisant **301 706 octets = 92,8 % du fichier**, avec le
`viewBox` `658 658` présent **2 fois** — la roue y est dupliquée, vraisemblablement une
fois par langue.

**Effet cumulé :** ce SVG est inline dans 4 pages, en 2 langues, **et le HTML n'est jamais
mis en cache** (voir §5.4). Il est donc retransmis intégralement à chaque affichage.

**Correctifs, par rendement décroissant :**
1. Passer le SVG dans **SVGO** (réduction typique de 60 à 80 % sur ce type d'export).
2. L'**externaliser** en fichier `.svg` servi avec cache immutable — il devient alors
   téléchargé une seule fois pour tout le site.
3. Réduire la précision des coordonnées à 2 décimales.
4. Supprimer les 7 `<filter>`/`<mask>` si l'effet n'est pas indispensable.
5. **Remplacer les libellés vectorisés par du vrai texte** (voir §6.5 — c'est aussi un
   problème d'accessibilité).

## 5.4 [MAJEUR] Aucune mise en cache du HTML

**[VÉRIFIÉ]** En-tête servi sur les 10 pages :

```
cache-control: private, no-cache, no-store, max-age=0, must-revalidate
```

Un site vitrine de 10 pages, **sans aucune donnée dynamique**, est rendu par le serveur à
chaque requête. Conséquences : aucun cache navigateur, aucun cache intermédiaire, pas de
`bfcache` (retour arrière instantané), et un effondrement sous charge.

**[VÉRIFIÉ]** Le site utilise `<a href>` partout au lieu de `next/link` : la navigation
client de l'App Router est embarquée dans le bundle mais **jamais utilisée**. Chaque clic
provoque un rechargement complet.

**Correctif :** génération statique (`export const dynamic = 'force-static'` +
`generateStaticParams`), et navigation via `next/link`.

## 5.5 [MAJEUR] Brotli est supporté mais jamais servi aux vrais navigateurs

**[VÉRIFIÉ]** C'est un défaut subtil que seule une mesure explicite révèle :

| `Accept-Encoding` envoyé | `content-encoding` reçu | Octets |
|---|---|---|
| `br` | **br** | **60 197** |
| `gzip` | gzip | 67 819 |
| **`br, gzip`** *(ce que tout navigateur envoie)* | **gzip** ❌ | **67 819** |
| `identity` | *(aucun)* | 227 547 |

Le serveur **sait** faire du brotli, mais choisit gzip dès que les deux sont proposés —
c'est-à-dire **toujours, pour tous les visiteurs réels**. Perte : **7 622 octets par page
(11 %)**, sur chaque affichage, sans aucun cache HTML pour l'amortir.

**Correctif :** corriger l'ordre de préférence des encodages dans le reverse proxy.

## 5.6 [MAJEUR] Poids et librairies

**[VÉRIFIÉ]** Accueil : **445 Ko transférés sur 31 requêtes**, dont **321 Ko de JavaScript**
(≈ 1 006 Ko décompressés) répartis sur 13 chunks.

Audits Lighthouse associés :

| Audit | Économie estimée |
|---|---|
| Reduce unused JavaScript | 23 Kio (35 % du chunk `82f86bbf…` jamais exécuté) |
| Avoid serving legacy JavaScript | 14 Kio de polyfills inutiles |
| Preconnect to required origins | 140 ms sur `umami.kago-group.com` |
| Eliminate render-blocking resources | 100 ms (CSS bloquant, 150 ms) |
| Font display | 30 ms (police d'icônes `slick.woff`) |

**[VÉRIFIÉ]** `react-slick` charge une police d'icônes en **4 formats hérités**, tous servis
en HTTP 200 : `.eot` (2 048 o — Internet Explorer, mort depuis 2022), `.woff` (1 380 o —
effectivement téléchargé), `.ttf` (1 892 o), `.svg` (2 152 o — format supprimé des
navigateurs). Pour un carrousel de 5 avis.

**[VÉRIFIÉ]** Le script Umami est chargé depuis `umami.kago-group.com` — **la même machine
physique** que le site. Une résolution DNS et une poignée de main TLS complètes sont payées
pour rien. Et il est préchargé (`<link rel="preload">`) alors qu'il n'est pas critique.

## 5.7 [MOYEN] Le `srcset` des images est inopérant

**[VÉRIFIÉ]**

```bash
# w=1080, 1920 et 3840 renvoient tous le MÊME fichier :
home-illustration w=640  -> 21 458 o  image/webp
home-illustration w=1080 -> 15 396 o  image/webp
home-illustration w=1920 -> 15 396 o  image/webp
home-illustration w=3840 -> 15 396 o  image/webp
```

Les descripteurs `2x` et `3x` sont morts : l'image source est plus petite que le plus grand
descripteur demandé. **Curiosité :** la variante « petite » (`w=640`, 21 458 o) est
**plus lourde** que la variante « grande » (`w=1080`, 15 396 o) — l'appareil mobile
télécharge donc davantage d'octets que le poste de bureau.

**[VÉRIFIÉ — point positif]** Le format WebP est bien négocié et servi (69 185 o en PNG
sans en-tête `Accept` adéquat, contre 15 396 o en WebP).

## 5.8 [MOYEN] Le sous-ensemble de police roumain n'est jamais préchargé

**[VÉRIFIÉ]** Manrope est correctement découpée en 6 sous-ensembles par graisse, avec
`font-display: swap` (bonne pratique respectée). Mais la répartition des glyphes est la
suivante :

| Fichier | Taille | Préchargé ? | Contient |
|---|---|---|---|
| `a343f882…` (latin) | 24 576 o | **Oui** | `â`, `î`, `Ă` — **pas** `ă`, `ș`, `ț` |
| `6ab0db14…` (latin-ext) | 15 240 o | **Non** | `ă`, `ș`, `ț`, `Ă`, `Ș`, `Ț` |

Le texte roumain a besoin des **deux**. Or l'en-tête `Link: <…>; rel=preload` est
**identique sur `/fr` et sur `/ro`** : seul le sous-ensemble latin est préchargé.

Sur les pages roumaines, le fichier nécessaire à **137 caractères de l'accueil**
(64 `ă` + 33 `ș` + 40 `ț`) est découvert tardivement → avec `font-display: swap`, les
diacritiques roumains changent visiblement de police en cours de rendu.

**Correctif :** rendre le `preload` dépendant de la locale.

**[VÉRIFIÉ — mineur]** 43 règles `@font-face` sont déclarées (8 graisses × 6 sous-ensembles)
pour un site qui n'en utilise visiblement que 2 ou 3. L'impact réseau est nul grâce à
`unicode-range`, mais cela signale un `next/font` non configuré.

## 5.9 Plan de remédiation performance

| Priorité | Action | Effort | Gain estimé |
|---|---|---|---|
| 1 | `priority` sur l'image LCP | 1 ligne | LCP −1,8 à −2,3 s |
| 2 | SVGO + externalisation de la roue | heures | −67 % du poids des 2 plus grosses pages |
| 3 | Corriger la négociation Brotli | minutes | −11 % sur chaque page |
| 4 | Génération statique + `next/link` | heures | TTFB stable sous charge, bfcache actif |
| 5 | Remplacer `react-slick` | jours | −18,5 Ko gzip et 4 polices héritées |
| 6 | `preconnect` Umami / auto-héberger le script | minutes | −140 ms |
| 7 | Préchargement de police par locale | heures | Supprime le FOUT roumain |

**Objectif réaliste : LCP mobile < 2 500 ms**, atteignable avec les points 1 à 3 seuls.

---

# PARTIE 6 — ACCESSIBILITÉ (WCAG 2.2 AA)

## 6.1 Une nuance importante sur le score

Lighthouse donne **95/100**. C'est un score **flatteur** : les contrôles automatisés ne
couvrent qu'environ 30 % des critères WCAG. Ils ne détectent ni l'absence de repères
sémantiques, ni l'absence d'indicateur de focus, ni la pertinence réelle des textes
alternatifs, ni l'utilisabilité au clavier d'un SVG interactif.

Les deux constats coexistent : **95/100 en automatique, plusieurs échecs WCAG 2.2 AA avérés
en audit manuel.**

## 6.2 [CRITIQUE] Zéro repère sémantique sur les 10 pages — WCAG 1.3.1 (A)

**[VÉRIFIÉ]** Recensement des balises sémantiques dans le HTML servi :

| Balise | `/fr` | `/about` | `/contact` | `/general-accounting` | `/legal` |
|---|---|---|---|---|---|
| `<main>` | **0** | 0 | 0 | 0 | 0 |
| `<nav>` | **0** | 0 | 0 | 0 | 0 |
| `<header>` | **0** | 0 | 0 | 0 | 0 |
| `<footer>` | **0** | 0 | 0 | 0 | 0 |
| `<article>` | **0** | 0 | 0 | 0 | 0 |
| `<aside>` | **0** | 0 | 0 | 0 | 0 |
| `<address>` | **0** | 0 | 0 | 0 | 0 |
| `<section>` | 0 | 0 | 1 | 0 | 0 |
| `<div>` | **209** | 43 | 44 | 102 | 30 |

Il existe bien un `<div id="header">`, mais **aucun élément `<header>`**. Un utilisateur de
lecteur d'écran ne peut donc naviguer par régions — la méthode de navigation principale sur
une page inconnue.

**[VÉRIFIÉ]** Aucun lien d'évitement (« aller au contenu ») — **WCAG 2.4.1 (A)**.

## 6.3 [CRITIQUE] Aucun indicateur de focus visible — WCAG 2.4.7 (AA)

**[VÉRIFIÉ]** **37 des 38** éléments focusables testés n'ont aucun style de focus visible.

Le CSS compilé ne contient que **4 règles `:focus`**, dont celle-ci :

```css
.focus\:outline-none:focus { outline-offset: 2px; outline: 2px solid #0000; }
                                                            /* transparent */
```

et **zéro règle `:focus-visible`**.

La suppression du contour est donc **explicite dans le code**, pas un oubli du navigateur.
Un utilisateur naviguant au clavier ne sait à aucun moment où il se trouve.

## 6.4 [CRITIQUE] 17 éléments interactifs sans nom accessible — WCAG 2.4.4 / 4.1.2 (A)

**[VÉRIFIÉ]** Lighthouse échoue « Links do not have a discernible name » sur les 5 pages
testées. Le détail :

**a) Les 15 liens de la roue 360°.** Le SVG contient 15 éléments `<a>`, chacun enveloppant
un simple `<path>` géométrique. Le `<svg>` lui-même n'a **ni `role`, ni `aria-label`, ni
`<title>`**, et aucun `<a>` n'a de texte, d'`aria-label` ou de `<title>`.
Un utilisateur au clavier traverse 15 liens annoncés « lien », sans savoir où ils mènent.

**b) Le lien du logo**, présent sur les 10 pages :

```html
<a href="/fr"><img alt="" loading="lazy" … logo.svg"/></a>
```

Le lien ne contient qu'une image à `alt` vide → **aucun nom accessible**.
*Correctif : `alt="TMF Compta — Accueil"`.*

**[VÉRIFIÉ]** Par ailleurs, la page d'accueil ne contient **aucun attribut `role`** —
zéro occurrence.

## 6.5 [MAJEUR] Les intitulés de métiers sont des images de texte — WCAG 1.4.5 (AA)

**[VÉRIFIÉ]** Les 7 libellés de services de la roue sont rendus en **tracés vectoriels**,
pas en texte (`<text>` : 0 occurrence dans le SVG). Ils ne sont donc ni sélectionnables,
ni traduisibles, ni redimensionnables, ni lisibles par un lecteur d'écran, ni indexables.

C'est la cause conjointe du problème d'accessibilité **et** des 153 Ko du §5.3.

## 6.6 [MAJEUR] Formulaires

**[VÉRIFIÉ]** Formulaire de contact (`/fr/contact`, `/ro/contact`) :

*Points positifs :* chaque `<label for>` est correctement associé à son `<input id>`, les
types sont corrects (`email`, `tel`), les placeholders sont pertinents.

*Défauts :*

| Défaut | Critère WCAG |
|---|---|
| **Aucun** attribut `required` (0 occurrence) | 3.3.2 (A) |
| **Aucun** attribut `autocomplete` (0 occurrence) | **1.3.5 (AA)** |
| Aucun `aria-required`, `aria-describedby`, `aria-invalid` | 3.3.1 (A) |
| Champs obligatoires signalés par un `*` rouge **sans légende** | 1.4.1 (A), 3.3.2 (A) |
| Aucun honeypot, aucun captcha visible dans le markup | — |

*Correctif `autocomplete` :* `family-name`, `given-name`, `email`, `tel`, `organization`.

**[VÉRIFIÉ]** Formulaire e-mail du pied de page (sur les 10 pages) :

```html
<form>
  <input type="email" placeholder="john.doe@gmail.com" name="email"/>
  <button type="submit">Envoyer</button>
</form>
```

**Aucun `<label>`.** Le seul nom accessible est le placeholder — or un placeholder n'est pas
une étiquette (il disparaît à la saisie). **Échec WCAG 3.3.2 (A) et 4.1.2 (A).**

## 6.7 [MAJEUR] Menu mobile et iframe

**[VÉRIFIÉ]** Bouton du menu mobile, tel que servi :

```html
<button class="md:hidden" aria-label="Menu" style="opacity:0">
```

`aria-label` présent (bien), mais **aucun `aria-expanded`, aucun `aria-controls`, aucun
`type="button"`**. Un lecteur d'écran ne peut pas annoncer si le menu est ouvert ou fermé.
**WCAG 4.1.2 (A).**

> *Réserve de méthode :* le comportement d'ouverture n'a pas pu être testé de façon fiable
> (l'onglet d'automatisation passait en `visibilityState: hidden`, ce qui empêche les
> animations d'entrée et les `IntersectionObserver` de se déclencher). **L'absence des
> attributs ARIA est en revanche certaine** — elle se lit dans le HTML servi.

**[VÉRIFIÉ]** L'iframe Google Maps de la page contact **n'a aucun attribut `title`** —
**WCAG 4.1.2 (A)**. C'est ce qui fait chuter le score d'accessibilité de `/fr/contact` à 90,
contre 95 ailleurs.

## 6.8 [MAJEUR] Aucune prise en charge de `prefers-reduced-motion` — WCAG 2.3.3

**[VÉRIFIÉ]** `grep -c 'prefers-reduced-motion'` = **0** dans tout le CSS compilé, sur un
site **intégralement animé** (74 occurrences d'`opacity:0` avec transformations sur la seule
page d'accueil).

Les personnes sujettes aux troubles vestibulaires n'ont aucun moyen de désactiver les
animations.

**[VÉRIFIÉ]** Également absent : `prefers-color-scheme` (0 occurrence) — aucun mode sombre.

## 6.9 [MOYEN] Autres constats

**[VÉRIFIÉ]**

- **Saut de niveau de titre** `H1` → `H3` sur 8 pages sur 10 — WCAG 1.3.1 (A). Confirmé par
  Lighthouse (« Heading elements are not in a sequentially-descending order »).
- **Puces du carrousel** : 20 × 20 px, libellées « 1 » à « 5 » en couleur transparente
  (`rgba(0,0,0,0)`) → ratio de contraste 1,45:1, aucun nom accessible utile.
- **Page courante non signalée** dans la navigation autrement que par une nuance de couleur,
  sans `aria-current` — WCAG 1.4.1 (A).
- **Sélecteur de langue** sans `lang`, sans état, non-lien (§4.4) — WCAG 4.1.2 (A).
- **Passages en langue étrangère non balisés** (le « pentru » français, le « Mentions
  legale » roumain) — WCAG 3.1.2 (AA).
- **74 `opacity:0` dans le HTML servi** : sans JavaScript, la quasi-totalité du contenu est
  invisible.

## 6.10 Points positifs vérifiés

**[VÉRIFIÉ]** Il faut les préserver lors des corrections :

- **Contraste des couleurs : aucun échec** sur les textes réels mesurés. La palette
  (`#002859` marine sur blanc, blanc sur `#002859`) est un vrai point fort.
- **Reflow à 320 px, zoom 200 %, espacement du texte** : trois critères AA réputés
  difficiles, tous conformes (WCAG 1.4.10, 1.4.4, 1.4.12).
- **Attribut `lang` correct** sur chaque version (`lang="fr"`, `lang="ro"`).
- **Labels correctement associés** dans le formulaire de contact.
- **CLS à 0** : aucun décalage de mise en page.
- Toutes les `<img>` portent un attribut `alt` (voir toutefois §7.1 sur leur *contenu*).

## 6.11 European Accessibility Act — mise au point

**[HYPOTHÈSE, à valider juridiquement]** L'EAA (directive 2019/882, applicable depuis le
28 juin 2025) vise principalement le commerce électronique et certains services définis.
Un site vitrine de cabinet comptable **sans vente en ligne** n'y est vraisemblablement
**pas** soumis, et l'exemption micro-entreprise (moins de 10 personnes, CA < 2 M€) pourrait
en outre s'appliquer.

**Ne pas en conclure que l'accessibilité est facultative** : le risque juridique réel se
situe plutôt du côté de la loi anti-discrimination du 10 mai 2007. Et commercialement, un
formulaire inutilisable au clavier reste un formulaire qui ne convertit pas.

---

# PARTIE 7 — CONTENU ET RÉDACTION

## 7.1 [MAJEUR] Les textes alternatifs sont présents mais vides de sens

**[VÉRIFIÉ]** J'avais d'abord noté « toutes les images ont un `alt` : point positif ».
C'est vrai **formellement** et faux **sur le fond**. Inventaire complet :

| Occurrences | Valeur de l'`alt` | Commentaire |
|---|---|---|
| **20×** | `"Image descriptive"` | Texte de remplissage. Ne décrit rien. |
| 10× | `""` (vide) | Dont **le logo, à l'intérieur d'un lien** (§6.4) |
| 6× | `"Logo 1"` … `"Logo 5"` | Les 5 logos partenaires, non identifiés |
| 2× | `"working"` | **En anglais**, sur l'image hero d'un site FR/RO |
| ~30× | Noms des auteurs d'avis | Corrects |
| 6× | `"Création"`, `"Gestion"`, `"Expansion"` + RO | Corrects |

`alt="Image descriptive"` répété 20 fois est le pire cas : il **passe** les contrôles
automatiques et n'apporte **aucune** information, ni à un lecteur d'écran, ni à Google Images.

## 7.2 [MAJEUR] La preuve sociale est figée

**[VÉRIFIÉ]**

- 5 avis **écrits en dur dans le code**, avec leur ancienneté en texte (« il y a 3 ans »,
  « acum un an ») — ces mentions ne bougeront jamais.
- Chaque avis apparaît **4 fois** dans le HTML (3 copies visibles via les clones du
  carrousel + 1 dans la charge RSC).
- Les avatars proviennent de `lh3.googleusercontent.com`, **liés à chaud** puis proxifiés
  par `/_next/image`. Ces URL sont instables : si un auteur change sa photo ou supprime son
  compte, l'image casse, sans repli prévu.
- **Ni note globale, ni nombre d'avis** n'est affiché.
- Un avis roumain contient du français (« Après 11 ans, le chapeau, ») — c'est un vrai avis,
  donc à conserver tel quel, mais il illustre l'absence de relecture.

## 7.3 [MAJEUR] Contenu générique et non différenciant

**[VÉRIFIÉ]** Les 7 blocs de `/fr/general-accounting` (667 mots) sont des paragraphes
interchangeables avec n'importe quel cabinet comptable : aucun chiffre, aucun prix, aucun
délai, aucun secteur, aucun outil nommé. Les **seuls nombres de la page sont « 2023 » et
« 2025 »**, dans le copyright.

La proposition de valeur — « Comptable-Fiscaliste, Situé à Zaventem » / « Optimisez la santé
financière de votre entreprise avec l'expertise d'un cabinet d'expert comptable de
confiance » — ne dit rien qu'un concurrent ne pourrait signer à l'identique.

## 7.4 [VÉRIFIÉ] Absences totales sur les 10 pages

| Recherché | Occurrences |
|---|---|
| « ITAA » / « IPCF » | **0** |
| « agréé » / « agrément » | **0** |
| « TMF Assist » | **0** |
| Horaires (« lundi », « ouvert »…) | **0** |
| Numéro BCE | **1** — uniquement sur `/legal`, jamais présenté comme n° de TVA, absent du pied de page |
| Numéro de téléphone | **1 page** — uniquement sur `/contact`, absent de l'en-tête et du pied de page |

**Le point le plus coûteux : l'agrément professionnel n'est jamais mentionné.**
TMF Compta SRL détient une **autorisation publique inscrite à la BCE** : « Expert-comptable
(fiscaliste) ITAA », **depuis le 26 mars 2026**. Son code d'activité TVA et ONSS est
`69.201 « Activités des experts-comptables (fiscalistes) certifiés »`. C'est l'argument de
réassurance le plus fort dont dispose un cabinet comptable, il est vérifiable publiquement
— et il est totalement absent du site.

## 7.5 Parité de contenu FR / RO

**[VÉRIFIÉ]** En mots visibles :

| Page | FR | RO | Écart |
|---|---|---|---|
| Accueil | 634 | 602 | −32 |
| À propos | 286 | 258 | −28 |
| Contact | 54 | 54 | 0 |
| Comptabilité générale | 705 | 629 | −76 |
| Mentions légales | 431 | 387 | −44 |

L'écart est cohérent avec une langue plus concise ; aucun bloc manquant n'a été identifié.

**[VÉRIFIÉ]** En revanche, **la version roumaine n'est pas localisée, seulement traduite** :
« Belgia », « român », « SRL », « independent » — **0 occurrence** sur `/ro`. Le site parle
roumain mais ne s'adresse pas spécifiquement à un indépendant roumain établi en Belgique.

---

# PARTIE 8 — SÉCURITÉ

## 8.1 [CRITIQUE] Aucune protection contre l'usurpation d'e-mail

**[VÉRIFIÉ]** — contrôles effectués jusque sur le serveur DNS **faisant autorité**
(`ns1061.ui-dns.de`), pas seulement via un résolveur public :

| Enregistrement | État |
|---|---|
| `MX` | `1 smtp.google.com` — Google Workspace |
| **SPF** | **Aucun.** Le seul TXT à l'apex est `google-site-verification=oN8f2…` |
| **DMARC** | **NXDOMAIN** sur `_dmarc.tmfcompta.be` |
| **DKIM** | **Aucun.** 29 sélecteurs courants testés (`google`, `google2`, `default`, `selector1/2`, `s1`, `s2`, `k1`–`k3`, `mail`, `dkim`, `ionos`…) : tous vides |
| **CAA** | Aucun |

**Pourquoi c'est classé critique ici et pas ailleurs.** Pour un site vitrine ordinaire, ce
serait un défaut d'hygiène. Ici, `info@tmfcompta.be` est l'adresse par laquelle transitent
des pièces comptables, des factures et des coordonnées bancaires de clients. Sans SPF ni
DMARC, **n'importe qui peut envoyer un e-mail se présentant comme provenant exactement de
cette adresse**, avec de fortes chances d'atteindre la boîte de réception. Le scénario
« fausse facture avec changement de numéro de compte, envoyée depuis l'adresse du
comptable » est le cas d'usage type de la fraude au virement.

De plus, sans DMARC, **vous ne recevez aucun rapport** : une campagne d'usurpation en cours
serait totalement invisible.

**Correctif : voir Annexe B** (enregistrements exacts et déploiement progressif).

## 8.2 [MAJEUR] Aucune Content-Security-Policy

**[VÉRIFIÉ]** Aucun en-tête `Content-Security-Policy` sur aucune surface testée (`/fr`,
`/fr/contact`, `www`, `/api/contact`, `/robots.txt`, chunks statiques), et aucune balise
`<meta http-equiv>` équivalente (0 occurrence sur les 10 pages).

**Mise en perspective honnête.** Ce site n'accepte **aucun contenu généré par les
utilisateurs** : les avis sont écrits en dur, il n'y a ni commentaires, ni recherche, ni
espace client. Le vecteur XSS classique est donc absent. **La CSP est ici une mesure de
défense en profondeur, pas la correction d'une faille exploitable.** Elle reste
recommandée — voir Annexe C.

**[VÉRIFIÉ]** En revanche, un point mérite attention : le script analytics est chargé
**sans SRI** (`grep -c 'integrity='` = **0** sur les 10 pages), depuis une machine
mutualisée du prestataire :

```json
{"defer":true,"src":"https://umami.kago-group.com/script.js",
 "data-website-id":"c40ec6e4-93cf-4161-81a1-27b2b1fc2490","strategy":"afterInteractive"}
```

Une compromission de cette machine permettrait d'injecter du JavaScript arbitraire sur le
site du cabinet. **[RECOMMANDATION]** Auto-héberger le script (il est de toute façon sur la
même machine — §5.6) ou, à défaut, ajouter `integrity` + `crossorigin`.

## 8.3 [MOYEN] Points de durcissement

**[VÉRIFIÉ]**

- Pas d'**OCSP stapling**.
- Pas d'enregistrement **CAA** : n'importe quelle autorité de certification peut émettre
  pour le domaine.
- `x-xss-protection` obsolète conservé — à supprimer.
- `x-powered-by: Next.js` — divulgation inutile de la pile.
- `/api/contact` : aucune limitation de débit ni protection anti-bot observable dans le
  markup ; le formulaire ne comporte ni honeypot ni captcha.
- L'optimiseur d'images `/_next/image` accepte le domaine distant
  `lh3.googleusercontent.com` — surface à surveiller (les optimiseurs d'images ont un
  historique de vulnérabilités sur le décodage AVIF/WebP).
- Aucun `/.well-known/security.txt` — et le middleware i18n empêcherait de toute façon de
  le servir (§3.6).

## 8.4 Points positifs vérifiés

- **HSTS avec `preload` et `includeSubDomains`**, `max-age` de 2 ans — configuration
  exemplaire.
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`
  présents.
- Certificats TLS valides sur l'apex **et** sur `www`.
- **Aucun cookie propriétaire, aucun Google Analytics, aucun pixel publicitaire** — la
  sobriété technique est réelle (voir toutefois §9.4 sur Google Maps).
- Aucune source map exposée, aucune clé d'API trouvée dans les bundles.

---

# PARTIE 9 — CONFORMITÉ JURIDIQUE ET RGPD

> **Rappel : je ne suis pas juriste.** Cette partie est une analyse documentée avec sources,
> destinée à préparer un échange avec un conseil belge — pas un avis juridique.

## 9.1 [CRITIQUE] L'identité publiée ne correspond pas à la BCE

Traité en **Partie 0**. C'est le point de conformité le plus lourd : l'article XII.6 du
Code de droit économique impose la publication d'une dénomination et d'une adresse
géographique exactes.

## 9.2 [CRITIQUE] La profession réglementée n'est jamais mentionnée

**[VÉRIFIÉ]** Zéro occurrence de « ITAA », « IPCF », « agréé » ou « agrément » sur les
10 pages, alors que :

- TMF Compta SRL détient l'autorisation **« Expert-comptable (fiscaliste) ITAA »**,
  inscrite à la BCE **depuis le 26 mars 2026** ;
- son code d'activité TVA et ONSS est `69.201 « experts-comptables (fiscalistes) certifiés »` ;
- le site revendique explicitement le titre dans son `<h1>` : « **Comptable-Fiscaliste** ».

L'article XII.6 du CDE impose, pour les professions réglementées, d'indiquer l'ordre ou
l'institut professionnel, le titre professionnel, l'État d'octroi, et les règles
professionnelles applicables.

**[RECOMMANDATION]** Publier : numéro d'agrément ITAA, titre exact, mention de l'Institut
des Conseillers fiscaux et Experts-comptables comme autorité de contrôle, lien vers le
registre public (`https://search.itaa.be`), et références de l'assurance RC professionnelle.
C'est à la fois une obligation et **le meilleur argument de réassurance du site** (§7.4).

## 9.3 [CRITIQUE] Les mentions légales décrivent des traitements qui n'existent pas

**[VÉRIFIÉ]** C'est le constat le plus net de tout l'audit, car il est vérifiable des deux
côtés.

**Ce que les mentions légales déclarent** (FR et RO) :

> « Le site est hébergé par : **IONOS** »
> « Le site utilise également **Google Analytics** pour collecter des données analytiques… »
> « Le site utilise des **cookies** pour des finalités analytiques via Google Analytics. »

**Ce qui se passe réellement :**

| Déclaré | Réalité vérifiée |
|---|---|
| Hébergeur IONOS | **OVH** — IP `54.37.231.69`, rDNS `vps-19a246fe.vps.ovh.net`. IONOS est le *registrar du domaine*, pas l'hébergeur. |
| Google Analytics | **Absent.** Aucune requête vers Google Analytics. |
| Cookies analytiques | **Aucun cookie.** `document.cookie` et `localStorage` vides après chargement complet. |
| *(non déclaré)* | **Umami**, hébergé chez le prestataire Kago Group |
| *(non déclaré)* | **Google Maps** sur les deux pages contact (§9.4) |
| *(non déclaré)* | **Avatars Google** des auteurs d'avis (`lh3.googleusercontent.com`) |

**Le seul traitement déclaré n'existe pas, et les trois traitements réels ne sont pas
déclarés.** C'est un manquement direct à l'obligation de transparence (articles 5.1.a, 12
et 13 du RGPD).

## 9.4 [MAJEUR] Google Maps : 464 Ko et un transfert vers un tiers, sans information

**[VÉRIFIÉ]** Les deux pages contact contiennent, **dans le HTML rendu par le serveur** :

```html
<iframe height="250" width="100%" loading="lazy" class="w-full rounded-lg"
  src="https://www.google.com/maps/embed?pb=…!2sTMF%20Compta!5e0!3m2!1sfr!2sbe
       !4v1682965907037!5m2!1sfr!2sbe">
```

*(Le paramètre `4v1682965907037` est un horodatage : l'iframe a été générée le 1er mai 2023.
La langue est figée à `1sfr` — la carte reste **en français sur la page roumaine**.)*

Attributs : `title` **absent**, `referrerpolicy` **absent**, `sandbox` **absent**,
`allow` **absent**. Seul `loading="lazy"` est présent.

**[MESURÉ]** Répartition du trafic réseau de `/fr/contact` par hôte :

| Hôte | Requêtes | Octets |
|---|---|---|
| `maps.googleapis.com` | 14 | **387 240** |
| `maps.gstatic.com` | 1 | **76 713** |
| `tmfcompta.be` | 19 | 275 794 |
| `umami.kago-group.com` | 3 | 2 564 |

**Google Maps pèse 464 Ko — plus que tout le reste du site réuni — sur la page la plus
importante pour la conversion.** C'est la cause du LCP à 5,8 s (§5.1).

**Sur le plan des données :** l'iframe est dans le HTML servi, donc chargée sans aucune
action de l'utilisateur (`loading="lazy"` ne fait que retarder jusqu'à l'approche de la
zone visible). Elle déclenche 15 requêtes vers des serveurs Google et leur transmet
l'adresse IP du visiteur, l'en-tête `Referer` et les caractéristiques du navigateur.
Aucune bannière de consentement n'existe, et les mentions légales n'en disent rien.

> **Précision méthodologique :** `document.cookie` reste vide côté `tmfcompta.be`, ce qui
> est exact. Mais l'iframe est un contexte tiers *cross-origin* : ce que Google y dépose
> l'est sur le domaine `google.com` et est donc **invisible** depuis la page parente.
> L'absence de cookie mesurée côté tmfcompta.be **ne prouve rien** sur Google.

**[RECOMMANDATION]** Par ordre de simplicité :
1. Remplacer la carte par une **image statique + un lien « Ouvrir dans Google Maps »** —
   zéro requête tierce, zéro consentement requis, **~460 Ko économisés**.
2. Charger la carte **au clic** (« cliquez pour afficher la carte »), avec mention du
   transfert vers Google.
3. Conserver la carte derrière une bannière de consentement conforme.
4. Utiliser un fond de carte européen sans traceur (OpenStreetMap / MapLibre).

L'option 1 est la meilleure sur les trois plans à la fois : performance, conformité,
simplicité.

## 9.5 [MAJEUR] Informations RGPD manquantes (article 13)

**[VÉRIFIÉ]** Absents des mentions légales :

- l'identification du **responsable du traitement** en tant que tel ;
- la **base légale** de chaque traitement ;
- les **destinataires** (dont le sous-traitant Kago Group) ;
- les **durées de conservation** des données analytiques ;
- les **droits** des personnes (accès, rectification, effacement, limitation, opposition,
  portabilité) ;
- le **droit de réclamation auprès de l'APD** (Autorité de protection des données, Bruxelles) ;
- l'existence ou non de **transferts hors UE** ;
- un **point de contact** vie privée / DPO ;
- une **date de mise à jour** du document.

Les deux formulaires ne comportent **aucune information au point de collecte** ni lien vers
une politique de confidentialité.

> **Nuance importante :** l'absence de *case à cocher* de consentement n'est pas, en soi,
> une faute. Un formulaire de contact repose normalement sur l'exécution de mesures
> précontractuelles ou l'intérêt légitime, pas sur le consentement. **Ce qui manque, c'est
> l'information**, pas la case.

## 9.6 [MAJEUR] La durée de conservation d'un mois est intenable

**[VÉRIFIÉ]** Les mentions légales annoncent :

> « Les informations fournies via le formulaire de contact sont conservées pendant une durée
> maximale d'**un mois** après la soumission du formulaire. »

**[HYPOTHÈSE, à valider]** Un cabinet comptable est une **entité assujettie** à la loi du
18 septembre 2017 relative à la prévention du blanchiment de capitaux, qui impose la
conservation des données d'identification des clients pendant **10 ans**. Un prospect qui
devient client via ce formulaire voit ses données basculer sous ce régime. La durée
annoncée est donc, au mieux, incomplète.

## 9.7 [MOYEN] Autres points

**[VÉRIFIÉ]**

- **Sous-traitance non documentée** : un contrat au titre de l'article 28 du RGPD est requis
  avec Kago Group, qui héberge le site, l'analytics **et son propre site sur la même
  machine**.
- **Données personnelles de tiers** : 5 avis nominatifs avec photos et liens de profil,
  publiés sans information au titre de l'article 14 du RGPD.
- **Umami n'est pas anonyme au sens strict** : il identifie les visiteurs par un condensat
  d'adresse IP et d'*user-agent*. L'absence de cookie ne suffit pas nécessairement à écarter
  toute obligation en Belgique. **[HYPOTHÈSE — la position de l'APD sur les analytics sans
  cookie mérite d'être vérifiée auprès d'un conseil.]**
- **Résolution extrajudiciaire des litiges** : information absente.
  **⚠️ Attention :** ne **pas** ajouter de lien vers la plateforme ODR européenne, qui a
  **fermé le 20 juillet 2025**.
- **Adresse incohérente** : « Sterrebeekstraat 154**A** » (mentions légales) contre
  « Sterrebeekstraat 154 » (page contact) — incohérence antérieure au déménagement.
- **Bulle Messenger en `http://`** : `http://m.me/100089820520694`, non sécurisé.
- **Notion de « directeur de la publication »** : concept de droit français, sans portée en
  droit belge.

## 9.8 Point positif

**[VÉRIFIÉ]** L'architecture technique est réellement sobre : **aucun cookie propriétaire,
aucun Google Analytics, aucun pixel publicitaire, aucun Tag Manager**. Le site est, dans les
faits, bien plus respectueux que ce que ses propres mentions légales décrivent. **Le travail
consiste donc surtout à décrire correctement une réalité déjà saine** — et à traiter le cas
Google Maps.

---

# PARTIE 10 — CONVERSION, UX ET DESIGN

## 10.1 [CRITIQUE] Aucun chemin de conversion au-dessus de la ligne de flottaison

**[VÉRIFIÉ]**

- **Aucun bouton d'appel à l'action dans le hero** — uniquement du texte.
- **Aucun CTA dans l'en-tête**, sur les 10 pages.
- **Aucun numéro de téléphone** dans l'en-tête ni dans le pied de page. Il n'existe que sur
  `/contact`.
- Le seul point de conversion récurrent est un champ e-mail **en bas de page**.
- Le seul canal conversationnel est une bulle Messenger de ~30 px, **en `http://`**, sans
  nom accessible.

Un visiteur mobile qui arrive sur l'accueil doit faire défiler la quasi-totalité de la page
avant de rencontrer une action possible.

## 10.2 [MAJEUR] Aucun élément de réassurance

**[VÉRIFIÉ]** Absents du site :

agrément ITAA · assurance RC professionnelle · horaires d'ouverture · nombre de clients ·
secteurs servis · logiciels utilisés (Winbooks, Yuki, Exact, Octopus, Silverfin…) ·
délai de réponse · langues parlées · photos de l'équipe · biographies · page tarifs ·
prise de rendez-vous en ligne · FAQ · blog.

La page « À propos » d'un cabinet comptable **ne montre aucun visage**. Pour une profession
qui vend de la confiance interpersonnelle, c'est le manque le plus coûteux.

Les 5 logos du carrousel (`slider-logo-1` à `5`) ne sont accompagnés d'aucune identification :
personne ne sait ce qu'ils représentent.

## 10.3 [MAJEUR] La roue 360° coûte plus qu'elle ne rapporte

**[VÉRIFIÉ]** Bilan complet de ce seul composant :

| Coût | Mesure |
|---|---|
| Poids HTML | **153 Ko inline**, soit 67,7 % de l'accueil et 83,7 % de la page service |
| Poids JS | ~302 Ko bruts dans le chunk principal (92,8 % du fichier), dupliqué ×2 |
| Accessibilité | 15 liens sans nom, SVG sans `role`/`title`, libellés en tracés vectoriels |
| SEO | 7 services réduits à 1 URL, textes d'ancre vides, libellés non indexables |
| UX | Le contenu exige un clic pour être révélé ; libellés très petits sur mobile |
| Bug | Un segment dupliqué (§3.5) |

C'est le composant le plus coûteux du site sur **quatre dimensions simultanément**.

**[RECOMMANDATION]** Le remplacer par une grille de 7 cartes, chacune liée à sa propre page
de service, avec un vrai titre en texte. Cela corrige d'un coup le poids, l'accessibilité,
le SEO et la conversion.

## 10.4 Design system

**[VÉRIFIÉ]** Palette relevée : `#002859` (marine, 24 occurrences), `#193175`, `#D0E3FF`,
`#BDD8FF`, `#A0C7FF`, `#96A7BB`, `#6B829F`, `#2B4D75`. Typographie : Manrope.
Espacements très aérés (`my-48` = 12 rem).

**Le marine et la typographie sont justes** — sobres, crédibles, adaptés à la profession.
Le contraste est irréprochable (§6.10). Mais **6 des 8 couleurs de la palette n'existent que
dans la roue 360°** : le système de couleurs apparent n'en est pas un.

L'impression d'ensemble reste celle d'un **gabarit propre mais interchangeable** : rien
dans la mise en page, l'iconographie ou la photographie ne dit « TMF » plutôt que
« n'importe quel cabinet ».

## 10.5 [RECOMMANDATION] Propositions de valeur alternatives

L'actuelle — « Optimisez la santé financière de votre entreprise avec l'expertise d'un
cabinet d'expert comptable de confiance » — est signable par tous les concurrents.
Cinq directions plus spécifiques, à arbitrer selon votre positionnement réel :

1. « Votre comptable qui parle roumain, à Bruxelles. TVA, IPP, ISOC et création de société —
   expliqués dans votre langue. »
2. « Contabil român în Belgia. De la înființarea SRL până la declarația TVA, vă însoțim în
   limba dumneavoastră. »
3. « Facturation électronique obligatoire depuis 2026 : nous mettons votre entreprise en
   conformité en 15 jours. »
4. « 10 ans d'accompagnement d'indépendants et de PME en périphérie bruxelloise. Agréé ITAA. »
5. « Vous nous envoyez vos pièces, nous nous occupons du reste. Réponse sous 24 h ouvrées. »

Les propositions 1, 2 et 3 ont l'avantage d'être **vérifiables et différenciantes**.

## 10.6 Note sur les tests A/B

**[RECOMMANDATION]** Plusieurs analyses suggèrent un programme de tests A/B. **Je le
déconseille à ce stade :** le volume de trafic d'un cabinet comptable local ne permet
généralement pas d'atteindre la signification statistique en un temps raisonnable. Il vaut
mieux appliquer directement les corrections évidentes (CTA, téléphone, réassurance) et
mesurer l'évolution des demandes de contact d'un trimestre à l'autre.

---

# PARTIE 11 — LE SITE FRÈRE : UNE RÉFÉRENCE DÉJÀ DISPONIBLE

**[VÉRIFIÉ]** `tmfassist.be` est le site de **TMF Assist** (BE 0505.985.850), **société sœur
distincte** de TMF Compta SRL (BE 1027.440.826) — même groupe, même équipe d'origine, deux
personnes morales. Or ce site est **nettement mieux construit** :

| | `tmfcompta.be` | `tmfassist.be` |
|---|---|---|
| Blocs JSON-LD | **0** | **10** |
| Balises `og:` | **0** | **10** |
| Balises `twitter:` | **0** | **4** |
| `<main>` | **0** | 1 |
| `<nav>` | **0** | 1 |
| `<header>` | **0** | 1 |
| `<footer>` | **0** | 1 |
| `<section>` | **0** | 10 |
| `<article>` | **0** | 6 |
| `<h2>` | **0** | 9 |
| `canonical` | 0 | 0 *(manquant des deux côtés)* |

**Schémas JSON-LD déjà implémentés sur `tmfassist.be` :**

- `["AccountingService", "ProfessionalService", "Organization"]`
- `WebSite`
- `WebPage`
- `HowTo` — « Comment lancer son entreprise en Belgique 100 % en ligne »
- `FAQPage`

**C'est exactement ce qui manque à `tmfcompta.be`, et c'est déjà écrit dans le groupe.**
Il suffit de l'adapter — en remplaçant, bien sûr, l'identité par celle de TMF Compta SRL.

Sa proposition de valeur est aussi plus forte :

> `tmfassist.be` : « **Création de Société en Belgique — Lancez votre activité sans la
> paperasse.** »
> `tmfcompta.be` : « Comptable-Fiscaliste, Situé à Zaventem »

**[VÉRIFIÉ] Le maillage est à sens unique :**

- `tmfassist.be` → `tmfcompta.be` : **oui**, lien présent.
- `tmfcompta.be` → `tmfassist.be` : **non** — 0 occurrence de « tmfassist » ou « TMF Assist »
  sur les 10 pages.

Alors même que `tmfcompta.be` décrit « Conseil en création d'entreprise » parmi ses
7 services — service que `tmfassist.be` opère déjà et vend en ligne.

**[RECOMMANDATION]** Maintenant que ce sont deux sociétés distinctes, la répartition doit
être explicite pour le visiteur *et* pour Google : TMF Assist pour la constitution et
l'administratif, TMF Compta SRL pour la comptabilité et la fiscalité récurrentes. Un lien
réciproque, avec une phrase qui dit qui fait quoi, sert les deux référencements et évite
que les deux sites se cannibalisent sur « création de société ».

**[RECOMMANDATION]** Le chantier SEO le plus rentable du site n'est pas à inventer : c'est
un **copier-adapter** depuis le site frère.

---

# PARTIE 12 — PLAN D'ACTION

## Étape 0 — Trancher (avant tout le reste)

Décider du scénario A, B ou C de la **Partie 0**. Tout en dépend.

## Étape 1 — Une demi-journée : les corrections mécaniques

| Action | Où |
|---|---|
| `priority` sur l'image hero | composant du hero |
| `md:w[85%]` → `md:w-[85%]` | même composant |
| `/fr/services` → `/fr/general-accounting`, `/fr/projects` → `/fr/about` (+ RO) | pied de page |
| Supprimer le menu dupliqué du pied de page | pied de page |
| Corriger les 2 « pentru » | traductions FR |
| « Mentions legale » → « Mențiuni legale » | traductions RO |
| Copyright dynamique (`new Date().getFullYear()`) | pied de page |
| `alt="TMF Compta — Accueil"` sur le logo | en-tête |
| `title` sur l'iframe Maps | page contact |
| Corriger la négociation Brotli | reverse proxy |
| Supprimer `x-xss-protection`, ajouter `poweredByHeader: false` | config serveur / Next |

## Étape 2 — Une journée : conformité et indexation

- Mentions légales et politique de confidentialité conformes (identité BCE réelle, ITAA,
  traitements réels, droits, APD, durées) — **Annexe D**.
- Redirection 301 `www` → apex, et balises `canonical` sur les 10 pages.
- `hreflang` absolus, auto-référents, réciproques, avec `x-default` — **Annexe E**.
- SPF + DKIM + DMARC — **Annexe B**.
- JSON-LD `AccountingService` + `Organization` + `WebSite` — **Annexe A**.
- Open Graph et Twitter Cards.
- Page 404 personnalisée, localisée, avec navigation.

## Étape 3 — Une semaine : performance et accessibilité

- SVGO + externalisation de la roue (ou remplacement par une grille de cartes).
- Google Maps → image statique + lien.
- Génération statique + `next/link`.
- Repères sémantiques (`<main>`, `<nav>`, `<header>`, `<footer>`) + lien d'évitement.
- Styles `:focus-visible` sur tous les éléments interactifs.
- `autocomplete` et `required` sur le formulaire ; `<label>` sur le champ e-mail.
- `prefers-reduced-motion`.
- Sélecteur de langue en `<a href>`.
- Textes alternatifs réels (remplacer les 20 « Image descriptive »).

## Étape 4 — Un à trois mois : le fond

- **7 pages de service distinctes**, une par métier.
- Page **tarifs** (ou au minimum une fourchette et un mode de facturation).
- **FAQ** structurée en `FAQPage`.
- Éléments de réassurance : agrément ITAA, assurance RC, horaires, logiciels, photos de
  l'équipe.
- **Localiser** la version roumaine (et non plus seulement la traduire).
- Lien vers `tmfassist.be` et cohérence entre les deux marques.
- Contenu sur la **facturation électronique obligatoire** — sujet de forte demande, absent
  du site.
- Arbitrage sur une version **néerlandaise** (à reconsidérer au regard du déménagement à
  Ixelles, qui change la donne linguistique).
- Preuve sociale vivante (avis synchronisés plutôt qu'écrits en dur).

---

# PARTIE 13 — CE QUE J'AI CORRIGÉ

Par souci de transparence, voici les constats que j'ai d'abord formulés puis **infirmés**
en vérifiant. Ils illustrent la marge d'erreur d'un audit automatisé.

| Constat initial | Ce que la vérification a montré |
|---|---|
| « Le certificat TLS ne couvre pas `www` » | **Faux.** `www` possède **son propre** certificat Let's Encrypt valide. Le vrai problème est bien pire : `www` sert le site **entier** en 200, sans redirection ni canonical. |
| « La police ne contient pas les glyphes roumains » | **Faux.** Je n'avais inspecté que le fichier *préchargé* (sous-ensemble latin). Le sous-ensemble `latin-ext`, non préchargé, les contient bien. Le vrai problème est le *préchargement* non localisé (§5.8). |
| « FCP 2 724 ms / LCP 5 012 ms » | **Mesures gonflées** par l'environnement d'automatisation. Lighthouse en local donne FCP 1,2 s et LCP 3,8 s. Ce sont ces chiffres qui font foi. |
| « Débordement horizontal de 4 px sur mobile » | **Non reproduit** à la seconde mesure. `.slick-track` fait bien 3 773 px mais son parent a `overflow: hidden`. **À écarter.** |
| « Toutes les images ont un `alt` : point positif » | **Vrai formellement, faux sur le fond** : 20 `alt` valent « Image descriptive », 1 vaut « working », et le logo a un `alt` vide *à l'intérieur d'un lien* (§7.1). |
| « Les cibles tactiles sont trop petites » | **Largement infirmé.** L'exception d'espacement de WCAG 2.5.8 s'applique. Seules les puces du carrousel (20 × 20 px) restent discutables. |
| « La compression fonctionne, c'est un bon point » | **Infirmé.** Brotli est supporté mais **jamais servi** aux navigateurs réels, qui envoient `br, gzip` (§5.5). |
| « L'e-mail du prospect fuit dans l'URL et dans l'analytics » | **Infirmé par test direct.** Le formulaire a bien un `preventDefault` : aucune fuite en fonctionnement normal. *Reste un risque théorique si le JS ne s'hydrate pas : le `<form>` n'a ni `action` ni `method`, donc la soumission native serait un GET.* |
| « Michel Tamine, cogérant » | **Vrai, mais sur l'autre société.** Michel Tamine est l'**administrateur unique de TMF Compta SRL** (BE 1027.440.826). Marius Trufin gère TMF Assist (BE 0505.985.850). |
| **« L'entreprise a quitté Zaventem pour Ixelles »** | **FAUX — c'était mon erreur la plus lourde.** Je n'avais que l'ancien numéro d'entreprise, celui publié par le site. Avec le bon numéro (BE 1027.440.826, communiqué par le client), la BCE confirme que **TMF Compta SRL est bien à Sterrebeekstraat 154, 1930 Zaventem**. Le déménagement à Ixelles concerne TMF Assist. Partie 0 entièrement réécrite. |
| « L'adresse "154A" des mentions légales est la bonne, "154" de la page contact est incomplète » | **Inversé.** La BCE dit **154**, sans « A ». C'est la page contact qui est juste. |
| « 10 blocs restent invisibles après défilement » | **Artefact d'environnement.** L'onglet était en `visibilityState: hidden`, ce qui neutralise les `IntersectionObserver`. **En revanche, les 74 `opacity:0` dans le HTML servi sont bien réels.** |

**Une réserve de méthode générale :** l'onglet d'automatisation est passé en
`visibilityState: hidden` à plusieurs reprises. Tous les constats reposant sur une
*interaction* (ouverture du menu burger, défilement automatique du carrousel, révélation
des blocs animés) n'ont donc **pas pu être vérifiés de façon fiable** et sont signalés
comme tels. Les constats tirés du **HTML servi, du CSS compilé, des bundles JS, des en-têtes
HTTP, du DNS, de la BCE et de Lighthouse** ne sont pas affectés par cette réserve.

Par ailleurs, l'analyse multi-agents lancée pour cet audit a été **interrompue par une
limite de session** : 33 agents sur 95 ont abouti. Les 8 analyses de dimension sont
complètes, mais **la phase de vérification adversariale et l'analyse concurrentielle n'ont
pas pu être menées à terme**. Les constats de la présente synthèse sont ceux que j'ai pu
vérifier moi-même ; ceux que je n'ai pas pu reproduire sont soit écartés, soit signalés
`[HYPOTHÈSE]`.

**Sujets non couverts, faute d'avoir pu terminer :** analyse concurrentielle chiffrée des
cabinets de la périphérie bruxelloise, volumétrie de la communauté roumaine en Belgique,
état de la fiche Google Business, présence dans les annuaires belges (Pages d'Or / Gouden
Gids), et calendrier éditorial détaillé. Ces sujets sont signalés dans le plan d'action mais
non documentés ici.

---

# ANNEXES

## Annexe A — JSON-LD à ajouter

À placer dans le `<head>` de chaque page concernée. **Remplacer les valeurs entre
crochets** — en particulier l'adresse, qui doit refléter la décision prise en Partie 0.

### A.1 — `AccountingService` (page d'accueil)

```json
{
  "@context": "https://schema.org",
  "@type": ["AccountingService", "ProfessionalService", "LocalBusiness"],
  "@id": "https://tmfcompta.be/#organization",
  "name": "TMF Compta",
  "legalName": "TMF Compta SRL",
  "vatID": "BE1027440826",
  "taxID": "1027440826",
  "url": "https://tmfcompta.be/",
  "logo": "https://tmfcompta.be/logo.svg",
  "image": "https://tmfcompta.be/og-image.jpg",
  "email": "info@tmfcompta.be",
  "telephone": "+3227058099",
  "priceRange": "€€",
  "foundingDate": "2025-09-10",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sterrebeekstraat 154",
    "postalCode": "1930",
    "addressLocality": "Zaventem",
    "addressRegion": "Brabant flamand",
    "addressCountry": "BE"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "[lat]", "longitude": "[lon]" },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Friday"],
    "opens": "09:00", "closes": "17:00"
  }],
  "areaServed": [
    { "@type": "City", "name": "Bruxelles" },
    { "@type": "AdministrativeArea", "name": "Brabant flamand" },
    { "@type": "AdministrativeArea", "name": "Brabant wallon" }
  ],
  "availableLanguage": ["fr", "ro", "nl", "en"],
  "knowsLanguage": ["fr", "ro"],
  "sameAs": [
    "https://www.facebook.com/100089820520694",
    "https://www.tmfassist.be/"
  ],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Expert-comptable (fiscaliste) ITAA",
    "recognizedBy": {
      "@type": "Organization",
      "name": "ITAA — Institut des Conseillers fiscaux et des Experts-comptables",
      "url": "https://www.itaa.be/"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services comptables et fiscaux",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tenue de comptabilité" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Déclarations TVA" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Déclarations fiscales IPP et ISOC" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Comptes annuels" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Conseil fiscal et optimisation" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Conseil en création d'entreprise" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Assistance lors de contrôles fiscaux" }}
    ]
  }
}
```

> **Ne pas ajouter de bloc `aggregateRating` ou `review`** tant que les avis sont écrits en
> dur dans le code. Les règles de Google exigent que les avis balisés soient réellement
> collectés et affichés par le site. Un balisage d'avis figés expose à une action manuelle.

### A.2 — `WebSite` (page d'accueil)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://tmfcompta.be/#website",
  "url": "https://tmfcompta.be/",
  "name": "TMF Compta",
  "publisher": { "@id": "https://tmfcompta.be/#organization" },
  "inLanguage": ["fr-BE", "ro"]
}
```

### A.3 — `BreadcrumbList` (pages internes)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://tmfcompta.be/fr" },
    { "@type": "ListItem", "position": 2, "name": "Comptabilité générale", "item": "https://tmfcompta.be/fr/general-accounting" }
  ]
}
```

### A.4 — `FAQPage` (à créer avec la page FAQ)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Combien coûte un comptable pour un indépendant en Belgique ?",
    "acceptedAnswer": { "@type": "Answer", "text": "[réponse réelle et spécifique]" }
  }]
}
```

## Annexe B — SPF, DKIM et DMARC

À publier dans la zone DNS chez IONOS.

### B.1 — SPF (un seul enregistrement, jamais deux)

```dns
tmfcompta.be.  TXT  "v=spf1 include:_spf.google.com ~all"
```

*`~all` (softfail) pendant la phase d'observation. Passer à `-all` (hardfail) une fois
certain qu'aucun autre service n'envoie d'e-mail au nom du domaine — facturation,
newsletter, CRM, formulaire du site.*

### B.2 — DKIM

À générer depuis la **console d'administration Google Workspace** :
*Applications → Google Workspace → Gmail → Authentifier l'e-mail*.
Google fournit un sélecteur (`google` par défaut) et une clé publique. Publier :

```dns
google._domainkey.tmfcompta.be.  TXT  "v=DKIM1; k=rsa; p=[clé fournie par Google]"
```

Puis **activer l'authentification** dans la console. Choisir une clé **2048 bits**.

### B.3 — DMARC (déploiement en trois temps)

**Phase 1 — observation (2 à 4 semaines).** Ne bloque rien, mais fait remonter les rapports :

```dns
_dmarc.tmfcompta.be.  TXT  "v=DMARC1; p=none; rua=mailto:dmarc@tmfcompta.be; ruf=mailto:dmarc@tmfcompta.be; fo=1; adkim=r; aspf=r; pct=100"
```

**Phase 2 — mise en quarantaine progressive**, une fois les rapports propres :

```dns
_dmarc.tmfcompta.be.  TXT  "v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc@tmfcompta.be; adkim=s; aspf=s"
```

*Augmenter `pct` par paliers : 25 → 50 → 100.*

**Phase 3 — rejet :**

```dns
_dmarc.tmfcompta.be.  TXT  "v=DMARC1; p=reject; rua=mailto:dmarc@tmfcompta.be; adkim=s; aspf=s"
```

### B.4 — CAA (bonus, empêche toute autre AC d'émettre)

```dns
tmfcompta.be.  CAA  0 issue "letsencrypt.org"
tmfcompta.be.  CAA  0 iodef "mailto:info@tmfcompta.be"
```

### B.5 — Vérification

```bash
dig +short TXT tmfcompta.be | grep spf1
dig +short TXT _dmarc.tmfcompta.be
dig +short TXT google._domainkey.tmfcompta.be
dig +short CAA tmfcompta.be
```

## Annexe C — Content-Security-Policy

Dans `next.config.js`. **Déployer d'abord en `Report-Only`** pendant une à deux semaines
pour repérer les blocages avant de passer en mode bloquant.

```js
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://umami.kago-group.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.gstatic.com https://*.googleapis.com",
  "font-src 'self'",
  "connect-src 'self' https://umami.kago-group.com",
  "frame-src https://www.google.com",   // à supprimer si Maps est retiré (§9.4)
  "form-action 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ')

module.exports = {
  poweredByHeader: false,
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        // Phase 1 : observation. Passer ensuite à 'Content-Security-Policy'.
        { key: 'Content-Security-Policy-Report-Only', value: csp },
        { key: 'Cross-Origin-Opener-Policy',   value: 'same-origin' },
        { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
        { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
      ],
    }]
  },
}
```

> `'unsafe-inline'` sur `script-src` est nécessaire tant que Next.js injecte sa charge RSC
> en ligne. Une CSP à base de `nonce` + `'strict-dynamic'` est possible, mais impose de
> passer par un middleware et de renoncer à la génération statique — arbitrage à faire avec
> le prestataire. **Supprimer la ligne `frame-src` si la carte Google est retirée.**

## Annexe D — Trame des mentions légales et de la politique de confidentialité

Structure à faire valider par un conseil belge. **Les valeurs entre crochets dépendent de la
décision prise en Partie 0.**

**Mentions légales**
1. Identité — dénomination **TMF Compta SRL**, forme juridique **société à responsabilité
   limitée**, siège **Sterrebeekstraat 154, 1930 Zaventem**, n° d'entreprise et n° de TVA
   **`BE 1027.440.826`**, e-mail, téléphone, et le nom du responsable réel (administrateur :
   Michel Tamine). ⚠️ Ne plus publier `BE0505985850` : ce numéro identifie TMF Assist.
2. **Profession réglementée** — titre exact, numéro d'agrément ITAA, autorité de contrôle
   (Institut des Conseillers fiscaux et Experts-comptables), lien vers `search.itaa.be`,
   référence aux règles déontologiques, assurance RC professionnelle (assureur et n° de police).
3. Hébergement — **OVH** (nom et adresse de l'hébergeur réel).
4. Propriété intellectuelle *(le texte actuel est correct, à conserver)*.
5. Liens hypertextes *(idem)*.
6. Droit applicable et juridiction *(idem)*.
7. **Résolution extrajudiciaire des litiges** — sans lien vers la plateforme ODR, fermée
   depuis le 20 juillet 2025.
8. **Date de dernière mise à jour.**

**Politique de confidentialité** (document distinct, lié depuis les deux formulaires)
1. Responsable du traitement + point de contact vie privée.
2. Tableau des traitements : formulaire de contact, formulaire e-mail, mesure d'audience,
   carte (si conservée) — avec pour chacun : **finalité, base légale, catégories de données,
   durée de conservation**.
3. Destinataires et sous-traitants : **Kago Group** (hébergement et analytics), **Google**
   (Maps et messagerie), **OVH** (hébergement).
4. Transferts hors UE, le cas échéant, et garanties.
5. Durées de conservation — **en tenant compte de la loi anti-blanchiment du 18/09/2017**
   pour les prospects devenus clients.
6. Droits : accès, rectification, effacement, limitation, opposition, portabilité — et
   modalités d'exercice.
7. **Droit de réclamation auprès de l'Autorité de protection des données**,
   Rue de la Presse 35, 1000 Bruxelles — `contact@apd-gba.be`.
8. Cookies et traceurs : décrire la réalité (aucun cookie propriétaire ; Umami sans cookie ;
   et, si elle est conservée, la carte Google).
9. Date de mise à jour.

## Annexe E — hreflang et canonical corrects

Avec l'API Metadata de Next.js :

```js
// app/[locale]/layout.tsx ou par page
export async function generateMetadata({ params }) {
  const { locale } = await params
  const path = ''  // ex. '/contact' — le chemin de la page courante
  return {
    metadataBase: new URL('https://tmfcompta.be'),
    alternates: {
      canonical: `https://tmfcompta.be/${locale}${path}`,
      languages: {
        'fr-BE':     `https://tmfcompta.be/fr${path}`,
        'ro':        `https://tmfcompta.be/ro${path}`,
        'x-default': `https://tmfcompta.be/fr${path}`,
      },
    },
  }
}
```

HTML attendu sur `/ro/contact` :

```html
<link rel="canonical"  href="https://tmfcompta.be/ro/contact"/>
<link rel="alternate" hreflang="fr-BE"     href="https://tmfcompta.be/fr/contact"/>
<link rel="alternate" hreflang="ro"        href="https://tmfcompta.be/ro/contact"/>
<link rel="alternate" hreflang="x-default" href="https://tmfcompta.be/fr/contact"/>
```

**Redirection `www` → apex, en 301 permanent**, à placer au niveau du reverse proxy (et non
dans le middleware Next, pour éviter un saut supplémentaire).

## Annexe F — Commandes de vérification après correction

```bash
# 1. www doit rediriger en 301 vers l'apex
curl -sI https://www.tmfcompta.be/fr | grep -iE '^HTTP|^location'

# 2. Une canonical sur chaque page
for p in fr fr/about fr/contact fr/general-accounting fr/legal; do
  echo -n "$p : "; curl -s "https://tmfcompta.be/$p" | grep -c 'rel="canonical"'
done

# 3. hreflang absolus
curl -s https://tmfcompta.be/ro/contact | grep -o '<link rel="alternate"[^>]*>'

# 4. Plus aucun lien 404 dans le pied de page
for u in /fr/services /fr/projects /ro/services /ro/projects; do
  curl -s -o /dev/null -w "%{http_code} $u\n" "https://tmfcompta.be$u"
done

# 5. L'image LCP ne doit plus être en lazy
curl -s https://tmfcompta.be/fr | grep -o '<img[^>]*home-illustration[^>]*>' | grep -c 'loading="lazy"'

# 6. Brotli doit être servi quand les deux sont proposés
curl -sI -H 'Accept-Encoding: br, gzip' https://tmfcompta.be/fr | grep -i content-encoding

# 7. Données structurées présentes
curl -s https://tmfcompta.be/fr | grep -c 'application/ld+json'

# 8. Authentification e-mail
dig +short TXT tmfcompta.be | grep spf1
dig +short TXT _dmarc.tmfcompta.be

# 9. Poids du HTML (doit chuter fortement après SVGO)
curl -s https://tmfcompta.be/fr | wc -c

# 10. Lighthouse mobile
npx lighthouse@12 https://tmfcompta.be/fr --form-factor=mobile --screenEmulation.mobile \
  --only-categories=performance,accessibility,seo,best-practices --view
```

---

## Sources

- [BCE / KBO — **TMF Compta SRL, 1027.440.826**](https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?lang=fr&ondernemingsnummer=1027440826) — l'entité qui exploite le cabinet : siège, forme, administrateur, autorisation ITAA
- [BCE / KBO — **TMF Assist, 0505.985.850**](https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?lang=fr&ondernemingsnummer=0505985850) — la société sœur, dont le site publie le numéro par erreur
- [Registre public ITAA](https://search.itaa.be/fr-fr) — vérification des agréments
- [ITAA — Institut des Conseillers fiscaux et des Experts-comptables](https://www.itaa.be/fr/)
- [Companyweb — TMF Compta / 0505985850](https://www.companyweb.be/en/0505985850/tmf-compta) — historique et agrément IPCF
- [Staatsbladmonitor — publications au Moniteur belge](https://www.staatsbladmonitor.be/bedrijfsfiche.html?ondernemingsnummer=0505985850)
- [TMF Assist](https://www.tmfassist.be/) — site frère, référence interne d'implémentation
- Autorité de protection des données (APD/GBA), Rue de la Presse 35, 1000 Bruxelles

**Outils de mesure :** Lighthouse 12.8.2 (local, Chrome headless), `curl`, `dig`, `openssl`,
`fontTools`, inspection DOM en navigateur. *(L'API PageSpeed Insights était en quota dépassé
au moment de l'audit — aucune donnée terrain CrUX n'a pu être obtenue.)*

---

*Audit réalisé les 31 août et 1er septembre 2026. Les mesures reflètent l'état du site à
cette date.*

---

# PARTIE 14 — VOLET EXTERNE : MARCHÉ, ANNUAIRES ET RÉGLEMENTAIRE

*Ajoutée le 1er septembre 2026, après reprise de l'analyse externe interrompue.*

> **Avertissement de méthode, à lire avant cette partie.**
> Cette recherche a été lancée **avant** que le bon numéro d'entreprise (BE 1027.440.826)
> ne soit connu. Les agents ont donc travaillé sur la prémisse — fausse — d'un déménagement
> à Ixelles. J'ai **réinterprété** chaque conclusion à la lumière de la réalité :
> TMF Compta SRL est bien à **Zaventem**. Les constats propres à la localisation ont été
> retournés ; ceux qui n'en dépendent pas (réglementaire, ITAA, niche roumaine, conformité)
> restent valables. Chaque affirmation a en outre été passée à un agent de contrôle chargé
> d'ouvrir les URL citées ; les faits que ce contrôle a infirmés sont **écartés** ou signalés.

## 14.1 Le paysage concurrentiel réel

**[VÉRIFIÉ]** Sur 12 cabinets testés, 10 sites répondent réellement.

### Le concurrent le plus direct est à Zaventem

| Cabinet | Adresse | Ce qu'il fait mieux |
|---|---|---|
| **Isler & Partners** — ITAA 50.525.680 | Excelsiorlaan 25, **1930 Zaventem** | Affiche un **portail client (Winauditor)** et son logiciel (**WinBooks**) |

C'est le voisin direct, et il affiche deux signaux de digitalisation que `tmfcompta.be`
n'affiche nulle part.

### Les concurrents sur la niche roumaine — aucun n'est en Brabant flamand

| Cabinet | Commune | Langues | Tarifs | ITAA |
|---|---|---|---|---|
| **CNCompta** | Uccle (1180) | RO / FR / EN | **Oui** (60 € à 600 €, dès 250 €/trim.) | 13.234.436 |
| **Fisco Group** | Molenbeek + Roeselare | RO / FR / NL / EN | non | 2 numéros cités |
| **Contbel** | Beersel (1651) | RO | partiel (dès 80 €) | non identifié |

**[VÉRIFIÉ]** **Aucun des trois n'est implanté à Zaventem ni en Brabant flamand** — ils sont
à Uccle, Molenbeek et Beersel, c'est-à-dire au sud et à l'ouest de Bruxelles.

**Conclusion, et elle est importante :** la niche « comptable roumanophone » est **occupée à
Bruxelles-Sud, et vacante à l'est et en Brabant flamand**. TMF Compta, à Zaventem, est le
seul acteur bilingue FR/RO positionné sur cette zone. C'est l'actif concurrentiel le plus
défendable du cabinet — et le site n'en tire rien.

Le meilleur du lot, **CNCompta**, est trilingue, publie ses tarifs et affiche son numéro
ITAA. C'est la barre à dépasser. **Contbel**, à l'inverse, a un site amateur sans mention
ITAA : la barre basse existe aussi.

### Ce qui relativise la direction « afficher ses prix »

**[VÉRIFIÉ]** Sur les 10 cabinets examinés en détail, **seuls 2 publient une grille tarifaire
complète** (myfid, CNCompta) et 1 un tarif partiel (Contbel). **Ne pas afficher ses prix est
donc la norme du marché belge traditionnel** (70 à 80 %).

Cela **nuance la direction 3** de la refonte : l'affichage des prix est un différenciateur
réel, mais ce n'est pas un rattrapage — c'est un pari. Les acteurs qui le font sont les
cabinets « digital-first » : **Billy** (Bruxelles, 100 % en ligne) affiche 55 €/mois pour un
indépendant et 165 €/mois pour une SRL, avec prise de rendez-vous et portail client.

### Outils et logiciels

**[VÉRIFIÉ]** Seuls 2 des 10 cabinets nomment publiquement leur logiciel (Isler : WinBooks /
Winauditor ; Fiscalis : Odoo). Aucun ne mentionne Yuki, Silverfin, Dexxter, Billit, CodaBox
ou Octopus. L'absence de mention chez TMF s'inscrit donc dans une norme sectorielle discrète
— **mais depuis l'obligation Peppol, ne nommer aucun outil devient un déficit de crédibilité**,
et le voisin de Zaventem, lui, en nomme deux.

## 14.2 La facturation électronique Peppol — le sujet d'acquisition le plus fort, totalement absent du site

**[VÉRIFIÉ — sources officielles]**

| Élément | Valeur |
|---|---|
| Obligation B2B via Peppol | **depuis le 1er janvier 2026** |
| Périmètre | ~**1,2 million** de numéros de TVA belges |
| Exemptés | franchise art. 56 (jusqu'en 2028), assujettis art. 44, opérations B2C |
| Sanctions (AR du 08/07/2025) | **1 500 € / 3 000 € / 5 000 €** par infraction répétée |
| Incitants PME | **déduction majorée à 120 %** + déduction numérique 20 % |

> *Réserve du contrôle des sources : une « tolérance administrative jusqu'à fin mars 2026 »
> a été avancée mais **n'a pas pu être confirmée** sur la source citée. À ne pas reprendre
> telle quelle.*

**Le site ne dit pas un mot de Peppol.** C'est le sujet qui, en 2026, pousse le plus
d'indépendants belges à chercher un comptable — et pour lequel TMF est légitime à répondre.

Autres échéances exploitables identifiées : nouvelle chaîne TVA (délais de dépôt),
bascule **eBox Enterprise** (fermeture de l'ancienne eBox au 31 mars 2027), amendes de dépôt
tardif des comptes annuels à la BNB, confirmation annuelle du **registre UBO**.

## 14.3 Présence en ligne et cohérence NAP

**[VÉRIFIÉ]** — le contrôle des sources a jugé cet axe **fiable**.

| Source | Ce qu'elle affiche | Verdict |
|---|---|---|
| **Google Business** | Fiche active (`kgmid=/g/11c44qw0qg`, via `g.co/kgs/H12xX9a`) | Existe. Note et volume d'avis **non vérifiables à distance** — à contrôler depuis votre compte |
| **bottin.be** | Sterrebeekstraat 154, 1930 Zaventem — note 4,8/5 | ✅ **correct** |
| **pagesdor.be** | 20 à 24 experts-comptables listés à Zaventem | TMF y est-il ? à vérifier |
| **LinkedIn** | Page « TMF Compta », **13 abonnés**, Zaventem | Actif sous-exploité |
| **welipro.com** | **Rue Colonel Bourg 105, 1030 Schaerbeek** | ❌ **troisième adresse, erronée** |
| **Registre ITAA** | Fiche n° **50.767.170** = « TMF Assist », SNC, Ixelles, **e-mail `info@tmfcompta.be`** | ⚠️ voir ci-dessous |

**Deux problèmes de cohérence, tous deux liés à la confusion entre les deux sociétés :**

1. **Une troisième adresse circule** (Schaerbeek), qui ne correspond ni à Zaventem ni à
   Ixelles. À faire corriger.
2. **La fiche ITAA de TMF Assist porte l'adresse e-mail `info@tmfcompta.be`.** Les deux
   entités partagent donc une même adresse de contact dans un registre professionnel public.
   Avec la création de TMF Compta SRL, chaque société devrait avoir sa propre adresse.

> **Note :** contrairement à ce que laissait entendre la première version de cette analyse,
> **les annuaires qui affichent « Zaventem » ne sont pas périmés — ils ont raison.** Le
> travail de correction NAP ne consiste donc pas à propager une nouvelle adresse, mais à
> **démêler les deux sociétés** : quelle fiche appartient à TMF Compta SRL (Zaventem,
> BE 1027.440.826) et laquelle à TMF Assist (Ixelles, BE 0505.985.850).

## 14.4 La niche roumaine

**[VÉRIFIÉ]** La communauté roumaine constitue un marché substantiel en Région
bruxelloise — c'est l'une des principales nationalités étrangères, et sa population a
approximativement doublé en dix ans.

> ⚠️ **Réserve importante.** Les chiffres précis initialement avancés (46 594 résidents au
> 1/1/2024, 2ᵉ nationalité derrière les Français) ont été **infirmés par le contrôle des
> sources** : l'article cité ne les contient pas. **Ne pas les reprendre.** L'ordre de
> grandeur et la tendance sont crédibles, mais **il faut aller les chercher directement chez
> Statbel ou l'IBSA** avant de les publier.

Secteurs de concentration : construction, transport, nettoyage, HORECA — tous à forte
intensité d'obligations (retenue, responsabilité solidaire, Checkinatwork, détachement A1,
TVA intracommunautaire).

**Ce que ça donne, croisé avec §14.1 :** un marché réel, des besoins techniques précis, trois
concurrents dont un seul est bon — et **aucun d'eux dans votre zone**. C'est le meilleur
argument en faveur de la **direction 2** de la refonte.

## 14.5 Vérifications juridiques — résultats

**[VÉRIFIÉ]** Six affirmations de l'audit soumises à contrôle documentaire :

| # | Affirmation | Verdict |
|---|---|---|
| A | La plateforme ODR européenne a fermé le **20 juillet 2025** | ✅ **Confirmé** — ne pas y renvoyer |
| B | L'EAA ne s'applique vraisemblablement pas à ce site | ✅ Confirmé, **avec une nuance majeure** ↓ |
| C | Loi anti-blanchiment : conservation **10 ans** (art. 60, loi du 18/09/2017) | ✅ **Confirmé**, et les professionnels ITAA sont bien entités assujetties |
| D | Umami identifie les sessions par un **hachage IP + user-agent** | ✅ **Confirmé** par la documentation officielle d'Umami |
| E | Position de l'APD sur les analytics sans cookie | ⚠️ voir ci-dessous |
| F | Sanctions européennes sur les iframes Google | ⚠️ voir ci-dessous |

**B — la nuance qui compte.** L'exemption « micro-entreprise » de l'EAA pour les prestataires
de services **est temporaire** : elle expire le **28 juin 2030** (les contrats en cours
pouvant se poursuivre jusqu'au 28 juin 2035). Ce n'est donc pas une dispense définitive, mais
un délai. L'EAA est applicable depuis le 28/06/2025 et partiellement transposé en droit belge.
**[RECOMMANDATION]** Traiter l'accessibilité comme une échéance à horizon 2030, pas comme une
question réglée.

**E — le point le plus sensible du dossier RGPD.** L'APD belge affirme dans sa FAQ officielle
qu'**il n'existe aucune exemption de consentement** pour les cookies analytiques — contrairement
à la CNIL française, qui a construit une doctrine d'exemption sous conditions. **En revanche**,
aucune décision ou prise de position de l'APD visant nommément un outil *sans cookie* (type
Umami) n'a été trouvée. La question reste donc **ouverte** pour Umami. À arbitrer avec un
conseil.

**F — à formuler avec prudence.** Aucune amende d'une autorité de protection des données
visant nommément une iframe Google Maps n'a été trouvée. Le précédent le plus documenté est
une décision **civile** allemande (tribunal régional de Munich I), qui portait sur **Google
Fonts**. La doctrine dominante des autorités (CNIL, BayLDA, Garante) va dans le sens d'un
consentement préalable, mais **l'audit ne doit pas laisser entendre qu'une sanction
spécifique existe**. La recommandation de §9.4 (remplacer la carte par une image statique)
reste la bonne — pour des raisons de performance autant que de conformité.

## 14.6 Arbitrage linguistique — conclusion INVERSÉE

L'analyse automatisée concluait « pas de néerlandais », en s'appuyant sur le fait que le
siège était à Ixelles, en région bruxelloise francophone de fait, et que les concurrents
locaux opèrent en français.

**Cette conclusion tombe avec sa prémisse.** Les faits réels :

- TMF Compta SRL a son siège à **Zaventem, Région flamande** ;
- sa dénomination est enregistrée à la BCE **en néerlandais** ;
- son concurrent le plus direct, Isler & Partners, est **à Zaventem** ;
- l'administration communale, les fournisseurs et une partie du tissu économique local
  fonctionnent en néerlandais.

**[RECOMMANDATION] Le néerlandais redevient un vrai sujet.** Non pas une traduction intégrale
en première intention, mais au minimum :

1. une **page d'accueil et une page contact en NL** — un cabinet flamand dont le site n'existe
   qu'en français et en roumain envoie un signal contradictoire à sa propre commune ;
2. la **fiche Google Business en NL** en plus du FR ;
3. l'arbitrage sur le reste du site après six mois de données réelles (Search Console,
   demandes entrantes).

*Précision : aucune obligation légale n'impose à une entreprise privée d'avoir un site
multilingue. C'est un choix commercial — mais à Zaventem, il penche nettement.*

**Anglais :** une page vitrine unique reste défendable (aéroport de Bruxelles à Zaventem,
sièges internationaux, expatriés), sans traduction intégrale. À placer après le NL.

**Ordre de priorité : corriger FR + RO → NL (accueil + contact) → EN (une page).**

## 14.7 Architecture d'URLs proposée

Adaptée à la localisation réelle. Les slugs sont en français et en roumain — corrigeant au
passage les slugs anglais actuels (§4.8).

| Intitulé | FR | RO |
|---|---|---|
| Tenue de comptabilité | `/fr/services/tenue-comptabilite` | `/ro/servicii/contabilitate` |
| TVA et facturation Peppol | `/fr/services/tva-facturation-electronique-peppol` | `/ro/servicii/tva-facturare-electronica-peppol` |
| Conseil fiscal (IPP, ISOC) | `/fr/services/conseil-fiscal` | `/ro/servicii/consultanta-fiscala` |
| Constitution de société | `/fr/services/constitution-societe` | `/ro/servicii/infiintare-firma-srl` |
| Secrétariat social et paie | `/fr/services/secretariat-social-paie` | `/ro/servicii/secretariat-social-salarizare` |
| Comptes annuels et dépôt BNB | `/fr/services/comptes-annuels-bnb` | `/ro/servicii/conturi-anuale-bnb` |
| Contrôles fiscaux | `/fr/services/controle-fiscal` | `/ro/servicii/control-fiscal` |
| **Page locale** | `/fr/comptable-zaventem` | `/ro/contabil-zaventem` |
| **Page niche** | `/fr/comptable-roumanophone-belgique` | `/ro/contabil-roman-belgia` |
| Tarifs *(si direction 3)* | `/fr/tarifs` | `/ro/tarife` |
| FAQ | `/fr/faq` | `/ro/intrebari-frecvente` |
| Actualités | `/fr/actualites` | `/ro/noutati` |
| Mentions légales | `/fr/mentions-legales` | `/ro/informatii-legale` |
| Confidentialité | `/fr/confidentialite` | `/ro/confidentialitate` |

*(Ajouter `/nl/…` pour l'accueil et le contact — voir §14.6.)*

## 14.8 Calendrier éditorial 12 mois

Calé sur le calendrier fiscal belge réel. **La ligne « TMF devient TMF Assist » proposée par
l'analyse automatisée a été supprimée : elle reposait sur la prémisse erronée.**

| Mois | Langue | Sujet |
|---|---|---|
| Sept. 2026 | FR | Biztax : dernière ligne droite avant le 30 septembre pour l'impôt des sociétés |
| Oct. 2026 | FR | Le délai IPP du 16 octobre pour les revenus d'indépendant |
| Oct. 2026 | **RO** | Termen 25 octombrie: depunerea declarației de TVA pentru trimestrul 3 |
| Nov. 2026 | FR | **Peppol : bilan après 10 mois d'obligation et erreurs les plus fréquentes** |
| Nov. 2026 | FR | Versements anticipés du 4ᵉ trimestre : préparer avant le 20 décembre |
| Déc. 2026 | FR | Versements anticipés : la date limite du 20 décembre pour éviter la majoration ISOC |
| Déc. 2026 | **RO** | Bilanțul fiscal de sfârșit de an: ce trebuie verificat înainte de 31 decembrie |
| Janv. 2027 | FR | TVA du 4ᵉ trimestre : nouveau délai du 25 janvier et la nouvelle chaîne TVA |
| Janv. 2027 | FR | Comptes annuels à la BNB : calendrier et nouvelles amendes |
| Févr. 2027 | FR | **eBox Enterprise : dernier mois pour basculer avant le 31 mars** |
| Févr. 2027 | **RO** | Ghid Peppol pentru firmele românești din Belgia |
| Mars 2027 | FR | Ancienne eBox fermée : que faire si vous n'avez pas basculé |
| Mars 2027 | FR | Registre UBO : avez-vous confirmé vos données cette année ? |
| Avr. 2027 | FR | TVA du 1ᵉʳ trimestre : le délai du 25 avril |
| Mai 2027 | FR | Comptes annuels : le compte à rebours vers le 31 juillet |
| Mai 2027 | **RO** | Depunerea conturilor anuale la BNB |
| Juin 2027 | FR | IPP 2027 : ce qui change pour les indépendants et dirigeants |
| Juil. 2027 | FR | Comptes annuels BNB : dernier jour le 31 juillet |
| Août 2027 | FR | Biztax 2027 : ouvrez votre dossier maintenant |
| Août 2027 | **RO** | Facturarea electronică Peppol, doi ani mai târziu |

**[RECOMMANDATION]** Cinq sujets prioritaires en roumain, dans l'ordre :

1. *Ghid complet: cum deschizi o firmă (SRL) în Belgia ca român, pas cu pas*
2. *Facturarea electronică Peppol obligatorie: ce trebuie să știe fiecare antreprenor român din Belgia*
3. *Independent în Belgia: ce regim fiscal aleg românii care lucrează pe cont propriu*
4. *Termenele fiscale din Belgia explicate simplu: TVA, IPP, ISOC și conturile anuale la BNB*
5. *Construcții în Belgia: reținerea, răspunderea solidară și Checkinatwork*

## 14.9 Plan d'acquisition locale — réordonné

| # | Action | Effort |
|---|---|---|
| 1 | **Corriger les mentions légales** : dénomination, forme, n° BE 1027.440.826, responsable | heures |
| 2 | **Auditer la fiche Google Business** depuis votre compte : nom, adresse Zaventem, catégorie « Expert-comptable », horaires, photos, note et volume d'avis | heures |
| 3 | **Afficher le numéro ITAA** sur le site (autorisation BCE du 26/03/2026) | heures |
| 4 | **Démêler les deux sociétés** dans les annuaires : quelle fiche est TMF Compta SRL, laquelle est TMF Assist. Corriger l'adresse fantôme de Schaerbeek sur welipro.com | jours |
| 5 | **Ajouter le JSON-LD** `AccountingService` — myfid et Equitis en ont déjà, vous non | heures |
| 6 | **Séparer les adresses e-mail** des deux entités, y compris sur la fiche ITAA | heures |
| 7 | **Publier la page Peppol** — le sujet d'acquisition le plus fort de l'année | jours |
| 8 | **Réveiller LinkedIn** (13 abonnés) et aligner la page Facebook | jours |
| 9 | **Campagne d'avis Google continue** — demande systématique en fin de mission | continu |
| 10 | **Suivi trimestriel** des annuaires et registres (companyweb, northdata, pagesdor, bottin, ITAA) | récurrent |

## 14.10 Ce que cette partie change pour les trois directions de refonte

| Direction | Effet du volet externe |
|---|---|
| **1 · Rassurer** | **Renforcée.** L'autorisation ITAA est une donnée publique vérifiable, et le voisin de Zaventem affiche déjà portail et logiciel. |
| **2 · Parler votre langue** | **Nettement renforcée.** Aucun concurrent roumanophone en Brabant flamand. C'est la niche la plus défendable. |
| **3 · Afficher ses prix** | **Nuancée.** 70 à 80 % du marché belge n'affiche pas ses prix. C'est un pari différenciant, pas un rattrapage. |
| **Toutes** | **Le néerlandais revient dans l'équation** (§14.6), et **Peppol devient le sujet de contenu n°1**. |

