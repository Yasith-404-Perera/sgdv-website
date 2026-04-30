
<p align="center"><img src="./img/logo.png" width="100" height="100"></p>

<h1><p align="center">Sri Gunarathana Dharma Vidyalaya</h1>

<p align="center">Welcome to the repository for the **Sri Gunarathana Dharma Vidyalaya** website. This project is a modern, responsive, and visually immersive web experience built to represent a Dhamma school rooted in the Theravāda tradition. It aims to provide information about the school's mission, classes, teachers, events, and community while offering a serene digital environment.</p>

## 🌟 Key Features

*   **Bilingual Support (i18n):** Fully functional English and Sinhala language modes. The website translates all UI elements and dynamically adjusts typography (e.g., swapping to Noto Sans Sinhala) when toggled.
*   **Immersive 3D Visuals:** Incorporates `Three.js` for authentic, refined 3D visualizations, including a majestic Stupa section inspired by traditional Sri Lankan temple architecture.
*   **Premium Interactive Design:**
    *   Custom dynamic cursor that interacts with the page elements.
    *   Smooth scrolling and scroll-triggered reveal animations.
    *   Elegant typography utilizing Google Fonts (*Cormorant Garamond*, *EB Garamond*, and *Noto Serif Sinhala*).
*   **Fully Responsive:** Adapts seamlessly to all screen sizes, from desktop monitors to mobile devices, ensuring accessibility for all parents and students.

## 🛠️ Technologies Used

*   **HTML5 & CSS3:** Semantic structure with custom, highly tailored vanilla CSS (no heavy CSS frameworks used, maintaining full control over the aesthetic).
*   **JavaScript (ES6):**
    *   `script.js`: Core interactions, mobile menu, scroll reveals, and modal logic.
    *   `i18n.js`: Custom translation system managing English and Sinhala key-value pairs.
*   **Three.js:** Used for the Stupa and visual hero canvas elements to create a serene, ambient background.
*   **Browser-Sync:** For a smooth, live-reloading local development workflow.

## 📁 Project Structure

```text
sgdv-website/
│
├── img/                        # Image assets (gallery, teachers, logos)
├── index.html                  # ain HTML document
├── styles.css                  # Main stylesheet (includes Sinhala overrides)
├── script.js                   # Main application logic and animations
├── i18n.js                     # Internationalization logic and translation dictionary
├── package.json                # Project dependencies and npm scripts
└── README.md                   # Project documentation
```

## 🚀 Local Development Setup

To run this project locally, you will need to have [Node.js](https://nodejs.org/) installed on your machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Yasith-404-Perera/sgdv-website.git
    cd sgdv-website
    ```

2.  **Install dependencies:**
    The project uses `browser-sync` as a dev dependency for live reloading.
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```
    This command will launch `browser-sync`, open the website in your default web browser, and automatically reload the page whenever you make changes to the `.html`, `.css`, or `.js` files.

## ☸️ About the School

Founded in the spirit of the Buddha's teaching, SGDV is a Dhamma school nurturing children in mindfulness, ethics, and the timeless wisdom of the Theravāda tradition. The school offers Dhamma lessons, ānāpānasati meditation, Pāli chanting, and cultural events to guide young minds from ignorance to enlightenment.

> *"Sabbapāpassa akaraṇaṃ, kusalassa upasampadā — sadacittapariyodapanaṃ, etaṃ buddhānasāsanaṃ."*
> — Dhammapada 183
