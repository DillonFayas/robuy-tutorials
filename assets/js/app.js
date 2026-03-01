function renderList(containerId, items, type) {
  const container = document.getElementById(containerId);

  items.forEach(item => {

    if (type === "products") {
      const link = document.createElement("a");
      link.href = `/products/${item.slug}/`;
      link.className = "card product-card";

      link.innerHTML = `
        <div class="product-image">
          <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="product-content">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
      `;

      container.appendChild(link);
    }

    if (type === "plugins") {
      const card = document.createElement("div");
      card.className = "card plugin-card";

      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <a class="button external" href="${item.link}" target="_blank" rel="noopener">
          <span class="button-content">
            Get Plugin
            <span class="external-icon">
              <svg viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"/>
                <path fill="currentColor"
                  d="M5 5h6v2H7v10h10v-4h2v6H5z"/>
              </svg>
            </span>
          </span>
        </a>
      `;

      container.appendChild(card);
    }
  });
}