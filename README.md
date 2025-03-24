# Audio Analyzer

**Audio Analyzer** es una herramienta diseñada para analizar la calidad de audios, inicialmente creada para evaluar llamadas de ventas según ciertos criterios. Con el tiempo, evolucionó en una solución flexible para diversas necesidades de análisis de audio.

## 🚀 Características

- **Transcripción de audio:** Utiliza modelos avanzados de IA para convertir audio en texto.
- **Análisis de contenido:** Evalúa el audio según criterios específicos definidos por el usuario.
- **Opciones de procesamiento:** Permite elegir entre OpenAI (Whisper + GPT-4o-mini) y Replicate (Whisper optimizado + DeepSeek-R1).
- **Interfaz moderna:** Construida con Next.js, Tailwind CSS y ShadCN/UI para una experiencia fluida y accesible.
- **Optimización de costos y velocidad:** Soporte para múltiples modelos para un procesamiento más rápido y económico.

## 🛠️ Tecnologías utilizadas

- **Frontend:** [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCN/UI](https://ui.shadcn.com/)
- **Backend:** [OpenAI API](https://openai.com/), [Replicate API](https://replicate.com/)
- **Despliegue:** [Fly.io](https://fly.io/)

## 📦 Instalación y uso

### Requisitos previos

- Node.js >= 18

### Instalación

```bash
# Clona el repositorio
git clone https://github.com/tuusuario/audio-analyzer.git
cd audio-analyzer

# Instala las dependencias
pnpm install

# Inicaliza el proyecto
pnpm run dev


```

## 📌 Roadmap y mejoras futuras

- 🔄 Selección de modelo específico: Actualmente se elige la plataforma, pero en el futuro se podrá seleccionar modelos individuales.

- 📊 Reportes detallados: Generación de reportes de calidad basados en múltiples análisis.

- 🌎 Soporte para más idiomas: Expansión de los modelos para análisis en varios idiomas.

## 🤝 Contribuciones

Si quieres contribuir al proyecto, ¡eres bienvenido! Puedes abrir issues o hacer pull requests con mejoras.

## 📩 Contacto

Si tienes ideas o feedback, puedes escribirme a [ahmediglez@gmail.com](mailto:ahmediglez@gmail.com) o conectar conmigo en [LinkedIn](https://www.linkedin.com/in/ahmediglez).

## 🎯 Prueba la herramienta

👉 [Audio Analyzer](https://audio-analyzer.fly.dev) 🚀
