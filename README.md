# Namibia Overland 2026

Site de diário de viagem — Next.js + Netlify + Cloudinary.

## Setup inicial (fazer antes de partir)

### 1. Instalar dependências
```bash
npm install
```

### 2. Testar localmente
```bash
npm run dev
# Abre http://localhost:3000
```

### 3. Criar repositório GitHub
1. Vai a github.com → New repository → `namibia-overland-2026`
2. Push do código:
```bash
git init
git add .
git commit -m "Início do projeto"
git remote add origin https://github.com/SEU_UTILIZADOR/namibia-overland-2026.git
git push -u origin main
```

### 4. Ligar ao Netlify
1. Vai a netlify.com → Add new site → Import from Git
2. Escolhe o repositório
3. Build command: `npm run build`
4. Publish directory: `out`
5. Deploy!

### 5. Criar conta Cloudinary
1. cloudinary.com → Criar conta gratuita
2. Guardar o Cloud Name (ex: `namibia2026`)

---

## Estrutura de pastas de imagens

```
public/
  images/
    hero.jpg              ← Foto principal da homepage
    dia-01/
      capa.jpg            ← Foto de capa do dia
    dia-02/
      capa.jpg
    ...
    dia-24/
      capa.jpg
```

As fotos da galeria vão via Cloudinary (URL externo).

---

## Workflow diário (durante a viagem)

### Passo 1 — Fazer upload das fotos (Cloudinary)
1. Abre cloudinary.com no telemóvel
2. Upload das 10-15 melhores fotos
3. Copia os URLs

### Passo 2 — Editar o ficheiro do dia (GitHub mobile)
1. Abre github.com no telemóvel
2. Navega até `src/data/dias.js`
3. Não precisas de editar — os dados do percurso já estão todos lá

### Passo 3 — Adicionar o texto do dia
Por agora o texto é placeholder. Para adicionar conteúdo real,
edita `src/pages/diario/[dia].js` na secção "O que vivemos"
ou converte para Markdown (fase 2).

### Passo 4 — Commit
Qualquer alteração no GitHub aciona o deploy automático no Netlify.
O site fica online em 2-3 minutos.

---

## Dados da viagem

Todos os pontos GPS dos 24 dias estão em:
```
src/data/dias.js
```

Extraídos dos ficheiros KMZ originais. Prontos a usar.

---

## Adicionar domínio personalizado (depois da viagem)

1. Compra o domínio (Namecheap, GoDaddy, etc.)
2. Netlify → Domain settings → Add custom domain
3. Aponta os DNS do domínio para o Netlify
4. Aguarda 24-48h
5. Zero alterações no código necessárias
