let carrinho = [];

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalItens = document.getElementById('total-itens');
    const totalValor = document.getElementById('total-valor');
    const linkCarrinho = document.getElementById('link-carrinho');
    const mensagem = document.getElementById('mensagem');

    listaCarrinho.innerHTML = '';
    let total = 0;
    let totalQuantidade = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.produto} (x${item.quantidade}) - R$${(item.preco * item.quantidade).toFixed(2)} 
        <button onclick="removerItem(${index})">Remover</button>`;
        listaCarrinho.appendChild(li);
        total += item.preco * item.quantidade;
        totalQuantidade += item.quantidade;
    });

    totalItens.innerText = `Total de itens: ${totalQuantidade}`;
    totalValor.innerText = `Valor total: R$${total.toFixed(2)}`;
    linkCarrinho.setAttribute('data-count', totalQuantidade);
    
}

function adicionarAoCarrinho(produto, preco) {
    const existente = carrinho.find(item => item.produto === produto);
    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({ produto, preco, quantidade: 1 });
    }
    adicionar();
    atualizarCarrinho();
}

function adicionar() {
    const mensagem = document.getElementById('mensagem');
    mensagem.style.display = 'block'; // Mostra a mensagem
    setTimeout(() => {
        mensagem.style.display = 'none'; // Esconde a mensagem após 3 segundos
    }, 3000);
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function esvaziarCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

function enviarWhatsApp(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cep = document.getElementById('cep').value;

    let mensagem = `Olá, meu nome é ${nome}. Gostaria de fazer um pedido para o endereço ${endereco}, bairro ${bairro}, CEP ${cep}.\n\nItens no carrinho:\n`;

    carrinho.forEach(item => {
        mensagem += `- ${item.produto} (x${item.quantidade}) - R$${(item.preco * item.quantidade).toFixed(2)}\n`;
    });

    const totalValor = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    mensagem += `\nValor total: R$${totalValor.toFixed(2)}`;

    const url = `https://api.whatsapp.com/send?phone=5511968559541&text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}