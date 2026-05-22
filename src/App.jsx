import React, { useState, useMemo } from 'react';
import { 
  MapPin, Clock, Footprints, Train, Bike, Compass, 
  Sparkles, Utensils, Coffee, Beer, Camera, Info, 
  Calendar, ChevronRight, CheckCircle2, Navigation, AlertCircle,
  ArrowRight, Landmark, ExternalLink, X, DollarSign, Archive, Tag
} from 'lucide-react';

const SPOTS_DATA = {
  1: { id: 1, name: "The BeerLab Rooftop", category: "drink", tag: "Vida Noturna", tagColor: "bg-purple-100 text-purple-800 border-purple-200", visitTime: 60, price: "€€", address: "Rue de l'Ecuyer 50, 1000 Bruxelles", tip: "Experimente a tábua de degustação de cervejas artesanais belgas. O espaço é aquecido no inverno.", desc: "Rooftop moderno com uma excelente seleção de cervejas artesanais belgas e vista panorâmica sobre o centro histórico.", lat: 53, lng: 49 },
  2: { id: 2, name: "Secret Rooftop By Warwick", category: "drink", visitTime: 60, price: "€€€", address: "Rue Duquesnoy 5, 1000 Bruxelles (Warwick)", tip: "Tem uma das melhores perspectivas aéreas da torre da Grand Place iluminada. Ideal para cocktails de assinatura.", desc: "Rooftop exclusivo e sofisticado situado num dos hotéis mais conceituados, a poucos passos da Grand Place.", lat: 52, lng: 51 },
  3: { id: 3, name: "Rooftop 58", category: "views", tag: "Arquitetura", tagColor: "bg-cyan-100 text-cyan-800 border-cyan-200", visitTime: 40, price: "Grátis", address: "Rue de l'Evêque 1, 1000 Bruxelles (Brucity)", tip: "A entrada no terraço público é gratuita! Suba diretamente pelos elevadores dedicados no lobby principal.", desc: "O maior terraço público e jardim panorâmico sussegado de Bruxelas, com uma deslumbrante vista de 360 graus.", lat: 48, lng: 42 },
  4: { id: 4, name: "WOLF Sharing Food Market 🐺", category: "food", tag: "Jantar", tagColor: "bg-rose-100 text-rose-800 border-rose-200", visitTime: 75, price: "€€", address: "Rue de Fossé aux Loups 50, 1000 Bruxelles", tip: "Há opções de sushi, massas, waffles, comida síria e uma microcervejaria própria no centro do mercado.", desc: "Mercado gastronómico moderno com 17 bancas de comida internacional vibrantes, focado na sustentabilidade.", lat: 49, lng: 40 },
  5: { id: 5, name: "Fresque Dinosaure", category: "culture", tag: "Arte Urbana", tagColor: "bg-indigo-100 text-indigo-800 border-indigo-200", visitTime: 15, price: "Grátis", address: "Rue du Chêne, 1000 Bruxelles", tip: "Este fresco fica muito perto do Manneken Pis, sendo ótimo para combinar as duas visitas.", desc: "Um dos murais de banda desenhada de Bruxelas, prestando homenagem à paleontologia e aos dinossauros.", lat: 43, lng: 47 },
  6: { id: 6, name: "Église Notre-Dame au Sablon", category: "culture", tag: "Património", tagColor: "bg-amber-100 text-amber-800 border-amber-200", visitTime: 35, price: "Grátis", address: "Rue de la Régence 3b, 1000 Bruxelles", tip: "Repare nos vitrais monumentais que chegam a ter 14 metros de altura. A entrada é livre.", desc: "Uma deslumbrante igreja gótica do século XV, famosa pela sua arquitetura exterior ornamentada no prestigiado Sablon.", lat: 54, lng: 63 },
  7: { id: 7, name: "Palácio Real de Bruxelas", category: "culture", tag: "Monumento", tagColor: "bg-blue-100 text-blue-800 border-blue-200", visitTime: 60, price: "Grátis", address: "Rue de la Loi 16, 1000 Bruxelles", tip: "O palácio abre as portas ao público no interior apenas durante o verão (fim de julho a início de setembro).", desc: "A imponente residência oficial de trabalho do Rei dos Belgas, localizada em frente ao Parque de Bruxelas.", lat: 63, lng: 58 },
  8: { id: 8, name: "Woodpecker Parc Royal", category: "food", tag: "Almoço", tagColor: "bg-orange-100 text-orange-800 border-orange-200", visitTime: 50, price: "€€", address: "Parc de Bruxelles, 1000 Bruxelles", tip: "Peça uma das famosas waffles salgadas com ovo ou um iced coffee e sente-se nas espreguiçadeiras.", desc: "Quiosque muito popular no coração do Parque de Bruxelas, ideal para um almoço descontraído ou lanche ao ar livre.", lat: 62, lng: 53 },
  9: { id: 9, name: "Catedral de São Miguel", category: "culture", tag: "Património", tagColor: "bg-amber-100 text-amber-800 border-amber-200", visitTime: 40, price: "Grátis", address: "Place Sainte-Gudule, 1000 Bruxelles", tip: "Pode visitar a cripta românica subterrânea por um pequeno custo adicional (cerca de 3€).", desc: "Majestosa catedral gótica nacional que remonta ao século XI, com imponentes torres gémeas.", lat: 55, lng: 47 },
  10: { id: 10, name: "Delirium Café", category: "drink", tag: "Vida Noturna", tagColor: "bg-purple-100 text-purple-800 border-purple-200", visitTime: 60, price: "€€", address: "Impasse de la Fidélité 4, 1000 Bruxelles", tip: "Fica numa ruela estreita mesmo em frente à Jeanneke Pis. O bar subterrâneo tem a maior carta de cervejas.", desc: "O bar mais lendário da Bélgica, no Livro do Guinness pela sua coleção com mais de 2.000 variedades de cervejas.", lat: 50, lng: 47 },
  11: { id: 11, name: "Maison Hannon", category: "culture", tag: "Arquitetura", tagColor: "bg-cyan-100 text-cyan-800 border-cyan-200", visitTime: 60, price: "€10 - €12", address: "Avenue de la Jonction 1, 1060 Saint-Gilles", tip: "Compre o bilhete online com antecedência, pois o espaço é pequeno e as entradas por hora são controladas.", desc: "Uma das obras-primas da Art Nouveau de Bruxelas, construída em 1903 e convertida num lindíssimo museu.", lat: 40, lng: 85 },
  12: { id: 12, name: "De Munt/La Monnaie", category: "culture", tag: "Património", tagColor: "bg-amber-100 text-amber-800 border-amber-200", visitTime: 20, price: "Grátis (Exterior)", address: "Place de la Monnaie, 1000 Bruxelles", tip: "A praça em frente é um ponto habitual de músicos de rua. Foi aqui que se despoletou a revolução de 1830.", desc: "A prestigiada Ópera Nacional da Bélgica. Um edifício neoclássico de grande importância histórica.", lat: 49, lng: 44 },
  13: { id: 13, name: "Botanique", category: "culture", tag: "Natureza", tagColor: "bg-emerald-100 text-emerald-800 border-emerald-200", visitTime: 45, price: "€€", address: "Rue Royale 236, 1210 Saint-Josse-ten-Noode", tip: "O Botanique é hoje um dos centros de concertos alternativos e exposições de fotografia mais conceituados.", desc: "Antigo complexo de estufas do Jardim Botânico Real, reconvertido num dinâmico centro cultural.", lat: 63, lng: 35 },
  14: { id: 14, name: "Gare Maritime", category: "views", tag: "Arquitetura", tagColor: "bg-cyan-100 text-cyan-800 border-cyan-200", visitTime: 60, price: "Grátis", address: "Rue de Picardie 7, 1080 Molenbeek-Saint-Jean", tip: "Tem uma arquitetura de madeira espetacular e jardins interiores que funcionam como um ecossistema sustentável.", desc: "Uma monumental e antiga estação ferroviária de mercadorias restaurada de forma sustentável de Tour & Taxis.", lat: 35, lng: 25 },
  15: { id: 15, name: "Le Roi de la Gaufre", category: "food", tag: "Snack/Doce", tagColor: "bg-pink-100 text-pink-800 border-pink-200", visitTime: 20, price: "€", address: "Rue Neuve 70, 1000 Bruxelles", tip: "Peça uma 'Gaufre de Liège' simples, morna. O açúcar perolado caramelizado na massa dispensa coberturas.", desc: "Uma das pastelarias de waffles de rua mais concorridas, famosa por servir as autênticas waffles quentes.", lat: 52, lng: 47 },
  16: { id: 16, name: "La Fabbrica", category: "food", tag: "Almoço", tagColor: "bg-orange-100 text-orange-800 border-orange-200", visitTime: 50, price: "€€", address: "Avenue du Port 86C, 1000 Bruxelles", tip: "É muito famosa pelo brunch italiano de domingo. Recomenda-se reservar mesa com antecedência.", desc: "Restaurante italiano localizado nos armazéns industriais históricos reabilitados de Tour & Taxis.", lat: 34, lng: 24 },
  17: { id: 17, name: "Chez Léon", category: "food", tag: "Jantar", tagColor: "bg-rose-100 text-rose-800 border-rose-200", visitTime: 80, price: "€€ - €€€", address: "Rue dos Bouchers 18, 1000 Bruxelles", tip: "Peça o clássico 'Formule Léon': mexilhões cozinhados em aipo e manteiga, batatas fritas e cerveja Léon.", desc: "Fundado em 1893, é o restaurante mais famoso do mundo para degustar os autênticos 'Moules-Frites' belgas.", lat: 50, lng: 48 },
  18: { id: 18, name: "La Friterie", category: "food", tag: "Snack/Fritos", tagColor: "bg-pink-100 text-pink-800 border-pink-200", visitTime: 25, price: "€", address: "Place de la Chapelle, 1000 Bruxelles", tip: "Peça o cone de batatas com molho 'Andalouse' ou 'Samouraï' para a verdadeira experiência típica de rua.", desc: "Quiosque tradicional belga ao ar livre, servindo as famosas e estaladiças batatas fritas belgas.", lat: 49, lng: 49 },
  19: { id: 19, name: "Cups & Rolls", category: "food", tag: "Snack/Doce", tagColor: "bg-pink-100 text-pink-800 border-pink-200", visitTime: 30, price: "€", address: "Rue de la Madeleine 39, 1000 Bruxelles", tip: "O cinnamon roll vegan deles é maravilhoso. Combine com um Flat White de café de especialidade.", desc: "Uma charmosa e acolhedora cafetaria perto da estação central, celebrada pelos seus rolos de canela artesanais.", lat: 53, lng: 48 },
  20: { id: 20, name: "Galeries Royales", category: "culture", tag: "Património", tagColor: "bg-amber-100 text-amber-800 border-amber-200", visitTime: 50, price: "Grátis", address: "Galerie du Roi 5, 1000 Bruxelles", tip: "Aqui encontram-se as lojas originais de chocolateiros históricos como a Neuhaus e Mary.", desc: "Inauguradas em 1847, são das primeiras galerias comerciais cobertas da Europa, com grandiosos tetos de vidro.", lat: 51, lng: 48 },
  21: { id: 21, name: "Atomium", category: "views", tag: "Monumento", tagColor: "bg-blue-100 text-blue-800 border-blue-200", visitTime: 90, price: "€16 - €20", address: "Square de l'Atomium, 1020 Bruxelles", tip: "Apanhe o elevador rápido para a esfera superior e aprecie as escadas rolantes futuristas com luzes LED.", desc: "O monumento futurista de Bruxelas, representando um cristal de ferro ampliado 165 mil milhões de vezes.", lat: 20, lng: 10 },
  22: { id: 22, name: "Parque do Cinquentenário", category: "parks", tag: "Natureza", tagColor: "bg-emerald-100 text-emerald-800 border-emerald-200", visitTime: 60, price: "Grátis", address: "Parque do Cinquentenário, 1000 Bruxelles", tip: "Pode subir gratuitamente ao topo do Arco do Triunfo passando por dentro do Museu Militar Real.", desc: "Um imponente parque urbano monumental dominado por um gigantesco arco triunfal construído em 1880.", lat: 85, lng: 55 },
  23: { id: 23, name: "Halle Gate", category: "culture", tag: "Património", tagColor: "bg-amber-100 text-amber-800 border-amber-200", visitTime: 45, price: "€7 - €9", address: "Boulevard du Midi, 1000 Bruxelles", tip: "No interior, há um museum medieval interativo. Por fora, o castelo parece saído de um conto de fadas.", desc: "Uma imponente porta fortificada do século XIV, último vestígio das muralhas medievais da cidade.", lat: 46, lng: 75 },
  24: { id: 24, name: "La Bellone", category: "culture", tag: "Arquitetura", tagColor: "bg-cyan-100 text-cyan-800 border-cyan-200", visitTime: 40, price: "Grátis", address: "Rue de Flandre 46, 1000 Bruxelles", tip: "A deslumbrante fachada barroca de 1697 fica escondida e protegida sob um moderno teto de vidro.", desc: "Um lindíssimo centro de arts performativas escondido num pátio interior atrás de uma fachada barroca.", lat: 42, lng: 45 },
  25: { id: 25, name: "Belgian Waffles & Brunch", category: "food", tag: "Brunch", tagColor: "bg-violet-100 text-violet-800 border-violet-200", visitTime: 50, price: "€€", address: "Rue de Flandre 2, 1000 Bruxelles", tip: "Peça a waffle de brunch salgada com abacate e ovo escalfado. As porções são generosas.", desc: "Um café especializado em brunchs criativos baseados em waffles tradicionais doces e salgadas.", lat: 48, lng: 51 },
  26: { id: 26, name: "Basilica de Koekelberg", category: "culture", tag: "Monumento", tagColor: "bg-blue-100 text-blue-800 border-blue-200", visitTime: 50, price: "Grátis", address: "Parvis de la Basilica, 1083 Koekelberg", tip: "Suba de elevador até à plataforma exterior da cúpula a 53 metros para vistas desimpedidas.", desc: "A quinta maior igreja do mundo, uma colossal basílica católica em imponente estilo Art Déco.", lat: 15, lng: 30 },
  27: { id: 27, name: "The View - Roda Gigante", category: "views", tag: "Monumento", tagColor: "bg-blue-100 text-blue-800 border-blue-200", visitTime: 40, price: "€8 - €10", address: "Place Poelaert, 1000 Bruxelles", tip: "Fica na praça do Palácio da Justiça. Excelente para ver o pôr do sol sobre a cidade.", desc: "A grande roda gigante de Bruxelas, oferecendo cabines climatizadas com vista aérea soberba.", lat: 51, lng: 68 }
};

const START_POINT = { name: "Ponto de Partida Central (Grand Place)", lat: 50, lng: 50 };

const TRANSIT_ROUTES = {
  0: {
    0: { type: "Metro", line: "M1", label: "Metro 1", code: "M1", color: "bg-[#0055A5] text-white", desc: "A pé até Gare Centrale. Apanhe o Metro Linha 1 ou 5 até De Brouckère." },
    1: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Caminhe pelas galerias históricas em direção à Catedral (5 min)." },
    2: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Desça a colina em direção à Ópera De Munt/La Monnaie (4 min)." },
    3: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Atravesse a praça até ao edifício Brucity (Rooftop 58)." },
    4: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Caminhe cerca de 200m até ao WOLF Sharing Food Market." },
    5: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Caminhe pela Rue de l'Ecuyer até à Impasse de la Fidélité." },
    6: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Rua pedonal ao lado da Grand Place." },
    7: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Atravesse a rua em direção à Rue dos Bouchers." },
    8: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Caminhe em direção à Place de la Chapelle (5 min)." },
    9: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Regresse ao centro pedonal em direção ao Hotel Warwick." }
  },
  1: {
    0: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Caminhada de 5 minutos da Grand Place até à Rue de Flandre." },
    1: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Caminhe pelas ruelas charmosas até à fachada de La Bellone." },
    2: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Dirija-se à Rue du Chêne para admirar o fresco do Dinossauro." },
    3: { type: "Elétrico", line: "T92", label: "Tram 92", code: "T92", color: "bg-[#E30613] text-white", desc: "Apanhe na paragem 'Royale' até 'Palais' (Parque de Bruxelas)." },
    4: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Atravesse o Parque de Bruxelas a pé até ao Palácio Real." },
    5: { type: "Elétrico", line: "T92", label: "Tram 92", code: "T92", color: "bg-[#E30613] text-white", desc: "Embarque na paragem 'Palais' até 'Petit Sablon' (Igreja)." },
    6: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Caminhe pela Rue de la Régence até à Roda Gigante (Poelaert)." },
    7: { type: "Metro", line: "M6", label: "Metro 6", code: "M6", color: "bg-[#F39200] text-slate-900", desc: "Embarque na estação Louise até 'Porte de Hal'." },
    8: { type: "Elétrico", line: "T81", label: "Tram 81", code: "T81", color: "bg-[#E30613] text-white", desc: "Embarque em Porte de Hal até 'Janson' (Maison Hannon)." },
    9: { type: "Metro", line: "M2", label: "Metro 2", code: "M2", color: "bg-[#F39200] text-slate-900", desc: "Tram até Louise, depois Metro Linha 2 até à estação Botanique." },
    10: { type: "Metro", line: "M1", label: "Metro 1", code: "M1", color: "bg-[#0055A5] text-white", desc: "Apanhe o Metro na estação Schuman até à paragem Merode." },
    11: { type: "Metro", line: "M5", label: "Metro 5", code: "M5", color: "bg-[#0055A5] text-white", desc: "Embarque na estação Merode até Gare Centrale." },
    12: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Desça pela Rue de la Colline até ao Cups & Rolls." }
  },
  2: {
    0: { type: "Metro", line: "M6", label: "Metro 6", code: "M6", color: "bg-[#F39200] text-slate-900", desc: "A pé até Gare Centrale, Metro Linha 1/5 até Arts-Loi, depois Linha 6 até Simonis." },
    1: { type: "Metro", line: "M6", label: "Metro 6", code: "M6", color: "bg-[#F39200] text-slate-900", desc: "Embarque na estação Simonis até Heysel (Atomium)." },
    2: { type: "Autocarro", line: "B88", label: "Bus 88", code: "B88", color: "bg-[#009E7E] text-white", desc: "Apanhe na paragem 'Heysel' até 'Tour & Taxis' (Gare Maritime)." },
    3: { type: "A pé", line: "Caminhada", label: "Pedonal", code: "🚶", color: "bg-slate-200 text-slate-700", desc: "Caminhada curta de 2 minutos dentro do complexo até ao restaurante." }
  }
};

const ITINERARY_DAYS = [
  { day: "Sexta-feira", startTime: "14:00", title: "O Coração Histórico e Vistas Noturnas", description: "Explore as joias do centro da cidade, galerias majestosas, ruelas medievais e termine num terraço panorâmico.", spots: [20, 9, 12, 3, 4, 10, 15, 17, 18, 2] },
  { day: "Sábado", startTime: "09:00", title: "Parques Imperiais, Arte e Sabores Belgas", description: "Do quarteirão de Dansaert ao bairro real, Sablon, sul de Saint-Gilles e o imponente Cinquentenário.", spots: [25, 24, 5, 8, 7, 6, 27, 23, 11, 13, 22, 1, 19] },
  { day: "Domingo", startTime: "09:00", title: "Arquitetura Monumental, Futuro e Gare", description: "Manhã focada nos monumentos fora do centro: Basílica, Atomium e complexo de Tour & Taxis até às 14:00.", spots: [26, 21, 14, 16] }
];

function addMinutesToTime(timeStr, minsToAdd) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const totalMins = hours * 60 + minutes + minsToAdd;
  const newHours = Math.floor(totalMins / 60) % 24;
  const newMins = totalMins % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}

const getCategoryColor = (category) => {
  switch (category) {
    case 'food': return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'drink': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'views': return 'bg-purple-100 text-purple-800 border-purple-300';
    default: return 'bg-blue-100 text-blue-800 border-blue-300';
  }
};

const getCategoryName = (category) => {
  switch (category) {
    case 'food': return 'Gastronomia';
    case 'drink': return 'Cerveja & Rooftops';
    case 'views': return 'Vistas & Pontos de Interesse';
    default: return 'Cultura & Arquitetura';
  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'food': return <Utensils className="w-5 h-5" />;
    case 'drink': return <Beer className="w-5 h-5" />;
    case 'views': return <Camera className="w-5 h-5" />;
    default: return <Compass className="w-5 h-5" />;
  }
};

export default function App() {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [travelMode, setTravelMode] = useState('transit');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [visitedSpots, setVisitedSpots] = useState({});
  const [archivedSpots, setArchivedSpots] = useState({});

  const speedFactors = {
    transit: { name: "Transportes", icon: "🚇", desc: "Metro, Elétrico e Autocarros integrados com linhas reais de Bruxelas." },
    walk: { name: "A pé", icon: "🚶", desc: "Aprecie a arquitetura e detalhes de Bruxelas no centro histórico." },
    bike: { name: "Bicicleta", icon: "🚲", desc: "Desloque-se de forma ecológica pelas ciclovias da cidade." }
  };

  const activeDay = ITINERARY_DAYS[activeDayIndex];

  const activeSpotsForDay = useMemo(() => {
    return activeDay.spots.filter(id => !archivedSpots[id]);
  }, [activeDayIndex, archivedSpots]);

  const archivedSpotsForDay = useMemo(() => {
    return activeDay.spots.filter(id => archivedSpots[id]);
  }, [activeDayIndex, archivedSpots]);

  const routeStats = useMemo(() => {
    let totalDistanceKm = 0;
    let totalTimeMin = 0;
    const steps = [];

    let currentLoc = START_POINT;
    let currentTime = activeDay.startTime;

    activeSpotsForDay.forEach((spotId, index) => {
      const spot = SPOTS_DATA[spotId];
      if (!spot) return;

      const dx = spot.lat - currentLoc.lat;
      const dy = spot.lng - currentLoc.lng;
      const gridDist = Math.sqrt(dx * dx + dy * dy);
      const distKm = parseFloat((gridDist * 0.15).toFixed(1));

      let durationMin = Math.round(gridDist * (travelMode === 'transit' ? 0.5 : travelMode === 'walk' ? 1.2 : 0.35));
      if (travelMode === 'transit' && distKm > 0.5) {
        durationMin += 5;
      }
      if (durationMin < 2) durationMin = 3;

      totalDistanceKm += distKm;
      totalTimeMin += durationMin;

      const arrivalTime = addMinutesToTime(currentTime, durationMin);
      const departureTime = addMinutesToTime(arrivalTime, spot.visitTime);

      const transitInfo = TRANSIT_ROUTES[activeDayIndex]?.[index] || { type: "A pé", label: "Caminhada", code: "WALK", color: "bg-slate-200 text-slate-700", desc: "Trajeto pedonal curto." };

      steps.push({
        from: currentLoc.name,
        to: spot,
        distance: distKm,
        duration: durationMin,
        arrivalTime,
        departureTime,
        visitTime: spot.visitTime,
        transit: transitInfo
      });

      currentTime = departureTime;
      currentLoc = spot;
    });

    return {
      steps,
      totalDistanceKm: parseFloat(totalDistanceKm.toFixed(1)),
      totalTimeMin,
      endTime: currentTime
    };
  }, [activeDayIndex, travelMode, activeSpotsForDay]);

  const toggleVisited = (spotId) => {
    setVisitedSpots(prev => ({ ...prev, [spotId]: !prev[spotId] }));
  };

  const toggleArchived = (spotId) => {
    setArchivedSpots(prev => ({ ...prev, [spotId]: !prev[spotId] }));
    if (selectedSpot && selectedSpot.id === spotId) {
      setSelectedSpot(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <header className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white py-8 px-4 shadow-lg text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Planeador Otimizado de Viagem
            </span>
            <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">Bruxelas Express 🇧🇪</h1>
            <p className="text-slate-300 mt-1.5 text-xs md:text-sm max-w-2xl">
              Roteiro de 3 dias de sexta-feira (a partir das 14h) a domingo (até às 14h) pelos 27 pontos turísticos pretendidos.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-right hidden md:block">
            <p className="text-3xs text-slate-300 font-bold uppercase">Ponto de Encontro Fixo</p>
            <p className="text-xs font-black text-amber-300 mt-0.5">📍 Grand Place / Centro</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">Escolha o Dia</h3>
            <div className="flex flex-col gap-2">
              {ITINERARY_DAYS.map((dayData, index) => {
                const activeCount = dayData.spots.filter(id => !archivedSpots[id]).length;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveDayIndex(index);
                      setSelectedSpot(null);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all text-left ${
                      activeDayIndex === index ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <span className="text-3xs opacity-80 uppercase font-black block">Dia {index + 1}</span>
                      <span className="font-extrabold text-base">{dayData.day}</span>
                      <span className="text-3xs block opacity-90">
                        {dayData.day === "Domingo" ? "09:00 - 14:00 (Fim Limite)" : `Partida: \${dayData.startTime}h`}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-black/10 font-bold">{activeCount} ativos</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Modo de Deslocação</h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(speedFactors).map((mode) => {
                const isSelected = travelMode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => setTravelMode(mode)}
                    className={`flex flex-col items-center p-3 rounded-xl border transition-all text-center ${
                      isSelected ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold' : 'border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl mb-1">{speedFactors[mode].icon}</span>
                    <span className="text-2xs">{speedFactors[mode].name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-3xs font-black uppercase tracking-wider text-slate-400">Resumo de {activeDay.day}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-3xs text-slate-400 font-bold uppercase">Distância Total</p>
                <p className="text-xl font-black text-indigo-300 mt-1">{activeSpotsForDay.length > 0 ? routeStats.totalDistanceKm : 0} km</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-3xs text-slate-400 font-bold uppercase">Término Estimado</p>
                <p className="text-xl font-black text-amber-300 mt-1">{activeSpotsForDay.length > 0 ? routeStats.endTime : activeDay.startTime}</p>
              </div>
            </div>
            {activeDay.day === "Domingo" && activeSpotsForDay.length > 0 && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-2xs text-rose-300">
                ⚠️ Ajustado para terminar às <strong>{routeStats.endTime}</strong>, respeitando o seu limite das 14:00.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-800 text-2xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                {activeDay.day}
              </span>
              <h2 className="text-lg font-black">{activeDay.title}</h2>
            </div>
            <p className="text-slate-500 text-xs md:text-sm mt-1">{activeDay.description}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-6">Linha de Tempo de Visitas</h3>

            {activeSpotsForDay.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <span className="text-4xl block">📭</span>
                <p className="font-bold mt-2">Nenhuma atividade ativa hoje.</p>
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 before:right-auto before:w-0.5 before:bg-slate-200/60 before:h-[95%] before:my-auto">
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-rose-50 border-2 border-rose-300 flex items-center justify-center text-lg shrink-0 shadow-sm">
                    🎯
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-3xs text-rose-500 font-black uppercase block">Partida</span>
                    <h4 className="font-extrabold text-sm text-slate-900">{START_POINT.name}</h4>
                    <p className="text-3xs text-slate-400 mt-0.5">Saída pontual às {activeDay.startTime}h</p>
                  </div>
                </div>

                {routeStats.steps.map((step, index) => {
                  const isCompleted = visitedSpots[step.to.id];
                  return (
                    <div key={index} className="space-y-4">
                      
                      {/* INDICAÇÃO DE TRAJETO MINIMALISTA E DISCRETA (SEM TRUNCATE / CORTES) */}
                      <div className="pl-6 pr-2 py-0.5 relative">
                        <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3 text-slate-500 text-3xs md:text-2xs pl-6 relative">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-black tracking-tight ${travelMode === 'transit' ? step.transit.color : 'bg-slate-200 text-slate-700'}`}>
                              {travelMode === 'transit' ? step.transit.code : "A PÉ"}
                            </span>
                            <span className="font-bold text-slate-700">
                              {travelMode === 'transit' ? step.transit.label : "Caminhada"}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="font-semibold text-indigo-600 bg-indigo-50/50 px-1.5 py-0.5 rounded">
                              {step.duration} min ({step.distance} km)
                            </span>
                          </div>
                          
                          {/* Corrigido: Removido 'truncate' e adicionado 'break-words' para leitura completa no telemóvel */}
                          <p className="text-slate-400 leading-relaxed italic break-words flex-1">
                            {travelMode === 'transit' ? step.transit.desc : "Trajeto sugerido pelas vias públicas."}
                          </p>
                        </div>
                      </div>

                      {/* CARD DA ATIVIDADE COM AS SUAS RESPECTIVAS TAGS */}
                      <div className="flex items-start gap-4 relative z-10 p-4 rounded-xl border border-slate-100 bg-white shadow-3xs hover:shadow-2xs transition-all">
                        <button 
                          onClick={() => toggleVisited(step.to.id)}
                          className={`w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center shrink-0 font-bold transition-all ${isCompleted ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm shadow-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}
                        >
                          {isCompleted ? "✓" : index + 1}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-3xs font-black px-1.5 py-0.5 rounded">
                                  🕒 {step.arrivalTime} - {step.departureTime}
                                </span>
                                {/* TAG DO TIPO DE ATIVIDADE COM CORES DEDICADAS */}
                                <span className={`text-3xs font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${step.to.tagColor}`}>
                                  <Tag className="w-2.5 h-2.5" />
                                  {step.to.tag}
                                </span>
                              </div>
                              <h4 className="font-black text-slate-900 text-base leading-tight cursor-pointer hover:text-indigo-600 transition-colors truncate" onClick={() => setSelectedSpot(step.to)}>
                                {step.to.name}
                              </h4>
                              <p className="text-3xs text-slate-400 truncate flex items-center gap-1">📍 {step.to.address}</p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button onClick={() => toggleArchived(step.to.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Arquivar">🗑️</button>
                              <button onClick={() => setSelectedSpot(step.to)} className="text-3xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-black px-2.5 py-2 rounded-lg transition-all border border-indigo-100">Detalhes</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Secção de Arquivados */}
          {archivedSpotsForDay.length > 0 && (
            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-500">Atividades Arquivadas ({archivedSpotsForDay.length})</h4>
              <p className="text-3xs text-slate-500 leading-relaxed">Estas atividades foram omitidas da rota ativa hoje. Pode restaurá-las para atualizar os horários.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {archivedSpotsForDay.map(id => {
                  const spot = SPOTS_DATA[id];
                  if (!spot) return null;
                  return (
                    <div key={spot.id} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium uppercase shrink-0 ${spot.tagColor}`}>{spot.tag}</span>
                        <span className="font-bold text-xs truncate text-slate-700">{spot.name}</span>
                      </div>
                      <button 
                        onClick={() => toggleArchived(spot.id)}
                        className="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 text-3xs font-black px-2.5 py-1 rounded-lg transition-all shrink-0"
                      >
                        Restaurar
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Janela Modal de Detalhes */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-6 text-white relative">
              <button onClick={() => setSelectedSpot(null)} className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all font-bold">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${selectedSpot.tagColor}`}>
                  {selectedSpot.tag}
                </span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Spot #{selectedSpot.id}
                </span>
              </div>
              <h3 className="text-xl font-black mt-3 leading-tight">
                {selectedSpot.name}
              </h3>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div>
                <h4 className="text-3xs font-bold uppercase text-slate-400 tracking-wider">Sobre o Local</h4>
                <p className="text-slate-700 text-sm mt-1 leading-relaxed">{selectedSpot.desc}</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-amber-900 text-xs uppercase tracking-wide">Dica de Especialista</h5>
                  <p className="text-amber-950 text-xs mt-0.5 leading-relaxed">{selectedSpot.tip}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-3xs font-bold text-slate-400 uppercase flex items-center gap-1 tracking-wider"><MapPin className="w-3 h-3 text-indigo-500" /> Endereço</span>
                  <p className="font-bold text-slate-800 mt-1.5 leading-tight">{selectedSpot.address}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-3xs font-bold text-slate-400 uppercase flex items-center gap-1 tracking-wider"><DollarSign className="w-3 h-3 text-indigo-500" /> Preço Médio</span>
                  <p className="font-bold text-slate-800 mt-1.5 leading-tight">{selectedSpot.price}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-3xs font-bold text-slate-400 uppercase flex items-center gap-1 tracking-wider"><Clock className="w-3 h-3 text-indigo-500" /> Permanência</span>
                  <p className="font-bold text-slate-800 mt-1.5 leading-tight">{selectedSpot.visitTime} minutos</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-3xs font-bold text-slate-400 uppercase flex items-center gap-1 tracking-wider"><CheckCircle2 className="w-3 h-3 text-indigo-500" /> O Seu Progresso</span>
                  <button 
                    onClick={() => toggleVisited(selectedSpot.id)}
                    className={`mt-1.5 text-3xs font-black py-1 px-2.5 rounded transition-all uppercase tracking-wider ${visitedSpots[selectedSpot.id] ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    {visitedSpots[selectedSpot.id] ? 'Concluído' : 'Marcar como Lido'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 border-t border-slate-100 flex gap-3">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedSpot.name + ", " + selectedSpot.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black py-3 px-4 rounded-xl shadow-md text-center flex items-center justify-center gap-1.5 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir no Google Maps</span>
              </a>
              <button 
                onClick={() => toggleArchived(selectedSpot.id)}
                className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-1 transition-all"
              >
                <Archive className="w-3.5 h-3.5 text-rose-600" />
                <span>Arquivar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
