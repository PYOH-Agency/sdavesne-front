# Images du Site

## Avatar Sophie Davesne

### Fichier actuel
- `sophie-davesne-avatar.svg` : Avatar temporaire avec design moderne

### Pour ajouter la vraie photo
1. **Remplacez** `sophie-davesne-avatar.svg` par la vraie photo
2. **Format recommandé** : JPG ou PNG
3. **Taille recommandée** : 96x96px ou 192x192px
4. **Nom du fichier** : `sophie-davesne-avatar.jpg` (ou .png)

### Instructions
```bash
# Supprimer l'avatar temporaire
rm public/images/sophie-davesne-avatar.svg

# Ajouter la vraie photo
cp /chemin/vers/photo-sophie.jpg public/images/sophie-davesne-avatar.jpg
```

### Mise à jour du composant
Si vous changez le nom du fichier, mettez à jour `pages/index.vue` :
```vue
<AppHeader
  avatar="/images/sophie-davesne-avatar.jpg"  <!-- Nouveau nom -->
  ...
/>
```

### Qualité recommandée
- **Résolution** : 96x96px minimum
- **Format** : JPG pour photos, PNG pour transparence
- **Poids** : < 100KB pour de bonnes performances
- **Style** : Photo professionnelle, sourire chaleureux
