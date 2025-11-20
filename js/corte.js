const cards = document.querySelectorAll(".card");
const addButton = document.getElementById("addButton");
const selectionIndicator = document.getElementById("selectionIndicator");
const carrinho = document.getElementById("Carrinho");
const link = document.getElementById("links");

let selectedCut = null;
let selectedQuantity = 0;
let pedidos = [];

// Seleção de card
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Não selecionar se clicar nos botões
    if (e.target.classList.contains("quantity-btn")) {
      return;
    }

    cards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");

    const cardLink = card.closest(".card-link");
    selectedCut = cardLink.dataset.cut;
    selectedQuantity = parseInt(card.querySelector(".quantity-input").value);

    addButton.disabled = false;
    selectionIndicator.textContent = `Selecionado: ${selectedCut} - ${selectedQuantity}g`;
  });
});

// Controle de quantidade
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

    // Atualizar indicador se este card estiver selecionado
    if (card.classList.contains("selected")) {
      selectedQuantity = value;
      const cardLink = card.closest(".card-link");
      selectedCut = cardLink.dataset.cut;
      selectionIndicator.textContent = `Selecionado: ${selectedCut} - ${value}g`;
    }
  });
});

addButton.addEventListener("click", () => {
  if (selectedCut) {
    const pedido = {
      corte: selectedCut,
      quantidade: selectedQuantity,
    };

    pedidos.push(pedido);

    carrinho.classList.remove("visivel");
    link.innerHTML = `Carrinho (${pedidos.length})`;

    alert(`${selectedCut} - ${selectedQuantity}g adicionado ao pedido!`);

    // Resetar seleção
    cards.forEach((c) => c.classList.remove("selected"));
    selectedCut = null;
    selectedQuantity = 0;
    addButton.disabled = true;
    selectionIndicator.textContent = "";
    localStorage.setItem("pedido", JSON.stringify(pedidos));
  }
});

// Simular navegação para carrinho
link.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "./../pages/Carrinho.html";
});
