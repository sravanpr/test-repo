fetch('products.json')
    .then(response => response.json())
    .then(data => {
        let productContainer = document.getElementById('product-list');

        data.forEach(product => {
            let div = document.createElement('div');
            div.classList.add('product');
            div.innerHTML = `<div class="product-name">${product.name}</div>
                            <div class="product-price">${product.price}</div>
                            <input type="number" min="0" value="${product.price}" onchange="updatePrice(${product.id}, this.value)">`;
            productContainer.appendChild(div);
        });
    })
    .catch(error => console.error(error));

function updatePrice(productId, newPrice) {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            let productIndex = data.findIndex(product => product.id === productId);
            data[productIndex].price = parseFloat(newPrice);
            return data;
        })
        .then(data => {
            fetch('products.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
}
