const carrinho = [];
let totalCarrinho = 0;
let isCarrinhoVisible = false; // Variável para controlar a visibilidade do carrinho

function toggleCarrinho() {
    const carrinhoElement = document.getElementById('itens-carrinho');
    // Alternar a exibição do carrinho
    isCarrinhoVisible = !isCarrinhoVisible; // Inverte o estado
    carrinhoElement.style.display = isCarrinhoVisible ? 'block' : 'none'; // Atualiza a visibilidade
}

function selectOption(button, imagem) {
    const produto = button.innerText;
    const preco = parseFloat(produto.match(/R\$ ([\d,.]+)/)[1].replace(',', '.'));

    carrinho.push({ produto: produto, imagem: imagem, preco: preco });
    totalCarrinho += preco;

    // Armazenar carrinho e total na localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('totalCarrinho', totalCarrinho.toFixed(2));

    updateCarrinho();

    if (!isCarrinhoVisible) {
        isCarrinhoVisible = true;
        document.getElementById('itens-carrinho').style.display = 'block';
    }
}

function updateCarrinho() {
    const listaItens = document.getElementById('lista-itens');
    listaItens.innerHTML = '';

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'item-carrinho';
        li.innerHTML = `
            <img src="${item.imagem}" alt="${item.produto}">
            <span>${item.produto}</span>
            <div>
                <button class="remove-button" onclick="removeItem(${index})">Remover</button>
            </div>
        `;
        listaItens.appendChild(li);
    });

    document.getElementById('total-carrinho').innerText = 'Total: R$ ' + totalCarrinho.toFixed(2).replace('.', ',');
}

function removeItem(index) {
    totalCarrinho -= carrinho[index].preco;
    carrinho.splice(index, 1);
    
    // Atualizar localStorage após remoção
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('totalCarrinho', totalCarrinho.toFixed(2));

    updateCarrinho();
}

function toggleOpcoes(button) {
    const opcoes = button.nextElementSibling;
    opcoes.style.display = opcoes.style.display === 'block' ? 'none' : 'block';
}

// Inicializar o carrossel
let currentIndex = 0;
const images = document.querySelectorAll('.carousel-images img');

function showNextImage() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
}

// Define um intervalo para mudar a imagem do carrossel a cada 3 segundos
setInterval(showNextImage, 3000);

function finalizarCompra(event) {
    event.stopPropagation(); // Impede que o clique no botão feche o carrinho
    
    // Salva o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('totalCarrinho', totalCarrinho);
    
    // Redireciona para a página de checkout
    window.location.href = 'checkout.html';
}

