// Busca CEP e preenche endereço, bairro e cidade
document.getElementById("search-cep").addEventListener("click", function () {
    const cep = document.getElementById("cep").value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert("Por favor, insira um CEP válido com 8 dígitos.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado. Por favor, insira os dados manualmente.");
                return;
            }

            document.getElementById("address").value = data.logradouro || '';
            document.getElementById("neighborhood").value = data.bairro || '';
            document.getElementById("city").value = `${data.localidade || ''} - ${data.uf || ''}`;
        })
        .catch(() => alert("Erro ao buscar o CEP. Por favor, insira os dados manualmente."));
});

// Atualiza as vantagens ao selecionar o plano
document.getElementById("plan").addEventListener("change", function () {
    const benefitsBox = document.getElementById("benefits");
    const selectedPlan = this.value;

    let benefits = "";
    if (selectedPlan === "semanal") {
        const unitPrice = (36.00 / 5).toFixed(2);
        benefits = `
            <strong>Plano Semanal:</strong> 
            <ul>
                <li>Entrega semanal de 5 pães fresquinhos</li>
                <li>Valor total: R$36,00</li>
                <li>Valor unitário do pão: R$${unitPrice}</li>
                <li><strong>Perfeito para pequenas famílias</strong></li>
                <li>Mais flexibilidade nas entregas</li>
                <li><strong>Combinar os dias da semana de segunda a sexta a partir das 07:00 horas da manhã a entrega dos pães.</strong></li>
            </ul>`;
    } else if (selectedPlan === "mensal") {
        const unitPrice = (105.00 / 15).toFixed(2);
        benefits = `
            <strong>Plano Mensal:</strong> 
            <ul>
                <li>Entrega mensal de 15 pães fresquinhos</li>
                <li>Valor total: R$105,00</li>
                <li>Valor unitário do pão: R$${unitPrice}</li>
                <li><strong>Economia de R$15,00 comparado ao semanal</strong></li>
                <li>Ideal para famílias médias</li>
                <li><strong>Combinar os dias da semana de segunda a sexta a partir das 07:00 horas da manhã a entrega dos pães.</strong></li>
            </ul>`;
    } else if (selectedPlan === "trimestral") {
        const unitPrice = (297.00 / 45).toFixed(2);
        benefits = `
            <strong>Plano Trimestral:</strong> 
            <ul>
                <li>Entrega trimestral de 45 pães fresquinhos</li>
                <li>Valor total: R$297,00</li>
                <li>Valor unitário do pão: R$${unitPrice}</li>
                <li><strong>Maior economia (R$27,00 de desconto)</strong></li>
                <li>Melhor custo-benefício</li>
                <li><strong>Combinar os dias da semana de segunda a sexta a partir das 07:00 horas da manhã a entrega dos pães.</strong></li>
            </ul>`;
    } else {
        benefits = "<strong>Quero fazer Encomendas, sem assinatura.</strong>";
    }

    benefitsBox.innerHTML = benefits;
});

// Envia dados para WhatsApp
document.getElementById("send-to-whatsapp").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const address = document.getElementById("address").value.trim();
    const neighborhood = document.getElementById("neighborhood").value.trim();
    const number = document.getElementById("number").value.trim();
    const city = document.getElementById("city").value.trim();
    const plan = document.getElementById("plan").value;

    // Validação básica
    if (!name || !phone || !cep || !address || !neighborhood || !number || !city || !plan) {
        alert("Por favor, preencha todos os campos do formulário.");
        return;
    }

    // Texto do plano e benefícios
    let planDetails = "";
    if (plan === "semanal") {
        planDetails = `Plano Semanal: 5 pães por R$36,00.`;
    } else if (plan === "mensal") {
        planDetails = `Plano Mensal: 15 pães por R$105,00.`;
    } else if (plan === "trimestral") {
        planDetails = `Plano Trimestral: 45 pães por R$297,00.`;
    } else if (plan === "nao-assinante") {
        planDetails = "Quero fazer Encomendas, sem assinatura.";
    }

    // Formatar mensagem para WhatsApp
    const message = `*Novo Cadastro*\n\n` +
        `*Nome:* ${name}\n` +
        `*E-mail:* ${email}\n` +
        `*Telefone:* ${phone}\n` +
        `*CEP:* ${cep}\n` +
        `*Endereço:* ${address}, ${number}, ${neighborhood}, ${city}\n\n` +
        `*Plano Escolhido:* ${planDetails}`;
        `🎁 *Benefício Exclusivo:* Primeiro cadastro recebe uma amostra grátis!`;

    // Número de WhatsApp para envio
    const whatsappNumber = "5511968559541";

    // Link para WhatsApp
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

    // Redirecionar para WhatsApp
    window.open(whatsappLink, "_blank");
});
