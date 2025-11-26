document.addEventListener("DOMContentLoaded", () => {
  // --- Lógica do formulário ---
  const form = document.querySelector("form");
  const input = document.getElementById("input");

  if (form && input) {
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
  }
});