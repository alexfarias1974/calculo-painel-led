# AC Display — Calculador de Painel de LED & Consultoria Técnica

Plataforma interativa para dimensionamento comercial de painéis de LED, cálculo de quantidade de gabinetes, resolução nativa e assistência educacional na escolha de Pixel Pitch.

## 🚀 Funcionalidades

- **Cálculo de Gabinetes e Dimensão Real:** Calcula o arranjo exato de colunas e linhas para qualquer tamanho desejado.
- **Ajuste de Dimensão (Ampliar ou Reduzir):** Permite escolher se o painel pode ultrapassar ligeiramente as medidas ou se deve caber estritamente no espaço disponível.
- **Assistente Educacional de Pixel Pitch:**
  - **Sugerir por Distância:** O vendedor informa a distância do público em metros e o sistema indica o pitch ideal com base na regra de ouro ($1\text{mm} \approx 1\text{ metro}$).
  - **Régua Visual de Zonas de Visão:** Exibe visualmente as zonas *Pixelizada*, *Conforto Ótimo* e *Distante*.
  - **Guia Rápido Integrado:** Explicações claras e diretas sobre o que é o pitch e dicas de custo-benefício.
- **Classificação de Resolução:** Detecção automática de atingimento dos padrões **SD**, **HD (720p)** e **Full HD (1080p)**.
- **Grade 2D Visual Interativa:** Diagrama com cotas dimensionais, numeração de gabinetes e proporção em escala.
- **Suporte Mobile (PWA & Android Nativo):** Instalável no celular via navegador (PWA) ou exportável em APK nativo via Capacitor.

---

## 🛠️ Tecnologias

- **React 19 + Vite**
- **Vanilla CSS (Design System Dark Corporativo)**
- **Capacitor (Suporte Android Nativo)**
- **Lucide Icons**

---

## 💻 Como Rodar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse em seu navegador: `http://localhost:5173/`

---

## 📱 Como Gerar APK (Android)

O projeto já está estruturado com Capacitor na pasta `android/`. Para compilar o APK:

```bash
# 1. Compilar os arquivos web
npm run build

# 2. Sincronizar com o projeto Android
npx cap sync

# 3. Abrir no Android Studio
npx cap open android
```
No Android Studio, vá em **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
