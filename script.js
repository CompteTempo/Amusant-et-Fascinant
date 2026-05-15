console.log("Site chargé !");
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.classList.toggle("open");
}

/* Liste des chapitres à scanner */
const chapters = [
    "chapters/01_origines.html",
    "chapters/02_terre_primitive.html",
    "chapters/03_premieres_cellules.html",
    "chapters/04_evolution_animale.html",
    "chapters/05_hominides.html",
    "chapters/06_homo_sapiens.html"
];

/* Recherche simple dans les fichiers */
async function searchSite() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = "";

    if (query.length < 2) return;

    for (let file of chapters) {
        const response = await fetch(file);
        const text = await response.text();

        if (text.toLowerCase().includes(query)) {
            const snippetIndex = text.toLowerCase().indexOf(query);
            const snippet = text.substring(snippetIndex - 40, snippetIndex + 40);

            const result = document.createElement("div");
            result.textContent = file.replace("chapters/", "").replace(".html", "") + " : ... " + snippet + " ...";
            result.onclick = () => window.location.href = file;

            resultsDiv.appendChild(result);
        }
    }
}

/* === Animation de l'évolution des lapins === */
const images = [
  "../assets/lapin1.png", // Variation
  "../assets/lapin2.png", // Sélection
  "../assets/lapin3.png", // Succès différentiel
  "../assets/lapin4.png", // Transmission
  "../assets/lapin5.png"  // Évolution
];

let currentIndex = 0;
const container = document.getElementById("animationContainer");

// Fonction pour afficher une étape
function showStep(index) {
  const img = document.createElement("img");
  img.src = images[index];
  img.alt = "Étape " + (index + 1);
  container.appendChild(img);

  // Animation d’apparition
  setTimeout(() => img.classList.add("visible"), 50);

  // Clique pour passer à la suivante
  img.addEventListener("click", () => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      const newImg = showStep(currentIndex);

      // Scroll vers la nouvelle image
      setTimeout(() => {
        newImg.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

    } else {
      img.insertAdjacentHTML(
        "afterend",
        "<p style='text-align:center;font-weight:bold;'>Animation terminée 🎉</p>"
      );
    }
  });

  return img; // important : on renvoie l'image créée
}

// Affiche la première étape dès le début
showStep(currentIndex);