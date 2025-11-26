const carneCortes = {
  bovina: ["Picanha", "Alcatra", "Contrafilé", "Maminha"],
  suina: ["Costela", "Lombo", "Pernil", "Paleta"],
  frango: ["Peito", "Coxa", "Asa", "Sobrecoxa"],
  peixe: ["Salmão", "Tilápia", "Robalo", "Atum"]
};

const carneSelection = document.getElementById("carneSelection");
const cutsContainer = document.getElementById("cutsContainer");
const backBtn = document.getElementById("backBtn");
const finishBtn = document.getElementById("finishBtn");
const cartButton = document.getElementById("cartButton");
const buttonContainer = document.getElementById("buttonContainer");
const mainDiv = document.querySelector("main > div");

let currentType = null;
let pedidos = JSON.parse(localStorage.getItem("pedido")) || [];

// Atualizar botão do carrinho
function updateCartButton() {
  if (pedidos.length > 0) {
    cartButton.classList.remove("hidden");
    cartButton.textContent = `🛒 Carrinho (${pedidos.length})`;
  } else {
    cartButton.classList.add("hidden");
  }
}

// Selecionar tipo de carne
document.querySelectorAll(".mine-conteiner").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const tipo = btn.dataset.type;
    currentType = tipo;

    // Ocultar seleção de tipos e mostrar cortes
    carneSelection.style.display = "none";
    buttonContainer.style.display = "flex";

    // Atualizar título
    const nomeCarne = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    mainDiv.innerHTML = `
      <h1>Cortes de ${nomeCarne}</h1>
      <p>Escolha o corte e quantidade desejados</p>
    `;

    // Renderizar cortes
    renderCortes(tipo);
    cutsContainer.style.display = "grid";
  });
});

function renderCortes(tipo) {
  const cortes = carneCortes[tipo];
  
  cutsContainer.innerHTML = cortes.map(corte => `
    <div class="card-link" data-cut="${corte}">
      <div class="card">
        <p class="card-text">${corte}</p>
        <div class="quantity-control">
          <button class="quantity-btn minus">-</button>
          <input
            type="number"
            class="quantity-input"
            value="100"
            min="100"
            step="100"
            readonly
          />
          <button class="quantity-btn plus">+</button>
        </div>
      </div>
    </div>
  `).join("");

  // Reattach event listeners
  attachQuantityListeners();
  attachCardClickListeners();
}

function attachQuantityListeners() {
  document.querySelectorAll(".quantity-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const card = btn.closest(".card");
      const input = card.querySelector(".quantity-input");
      let value = parseInt(input.value);

      if (btn.classList.contains("plus")) {
        value += 100;
      } else if (btn.classList.contains("minus")) {
        value = Math.max(100, value - 100);
      }

      input.value = value;
    });
  });
}

function attachCardClickListeners() {
  document.querySelectorAll(".card-link").forEach((cardLink) => {
    cardLink.addEventListener("click", (e) => {
      // Não adicionar se clicou nos botões de quantidade
      if (e.target.classList.contains("quantity-btn") || e.target.classList.contains("quantity-input")) {
        return;
      }

      const card = cardLink.querySelector(".card");
      const corte = cardLink.dataset.cut;
      const quantidade = parseInt(card.querySelector(".quantity-input").value);

      // Adicionar ao pedidos
      pedidos.push({
        corte: corte,
        quantidade: quantidade,
        carne: currentType
      });

      localStorage.setItem("pedido", JSON.stringify(pedidos));
      updateCartButton();

      alert(`${corte} - ${quantidade}g adicionado ao pedido!`);

      // Resetar quantidade
      card.querySelector(".quantity-input").value = 100;
    });
  });
}

// Botão voltar
backBtn.addEventListener("click", () => {
  carneSelection.style.display = "grid";
  buttonContainer.style.display = "none";
  cutsContainer.style.display = "none";

  mainDiv.innerHTML = `
    <h1>Escolha o tipo de carne</h1>
    <p>Seja Bem-vindo!</p>
  `;

  currentType = null;
});

// Botão finalizar pedido
finishBtn.addEventListener("click", () => {
  if (pedidos.length === 0) {
    alert("Nenhum item no pedido!");
    return;
  }

  localStorage.setItem("pedido", JSON.stringify(pedidos));
  window.location.href = "./Carrinho.html";
});

// Botão carrinho
cartButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "./Carrinho.html";
});

// Inicializar
updateCartButton();