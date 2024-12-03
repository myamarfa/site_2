async function getResponse() {
    try {
        let response = await fetch("shop.json");
        console.log("response:\n", response);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let content = await response.json();
        console.log("Original content:\n", content);

        // Оставляем только первые 9 элементов
        content = content.slice(0, 9);
        console.log("Content after slice(0, 9):\n", content);

        // Находим узел для вставки строк
        let node_for_insert = document.getElementById("node_for_insert");
        node_for_insert.innerHTML = ""; // Очищаем перед вставкой

        // Генерация карточек
        let row = null; // Текущая строка
        content.forEach((item, index) => {
            // Если индекс кратен 3, создаем новую строку
            if (index % 3 === 0) {
                row = document.createElement("div");
                row.className = "row mb-4"; // Создаем строку с классом Bootstrap
                node_for_insert.appendChild(row);
            }

            // Создаем карточку
            let col = document.createElement("div");
            col.className = "col-lg-4 col-md-6 col-sm-12 mb-4"; // Адаптивная колонка
            col.innerHTML = `
    <div class="card h-100">
        <img class="card-img-top" src="${item.img}" alt="${item.title}" style="width: 100%; max-height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}.</p>
            <p class="card-text price-text">
                <span>Цена:</span>
                <strong>${item.price} р.</strong>
            </p>
            <input type="hidden" name="vendor_code" value="${item.vendor_code}">
            <p class="card-text mt-auto">Заказать 
                <input class="form-control w-50 d-inline-block" type="number" name="amount" value="0">
            </p>
        </div>
    </div>
`;


            // Добавляем карточку в текущую строку
            row.appendChild(col);
        });
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

// Вызов функции
getResponse();
