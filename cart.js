document.addEventListener("DOMContentLoaded", () => {
  // LOGIN CHECK
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userId = localStorage.getItem("userId");

  if (!isLoggedIn || !userId) {
    window.location.replace("/auth/login.html");
    return;
  }

  const cartItems = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  const breakdownEl = document.getElementById("price-breakdown");
  const checkoutBtn = document.querySelector(".btn.btn-primary");

  let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

  function renderCart() {
    if (cart.length === 0) {
      cartItems.innerHTML = `<p class="text-center text-muted">Your cart is empty</p>`;
      breakdownEl.innerHTML = "";
      totalPriceEl.innerText = "0";
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    let total = 0;
    cartItems.innerHTML = "";
    breakdownEl.innerHTML = "";
    if (checkoutBtn) checkoutBtn.disabled = false;

    cart.forEach((item, index) => {
      const price = Number(item.price) || 0;
      const qty = item.quantity || 1;
      const subtotal = price * qty;
      total += subtotal;

      // PRODUCT CARD
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
      card.innerHTML = `
        <div class="card h-100 shadow">
          <img src="${item.image || item.img}" class="img-fluid p-3" alt="${item.name}">
          <div class="card-body text-center">
            <h5>${item.name}</h5>
            <p>₹${price} × ${qty}</p>
            <p class="fw-bold">Subtotal: ₹${subtotal}</p>
            <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">
              Remove
            </button>
          </div>
        </div>
      `;
      cartItems.appendChild(card);

      // PRICE BREAKDOWN
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between";
      li.innerHTML = `<span>${item.name} × ${qty}</span><span>₹${subtotal}</span>`;
      breakdownEl.appendChild(li);
    });

    totalPriceEl.innerText = total;

    // Update navbar cart count
    if (typeof updateCartCount === "function") updateCartCount();
  }

  renderCart();

  // REMOVE ITEM
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });

  function saveCart() {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }

  // CHECKOUT BUTTON
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert(`Checkout successful! Total amount: ₹${totalPriceEl.innerText}`);
      cart = [];
      saveCart();
      renderCart();
    });
  }
});
