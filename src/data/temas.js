import { db } from "../config/firebase";
import { ref, set, child } from "firebase/database";

const data = [
  {
    category: "Animais",
    foto: "/animal.jpeg",
    questions: [
      {
        question: "Qual é o maior mamífero do mundo?",
        options: ["Elefante", "Baleia azul", "Girafa", "Rinoceronte"],
        response: "Baleia azul",
      },
      {
        question: "Qual é o animal terrestre mais rápido?",
        options: ["Leão", "Antílope", "Chita", "Leopardo"],
        response: "Chita",
      },
      {
        question: "Qual destes animais é um marsupial?",
        options: ["Canguru", "Leão", "Cavalo", "Pinguim"],
        response: "Canguru",
      },
      {
        question: "Qual é o maior réptil do mundo?",
        options: [
          "Crocodilo do Nilo",
          "Cobra Sucuri",
          "Dragão de Komodo",
          "Tartaruga Marinha",
        ],
        response: "Crocodilo do Nilo",
      },
      {
        question: "Qual destes animais pode mudar de cor?",
        options: ["Camaleão", "Elefante", "Gato", "Lobo"],
        response: "Camaleão",
      },
      {
        question: "Qual é o único mamífero capaz de voar?",
        options: ["Morcego", "Papagaio", "Águia", "Pombo"],
        response: "Morcego",
      },
      {
        question:
          "Qual destes animais é conhecido por sua capacidade de regeneração?",
        options: ["Estrela-do-mar", "Cachorro", "Gato", "Elefante"],
        response: "Estrela-do-mar",
      },
      {
        question: "Qual é o animal mais venenoso do mundo?",
        options: ["Cobra-real", "Escorpião", "Medusa-caixa", "Aranha-marrom"],
        response: "Medusa-caixa",
      },
      {
        question: "Qual é o maior animal terrestre?",
        options: ["Elefante africano", "Búfalo", "Girafa", "Hipopótamo"],
        response: "Elefante africano",
      },
      {
        question:
          "Qual destes animais é conhecido por sua memória excepcional?",
        options: ["Elefante", "Cachorro", "Gato", "Pato"],
        response: "Elefante",
      },
    ],
  },

  {
    category: "Espaço",
    foto: "/espaço.jpg",
    questions: [
      {
        question: "Qual é o planeta mais próximo do Sol?",
        options: ["Vênus", "Terra", "Marte", "Mercúrio"],
        response: "Mercúrio",
      },
      {
        question: "Qual é o maior planeta do Sistema Solar?",
        options: ["Saturno", "Júpiter", "Urano", "Netuno"],
        response: "Júpiter",
      },
      {
        question: "Qual planeta é conhecido como o Planeta Vermelho?",
        options: ["Vênus", "Terra", "Marte", "Mercúrio"],
        response: "Marte",
      },
      {
        question:
          "Qual é o nome do primeiro satélite artificial lançado pela humanidade?",
        options: ["Apollo 11", "Sputnik 1", "Explorer 1", "Vostok 1"],
        response: "Sputnik 1",
      },
      {
        question:
          "Qual é o nome do telescópio espacial lançado pela NASA em 1990?",
        options: ["Kepler", "Hubble", "James Webb", "Chandra"],
        response: "Hubble",
      },
      {
        question: "Qual é a maior lua de Saturno?",
        options: ["Titã", "Europa", "Ganimedes", "Calisto"],
        response: "Titã",
      },
      {
        question: "Qual é o nome do primeiro humano a viajar para o espaço?",
        options: [
          "Neil Armstrong",
          "Buzz Aldrin",
          "Yuri Gagarin",
          "John Glenn",
        ],
        response: "Yuri Gagarin",
      },
      {
        question: "Em que ano o homem pisou na Lua pela primeira vez?",
        options: ["1965", "1967", "1969", "1971"],
        response: "1969",
      },
      {
        question: "Qual planeta tem um sistema de anéis mais proeminente?",
        options: ["Júpiter", "Saturno", "Urano", "Netuno"],
        response: "Saturno",
      },
      {
        question: "Quantos planetas anões são reconhecidos no Sistema Solar?",
        options: ["1", "3", "5", "7"],
        response: "5",
      },
    ],
  },
  {
    category: "Naruto",
    foto: "/naruto.jpg",
    questions: [
      {
        question: "Qual é o nome verdadeiro de Pain, o líder da Akatsuki?",
        options: [
          "Nagato Uzumaki",
          "Yahiko Uzumaki",
          "Obito Uchiha",
          "Kakashi Hatake",
        ],
        response: "Nagato Uzumaki",
      },
      {
        question: "Quem é o responsável pela criação da Akatsuki?",
        options: [
          "Madara Uchiha",
          "Hiruzen Sarutobi",
          "Tobirama Senju",
          "Hashirama Senju",
        ],
        response: "Madara Uchiha",
      },
      {
        question:
          "Qual é o nome verdadeiro de Tobi antes de assumir essa identidade?",
        options: [
          "Obito Uchiha",
          "Madara Uchiha",
          "Kakashi Hatake",
          "Sasuke Uchiha",
        ],
        response: "Obito Uchiha",
      },
      {
        question: "Quantas caudas tem o Bijū conhecido como Matatabi?",
        options: ["Três", "Seis", "Oito", "Nove"],
        response: "Duas",
      },
      {
        question:
          "Qual é o nome da técnica de Itachi que permite manipular a mente e as memórias de outras pessoas?",
        options: ["Tsukuyomi", "Amaterasu", "Kotoamatsukami", "Izanami"],
        response: "Kotoamatsukami",
      },
      {
        question: "Quem é o líder do Clã Hyūga em Naruto Shippuden?",
        options: [
          "Hinata Hyūga",
          "Hiashi Hyūga",
          "Neji Hyūga",
          "Hizashi Hyūga",
        ],
        response: "Hiashi Hyūga",
      },
      {
        question:
          "Qual é o nome da invocação de Pain que tem a habilidade de reviver os mortos?",
        options: ["Chōmei", "Shinra Tensei", "Naraka Path", "Gyūki"],
        response: "Naraka Path",
      },
      {
        question: "Quem é o portador original do chakra do Rikudou Sennin?",
        options: [
          "Naruto Uzumaki",
          "Sasuke Uchiha",
          "Madara Uchiha",
          "Kaguya Ōtsutsuki",
        ],
        response: "Hagoromo Ōtsutsuki",
      },
      {
        question:
          "Qual é o nome do irmão de Zabuza Momochi, conhecido como o Demônio da Névoa?",
        options: [
          "Kisame Hoshigaki",
          "Haku",
          "Suigetsu Hōzuki",
          "Mangetsu Hōzuki",
        ],
        response: "Mangetsu Hōzuki",
      },
      {
        question:
          "Qual é o nome da técnica de Minato Namikaze que lhe deu o título de Relâmpago Dourado de Konoha?",
        options: ["Rasengan", "Shurikenjutsu", "Hiraishin no Jutsu", "Chidori"],
        response: "Hiraishin no Jutsu",
      },
    ],
  },
  {
    category: "Grêmio",
    foto: "/gremio.webp",
    questions: [
      {
        question:
          "Qual foi o ano de fundação do Grêmio Foot-Ball Porto Alegrense?",
        options: ["1900", "1903", "1909", "1912"],
        response: "1903",
      },
      {
        question: "Qual é o apelido do Grêmio?",
        options: [
          "Tricolor Gaúcho",
          "Imortal Tricolor",
          "Guerreiros Gremistas",
          "Rei de Copas",
        ],
        response: "Imortal Tricolor",
      },
      {
        question: "Qual é o estádio principal do Grêmio?",
        options: [
          "Estádio Olímpico",
          "Arena do Grêmio",
          "Estádio Beira-Rio",
          "Arena Condá",
        ],
        response: "Arena do Grêmio",
      },
      {
        question:
          "Quantas vezes o Grêmio conquistou a Copa Libertadores da América até 2022?",
        options: ["2", "3", "4", "5"],
        response: "3",
      },
      {
        question: "Quem é o maior artilheiro da história do Grêmio?",
        options: ["Renato Portaluppi", "Jardel", "Luizão", "Everton Cebolinha"],
        response: "Renato Portaluppi",
      },
      {
        question:
          "Quantas vezes o Grêmio venceu o Campeonato Brasileiro da Série A?",
        options: ["1", "2", "3", "4"],
        response: "2",
      },
      {
        question:
          "Qual foi o técnico que conquistou a Copa Libertadores e o Mundial de Clubes com o Grêmio em 2017?",
        options: ["Renato Portaluppi", "Tite", "Felipão", "Mano Menezes"],
        response: "Renato Portaluppi",
      },
      {
        question:
          "Qual jogador marcou o primeiro gol da história da Arena do Grêmio?",
        options: ["Fernandão", "Renato Portaluppi", "Barcos", "Douglas"],
        response: "Fernandão",
      },
      {
        question: "Qual é o clube considerado maior rival do Grêmio?",
        options: ["Internacional", "São Paulo", "Palmeiras", "Corinthians"],
        response: "Internacional",
      },
      {
        question: "Quantas vezes o Grêmio venceu a Copa do Brasil até 2022?",
        options: ["4", "5", "6", "7"],
        response: "5",
      },
    ],
  },
  {
    category: "Marvel",
    foto: "/miranha.jpg",
    questions: [
      {
        question: "Qual é o nome verdadeiro do Capitão América?",
        options: ["Tony Stark", "Steve Rogers", "Bruce Banner", "Peter Parker"],
        response: "Steve Rogers",
      },
      {
        question:
          "Qual é o nome da cientista que se torna a super-heroína Hulk Vermelha?",
        options: [
          "Betty Ross",
          "Carol Danvers",
          "Jennifer Walters",
          "Jane Foster",
        ],
        response: "Betty Ross",
      },
      {
        question: "Quem é o criador do Homem de Ferro nos quadrinhos?",
        options: [
          "Stan Lee",
          "Larry Lieber",
          "Robert Downey Jr.",
          "Jack Kirby",
        ],
        response: "Stan Lee",
      },
      {
        question: "Qual é a verdadeira identidade do Pantera Negra?",
        options: ["T'Challa", "Erik Killmonger", "James Rhodes", "N'Jadaka"],
        response: "T'Challa",
      },
      {
        question:
          "Qual é o nome da nave espacial utilizada pelos Guardiões da Galáxia?",
        options: ["Ebon Hawk", "Milano", "Normandy", "Serenity"],
        response: "Milano",
      },
      {
        question: "Qual é o verdadeiro nome do Deadpool?",
        options: [
          "Wade Wilson",
          "Victor von Doom",
          "Matt Murdock",
          "Clint Barton",
        ],
        response: "Wade Wilson",
      },
      {
        question:
          "Quem é o vilão principal no filme 'Vingadores: Guerra Infinita'?",
        options: ["Loki", "Ronan", "Thanos", "Ultron"],
        response: "Thanos",
      },
      {
        question: "Qual é o nome do planeta natal de Thor?",
        options: ["Midgard", "Asgard", "Jotunheim", "Svartalfheim"],
        response: "Asgard",
      },
      {
        question: "Quem é conhecido como o 'Deus do Trovão' na Marvel?",
        options: ["Loki", "Thor", "Heimdall", "Odin"],
        response: "Thor",
      },
      {
        question:
          "Qual é o nome do ator que interpreta o Homem-Aranha no Universo Cinematográfico da Marvel?",
        options: [
          "Andrew Garfield",
          "Tom Holland",
          "Tobey Maguire",
          "Jake Gyllenhaal",
        ],
        response: "Tom Holland",
      },
    ],
  },
  {
    category: "Comida",
    foto: "/comida.jpg",
    questions: [
      {
        question: "Qual é o ingrediente principal do prato italiano 'risoto'?",
        options: ["Arroz", "Macarrão", "Feijão", "Batata"],
        response: "Arroz",
      },
      {
        question:
          "Qual é o ingrediente principal do prato mexicano 'guacamole'?",
        options: ["Abacate", "Tomate", "Cebola", "Pimentão"],
        response: "Abacate",
      },
      {
        question:
          "Qual é o nome da sopa tradicional francesa feita de cebolas caramelizadas?",
        options: ["Vichyssoise", "Bisque", "Bouillabaisse", "Sopa de Cebola"],
        response: "Sopa de Cebola",
      },
      {
        question: "O que é um 'croissant'?",
        options: ["Pão", "Bolo", "Massa Folhada", "Biscoito"],
        response: "Massa Folhada",
      },
      {
        question:
          "Qual é o prato típico da culinária japonesa feito com arroz e peixe cru?",
        options: ["Sushi", "Sashimi", "Tempura", "Ramen"],
        response: "Sushi",
      },
      {
        question:
          "Qual é o nome do prato típico da culinária indiana feito com frango e molho de iogurte e especiarias?",
        options: ["Tikka Masala", "Vindaloo", "Korma", "Saag Paneer"],
        response: "Tikka Masala",
      },
      {
        question: "Qual é o ingrediente principal do prato mexicano 'taco'?",
        options: ["Tortilha", "Arroz", "Feijão", "Macarrão"],
        response: "Tortilha",
      },
      {
        question:
          "Qual é o nome do prato italiano de massa longa e fina, normalmente servido com molho de tomate e manjericão?",
        options: [
          "Fettuccine Alfredo",
          "Penne all'arrabbiata",
          "Spaghetti alla Carbonara",
          "Linguine al Pesto",
        ],
        response: "Spaghetti alla Carbonara",
      },
      {
        question:
          "Qual é o nome do prato mexicano tradicional feito com tortilhas de milho dobradas e recheadas com carne, queijo, feijão, entre outros?",
        options: ["Taco", "Burrito", "Quesadilla", "Enchilada"],
        response: "Burrito",
      },
      {
        question:
          "Qual é o ingrediente principal da famosa sopa portuguesa chamada 'caldo verde'?",
        options: ["Couve", "Batata", "Cenoura", "Tomate"],
        response: "Couve",
      },
    ],
  },
  {
    category: "Computador",
    foto: "/pc.webp",
    questions: [
      {
        question: "Quem é considerado o pai da computação?",
        options: ["Alan Turing", "Bill Gates", "Steve Jobs", "Tim Berners-Lee"],
        response: "Alan Turing",
      },
      {
        question:
          "Qual é o componente principal de um computador responsável pelo processamento de dados?",
        options: [
          "Processador (CPU)",
          "Placa de vídeo (GPU)",
          "Memória RAM",
          "Placa-mãe",
        ],
        response: "Processador (CPU)",
      },
      {
        question:
          "Qual é a unidade básica de armazenamento de dados em um computador?",
        options: ["Byte", "Megabyte", "Kilobyte", "Gigabyte"],
        response: "Byte",
      },
      {
        question: "O que significa a sigla 'CPU'?",
        options: [
          "Unidade Central de Processamento",
          "Central Processing Unit",
          "Computer Processing Unit",
          "Control Processing Unit",
        ],
        response: "Central Processing Unit",
      },
      {
        question: "Qual destas não é uma marca de processadores?",
        options: ["GeForce", "Intel", "AMD", "Qualcomm"],
        response: "GeForce",
      },
      {
        question: "Qual é a função do sistema operacional em um computador?",
        options: [
          "Gerenciar recursos e fornecer uma interface para o usuário",
          "Conectar o computador à internet",
          "Executar programas de edição de texto",
          "Realizar cálculos matemáticos",
        ],
        response: "Gerenciar recursos e fornecer uma interface para o usuário",
      },
      {
        question:
          "Qual é o componente responsável por armazenar permanentemente os dados em um computador?",
        options: [
          "Disco Rígido (HD/SSD)",
          "Memória RAM",
          "Processador (CPU)",
          "Placa de vídeo (GPU)",
        ],
        response: "Disco Rígido (HD/SSD)",
      },
      {
        question: "Quem criou a World Wide Web (WWW)?",
        options: [
          "Tim Berners-Lee",
          "Bill Gates",
          "Steve Jobs",
          "Linus Torvalds",
        ],
        response: "Tim Berners-Lee",
      },
      {
        question: "O que é um firewall?",
        options: [
          "Um sistema de segurança que controla o tráfego de rede",
          "Um tipo de antivírus",
          "Um dispositivo de entrada de dados",
          "Um tipo de teclado virtual",
        ],
        response: "Um sistema de segurança que controla o tráfego de rede",
      },
      {
        question: "Qual é a função do BIOS em um computador?",
        options: [
          "Inicializar o hardware e iniciar o sistema operacional",
          "Gerenciar a conexão com a internet",
          "Executar programas de edição de vídeo",
          "Fornecer energia para o computador",
        ],
        response: "Inicializar o hardware e iniciar o sistema operacional",
      },
    ],
  },
  {
    category: "Xadrez",
    foto: "/xadrez.jpeg",
    questions: [
      {
        question:
          "Quantas peças de cada cor são usadas em um jogo padrão de xadrez?",
        options: ["16", "18", "20", "22"],
        response: "16",
      },
      {
        question:
          "Qual peça do xadrez pode se mover na diagonal em qualquer número de casas vazias?",
        options: ["Rainha", "Bispo", "Torre", "Cavalo"],
        response: "Bispo",
      },
      {
        question:
          "Qual é o nome do movimento especial no xadrez em que o rei e a torre mudam de lugar?",
        options: ["Roque", "Xeque", "En Passant", "Promoção"],
        response: "Roque",
      },
      {
        question: "Quantos jogadores participam de uma partida de xadrez?",
        options: ["2", "4", "6", "8"],
        response: "2",
      },
      {
        question: "Quantas casas o peão pode se mover em sua primeira jogada?",
        options: [
          "1 ou 2 casas",
          "3 ou 4 casas",
          "5 ou 6 casas",
          "7 ou 8 casas",
        ],
        response: "1 ou 2 casas",
      },
      {
        question:
          "Qual é o nome da posição inicial dos peões brancos no xadrez?",
        options: [
          "Segunda fileira",
          "Terceira fileira",
          "Quarta fileira",
          "Quinta fileira",
        ],
        response: "Segunda fileira",
      },
      {
        question: "Qual peça do xadrez pode se mover em forma de 'L'?",
        options: ["Cavalo", "Bispo", "Torre", "Rainha"],
        response: "Cavalo",
      },
      {
        question: "Qual é o objetivo principal do jogo de xadrez?",
        options: [
          "Capturar o rei adversário",
          "Capturar todas as peças do adversário",
          "Mover todas as peças para a linha de fundo",
          "Fazer o maior número de xeques possíveis",
        ],
        response: "Capturar o rei adversário",
      },
      {
        question: "Qual é a peça mais poderosa no xadrez?",
        options: ["Rainha", "Rei", "Torre", "Cavalo"],
        response: "Rainha",
      },
      {
        question:
          "Qual é a única peça do xadrez que não pode se mover para trás?",
        options: ["Peão", "Cavalo", "Torre", "Rainha"],
        response: "Peão",
      },
    ],
  },
  {
    category: "Valorant",
    foto: "/vava.png",
    questions: [
      {
        question:
          "Qual é o nome do mapa de Valorant que apresenta um ambiente urbano na Coreia do Sul?",
        options: ["Bind", "Haven", "Split", "Icebox"],
        response: "Split",
      },
      {
        question:
          "Qual agente de Valorant tem habilidades relacionadas à cura?",
        options: ["Phoenix", "Sage", "Jett", "Omen"],
        response: "Sage",
      },
      {
        question:
          "Qual é o nome do modo de jogo em Valorant em que uma equipe planta a Spike e a outra equipe tenta desarmá-la?",
        options: ["Demolition", "Defuse", "Spike Rush", "Strike"],
        response: "Defuse",
      },
      {
        question:
          "Qual arma de Valorant é uma pistola automática que dispara três tiros por vez?",
        options: ["Ghost", "Sheriff", "Shorty", "Frenzy"],
        response: "Frenzy",
      },
      {
        question:
          "Qual é o nome do agente de Valorant que pode criar portais teleportadores?",
        options: ["Cypher", "Breach", "Raze", "Yoru"],
        response: "Yoru",
      },
      {
        question:
          "Qual é a distância máxima que o dardo de reconhecimento de Sova pode percorrer?",
        options: ["30 metros", "50 metros", "80 metros", "100 metros"],
        response: "80 metros",
      },
      {
        question:
          "Qual é o nome do mapa de Valorant que possui um cenário inspirado em um deserto?",
        options: ["Bind", "Ascent", "Icebox", "Haven"],
        response: "Haven",
      },
      {
        question: "Qual é a habilidade ultimate de Viper em Valorant?",
        options: ["Pit Viper", "Toxic Screen", "Poison Cloud", "Viper's Pit"],
        response: "Viper's Pit",
      },
      {
        question:
          "Qual agente de Valorant tem a habilidade de se camuflar em uma sombra e se teletransportar?",
        options: ["Omen", "Viper", "Reyna", "Jett"],
        response: "Omen",
      },
      {
        question:
          "Qual é o nome da arma de Valorant que dispara dardos explosivos em área?",
        options: ["Bulldog", "Marshal", "Odin", "Launcher"],
        response: "Launcher",
      },
    ],
  },
];

const sendDataToFirebase = async () => {
  try {
    for (const item of data) {
      const categoryRef = ref(db, "quizCollection/" + item.category);

      await set(child(categoryRef, "questions"), item.questions);
    }
  } catch (error) {
    console.error(
      "Erro ao enviar dados para o banco de dados Firebase:",
      error
    );
  }
};

sendDataToFirebase();

export default data;
