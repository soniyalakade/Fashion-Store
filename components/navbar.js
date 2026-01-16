document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userName = localStorage.getItem("userName") || "User";

  document.getElementById("navbar-container").innerHTML = `
    <nav class="navbar navbar-expand-lg custom-navbar fixed-top shadow-sm">
      <div class="container">

        <!-- LOGO -->
        <a class="navbar-brand fw-bold d-flex align-items-center" href="/index.html">
          <img src="/images/logo.png" height="40" class="me-2 rounded-pill">
          FashionStore
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-lg-center">

            <!-- HOME -->
            <li class="nav-item">
              <a class="nav-link" href="/index.html">Home</a>
            </li>

            <!-- CATEGORIES -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button"
                data-bs-toggle="dropdown">
                Categories
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="/category.html?type=women">
                    Women
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/category.html?type=men">
                    Men
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/category.html?type=footwear">
                    Footwear
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/category.html?type=accessories">
                    Accessories
                  </a>
                </li>
              </ul>
            </li>

            <!-- CART -->
            <li class="nav-item">
              <a class="nav-link" href="/cart.html">
                Cart (<span id="cart-count">0</span>)
              </a>
            </li>

            ${
              isLoggedIn
                ? `
                <!-- PROFILE -->
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button"
                    data-bs-toggle="dropdown">
                    👤 ${userName}
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <span class="dropdown-item-text fw-bold">
                        Hello, ${userName}
                      </span>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                      <button class="dropdown-item text-danger" id="logoutBtn">
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              `
                : `
                <!-- AUTH -->
                <li class="nav-item">
                  <a class="nav-link" href="/auth/login.html">Login</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/auth/register.html">Sign Up</a>
                </li>
              `
            }

          </ul>
        </div>
      </div>
    </nav>
  `;

  // LOGOUT
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("cart");
      window.location.href = "/index.html";
    });
  }

  updateCartCount();
});

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    countEl.innerText = "0";
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  countEl.innerText = cart.length;
}
