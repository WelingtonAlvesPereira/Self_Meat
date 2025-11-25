const form = document.querySelector("form");
const input = document.getElementById("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const telefone = input.value.trim();

  if (telefone) {
    localStorage.setItem("telefone", telefone);
    location.href = "pages/tipo_carne.html";
  } else {
    alert("Por favor, insira um número de telefone válido.");
  }
});

// --- Lógica de busca ---
const searchInput = document.getElementById("searchInput");
const cutsContainer = document.getElementById("cutsContainer");

if (searchInput && cutsContainer) {
  const getCutCards = () => Array.from(document.querySelectorAll(".card-link"));

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();
    const cutCards = getCutCards();

    let anyVisible = false;

    cutCards.forEach(card => {
      const name = (card.dataset.cut || "").toLowerCase();

      if (name.includes(value)) {
        card.style.display = "";
        anyVisible = true;
      } else {
        card.style.display = "none";
      }
    });

    let noneEl = document.getElementById("noResultsMessage");
    if (!anyVisible) {
      if (!noneEl) {
        noneEl = document.createElement("p");
        noneEl.id = "noResultsMessage";
        noneEl.textContent = "Nenhum corte encontrado.";
        cutsContainer.insertAdjacentElement("afterend", noneEl);
      }
    } else {
      if (noneEl) noneEl.remove();
    }
  });
}

