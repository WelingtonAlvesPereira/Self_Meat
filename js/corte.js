const cards = document.querySelectorAll(".card");
const addButton = document.getElementById("addButton");
const selectionIndicator = document.getElementById("selectionIndicator");

let selectedCut = null;

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();

    cards.forEach((c) => c.classList.remove("selected"));

    card.classList.add("selected");

    selectedCut = card.closest(".card-link").dataset.cut;

    addButton.disabled = false;
    selectionIndicator.textContent = `Selecionado: ${selectedCut}`;
  });
});

addButton.addEventListener("click", () => {
  if (selectedCut) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    let Carrinho = document.getElementById("Carrinho");
    let link = document.getElementById("links");

    let teste = pedidos.length + 1;

    if (teste > 0) {
      Carrinho.classList.remove("visivel");
      link.innerHTML = `Carrinho ${teste}`;
    }

    console.log(teste);

    pedidos.push(selectedCut);

    Carrinho.classList.remove("visivel");
    link.innerHTML = `Carrinho ${teste}`;

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    alert(`${selectedCut} adicionado ao pedido com sucesso!`);

    cards.forEach((c) => c.classList.remove("selected"));
    selectedCut = null;
    addButton.disabled = true;
    selectionIndicator.textContent = "";
  }
});
