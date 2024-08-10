const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente está pronto!');
});

const mainMenu = 'Olá, seja bem-vindo à academia IF Jiu-Jitsu!\n' +
    'Sobre qual assunto deseja falar?\n' +
    'Digite a opção desejada:\n' +
    '1 - Fazer matrícula\n' +
    '2 - Agendar uma aula particular\n' +
    '3 - Como funciona nossa metodologia de ensino\n' +
    '4 - Horários\n' +
    '5 - Planos de mensalidade\n' +
    '6 - Localização';

const optionsMenu = '\n\nDigite "menu" para voltar ao menu principal ou "sair" para encerrar a conversa.';

client.on('message', message => {
    const sendReply = (text) => {
        client.sendMessage(message.from, text + optionsMenu);
    };

    const reply = (text) => {
        client.sendMessage(message.from, text);
    };

    if (message.body.toLowerCase() === 'menu') {
        reply(mainMenu);
    } else if (message.body.toLowerCase() === 'sair') {
        reply('Obrigado por conversar com a academia IF Jiu-Jitsu. Até logo!');
    } else if (message.body.toLowerCase() === '1') {
        sendReply('Para fazer a matrícula, por favor, visite nossa academia durante os horários de funcionamento ou entre em contato pelo telefone (XX) XXXX-XXXX.');
    } else if (message.body.toLowerCase() === '2') {
        sendReply('Para agendar uma aula particular, você será direcionado para conversar com uma pessoa física que irá ajudá-lo com os detalhes. Agradecemos seu interesse!');
    } else if (message.body.toLowerCase() === '3') {
        sendReply('A metodologia do Jiu-Jitsu é um sistema de treinamento que visa desenvolver habilidades de combate eficazes, promovendo a autodefesa e o aprimoramento físico e mental.');
    } else if (message.body.toLowerCase() === '4') {
        sendReply('Horários:\nSegunda-feira: 19h00 - 20h30\nTerça-feira: 20h00 - 21h30\nQuarta-feira: 20h00 - 21h30\nQuinta-feira: 19h00 - 20h30\nSábado: 10h00 - 11h30');
    } else if (message.body.toLowerCase() === '5') {
        sendReply('Mensalidade para adultos: R$ 150,00\nMensalidade para Kids: R$ 150,00\nMensalidade Familiar (2 membros da mesma família): R$ 270,00');
    } else if (message.body.toLowerCase() === '6') {
        sendReply('Endereço: Rua Exemplo, nº 123, Mussurunga, Salvador - BA\nA academia de Jiu-Jitsu está convenientemente localizada no bairro de Mussurunga, em Salvador. Situada em uma área central, a academia é de fácil acesso tanto para moradores locais quanto para aqueles que vêm de outras partes da cidade.');
    } else {
        reply(mainMenu);
    }
});

client.initialize();
