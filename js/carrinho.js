// Lê pedidos do localStorage e renderiza, com botão de remover (🗑️) na mesma linha do nome.

const listaPedidosEl = document.getElementById('lista-pedidos');
const totalEl = document.getElementById('total');
const finalizarBtn = document.getElementById('finalizarBtn');

let pedidos = JSON.parse(localStorage.getItem('pedido')) || [];

// Calcula preço — ajuste a regra se necessário (ex: R$0.10 por grama)
function calcularTotais() {
  const totalQtd = pedidos.reduce((s, p) => s + (p.quantidade || 0), 0);
  const totalPreco = pedidos.reduce((s, p) => s + ((p.quantidade || 0) * 0.1), 0);
  return { totalQtd, totalPreco };
}

function renderCarrinho() {
  listaPedidosEl.innerHTML = '';

  if (!pedidos || pedidos.length === 0) {
    listaPedidosEl.innerHTML = '<p>Seu carrinho está vazio.</p>';
    totalEl.textContent = 'R$ 0,00';
    return;
  }

  // Render cada item (mantendo ordem de inserção)
  pedidos.forEach((item, index) => {
    const itemWrap = document.createElement('div');
    itemWrap.className = 'pedido-item';
    itemWrap.dataset.index = index;

    const nome = item.corte || 'Corte';
    const carne = item.carne ? ` (${item.carne})` : '';
    const qtd = item.quantidade || 0;
    const preco = (qtd * 0.1).toFixed(2);

    // Coloca a lixeira junto ao nome (mesma linha, sem quebra)
    itemWrap.innerHTML = `
      <div class="info">
        <div class="left">
          <strong class="item-nome">${nome}${carne}</strong>
          <button class="remove-btn" data-index="${index}" title="Remover item">🗑️</button>
          <div class="item-qtd">${qtd}g</div>
        </div>
        <div class="right">
          <div class="item-preco">R$ ${preco}</div>
        </div>
      </div>
    `;

    listaPedidosEl.appendChild(itemWrap);
  });

  // atualizar total
  const { totalQtd, totalPreco } = calcularTotais();
  totalEl.textContent = `R$ ${totalPreco.toFixed(2)}`;

  // adicionar listeners remover
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = Number(btn.dataset.index);
      removerItem(idx);
    });
  });
}

function removerItem(index) {
  if (!Number.isFinite(index)) return;
  pedidos.splice(index, 1);
  localStorage.setItem('pedido', JSON.stringify(pedidos));
  renderCarrinho();
}

finalizarBtn.addEventListener('click', () => {
  if (!pedidos || pedidos.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const { totalQtd, totalPreco } = calcularTotais();
  alert(`Pedido finalizado!\nTotal: ${totalQtd}g\nValor: R$ ${totalPreco.toFixed(2)}`);
  localStorage.removeItem('pedido');
  pedidos = [];
  renderCarrinho();
  // opcional: redirecionar para seleção
  // window.location.href = './tipo_carne.html';
});

// inicializa render
renderCarrinho();