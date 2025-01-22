function loadLanguageScript(language, callback) {
  const script = document.createElement("script");
  script.src = `locale/${language}.js`;
  script.onload = () => {
    callback(window.currentTranslations); // Use the loaded translations
  };
  document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("language") || "en";

  loadLanguageScript(savedLanguage, (translations) => {
    updateContent(translations);
  });

  document.getElementById("languageSelector").addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem("language", selectedLanguage);
    loadLanguageScript(selectedLanguage, (translations) => {
      updateContent(translations);
    });
  });

  function updateContent(translations) {
    document.querySelectorAll("[id]").forEach((element) => {
      const key = element.id;
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });
  }
});
