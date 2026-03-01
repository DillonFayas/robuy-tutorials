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
        <a class="button" href="${item.link}" target="_blank">
          Get Plugin
        </a>
      `;

      container.appendChild(card);
    }
  });
}