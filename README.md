# MVPulse

Site vitrine pour le coaching sportif [@_mvpulse_](https://www.instagram.com/_mvpulse_/).

Site statique (HTML / CSS / JS, aucune dépendance ni build) : il se déploie tel quel sur Vercel, Netlify ou GitHub Pages.

## Structure

```
index.html            # Toutes les sections de la page
assets/css/style.css  # Styles (charte noir & doré et polices dans :root en haut du fichier)
assets/js/main.js     # Menu mobile, animations, formulaire
assets/img/           # Logo (icône, version horizontale), favicon, image de partage, photos
```

## Voir le site en local

```bash
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## À personnaliser

- [ ] Photo du coach : déposer `assets/img/coach.jpg` et remplacer le bloc `photo-placeholder` dans `index.html`
- [ ] Diplôme dans le badge (`BPJEPS AF` par défaut)
- [ ] Chiffres clés du hero (`data-count`)
- [ ] Formules et tarifs (à reprendre du post Instagram des tarifs)
- [ ] Vrais témoignages clients (avec leur accord)
- [ ] Email de contact (`index.html` + `CONTACT_EMAIL` dans `assets/js/main.js`)
- [ ] Ville / zone d'intervention
- [ ] Page mentions légales (obligatoire en France)

## Prochaines étapes

- Déploiement sur Vercel (import du repo GitHub, aucun réglage nécessaire)
- Nom de domaine (ex. `mvpulse.fr`)
- Formulaire avec envoi réel (Formspree, ou fonction Vercel + Resend) au lieu du `mailto:`
- Prise de rendez-vous en ligne (Calendly / Cal.com)
