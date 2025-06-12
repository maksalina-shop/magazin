const sheetId = "1uvZDDq7y3D73InwHYQ4vKqmhHXGtK9KjdRcVXzm5KAk"; // ← ID твоей таблицы
const sheetName = "Лист1";
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}`;

fetch(url)
  .then(res => res.text())
  .then(rep => {
    const jsonData = JSON.parse(rep.substr(47).slice(0, -2));
    const rows = jsonData.table.rows;
    const products = rows.map(row => {
      const cells = row.c;
      return {
        category: cells[0]?.v || "",
        subcategory: cells[1]?.v || "",
        name: cells[2]?.v || "",
        description: cells[3]?.v || "",
        price: cells[4]?.v || "",
        photo: cells[5]?.v || ""
      };
    });

    renderProducts(products);
  })
  .catch(err => {
    document.getElementById('products').innerHTML = "<p>Ошибка загрузки товаров</p>";
    console.error(err);
  });

function renderProducts(items) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  items.forEach(item => {
    const block = document.createElement("div");
    block.className = "product";

    block.innerHTML = `
      <img src="${item.photo}" alt="${item.name}" />
      <h2>${item.name}</h2>
      <p><strong>${item.price} ₽</strong></p>
      <p>${item.description}</p>
      <p><em>${item.category} / ${item.subcategory}</em></p>
    `;

    container.appendChild(block);
  });
}