const CLINICAL_STAGES = [
  { id: "critico", label: "Crítico", minHp: 0, maxHp: 39 },
  { id: "moderado", label: "Moderado", minHp: 40, maxHp: 69 },
  { id: "remissao", label: "Em remissão", minHp: 70, maxHp: 89 },
  { id: "curado", label: "Curado", minHp: 90, maxHp: 100 }
];

const state = {
  phase: 1,
  gameStarted: false,
  playTimeSeconds: 0,
  day: 1,
  dayClockMinutes: 8 * 60,
  awaitingRestChoice: false,
  blackoutCount: 0,
  nextBlackoutUnsleptMinutes: 30 * 60,
  nextExhaustionAlertUnsleptMinutes: 24 * 60,
  exhaustionAlertLevel: 0,
  blackoutActive: false,
  collapsePending: false,
  dayItemSnapshot: {},
  currentCityId: "valedouro",
  currentAreaId: "estabulo",
  dayAttendances: 0,
  churchActionsToday: 0,
  faithVisits: 0,
  faithPoints: 0,
  faithTier: 0,
  confessions: 0,
  hasConfessed: false,
  religiousCareerThoughtsShown: false,
  prayerUnlockedNotified: false,
  persecutionLevel: 0,
  outsideChurchMinutes: 0,
  churchInsistenceAtMaxPersecution: 0,
  churchDreadManifestLevel: 0,
  bloodStainLevel: 0,
  bloodStainDecayBudget: 0,
  persecutionCooling: false,
  hospitalNeglectMinutes: 0,
  hospitalNeglectAlerts: 0,
  freeCareResolved: 0,
  benevolenceTier: 0,
  shopDiscountPercent: 0,
  plagueTrendLevel: 0,
  travelEncounter: null,
  rareBandageKits: 0,
  sacredMedallions: 0,
  alchemicalSerums: 0,
  valedouroSeals: 0,
  brumasulCorals: 0,
  pedrafriaShards: 0,
  blackCouncilSeals: 0,
  onyxKeys: 0,
  paleAmpoules: 0,
  sacredBibles: 0,
  rosaries: 0,
  actionHistory: [],
  dialogueSeed: 0,
  actionMixCounters: {},
  pendingDialogue: null,
  dialogueChoicesMade: 0,
  resolvedCases: 0,
  cured: 0,
  deaths: 0,
  consecutiveDeaths: 0,
  abandoned: 0,
  released: 0,
  relapses: 0,
  refusedPoor: 0,
  currentPatient: null,
  phase1Target: 8,
  playerLife: 100,
  playerMaxLife: 100,
  popularity: 50,
  popularityPhase2Threshold: 85,
  coins: 20,
  minPatientPayment: 6,
  tonics: 0,
  antiPlaguePotions: 0,
  doctorInfected: false,
  doctorInfectionSeverity: 0,
  hasRecoveredFromPlague: false,
  faithPromiseType: "",
  faithPromiseBroken: false,
  medicalVowUntilDay: 0,
  faithMiracleUses: 0,
  faithBrokenCycles: 0,
  faithMiracleDreamPending: false,
  maskInvitePending: false,
  maskInvitations: 0,
  maskEventActive: false,
  maskFastForwardActive: false,
  maskBallStage: 0,
  maskBallClues: 0,
  maskBallInteractions: 0,
  maskBallItems: [],
  maskBallApex: false,
  maskHostName: "Sr. Severin Vesper",
  maskTriggerResolved: false,
  phase2DreamPending: false,
  phase2DreamActive: false,
  phase2DreamResolved: false,
  phase2DreamArmed: false,
  phase2Boon: null,
  phase2PendingTrigger: false,
  residentialUnlockedByCity: {},
  residentialIntelByCity: {},
  residentialSelectedHouseId: "",
  mapMenuOpen: false,
  mapSelectedCityId: "valedouro",
  miniMapSceneKey: "",
  miniMapEntities: [],
  miniMapNextEntityId: 1,
  miniMapReactionPulse: 0,
  miniMapCityState: {},
  cityHospitalState: {},
  cityStableState: {},
  // Campos legados (mantidos por compatibilidade com saves antigos).
  miniMapHospital: {
    queueSize: 5,
    activeMode: "none",
    modeTimer: 0,
    corpseCount: 0
  },
  miniMapChurch: {
    mode: "altar",
    modeTimer: 0,
    nextFaithfulId: 1,
    pendingArrivals: 0,
    lastGatherAt: 0
  },
  miniMapShop: {
    mode: "idle",
    modeTimer: 0,
    nextCustomerId: 1
  },
  miniMapStable: {
    mode: "idle",
    modeTimer: 0,
    horseTargets: {}
  },
  miniMapTent: {
    mode: "idle",
    modeTimer: 0,
    focusCharacterId: "",
    refreshPendingSpawn: false,
    transferCharacterId: "",
    transferNurseId: "",
    transferPhase: "",
    transferOutToHospital: null
  },
  selectedSaveSlot: 1,
  tutorialRunning: false,
  tutorialEnabled: true,
  tutorialSkipped: false,
  tutorialPayload: null,
  tutorialSeenAreas: {},
  actionMenuAreaId: "",
  actionMenuSectionId: "",
  dayStartAfterDreamPending: false,
  patientCounter: 0,
  relapseQueue: [],
  triageReferrals: [],
  triageRosterIds: [],
  triageActiveCharacterId: "",
  triageDialogueStep: 0,
  triageEmpathyScore: 0,
  triageLastSeenHour: -1,
  triageCharacterOutcomeById: {},
  triageNurseStatusById: {},
  triageCuredHopeNames: [],
  shopOpen: false,
  shopMenuView: "root",
  shopPendingBuyItemId: "",
  treatmentBoostCharges: 0,
  protectionCharges: 0,
  precisionKitCharges: 0,
  doctorName: "",
  doctorTitle: "Dr.",
  phase1Failed: false,
  evidence: 0,
  suspicion: 0,
  ending: null
};

const symptomsPool = [
  "febre alta",
  "tosse seca",
  "fraqueza extrema",
  "gânglios inchados",
  "delírio",
  "calafrios",
  "manchas escuras"
];

const TRIAGE_SCRIPT_SOURCE = Array.isArray(window.TRIAGE_SCRIPT_DATA) ? window.TRIAGE_SCRIPT_DATA : [];

const TRIAGE_NAME_POOL = [
  "Agnes", "Baltazar", "Cecília", "Damião", "Elias", "Fiora", "Galdino", "Helena", "Ismael", "Jasmim",
  "Klaus", "Lídia", "Mateo", "Nádia", "Otávio", "Petra", "Quíria", "Rafael", "Sabine", "Tomas",
  "Úrsula", "Valen", "Wanda", "Xavier", "Yara", "Zeno", "Alda", "Bruno", "Caio", "Dora",
  "Estevão", "Flora", "Gaspar", "Heloísa", "Ivo", "Joana", "León", "Mara", "Noé", "Orlanda",
  "Pietro", "Rosa", "Silas", "Teodora", "Ulisses", "Vera", "Wendel", "Ysolda", "Zilda", "Artur"
];

const TRIAGE_RESPONSE_TEMPLATES = {
  empatia: [
    (name) => `"Você não está só, ${name}. Vamos achar um caminho seguro para você."`,
    (name) => `"Eu te ouvi, ${name}. Sua dor importa e vou tratar isso com seriedade."`,
    (name) => `"Respire. Fique perto de mim e vamos atravessar isso com método e cuidado."`
  ],
  neutro: [
    () => `"Entendi. Vou registrar seu estado e avaliar a melhor condução."`,
    () => `"Certo. Preciso manter a ordem da triagem para atender sem colapso."`,
    () => `"Anotado. Vou seguir o protocolo para não perder tempo crítico."`
  ],
  negativo: [
    () => `"Seja direto. Não posso atrasar o fluxo com detalhes demais."`,
    () => `"Mantenha-se na fila. Há casos piores aguardando decisão."`,
    () => `"Controle-se. Não tenho margem para drama agora."`
  ]
};

function quoteDialogueLine(text) {
  const clean = String(text || "").trim();
  if (!clean) return "";
  if (clean.startsWith("\"") || clean.startsWith("“")) return clean;
  return `"${clean}"`;
}

function buildUniqueTriageDialogue(name, idx, personality, dramaA, dramaB, role) {
  const lines = [];
  lines.push(`${name} mantém a postura por pouco, visivelmente no limite da própria febre.`);
  if (role === "enfermeira") {
    lines.push(quoteDialogueLine(`A ala de espera está no limite. Eu mesma estou ${personality}, mas não posso parar.`));
    lines.push(quoteDialogueLine(`Hoje acompanhei famílias que ${dramaA}. Quando o sino toca, chega mais gente do que leitos.`));
    if (idx % 3 !== 0) {
      lines.push(quoteDialogueLine(`Se o médico cair, nós caímos junto. E quando ${dramaB}, ninguém segura a triagem.`));
    }
    return lines;
  }

  lines.push(quoteDialogueLine(`Eu estou ${personality}. E desde que ${dramaA}, tudo aqui parece perto do fim.`));
  lines.push(quoteDialogueLine(`Desde que ${dramaA}, minhas noites viraram vigília e culpa.`));
  if (idx % 4 !== 0) {
    lines.push(quoteDialogueLine(`Se eu voltar sem atendimento, temo ${dramaB}. Não peço privilégio, peço chance.`));
  }
  if (idx % 5 === 0 || idx % 7 === 0) {
    lines.push(quoteDialogueLine("Se eu me calar, viro mais um número na tábua de óbitos. Ainda quero lutar."));
  }
  return lines;
}

function getTriageResponseOptions(character, step) {
  const scriptedStep = character.responseOptionsByStep && character.responseOptionsByStep[String(step)];
  if (scriptedStep) {
    return [
      { label: scriptedStep.empatia, tone: "empatia" },
      { label: scriptedStep.neutro, tone: "neutro" },
      { label: scriptedStep.negativo, tone: "frio" }
    ];
  }
  const bias = (step + character.id.length) % 3;
  const empathicTpl = TRIAGE_RESPONSE_TEMPLATES.empatia[(step + bias) % TRIAGE_RESPONSE_TEMPLATES.empatia.length];
  const neutralTpl = TRIAGE_RESPONSE_TEMPLATES.neutro[(step + 1 + bias) % TRIAGE_RESPONSE_TEMPLATES.neutro.length];
  const negativeTpl = TRIAGE_RESPONSE_TEMPLATES.negativo[(step + 2 + bias) % TRIAGE_RESPONSE_TEMPLATES.negativo.length];
  return [
    { label: empathicTpl(character.name), tone: "empatia" },
    { label: neutralTpl(character.name), tone: "neutro" },
    { label: negativeTpl(character.name), tone: "frio" }
  ];
}

function mapScriptedTriageRole(entry) {
  const haystack = `${entry.name || ""} ${entry.history || ""}`.toLowerCase();
  return haystack.includes("enfermeira") ? "enfermeira" : "paciente";
}

function mapScriptedRewardType(entry, idx, role) {
  if (role !== "paciente") return "none";
  const secondary = (entry.secondary || "").toLowerCase();
  if (secondary.includes("subornar") || secondary.includes("suborno")) return "none";
  if (secondary.includes("remédio") || secondary.includes("remédios") || secondary.includes("informações")) return "gift";
  if (secondary.includes("lugar seguro") || secondary.includes("trabalho")) return "cheap-offer";
  return idx % 5 === 0 ? "cheap-offer" : idx % 3 === 0 ? "gift" : "none";
}

function buildScriptedTriageDialogue(entry) {
  const lines = [];
  if (entry.opening) lines.push(entry.opening);
  if (entry.line1) lines.push(quoteDialogueLine(entry.line1));
  if (entry.line2) lines.push(quoteDialogueLine(entry.line2));
  if (entry.secret) lines.push(`Segredo revelado: ${quoteDialogueLine(entry.secret)}`);
  return lines.length ? lines : [quoteDialogueLine("Não consigo falar agora. Só me diga se ainda há chance.")];
}

function buildScriptedTriageCharacterLibrary() {
  return TRIAGE_SCRIPT_SOURCE.map((entry, idx) => {
    const role = mapScriptedTriageRole(entry);
    const bribeAttempt = role === "paciente" && /subornar|suborno/i.test(entry.secondary || "");
    const rewardType = mapScriptedRewardType(entry, idx, role);
    const scriptedResponses = {
      empatia: quoteDialogueLine(entry.responses?.empatia || `Eu te ouvi, ${entry.name || "viajante"}. Vamos achar um caminho seguro.`),
      neutro: quoteDialogueLine(entry.responses?.neutro || "Vou registrar seu estado e manter a triagem em ordem."),
      negativo: quoteDialogueLine(entry.responses?.negativo || "Mantenha o controle. Há outros casos graves aguardando.")
    };
    const scriptedOutcomes = {
      empatia: entry.outcomes?.empatia || "",
      neutro: entry.outcomes?.neutro || "",
      negativo: entry.outcomes?.negativo || ""
    };
    return {
      id: `triage-${entry.id || idx + 1}`,
      name: String(entry.name || `Paciente ${idx + 1}`).trim(),
      role,
      personality: String(entry.personality || "determinado em meio ao colapso").trim(),
      observable: String(entry.observable || "sinais visíveis de exaustão e febre").trim(),
      dramaA: String(entry.history || "carrega perdas recentes em silêncio").trim(),
      dramaB: String(entry.objective || "busca uma chance antes do colapso final").trim(),
      history: String(entry.history || "").trim(),
      objective: String(entry.objective || "").trim(),
      secondaryInteraction: String(entry.secondary || "").trim(),
      bribeAttempt,
      rewardType,
      bribeCoins: randomInt(5, 14),
      dialogue: buildScriptedTriageDialogue(entry),
      responseOptionsByStep: {
        1: scriptedResponses
      },
      responseOutcomeByStep: {
        1: scriptedOutcomes
      }
    };
  });
}

function buildTriageCharacterLibrary() {
  if (TRIAGE_SCRIPT_SOURCE.length >= 10) {
    return buildScriptedTriageCharacterLibrary();
  }
  return TRIAGE_NAME_POOL.map((name, idx) => {
    const personality = "determinado apesar da exaustão";
    const dramaA = "perdeu familiares em poucos dias";
    const dramaB = "carrega um luto que nunca terminou";
    const observable = "olheiras profundas e mãos trêmulas";
    const role = idx % 6 === 0 ? "enfermeira" : "paciente";
    const bribeAttempt = role === "paciente" && (idx % 7 === 0 || idx % 11 === 0);
    const rewardType = role === "paciente"
      ? (idx % 5 === 0 ? "cheap-offer" : idx % 3 === 0 ? "gift" : "none")
      : "none";
    return {
      id: `triage-${idx + 1}`,
      name: role === "enfermeira" ? `Enfermeira ${name}` : name,
      role,
      personality,
      observable,
      dramaA,
      dramaB,
      bribeAttempt,
      rewardType,
      bribeCoins: randomInt(5, 14),
      dialogue: buildUniqueTriageDialogue(name, idx, personality, dramaA, dramaB, role)
    };
  });
}

const TRIAGE_CHARACTER_LIBRARY = buildTriageCharacterLibrary();

const techniques = [
  {
    id: "sangria",
    name: "Sangria",
    base: 0.3,
    bestFor: ["febre alta", "gânglios inchados"],
    onSuccess: "A pressão febril cede temporariamente.",
    onFail: "A perda de sangue reduz o vigor do paciente."
  },
  {
    id: "ervas",
    name: "Cataplasma de Ervas",
    base: 0.38,
    bestFor: ["calafrios", "fraqueza extrema"],
    onSuccess: "A dor e os espasmos diminuem.",
    onFail: "A reação da pele agrava o desconforto."
  },
  {
    id: "fumigacao",
    name: "Fumigação Aromática",
    base: 0.25,
    bestFor: ["tosse seca", "manchas escuras"],
    onSuccess: "A respiração melhora por algumas horas.",
    onFail: "A fumaça irrita as vias respiratórias."
  },
  {
    id: "isolamento",
    name: "Isolamento e Repouso",
    base: 0.46,
    bestFor: ["delírio", "fraqueza extrema"],
    onSuccess: "O corpo ganha tempo para reagir.",
    onFail: "A peste avança apesar do repouso."
  },
  {
    id: "vinagre",
    name: "Limpeza com Vinagre",
    base: 0.33,
    bestFor: ["manchas escuras", "gânglios inchados"],
    onSuccess: "A inflamação reduz nas lesões.",
    onFail: "As feridas ardem e o paciente enfraquece."
  }
];

const shopItems = [
  {
    id: "rare-herbs",
    name: "Ervas Raras",
    price: 12,
    utility: "Auxilia no tratamento",
    description: "Aumenta em 10% a chance de sucesso dos próximos 3 tratamentos.",
    buy(stateRef) {
      stateRef.treatmentBoostCharges += 3;
      addLog("Compra concluída: Ervas Raras. Bônus de sucesso ativo por 3 usos.");
    }
  },
  {
    id: "waxed-cloak",
    name: "Manto Encerado",
    price: 15,
    utility: "Proteção do médico",
    description: "Protege o médico por 5 ações; em geral evita o custo de vida.",
    buy(stateRef) {
      stateRef.protectionCharges += 5;
      addLog("Compra concluída: Manto Encerado. Proteção ativa por 5 ações.");
    }
  },
  {
    id: "tonic",
    name: "Tônico Restaurador",
    price: 9,
    utility: "Recuperação do médico",
    description: "Item de recuperação para restaurar sua vida.",
    buy(stateRef) {
      stateRef.tonics += 1;
      addLog("Compra concluída: Tônico Restaurador adicionado ao inventário.");
    }
  },
  {
    id: "precision-kit",
    name: "Kit de Instrumentos",
    price: 18,
    utility: "Auxilia no tratamento",
    description: "Melhora o efeito dos próximos 4 sucessos de tratamento.",
    buy(stateRef) {
      stateRef.precisionKitCharges += 4;
      addLog("Compra concluída: Kit de Instrumentos. Precisão ativa por 4 sucessos.");
    }
  },
  {
    id: "anti-plague-potion",
    name: "Poção Antipeste",
    price: 14,
    utility: "Autocura da peste",
    description: "Reduz contaminação do médico e pode curar a peste com autotratamento.",
    buy(stateRef) {
      stateRef.antiPlaguePotions += 1;
      addLog("Compra concluída: Poção Antipeste adicionada ao inventário.");
    }
  }
];

const WORLD_MAP = [
  {
    id: "valedouro",
    name: "Valedouro",
    profile: "Centro médico e burocrático da região.",
    contagionRisk: 0.1,
    paymentMultiplier: 1,
    areas: [
      { id: "tenda", name: "Tenda de Atendimento", unlockPhase: 1, description: "Triagem dos casos mais urgentes." },
      { id: "hospital", name: "Hospital", unlockPhase: 1, description: "Núcleo clínico da peste." },
      { id: "igreja", name: "Igreja", unlockPhase: 1, description: "Acolhimento espiritual e registros de óbito." },
      { id: "residencial", name: "Área Residencial", unlockPhase: 1, requiresResidentialIntel: true, description: "Ruas de casas marcadas por rumores noturnos." },
      { id: "loja", name: "Loja", unlockPhase: 1, description: "Comércio de itens médicos e suprimentos." },
      { id: "estabulo", name: "Estábulo", unlockPhase: 1, description: "Ponto de viagem para outras cidades." },
      { id: "arquivo", name: "Arquivo Municipal", unlockPhase: 2, description: "Registros políticos e de surtos." },
      { id: "docas", name: "Docas", unlockPhase: 2, description: "Entrada de cargas e rumores externos." },
      { id: "quartel", name: "Quartel", unlockPhase: 2, description: "Área de patrulha e repressão." },
      { id: "cripta-antiga", name: "Cripta Antiga", unlockPhase: 3, hiddenUntilPhase3: true, description: "Passagens ocultas sob a cidade." }
    ]
  },
  {
    id: "brumasul",
    name: "Brumasul",
    profile: "Cidade portuária tomada por medo e comércio escuro.",
    contagionRisk: 0.16,
    paymentMultiplier: 1.2,
    areas: [
      { id: "tenda", name: "Tenda de Atendimento", unlockPhase: 1, description: "Barracão médico da praça central." },
      { id: "hospital", name: "Hospital da Maré", unlockPhase: 1, description: "Enfermaria principal do porto." },
      { id: "igreja", name: "Igreja da Maré", unlockPhase: 1, description: "Refúgio e coleta de testemunhos." },
      { id: "residencial", name: "Área Residencial", unlockPhase: 1, requiresResidentialIntel: true, description: "Becos costeiros com portas riscadas e casas lacradas." },
      { id: "loja", name: "Armazém da Rua Alta", unlockPhase: 1, description: "Itens para cura e proteção." },
      { id: "estabulo", name: "Estábulo da Muralha", unlockPhase: 1, description: "Travessia terrestre entre cidades." },
      { id: "mercado-negro", name: "Mercado Negro", unlockPhase: 2, description: "Trocas ilegais e informação sensível." },
      { id: "farol", name: "Farol Velho", unlockPhase: 2, description: "Vigia de rotas e sinais cifrados." },
      { id: "palacio-portuario", name: "Palácio Portuário", unlockPhase: 2, description: "Nó político da costa." },
      { id: "catacumba-salina", name: "Catacumba Salina", unlockPhase: 3, hiddenUntilPhase3: true, description: "Galerias soterradas pelo sal." }
    ]
  },
  {
    id: "pedrafria",
    name: "Pedrafria",
    profile: "Distrito montanhoso e conservador.",
    contagionRisk: 0.22,
    paymentMultiplier: 1.4,
    areas: [
      { id: "tenda", name: "Tenda de Atendimento", unlockPhase: 1, description: "Posto improvisado na entrada." },
      { id: "hospital", name: "Casa de Cura de Pedrafria", unlockPhase: 1, description: "Ala principal de tratamento." },
      { id: "igreja", name: "Igreja das Colinas", unlockPhase: 1, description: "Centro de influência local." },
      { id: "residencial", name: "Área Residencial", unlockPhase: 1, requiresResidentialIntel: true, description: "Casas nas encostas onde marcas reaparecem nas portas." },
      { id: "loja", name: "Empório do Vale", unlockPhase: 1, description: "Suprimentos médicos e mantimentos." },
      { id: "estabulo", name: "Estábulo da Estrada Alta", unlockPhase: 1, description: "Rota de viagem para as demais cidades." },
      { id: "mina-abandonada", name: "Mina Abandonada", unlockPhase: 2, description: "Entradas secundárias e rotas ocultas." },
      { id: "conselho-civico", name: "Conselho Cívico", unlockPhase: 2, description: "Poder político regional." },
      { id: "forte-norte", name: "Forte do Norte", unlockPhase: 2, description: "Zona militar fechada." },
      { id: "santuario-submerso", name: "Santuário Submerso", unlockPhase: 3, hiddenUntilPhase3: true, description: "Ruína secreta sob o rochedo." }
    ]
  }
];

const MINI_MAP_SCENE_PROFILES = {
  hospital: { label: "Ala Clínica", generic: [3, 5], main: [1, 2], patientBase: [1, 2] },
  tenda: { label: "Triagem da Tenda", generic: [4, 6], main: [1, 1], patientBase: [1, 3] },
  igreja: { label: "Nave da Igreja", generic: [5, 8], main: [1, 2], patientBase: [0, 1] },
  residencial: { label: "Quadra Residencial", generic: [3, 5], main: [1, 2], patientBase: [0, 1] },
  loja: { label: "Loja de Suprimentos", generic: [2, 4], main: [1, 1], patientBase: [0, 1] },
  estabulo: { label: "Pátio do Estábulo", generic: [3, 5], main: [1, 1], patientBase: [0, 1] },
  default: { label: "Distrito Local", generic: [3, 5], main: [1, 1], patientBase: [0, 1] },
  phase2: { label: "Setor de Investigação", generic: [2, 4], main: [2, 3], patientBase: [0, 0] },
  phase3: { label: "Núcleo da Conspiração", generic: [1, 2], main: [3, 4], patientBase: [0, 0] }
};

const MINI_MAP_WATCHER_EYES = [
  { x: 9, y: 12 },
  { x: 92, y: 15 },
  { x: 11, y: 86 },
  { x: 90, y: 84 },
  { x: 52, y: 8 }
];

const HOSPITAL_MINI_ZONES = {
  doctorRoom: { x: 18, y: 22 },
  doctorMeet: { x: 32, y: 20 },
  treatmentA: { x: 46, y: 21 },
  treatmentB: { x: 56, y: 24 },
  ambulatory: { x: 49, y: 52 },
  queueStart: { x: 12, y: 72 },
  queueStepY: 8,
  escortQueuePatient: { x: 13.2, y: 71.3 },
  escortQueueNurse: { x: 9.6, y: 72.2 },
  escortDrop: { x: 28.8, y: 22.3 },
  escortExit: { x: 106, y: 72 },
  exit: { x: 106, y: 50 },
  discard: { x: 88, y: 86 },
  nurseIdle: { x: 79, y: 76 }
};

const HOSPITAL_AMBULATORY_SLOTS = [
  { x: 42, y: 47 },
  { x: 54, y: 47 },
  { x: 42, y: 58 },
  { x: 54, y: 58 }
];

const HOSPITAL_QUEUE_TARGET = 5;
const AMBULATORY_ENHANCED_CARE_DAILY_COST = 10;

function createDefaultHospitalMiniState() {
  return {
    queueSize: HOSPITAL_QUEUE_TARGET,
    activeMode: "none",
    modeTimer: 0,
    corpseCount: 0,
    cartCleanupActive: false
  };
}

function createDefaultChurchMiniState() {
  return {
    mode: "altar",
    modeTimer: 0,
    nextFaithfulId: 1,
    pendingArrivals: 0,
    lastGatherAt: 0
  };
}

function createDefaultShopMiniState() {
  return {
    mode: "idle",
    modeTimer: 0,
    nextCustomerId: 1
  };
}

function createDefaultStableMiniState() {
  return {
    mode: "idle",
    modeTimer: 0,
    horseTargets: {}
  };
}

function createDefaultTentMiniState() {
  return {
    mode: "idle",
    modeTimer: 0,
    focusCharacterId: "",
    refreshPendingSpawn: false,
    transferCharacterId: "",
    transferNurseId: "",
    transferPhase: "",
    transferOutToHospital: null
  };
}

function createDefaultCityHospitalState() {
  return {
    ambulatory: [],
    nextAmbulatoryId: 1,
    turnCursorMinute: Number.NaN,
    reportEvents: [],
    reportPending: false,
    pendingTriageEscort: null
  };
}

const HOSPITAL_MINI_SECTIONS = [
  { id: "consultorio", label: "CONSULTÓRIO", x: 5, y: 8, w: 27, h: 26 },
  { id: "atendimento", label: "ATENDIMENTO", x: 36, y: 8, w: 28, h: 26 },
  { id: "ambulatorio", label: "AMBULATÓRIO", x: 36, y: 38, w: 28, h: 26 },
  { id: "descarte", label: "DESCARTE", x: 74, y: 72, w: 23, h: 22 },
  { id: "estoque", label: "ESTOQUE DE MEDICAÇÕES", x: 67, y: 8, w: 30, h: 22 }
];

const CHURCH_MINI_ZONES = {
  altar: { x: 50, y: 16 },
  confessionario: { x: 88, y: 16 },
  doctorBase: { x: 43, y: 56 },
  exit: { x: 103, y: 85 },
  benchSlots: [
    { x: 29, y: 46 }, { x: 39, y: 46 }, { x: 29, y: 58 }, { x: 39, y: 58 },
    { x: 61, y: 46 }, { x: 71, y: 46 }, { x: 61, y: 58 }, { x: 71, y: 58 }
  ]
};

const CHURCH_MINI_SECTIONS = [
  { id: "altar", label: "ALTAR", x: 36, y: 6, w: 28, h: 20 },
  { id: "bancos", label: "BANCOS", x: 20, y: 34, w: 60, h: 34 },
  { id: "confessionario", label: "CONFESSIONÁRIO", x: 78, y: 6, w: 20, h: 20 }
];

const SHOP_MINI_ZONES = {
  merchantIdle: { x: 72, y: 22 },
  merchantPost: { x: 54, y: 22 },
  counterFront: { x: 54, y: 40 },
  doctorIdle: { x: 20, y: 78 },
  shopperQueue: { x: 74, y: 46 },
  shopperExit: { x: 96, y: 82 },
  wanderMinX: 10,
  wanderMaxX: 90,
  wanderMinY: 62,
  wanderMaxY: 90
};

const SHOP_MINI_SECTIONS = [
  { id: "balcao", label: "BALCÃO", x: 24, y: 12, w: 60, h: 20 },
  { id: "atendimento-loja", label: "ATENDIMENTO", x: 26, y: 34, w: 56, h: 20 },
  { id: "circulacao", label: "CIRCULAÇÃO", x: 8, y: 58, w: 84, h: 34 }
];

const TENT_MINI_ZONES = {
  doctorBase: { x: 14, y: 24 },
  triageStart: { x: 34, y: 24 },
  triageCols: 4,
  triageColStep: 13,
  triageRowStep: 14,
  exit: { x: 94, y: 24 }
};

const TENT_MINI_SECTIONS = [
  { id: "triagem", label: "TRIAGEM", x: 28, y: 12, w: 56, h: 58 },
  { id: "entrada", label: "ENTRADA", x: 86, y: 12, w: 12, h: 24 },
  { id: "posto", label: "POSTO DO MÉDICO", x: 8, y: 12, w: 18, h: 24 }
];

const STABLE_MINI_ZONES = {
  doctorBase: { x: 18, y: 68 },
  horseArea: { x1: 10, y1: 14, x2: 58, y2: 74 },
  hayStock: { x: 72, y: 64 },
  carriage: { x: 82, y: 30 },
  driver: { x: 82, y: 22 },
  handlerBase: { x: 64, y: 52 }
};

const STABLE_MINI_SECTIONS = [
  { id: "baias-cavalos", label: "BAIAS DOS CAVALOS", x: 6, y: 8, w: 56, h: 72 },
  { id: "estoque-estabulo", label: "ESTOQUE", x: 64, y: 54, w: 18, h: 24 },
  { id: "carroca", label: "CARROÇA", x: 70, y: 8, w: 28, h: 40 }
];

const STABLE_HANDLER_PROFILES = {
  valedouro: [
    { name: "Ari Lencastro", story: "Criado entre trilhas de lama e neblina, aprendeu cedo a acalmar cavalos ariscos pelo tom de voz." },
    { name: "Mila Torquato", story: "Filha de ferrador, conhece casco e arreio como quem lê um livro antigo." },
    { name: "Dion Tavares", story: "Já guiou tropas de mantimentos em inverno severo e perdeu família para a peste." }
  ],
  brumasul: [
    { name: "Nauro Cid", story: "Veio das docas de Brumasul e trocou cordas de navio por rédeas e arreios." },
    { name: "Bel Nogueira", story: "Escapou de uma enchente costeira e jurou manter a rota de fuga sempre pronta." },
    { name: "Sálvio Marel", story: "Cresceu ouvindo lendas do mar agitado e hoje vigia os cavalos como sentinelas." }
  ],
  pedrafria: [
    { name: "Iria Quental", story: "Das serras geladas, domina ferraduras em terreno de pedra e geada." },
    { name: "Teo Bragan", story: "Condutor de minas aposentado, conhece atalhos de risco entre vales estreitos." },
    { name: "Marta Sobrano", story: "Sobreviveu a dois invernos de fome e sustenta o estábulo com disciplina rígida." }
  ]
};

const MINI_MAP_ZONE_DESCRIPTIONS = {
  consultorio: "Consultório do médico. Avaliação clínica e definição da conduta do caso.",
  atendimento: "Área de atendimento direto onde o paciente passa pelos procedimentos.",
  ambulatorio: "Ambulatório de isolamento e repouso com evolução em ciclos clínicos.",
  descarte: "Setor de descarte de corpos. Acúmulo impacta risco sanitário local.",
  estoque: "Estoque de medicações e insumos essenciais do plantão.",
  altar: "Altar central da igreja, foco das liturgias e falas do padre.",
  bancos: "Bancos dos fiéis e pacientes em espera durante ações da igreja.",
  confessionario: "Confessionário para escuta reservada e aconselhamento.",
  balcao: "Balcão de negociação com o lojista para compras e vendas.",
  "atendimento-loja": "Ponto de atendimento comercial em frente ao balcão.",
  circulacao: "Área de circulação de clientes e NPCs da loja.",
  triagem: "Área de triagem da tenda com pacientes e equipe de enfermagem.",
  entrada: "Saída da tenda para encaminhamentos e deslocamentos.",
  posto: "Posto do médico para observação inicial e orientação.",
  "baias-cavalos": "Área dos cavalos. Eles permanecem e se movimentam apenas dentro das baias.",
  "estoque-estabulo": "Estoque do estábulo com feno, cenouras, ferraduras e itens de manejo.",
  carroca: "Carroça de condução para viagem entre cidades."
};

const AREA_TUTORIAL_GUIDES = {
  hospital: {
    title: "Tutorial - Hospital",
    text: "Aqui você atende pacientes, aplica técnicas, decide alta em remissão e acompanha risco de recaída."
  },
  tenda: {
    title: "Tutorial - Tenda de Atendimento",
    text: "A tenda representa triagem e pressão da peste. Use-a como ponto narrativo de urgência do surto."
  },
  igreja: {
    title: "Tutorial - Igreja",
    text: "Na igreja você realiza ações de fé, conselhos e atendimentos aleatórios. Isso pode ajudar, mas também elevar perseguição."
  },
  residencial: {
    title: "Tutorial - Área Residencial",
    text: "Aqui você investiga casas marcadas, coleta testemunhos e procura sinais dos homens que espalham a peste."
  },
  loja: {
    title: "Tutorial - Loja",
    text: "Na loja você compra itens para tratamento, proteção e recuperação. Moedas são limitadas: compre com estratégia."
  },
  estabulo: {
    title: "Tutorial - Estábulo",
    text: "Do estábulo você viaja entre cidades. Cada cidade tem risco de contágio e pagamentos diferentes."
  }
};

const CITY_AREA_ICONS = {
  hospital: "⚕",
  tenda: "⛺",
  igreja: "✝",
  residencial: "⌂",
  loja: "¤",
  estabulo: "♞",
  arquivo: "📜",
  docas: "⚓",
  quartel: "🛡",
  "cripta-antiga": "☠",
  "mercado-negro": "☗",
  farol: "✦",
  "palacio-portuario": "♜",
  "catacumba-salina": "☠",
  "mina-abandonada": "⛏",
  "conselho-civico": "⚖",
  "forte-norte": "🛡",
  "santuario-submerso": "☬"
};

const CITY_LOCAL_MAP_CONFIG = {
  valedouro: {
    boardClass: "city-theme-valedouro",
    layout: {
      hospital: { x: 50, y: 24 },
      tenda: { x: 26, y: 34 },
      igreja: { x: 72, y: 26 },
      residencial: { x: 78, y: 46 },
      loja: { x: 66, y: 60 },
      estabulo: { x: 30, y: 72 },
      arquivo: { x: 48, y: 54 },
      docas: { x: 14, y: 56 },
      quartel: { x: 82, y: 48 },
      "cripta-antiga": { x: 54, y: 84 }
    },
    default: [
      { x: 46, y: 40 },
      { x: 30, y: 50 },
      { x: 62, y: 52 },
      { x: 18, y: 62 },
      { x: 74, y: 64 },
      { x: 50, y: 72 }
    ],
    connections: [
      ["hospital", "tenda"],
      ["hospital", "igreja"],
      ["igreja", "residencial"],
      ["hospital", "arquivo"],
      ["residencial", "loja"],
      ["tenda", "docas"],
      ["tenda", "estabulo"],
      ["arquivo", "loja"],
      ["loja", "estabulo"],
      ["arquivo", "quartel"],
      ["quartel", "igreja"],
      ["arquivo", "cripta-antiga"]
    ],
    decorations: [
      { x: 10, y: 16, w: 20, h: 16, kind: "water", label: "Rio Velho" },
      { x: 74, y: 68, w: 18, h: 14, kind: "district", label: "Bairro Nobre" }
    ]
  },
  brumasul: {
    boardClass: "city-theme-brumasul",
    layout: {
      hospital: { x: 42, y: 28 },
      tenda: { x: 18, y: 40 },
      igreja: { x: 66, y: 30 },
      residencial: { x: 74, y: 46 },
      loja: { x: 58, y: 58 },
      estabulo: { x: 24, y: 72 },
      "mercado-negro": { x: 76, y: 58 },
      farol: { x: 84, y: 20 },
      "palacio-portuario": { x: 46, y: 12 },
      "catacumba-salina": { x: 86, y: 78 }
    },
    default: [
      { x: 44, y: 42 },
      { x: 28, y: 54 },
      { x: 62, y: 54 },
      { x: 18, y: 66 },
      { x: 74, y: 66 },
      { x: 50, y: 78 }
    ],
    connections: [
      ["hospital", "tenda"],
      ["hospital", "igreja"],
      ["igreja", "residencial"],
      ["hospital", "loja"],
      ["residencial", "loja"],
      ["tenda", "estabulo"],
      ["loja", "mercado-negro"],
      ["mercado-negro", "farol"],
      ["igreja", "palacio-portuario"],
      ["palacio-portuario", "farol"],
      ["loja", "estabulo"],
      ["mercado-negro", "catacumba-salina"]
    ],
    decorations: [
      { x: 74, y: 8, w: 24, h: 30, kind: "sea", label: "Mar Agitado" },
      { x: 68, y: 76, w: 28, h: 14, kind: "flood", label: "Cais Inundável" }
    ]
  },
  pedrafria: {
    boardClass: "city-theme-pedrafria",
    layout: {
      hospital: { x: 52, y: 22 },
      tenda: { x: 30, y: 34 },
      igreja: { x: 72, y: 28 },
      residencial: { x: 68, y: 46 },
      loja: { x: 44, y: 56 },
      estabulo: { x: 20, y: 74 },
      "mina-abandonada": { x: 76, y: 56 },
      "conselho-civico": { x: 56, y: 44 },
      "forte-norte": { x: 82, y: 18 },
      "santuario-submerso": { x: 58, y: 82 }
    },
    default: [
      { x: 48, y: 40 },
      { x: 32, y: 50 },
      { x: 64, y: 52 },
      { x: 20, y: 64 },
      { x: 76, y: 66 },
      { x: 52, y: 76 }
    ],
    connections: [
      ["hospital", "tenda"],
      ["hospital", "igreja"],
      ["igreja", "residencial"],
      ["hospital", "conselho-civico"],
      ["residencial", "loja"],
      ["conselho-civico", "loja"],
      ["conselho-civico", "forte-norte"],
      ["tenda", "estabulo"],
      ["loja", "estabulo"],
      ["loja", "mina-abandonada"],
      ["igreja", "forte-norte"],
      ["mina-abandonada", "santuario-submerso"]
    ],
    decorations: [
      { x: 6, y: 6, w: 28, h: 20, kind: "mountain", label: "Cordilheira Fria" },
      { x: 66, y: 70, w: 26, h: 16, kind: "cliff", label: "Rochedo Profundo" }
    ]
  }
};

const SAVE_SLOT_IDS = [1, 2, 3];
const SAVE_STORAGE_PREFIX = "veu-da-peste-save-slot-";
const SAVE_BACKUP_PREFIX = "veu-da-peste-save-backup-slot-";
const DEATH_HISTORY_STORAGE_KEY = "veu-da-peste-death-history";
const MAX_DEATH_HISTORY = 24;
const RESIDENTIAL_FIGURE_CHANCE = 0.1;
const RESIDENTIAL_FIGURE_COOLDOWN_MINUTES = 90;

const RESIDENTIAL_DIALOGUE_STYLES = {
  religioso: [
    "Morador: 'Depois da marca na porta, meu irmão caiu de febre em dois dias. Rezo, apago, e o símbolo volta na manhã seguinte.'",
    "Moradora: 'O padre benzeu a madeira, mas a marca reapareceu. Na mesma noite, minha mãe adoeceu.'",
    "Viúvo: 'A tinta não sai. Desde o risco no portal, cada casa da rua perdeu alguém para a peste.'"
  ],
  logico: [
    "Artesão: 'Cronometrei os casos. A marca surge e, em 24 horas, alguém adoece. Não é superstição, é padrão.'",
    "Escrivã local: 'Anotei três portas marcadas e três famílias com febre no dia seguinte. Isso é método, não acaso.'",
    "Pescador: 'Tentei raspar com sal e vinagre. A marca cede, volta à noite, e outro vizinho cai doente.'"
  ],
  inquieto: [
    "Moradora: 'Estamos prontos para fugir. A marca apareceu, a tosse veio, e ninguém dorme mais nesta rua.'",
    "Pai aflito: 'Depois da marca, minha filha piorou rápido. Se ficar aqui, vamos morrer todos.'",
    "Idosa trêmula: 'Ninguém abre mais janelas. Toda porta marcada vira casa de febre e silêncio.'"
  ]
};

const phase2Actions = [
  {
    id: "archives",
    label: "Revirar Arquivos do Hospital",
    text: "Registros antigos mostram pacientes 'curados' transferidos para alas sem mapa.",
    evidence: 22,
    suspicion: 14
  },
  {
    id: "cart",
    label: "Seguir Carroça Noturna",
    text: "A carroça leva corpos e caixas seladas para uma cripta fora da cidade.",
    evidence: 28,
    suspicion: 24
  },
  {
    id: "apothecary",
    label: "Interrogar o Boticário",
    text: "Ele confessa: existe um círculo que regula a peste para manter ordem e poder.",
    evidence: 30,
    suspicion: 18
  },
  {
    id: "cathedral",
    label: "Infiltrar-se na Cripta da Catedral",
    text: "Você encontra atas secretas: a conspiração controla remédios e sucessão política.",
    evidence: 34,
    suspicion: 30
  }
];

const PHASE1_TIME_PALETTES = {
  morning: {
    bg: "#ece3cf",
    surface: "#f7f0df",
    ink: "#2f2a22",
    accent: "#8f3a22",
    border: "#b59a6a",
    sky1: "#d9ccb1",
    sky2: "#ece3cf",
    glow: { color: "#ffffff", alpha: 0.5 }
  },
  sunset: {
    bg: "#f1c18a",
    surface: "#f7dfbf",
    ink: "#3a2316",
    accent: "#b7562f",
    border: "#c77c52",
    sky1: "#f7d7a5",
    sky2: "#d88758",
    glow: { color: "#ffae74", alpha: 0.5 }
  },
  night: {
    bg: "#1a2230",
    surface: "#253346",
    ink: "#d6dfec",
    accent: "#6aa3d3",
    border: "#3a5676",
    sky1: "#111925",
    sky2: "#202f42",
    glow: { color: "#7ea1d3", alpha: 0.16 }
  }
};

const NARRATIVE_DIALOGUES = {
  casual: [
    "Mercador da esquina: 'Ainda há cura nos velhos livros, doutor... eu acredito.'",
    "Vizinha no beco: 'A noite foi longa, mas sua ronda mantém a rua em pé.'",
    "Ferreiro: 'Não temo a peste, temo o silêncio depois dela.'"
  ],
  faithTier1: [
    "Devota idosa: 'A oração não substitui suas mãos, doutor... mas fortalece quem espera.'",
    "Acólito: 'A igreja diz seu nome nos salmos de proteção dos enfermos.'",
    "Romeiro: 'Quando o senhor entra na ala, parece que a febre baixa junto com o medo.'"
  ],
  faithTier2: [
    "Pregador de rua: 'A peste é teste e advertência; sua cura é também testemunho.'",
    "Mulher ajoelhada no pátio: 'Leve esta vela ao hospital. Quem luta pela vida não luta sozinho.'",
    "Coro da igreja: 'Hoje cantamos pelos leitos e pelo médico que não recua.'"
  ],
  persecutionLow: [
    "Homem encapuzado: 'Vi sombras carregando sacos ao cair da noite... ninguém acredita.'",
    "Voz na esquina: 'Dizem que há homens que marcam portas antes dos surtos.'"
  ],
  persecutionHigh: [
    "Delirante no adro: 'Homens-demônios despejam a peste em sacos nas portas... eu vi, eu vi!'",
    "Sobrevivente em pânico: 'Eles sorriem quando o sino toca meia-noite. Trazem doença como mercadoria.'",
    "Velho febril: 'Não são ratos... são homens com olhos de brasa espalhando morte nas casas.'"
  ],
  empathyTier1: [
    "Mãe exausta: 'Doutor, o senhor não cobrou nada... nunca vou esquecer isso.'",
    "Jovem trabalhador: 'Chamam você de médico do povo. Dizem que não abandona ninguém.'",
    "Vizinho emocionado: 'Sua compaixão está virando esperança nas ruas.'"
  ],
  empathyTier2: [
    "Ancião na fila: 'A cidade aprendeu seu nome junto com a palavra misericórdia.'",
    "Mensagem anônima no hospital: 'Receba este apoio. Sua bondade salvou nossa família.'",
    "Criança no corredor: 'Mamãe disse que o senhor cura sem olhar bolsa de moedas.'"
  ],
  plagueTrend: [
    "Escrivão do hospital: 'Estranho... os casos aumentaram justo onde não havia foco recente.'",
    "Auxiliar nervoso: 'É como se alguém alimentasse a peste de propósito, noite após noite.'",
    "Médico em voz baixa: 'Há um padrão impossível nessa escalada. Isto parece forçado.'",
    "Relato de ronda: 'Portas marcadas ao amanhecer, depois surtos violentos no mesmo quarteirão.'"
  ],
  localRare: {
    prophecy: [
      "Estranho na rua: 'Quando os sinos calarem, as máscaras vão cair e o sal vai ferver nas portas.'",
      "Vidente encapuzado: 'Três sombras, três sacos, três noites... e a cidade esquecerá o próprio nome.'",
      "Ancião trêmulo: 'A peste não caminha sozinha. Ela é guiada por mãos que ninguém quer ver.'"
    ],
    childNote: "Uma criança entrega um bilhete: \"eles estão em todos os lugares\"."
  },
  churchDread: {
    low: [
      "Sussurro no altar: 'Nem toda oração responde. Algumas só chamam atenção.'",
      "Vela apagada no corredor: 'Hoje o eco da igreja pareceu... errado.'"
    ],
    mid: [
      "Fiel em pânico: 'Quanto mais rezamos, mais perto eles chegam das janelas.'",
      "Acólito trêmulo: 'As vozes no claustro repetem seu nome quando o sino cala.'",
      "Mulher assustada: 'Não insista tanto... algo começou a ouvir de volta.'"
    ],
    high: [
      "Delirante ajoelhado: 'A fé abriu a porta. Eles já sabem onde você dorme.'",
      "Sombra no vitral: 'Homens-demônios sorriem quando você lidera as preces.'",
      "Confissão quebrada: 'Não continue... cada rito deixa a cidade mais perto da febre eterna.'"
    ]
  },
  hospitalFaith: [
    "Família devota chega ao hospital com rosários, pedindo leito e bênção.",
    "Voluntários da igreja trazem água e mantas para os pacientes da ala norte.",
    "Um grupo de fiéis ocupa a antessala em vigília pelos enfermos."
  ]
};

const CITY_DIALOGUES = {
  valedouro: {
    casual: [
      "Escrivão municipal: 'Nos arquivos, os surtos sempre voltam às mesmas ruas.'",
      "Coveiro da praça: 'Valedouro enterra rápido... e esquece rápido também.'",
      "Boticário: 'Cada receita nova dura menos que o medo das pessoas.'"
    ],
    ominous: [
      "Guarda noturno: 'À meia-noite, carroças sem brasão deixam sacos nos becos.'",
      "Mulher no mercado: 'As portas riscadas ao amanhecer viram foco de peste ao cair da tarde.'"
    ],
    plague: [
      "Anotador do hospital: 'A curva de casos em Valedouro parece escrita por alguém.'",
      "Relatório da ronda: 'Mesmo bairro, mesmo horário, mesmo padrão de morte.'"
    ],
    prophecy: [
      "Velho no pelourinho: 'Quando o sino maior falhar, as ruas antigas vão sangrar de novo.'"
    ]
  },
  brumasul: {
    casual: [
      "Pescador no cais: 'Hoje o mar trouxe peixes mortos e silêncio demais.'",
      "Estivador: 'O porto fede a sal e febre; até as redes voltam doentes.'",
      "Vendedora de lampiões: 'Brumasul teme mais a maré noturna que a própria peste.'"
    ],
    ominous: [
      "Marinheiro trêmulo: 'Vi embarcação fantasma sem vela subir o canal da maré alta.'",
      "Velha do píer: 'Dizem que maldições do mar entram com os barris na enchente.'"
    ],
    plague: [
      "Relato portuário: 'Os casos disparam depois de noites de mar agitado e cais alagado.'",
      "Auxiliar da doca: 'Toda enchente traz febre nova para os cortiços do porto.'"
    ],
    prophecy: [
      "Profecia no cais: 'Quando o farol piscar três vezes, o mar cobrará os nomes esquecidos.'"
    ]
  },
  pedrafria: {
    casual: [
      "Mineiro exausto: 'A montanha guarda ar frio... e segredos quentes demais.'",
      "Pastora do vale: 'Em Pedrafria, o vento corta a pele e a fé ao mesmo tempo.'",
      "Ferreiro da colina: 'Aqui, a peste sobe devagar e desce matando em silêncio.'"
    ],
    ominous: [
      "Sentinela do forte: 'Luzes sem dono rondam a mina abandonada depois da meia-noite.'",
      "Ancião da serra: 'Há vozes sob o rochedo chamando pelos doentes.'"
    ],
    plague: [
      "Registro cívico: 'Surto nas encostas coincide com turnos secretos na mina.'",
      "Mensageiro do conselho: 'A doença avança em trilhas que não constam no mapa.'"
    ],
    prophecy: [
      "Profecia da colina: 'Quando a geada cair sem inverno, a pedra abrirá sua fome antiga.'"
    ]
  }
};

const RARE_TRAVEL_ITEMS = [
  {
    id: "rare-bandage-kit",
    name: "Kit de Bandagens Raras",
    utility: "Auxilia no tratamento",
    description: "Aplicação precisa para ampliar a eficácia dos próximos tratamentos.",
    basePrice: 26,
    add(stateRef) {
      stateRef.rareBandageKits += 1;
    }
  },
  {
    id: "sacred-medallion",
    name: "Medalhão Consagrado",
    utility: "Proteção do médico",
    description: "Símbolo antigo que protege o médico durante procedimentos críticos.",
    basePrice: 32,
    add(stateRef) {
      stateRef.sacredMedallions += 1;
    }
  },
  {
    id: "alchemical-serum",
    name: "Soro Alquímico",
    utility: "Recuperação e autocura",
    description: "Composto raro para conter os sinais da peste no próprio médico.",
    basePrice: 38,
    add(stateRef) {
      stateRef.alchemicalSerums += 1;
    }
  }
];

const CITY_SPECIFIC_ITEMS = [
  {
    id: "valedouro-seal",
    cityId: "valedouro",
    name: "Selo de Valedouro",
    utility: "Relíquia cívica",
    description: "Selo cerimonial encontrado entre arquivos e registros antigos da cidade.",
    value: 22
  },
  {
    id: "brumasul-coral",
    cityId: "brumasul",
    name: "Coral Negro de Brumasul",
    utility: "Relíquia marítima",
    description: "Fragmento estranho trazido pelas marés turvas do porto.",
    value: 26
  },
  {
    id: "pedrafria-shard",
    cityId: "pedrafria",
    name: "Lasca de Pedrafria",
    utility: "Relíquia mineral",
    description: "Fragmento de rocha fria extraído das encostas e minas da região.",
    value: 28
  }
];

const MASK_BALL_ITEMS = [
  {
    id: "mask-ball-invite",
    name: "Convite Lacrado do Baile",
    utility: "Acesso ao evento da alta sociedade",
    description: "Envelope preto com selo cerimonial. Convida o médico ao baile de máscaras; pode ser aberto no inventário.",
    value: 0
  },
  {
    id: "black-council-seal",
    name: "Selo-Negro do Conselho",
    utility: "Pista de conspiração",
    description: "Selo recolhido no baile. O médico ainda não compreende seu uso, mas ele parece abrir portas políticas adiante.",
    value: 64
  },
  {
    id: "onyx-key",
    name: "Chave de Ônix",
    utility: "Acesso oculto",
    description: "Chave achada no corredor de espelhos. Sua função é desconhecida por enquanto, mas sugere passagem restrita.",
    value: 52
  },
  {
    id: "pale-ampoule",
    name: "Ampola Incolor",
    utility: "Utilitário de origem incerta",
    description: "Ampola sem rótulo marcada com 'não é a hora'. Pode revelar utilidade crítica na investigação futura.",
    value: 70
  }
];

const RELIGIOUS_ITEMS = [
  {
    id: "sacred-bible",
    name: "Bíblia Sagrada",
    utility: "Canal de fé",
    description: "Texto consagrado que aprofunda sua devoção e fortalece atos de fé.",
    value: 48
  },
  {
    id: "rosary",
    name: "Terço Antigo",
    utility: "Foco espiritual",
    description: "Rosário usado em vigílias. Amplifica sua concentração durante orações clínicas.",
    value: 34
  }
];

const INFERENCE_LEXICON = {
  speakers: {
    neutral: ["Morador", "Mercador", "Viajante", "Vizinha", "Auxiliar"],
    faith: ["Devoto", "Acólito", "Pregador", "Corista", "Freira"],
    empathy: ["Mãe agradecida", "Paciente recuperado", "Trabalhador", "Voluntário"],
    ominous: ["Delirante", "Sombra na esquina", "Voz rouca", "Ancião febril"]
  },
  openings: {
    calm: ["em voz baixa", "com respeito", "na antessala", "ao pé da escadaria"],
    tense: ["em pânico", "quase sussurrando", "olhando para trás", "com os olhos arregalados"]
  },
  motifs: {
    compassion: [
      "diz que sua compaixão mantém o bairro respirando",
      "afirma que seu cuidado gratuito devolveu esperança às famílias",
      "repete que você trata pobres e ricos com a mesma mão firme"
    ],
    faith: [
      "liga sua presença no hospital à proteção dos salmos",
      "insiste que cada oração agora cita seu nome",
      "fala que a igreja vê seu trabalho como missão"
    ],
    threat: [
      "jura ter visto homens levando sacos de peste para portas marcadas",
      "aponta surtos noturnos como obra de mãos ocultas",
      "diz que a febre cresce onde estranhos passam ao anoitecer"
    ],
    plague: [
      "nota que os casos não seguem padrão natural",
      "descreve uma curva de contágio que parece forçada",
      "acredita que a cidade está sendo empurrada para o colapso"
    ],
    resilience: [
      "lembra que, apesar do caos, você ainda mantém leitos vivos",
      "vê em você uma muralha contra a peste",
      "diz que sua persistência virou referência na cidade"
    ]
  }
};

const RESPONSIVE_DIALOGUE_EVENTS = [
  {
    id: "church-whisper",
    contexts: ["church"],
    title: "Sussurro no Claustro",
    prompt: "Um acólito diz que preces demais atraem olhos perigosos. Como você responde?",
    options: [
      {
        text: "Reduzir ritos e focar no hospital",
        outcome: "Você promete equilíbrio. O boato esfria por ora.",
        effects: { persecution: -1, popularity: 1 }
      },
      {
        text: "Intensificar os ritos públicos",
        outcome: "A multidão aplaude, mas vozes sombrias crescem.",
        effects: { faithVisits: 1, persecution: 2, popularity: 2 }
      }
    ]
  },
  {
    id: "hospital-demand",
    contexts: ["hospital"],
    title: "Família em Desespero",
    prompt: "Parentes imploram prioridade para um leito sem pagamento. Qual postura adotar?",
    options: [
      {
        text: "Atender mesmo sem cobrar",
        outcome: "A ala reconhece seu gesto. A fila, porém, aumenta.",
        effects: { popularity: 3, freeCare: 1, plagueTrend: 1 }
      },
      {
        text: "Manter protocolo por ordem de chegada",
        outcome: "A triagem permanece justa, mas alguns o chamam de frio.",
        effects: { popularity: -1, persecution: -1 }
      }
    ]
  },
  {
    id: "road-prophecy",
    contexts: ["travel", "street"],
    title: "Profecia de Estrada",
    prompt: "Um estranho oferece um símbolo contra a peste por poucas moedas. Você aceita?",
    options: [
      {
        text: "Comprar o símbolo",
        outcome: "Você paga e segue inquieto, mas sente maior proteção.",
        effects: { coins: -4, protection: 2, persecution: -1 }
      },
      {
        text: "Recusar e seguir viagem",
        outcome: "Você ignora o presságio e guarda recursos.",
        effects: { coins: 0, plagueTrend: 1 }
      }
    ]
  },
  {
    id: "town-rumor",
    contexts: ["street", "hospital"],
    title: "Rumor de Sacos na Noite",
    prompt: "Moradores citam homens levando sacos para portas marcadas. Você reage como?",
    options: [
      {
        text: "INVESTIGAR DISCRETAMENTE",
        outcome: "Você decide investigar em silêncio. Um novo setor da cidade entra no seu mapa: Área Residencial.",
        effects: { evidence: 3, suspicion: 2, unlockResidential: 1 }
      },
      {
        text: "NEGAR PARA EVITAR PÂNICO",
        outcome: "A rua acalma, mas a dúvida persiste.",
        effects: { popularity: 1, evidence: -1, persecution: 1 }
      }
    ]
  }
];

const phaseTitle = document.getElementById("phaseTitle");
const introModal = document.getElementById("introModal");
const doctorTitleSelect = document.getElementById("doctorTitleSelect");
const doctorNameInput = document.getElementById("doctorNameInput");
const skipTutorialCheck = document.getElementById("skipTutorialCheck");
const saveSlotsList = document.getElementById("saveSlotsList");
const deleteSaveBtn = document.getElementById("deleteSaveBtn");
const phaseSpreadWarning = document.getElementById("phaseSpreadWarning");
const startJourneyBtn = document.getElementById("startJourneyBtn");
const exitGameBtn = document.getElementById("exitGameBtn");
const exitModal = document.getElementById("exitModal");
const exitSaveBtn = document.getElementById("exitSaveBtn");
const exitNoSaveBtn = document.getElementById("exitNoSaveBtn");
const exitCancelBtn = document.getElementById("exitCancelBtn");
const choiceModal = document.getElementById("choiceModal");
const choiceCloseBtn = document.getElementById("choiceCloseBtn");
const choiceTitle = document.getElementById("choiceTitle");
const choiceText = document.getElementById("choiceText");
const choiceActions = document.getElementById("choiceActions");
const tutorialModal = document.getElementById("tutorialModal");
const tutorialStepTitle = document.getElementById("tutorialStepTitle");
const tutorialStepText = document.getElementById("tutorialStepText");
const tutorialBackBtn = document.getElementById("tutorialBackBtn");
const tutorialNextBtn = document.getElementById("tutorialNextBtn");
const tutorialSkipBtn = document.getElementById("tutorialSkipBtn");
const globalStats = document.getElementById("globalStats");
const hudDoctorName = document.getElementById("hudDoctorName");
const patientInfo = document.getElementById("patientInfo");
const activeEffects = document.getElementById("activeEffects");
const hudTraitsInfo = document.getElementById("hudTraitsInfo");
const mapMenuToggle = document.getElementById("mapMenuToggle");
const mapMenuTitle = document.getElementById("mapMenuTitle");
const mapMenuPanel = document.getElementById("mapMenuPanel");
const worldMapInfo = document.getElementById("worldMapInfo");
const cityMapInfo = document.getElementById("cityMapInfo");
const miniMapLabel = document.getElementById("miniMapLabel");
const miniMapStage = document.getElementById("miniMapStage");
const rightPanel = document.querySelector(".right-panel");
const inventorySidebar = document.getElementById("inventorySidebar");
const inventoryExpandBtn = document.getElementById("inventoryExpandBtn");
const inventoryToggle = document.getElementById("inventoryToggle");
const inventoryInfo = document.getElementById("inventoryInfo");
const log = document.getElementById("log");
const narrativeSpotlight = document.getElementById("narrativeSpotlight");
const bloodStainLayer = document.getElementById("bloodStainLayer");
const bloodWarningOverlay = document.getElementById("bloodWarningOverlay");
const bloodWarningEchoes = document.getElementById("bloodWarningEchoes");
const dayStartOverlay = document.getElementById("dayStartOverlay");
const dayStartText = document.getElementById("dayStartText");
const actions = document.getElementById("actions");
const hospitalReminderPopup = document.getElementById("hospitalReminderPopup");
const hospitalReminderText = document.getElementById("hospitalReminderText");
const hospitalReminderClose = document.getElementById("hospitalReminderClose");
const inviteNoticePopup = document.getElementById("inviteNoticePopup");
const inviteNoticeClose = document.getElementById("inviteNoticeClose");
const ambulatoryReportPopup = document.getElementById("ambulatoryReportPopup");
const ambulatoryReportText = document.getElementById("ambulatoryReportText");
const ambulatoryReportClose = document.getElementById("ambulatoryReportClose");
const corpseDisposalPopup = document.getElementById("corpseDisposalPopup");
const corpseDisposalText = document.getElementById("corpseDisposalText");
const corpseDisposalClose = document.getElementById("corpseDisposalClose");
const corpseDisposalPayBtn = document.getElementById("corpseDisposalPayBtn");
const corpseDisposalLaterBtn = document.getElementById("corpseDisposalLaterBtn");
const tradePopup = document.getElementById("tradePopup");
const tradeCloseBtn = document.getElementById("tradeCloseBtn");
const tradePopupTitle = document.getElementById("tradePopupTitle");
const tradePopupText = document.getElementById("tradePopupText");
const tradePopupMeta = document.getElementById("tradePopupMeta");
const tradePopupList = document.getElementById("tradePopupList");
const tradeOfferInputWrap = document.getElementById("tradeOfferInputWrap");
const tradeOfferInput = document.getElementById("tradeOfferInput");
const tradePopupActions = document.getElementById("tradePopupActions");
const miniMapAreaPopup = document.getElementById("miniMapAreaPopup");
const miniMapAreaTitle = document.getElementById("miniMapAreaTitle");
const miniMapAreaText = document.getElementById("miniMapAreaText");
const miniMapAreaClose = document.getElementById("miniMapAreaClose");
const cityInfoPopup = document.getElementById("cityInfoPopup");
const cityInfoTitle = document.getElementById("cityInfoTitle");
const cityInfoText = document.getElementById("cityInfoText");
const cityInfoClose = document.getElementById("cityInfoClose");
const inventoryPopup = document.getElementById("inventoryPopup");
const inventoryPopupClose = document.getElementById("inventoryPopupClose");
const inventoryPopupList = document.getElementById("inventoryPopupList");
const inventoryExpandModal = document.getElementById("inventoryExpandModal");
const inventoryExpandModalClose = document.getElementById("inventoryExpandModalClose");
const inventoryExpandModalList = document.getElementById("inventoryExpandModalList");
const hudObjectivesExpandModal = document.getElementById("hudObjectivesExpandModal");
const hudObjectivesExpandModalClose = document.getElementById("hudObjectivesExpandModalClose");
const hudObjectivesExpandModalList = document.getElementById("hudObjectivesExpandModalList");
const hudTraitsExpandModal = document.getElementById("hudTraitsExpandModal");
const hudTraitsExpandModalClose = document.getElementById("hudTraitsExpandModalClose");
const hudTraitsExpandModalList = document.getElementById("hudTraitsExpandModalList");
const hudObjectives = document.getElementById("hudObjectives");
const hudTraitsSection = document.getElementById("hudTraitsSection");
const hudObjectivesSection = document.getElementById("hudObjectivesSection");
const hudTraitsToggleBtn = document.getElementById("hudTraitsToggleBtn");
const hudTraitsExpandBtn = document.getElementById("hudTraitsExpandBtn");
const hudObjectivesToggleBtn = document.getElementById("hudObjectivesToggleBtn");
const hudObjectivesExpandBtn = document.getElementById("hudObjectivesExpandBtn");
const hudSectionPopup = document.getElementById("hudSectionPopup");
const hudSectionPopupTitle = document.getElementById("hudSectionPopupTitle");
const hudSectionPopupContent = document.getElementById("hudSectionPopupContent");
const hudSectionPopupClose = document.getElementById("hudSectionPopupClose");
const blackoutOverlay = document.getElementById("blackoutOverlay");
const collapsePopup = document.getElementById("collapsePopup");
const collapseText = document.getElementById("collapseText");
const collapseOkBtn = document.getElementById("collapseOkBtn");
const finalDeathOverlay = document.getElementById("finalDeathOverlay");
const finalDeathRestartBtn = document.getElementById("finalDeathRestartBtn");
const deathPursuitOverlay = document.getElementById("deathPursuitOverlay");
const infectionOverlay = document.getElementById("infectionOverlay");
const miracleOverlay = document.getElementById("miracleOverlay");
const phase2DreamOverlay = document.getElementById("phase2DreamOverlay");
const phase2DreamLine = document.getElementById("phase2DreamLine");
const phase2DreamOptions = document.getElementById("phase2DreamOptions");
const maskInviteOverlay = document.getElementById("maskInviteOverlay");
const maskInviteHost = document.getElementById("maskInviteHost");
const maskInviteOptions = document.getElementById("maskInviteOptions");
const maskFastClockOverlay = document.getElementById("maskFastClockOverlay");
const maskFastClockText = document.getElementById("maskFastClockText");
const maskBallOverlay = document.getElementById("maskBallOverlay");
const maskBallTitle = document.getElementById("maskBallTitle");
const maskBallText = document.getElementById("maskBallText");
const maskBallOptions = document.getElementById("maskBallOptions");
let clockTimerId = null;
let bloodWarningTimerId = null;
let dayStartOverlayTimerId = null;
let deathPursuitTimerId = null;
let infectionOverlayTimerId = null;
let miracleOverlayTimerId = null;
let finalDeathTimerId = null;
let phase2DreamTimerId = null;
let maskFastForwardTimerId = null;
let maskBallTimerId = null;
let maskInviteDelayTimerId = null;
let blackoutTimerId = null;
let activeTradeDeal = null;
let actionMixClickRelay = false;
let activeChoiceConfig = null;
let audioCtx = null;
let masterGain = null;
let musicGain = null;
let sfxGain = null;
let bgMusicTimerId = null;
const customScrollbarMap = new Map();
let customScrollbarRafId = null;
let customScrollbarDragState = null;
const popupForceObserverMap = new WeakMap();
const persistentUiPopups = {
  inventoryExpandedOpen: false,
  hudSectionOpen: false,
  hudSectionTitle: "",
  hudSectionHtml: ""
};

const CUSTOM_SCROLL_SELECTORS = [
  "#log",
  "#activeEffects",
  "#inventoryPopupList",
  "#hudSectionPopupContent",
  "#saveSlotsList"
];

const CUSTOM_SCROLL_LEFT_IDS = new Set(["hudObjectives", "hudTraitsInfo"]);

function collectCustomScrollableElements() {
  const seen = new Set();
  CUSTOM_SCROLL_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (seen.has(node)) return;
      seen.add(node);
    });
  });
  return [...seen];
}

function teardownCustomScrollbar(el) {
  const rec = customScrollbarMap.get(el);
  if (!rec) return;
  el.removeEventListener("scroll", rec.onScroll);
  rec.track.removeEventListener("pointerdown", rec.onTrackPointerDown);
  rec.thumb.removeEventListener("pointerdown", rec.onThumbPointerDown);
  if (rec.track.parentElement === rec.host) rec.host.removeChild(rec.track);
  if (rec.host.classList.contains("custom-scroll-parent")) rec.host.classList.remove("custom-scroll-parent");
  el.classList.remove("custom-scrollable", "custom-scrollable-left", "custom-scroll-host");
  customScrollbarMap.delete(el);
}

function updateCustomScrollbar(el) {
  const rec = customScrollbarMap.get(el);
  if (!rec) return;
  const style = window.getComputedStyle(el);
  const isVisible = el.isConnected
    && style.display !== "none"
    && style.visibility !== "hidden"
    && el.offsetWidth > 0
    && el.clientHeight > 0;
  if (!isVisible) {
    rec.track.classList.add("is-hidden");
    rec.thumb.style.height = "0px";
    rec.thumb.style.transform = "translateY(0px)";
    return;
  }

  const hostRect = rec.host.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const trackHeight = Math.max(0, el.clientHeight - 4);
  const top = clamp(Math.round(elRect.top - hostRect.top + 2), 0, Math.max(0, rec.host.clientHeight - 8));
  const baseLeft = elRect.left - hostRect.left;
  const left = rec.isLeft
    ? Math.round(baseLeft + 2)
    : Math.round(baseLeft + el.clientWidth - 13);
  rec.track.style.top = `${top}px`;
  rec.track.style.left = `${left}px`;
  rec.track.style.height = `${Math.round(trackHeight)}px`;

  const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
  if (maxScroll <= 1 || el.clientHeight <= 0 || !el.isConnected || !rec.host.isConnected) {
    rec.track.classList.add("is-hidden");
    rec.thumb.style.height = "0px";
    rec.thumb.style.transform = "translateY(0px)";
    return;
  }

  rec.track.classList.remove("is-hidden");
  const thumbHeight = clamp(Math.round(trackHeight * (el.clientHeight / el.scrollHeight)), 26, Math.max(26, trackHeight));
  const travel = Math.max(0, trackHeight - thumbHeight);
  const offset = travel > 0 ? (el.scrollTop / maxScroll) * travel : 0;
  rec.thumb.style.height = `${thumbHeight}px`;
  rec.thumb.style.transform = `translateY(${Math.round(offset)}px)`;
}

function ensureCustomScrollbar(el) {
  let rec = customScrollbarMap.get(el);
  if (rec && (rec.track.parentElement !== rec.host || rec.thumb.parentElement !== rec.track)) {
    teardownCustomScrollbar(el);
    rec = null;
  }
  if (!rec) {
    el.classList.add("custom-scrollable", "custom-scroll-host");
    const host = el.parentElement instanceof HTMLElement ? el.parentElement : el;
    host.classList.add("custom-scroll-parent");
    const isLeft = CUSTOM_SCROLL_LEFT_IDS.has(el.id);
    if (isLeft) el.classList.add("custom-scrollable-left");
    const track = document.createElement("div");
    track.className = "custom-scroll-track";
    const thumb = document.createElement("div");
    thumb.className = "custom-scroll-thumb";
    track.style.pointerEvents = "none";
    thumb.style.pointerEvents = "none";
    track.appendChild(thumb);
    host.appendChild(track);

    const onScroll = () => updateCustomScrollbar(el);
    const onTrackPointerDown = (event) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (event.target.closest(".custom-scroll-thumb")) return;
      event.preventDefault();
      const rect = track.getBoundingClientRect();
      const ratio = (event.clientY - rect.top) / rect.height;
      const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
      el.scrollTop = clamp(Math.round(maxScroll * ratio), 0, maxScroll);
      updateCustomScrollbar(el);
    };
    const onThumbPointerDown = (event) => {
      event.preventDefault();
      const thumbRect = thumb.getBoundingClientRect();
      customScrollbarDragState = {
        el,
        startClientY: event.clientY,
        startScrollTop: el.scrollTop,
        thumbHeight: thumbRect.height
      };
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    // Barra visual apenas: não captura cliques para evitar bloquear botões próximos.
    track.addEventListener("pointerdown", onTrackPointerDown);
    thumb.addEventListener("pointerdown", onThumbPointerDown);
    rec = { track, thumb, host, isLeft, onScroll, onTrackPointerDown, onThumbPointerDown };
    customScrollbarMap.set(el, rec);
  }
  updateCustomScrollbar(el);
}

function refreshCustomScrollbars() {
  const elements = collectCustomScrollableElements();
  const present = new Set(elements);
  customScrollbarMap.forEach((_, el) => {
    if (!el.isConnected || !present.has(el)) teardownCustomScrollbar(el);
  });
  elements.forEach((el) => ensureCustomScrollbar(el));
}

function queueCustomScrollbarRefresh() {
  if (customScrollbarRafId) cancelAnimationFrame(customScrollbarRafId);
  customScrollbarRafId = requestAnimationFrame(() => {
    customScrollbarRafId = null;
    refreshCustomScrollbars();
  });
}

document.addEventListener("pointermove", (event) => {
  if (!customScrollbarDragState) return;
  const { el, startClientY, startScrollTop, thumbHeight } = customScrollbarDragState;
  if (!(el instanceof HTMLElement)) return;
  const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
  const travel = Math.max(1, el.clientHeight - 4 - thumbHeight);
  const deltaY = event.clientY - startClientY;
  el.scrollTop = clamp(startScrollTop + (deltaY / travel) * maxScroll, 0, maxScroll);
  updateCustomScrollbar(el);
});

document.addEventListener("pointerup", () => {
  customScrollbarDragState = null;
});

window.addEventListener("resize", queueCustomScrollbarRefresh);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function isActionMixActive() {
  return state.phase === 1 && getUnsleptMinutes() >= 24 * 60;
}

function getActionMixLevel() {
  if (!isActionMixActive()) return 0;
  return clamp(Math.max(1, state.blackoutCount), 1, 5);
}

function annotateActionButton(button, actionId) {
  if (!(button instanceof HTMLButtonElement)) return;
  button.dataset.actionId = actionId;
  button.dataset.baseLabel = button.textContent || "";
}

function buildMixedActionLabel(baseLabel, partnerLabel) {
  const normalize = (txt) => (txt || "").replace(/\s+/g, " ").trim();
  const a = normalize(baseLabel).split(" ").filter(Boolean);
  const b = normalize(partnerLabel).split(" ").filter(Boolean);
  if (!a.length) return normalize(baseLabel);
  if (!b.length) return normalize(baseLabel);
  if (a.length === 1 || b.length === 1) return `${a[0]} ${b[b.length - 1]}`.trim();
  const head = a.slice(0, Math.max(1, Math.floor(a.length / 2)));
  const tail = b.slice(Math.max(0, b.length - Math.ceil(b.length / 2)));
  return `${head.join(" ")} ${tail.join(" ")}`.trim();
}

function triggerActionMixOnHover(button) {
  if (!(button instanceof HTMLButtonElement)) return;
  if (!isActionMixActive()) return;
  if (button.disabled) return;
  const actionId = button.dataset.actionId;
  if (!actionId) return;

  const mixLevel = getActionMixLevel();
  const cycleLength = mixLevel + 1;
  const nextCount = (state.actionMixCounters[actionId] || 0) + 1;
  state.actionMixCounters[actionId] = nextCount;
  const cyclePos = ((nextCount - 1) % cycleLength) + 1;

  const baseLabel = button.dataset.baseLabel || button.textContent || "";
  if (cyclePos > mixLevel) {
    button.textContent = baseLabel;
    button.dataset.mixedActionId = "";
    return;
  }

  const candidates = Array.from(actions.querySelectorAll("button[data-action-id]"))
    .filter((btn) => btn instanceof HTMLButtonElement)
    .filter((btn) => btn.dataset.actionId && btn.dataset.actionId !== actionId)
    .filter((btn) => !btn.disabled);

  if (!candidates.length) {
    button.textContent = baseLabel;
    button.dataset.mixedActionId = "";
    return;
  }

  const pickIndex = nextCount % candidates.length;
  const partner = candidates[pickIndex];
  const partnerId = partner.dataset.actionId || "";
  const partnerLabel = partner.dataset.baseLabel || partner.textContent || "";
  button.textContent = buildMixedActionLabel(baseLabel, partnerLabel);
  button.dataset.mixedActionId = partnerId;
}

function getMiniMapProfile(areaId = state.currentAreaId) {
  if (state.phase === 2) return MINI_MAP_SCENE_PROFILES.phase2;
  if (state.phase === 3) return MINI_MAP_SCENE_PROFILES.phase3;
  return MINI_MAP_SCENE_PROFILES[areaId] || MINI_MAP_SCENE_PROFILES.default;
}

function getMiniMapSceneKey() {
  return [
    state.phase,
    state.currentCityId,
    state.currentAreaId,
    state.maskEventActive ? 1 : 0
  ].join(":");
}

function isHospitalMiniMapScenario() {
  return state.phase === 1 && state.currentAreaId === "hospital";
}

function isChurchMiniMapScenario() {
  return state.phase === 1 && state.currentAreaId === "igreja";
}

function isShopMiniMapScenario() {
  return state.phase === 1 && state.currentAreaId === "loja";
}

function isTentMiniMapScenario() {
  return state.phase === 1 && state.currentAreaId === "tenda";
}

function isStableMiniMapScenario() {
  return state.phase === 1 && state.currentAreaId === "estabulo";
}

function getCityMiniState(cityId = state.currentCityId) {
  if (!state.miniMapCityState || typeof state.miniMapCityState !== "object") {
    state.miniMapCityState = {};
  }
  if (!state.miniMapCityState[cityId] || typeof state.miniMapCityState[cityId] !== "object") {
    state.miniMapCityState[cityId] = {
      hospital: createDefaultHospitalMiniState(),
      church: createDefaultChurchMiniState(),
      shop: createDefaultShopMiniState(),
      tent: createDefaultTentMiniState()
    };
  }
  const cityState = state.miniMapCityState[cityId];
  if (!cityState.hospital || typeof cityState.hospital !== "object") {
    cityState.hospital = createDefaultHospitalMiniState();
  }
  if (!cityState.church || typeof cityState.church !== "object") {
    cityState.church = createDefaultChurchMiniState();
  }
  if (!cityState.shop || typeof cityState.shop !== "object") {
    cityState.shop = createDefaultShopMiniState();
  }
  if (!cityState.tent || typeof cityState.tent !== "object") {
    cityState.tent = createDefaultTentMiniState();
  }
  return cityState;
}

function ensureAllCitiesMiniState() {
  WORLD_MAP.forEach((city) => {
    getCityMiniState(city.id);
  });
}

function getCityHospitalState(cityId = state.currentCityId) {
  if (!state.cityHospitalState || typeof state.cityHospitalState !== "object") {
    state.cityHospitalState = {};
  }
  if (!state.cityHospitalState[cityId] || typeof state.cityHospitalState[cityId] !== "object") {
    state.cityHospitalState[cityId] = createDefaultCityHospitalState();
  }
  const cityHosp = state.cityHospitalState[cityId];
  if (!Array.isArray(cityHosp.ambulatory)) cityHosp.ambulatory = [];
  if (!Number.isFinite(cityHosp.nextAmbulatoryId)) cityHosp.nextAmbulatoryId = 1;
  if (!Number.isFinite(cityHosp.turnCursorMinute)) cityHosp.turnCursorMinute = Number.NaN;
  if (!Array.isArray(cityHosp.reportEvents)) cityHosp.reportEvents = [];
  if (typeof cityHosp.reportPending !== "boolean") cityHosp.reportPending = false;
  if (!cityHosp.pendingTriageEscort || typeof cityHosp.pendingTriageEscort !== "object") {
    cityHosp.pendingTriageEscort = null;
  }
  cityHosp.ambulatory.forEach((patient) => {
    if (typeof patient.enhancedCare !== "boolean") patient.enhancedCare = false;
    if (!Number.isFinite(patient.enhancedCareSinceDay)) patient.enhancedCareSinceDay = -1;
  });
  return cityHosp;
}

function ensureAllCitiesHospitalState() {
  WORLD_MAP.forEach((city) => {
    getCityHospitalState(city.id);
  });
}

function pickStableHandlerProfile(cityId, excludeName = "") {
  const pool = STABLE_HANDLER_PROFILES[cityId] || STABLE_HANDLER_PROFILES.valedouro;
  const filtered = pool.filter((entry) => entry.name !== excludeName);
  const source = filtered.length ? filtered : pool;
  return source[randomInt(0, source.length - 1)];
}

function createDefaultCityStableState(cityId) {
  const profile = pickStableHandlerProfile(cityId);
  return {
    handler: {
      name: profile.name,
      story: profile.story,
      alive: true,
      infected: false,
      infectionSeverity: 0,
      infectionVisits: 0,
      discountUnlocked: false,
      replacementIntroPending: false
    },
    pendingReplacement: false,
    previousHandlerName: "",
    previousHandlerCause: ""
  };
}

function getCityStableState(cityId = state.currentCityId) {
  if (!state.cityStableState || typeof state.cityStableState !== "object") {
    state.cityStableState = {};
  }
  if (!state.cityStableState[cityId] || typeof state.cityStableState[cityId] !== "object") {
    state.cityStableState[cityId] = createDefaultCityStableState(cityId);
  }
  const stable = state.cityStableState[cityId];
  if (!stable.handler || typeof stable.handler !== "object") {
    stable.handler = createDefaultCityStableState(cityId).handler;
  }
  if (typeof stable.pendingReplacement !== "boolean") stable.pendingReplacement = false;
  if (typeof stable.previousHandlerName !== "string") stable.previousHandlerName = "";
  if (typeof stable.previousHandlerCause !== "string") stable.previousHandlerCause = "";
  return stable;
}

function ensureAllCitiesStableState() {
  WORLD_MAP.forEach((city) => {
    getCityStableState(city.id);
  });
}

function spawnReplacementStableHandler(cityId = state.currentCityId) {
  const stable = getCityStableState(cityId);
  const profile = pickStableHandlerProfile(cityId, stable.previousHandlerName);
  stable.handler = {
    name: profile.name,
    story: profile.story,
    alive: true,
    infected: false,
    infectionSeverity: 0,
    infectionVisits: 0,
    discountUnlocked: false,
    replacementIntroPending: true
  };
  stable.pendingReplacement = false;
}

function maybeUpdateStableHandlerOnEntry(cityId = state.currentCityId) {
  const stable = getCityStableState(cityId);
  const handler = stable.handler;
  if (!handler || !handler.alive) {
    stable.pendingReplacement = true;
  }
  if (stable.pendingReplacement) {
    spawnReplacementStableHandler(cityId);
    return;
  }
  if (!handler.infected) {
    if (Math.random() < 0.05) {
      handler.infected = true;
      handler.infectionSeverity = randomInt(38, 66);
      handler.infectionVisits = 0;
      addLog(`No estábulo, ${handler.name} parece febril e abatido pela peste.`, { type: "event" });
    }
    return;
  }

  handler.infectionVisits += 1;
  handler.infectionSeverity = clamp(handler.infectionSeverity + randomInt(6, 14), 0, 100);
  if (handler.infectionVisits >= 2 && (handler.infectionSeverity >= 88 || Math.random() < 0.35)) {
    handler.alive = false;
    stable.pendingReplacement = true;
    stable.previousHandlerName = handler.name;
    stable.previousHandlerCause = "peste";
    addLog(`${handler.name}, tratador do estábulo, sucumbiu à peste. Um substituto deve chegar em breve.`, { type: "event" });
  }
}

function getTravelDiscountPercent(cityId = state.currentCityId) {
  const stable = getCityStableState(cityId);
  const handler = stable.handler;
  if (!(handler && handler.alive && handler.discountUnlocked)) return 0;
  const city = getCityById(cityId);
  const riskBoost = Math.round((city.contagionRisk || 0) * 100 * 0.35);
  return clamp(10 + riskBoost, 10, 35);
}

function ensureHospitalMiniState() {
  const cityState = getCityMiniState(state.currentCityId);
  state.miniMapHospital = cityState.hospital;
  if (!Number.isFinite(state.miniMapHospital.queueSize)) state.miniMapHospital.queueSize = HOSPITAL_QUEUE_TARGET;
  if (!Number.isFinite(state.miniMapHospital.modeTimer)) state.miniMapHospital.modeTimer = 0;
  if (!Number.isFinite(state.miniMapHospital.corpseCount)) state.miniMapHospital.corpseCount = 0;
  if (typeof state.miniMapHospital.cartCleanupActive !== "boolean") state.miniMapHospital.cartCleanupActive = false;
  state.miniMapHospital.queueSize = HOSPITAL_QUEUE_TARGET;
  state.miniMapHospital.corpseCount = clamp(Math.round(state.miniMapHospital.corpseCount), 0, 24);
  state.miniMapHospital.activeMode = (state.miniMapHospital.activeMode || "none").toString();
  return state.miniMapHospital;
}

function ensureChurchMiniState() {
  const cityState = getCityMiniState(state.currentCityId);
  state.miniMapChurch = cityState.church;
  state.miniMapChurch.mode = (state.miniMapChurch.mode || "altar").toString();
  if (!Number.isFinite(state.miniMapChurch.modeTimer)) state.miniMapChurch.modeTimer = 0;
  if (!Number.isFinite(state.miniMapChurch.nextFaithfulId)) state.miniMapChurch.nextFaithfulId = 1;
  if (!Number.isFinite(state.miniMapChurch.pendingArrivals)) state.miniMapChurch.pendingArrivals = 0;
  if (!Number.isFinite(state.miniMapChurch.lastGatherAt)) state.miniMapChurch.lastGatherAt = 0;
  state.miniMapChurch.nextFaithfulId = Math.max(1, Math.round(state.miniMapChurch.nextFaithfulId));
  state.miniMapChurch.pendingArrivals = clamp(Math.round(state.miniMapChurch.pendingArrivals), 0, 20);
  return state.miniMapChurch;
}

function ensureShopMiniState() {
  const cityState = getCityMiniState(state.currentCityId);
  state.miniMapShop = cityState.shop;
  state.miniMapShop.mode = (state.miniMapShop.mode || "idle").toString();
  if (!Number.isFinite(state.miniMapShop.modeTimer)) state.miniMapShop.modeTimer = 0;
  if (!Number.isFinite(state.miniMapShop.nextCustomerId)) state.miniMapShop.nextCustomerId = 1;
  state.miniMapShop.nextCustomerId = Math.max(1, Math.round(state.miniMapShop.nextCustomerId));
  return state.miniMapShop;
}

function ensureTentMiniState() {
  const cityState = getCityMiniState(state.currentCityId);
  state.miniMapTent = cityState.tent;
  state.miniMapTent.mode = (state.miniMapTent.mode || "idle").toString();
  if (!Number.isFinite(state.miniMapTent.modeTimer)) state.miniMapTent.modeTimer = 0;
  if (typeof state.miniMapTent.focusCharacterId !== "string") state.miniMapTent.focusCharacterId = "";
  if (typeof state.miniMapTent.refreshPendingSpawn !== "boolean") state.miniMapTent.refreshPendingSpawn = false;
  if (typeof state.miniMapTent.transferCharacterId !== "string") state.miniMapTent.transferCharacterId = "";
  if (typeof state.miniMapTent.transferNurseId !== "string") state.miniMapTent.transferNurseId = "";
  if (typeof state.miniMapTent.transferPhase !== "string") state.miniMapTent.transferPhase = "";
  if (!state.miniMapTent.transferOutToHospital || typeof state.miniMapTent.transferOutToHospital !== "object") {
    state.miniMapTent.transferOutToHospital = null;
  }
  return state.miniMapTent;
}

function ensureStableMiniState() {
  if (!state.miniMapStable || typeof state.miniMapStable !== "object") {
    state.miniMapStable = createDefaultStableMiniState();
  }
  state.miniMapStable.mode = (state.miniMapStable.mode || "idle").toString();
  if (!Number.isFinite(state.miniMapStable.modeTimer)) state.miniMapStable.modeTimer = 0;
  if (!state.miniMapStable.horseTargets || typeof state.miniMapStable.horseTargets !== "object") {
    state.miniMapStable.horseTargets = {};
  }
  return state.miniMapStable;
}

function createMiniMapEntity(role, x, y, extra = {}) {
  return {
    id: state.miniMapNextEntityId++,
    role,
    x: clamp(x, 5, 95),
    y: clamp(y, 6, 94),
    vx: (Math.random() * 2 - 1) * 9,
    vy: (Math.random() * 2 - 1) * 9,
    ...extra
  };
}

function spawnHospitalActivePatient(variant = "active") {
  const entity = createMiniMapEntity("patient", HOSPITAL_MINI_ZONES.queueStart.x, HOSPITAL_MINI_ZONES.queueStart.y, {
    tag: "active-patient",
    variant,
    scripted: true,
    vx: 0,
    vy: 0
  });
  state.miniMapEntities.push(entity);
  return entity;
}

function getHospitalActivePatientEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "active-patient") || null;
}

function getHospitalCorpseTransitEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "corpse-transit") || null;
}

function getHospitalDoctorEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "doctor") || null;
}

function getHospitalNurseEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "nurse") || null;
}

function getHospitalEscortNurseEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "escort-nurse") || null;
}

function getHospitalEscortPatientEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "escort-patient") || null;
}

function getAmbulatoryPatientSlot(cityId, ambId) {
  const cityHosp = getCityHospitalState(cityId);
  const slotIndex = cityHosp.ambulatory.findIndex((item) => item.ambId === ambId);
  if (slotIndex < 0) return null;
  const slot = HOSPITAL_AMBULATORY_SLOTS[slotIndex];
  if (!slot) return null;
  return {
    patient: cityHosp.ambulatory[slotIndex],
    slotIndex,
    slot
  };
}

function startAmbulatoryCareEscort(cityId, ambId) {
  if (!isHospitalMiniMapScenario()) return;
  if (cityId !== state.currentCityId) return;
  ensureMiniMapScene();
  const target = getAmbulatoryPatientSlot(cityId, ambId);
  if (!target) return;
  const transitTag = `amb-care-transit-${ambId}`;
  const fixedTag = `amb-care-${ambId}`;
  state.miniMapEntities = state.miniMapEntities.filter((entity) => entity.tag !== transitTag && entity.tag !== fixedTag);
  const escort = createMiniMapEntity("generic", HOSPITAL_MINI_ZONES.nurseIdle.x, HOSPITAL_MINI_ZONES.nurseIdle.y, {
    tag: transitTag,
    variant: "care",
    scripted: true,
    ambId,
    targetX: target.slot.x + 3.2,
    targetY: target.slot.y - 0.8,
    vx: 0,
    vy: 0
  });
  state.miniMapEntities.push(escort);
}

function removeHospitalActivePatientEntity() {
  state.miniMapEntities = state.miniMapEntities.filter((entity) => entity.tag !== "active-patient");
}

function addHospitalCorpseMarker() {
  ensureHospitalMiniState();
  state.miniMapHospital.corpseCount = clamp(state.miniMapHospital.corpseCount + 1, 0, 24);
  const idx = state.miniMapHospital.corpseCount - 1;
  const col = idx % 5;
  const row = Math.floor(idx / 5);
  const corpse = createMiniMapEntity("corpse", HOSPITAL_MINI_ZONES.discard.x - 6 + col * 3.2, HOSPITAL_MINI_ZONES.discard.y - row * 2.8, {
    tag: `corpse-${idx + 1}`,
    variant: "corpse",
    scripted: true,
    vx: 0,
    vy: 0
  });
  state.miniMapEntities.push(corpse);
  if (isHospitalMiniMapScenario()) {
    showCorpseDisposalPopup(state.currentCityId);
  }
}

function syncHospitalAmbulatoryEntities() {
  if (!isHospitalMiniMapScenario()) return;
  const cityHosp = getCityHospitalState(state.currentCityId);
  const activeAmbIds = new Set(cityHosp.ambulatory.map((item) => item.ambId));
  state.miniMapEntities = state.miniMapEntities.filter((entity) => {
    const tag = String(entity.tag || "");
    if (tag.startsWith("amb-slot-")) return false;
    if (tag.startsWith("amb-care-")) {
      const ambId = Number(tag.split("-").pop());
      const slotData = getAmbulatoryPatientSlot(state.currentCityId, ambId);
      return !!(activeAmbIds.has(ambId) && slotData && slotData.patient.enhancedCare);
    }
    return true;
  });
  for (let slotIndex = 0; slotIndex < 4; slotIndex += 1) {
    const ambPatient = cityHosp.ambulatory[slotIndex];
    if (!ambPatient) continue;
    const slot = HOSPITAL_AMBULATORY_SLOTS[slotIndex];
    const stageId = getPatientStageIdByHp(ambPatient.hp);
    const stageLabel = CLINICAL_STAGES.find((s) => s.id === stageId)?.label || "Crítico";
    const canRelease = canAmbulatoryRelease(ambPatient);
    const tooltip = [
      `${ambPatient.name}`,
      `Vida: ${Math.round(ambPatient.hp)}/100`,
      `Severidade: ${Math.round(ambPatient.severity)}/100`,
      `Estágio: ${stageLabel}`,
      `Status: ${canRelease ? "Pode liberar" : "Em observação"}`,
      `Cuidados reforçados: ${ambPatient.enhancedCare ? "Ativo" : "Padrão"}`
    ].join(" | ");
    state.miniMapEntities.push(createMiniMapEntity("patient", slot.x, slot.y, {
      tag: `amb-slot-${slotIndex + 1}-amb-${ambPatient.ambId}`,
      variant: canRelease ? "remission" : "ambulatory",
      scripted: true,
      tooltip,
      vx: 0,
      vy: 0
    }));
    if (ambPatient.enhancedCare) {
      const transitExists = state.miniMapEntities.some((entity) => entity.tag === `amb-care-transit-${ambPatient.ambId}`);
      if (!transitExists) {
        state.miniMapEntities.push(createMiniMapEntity("generic", slot.x + 3.2, slot.y - 0.8, {
          tag: `amb-care-${ambPatient.ambId}`,
          variant: "care",
          scripted: true,
          vx: 0,
          vy: 0
        }));
      }
    }
  }
}

function buildHospitalMiniMapEntities() {
  ensureHospitalMiniState();
  const entities = [];
  const doctor = createMiniMapEntity("player", HOSPITAL_MINI_ZONES.doctorRoom.x, HOSPITAL_MINI_ZONES.doctorRoom.y, {
    tag: "doctor",
    scripted: true,
    vx: 0,
    vy: 0
  });
  const nurse = createMiniMapEntity("generic", HOSPITAL_MINI_ZONES.nurseIdle.x, HOSPITAL_MINI_ZONES.nurseIdle.y, {
    tag: "nurse",
    variant: "nurse",
    scripted: true,
    vx: 0,
    vy: 0
  });
  entities.push(doctor, nurse);
  entities.push(createMiniMapEntity("main", 71, 22, { tag: "chief-npc", scripted: true, vx: 0, vy: 0 }));

  for (let i = 0; i < HOSPITAL_QUEUE_TARGET; i += 1) {
    const y = HOSPITAL_MINI_ZONES.queueStart.y + i * HOSPITAL_MINI_ZONES.queueStepY;
    entities.push(createMiniMapEntity("patient", HOSPITAL_MINI_ZONES.queueStart.x, y, {
      tag: `queue-${i + 1}`,
      variant: "queued",
      scripted: true,
      vx: 0,
      vy: 0
    }));
  }

  const cityHosp = getCityHospitalState(state.currentCityId);
  const pendingEscort = cityHosp.pendingTriageEscort;
  if (pendingEscort && pendingEscort.status === "waiting" && !state.currentPatient) {
    entities.push(createMiniMapEntity("generic", HOSPITAL_MINI_ZONES.escortQueueNurse.x, HOSPITAL_MINI_ZONES.escortQueueNurse.y, {
      tag: "escort-nurse",
      variant: "triage-nurse",
      scripted: true,
      hospitalEscortState: "queue",
      vx: 0,
      vy: 0
    }));
    entities.push(createMiniMapEntity("patient", HOSPITAL_MINI_ZONES.escortQueuePatient.x, HOSPITAL_MINI_ZONES.escortQueuePatient.y, {
      tag: "escort-patient",
      variant: "queued",
      scripted: true,
      vx: 0,
      vy: 0
    }));
  }

  for (let i = 0; i < state.miniMapHospital.corpseCount; i += 1) {
    const col = i % 5;
    const row = Math.floor(i / 5);
    entities.push(createMiniMapEntity("corpse", HOSPITAL_MINI_ZONES.discard.x - 6 + col * 3.2, HOSPITAL_MINI_ZONES.discard.y - row * 2.8, {
      tag: `corpse-${i + 1}`,
      variant: "corpse",
      scripted: true,
      vx: 0,
      vy: 0
    }));
  }

  if (state.currentPatient && state.currentPatient.active) {
    const mode = state.miniMapHospital.activeMode === "none" ? "approach" : state.miniMapHospital.activeMode;
    state.miniMapHospital.activeMode = mode;
    state.miniMapHospital.modeTimer = 0;
    const active = createMiniMapEntity("patient", HOSPITAL_MINI_ZONES.queueStart.x + 1, HOSPITAL_MINI_ZONES.queueStart.y + 1, {
      tag: "active-patient",
      variant: "active",
      scripted: true,
      vx: 0,
      vy: 0
    });
    entities.push(active);
  }
  const previousEntities = state.miniMapEntities;
  state.miniMapEntities = entities;
  syncHospitalAmbulatoryEntities();
  const withAmb = state.miniMapEntities;
  state.miniMapEntities = previousEntities;
  return withAmb;
}

function createChurchFaithful(benchIndex, arriving = false) {
  ensureChurchMiniState();
  const slot = CHURCH_MINI_ZONES.benchSlots[benchIndex % CHURCH_MINI_ZONES.benchSlots.length];
  const id = state.miniMapChurch.nextFaithfulId++;
  return createMiniMapEntity("generic", arriving ? 98 : slot.x, arriving ? 84 : slot.y, {
    tag: `faithful-${id}`,
    variant: "faithful",
    scripted: true,
    benchIndex,
    churchState: arriving ? "arriving" : "praying",
    prayerTimer: randomInt(55, 130) / 10,
    vx: 0,
    vy: 0
  });
}

function buildChurchMiniMapEntities() {
  ensureChurchMiniState();
  const entities = [];
  entities.push(createMiniMapEntity("player", CHURCH_MINI_ZONES.doctorBase.x, CHURCH_MINI_ZONES.doctorBase.y, {
    tag: "doctor",
    scripted: true,
    vx: 0,
    vy: 0
  }));
  entities.push(createMiniMapEntity("main", CHURCH_MINI_ZONES.altar.x, CHURCH_MINI_ZONES.altar.y, {
    tag: "priest",
    variant: "priest",
    scripted: true,
    vx: 0,
    vy: 0
  }));
  for (let i = 0; i < 6; i += 1) {
    entities.push(createChurchFaithful(i, false));
  }
  entities.push(createMiniMapEntity("patient", 74, 56, {
    tag: "church-seeker-1",
    variant: "seeker",
    scripted: true,
    benchIndex: 6,
    churchState: "arriving",
    prayerTimer: randomInt(35, 80) / 10,
    vx: 0,
    vy: 0
  }));
  entities.push(createMiniMapEntity("patient", 96, 86, {
    tag: "church-seeker-2",
    variant: "seeker",
    scripted: true,
    benchIndex: 7,
    churchState: "arriving",
    prayerTimer: randomInt(35, 80) / 10,
    vx: 0,
    vy: 0
  }));
  return entities;
}

function getShopDoctorEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "shop-doctor") || null;
}

function getShopMerchantEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "shop-merchant") || null;
}

function getShopTurnCustomerEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "shop-turn-customer") || null;
}

function buildShopMiniMapEntities() {
  ensureShopMiniState();
  const entities = [];
  entities.push(createMiniMapEntity("player", SHOP_MINI_ZONES.doctorIdle.x, SHOP_MINI_ZONES.doctorIdle.y, {
    tag: "shop-doctor",
    scripted: true,
    vx: 0,
    vy: 0
  }));
  entities.push(createMiniMapEntity("main", SHOP_MINI_ZONES.merchantIdle.x, SHOP_MINI_ZONES.merchantIdle.y, {
    tag: "shop-merchant",
    variant: "merchant",
    scripted: true,
    vx: 0,
    vy: 0
  }));
  entities.push(createMiniMapEntity("generic", SHOP_MINI_ZONES.shopperQueue.x, SHOP_MINI_ZONES.shopperQueue.y, {
    tag: "shop-turn-customer",
    variant: "shopper",
    scripted: true,
    shopState: "queue",
    vx: 0,
    vy: 0
  }));
  for (let i = 0; i < 4; i += 1) {
    entities.push(createMiniMapEntity("generic", randomInt(12, 88), randomInt(64, 90), {
      tag: `shop-generic-${i + 1}`,
      variant: "shopper",
      scripted: true,
      shopState: "wandering",
      shopTargetX: randomInt(SHOP_MINI_ZONES.wanderMinX, SHOP_MINI_ZONES.wanderMaxX),
      shopTargetY: randomInt(SHOP_MINI_ZONES.wanderMinY, SHOP_MINI_ZONES.wanderMaxY),
      shopTargetTimer: randomInt(10, 36) / 10,
      vx: 0,
      vy: 0
    }));
  }
  return entities;
}

function getTentDoctorEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "tent-doctor") || null;
}

function getTentCharacterEntity(characterId) {
  return state.miniMapEntities.find((entity) => entity.tag === `tent-char-${characterId}`) || null;
}

function getTentRosterCharacterIds() {
  if (Array.isArray(state.triageRosterIds) && state.triageRosterIds.length) {
    return state.triageRosterIds.slice(0, 10);
  }
  refreshTriageRoster(false);
  return state.triageRosterIds.slice(0, 10);
}

function getTentAnchorByIndex(index) {
  const col = index % TENT_MINI_ZONES.triageCols;
  const row = Math.floor(index / TENT_MINI_ZONES.triageCols);
  return {
    x: TENT_MINI_ZONES.triageStart.x + col * TENT_MINI_ZONES.triageColStep,
    y: TENT_MINI_ZONES.triageStart.y + row * TENT_MINI_ZONES.triageRowStep
  };
}

function buildTentMiniMapEntities() {
  ensureTentMiniState();
  const entities = [];
  entities.push(createMiniMapEntity("player", TENT_MINI_ZONES.doctorBase.x, TENT_MINI_ZONES.doctorBase.y, {
    tag: "tent-doctor",
    scripted: true,
    vx: 0,
    vy: 0
  }));
  const rosterIds = getTentRosterCharacterIds();
  rosterIds.forEach((characterId, idx) => {
    const character = getTriageCharacterById(characterId);
    if (!character) return;
    const anchor = getTentAnchorByIndex(idx);
    const isNurse = character.role === "enfermeira";
    const nurseStatus = isNurse ? getTriageNurseStatus(character.id) : "idle";
    const transferNurseVisible = isNurse
      && state.miniMapTent.mode === "transfer"
      && state.miniMapTent.transferNurseId === character.id;
    if (isNurse && nurseStatus === "escort" && !transferNurseVisible) return;
    entities.push(createMiniMapEntity(isNurse ? "generic" : "patient", anchor.x, anchor.y, {
      tag: `tent-char-${character.id}`,
      variant: isNurse ? "triage-nurse" : "triage-patient",
      scripted: true,
      tentRole: character.role,
      tentCharacterId: character.id,
      tentAnchorX: anchor.x,
      tentAnchorY: anchor.y,
      tentPatrolX: anchor.x,
      tentPatrolY: anchor.y,
      tentPatrolTimer: randomInt(8, 24) / 10,
      tooltip: `${character.name} | ${character.role === "enfermeira" ? (nurseStatus === "escort" ? "Enfermeira (em acompanhamento para o hospital)" : "Enfermeira em serviço") : "Paciente da triagem"}`,
      vx: 0,
      vy: 0
    }));
  });
  return entities;
}

function getStableDoctorEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "stable-doctor") || null;
}

function getStableHandlerEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "stable-handler") || null;
}

function getStableDriverEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "stable-driver") || null;
}

function getStableHorseEntities() {
  return state.miniMapEntities.filter((entity) => String(entity.tag || "").startsWith("stable-horse-"));
}

function buildStableMiniMapEntities() {
  ensureStableMiniState();
  const stable = getCityStableState(state.currentCityId);
  const handlerInfo = stable.handler;
  const entities = [];
  entities.push(createMiniMapEntity("player", STABLE_MINI_ZONES.doctorBase.x, STABLE_MINI_ZONES.doctorBase.y, {
    tag: "stable-doctor",
    scripted: true,
    vx: 0,
    vy: 0
  }));
  if (handlerInfo && handlerInfo.alive) {
    entities.push(createMiniMapEntity("generic", STABLE_MINI_ZONES.handlerBase.x, STABLE_MINI_ZONES.handlerBase.y, {
      tag: "stable-handler",
      variant: handlerInfo.infected ? "handler-sick" : "handler",
      tooltip: `${handlerInfo.name} | ${handlerInfo.infected ? "Com sinais de peste" : "Saudável"}`,
      scripted: true,
      stableTargetX: STABLE_MINI_ZONES.horseArea.x1 + 8,
      stableTargetY: STABLE_MINI_ZONES.horseArea.y1 + 10,
      stableTimer: randomInt(8, 20) / 10,
      vx: 0,
      vy: 0
    }));
  }
  entities.push(createMiniMapEntity("main", STABLE_MINI_ZONES.driver.x, STABLE_MINI_ZONES.driver.y, {
    tag: "stable-driver",
    variant: "coachman",
    scripted: true,
    vx: 0,
    vy: 0
  }));
  entities.push(createMiniMapEntity("generic", STABLE_MINI_ZONES.carriage.x, STABLE_MINI_ZONES.carriage.y, {
    tag: "stable-carriage",
    variant: "cart",
    scripted: true,
    vx: 0,
    vy: 0
  }));
  for (let i = 0; i < 5; i += 1) {
    const hx = randomInt(STABLE_MINI_ZONES.horseArea.x1 + 5, STABLE_MINI_ZONES.horseArea.x2 - 5);
    const hy = randomInt(STABLE_MINI_ZONES.horseArea.y1 + 5, STABLE_MINI_ZONES.horseArea.y2 - 5);
    entities.push(createMiniMapEntity("generic", hx, hy, {
      tag: `stable-horse-${i + 1}`,
      variant: "horse",
      scripted: true,
      stableTargetX: hx,
      stableTargetY: hy,
      stableTimer: randomInt(10, 24) / 10,
      vx: 0,
      vy: 0
    }));
  }
  return entities;
}

function buildMiniMapEntities() {
  if (isHospitalMiniMapScenario()) {
    return buildHospitalMiniMapEntities();
  }
  if (isChurchMiniMapScenario()) {
    return buildChurchMiniMapEntities();
  }
  if (isShopMiniMapScenario()) {
    return buildShopMiniMapEntities();
  }
  if (isStableMiniMapScenario()) {
    return buildStableMiniMapEntities();
  }
  if (isTentMiniMapScenario()) {
    return buildTentMiniMapEntities();
  }
  const profile = getMiniMapProfile();
  const entities = [];
  entities.push(createMiniMapEntity("player", randomInt(45, 55), randomInt(46, 58)));

  const genericCount = randomInt(profile.generic[0], profile.generic[1]);
  const mainCount = randomInt(profile.main[0], profile.main[1]);
  let patientCount = randomInt(profile.patientBase[0], profile.patientBase[1]);

  if (state.phase === 1 && state.currentAreaId === "hospital" && state.currentPatient && state.currentPatient.active) {
    patientCount += 1;
  }
  if (state.travelEncounter && state.travelEncounter.type === "merchant") {
    patientCount = Math.max(0, patientCount - 1);
  }

  for (let i = 0; i < genericCount; i += 1) {
    entities.push(createMiniMapEntity("generic", randomInt(8, 92), randomInt(10, 90)));
  }
  for (let i = 0; i < mainCount; i += 1) {
    entities.push(createMiniMapEntity("main", randomInt(10, 90), randomInt(12, 88)));
  }
  for (let i = 0; i < patientCount; i += 1) {
    entities.push(createMiniMapEntity("patient", randomInt(12, 88), randomInt(16, 86)));
  }

  if (state.travelEncounter && state.travelEncounter.type === "merchant") {
    entities.push(createMiniMapEntity("main", randomInt(70, 88), randomInt(44, 62)));
    entities.push(createMiniMapEntity("generic", randomInt(58, 82), randomInt(28, 70)));
  }

  return entities;
}

function ensureMiniMapScene(force = false) {
  const nextKey = getMiniMapSceneKey();
  if (!force && state.miniMapSceneKey === nextKey && state.miniMapEntities.length > 0) return;
  state.miniMapSceneKey = nextKey;
  state.miniMapEntities = buildMiniMapEntities();
  state.miniMapReactionPulse = 0;
}

function hospitalSetMode(mode, timer = 0) {
  ensureHospitalMiniState();
  state.miniMapHospital.activeMode = mode;
  state.miniMapHospital.modeTimer = timer;
}

function hospitalReplenishQueue() {
  ensureHospitalMiniState();
  state.miniMapHospital.queueSize = HOSPITAL_QUEUE_TARGET;
}

function hospitalConsumeQueueOnSummon() {
  ensureHospitalMiniState();
  state.miniMapHospital.queueSize = HOSPITAL_QUEUE_TARGET;
}

function hospitalMiniOnSummon() {
  if (!isHospitalMiniMapScenario()) return;
  ensureMiniMapScene();
  ensureHospitalMiniState();
  const mode = state.miniMapHospital.activeMode;
  const active = getHospitalActivePatientEntity();
  if (mode === "dead-inert" || mode === "nurse-carry" || (active && (active.role === "corpse" || active.variant === "dead"))) {
    return;
  }
  hospitalConsumeQueueOnSummon();
  let activePatient = getHospitalActivePatientEntity();
  const escortPatient = getHospitalEscortPatientEntity();
  const escortNurse = getHospitalEscortNurseEntity();
  if (!activePatient && escortPatient) {
    escortPatient.tag = "active-patient";
    escortPatient.variant = "active";
    activePatient = escortPatient;
  }
  if (!activePatient) {
    activePatient = spawnHospitalActivePatient("active");
  }
  if (state.currentPatient && state.currentPatient.triageEscorted && escortNurse) {
    escortNurse.hospitalEscortState = "drop";
    const cityHosp = getCityHospitalState(state.currentCityId);
    if (cityHosp.pendingTriageEscort && cityHosp.pendingTriageEscort.triageSource === state.currentPatient.triageSource) {
      cityHosp.pendingTriageEscort.status = "in-service";
    }
  } else if (escortNurse) {
    state.miniMapEntities = state.miniMapEntities.filter((entity) => entity !== escortNurse);
  }
  hospitalSetMode("approach", 0);
}

function hospitalMiniOnTreatmentAction() {
  if (!isHospitalMiniMapScenario()) return;
  ensureMiniMapScene();
  ensureHospitalMiniState();
  const mode = state.miniMapHospital.activeMode;
  const active = getHospitalActivePatientEntity();
  if (mode === "dead-inert" || mode === "nurse-carry" || (active && (active.role === "corpse" || active.variant === "dead"))) {
    return;
  }
  if (!(state.currentPatient && state.currentPatient.active && active)) return;
  hospitalSetMode("treatment", 0);
}

function hospitalMiniOnRefuse() {
  if (!isHospitalMiniMapScenario()) return;
  ensureMiniMapScene();
  ensureHospitalMiniState();
  const mode = state.miniMapHospital.activeMode;
  const active = getHospitalActivePatientEntity();
  if (mode === "dead-inert" || mode === "nurse-carry" || (active && (active.role === "corpse" || active.variant === "dead"))) {
    return;
  }
  if (!getHospitalActivePatientEntity()) {
    spawnHospitalActivePatient("active");
  }
  hospitalSetMode("refused-exit", 0);
}

function hospitalMiniOnConclude(result) {
  if (!isHospitalMiniMapScenario()) return;
  ensureMiniMapScene();
  const patient = getHospitalActivePatientEntity() || spawnHospitalActivePatient("active");
  if (!patient) return;
  if (result === "death") {
    patient.role = "corpse";
    patient.tag = "corpse-transit";
    patient.variant = "dead";
    patient.vx = 0;
    patient.vy = 0;
    // Corpo morto sai imediatamente da lógica de fila e permanece na área de atendimento.
    patient.x = HOSPITAL_MINI_ZONES.treatmentB.x;
    patient.y = HOSPITAL_MINI_ZONES.treatmentB.y;
    hospitalSetMode("dead-inert", 0.9);
    hospitalReplenishQueue();
    return;
  }
  if (result === "cured") {
    patient.variant = "cured";
    hospitalSetMode("cured-exit", 0);
    hospitalReplenishQueue();
    return;
  }
  if (result === "released" || result === "abandon") {
    patient.variant = "active";
    hospitalSetMode("released-exit", 0);
    hospitalReplenishQueue();
    return;
  }
}

function hospitalMoveTo(entity, tx, ty, speed = 18, deltaSeconds = 0.25) {
  if (!entity) return;
  const dx = tx - entity.x;
  const dy = ty - entity.y;
  const dist = Math.hypot(dx, dy);
  if (dist <= 0.15) {
    entity.x = tx;
    entity.y = ty;
    entity.vx = 0;
    entity.vy = 0;
    return;
  }
  const step = Math.min(dist, speed * deltaSeconds);
  entity.x += (dx / dist) * step;
  entity.y += (dy / dist) * step;
}

function stepHospitalMiniMap(deltaSeconds = 0.25) {
  ensureHospitalMiniState();
  syncHospitalAmbulatoryEntities();
  const currentQueueActors = state.miniMapEntities
    .filter((entity) => entity.tag && entity.tag.startsWith("queue-"))
    .sort((a, b) => a.y - b.y);
  if (currentQueueActors.length > HOSPITAL_QUEUE_TARGET) {
    const removeIds = new Set(currentQueueActors.slice(HOSPITAL_QUEUE_TARGET).map((entity) => entity.id));
    state.miniMapEntities = state.miniMapEntities.filter((entity) => !removeIds.has(entity.id));
  } else if (currentQueueActors.length < HOSPITAL_QUEUE_TARGET) {
    for (let i = currentQueueActors.length; i < HOSPITAL_QUEUE_TARGET; i += 1) {
      const y = HOSPITAL_MINI_ZONES.queueStart.y + i * HOSPITAL_MINI_ZONES.queueStepY;
      state.miniMapEntities.push(createMiniMapEntity("patient", HOSPITAL_MINI_ZONES.queueStart.x, y, {
        tag: `queue-${i + 1}`,
        variant: "queued",
        scripted: true,
        vx: 0,
        vy: 0
      }));
    }
  }
  const doctor = getHospitalDoctorEntity();
  const nurse = getHospitalNurseEntity();
  const escortNurse = getHospitalEscortNurseEntity();
  const patient = getHospitalActivePatientEntity();
  const corpseTransit = getHospitalCorpseTransitEntity();
  const mode = state.miniMapHospital.activeMode;
  state.miniMapHospital.modeTimer = Math.max(0, state.miniMapHospital.modeTimer - deltaSeconds);

  const careTransit = state.miniMapEntities.filter((entity) => String(entity.tag || "").startsWith("amb-care-transit-"));
  careTransit.forEach((entity) => {
    const slotData = getAmbulatoryPatientSlot(state.currentCityId, entity.ambId);
    if (!slotData || !slotData.patient.enhancedCare) {
      state.miniMapEntities = state.miniMapEntities.filter((item) => item.id !== entity.id);
      return;
    }
    const targetX = slotData.slot.x + 3.2;
    const targetY = slotData.slot.y - 0.8;
    hospitalMoveTo(entity, targetX, targetY, 16, deltaSeconds);
    if (Math.hypot(entity.x - targetX, entity.y - targetY) < 0.9) {
      state.miniMapEntities = state.miniMapEntities.filter((item) => item.id !== entity.id);
      const fixedTag = `amb-care-${entity.ambId}`;
      const exists = state.miniMapEntities.some((item) => item.tag === fixedTag);
      if (!exists) {
        state.miniMapEntities.push(createMiniMapEntity("generic", targetX, targetY, {
          tag: fixedTag,
          variant: "care",
          scripted: true,
          vx: 0,
          vy: 0
        }));
      }
    }
  });

  // Ajusta fila visual
  const escortQueuePatient = getHospitalEscortPatientEntity();
  const escortQueueOffset = escortQueuePatient ? 1 : 0;
  const queueActors = state.miniMapEntities
    .filter((entity) => entity.tag && entity.tag.startsWith("queue-"))
    .sort((a, b) => a.y - b.y);
  queueActors.forEach((entity, idx) => {
    entity.tag = `queue-${idx + 1}`;
    entity.variant = "queued";
    entity.scripted = true;
    entity.vx = 0;
    entity.vy = 0;
    entity.x = HOSPITAL_MINI_ZONES.queueStart.x;
    entity.y = HOSPITAL_MINI_ZONES.queueStart.y + (idx + escortQueueOffset) * HOSPITAL_MINI_ZONES.queueStepY;
  });
  if (escortQueuePatient) {
    escortQueuePatient.x = HOSPITAL_MINI_ZONES.escortQueuePatient.x;
    escortQueuePatient.y = HOSPITAL_MINI_ZONES.escortQueuePatient.y;
  }
  if (escortNurse && (escortNurse.hospitalEscortState === "queue" || !escortNurse.hospitalEscortState)) {
    escortNurse.x = HOSPITAL_MINI_ZONES.escortQueueNurse.x;
    escortNurse.y = HOSPITAL_MINI_ZONES.escortQueueNurse.y;
  }

  if (mode && String(mode).startsWith("cart-cleanup")) {
    let cart = state.miniMapEntities.find((entity) => String(entity.tag || "") === "corpse-cart");
    if (!cart) {
      cart = createMiniMapEntity("generic", 103, HOSPITAL_MINI_ZONES.discard.y, {
        tag: "corpse-cart",
        variant: "cart",
        scripted: true,
        vx: 0,
        vy: 0
      });
      state.miniMapEntities.push(cart);
    }
    const corpseMarkers = state.miniMapEntities.filter((entity) => {
      const tag = String(entity.tag || "");
      return tag.startsWith("corpse-") && tag !== "corpse-cart";
    });
    if (mode === "cart-cleanup-enter") {
      hospitalMoveTo(cart, HOSPITAL_MINI_ZONES.discard.x, HOSPITAL_MINI_ZONES.discard.y, 20, deltaSeconds);
      if (Math.hypot(cart.x - HOSPITAL_MINI_ZONES.discard.x, cart.y - HOSPITAL_MINI_ZONES.discard.y) < 1.1) {
        hospitalSetMode("cart-cleanup-load", 0.65);
      }
    } else if (mode === "cart-cleanup-load") {
      corpseMarkers.forEach((corpse, idx) => {
        corpse.x = cart.x - 1.5 - (idx % 3) * 1.4;
        corpse.y = cart.y - (Math.floor(idx / 3) * 1.2);
      });
      if (state.miniMapHospital.modeTimer <= 0) {
        hospitalSetMode("cart-cleanup-exit", 0);
      }
    } else if (mode === "cart-cleanup-exit") {
      corpseMarkers.forEach((corpse, idx) => {
        corpse.x = cart.x - 1.5 - (idx % 3) * 1.4;
        corpse.y = cart.y - (Math.floor(idx / 3) * 1.2);
      });
      hospitalMoveTo(cart, -6, HOSPITAL_MINI_ZONES.discard.y, 22, deltaSeconds);
      if (cart.x <= 3) {
        clearHospitalCorpsesForCity(state.currentCityId);
        state.miniMapEntities = state.miniMapEntities.filter((entity) => String(entity.tag || "") !== "corpse-cart");
        state.miniMapHospital.cartCleanupActive = false;
        hospitalSetMode("none", 0);
      }
    }
    return;
  }

  if (!patient && !corpseTransit) {
    hospitalMoveTo(doctor, HOSPITAL_MINI_ZONES.doctorRoom.x, HOSPITAL_MINI_ZONES.doctorRoom.y, 14, deltaSeconds);
    hospitalMoveTo(nurse, HOSPITAL_MINI_ZONES.nurseIdle.x, HOSPITAL_MINI_ZONES.nurseIdle.y, 12, deltaSeconds);
    if (escortNurse && escortNurse.hospitalEscortState && escortNurse.hospitalEscortState !== "queue") {
      hospitalMoveTo(escortNurse, HOSPITAL_MINI_ZONES.escortExit.x, HOSPITAL_MINI_ZONES.escortExit.y, 16, deltaSeconds);
      if (escortNurse.x >= 100) {
        state.miniMapEntities = state.miniMapEntities.filter((entity) => entity !== escortNurse);
        clearPendingTriageEscort(state.currentCityId);
      }
    }
    if (mode === "doctor-return") {
      const doctorBack = Math.hypot(doctor.x - HOSPITAL_MINI_ZONES.doctorRoom.x, doctor.y - HOSPITAL_MINI_ZONES.doctorRoom.y) < 0.9;
      if (doctorBack || state.miniMapHospital.modeTimer <= 0) {
        hospitalSetMode("none", 0);
      }
    } else if (mode !== "none") {
      hospitalSetMode("none", 0);
    }
    return;
  }

  if (mode === "approach" || mode === "waiting") {
    patient.variant = patient.variant || "active";
    hospitalMoveTo(doctor, HOSPITAL_MINI_ZONES.doctorRoom.x, HOSPITAL_MINI_ZONES.doctorRoom.y, 14, deltaSeconds);
    hospitalMoveTo(patient, HOSPITAL_MINI_ZONES.doctorMeet.x, HOSPITAL_MINI_ZONES.doctorMeet.y, 15, deltaSeconds);
    hospitalMoveTo(nurse, HOSPITAL_MINI_ZONES.nurseIdle.x, HOSPITAL_MINI_ZONES.nurseIdle.y, 12, deltaSeconds);
    const nearDoctor = Math.hypot(patient.x - HOSPITAL_MINI_ZONES.doctorMeet.x, patient.y - HOSPITAL_MINI_ZONES.doctorMeet.y) < 0.8;
    if (escortNurse) {
      if (escortNurse.hospitalEscortState === "drop") {
        hospitalMoveTo(escortNurse, HOSPITAL_MINI_ZONES.escortDrop.x, HOSPITAL_MINI_ZONES.escortDrop.y, 14, deltaSeconds);
        const nearDrop = Math.hypot(escortNurse.x - HOSPITAL_MINI_ZONES.escortDrop.x, escortNurse.y - HOSPITAL_MINI_ZONES.escortDrop.y) < 1.1;
        if (nearDoctor || nearDrop) escortNurse.hospitalEscortState = "return";
      } else {
        hospitalMoveTo(escortNurse, HOSPITAL_MINI_ZONES.escortExit.x, HOSPITAL_MINI_ZONES.escortExit.y, 16, deltaSeconds);
        if (escortNurse.x >= 100) {
          state.miniMapEntities = state.miniMapEntities.filter((entity) => entity !== escortNurse);
          clearPendingTriageEscort(state.currentCityId);
        }
      }
    }
    if (nearDoctor) hospitalSetMode("waiting", 0);
    return;
  }

  if (mode === "treatment") {
    patient.variant = patient.variant || "active";
    hospitalMoveTo(doctor, HOSPITAL_MINI_ZONES.treatmentA.x, HOSPITAL_MINI_ZONES.treatmentA.y, 18, deltaSeconds);
    hospitalMoveTo(patient, HOSPITAL_MINI_ZONES.treatmentB.x, HOSPITAL_MINI_ZONES.treatmentB.y, 17, deltaSeconds);
    hospitalMoveTo(nurse, HOSPITAL_MINI_ZONES.nurseIdle.x, HOSPITAL_MINI_ZONES.nurseIdle.y, 12, deltaSeconds);
    if (escortNurse) {
      hospitalMoveTo(escortNurse, HOSPITAL_MINI_ZONES.escortExit.x, HOSPITAL_MINI_ZONES.escortExit.y, 16, deltaSeconds);
      if (escortNurse.x >= 100) {
        state.miniMapEntities = state.miniMapEntities.filter((entity) => entity !== escortNurse);
        clearPendingTriageEscort(state.currentCityId);
      }
    }
    return;
  }

  if (mode === "refused-exit" || mode === "released-exit" || mode === "cured-exit") {
    if (mode === "cured-exit") patient.variant = "cured";
    hospitalMoveTo(doctor, HOSPITAL_MINI_ZONES.doctorRoom.x, HOSPITAL_MINI_ZONES.doctorRoom.y, 15, deltaSeconds);
    hospitalMoveTo(nurse, HOSPITAL_MINI_ZONES.nurseIdle.x, HOSPITAL_MINI_ZONES.nurseIdle.y, 12, deltaSeconds);
    if (escortNurse) {
      if (escortNurse.hospitalEscortState === "drop") {
        escortNurse.hospitalEscortState = "return";
      }
      hospitalMoveTo(escortNurse, HOSPITAL_MINI_ZONES.escortExit.x, HOSPITAL_MINI_ZONES.escortExit.y, 16, deltaSeconds);
      if (escortNurse.x >= 100) {
        state.miniMapEntities = state.miniMapEntities.filter((entity) => entity !== escortNurse);
        clearPendingTriageEscort(state.currentCityId);
      }
    }
    hospitalMoveTo(patient, HOSPITAL_MINI_ZONES.exit.x, HOSPITAL_MINI_ZONES.exit.y, 21, deltaSeconds);
    if (patient.x >= 95) {
      removeHospitalActivePatientEntity();
      hospitalSetMode("none", 0);
    }
    return;
  }

  if (mode === "dead-inert") {
    const corpse = corpseTransit || patient;
    if (!corpse) {
      hospitalSetMode("none", 0);
      return;
    }
    corpse.role = "corpse";
    corpse.variant = "dead";
    corpse.tag = "corpse-transit";
    hospitalMoveTo(doctor, HOSPITAL_MINI_ZONES.doctorRoom.x, HOSPITAL_MINI_ZONES.doctorRoom.y, 16, deltaSeconds);
    hospitalMoveTo(corpse, HOSPITAL_MINI_ZONES.treatmentB.x, HOSPITAL_MINI_ZONES.treatmentB.y, 16, deltaSeconds);
    // Enfermeira deve ir até o corpo inerte.
    hospitalMoveTo(nurse, corpse.x, corpse.y, 18, deltaSeconds);
    if (state.miniMapHospital.modeTimer <= 0 && Math.hypot(nurse.x - corpse.x, nurse.y - corpse.y) < 1.4) {
      hospitalSetMode("nurse-carry", 0);
    }
    return;
  }

  if (mode === "nurse-carry") {
    const corpse = corpseTransit || patient;
    if (!corpse) {
      hospitalSetMode("none", 0);
      return;
    }
    corpse.role = "corpse";
    corpse.variant = "dead";
    corpse.tag = "corpse-transit";
    hospitalMoveTo(doctor, HOSPITAL_MINI_ZONES.doctorRoom.x, HOSPITAL_MINI_ZONES.doctorRoom.y, 13, deltaSeconds);
    hospitalMoveTo(nurse, HOSPITAL_MINI_ZONES.discard.x, HOSPITAL_MINI_ZONES.discard.y, 18, deltaSeconds);
    corpse.x = nurse.x - 1.8;
    corpse.y = nurse.y;
    if (Math.hypot(nurse.x - HOSPITAL_MINI_ZONES.discard.x, nurse.y - HOSPITAL_MINI_ZONES.discard.y) < 1.1) {
      state.miniMapEntities = state.miniMapEntities.filter((entity) => entity.tag !== "corpse-transit");
      addHospitalCorpseMarker();
      hospitalSetMode("none", 0);
    }
    return;
  }
}

function syncHospitalMiniMapWithState() {
  if (!isHospitalMiniMapScenario()) return;
  ensureHospitalMiniState();
  const active = getHospitalActivePatientEntity();
  const corpseTransit = getHospitalCorpseTransitEntity();
  const hasClinical = !!(state.currentPatient && state.currentPatient.active);
  if (hasClinical && !active && !corpseTransit) {
    spawnHospitalActivePatient("active");
    if (state.miniMapHospital.activeMode === "none") hospitalSetMode("approach", 0);
  }
}

function getChurchDoctorEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "doctor") || null;
}

function getChurchPriestEntity() {
  return state.miniMapEntities.find((entity) => entity.tag === "priest") || null;
}

function getChurchCrowdEntities() {
  return state.miniMapEntities.filter((entity) => entity.tag && (String(entity.tag).startsWith("faithful-") || String(entity.tag).startsWith("church-seeker-")));
}

function churchMiniOnConfession() {
  if (!isChurchMiniMapScenario()) return;
  ensureMiniMapScene();
  ensureChurchMiniState();
  state.miniMapChurch.mode = "confession";
  state.miniMapChurch.modeTimer = 3.4;
}

function churchMiniOnGatherAroundDoctor() {
  if (!isChurchMiniMapScenario()) return;
  ensureMiniMapScene();
  ensureChurchMiniState();
  state.miniMapChurch.mode = "crowd";
  state.miniMapChurch.modeTimer = 0;
  state.miniMapChurch.lastGatherAt = Date.now() / 1000;
  state.miniMapChurch.pendingArrivals = clamp(state.miniMapChurch.pendingArrivals + randomInt(2, 4), 0, 20);
}

function stepChurchMiniMap(deltaSeconds = 0.25) {
  ensureChurchMiniState();
  const doctor = getChurchDoctorEntity();
  const priest = getChurchPriestEntity();
  const crowd = getChurchCrowdEntities();
  if (!doctor || !priest) return;

  const nowSeconds = Date.now() / 1000;
  const crowdActive = (nowSeconds - state.miniMapChurch.lastGatherAt) <= 8;
  state.miniMapChurch.modeTimer = Math.max(0, state.miniMapChurch.modeTimer - deltaSeconds);
  const mode = state.miniMapChurch.mode;
  const priestAtAltar = mode !== "confession";

  if (mode === "confession") {
    hospitalMoveTo(doctor, CHURCH_MINI_ZONES.confessionario.x - 3, CHURCH_MINI_ZONES.confessionario.y + 4, 13, deltaSeconds);
    hospitalMoveTo(priest, CHURCH_MINI_ZONES.confessionario.x + 2, CHURCH_MINI_ZONES.confessionario.y + 2, 13, deltaSeconds);
    if (state.miniMapChurch.modeTimer <= 0) {
      state.miniMapChurch.mode = "altar";
      state.miniMapChurch.modeTimer = 0;
    }
  } else {
    hospitalMoveTo(doctor, CHURCH_MINI_ZONES.doctorBase.x, CHURCH_MINI_ZONES.doctorBase.y, 12, deltaSeconds);
    hospitalMoveTo(priest, CHURCH_MINI_ZONES.altar.x, CHURCH_MINI_ZONES.altar.y, 12, deltaSeconds);
  }

  if (crowdActive || mode === "crowd") {
    if (crowdActive) state.miniMapChurch.mode = "crowd";
    crowd.forEach((entity, idx) => {
      const ring = idx < 9 ? 1 : 2;
      const angle = (idx / Math.max(1, crowd.length)) * Math.PI * 2;
      const radiusX = ring === 1 ? 7 : 11;
      const radiusY = ring === 1 ? 5 : 8;
      const tx = doctor.x + Math.cos(angle) * radiusX;
      const ty = doctor.y + Math.sin(angle) * radiusY;
      entity.churchState = "around-doctor";
      hospitalMoveTo(entity, tx, ty, 16, deltaSeconds);
    });
    const faithfulCount = state.miniMapEntities.filter((entity) => String(entity.tag || "").startsWith("faithful-")).length;
    if (state.miniMapChurch.pendingArrivals > 0 && faithfulCount < 18 && Math.random() < 0.34) {
      const slotIndex = faithfulCount % CHURCH_MINI_ZONES.benchSlots.length;
      const arriving = createChurchFaithful(slotIndex, true);
      arriving.churchState = "around-doctor";
      arriving.prayerTimer = randomInt(60, 130) / 10;
      state.miniMapEntities.push(arriving);
      state.miniMapChurch.pendingArrivals = Math.max(0, state.miniMapChurch.pendingArrivals - 1);
    }
    if (!crowdActive && state.miniMapChurch.modeTimer <= 0) {
      state.miniMapChurch.mode = "altar";
      state.miniMapChurch.modeTimer = 0;
    }
    return;
  }

  const faithfulEntities = crowd.filter((entity) => String(entity.tag).startsWith("faithful-"));
  faithfulEntities.forEach((entity) => {
    const slot = CHURCH_MINI_ZONES.benchSlots[entity.benchIndex % CHURCH_MINI_ZONES.benchSlots.length];
    const churchState = entity.churchState || "praying";
    if (churchState === "around-doctor") {
      entity.churchState = "returning";
      entity.prayerTimer = randomInt(50, 120) / 10;
    }
    if (churchState === "returning") {
      hospitalMoveTo(entity, slot.x, slot.y, 13, deltaSeconds);
      if (Math.hypot(entity.x - slot.x, entity.y - slot.y) < 0.8) {
        entity.churchState = "praying";
      }
      return;
    }
    if (churchState === "arriving") {
      hospitalMoveTo(entity, slot.x, slot.y, 14, deltaSeconds);
      if (Math.hypot(entity.x - slot.x, entity.y - slot.y) < 0.8) {
        entity.churchState = "praying";
        entity.prayerTimer = randomInt(55, 130) / 10;
      }
      return;
    }
    if (churchState === "leaving") {
      hospitalMoveTo(entity, CHURCH_MINI_ZONES.exit.x, CHURCH_MINI_ZONES.exit.y, 15, deltaSeconds);
      if (entity.x >= 95) {
        state.miniMapEntities = state.miniMapEntities.filter((item) => item.id !== entity.id);
        if (priestAtAltar) state.miniMapChurch.pendingArrivals += 1;
      }
      return;
    }
    entity.prayerTimer = Math.max(0, (entity.prayerTimer || 1.6) - deltaSeconds);
    hospitalMoveTo(entity, slot.x, slot.y, 10, deltaSeconds);
    if (entity.prayerTimer <= 0) {
      entity.churchState = "leaving";
    }
  });

  const seekerEntities = crowd.filter((entity) => String(entity.tag).startsWith("church-seeker-"));
  seekerEntities.forEach((entity) => {
    const slot = CHURCH_MINI_ZONES.benchSlots[entity.benchIndex % CHURCH_MINI_ZONES.benchSlots.length];
    if (entity.churchState === "arriving") {
      hospitalMoveTo(entity, slot.x, slot.y, 13, deltaSeconds);
      if (Math.hypot(entity.x - slot.x, entity.y - slot.y) < 0.9) {
        entity.churchState = "praying";
        entity.prayerTimer = randomInt(32, 78) / 10;
      }
      return;
    }
    if (entity.churchState === "around-doctor") {
      entity.churchState = "returning";
      entity.prayerTimer = randomInt(40, 90) / 10;
    }
    if (entity.churchState === "returning") {
      hospitalMoveTo(entity, slot.x, slot.y, 12, deltaSeconds);
      if (Math.hypot(entity.x - slot.x, entity.y - slot.y) < 0.8) {
        entity.churchState = "praying";
        entity.prayerTimer = randomInt(30, 70) / 10;
      }
      return;
    }
    if (entity.churchState === "leaving") {
      hospitalMoveTo(entity, CHURCH_MINI_ZONES.exit.x, CHURCH_MINI_ZONES.exit.y, 14, deltaSeconds);
      if (entity.x >= 95) {
        state.miniMapEntities = state.miniMapEntities.filter((item) => item.id !== entity.id);
      }
      return;
    }
    entity.prayerTimer = Math.max(0, (entity.prayerTimer || 2.8) - deltaSeconds);
    hospitalMoveTo(entity, slot.x, slot.y, 9, deltaSeconds);
    if (entity.prayerTimer <= 0) {
      entity.churchState = "leaving";
    }
  });

  // Fluxo contínuo: mais pacientes buscam a igreja, permanecem e vão embora.
  if (priestAtAltar) {
    const seekersAlive = state.miniMapEntities.filter((entity) => String(entity.tag || "").startsWith("church-seeker-")).length;
    if (seekersAlive < 7 && Math.random() < 0.14) {
      const seekerId = state.miniMapChurch.nextFaithfulId++;
      const slotIdx = randomInt(0, CHURCH_MINI_ZONES.benchSlots.length - 1);
      state.miniMapEntities.push(createMiniMapEntity("patient", 96, 86, {
        tag: `church-seeker-${seekerId}`,
        variant: "seeker",
        scripted: true,
        benchIndex: slotIdx,
        churchState: "arriving",
        prayerTimer: randomInt(28, 70) / 10,
        vx: 0,
        vy: 0
      }));
    }
  }

  if (priestAtAltar && state.miniMapChurch.pendingArrivals > 0) {
    const faithfulCount = state.miniMapEntities.filter((entity) => String(entity.tag || "").startsWith("faithful-")).length;
    if (faithfulCount < CHURCH_MINI_ZONES.benchSlots.length && Math.random() < 0.22) {
      const occupied = new Set(
        state.miniMapEntities
          .filter((entity) => String(entity.tag || "").startsWith("faithful-"))
          .map((entity) => entity.benchIndex)
      );
      let slotIndex = CHURCH_MINI_ZONES.benchSlots.findIndex((_, idx) => !occupied.has(idx));
      if (slotIndex < 0) slotIndex = faithfulCount % CHURCH_MINI_ZONES.benchSlots.length;
      state.miniMapEntities.push(createChurchFaithful(slotIndex, true));
      state.miniMapChurch.pendingArrivals = Math.max(0, state.miniMapChurch.pendingArrivals - 1);
    }
  }
}

function shopMiniStartDoctorService() {
  if (!isShopMiniMapScenario()) return;
  ensureMiniMapScene();
  ensureShopMiniState();
  state.miniMapShop.mode = "player-approach";
  state.miniMapShop.modeTimer = 0.6;
  const customer = getShopTurnCustomerEntity();
  if (customer) {
    customer.shopState = "queue";
    customer.x = SHOP_MINI_ZONES.shopperQueue.x;
    customer.y = SHOP_MINI_ZONES.shopperQueue.y;
  }
}

function shopMiniCompleteDoctorService() {
  if (!isShopMiniMapScenario()) return;
  ensureMiniMapScene();
  ensureShopMiniState();
  state.miniMapShop.mode = "player-leave";
  state.miniMapShop.modeTimer = randomInt(14, 26) / 10;
}

function stepShopMiniMap(deltaSeconds = 0.25) {
  ensureShopMiniState();
  const doctor = getShopDoctorEntity();
  const merchant = getShopMerchantEntity();
  const customer = getShopTurnCustomerEntity();
  if (!doctor || !merchant || !customer) return;

  const mode = state.miniMapShop.mode;
  state.miniMapShop.modeTimer = Math.max(0, state.miniMapShop.modeTimer - deltaSeconds);

  const generics = state.miniMapEntities.filter((entity) => String(entity.tag || "").startsWith("shop-generic-"));
  generics.forEach((entity) => {
    entity.shopTargetTimer = Math.max(0, (entity.shopTargetTimer || 0) - deltaSeconds);
    if (!Number.isFinite(entity.shopTargetX) || entity.shopTargetTimer <= 0) {
      entity.shopTargetX = randomInt(SHOP_MINI_ZONES.wanderMinX, SHOP_MINI_ZONES.wanderMaxX);
      entity.shopTargetY = randomInt(SHOP_MINI_ZONES.wanderMinY, SHOP_MINI_ZONES.wanderMaxY);
      entity.shopTargetTimer = randomInt(10, 34) / 10;
    }
    hospitalMoveTo(entity, entity.shopTargetX, entity.shopTargetY, 9, deltaSeconds);
  });

  if (mode === "player-approach" || mode === "player-at-counter") {
    hospitalMoveTo(doctor, SHOP_MINI_ZONES.counterFront.x, SHOP_MINI_ZONES.counterFront.y, 14, deltaSeconds);
    hospitalMoveTo(merchant, SHOP_MINI_ZONES.merchantPost.x, SHOP_MINI_ZONES.merchantPost.y, 14, deltaSeconds);
    customer.shopState = "queue";
    hospitalMoveTo(customer, SHOP_MINI_ZONES.shopperQueue.x, SHOP_MINI_ZONES.shopperQueue.y, 12, deltaSeconds);
    if (Math.hypot(doctor.x - SHOP_MINI_ZONES.counterFront.x, doctor.y - SHOP_MINI_ZONES.counterFront.y) < 0.8) {
      state.miniMapShop.mode = "player-at-counter";
    }
    return;
  }

  if (mode === "player-leave") {
    hospitalMoveTo(doctor, SHOP_MINI_ZONES.doctorIdle.x, SHOP_MINI_ZONES.doctorIdle.y, 12, deltaSeconds);
    hospitalMoveTo(merchant, SHOP_MINI_ZONES.merchantPost.x, SHOP_MINI_ZONES.merchantPost.y, 14, deltaSeconds);
    hospitalMoveTo(customer, SHOP_MINI_ZONES.shopperQueue.x, SHOP_MINI_ZONES.shopperQueue.y, 11, deltaSeconds);
    const doctorAway = Math.hypot(doctor.x - SHOP_MINI_ZONES.doctorIdle.x, doctor.y - SHOP_MINI_ZONES.doctorIdle.y) < 1;
    if (doctorAway || state.miniMapShop.modeTimer <= 0) {
      state.miniMapShop.mode = "customer-approach";
      state.miniMapShop.modeTimer = randomInt(12, 26) / 10;
    }
    return;
  }

  if (mode === "customer-approach" || mode === "customer-at-counter") {
    hospitalMoveTo(doctor, SHOP_MINI_ZONES.doctorIdle.x, SHOP_MINI_ZONES.doctorIdle.y, 11, deltaSeconds);
    hospitalMoveTo(merchant, SHOP_MINI_ZONES.merchantPost.x, SHOP_MINI_ZONES.merchantPost.y, 14, deltaSeconds);
    hospitalMoveTo(customer, SHOP_MINI_ZONES.counterFront.x, SHOP_MINI_ZONES.counterFront.y, 12, deltaSeconds);
    if (Math.hypot(customer.x - SHOP_MINI_ZONES.counterFront.x, customer.y - SHOP_MINI_ZONES.counterFront.y) < 0.9) {
      state.miniMapShop.mode = "customer-at-counter";
    }
    if (state.miniMapShop.mode === "customer-at-counter" && state.miniMapShop.modeTimer <= 0) {
      state.miniMapShop.mode = "customer-leave";
      state.miniMapShop.modeTimer = randomInt(12, 26) / 10;
    }
    return;
  }

  if (mode === "customer-leave") {
    hospitalMoveTo(doctor, SHOP_MINI_ZONES.doctorIdle.x, SHOP_MINI_ZONES.doctorIdle.y, 10, deltaSeconds);
    hospitalMoveTo(merchant, SHOP_MINI_ZONES.merchantPost.x, SHOP_MINI_ZONES.merchantPost.y, 12, deltaSeconds);
    hospitalMoveTo(customer, SHOP_MINI_ZONES.shopperExit.x, SHOP_MINI_ZONES.shopperExit.y, 13, deltaSeconds);
    if (customer.x >= 93 || state.miniMapShop.modeTimer <= 0) {
      customer.x = SHOP_MINI_ZONES.shopperQueue.x;
      customer.y = SHOP_MINI_ZONES.shopperQueue.y;
      state.miniMapShop.mode = "idle";
      state.miniMapShop.modeTimer = 0;
    }
    return;
  }

  state.miniMapShop.mode = "idle";
  hospitalMoveTo(doctor, SHOP_MINI_ZONES.doctorIdle.x, SHOP_MINI_ZONES.doctorIdle.y, 10, deltaSeconds);
  hospitalMoveTo(merchant, SHOP_MINI_ZONES.merchantIdle.x, SHOP_MINI_ZONES.merchantIdle.y, 11, deltaSeconds);
  hospitalMoveTo(customer, SHOP_MINI_ZONES.shopperQueue.x, SHOP_MINI_ZONES.shopperQueue.y, 11, deltaSeconds);
}

function tentMiniOnCharacterFocus(characterId) {
  if (!isTentMiniMapScenario()) return;
  ensureMiniMapScene();
  ensureTentMiniState();
  state.miniMapTent.focusCharacterId = characterId || "";
  state.miniMapTent.mode = characterId ? "approach-focus" : "idle";
  state.miniMapTent.modeTimer = characterId ? 1.2 : 0;
}

function tentMiniOnRosterRefresh() {
  if (!isTentMiniMapScenario()) return;
  ensureMiniMapScene();
  ensureTentMiniState();
  state.miniMapTent.mode = "refresh-out";
  state.miniMapTent.modeTimer = 1.1;
  state.miniMapTent.refreshPendingSpawn = true;
  state.miniMapTent.focusCharacterId = "";
  state.miniMapEntities.forEach((entity) => {
    if (!String(entity.tag || "").startsWith("tent-char-")) return;
    entity.tentLeaving = true;
    entity.tentLeaveTargetX = randomInt(3, 97);
    entity.tentLeaveTargetY = randomInt(4, 95);
  });
}

function tentMiniOnReferCharacter(characterId) {
  if (!isTentMiniMapScenario()) return "";
  ensureMiniMapScene();
  ensureTentMiniState();
  const patientEntity = getTentCharacterEntity(characterId);
  if (!patientEntity) return "";
  const nurses = state.miniMapEntities.filter((entity) => {
    if (entity.tentRole !== "enfermeira") return false;
    return getTriageNurseStatus(entity.tentCharacterId) !== "escort";
  });
  const nurse = nurses.length ? nurses[0] : null;
  if (!nurse) return "";
  state.miniMapTent.transferCharacterId = characterId;
  state.miniMapTent.transferNurseId = nurse.tentCharacterId || "";
  state.miniMapTent.transferPhase = "to-patient";
  state.miniMapTent.mode = "transfer";
  state.miniMapTent.modeTimer = 2.2;
  return state.miniMapTent.transferNurseId || "";
}

function stepTentMiniMap(deltaSeconds = 0.25) {
  ensureTentMiniState();
  const doctor = getTentDoctorEntity();
  if (!doctor) return;
  const rosterIds = getTentRosterCharacterIds();
  const rosterSet = new Set(rosterIds);
  const transferNurseId = state.miniMapTent.transferNurseId || "";

  // Reconcilia entidades da tenda com a lista ativa da triagem.
  state.miniMapEntities = state.miniMapEntities.filter((entity) => {
    const tag = String(entity.tag || "");
    if (!tag.startsWith("tent-char-")) return true;
    const charId = entity.tentCharacterId || tag.replace("tent-char-", "");
    if (!rosterSet.has(charId)) return false;
    const charData = getTriageCharacterById(charId);
    if (!charData) return false;
    if (charData.role === "enfermeira") {
      const status = getTriageNurseStatus(charId);
      if (status === "escort" && !(state.miniMapTent.mode === "transfer" && transferNurseId === charId)) {
        return false;
      }
    }
    return true;
  });

  rosterIds.forEach((characterId, idx) => {
    const character = getTriageCharacterById(characterId);
    if (!character) return;
    const isNurse = character.role === "enfermeira";
    const nurseStatus = isNurse ? getTriageNurseStatus(character.id) : "idle";
    if (isNurse && nurseStatus === "escort" && !(state.miniMapTent.mode === "transfer" && transferNurseId === character.id)) {
      return;
    }
    const exists = getTentCharacterEntity(character.id);
    if (exists) return;
    const anchor = getTentAnchorByIndex(idx);
    state.miniMapEntities.push(createMiniMapEntity(isNurse ? "generic" : "patient", anchor.x, anchor.y, {
      tag: `tent-char-${character.id}`,
      variant: isNurse ? "triage-nurse" : "triage-patient",
      scripted: true,
      tentRole: character.role,
      tentCharacterId: character.id,
      tentAnchorX: anchor.x,
      tentAnchorY: anchor.y,
      tentPatrolX: anchor.x,
      tentPatrolY: anchor.y,
      tentPatrolTimer: randomInt(8, 24) / 10,
      tooltip: `${character.name} | ${character.role === "enfermeira" ? (nurseStatus === "escort" ? "Enfermeira (em acompanhamento para o hospital)" : "Enfermeira em serviço") : "Paciente da triagem"}`,
      vx: 0,
      vy: 0
    }));
  });

  const chars = state.miniMapEntities.filter((entity) => String(entity.tag || "").startsWith("tent-char-"));
  const patients = chars.filter((entity) => entity.tentRole !== "enfermeira");
  const nurses = chars.filter((entity) => entity.tentRole === "enfermeira");

  if (state.miniMapTent.mode === "refresh-out") {
    chars.forEach((entity) => {
      if (!entity.tentLeaving) return;
      hospitalMoveTo(entity, entity.tentLeaveTargetX, entity.tentLeaveTargetY, 18, deltaSeconds);
      if (Math.hypot(entity.x - entity.tentLeaveTargetX, entity.y - entity.tentLeaveTargetY) < 1.1) {
        entity.tentGone = true;
      }
    });
    state.miniMapEntities = state.miniMapEntities.filter((entity) => !entity.tentGone);
    const hasCharacters = state.miniMapEntities.some((entity) => String(entity.tag || "").startsWith("tent-char-"));
    if (!hasCharacters && state.miniMapTent.refreshPendingSpawn) {
      const existingDoctor = getTentDoctorEntity();
      const extras = state.miniMapEntities.filter((entity) => entity.tag !== "tent-doctor");
      state.miniMapEntities = existingDoctor ? [existingDoctor] : [];
      const rosterIds = getTentRosterCharacterIds();
      rosterIds.forEach((characterId, idx) => {
        const character = getTriageCharacterById(characterId);
        if (!character) return;
        const anchor = getTentAnchorByIndex(idx);
        const isNurse = character.role === "enfermeira";
        const nurseStatus = isNurse ? getTriageNurseStatus(character.id) : "idle";
        const transferNurseVisible = isNurse
          && state.miniMapTent.mode === "transfer"
          && state.miniMapTent.transferNurseId === character.id;
        if (isNurse && nurseStatus === "escort" && !transferNurseVisible) return;
        state.miniMapEntities.push(createMiniMapEntity(isNurse ? "generic" : "patient", anchor.x, anchor.y, {
          tag: `tent-char-${character.id}`,
          variant: isNurse ? "triage-nurse" : "triage-patient",
          scripted: true,
          tentRole: character.role,
          tentCharacterId: character.id,
          tentAnchorX: anchor.x,
          tentAnchorY: anchor.y,
          tentPatrolX: anchor.x,
          tentPatrolY: anchor.y,
          tentPatrolTimer: randomInt(8, 24) / 10,
          tooltip: `${character.name} | ${character.role === "enfermeira" ? (nurseStatus === "escort" ? "Enfermeira (em acompanhamento para o hospital)" : "Enfermeira em serviço") : "Paciente da triagem"}`,
          vx: 0,
          vy: 0
        }));
      });
      extras.forEach((entity) => state.miniMapEntities.push(entity));
      state.miniMapTent.refreshPendingSpawn = false;
      state.miniMapTent.mode = "idle";
      state.miniMapTent.modeTimer = 0;
    }
    return;
  }

  if (state.miniMapTent.mode === "transfer" && state.miniMapTent.transferCharacterId) {
    const patient = getTentCharacterEntity(state.miniMapTent.transferCharacterId);
    const nurse = getTentCharacterEntity(state.miniMapTent.transferNurseId);
    if (!patient || !nurse) {
      state.miniMapTent.mode = "idle";
      state.miniMapTent.transferCharacterId = "";
      state.miniMapTent.transferNurseId = "";
      state.miniMapTent.transferPhase = "";
    } else if (state.miniMapTent.transferPhase === "to-patient") {
      hospitalMoveTo(nurse, patient.x, patient.y, 16, deltaSeconds);
      hospitalMoveTo(patient, patient.tentAnchorX, patient.tentAnchorY, 7, deltaSeconds);
      if (Math.hypot(nurse.x - patient.x, nurse.y - patient.y) < 1.1) {
        state.miniMapTent.transferPhase = "to-exit";
      }
    } else if (state.miniMapTent.transferPhase === "to-exit") {
      hospitalMoveTo(nurse, TENT_MINI_ZONES.exit.x, TENT_MINI_ZONES.exit.y, 18, deltaSeconds);
      patient.x = nurse.x - 1.8;
      patient.y = nurse.y + 0.2;
      if (Math.hypot(nurse.x - TENT_MINI_ZONES.exit.x, nurse.y - TENT_MINI_ZONES.exit.y) < 1.1) {
        const cityHosp = getCityHospitalState(state.currentCityId);
        if (!cityHosp.pendingTriageEscort || cityHosp.pendingTriageEscort.triageSource !== state.miniMapTent.transferCharacterId) {
          cityHosp.pendingTriageEscort = {
            triageSource: state.miniMapTent.transferCharacterId,
            nurseId: state.miniMapTent.transferNurseId || "",
            patientName: patient.tooltip ? String(patient.tooltip).split("|")[0].trim() : "",
            status: "waiting"
          };
        } else {
          cityHosp.pendingTriageEscort.nurseId = state.miniMapTent.transferNurseId || cityHosp.pendingTriageEscort.nurseId || "";
          cityHosp.pendingTriageEscort.status = "waiting";
        }
        if (state.miniMapTent.transferNurseId) setTriageNurseStatus(state.miniMapTent.transferNurseId, "escort");
        const removedIdx = state.triageRosterIds.indexOf(state.miniMapTent.transferCharacterId);
        if (removedIdx >= 0) state.triageRosterIds.splice(removedIdx, 1);
        state.miniMapEntities = state.miniMapEntities.filter((entity) => entity !== patient && entity !== nurse);
        state.miniMapTent.mode = "idle";
        state.miniMapTent.transferCharacterId = "";
        state.miniMapTent.transferNurseId = "";
        state.miniMapTent.transferPhase = "";
      }
    }
  }

  const focusId = state.miniMapTent.focusCharacterId;
  const focusEntity = focusId ? getTentCharacterEntity(focusId) : null;
  if (focusEntity) {
    hospitalMoveTo(doctor, focusEntity.x - 4, focusEntity.y + 1, 14, deltaSeconds);
  } else {
    hospitalMoveTo(doctor, TENT_MINI_ZONES.doctorBase.x, TENT_MINI_ZONES.doctorBase.y, 11, deltaSeconds);
  }

  patients.forEach((entity) => {
    hospitalMoveTo(entity, entity.tentAnchorX, entity.tentAnchorY, 7, deltaSeconds);
  });

  nurses.forEach((entity) => {
    if (entity.tentCharacterId === state.miniMapTent.transferNurseId && state.miniMapTent.mode === "transfer") return;
    const nurseStatus = getTriageNurseStatus(entity.tentCharacterId);
    entity.tooltip = `${(getTriageCharacterById(entity.tentCharacterId)?.name || "Enfermeira")} | ${nurseStatus === "escort" ? "Enfermeira (em acompanhamento para o hospital)" : "Enfermeira em serviço"}`;
    if (focusEntity && focusEntity.id === entity.id) {
      hospitalMoveTo(entity, entity.tentAnchorX, entity.tentAnchorY, 10, deltaSeconds);
      return;
    }
    entity.tentPatrolTimer = Math.max(0, (entity.tentPatrolTimer || 0) - deltaSeconds);
    if (entity.tentPatrolTimer <= 0) {
      const target = patients.length ? patients[randomInt(0, patients.length - 1)] : null;
      if (target) {
        entity.tentPatrolX = target.tentAnchorX + randomInt(-3, 3);
        entity.tentPatrolY = target.tentAnchorY + randomInt(-2, 2);
      } else {
        entity.tentPatrolX = entity.tentAnchorX;
        entity.tentPatrolY = entity.tentAnchorY;
      }
      entity.tentPatrolTimer = randomInt(8, 22) / 10;
    }
    hospitalMoveTo(entity, entity.tentPatrolX || entity.tentAnchorX, entity.tentPatrolY || entity.tentAnchorY, 12, deltaSeconds);
  });
}

function stableMiniOnTalkHandler() {
  if (!isStableMiniMapScenario()) return;
  ensureMiniMapScene();
  ensureStableMiniState();
  state.miniMapStable.mode = "talk-handler";
  state.miniMapStable.modeTimer = 2.4;
}

function stableMiniOnTalkDriver() {
  if (!isStableMiniMapScenario()) return;
  ensureMiniMapScene();
  ensureStableMiniState();
  state.miniMapStable.mode = "talk-driver";
  state.miniMapStable.modeTimer = 2.4;
}

function stepStableMiniMap(deltaSeconds = 0.25) {
  ensureStableMiniState();
  const stable = getCityStableState(state.currentCityId);
  const handlerInfo = stable.handler;
  const doctor = getStableDoctorEntity();
  const handler = getStableHandlerEntity();
  const driver = getStableDriverEntity();
  const horses = getStableHorseEntities();
  if (!doctor || !driver) return;

  const mode = state.miniMapStable.mode || "idle";
  state.miniMapStable.modeTimer = Math.max(0, (state.miniMapStable.modeTimer || 0) - deltaSeconds);
  if ((mode === "talk-handler" || mode === "talk-driver") && state.miniMapStable.modeTimer <= 0) {
    state.miniMapStable.mode = "idle";
  }
  const effectiveMode = state.miniMapStable.mode || "idle";
  const holdDriverTalk = activeTradeDeal && activeTradeDeal.stage === "stable-travel";
  const holdHandlerTalk = activeTradeDeal && activeTradeDeal.stage === "stable-handler-dialog";
  if (holdHandlerTalk) {
    state.miniMapStable.mode = "talk-handler";
  }
  if (holdDriverTalk) {
    state.miniMapStable.mode = "talk-driver";
  }

  if (effectiveMode === "talk-handler" && handler) {
    hospitalMoveTo(doctor, handler.x - 3.2, handler.y + 1.6, 13, deltaSeconds);
  } else if (effectiveMode === "talk-driver") {
    hospitalMoveTo(doctor, driver.x - 4.2, driver.y + 2, 13, deltaSeconds);
  } else {
    hospitalMoveTo(doctor, STABLE_MINI_ZONES.doctorBase.x, STABLE_MINI_ZONES.doctorBase.y, 10, deltaSeconds);
  }

  if (handler && handlerInfo && handlerInfo.alive) {
    handler.variant = handlerInfo.infected ? "handler-sick" : "handler";
    handler.tooltip = `${handlerInfo.name} | ${handlerInfo.infected ? "Com sinais de peste" : "Saudável"}`;
    handler.stableTimer = Math.max(0, (handler.stableTimer || 0) - deltaSeconds);
    if (handler.stableTimer <= 0) {
      const goStock = Math.random() < 0.4;
      if (goStock) {
        handler.stableTargetX = STABLE_MINI_ZONES.hayStock.x + randomInt(-2, 2);
        handler.stableTargetY = STABLE_MINI_ZONES.hayStock.y + randomInt(-2, 2);
      } else {
        const horse = horses.length ? horses[randomInt(0, horses.length - 1)] : null;
        handler.stableTargetX = horse ? horse.x + randomInt(-2, 2) : STABLE_MINI_ZONES.handlerBase.x;
        handler.stableTargetY = horse ? horse.y + randomInt(-2, 2) : STABLE_MINI_ZONES.handlerBase.y;
      }
      handler.stableTimer = randomInt(10, 24) / 10;
    }
    hospitalMoveTo(handler, handler.stableTargetX || STABLE_MINI_ZONES.handlerBase.x, handler.stableTargetY || STABLE_MINI_ZONES.handlerBase.y, 8.8, deltaSeconds);
  }

  horses.forEach((horse) => {
    horse.stableTimer = Math.max(0, (horse.stableTimer || 0) - deltaSeconds);
    if (horse.stableTimer <= 0) {
      horse.stableTargetX = randomInt(STABLE_MINI_ZONES.horseArea.x1 + 3, STABLE_MINI_ZONES.horseArea.x2 - 3);
      horse.stableTargetY = randomInt(STABLE_MINI_ZONES.horseArea.y1 + 3, STABLE_MINI_ZONES.horseArea.y2 - 3);
      horse.stableTimer = randomInt(10, 28) / 10;
    }
    hospitalMoveTo(horse, horse.stableTargetX || horse.x, horse.stableTargetY || horse.y, 6.4, deltaSeconds);
    horse.x = clamp(horse.x, STABLE_MINI_ZONES.horseArea.x1, STABLE_MINI_ZONES.horseArea.x2);
    horse.y = clamp(horse.y, STABLE_MINI_ZONES.horseArea.y1, STABLE_MINI_ZONES.horseArea.y2);
  });
}

function nudgeMiniMapEntityToward(entity, tx, ty, strength = 8) {
  const dx = tx - entity.x;
  const dy = ty - entity.y;
  const len = Math.hypot(dx, dy) || 1;
  entity.vx += (dx / len) * strength;
  entity.vy += (dy / len) * strength;
}

function getMiniEntityRadius(entity) {
  if (!entity) return 2;
  if (entity.role === "player") return 2.5;
  if (entity.role === "main") return 2.25;
  if (entity.role === "patient") return 2.15;
  if (entity.role === "corpse") return 1.9;
  return 1.95;
}

function canParticipateInSeparation(entity) {
  if (!entity) return false;
  const tag = String(entity.tag || "");
  if (tag === "corpse-transit") return false;
  if (tag.startsWith("corpse-")) return false;
  if (tag.startsWith("amb-slot-")) return false;
  return true;
}

function resolveMiniMapOverlaps(entities) {
  if (!Array.isArray(entities) || entities.length < 2) return;
  for (let pass = 0; pass < 2; pass += 1) {
    for (let i = 0; i < entities.length; i += 1) {
      const a = entities[i];
      if (!canParticipateInSeparation(a)) continue;
      for (let j = i + 1; j < entities.length; j += 1) {
        const b = entities[j];
        if (!canParticipateInSeparation(b)) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.0001;
        const minDist = getMiniEntityRadius(a) + getMiniEntityRadius(b);
        if (dist >= minDist) continue;
        const push = (minDist - dist) * 0.52;
        const nx = dx / dist;
        const ny = dy / dist;
        a.x = clamp(a.x - nx * push, 4, 96);
        a.y = clamp(a.y - ny * push, 6, 94);
        b.x = clamp(b.x + nx * push, 4, 96);
        b.y = clamp(b.y + ny * push, 6, 94);
      }
    }
  }
}

function triggerMiniMapReaction(actionId = "") {
  ensureMiniMapScene();
  if (!state.miniMapEntities.length) return;
  const normalized = (actionId || "").toLowerCase();
  state.miniMapReactionPulse = clamp(state.miniMapReactionPulse + 0.45, 0, 1.3);
  if (isHospitalMiniMapScenario()) {
    ensureHospitalMiniState();
    const mode = state.miniMapHospital.activeMode;
    const active = getHospitalActivePatientEntity();
    const corpseTransit = getHospitalCorpseTransitEntity();
    const corpseFlowActive = mode === "dead-inert"
      || mode === "nurse-carry"
      || !!corpseTransit
      || (active && (active.role === "corpse" || active.variant === "dead"));
    if (corpseFlowActive) return;
    if (normalized === "summon-patient") hospitalMiniOnSummon();
    if (normalized.startsWith("tech-") || normalized === "pray-patient") hospitalMiniOnTreatmentAction();
    if (normalized === "refuse-poor-patient") hospitalMiniOnRefuse();
    return;
  }
  if (isChurchMiniMapScenario()) {
    if (normalized === "church-confession") churchMiniOnConfession();
    if (
      normalized === "church-faith"
      || normalized === "church-counsel"
      || normalized === "church-random-care"
      || normalized === "church-revelation"
      || normalized === "church-promise"
    ) {
      churchMiniOnGatherAroundDoctor();
    }
    return;
  }
  if (isShopMiniMapScenario()) {
    const shouldServeAtCounter = (
      (normalized.startsWith("shop-") && !normalized.startsWith("shop-open-") && !normalized.startsWith("shop-back-"))
      || normalized === "merchant-buy"
      || normalized === "merchant-decline"
    );
    if (shouldServeAtCounter) {
      shopMiniStartDoctorService();
    }
    return;
  }
  if (isTentMiniMapScenario()) {
    if (normalized === "tent-triage-refresh") {
      tentMiniOnRosterRefresh();
      return;
    }
    return;
  }
  const player = state.miniMapEntities.find((entity) => entity.role === "player");
  if (!player) return;
  const others = state.miniMapEntities.filter((entity) => entity !== player);

  if (normalized.startsWith("tech-") || normalized.includes("pray-patient") || normalized.includes("release-patient") || normalized.includes("abandon-patient")) {
    nudgeMiniMapEntityToward(player, 52, 44, 8);
    others.filter((entity) => entity.role === "patient").forEach((entity) => nudgeMiniMapEntityToward(entity, player.x, player.y, 9));
    return;
  }

  if (normalized.startsWith("church-")) {
    nudgeMiniMapEntityToward(player, randomInt(38, 62), randomInt(16, 34), 11);
    others.filter((entity) => entity.role === "main").forEach((entity) => nudgeMiniMapEntityToward(entity, player.x, player.y, 7));
    return;
  }

  if (normalized.includes("summon-patient") || normalized.includes("accept-free") || normalized.includes("refuse-poor")) {
    others.filter((entity) => entity.role === "patient").forEach((entity) => nudgeMiniMapEntityToward(entity, player.x, player.y, 12));
    return;
  }

  if (normalized.includes("merchant-buy") || normalized.includes("merchant-decline")) {
    nudgeMiniMapEntityToward(player, randomInt(74, 90), randomInt(38, 60), 10);
    return;
  }

  if (normalized.includes("travel") || normalized.includes("rest-") || normalized.includes("finish-day")) {
    nudgeMiniMapEntityToward(player, randomInt(8, 18), randomInt(72, 88), 13);
    others.forEach((entity) => {
      entity.vx += (Math.random() * 2 - 1) * 4;
      entity.vy += (Math.random() * 2 - 1) * 4;
    });
    return;
  }

  nudgeMiniMapEntityToward(player, randomInt(22, 78), randomInt(24, 82), 6);
  others.forEach((entity) => {
    entity.vx += (Math.random() * 2 - 1) * 3;
    entity.vy += (Math.random() * 2 - 1) * 3;
  });
}

function stepMiniMap(deltaSeconds = 0.25) {
  ensureMiniMapScene();
  if (!state.miniMapEntities.length) return;
  if (isHospitalMiniMapScenario()) {
    stepHospitalMiniMap(deltaSeconds);
    resolveMiniMapOverlaps(state.miniMapEntities);
    state.miniMapReactionPulse = Math.max(0, state.miniMapReactionPulse - deltaSeconds * 0.42);
    return;
  }
  if (isChurchMiniMapScenario()) {
    stepChurchMiniMap(deltaSeconds);
    resolveMiniMapOverlaps(state.miniMapEntities);
    state.miniMapReactionPulse = Math.max(0, state.miniMapReactionPulse - deltaSeconds * 0.42);
    return;
  }
  if (isShopMiniMapScenario()) {
    stepShopMiniMap(deltaSeconds);
    resolveMiniMapOverlaps(state.miniMapEntities);
    state.miniMapReactionPulse = Math.max(0, state.miniMapReactionPulse - deltaSeconds * 0.42);
    return;
  }
  if (isTentMiniMapScenario()) {
    stepTentMiniMap(deltaSeconds);
    resolveMiniMapOverlaps(state.miniMapEntities);
    state.miniMapReactionPulse = Math.max(0, state.miniMapReactionPulse - deltaSeconds * 0.42);
    return;
  }
  if (isStableMiniMapScenario()) {
    stepStableMiniMap(deltaSeconds);
    resolveMiniMapOverlaps(state.miniMapEntities);
    state.miniMapReactionPulse = Math.max(0, state.miniMapReactionPulse - deltaSeconds * 0.42);
    return;
  }

  const maxSpeedByRole = {
    player: 12,
    generic: 14,
    patient: 10,
    main: 11
  };

  const player = state.miniMapEntities.find((entity) => entity.role === "player");
  state.miniMapEntities.forEach((entity) => {
    if (Math.random() < 0.1) {
      entity.vx += (Math.random() * 2 - 1) * 2.2;
      entity.vy += (Math.random() * 2 - 1) * 2.2;
    }

    if (state.persecutionLevel >= 10 && player && entity.role !== "player" && Math.random() < 0.2) {
      nudgeMiniMapEntityToward(entity, player.x, player.y, 1.8);
    }

    const maxSpeed = maxSpeedByRole[entity.role] || 11;
    const speed = Math.hypot(entity.vx, entity.vy);
    if (speed > maxSpeed) {
      entity.vx = (entity.vx / speed) * maxSpeed;
      entity.vy = (entity.vy / speed) * maxSpeed;
    }

    entity.x += entity.vx * deltaSeconds;
    entity.y += entity.vy * deltaSeconds;
    entity.vx *= 0.93;
    entity.vy *= 0.93;

    if (entity.x < 4 || entity.x > 96) {
      entity.vx *= -1;
      entity.x = clamp(entity.x, 4, 96);
    }
    if (entity.y < 6 || entity.y > 94) {
      entity.vy *= -1;
      entity.y = clamp(entity.y, 6, 94);
    }
  });

  resolveMiniMapOverlaps(state.miniMapEntities);
  state.miniMapReactionPulse = Math.max(0, state.miniMapReactionPulse - deltaSeconds * 0.42);
}

function getMiniMapPlayerRingColor() {
  if (state.doctorInfected) return "#c62020";
  const unslept = getUnsleptMinutes();
  const fatigueMix = clamp((unslept - 12 * 60) / (18 * 60), 0, 1);
  return mixHexColor("#2f79c8", "#c53a2c", fatigueMix);
}

function renderMiniMap() {
  if (!miniMapStage || !miniMapLabel) return;
  if (!state.gameStarted) {
    miniMapLabel.textContent = "Aguardando jornada";
    miniMapStage.classList.remove("pulse", "persecution-max");
    miniMapStage.innerHTML = '<div class="mini-map-empty">Inicie a jornada para visualizar o ambiente.</div>';
    return;
  }
  ensureMiniMapScene();
  syncHospitalMiniMapWithState();
  const profile = getMiniMapProfile();
  const city = getCurrentCity();
  const area = state.phase === 1 ? getAreaById(city, state.currentAreaId) : null;
  const isHospitalMap = isHospitalMiniMapScenario();
  const isChurchMap = isChurchMiniMapScenario();
  const isShopMap = isShopMiniMapScenario();
  const isTentMap = isTentMiniMapScenario();
  const isStableMap = isStableMiniMapScenario();
  miniMapLabel.textContent = state.phase === 1
    ? `${city.name} - ${area ? area.name : "Área"}`
    : profile.label;
  miniMapLabel.title = miniMapLabel.textContent;

  if (!state.miniMapEntities.length) {
    miniMapStage.innerHTML = '<div class="mini-map-empty">Sem presença detectada.</div>';
    miniMapStage.classList.remove("pulse", "persecution-max");
    return;
  }

  const player = state.miniMapEntities.find((entity) => entity.role === "player") || state.miniMapEntities[0];
  const ring = getMiniMapPlayerRingColor();
  const entitiesHtml = state.miniMapEntities
    .map((entity) => {
      const style = [
        `left:${entity.x.toFixed(2)}%`,
        `top:${entity.y.toFixed(2)}%`
      ];
      if (entity.role === "player") style.push(`--player-ring:${ring}`);
      const roleClass = entity.role || "generic";
      const variantClass = entity.variant ? ` ${entity.variant}` : "";
      const titleAttr = entity.tooltip ? ` title="${String(entity.tooltip).replace(/"/g, "&quot;")}"` : "";
      return `<div class="mini-entity ${roleClass}${variantClass}" style="${style.join(";")}"${titleAttr}></div>`;
    })
    .join("");

  const eyesHtml = state.persecutionLevel >= 10
    ? MINI_MAP_WATCHER_EYES.map((eye) => {
      const dx = clamp((player.x - eye.x) * 0.16, -4, 4);
      const dy = clamp((player.y - eye.y) * 0.16, -3.5, 3.5);
      return `
        <div class="mini-eye" style="left:${eye.x}%;top:${eye.y}%;">
          <span class="mini-eye-pupil" style="--dx:${dx.toFixed(2)}px;--dy:${dy.toFixed(2)}px;"></span>
        </div>
      `;
    }).join("")
    : "";

  const sections = isHospitalMap
    ? HOSPITAL_MINI_SECTIONS
    : isChurchMap
      ? CHURCH_MINI_SECTIONS
      : isShopMap
        ? SHOP_MINI_SECTIONS
        : isTentMap
          ? TENT_MINI_SECTIONS
          : isStableMap
            ? STABLE_MINI_SECTIONS
          : [];
  const sectionsHtml = sections.map((section) => {
    const fullLabel = String(section.label || "");
    const safeLabel = fullLabel.replace(/"/g, "&quot;");
    return `
      <div
        class="mini-zone ${section.id}"
        data-zone-id="${section.id}"
        data-zone-label="${safeLabel}"
        role="button"
        tabindex="0"
        title="${safeLabel}"
        style="left:${section.x}%;top:${section.y}%;width:${section.w}%;height:${section.h}%;"
      >
        <span title="${safeLabel}">${fullLabel}</span>
      </div>
    `;
  }).join("");

  const ambulatorySlotsHtml = isHospitalMap
    ? HOSPITAL_AMBULATORY_SLOTS.map((slot, idx) => `<div class="mini-amb-slot" style="left:${slot.x}%;top:${slot.y}%;"><span>${idx + 1}</span></div>`).join("")
    : "";

  miniMapStage.classList.toggle("hospital-layout", isHospitalMap);
  miniMapStage.classList.toggle("church-layout", isChurchMap);
  miniMapStage.classList.toggle("shop-layout", isShopMap);
  miniMapStage.classList.toggle("tent-layout", isTentMap);
  miniMapStage.classList.toggle("stable-layout", isStableMap);
  miniMapStage.classList.toggle("pulse", state.miniMapReactionPulse > 0.05);
  miniMapStage.classList.toggle("persecution-max", state.persecutionLevel >= 10);
  miniMapStage.innerHTML = sectionsHtml + ambulatorySlotsHtml + eyesHtml + entitiesHtml;
}

function resetMiniMapScene() {
  state.miniMapSceneKey = "";
  state.miniMapEntities = [];
  state.miniMapNextEntityId = 1;
  state.miniMapReactionPulse = 0;
}

const DAY_ITEM_FIELDS = [
  "treatmentBoostCharges",
  "protectionCharges",
  "precisionKitCharges",
  "tonics",
  "antiPlaguePotions",
  "rareBandageKits",
  "sacredMedallions",
  "alchemicalSerums",
  "valedouroSeals",
  "brumasulCorals",
  "pedrafriaShards",
  "blackCouncilSeals",
  "onyxKeys",
  "paleAmpoules",
  "sacredBibles",
  "rosaries",
  "maskInvitations"
];

function snapshotDayItems() {
  const snap = {};
  DAY_ITEM_FIELDS.forEach((field) => {
    snap[field] = state[field];
  });
  state.dayItemSnapshot = snap;
}

function restoreDayItemsFromSnapshot() {
  const snap = state.dayItemSnapshot || {};
  DAY_ITEM_FIELDS.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(snap, field)) {
      state[field] = snap[field];
    }
  });
}

function ensureAudio() {
  if (audioCtx) return true;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return false;
  audioCtx = new Ctx();
  masterGain = audioCtx.createGain();
  musicGain = audioCtx.createGain();
  sfxGain = audioCtx.createGain();
  masterGain.gain.value = 0.34;
  musicGain.gain.value = 0.46;
  sfxGain.gain.value = 0.72;
  musicGain.connect(masterGain);
  sfxGain.connect(masterGain);
  masterGain.connect(audioCtx.destination);
  return true;
}

function resumeAudio() {
  if (!ensureAudio()) return;
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
}

function playOsc(freq, duration, type = "sine", gainValue = 0.08, delay = 0) {
  if (!audioCtx || !sfxGain) return;
  const now = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain);
  gain.connect(sfxGain);
  osc.start(now);
  osc.stop(now + duration + 0.03);
}

function playNoiseBurst(duration = 0.22, gainValue = 0.08, lowpass = 1200) {
  if (!audioCtx || !sfxGain) return;
  const bufferSize = Math.max(1, Math.floor(audioCtx.sampleRate * duration));
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = lowpass;
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(sfxGain);
  source.start(now);
  source.stop(now + duration + 0.03);
}

function playBackgroundPhrase() {
  if (!audioCtx || !musicGain || state.phase !== 1 || !state.gameStarted) return;
  const motif = [220, 247, 262, 294, 262, 247];
  motif.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime + i * 0.42;
    osc.type = i % 2 === 0 ? "triangle" : "sine";
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);
    osc.connect(gain);
    gain.connect(musicGain);
    osc.start(now);
    osc.stop(now + 0.38);
  });
}

function startBackgroundMusic() {
  if (!audioCtx || bgMusicTimerId !== null) return;
  playBackgroundPhrase();
  bgMusicTimerId = window.setInterval(playBackgroundPhrase, 2600);
}

function playCoinSound() {
  playOsc(960, 0.1, "square", 0.07, 0);
  playOsc(1320, 0.12, "triangle", 0.06, 0.06);
}

function playPurchaseSound() {
  playOsc(420, 0.12, "triangle", 0.08, 0);
  playOsc(620, 0.15, "triangle", 0.07, 0.08);
  playCoinSound();
}

function playPrayerSound() {
  playOsc(220, 0.32, "sine", 0.08, 0);
  playOsc(277, 0.36, "sine", 0.07, 0.07);
  playOsc(330, 0.4, "sine", 0.06, 0.13);
}

function playStableHorseSound() {
  playNoiseBurst(0.18, 0.07, 900);
  playOsc(120, 0.16, "sawtooth", 0.05, 0.04);
}

function playTravelGallopSound() {
  for (let i = 0; i < 8; i += 1) {
    const d = i * 0.14;
    playNoiseBurst(0.07, 0.045, 700);
    playOsc(90 + (i % 2) * 15, 0.08, "square", 0.04, d);
  }
}

function playTreatmentSound(techId) {
  if (techId === "sangria") {
    playOsc(180, 0.22, "sawtooth", 0.06, 0);
    playNoiseBurst(0.08, 0.04, 1400);
    return;
  }
  if (techId === "ervas") {
    playOsc(330, 0.18, "triangle", 0.05, 0);
    playOsc(392, 0.22, "triangle", 0.05, 0.09);
    return;
  }
  if (techId === "fumigacao") {
    playNoiseBurst(0.2, 0.05, 500);
    playOsc(240, 0.2, "sine", 0.04, 0.06);
    return;
  }
  if (techId === "isolamento") {
    playOsc(196, 0.28, "triangle", 0.055, 0);
    return;
  }
  if (techId === "vinagre") {
    playOsc(520, 0.09, "square", 0.045, 0);
    playOsc(430, 0.12, "square", 0.045, 0.08);
    return;
  }
  playOsc(300, 0.16, "triangle", 0.05, 0);
}

function playDreadSignal() {
  playNoiseBurst(0.45, 0.08, 1800);
  playOsc(150, 0.5, "sawtooth", 0.08, 0);
  playOsc(132, 0.54, "sawtooth", 0.07, 0.06);
}

function getDoctorDisplayName() {
  if (!state.doctorName) return "Médico sem nome";
  return `${state.doctorTitle} ${state.doctorName}`.trim();
}

function formatPlayTime(totalSeconds = 0) {
  const secs = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;
  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function readDeathHistory() {
  try {
    const raw = localStorage.getItem(DEATH_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry) => entry && typeof entry.name === "string");
  } catch (_) {
    return [];
  }
}

function writeDeathHistory(entries) {
  try {
    localStorage.setItem(DEATH_HISTORY_STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_DEATH_HISTORY)));
  } catch (_) {
    // Ignore local storage failures for narrative history.
  }
}

function registerDoctorDeathHistory() {
  const name = getDoctorDisplayName();
  const history = readDeathHistory();
  history.unshift({
    name,
    day: state.day,
    phase: state.phase,
    cityId: state.currentCityId,
    timestamp: Date.now()
  });
  writeDeathHistory(history);
}

function getDeathHistoryNarrativeLine() {
  const history = readDeathHistory();
  const uniqueNames = [];
  for (const entry of history) {
    const name = (entry.name || "").trim();
    if (!name || uniqueNames.includes(name)) continue;
    uniqueNames.push(name);
    if (uniqueNames.length >= 4) break;
  }
  if (!uniqueNames.length) return "";
  if (uniqueNames.length <= 3) {
    if (uniqueNames.length === 1) {
      return `Sussurro do corredor: '${uniqueNames[0]} caiu há algum tempo... e a peste não mudou.'`;
    }
    return `Sussurro do corredor: 'a cidade ainda lembra de ${uniqueNames.join(", ")}. Todos tentaram, todos caíram.'`;
  }
  return "Sussurro do corredor: 'já se foram tantos doutores e a esperança hoje não é só tolice, é quase blasfêmia'.";
}

function describeSaveSituation(saveData) {
  if (!saveData || !saveData.state) return "Sem progresso";
  const snapshot = saveData.state;
  if (snapshot.phase === 1) {
    const city = getCityById(snapshot.currentCityId || "valedouro");
    const area = getAreaById(city, snapshot.currentAreaId || "estabulo");
    return `Fase 1 - ${city.name} / ${area ? area.name : "Área desconhecida"}`;
  }
  if (snapshot.phase === 2) {
    return `Fase 2 - Investigando (${snapshot.evidence || 0}/100 evidência)`;
  }
  if (snapshot.phase === 3) {
    return `Fase 3 - Cerne da conspiração`;
  }
  return "Situação desconhecida";
}

function getSaveStorageKey(slotId) {
  return `${SAVE_STORAGE_PREFIX}${slotId}`;
}

function readSaveSlot(slotId) {
  try {
    const raw = localStorage.getItem(getSaveStorageKey(slotId));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

function collectSaveSlots() {
  return SAVE_SLOT_IDS.map((slotId) => ({ slotId, data: readSaveSlot(slotId) }));
}

function applyLoadedState(payload) {
  const savedState = payload && payload.state ? payload.state : null;
  if (!savedState) return false;
  Object.keys(state).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(savedState, key)) {
      state[key] = savedState[key];
    }
  });
  return true;
}

function saveCurrentSlot() {
  if (!state.gameStarted || !state.selectedSaveSlot) return;
  const slotKey = getSaveStorageKey(state.selectedSaveSlot);
  const snapshot = {};
  Object.keys(state).forEach((key) => {
    if (key === "tutorialRunning" || key === "tutorialPayload") return;
    snapshot[key] = state[key];
  });
  const payload = {
    version: 1,
    updatedAt: Date.now(),
    phase: state.phase,
    doctorName: state.doctorName,
    state: snapshot
  };
  try {
    const previousRaw = localStorage.getItem(slotKey);
    if (previousRaw) {
      localStorage.setItem(`${SAVE_BACKUP_PREFIX}${state.selectedSaveSlot}`, previousRaw);
    }
    localStorage.setItem(slotKey, JSON.stringify(payload));
  } catch (_) {
    addLog("Falha ao salvar no armazenamento local deste navegador.", { type: "event" });
  }
}

function saveSlotsCoverAllPhases() {
  const phases = new Set();
  collectSaveSlots().forEach(({ data }) => {
    if (data && [1, 2, 3].includes(data.phase)) phases.add(data.phase);
  });
  return phases.has(1) && phases.has(2) && phases.has(3);
}

function refreshPhaseSpreadWarning() {
  if (!phaseSpreadWarning) return;
  if (!saveSlotsCoverAllPhases()) {
    phaseSpreadWarning.classList.add("hidden");
    phaseSpreadWarning.textContent = "";
    return;
  }
  phaseSpreadWarning.classList.remove("hidden");
  phaseSpreadWarning.textContent = "eles sabem o que você esta fazendo. Apenas eles detem o passado, presente e o futuro";
}

function renderSaveSlots() {
  if (!saveSlotsList) return;
  const slots = collectSaveSlots();
  saveSlotsList.innerHTML = slots.map(({ slotId, data }) => {
    const selected = slotId === state.selectedSaveSlot;
    if (!data) {
      return `
        <article class="save-slot ${selected ? "selected" : ""}" data-save-slot="${slotId}">
          <p><strong>Slot ${slotId}</strong> - vazio</p>
          <p>Novo jogo disponível.</p>
        </article>
      `;
    }
    const date = new Date(data.updatedAt || Date.now());
    const stamp = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    const situation = describeSaveSituation(data);
    const day = data.state && data.state.day ? data.state.day : 1;
    const playtime = formatPlayTime(data.state && data.state.playTimeSeconds ? data.state.playTimeSeconds : 0);
    return `
      <article class="save-slot ${selected ? "selected" : ""}" data-save-slot="${slotId}">
        <p><strong>Slot ${slotId}</strong> - ${data.doctorName || "Sem nome"}</p>
        <p>Situação: ${situation}</p>
        <p>Dia: ${day} | Tempo: ${playtime}</p>
        <p>Atualizado: ${stamp}</p>
      </article>
    `;
  }).join("");
  const selectedData = readSaveSlot(state.selectedSaveSlot);
  deleteSaveBtn.disabled = !selectedData;
  startJourneyBtn.textContent = selectedData ? "Carregar save selecionado" : "Iniciar jornada";
  refreshPhaseSpreadWarning();
}

function selectSaveSlot(slotId) {
  state.selectedSaveSlot = slotId;
  const payload = readSaveSlot(slotId);
  if (payload && payload.state) {
    const slotState = payload.state;
    doctorNameInput.value = slotState.doctorName || payload.doctorName || "";
    doctorTitleSelect.value = slotState.doctorTitle || "Dr.";
  }
  renderSaveSlots();
}

function deleteSelectedSave() {
  try {
    localStorage.removeItem(getSaveStorageKey(state.selectedSaveSlot));
    renderSaveSlots();
  } catch (_) {
    addLog("Não foi possível apagar este save agora.", { type: "event" });
  }
}

function applyPhaseThemeByState() {
  if (state.phase === 1) {
    document.body.className = "phase-1";
    phaseTitle.textContent = "Fase 1: A Rotina do Hospital";
    applyTimeTheme();
    return;
  }
  clearPhase1ThemeOverrides();
  if (state.phase === 2) {
    document.body.className = "phase-2";
    phaseTitle.textContent = "Fase 2: Rastro Oculto";
    return;
  }
  document.body.className = "phase-3";
  phaseTitle.textContent = "Fase 3: O Coração da Conspiração";
}

function loadFromSelectedSlot() {
  const requestedSlot = state.selectedSaveSlot;
  const payload = readSaveSlot(requestedSlot);
  if (!payload) return false;
  if (!applyLoadedState(payload)) return false;
  state.selectedSaveSlot = requestedSlot;
  const legacyHospital = payload.state && payload.state.miniMapHospital ? payload.state.miniMapHospital : null;
  const legacyChurch = payload.state && payload.state.miniMapChurch ? payload.state.miniMapChurch : null;
  const hadCityStateInSave = !!(payload.state && payload.state.miniMapCityState && typeof payload.state.miniMapCityState === "object");
  const hadCityHospitalStateInSave = !!(payload.state && payload.state.cityHospitalState && typeof payload.state.cityHospitalState === "object");
  if (!state.miniMapCityState || typeof state.miniMapCityState !== "object") {
    state.miniMapCityState = {};
  }
  ensureAllCitiesMiniState();
  if (!state.cityHospitalState || typeof state.cityHospitalState !== "object") {
    state.cityHospitalState = {};
  }
  ensureAllCitiesHospitalState();
  if (!hadCityStateInSave) {
    const cityState = getCityMiniState(state.currentCityId);
    if (legacyHospital && typeof legacyHospital === "object") {
      cityState.hospital = {
        ...createDefaultHospitalMiniState(),
        ...legacyHospital
      };
    }
    if (legacyChurch && typeof legacyChurch === "object") {
      cityState.church = {
        ...createDefaultChurchMiniState(),
        ...legacyChurch
      };
    }
  }
  if (!hadCityHospitalStateInSave) {
    getCityHospitalState(state.currentCityId);
  }
  ensureAllCitiesStableState();
  ensureTriageState();
  state.gameStarted = true;
  state.phase2DreamActive = false;
  if (state.phase === 1) {
    // Evita saves antigos iniciarem direto no gatilho/cena da Fase 2.
    state.hasRecoveredFromPlague = false;
    state.phase2DreamPending = false;
    state.phase2DreamArmed = false;
    state.phase2DreamResolved = false;
    state.dayStartAfterDreamPending = false;
    state.phase2Boon = null;
    state.phase2PendingTrigger = false;
    state.maskInvitePending = false;
    state.maskEventActive = false;
    state.maskFastForwardActive = false;
    state.maskBallStage = 0;
    state.maskBallClues = 0;
    state.maskBallInteractions = 0;
    state.maskBallItems = [];
    state.maskBallApex = false;
    state.maskTriggerResolved = false;
  }
  state.tutorialRunning = false;
  state.tutorialPayload = null;
  resetMiniMapScene();
  hidePhase2DreamOverlay();
  hideMaskOverlays();
  resetSleepDeprivationCycle();
  snapshotDayItems();
  closeCollapsePopup();
  closeHospitalReminderPopup();
  closeInviteNoticePopup();
  closeAmbulatoryReportPopup();
  closeCorpseDisposalPopup();
  closeTradePopup();
  closeMiniMapAreaPopup();
  resetShopMenuState();
  hideFinalDeathOverlay();
  if (miracleOverlay) miracleOverlay.classList.add("hidden");
  if (infectionOverlay) infectionOverlay.classList.add("hidden");
  introModal.classList.add("hidden");
  tutorialModal.classList.add("hidden");
  resumeAudio();
  startBackgroundMusic();
  applyPhaseThemeByState();
  addLog(`Save carregado do Slot ${state.selectedSaveSlot}.`, { type: "event" });
  render();
  checkPhase1TransitionTrigger();
  return true;
}

function openExitModal() {
  if (!state.gameStarted) return;
  exitModal.classList.remove("hidden");
}

function closeExitModal() {
  exitModal.classList.add("hidden");
}

function exitGame(saveBeforeExit) {
  if (saveBeforeExit) {
    saveCurrentSlot();
  } else {
    const confirmed = window.confirm("Seu progresso será perdido se voltar ao menu sem salvar. Deseja continuar?");
    if (!confirmed) return;
  }
  window.location.reload();
}

function renderTutorialModal() {
  if (!state.tutorialRunning || !state.tutorialPayload) {
    tutorialModal.classList.add("hidden");
    return;
  }
  tutorialStepTitle.textContent = state.tutorialPayload.title;
  tutorialStepText.textContent = state.tutorialPayload.text;
  tutorialBackBtn.classList.add("hidden");
  tutorialNextBtn.textContent = "Entendi";
  tutorialSkipBtn.textContent = "Desativar tutorial";
  tutorialModal.classList.remove("hidden");
}

function closeTutorialModal() {
  state.tutorialRunning = false;
  state.tutorialPayload = null;
  tutorialModal.classList.add("hidden");
  render();
}

function disableTutorial() {
  state.tutorialEnabled = false;
  state.tutorialSkipped = true;
  closeTutorialModal();
  addLog("Tutorial desativado. Você seguirá sem dicas contextuais.", { type: "event" });
}

function closeChoiceModal() {
  if (!choiceModal) return;
  choiceModal.classList.add("hidden");
  if (choiceActions) choiceActions.innerHTML = "";
}

function openChoiceModal({ title, text, actions = [] }) {
  if (!choiceModal || !choiceTitle || !choiceText || !choiceActions) return;
  choiceTitle.textContent = title || "Escolha";
  choiceText.textContent = text || "";
  choiceActions.innerHTML = "";
  actions.forEach((entry) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = entry.label || "Selecionar";
    btn.addEventListener("click", () => {
      closeChoiceModal();
      if (typeof entry.onClick === "function") entry.onClick();
    });
    choiceActions.appendChild(btn);
  });
  choiceModal.classList.remove("hidden");
}

function maybeShowAreaTutorial(areaId) {
  if (!state.gameStarted || state.phase !== 1) return;
  if (!state.tutorialEnabled || state.tutorialSkipped) return;
  if (state.tutorialSeenAreas[areaId]) return;
  const guide = AREA_TUTORIAL_GUIDES[areaId];
  if (!guide) return;
  state.tutorialSeenAreas[areaId] = true;
  state.tutorialRunning = true;
  state.tutorialPayload = guide;
  renderTutorialModal();
}

function startJourney() {
  resumeAudio();
  startBackgroundMusic();
  const existing = readSaveSlot(state.selectedSaveSlot);
  if (existing) {
    const loaded = loadFromSelectedSlot();
    if (!loaded) {
      addLog("Falha ao carregar o save selecionado.", { type: "event" });
    }
    return;
  }

  const rawName = (doctorNameInput.value || "").trim();
  if (!rawName) {
    doctorNameInput.focus();
    addLog("Defina o nome do médico(a) para iniciar.", { type: "event" });
    return;
  }
  state.doctorName = rawName;
  state.doctorTitle = doctorTitleSelect.value || "Dr.";
  state.gameStarted = true;
  state.hasRecoveredFromPlague = false;
  state.faithVisits = 0;
  state.faithPoints = 0;
  state.faithTier = 0;
  state.confessions = 0;
  state.hasConfessed = false;
  state.religiousCareerThoughtsShown = false;
  state.prayerUnlockedNotified = false;
  state.faithPromiseType = "";
  state.faithPromiseBroken = false;
  state.medicalVowUntilDay = 0;
  state.faithMiracleUses = 0;
  state.faithBrokenCycles = 0;
  state.faithMiracleDreamPending = false;
  state.maskInvitePending = false;
  state.maskInvitations = 0;
  state.maskEventActive = false;
  state.maskFastForwardActive = false;
  state.maskBallStage = 0;
  state.maskBallClues = 0;
  state.maskBallInteractions = 0;
  state.maskBallItems = [];
  state.maskBallApex = false;
  state.blackCouncilSeals = 0;
  state.onyxKeys = 0;
  state.paleAmpoules = 0;
  state.sacredBibles = 0;
  state.rosaries = 0;
  state.maskTriggerResolved = false;
  state.phase2DreamPending = false;
  state.phase2DreamActive = false;
  state.phase2DreamResolved = false;
  state.phase2DreamArmed = false;
  state.dayStartAfterDreamPending = false;
  state.phase2Boon = null;
  state.phase2PendingTrigger = false;
  state.miniMapCityState = {};
  state.cityHospitalState = {};
  state.cityStableState = {};
  state.residentialUnlockedByCity = {};
  state.residentialIntelByCity = {};
  state.residentialSelectedHouseId = "";
  state.triageReferrals = [];
  state.triageRosterIds = [];
  state.triageActiveCharacterId = "";
  state.triageDialogueStep = 0;
  state.triageEmpathyScore = 0;
  state.triageLastSeenHour = -1;
  state.triageCharacterOutcomeById = {};
  state.triageNurseStatusById = {};
  state.triageCuredHopeNames = [];
  refreshTriageRoster(true);
  ensureAllCitiesMiniState();
  ensureAllCitiesHospitalState();
  ensureAllCitiesStableState();
  state.miniMapHospital = createDefaultHospitalMiniState();
  state.miniMapChurch = createDefaultChurchMiniState();
  state.miniMapShop = createDefaultShopMiniState();
  state.miniMapStable = createDefaultStableMiniState();
  state.miniMapTent = createDefaultTentMiniState();
  resetMiniMapScene();
  hidePhase2DreamOverlay();
  hideMaskOverlays();
  resetSleepDeprivationCycle();
  snapshotDayItems();
  closeCollapsePopup();
  closeHospitalReminderPopup();
  closeInviteNoticePopup();
  closeAmbulatoryReportPopup();
  closeCorpseDisposalPopup();
  closeTradePopup();
  closeMiniMapAreaPopup();
  resetShopMenuState();
  hideFinalDeathOverlay();
  if (miracleOverlay) miracleOverlay.classList.add("hidden");
  if (infectionOverlay) infectionOverlay.classList.add("hidden");
  introModal.classList.add("hidden");
  addLog(`Ano de 1348. ${getDoctorDisplayName()}, a peste consome os bairros e o hospital é a última trincheira.`);
  addLog("Você é um médico de plantão com relógio diário: manhã custa 1, após 18h custa 2, e após virar a noite custa 4 de vida por ação.");
  addLog("Agora existe uma economia médica: pacientes pagantes remuneram seu trabalho e você pode investir em itens.");
  addLog("Visitas frequentes à igreja alteram o tom da cidade: fé cresce, mas também surgem rumores de perseguição.");
  addLog("Se você curar a própria peste, mudanças importantes podem surgir no descanso da noite.");
  addLog("Escolha no Menu de Mapa para qual área você quer ir primeiro.");
  const deathHistoryLine = getDeathHistoryNarrativeLine();
  if (deathHistoryLine) addLog(deathHistoryLine, { type: "dialogue" });

  state.tutorialEnabled = !skipTutorialCheck.checked;
  state.tutorialSkipped = skipTutorialCheck.checked;
  state.tutorialSeenAreas = {};
  if (state.tutorialSkipped) {
    addLog("Tutorial pulado. Dicas contextuais desativadas.", { type: "event" });
  } else {
    addLog("Tutorial contextual ativo: as dicas aparecerão ao explorar novas áreas.", { type: "event" });
  }
  showDayStartOverlay(state.day);
  render();
}

function setPersecutionLevel(nextValue) {
  const prev = state.persecutionLevel;
  state.persecutionLevel = clamp(nextValue, 0, 10);
  const drop = prev - state.persecutionLevel;
  if (drop > 0) {
    state.bloodStainDecayBudget += drop * 20;
    state.persecutionCooling = true;
    return;
  }
  if (state.persecutionLevel >= prev) state.persecutionCooling = false;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const normalized = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16)
  ];
}

function rgbToHex(r, g, b) {
  const toHex = (value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function mixHexColor(hexA, hexB, t) {
  const [r1, g1, b1] = hexToRgb(hexA);
  const [r2, g2, b2] = hexToRgb(hexB);
  return rgbToHex(lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t));
}

function blendPalette(paletteA, paletteB, t) {
  return {
    bg: mixHexColor(paletteA.bg, paletteB.bg, t),
    surface: mixHexColor(paletteA.surface, paletteB.surface, t),
    ink: mixHexColor(paletteA.ink, paletteB.ink, t),
    accent: mixHexColor(paletteA.accent, paletteB.accent, t),
    border: mixHexColor(paletteA.border, paletteB.border, t),
    sky1: mixHexColor(paletteA.sky1, paletteB.sky1, t),
    sky2: mixHexColor(paletteA.sky2, paletteB.sky2, t),
    glowColor: mixHexColor(paletteA.glow.color, paletteB.glow.color, t),
    glowAlpha: lerp(paletteA.glow.alpha, paletteB.glow.alpha, t)
  };
}

function pickSymptoms() {
  const shuffled = [...symptomsPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

function getPatientStage(patient) {
  const hp = clamp(patient.hp, 0, 100);
  return CLINICAL_STAGES.find((s) => hp >= s.minHp && hp <= s.maxHp) || CLINICAL_STAGES[0];
}

function getCityById(cityId) {
  return WORLD_MAP.find((city) => city.id === cityId) || WORLD_MAP[0];
}

function getCurrentCity() {
  return getCityById(state.currentCityId);
}

function getAreaById(city, areaId) {
  return city.areas.find((area) => area.id === areaId);
}

function ensureResidentialIntelState() {
  if (!state.residentialUnlockedByCity || typeof state.residentialUnlockedByCity !== "object") {
    state.residentialUnlockedByCity = {};
  }
  if (!state.residentialIntelByCity || typeof state.residentialIntelByCity !== "object") {
    state.residentialIntelByCity = {};
  }
  if (typeof state.residentialSelectedHouseId !== "string") {
    state.residentialSelectedHouseId = "";
  }
}

function buildResidentialHouseRoster(cityId) {
  const cityIndex = Math.max(0, WORLD_MAP.findIndex((city) => city.id === cityId));
  const nurses = TRIAGE_CHARACTER_LIBRARY.filter((character) => character.role === "enfermeira");
  const patients = TRIAGE_CHARACTER_LIBRARY.filter((character) => character.role === "paciente");
  const nurseName = (nurses[cityIndex % Math.max(1, nurses.length)]?.name || "Marta").replace(/^Enfermeira\s+/i, "");
  const npcName = patients[(cityIndex * 7 + 4) % Math.max(1, patients.length)]?.name || "Baltazar";
  return [
    { id: `${cityId}-casa-1`, label: "Casa 1", hasMark: true, opensDoor: true, style: "religioso", closedType: "" },
    { id: `${cityId}-casa-2`, label: "Casa 2", hasMark: false, opensDoor: false, style: "logico", closedType: "empty" },
    { id: `${cityId}-casa-3`, label: "Casa 3", hasMark: true, opensDoor: false, style: "inquieto", closedType: "voices" },
    { id: `${cityId}-casa-enfermeira`, label: `Casa da enfermeira ${nurseName}`, hasMark: true, opensDoor: true, style: "logico", closedType: "" },
    { id: `${cityId}-casa-npc`, label: `Casa de ${npcName}`, hasMark: false, opensDoor: true, style: "inquieto", closedType: "" }
  ];
}

function getResidentialCityIntel(cityId = state.currentCityId) {
  ensureResidentialIntelState();
  if (!state.residentialIntelByCity[cityId] || typeof state.residentialIntelByCity[cityId] !== "object") {
    state.residentialIntelByCity[cityId] = {
      houses: buildResidentialHouseRoster(cityId),
      lastFigureSeenAt: -999999
    };
  }
  const intel = state.residentialIntelByCity[cityId];
  if (!Array.isArray(intel.houses) || intel.houses.length === 0) {
    intel.houses = buildResidentialHouseRoster(cityId);
  }
  if (!Number.isFinite(intel.lastFigureSeenAt)) intel.lastFigureSeenAt = -999999;
  return intel;
}

function isResidentialUnlockedForCity(cityId = state.currentCityId) {
  ensureResidentialIntelState();
  return !!state.residentialUnlockedByCity[cityId];
}

function unlockResidentialArea(cityId = state.currentCityId, reason = "") {
  ensureResidentialIntelState();
  const alreadyUnlocked = !!state.residentialUnlockedByCity[cityId];
  state.residentialUnlockedByCity[cityId] = true;
  getResidentialCityIntel(cityId);
  if (!alreadyUnlocked) {
    const city = getCityById(cityId);
    const suffix = reason ? ` (${reason})` : "";
    addLog(`Nova área desbloqueada em ${city.name}: Área Residencial${suffix}.`, { type: "event" });
  }
}

function getSelectedResidentialHouse(cityId = state.currentCityId) {
  const intel = getResidentialCityIntel(cityId);
  return intel.houses.find((house) => house.id === state.residentialSelectedHouseId) || null;
}

function isAreaVisible(area) {
  if (area.hiddenUntilPhase3 && state.phase < 3) return false;
  if (area.requiresResidentialIntel && !isResidentialUnlockedForCity()) return false;
  return true;
}

function isAreaUnlocked(area) {
  return state.phase >= (area.unlockPhase || 1);
}

function isClinicalArea() {
  return state.currentAreaId === "hospital";
}

function isShopArea() {
  return state.currentAreaId === "loja";
}

function isStableArea() {
  return state.currentAreaId === "estabulo";
}

function isMedicalVowActive() {
  return state.medicalVowUntilDay > 0 && state.day <= state.medicalVowUntilDay;
}

function canNavigateNow() {
  if (state.phase1Failed) return false;
  if (state.blackoutActive || state.collapsePending) return false;
  if (state.awaitingRestChoice) return false;
  if (state.phase2DreamActive) return false;
  if (state.maskEventActive || state.maskFastForwardActive) return false;
  if (state.travelEncounter) return false;
  if (state.currentPatient && state.currentPatient.active) return false;
  return true;
}

function canTravelNow() {
  if (!canNavigateNow()) return false;
  if (!isStableArea()) return false;
  return true;
}

function getTravelCost() {
  const base = state.doctorInfected ? 30 : 15;
  const discount = getTravelDiscountPercent(state.currentCityId);
  const finalCost = Math.ceil(base * (1 - discount / 100));
  return Math.max(1, finalCost);
}

function renderMapMenuState() {
  if (mapMenuPanel) mapMenuPanel.classList.remove("hidden");
  if (mapMenuToggle) mapMenuToggle.textContent = "Info";
}

function toggleInventoryPanel() {
  if (!inventoryInfo || !inventoryToggle) return;
  inventoryInfo.classList.toggle("hidden");
  syncInventoryPanelState();
}

function syncInventoryPanelState() {
  if (!inventoryInfo || !inventoryToggle) return;
  const opened = !inventoryInfo.classList.contains("hidden");
  inventoryToggle.textContent = opened ? "X" : "^";
  inventoryToggle.setAttribute("aria-label", opened ? "Fechar inventário" : "Abrir inventário");
  if (inventorySidebar) inventorySidebar.classList.toggle("collapsed", !opened);
  if (rightPanel) rightPanel.classList.toggle("inventory-collapsed", !opened);
  queueCustomScrollbarRefresh();
}

function getCorpseRiskSurchargeByCity(cityId = state.currentCityId) {
  const cityMini = getCityMiniState(cityId);
  const count = cityMini.hospital.corpseCount || 0;
  if (count < 8) return 0;
  return clamp(count / 100, 0, 0.25);
}

function getCorpseCartCost(cityId = state.currentCityId) {
  const cityMini = getCityMiniState(cityId);
  const count = cityMini.hospital.corpseCount || 0;
  if (count < 5) return 50;
  return 50 + Math.max(0, count - 5) * 10;
}

function getCurrentCityRisk() {
  const base = getCurrentCity().contagionRisk || 0.1;
  return clamp(base + getCorpseRiskSurchargeByCity(state.currentCityId), 0, 0.95);
}

function getCurrentCityPaymentMultiplier() {
  return getCurrentCity().paymentMultiplier || 1;
}

function getRiskLabel(riskValue) {
  if (riskValue >= 0.2) return "Alto";
  if (riskValue >= 0.14) return "Médio";
  return "Baixo";
}

function checkPhase1TransitionTrigger() {
  if (state.phase !== 1) return;
  if (state.phase1Failed) return;
  if (state.maskTriggerResolved) return;
  if (state.phase2DreamPending || state.phase2DreamActive) return;
  if (state.maskInvitePending || state.maskEventActive || state.maskFastForwardActive) return;
  if (state.popularity < state.popularityPhase2Threshold) return;
  if (state.maskInvitations > 0) return;
  if (maskInviteDelayTimerId !== null) return;

  addLog("Sua fama começa a se espalhar pelos salões da alta sociedade. Um mensageiro pode aparecer em breve.", { type: "event" });
  maskInviteDelayTimerId = window.setTimeout(() => {
    maskInviteDelayTimerId = null;
    if (state.phase !== 1 || state.phase1Failed || state.maskTriggerResolved) return;
    if (state.popularity < state.popularityPhase2Threshold || state.maskInvitations > 0) return;

    state.maskInvitations = 1;
    addLog("Após o burburinho de sua fama, um mensageiro encapuzado entrega um convite lacrado para o baile.", { type: "event" });
    showInviteNoticePopup();

    const canOpenNow = !state.awaitingRestChoice
      && !state.phase2DreamActive
      && !(state.currentPatient && state.currentPatient.active)
      && !state.maskEventActive
      && !state.maskFastForwardActive;

    if (canOpenNow) {
      state.maskInvitePending = true;
      openMaskInvitation(true);
    } else {
      addLog("O convite foi guardado no inventário; abra quando o plantão permitir.", { type: "event" });
    }
    render();
  }, 30000);
}

function infectDoctor(initialSeverity) {
  if (state.doctorInfected) return;
  state.doctorInfected = true;
  state.doctorInfectionSeverity = clamp(initialSeverity, 20, 95);
  addLog("Você foi contaminado pela peste durante o plantão.");
  showInfectionOverlay();
}

function tryDoctorContagionExposure() {
  if (state.phase !== 1 || state.phase1Failed) return;
  if (state.doctorInfected) return;
  if (!isClinicalArea()) return;
  if (state.playerLife >= 50) return;

  const cityRisk = getCurrentCityRisk();
  const lowLifeFactor = (50 - state.playerLife) * 0.006;
  const contagionChance = clamp(cityRisk + lowLifeFactor, 0.05, 0.6);
  if (Math.random() < contagionChance) {
    infectDoctor(randomInt(35, 55));
  }
}

function applyDoctorPlagueProgression() {
  if (!state.doctorInfected || state.phase !== 1 || state.phase1Failed) return;
  const severityGain = randomInt(2, 5);
  const lifeLoss = randomInt(1, 3);
  state.doctorInfectionSeverity = clamp(state.doctorInfectionSeverity + severityGain, 0, 100);
  state.playerLife = clamp(state.playerLife - lifeLoss, 0, state.playerMaxLife);
  addLog(`A peste no seu corpo avança (+${severityGain} contaminação, -${lifeLoss} vida).`);
}

function cureDoctorPlague(reason) {
  if (!state.doctorInfected) return;
  state.doctorInfected = false;
  state.doctorInfectionSeverity = 0;
  state.hasRecoveredFromPlague = true;
  addLog(`Você superou a peste por ${reason}.`);
  if (state.faithMiracleDreamPending) {
    addLog("A cidade fala em milagre, mas a noite ainda pode cobrar seu preço.");
  }
  checkPhase1TransitionTrigger();
}

function getClockHour() {
  return state.dayClockMinutes / 60;
}

function formatHour(clockMinutes) {
  const total = Math.floor(clockMinutes);
  const hour = Math.floor(total / 60) % 24;
  const minute = total % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function getClockMinutesOfDay(clockMinutes = state.dayClockMinutes) {
  const total = Math.floor(clockMinutes);
  const mod = total % (24 * 60);
  return mod < 0 ? mod + 24 * 60 : mod;
}

function ensureTriageState() {
  ensureResidentialIntelState();
  if (!Array.isArray(state.triageReferrals)) state.triageReferrals = [];
  if (!Array.isArray(state.triageRosterIds)) state.triageRosterIds = [];
  if (typeof state.triageActiveCharacterId !== "string") state.triageActiveCharacterId = "";
  if (!Number.isFinite(state.triageDialogueStep)) state.triageDialogueStep = 0;
  if (!Number.isFinite(state.triageEmpathyScore)) state.triageEmpathyScore = 0;
  if (!Number.isFinite(state.triageLastSeenHour)) state.triageLastSeenHour = -1;
  if (!state.triageCharacterOutcomeById || typeof state.triageCharacterOutcomeById !== "object") {
    state.triageCharacterOutcomeById = {};
  }
  if (!state.triageNurseStatusById || typeof state.triageNurseStatusById !== "object") {
    state.triageNurseStatusById = {};
  }
  if (!Array.isArray(state.triageCuredHopeNames)) state.triageCuredHopeNames = [];
  if (typeof state.dayStartAfterDreamPending !== "boolean") state.dayStartAfterDreamPending = false;
  state.triageReferrals.forEach((patient) => {
    if (patient && patient.triageSource) {
      if (!state.triageCharacterOutcomeById[patient.triageSource]) {
        state.triageCharacterOutcomeById[patient.triageSource] = "active";
      }
    }
  });
  if (state.currentPatient && state.currentPatient.active && state.currentPatient.triageSource) {
    state.triageCharacterOutcomeById[state.currentPatient.triageSource] = "active";
  }
  if (typeof state.actionMenuAreaId !== "string") state.actionMenuAreaId = "";
  if (typeof state.actionMenuSectionId !== "string") state.actionMenuSectionId = "";
}

function resetActionMenuContext() {
  state.actionMenuAreaId = "";
  state.actionMenuSectionId = "";
}

function setActionMenuSectionForCurrentArea(sectionId) {
  state.actionMenuAreaId = state.currentAreaId;
  state.actionMenuSectionId = sectionId;
}

function getAbsoluteGameMinutes() {
  return state.day * 24 * 60 + getClockMinutesOfDay(state.dayClockMinutes);
}

function getAmbulatoryCycleIndex(absoluteMinutes) {
  // Ciclo diário ancorado às 08:00.
  return Math.floor((absoluteMinutes - (8 * 60)) / (24 * 60));
}

function formatHourWithSeconds(totalSeconds) {
  const value = Math.max(0, Math.floor(totalSeconds));
  const hour = Math.floor(value / 3600) % 24;
  const minute = Math.floor((value % 3600) / 60);
  const second = value % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
}

function getActionLifeCostByHour() {
  const hour = getClockHour();
  if (hour >= 24) return 4;
  if (hour >= 18) return 2;
  return 1;
}

function applyTimeTheme() {
  if (state.phase !== 1) return;
  const hour = ((getClockHour() % 24) + 24) % 24;
  let palette;

  if (hour >= 6 && hour < 17) {
    const t = (hour - 6) / 11;
    palette = blendPalette(PHASE1_TIME_PALETTES.morning, PHASE1_TIME_PALETTES.sunset, t);
  } else if (hour >= 17 && hour < 20) {
    const t = (hour - 17) / 3;
    palette = blendPalette(PHASE1_TIME_PALETTES.sunset, PHASE1_TIME_PALETTES.night, t);
  } else {
    const adjustedHour = hour < 6 ? hour + 24 : hour;
    const t = (adjustedHour - 20) / 10;
    palette = blendPalette(PHASE1_TIME_PALETTES.night, PHASE1_TIME_PALETTES.morning, t);
  }

  document.body.style.setProperty("--bg", palette.bg);
  document.body.style.setProperty("--surface", palette.surface);
  document.body.style.setProperty("--ink", palette.ink);
  document.body.style.setProperty("--accent", palette.accent);
  document.body.style.setProperty("--border", palette.border);
  document.body.style.setProperty("--sky1", palette.sky1);
  document.body.style.setProperty("--sky2", palette.sky2);
  document.body.style.setProperty("--glow", `rgba(${hexToRgb(palette.glowColor).join(", ")}, ${palette.glowAlpha.toFixed(3)})`);
}

function clearPhase1ThemeOverrides() {
  document.body.style.removeProperty("--bg");
  document.body.style.removeProperty("--surface");
  document.body.style.removeProperty("--ink");
  document.body.style.removeProperty("--accent");
  document.body.style.removeProperty("--border");
  document.body.style.removeProperty("--sky1");
  document.body.style.removeProperty("--sky2");
  document.body.style.removeProperty("--glow");
}

function initBloodStains() {
  if (!bloodStainLayer) return;
  bloodStainLayer.innerHTML = "";
  for (let i = 0; i < 16; i += 1) {
    const stain = document.createElement("div");
    stain.className = "blood-stain";
    stain.style.left = `${randomInt(-8, 84)}%`;
    stain.style.top = `${randomInt(-6, 86)}%`;
    stain.style.width = `${randomInt(110, 340)}px`;
    stain.style.height = `${randomInt(90, 290)}px`;
    stain.style.transform = `rotate(${randomInt(-36, 36)}deg)`;
    stain.style.opacity = (0.2 + Math.random() * 0.75).toFixed(3);
    bloodStainLayer.appendChild(stain);
  }
  refreshBloodStainVisuals();
}

function refreshBloodStainVisuals() {
  if (!bloodStainLayer) return;
  const intensity = clamp(state.bloodStainLevel / 100, 0, 1);
  bloodStainLayer.style.opacity = (0.05 + intensity * 0.9).toFixed(3);
  const stains = bloodStainLayer.querySelectorAll(".blood-stain");
  stains.forEach((stain, index) => {
    const wave = ((index % 5) + 1) / 6;
    const local = clamp(intensity * (0.78 + wave * 0.5), 0, 1);
    stain.style.opacity = (0.08 + local * 0.88).toFixed(3);
    stain.style.filter = `blur(${(0.7 - local * 0.35).toFixed(2)}px) saturate(${(1 + local * 1.1).toFixed(2)})`;
  });
}

function increaseBloodStains(amount) {
  state.bloodStainLevel = clamp(state.bloodStainLevel + amount, 0, 100);
  refreshBloodStainVisuals();
}

function decayBloodStains(deltaMinutes = 0.6) {
  if (!state.persecutionCooling) return;
  if (state.bloodStainDecayBudget <= 0 || state.bloodStainLevel <= 0) return;
  const decayStep = 0.26 * (deltaMinutes / 0.6);
  const decayed = Math.min(decayStep, state.bloodStainDecayBudget);
  state.bloodStainDecayBudget = Math.max(0, state.bloodStainDecayBudget - decayed);
  state.bloodStainLevel = clamp(state.bloodStainLevel - decayed, 0, 100);
  if (state.bloodStainDecayBudget <= 0) state.persecutionCooling = false;
  refreshBloodStainVisuals();
}

function applyPersecutionDissipation(deltaMinutes = 0.6) {
  if (state.phase !== 1 || state.phase1Failed) return;
  if (state.persecutionLevel <= 0) return;

  if (state.currentAreaId === "igreja") {
    state.outsideChurchMinutes = 0;
    return;
  }

  state.outsideChurchMinutes += deltaMinutes;
  const cooldownStep = clamp(90 + state.faithTier * 10 + state.churchActionsToday * 4, 60, 180);

  while (state.outsideChurchMinutes >= cooldownStep && state.persecutionLevel > 0) {
    state.outsideChurchMinutes -= cooldownStep;
    setPersecutionLevel(state.persecutionLevel - 1);
    addLog("Longe da igreja, a sensação de perseguição perde força por um tempo.");
  }
}

function trackHospitalNeglect(deltaMinutes = 0.6) {
  if (state.phase !== 1 || state.phase1Failed) return;
  if (state.awaitingRestChoice) return;

  if (state.currentAreaId === "hospital") {
    state.hospitalNeglectMinutes = 0;
    state.hospitalNeglectAlerts = 0;
    return;
  }

  state.hospitalNeglectMinutes += deltaMinutes;
  const nextAlertAt = (state.hospitalNeglectAlerts + 1) * 360;
  if (state.hospitalNeglectMinutes < nextAlertAt) return;

  const alerts = [
    "Lembre-se do seu propósito, doutor: médicos existem para equilibrar a morte.",
    "As alas esfriam sem sua presença. O hospital ainda espera por você.",
    "Cada hora longe dos leitos pesa sobre a cidade. Volte ao hospital."
  ];
  const line = alerts[Math.min(state.hospitalNeglectAlerts, alerts.length - 1)];
  showHospitalReminderPopup(line);
  state.hospitalNeglectAlerts += 1;
}

function openPopupElement(el) {
  if (!(el instanceof HTMLElement)) return;
  if (el.parentElement !== document.body) {
    document.body.appendChild(el);
  } else {
    document.body.appendChild(el);
  }
  const shouldUseGrid = el.classList.contains("inventory-popup") || el.classList.contains("hud-section-popup");
  el.style.display = shouldUseGrid ? "grid" : "block";
  el.style.zIndex = el.classList.contains("inventory-popup") || el.classList.contains("hud-section-popup")
    ? "10040"
    : "10020";
  el.classList.remove("hidden");
  el.classList.add("popup-open");
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");
}

function closePopupElement(el) {
  if (!(el instanceof HTMLElement)) return;
  el.classList.remove("show");
  el.classList.remove("popup-open");
  el.classList.add("hidden");
  el.style.display = "none";
}

function enforcePopupVisible(el) {
  if (!(el instanceof HTMLElement)) return;
  const useGrid = el.classList.contains("inventory-popup") || el.classList.contains("hud-section-popup");
  el.classList.remove("hidden");
  el.classList.add("popup-open", "show");
  el.style.setProperty("display", useGrid ? "grid" : "block", "important");
  el.style.setProperty("opacity", "1", "important");
  el.style.setProperty("visibility", "visible", "important");
  el.style.setProperty("pointer-events", "auto", "important");
  el.style.setProperty("transform", "translate(-50%, -50%) scale(1)", "important");
}

function lockPopupVisibility(el) {
  if (!(el instanceof HTMLElement)) return;
  enforcePopupVisible(el);
  const prev = popupForceObserverMap.get(el);
  if (prev) prev.disconnect();
  const observer = new MutationObserver(() => {
    if (el.dataset.forceOpen === "1") enforcePopupVisible(el);
  });
  observer.observe(el, { attributes: true, attributeFilter: ["class", "style"] });
  popupForceObserverMap.set(el, observer);
  el.dataset.forceOpen = "1";
}

function unlockPopupVisibility(el) {
  if (!(el instanceof HTMLElement)) return;
  delete el.dataset.forceOpen;
  const observer = popupForceObserverMap.get(el);
  if (observer) observer.disconnect();
  popupForceObserverMap.delete(el);
  el.style.removeProperty("opacity");
  el.style.removeProperty("visibility");
  el.style.removeProperty("pointer-events");
  el.style.removeProperty("transform");
}

function showHospitalReminderPopup(message) {
  if (!hospitalReminderPopup || !hospitalReminderText) return;
  hospitalReminderText.textContent = message;
  openPopupElement(hospitalReminderPopup);
}

function closeHospitalReminderPopup() {
  closePopupElement(hospitalReminderPopup);
}

function showInviteNoticePopup() {
  openPopupElement(inviteNoticePopup);
}

function closeInviteNoticePopup() {
  closePopupElement(inviteNoticePopup);
}

function getCurrentHospitalName(cityId = state.currentCityId) {
  const city = getCityById(cityId);
  const hospitalArea = getAreaById(city, "hospital");
  return hospitalArea ? hospitalArea.name : "hospital";
}

function showCorpseDisposalPopup(cityId = state.currentCityId) {
  if (!corpseDisposalPopup || !corpseDisposalText || !corpseDisposalPayBtn || !corpseDisposalLaterBtn) return;
  const cityMini = getCityMiniState(cityId);
  const corpseCount = cityMini.hospital.corpseCount || 0;
  if (corpseCount < 5) return;
  const cost = getCorpseCartCost(cityId);
  const surcharge = getCorpseRiskSurchargeByCity(cityId);
  const hospitalName = getCurrentHospitalName(cityId);
  if (corpseCount >= 8) {
    corpseDisposalText.textContent = `O cheiro está tão forte que todos começam a passar mal no ${hospitalName}. Risco de contágio subiu para ${(surcharge * 100).toFixed(0)}% acima do normal desta cidade.`;
  } else {
    corpseDisposalText.textContent = `Um cheiro forte começa a tomar conta das alas do ${hospitalName}. Você deveria fazer algo sobre isso, doutor.`;
  }
  corpseDisposalPayBtn.textContent = `Pagar uma carroça para levar os corpos (${cost} moedas)`;
  corpseDisposalPayBtn.dataset.cityId = cityId;
  corpseDisposalLaterBtn.dataset.cityId = cityId;
  openPopupElement(corpseDisposalPopup);
}

function closeCorpseDisposalPopup() {
  closePopupElement(corpseDisposalPopup);
}

function closeTradePopup() {
  const shouldCompleteShopService = !!(activeTradeDeal && activeTradeDeal.serviceActive);
  const triageStageOpen = !!(activeTradeDeal && String(activeTradeDeal.stage || "").startsWith("triage-"));
  const stableStageOpen = !!(activeTradeDeal && String(activeTradeDeal.stage || "").startsWith("stable-"));
  activeTradeDeal = null;
  closePopupElement(tradePopup);
  if (!tradePopup) return;
  tradePopup.style.opacity = "";
  tradePopup.style.transform = "";
  tradePopup.style.zIndex = "";
  if (tradePopupList) tradePopupList.innerHTML = "";
  if (tradePopupActions) tradePopupActions.innerHTML = "";
  if (tradePopupMeta) tradePopupMeta.textContent = "";
  if (tradeOfferInputWrap) tradeOfferInputWrap.classList.add("hidden");
  if (tradeOfferInput) tradeOfferInput.value = "";
  if (shouldCompleteShopService && isShopMiniMapScenario()) {
    shopMiniCompleteDoctorService();
  }
  if (triageStageOpen) {
    clearTriageFocusToBase();
  }
  if (stableStageOpen && isStableMiniMapScenario()) {
    ensureStableMiniState();
    state.miniMapStable.mode = "idle";
    state.miniMapStable.modeTimer = 0;
  }
}

function openTradePopup() {
  openPopupElement(tradePopup);
  if (!tradePopup) return;
  tradePopup.style.display = "grid";
  tradePopup.style.opacity = "1";
  tradePopup.style.transform = "translate(-50%, -50%) scale(1)";
  tradePopup.style.zIndex = "140";
}

function showMiniMapAreaPopup(zoneId, zoneLabel) {
  if (!miniMapAreaPopup || !miniMapAreaTitle || !miniMapAreaText) return;
  miniMapAreaTitle.textContent = String(zoneLabel || zoneId || "Área").trim();
  miniMapAreaText.textContent = MINI_MAP_ZONE_DESCRIPTIONS[zoneId] || "Área do ambiente atual.";
  openPopupElement(miniMapAreaPopup);
}

function closeMiniMapAreaPopup() {
  closePopupElement(miniMapAreaPopup);
}

function showCityInfoPopup() {
  if (!cityInfoPopup || !cityInfoTitle || !cityInfoText) return;
  const city = getCurrentCity();
  const baseRiskPercent = Math.round((city.contagionRisk || 0) * 100);
  const currentRiskPercent = Math.round(getCurrentCityRisk() * 100);
  const paymentMultiplier = Number(city.paymentMultiplier || 1).toFixed(1);
  const travelDiscount = getTravelDiscountPercent(city.id);
  cityInfoTitle.textContent = `Informações de ${city.name}`;
  cityInfoText.innerHTML = `
    <p><strong>Perfil:</strong> ${city.profile}</p>
    <p><strong>Risco base de contágio:</strong> ${baseRiskPercent}% (${getRiskLabel(city.contagionRisk || 0)})</p>
    <p><strong>Risco atual na cidade:</strong> ${currentRiskPercent}%</p>
    <p><strong>Pagamento médico:</strong> x${paymentMultiplier}</p>
    <p><strong>Desconto local em viagens:</strong> ${travelDiscount}%</p>
  `;
  openPopupElement(cityInfoPopup);
}

function closeCityInfoPopup() {
  closePopupElement(cityInfoPopup);
}

function showInventoryPopup() {
  persistentUiPopups.inventoryExpandedOpen = true;
  if (inventoryExpandModal) inventoryExpandModal.classList.remove("hidden");
}

function closeInventoryPopup() {
  persistentUiPopups.inventoryExpandedOpen = false;
  if (inventoryExpandModal) inventoryExpandModal.classList.add("hidden");
}

function openInventoryExpanded(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  showInventoryPopup();
}

function showHudObjectivesExpandModal() {
  if (hudObjectivesExpandModal) hudObjectivesExpandModal.classList.remove("hidden");
}

function closeHudObjectivesExpandModal() {
  if (hudObjectivesExpandModal) hudObjectivesExpandModal.classList.add("hidden");
}

function showHudTraitsExpandModal() {
  if (hudTraitsExpandModal) hudTraitsExpandModal.classList.remove("hidden");
}

function closeHudTraitsExpandModal() {
  if (hudTraitsExpandModal) hudTraitsExpandModal.classList.add("hidden");
}

function toggleHudSection(sectionEl, sectionBodyEl, toggleBtn, openLabel, closeLabel) {
  if (!sectionBodyEl || !toggleBtn) return;
  const currentlyHidden = sectionBodyEl.classList.contains("hidden") || sectionBodyEl.style.display === "none";
  const opened = currentlyHidden;
  sectionBodyEl.classList.toggle("hidden", !opened);
  sectionBodyEl.style.display = opened ? "" : "none";
  if (sectionEl) sectionEl.classList.toggle("collapsed", !opened);
  toggleBtn.textContent = opened ? "X" : "^";
  toggleBtn.setAttribute("aria-label", opened ? closeLabel : openLabel);
  toggleBtn.setAttribute("aria-expanded", opened ? "true" : "false");
  queueCustomScrollbarRefresh();
}

function handleTraitsToggle(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const sectionEl = document.getElementById("hudTraitsSection");
  const bodyEl = document.getElementById("hudTraitsInfo");
  const btnEl = document.getElementById("hudTraitsToggleBtn");
  toggleHudSection(sectionEl, bodyEl, btnEl, "Abrir características", "Fechar características");
}

function handleObjectivesToggle(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const sectionEl = document.getElementById("hudObjectivesSection");
  const bodyEl = document.getElementById("hudObjectives");
  const btnEl = document.getElementById("hudObjectivesToggleBtn");
  toggleHudSection(sectionEl, bodyEl, btnEl, "Abrir objetivos", "Fechar objetivos");
}

window.toggleHudTraitsSection = handleTraitsToggle;
window.toggleHudObjectivesSection = handleObjectivesToggle;

function showHudSectionPopup(title, html) {
  if (!hudSectionPopup || !hudSectionPopupTitle || !hudSectionPopupContent) return;
  persistentUiPopups.hudSectionOpen = true;
  persistentUiPopups.hudSectionTitle = title || "Painel";
  persistentUiPopups.hudSectionHtml = html || "";
  hudSectionPopupTitle.textContent = title;
  hudSectionPopupContent.innerHTML = html;
  openPopupElement(hudSectionPopup);
  lockPopupVisibility(hudSectionPopup);
}

function closeHudSectionPopup() {
  unlockPopupVisibility(hudSectionPopup);
  persistentUiPopups.hudSectionOpen = false;
  closePopupElement(hudSectionPopup);
}

function syncPersistentUiPopups() {
  if (persistentUiPopups.inventoryExpandedOpen) {
    if (inventoryExpandModal) inventoryExpandModal.classList.remove("hidden");
  }
  if (persistentUiPopups.hudSectionOpen && hudSectionPopup && hudSectionPopupTitle && hudSectionPopupContent) {
    if (persistentUiPopups.hudSectionTitle) hudSectionPopupTitle.textContent = persistentUiPopups.hudSectionTitle;
    if (typeof persistentUiPopups.hudSectionHtml === "string") hudSectionPopupContent.innerHTML = persistentUiPopups.hudSectionHtml;
    openPopupElement(hudSectionPopup);
    lockPopupVisibility(hudSectionPopup);
  }
}

function openHudTraitsPopup(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  showHudTraitsExpandModal();
}

function openHudObjectivesPopup(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  showHudObjectivesExpandModal();
}

function isPopupActuallyVisible(el) {
  if (!(el instanceof HTMLElement)) return false;
  const cs = window.getComputedStyle(el);
  return cs.display !== "none"
    && cs.visibility !== "hidden"
    && Number(cs.opacity || "0") > 0.01
    && el.getClientRects().length > 0;
}

function closeEmergencyExpandPopup() {
  const el = document.getElementById("emergencyExpandPopup");
  if (el && el.parentElement) el.parentElement.removeChild(el);
}

function openEmergencyExpandPopup(title, html) {
  closeEmergencyExpandPopup();
  const wrapper = document.createElement("div");
  wrapper.id = "emergencyExpandPopup";
  wrapper.style.position = "fixed";
  wrapper.style.inset = "0";
  wrapper.style.zIndex = "20000";
  wrapper.style.display = "grid";
  wrapper.style.placeItems = "center";
  wrapper.style.background = "rgba(8,4,3,0.68)";
  const panel = document.createElement("section");
  panel.className = "hospital-reminder-popup popup-open";
  panel.style.position = "relative";
  panel.style.transform = "none";
  panel.style.left = "auto";
  panel.style.top = "auto";
  panel.style.width = "min(980px, calc(100vw - 2rem))";
  panel.style.maxHeight = "82vh";
  panel.style.overflow = "auto";
  panel.style.display = "grid";
  panel.style.gap = "0.45rem";
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "popup-close-btn";
  closeBtn.textContent = "×";
  closeBtn.style.zIndex = "3";
  closeBtn.addEventListener("click", closeEmergencyExpandPopup);
  const h = document.createElement("strong");
  h.textContent = title || "Painel";
  const body = document.createElement("div");
  body.className = "hud-section-popup-content";
  body.innerHTML = html || "<p>Sem conteúdo disponível.</p>";
  panel.appendChild(closeBtn);
  panel.appendChild(h);
  panel.appendChild(body);
  wrapper.appendChild(panel);
  wrapper.addEventListener("click", (ev) => {
    if (ev.target === wrapper) closeEmergencyExpandPopup();
  });
  document.body.appendChild(wrapper);
}

window.openHudTraitsPopup = openHudTraitsPopup;
window.openHudObjectivesPopup = openHudObjectivesPopup;
window.openInventoryExpanded = openInventoryExpanded;

function isPointInsideElement(el, x, y) {
  if (!(el instanceof HTMLElement)) return false;
  if (el.disabled) return false;
  const rect = el.getBoundingClientRect();
  if (!rect || rect.width <= 0 || rect.height <= 0) return false;
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

document.addEventListener("pointerdown", (event) => {
  const x = event.clientX;
  const y = event.clientY;
  if (isPointInsideElement(hudTraitsExpandBtn, x, y)) {
    openHudTraitsPopup(event);
    return;
  }
  if (isPointInsideElement(hudObjectivesExpandBtn, x, y)) {
    openHudObjectivesPopup(event);
    return;
  }
  if (isPointInsideElement(inventoryExpandBtn, x, y)) {
    openInventoryExpanded(event);
  }
}, true);

function getActiveMissions() {
  if (state.phase === 1) {
    const missions = [];
    missions.push("Manter o hospital funcionando sem colapso.");
    if (state.popularity < state.popularityPhase2Threshold) {
      missions.push(`Aumentar popularidade até ${state.popularityPhase2Threshold}+ para chamar atenção da alta sociedade.`);
    } else if (state.maskInvitations <= 0 && !state.maskTriggerResolved) {
      missions.push("Aguardar o convite do baile de máscaras chegar.");
    }
    if (state.maskInvitations > 0) {
      if (state.doctorInfected) {
        missions.push("Você está infectado: cure a peste antes de seguir para o baile.");
      } else {
        missions.push("Abrir o convite e seguir para o baile de máscaras.");
      }
    }
    if (state.currentAreaId !== "hospital") {
      missions.push("Retornar ao hospital para continuar os atendimentos.");
    }
    return missions;
  }
  if (state.phase === 2) {
    return [
      "Investigar os núcleos ocultos da peste e reunir provas.",
      "Equilibrar evidências e exposição para alcançar o cerne da conspiração."
    ];
  }
  if (state.phase === 3) {
    return [
      "Confrontar o núcleo da conspiração.",
      "Escolher entre destruir o sistema ou juntar-se a ele."
    ];
  }
  return ["Sobreviver e manter o propósito médico."];
}

function getHudTraitsCategorizedMarkup(categories) {
  const order = ["Fé", "Medicina", "Social", "Inteligência"];
  return order.map((category) => {
    const lines = Array.isArray(categories[category]) ? categories[category] : [];
    const items = lines.length
      ? lines.map((line) => `<div class="hud-item">${line}</div>`).join("")
      : '<div class="hud-item">Sem progresso nesta categoria.</div>';
    return `
      <section class="hud-category-block">
        <h3>${category}</h3>
        <div class="hud-category-items">
          ${items}
        </div>
      </section>
    `;
  }).join("");
}

function renderTradePopupActions(actionsList) {
  if (!tradePopupActions) return;
  tradePopupActions.innerHTML = "";
  actionsList.forEach((entry) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = entry.label;
    btn.disabled = !!entry.disabled;
    btn.addEventListener("click", entry.onClick);
    tradePopupActions.appendChild(btn);
  });
}

function applyActionMenuLayout(sectionOrder = [], sectionByActionId = () => "geral") {
  if (!actions) return;
  const buttons = Array.from(actions.querySelectorAll(":scope > button"));
  if (!buttons.length) return;

  const sectionMeta = new Map(
    sectionOrder.map((item) => [item.id, { id: item.id, label: item.label, buttons: [] }])
  );

  buttons.forEach((btn) => {
    const actionId = String(btn.dataset.actionId || "").trim();
    const sectionId = sectionByActionId(actionId, btn) || "geral";
    if (sectionId === "__hidden") return;
    if (!sectionMeta.has(sectionId)) {
      sectionMeta.set(sectionId, { id: sectionId, label: sectionId, buttons: [] });
    }
    sectionMeta.get(sectionId).buttons.push(btn);
  });

  const sections = Array.from(sectionMeta.values()).filter((section) => section.buttons.length > 0);
  if (!sections.length) return;

  const wrapper = document.createElement("div");
  wrapper.className = "actions-menu-layout";
  const nav = document.createElement("div");
  nav.className = "actions-menu-nav";
  const panel = document.createElement("div");
  panel.className = "actions-menu-panel";
  wrapper.append(nav, panel);

  actions.innerHTML = "";
  actions.appendChild(wrapper);

  const sectionPanels = new Map();
  sections.forEach((section) => {
    const navBtn = document.createElement("button");
    navBtn.type = "button";
    navBtn.textContent = section.label;
    navBtn.className = "action-section-tab";
    nav.appendChild(navBtn);

    const sectionPanel = document.createElement("div");
    sectionPanel.className = "action-section-content hidden";
    section.buttons.forEach((btn) => sectionPanel.appendChild(btn));
    panel.appendChild(sectionPanel);
    sectionPanels.set(section.id, { navBtn, sectionPanel });

    navBtn.addEventListener("click", () => {
      sectionPanels.forEach((entry) => {
        entry.navBtn.classList.remove("active");
        entry.sectionPanel.classList.add("hidden");
      });
      navBtn.classList.add("active");
      sectionPanel.classList.remove("hidden");
      state.actionMenuAreaId = state.currentAreaId;
      state.actionMenuSectionId = section.id;
    });
  });

  const preferred = sectionOrder.find((item) => sections.some((section) => section.id === item.id));
  const defaultSection = preferred ? sections.find((section) => section.id === preferred.id) : sections[0];
  const rememberedSectionId = state.actionMenuAreaId === state.currentAreaId ? state.actionMenuSectionId : "";
  const initialSectionId = rememberedSectionId && sectionPanels.has(rememberedSectionId)
    ? rememberedSectionId
    : (defaultSection ? defaultSection.id : "");
  if (initialSectionId && sectionPanels.has(initialSectionId)) {
    const entry = sectionPanels.get(initialSectionId);
    entry.navBtn.classList.add("active");
    entry.sectionPanel.classList.remove("hidden");
    state.actionMenuAreaId = state.currentAreaId;
    state.actionMenuSectionId = initialSectionId;
  }
}

function finalizePhase1ActionsLayout() {
  const areaNameById = {
    hospital: "Hospital",
    tenda: "Tenda de Atendimento",
    igreja: "Igreja",
    residencial: "Área Residencial",
    loja: "Loja",
    estabulo: "Estábulo"
  };
  const localLabel = areaNameById[state.currentAreaId] || "Local";
  const hospitalLocalLabel = "Consultório";

  const sectionOrder = [
    { id: state.currentAreaId === "hospital" ? "consultorio" : "local", label: state.currentAreaId === "hospital" ? hospitalLocalLabel : localLabel },
    { id: "tratamentos", label: "Tratamentos" },
    { id: "itens", label: "Itens" },
    { id: "ambulatorio", label: "Ambulatório" },
    { id: "descanso", label: "Descanso" },
    { id: "encontro", label: "Encontro" },
    { id: "convite", label: "Convite" },
    { id: "geral", label: "Geral" }
  ];

  const classify = (actionId) => {
    if (actionId.startsWith("rest-")) return "descanso";
    if (actionId.startsWith("merchant-")) return "encontro";
    if (actionId === "open-mask-invite") return "convite";
    if (actionId.startsWith("use-")) return "itens";

    if (state.currentAreaId === "hospital") {
      if (actionId.startsWith("tech-") || actionId === "pray-patient" || actionId === "release-patient" || actionId === "abandon-patient") return "tratamentos";
      if (actionId.startsWith("release-amb-")) return "ambulatorio";
      if (actionId === "summon-patient" || actionId === "accept-free-patient" || actionId === "refuse-poor-patient" || actionId === "finish-day") return "consultorio";
      return "geral";
    }

    if (state.currentAreaId === "loja") {
      if (actionId === "shop-open-buy" || actionId === "shop-open-sell") return "local";
      if (actionId === "finish-day") return "geral";
      return "geral";
    }

    if (state.currentAreaId === "igreja") {
      if (actionId.startsWith("church-")) return "local";
      if (actionId === "finish-day") return "geral";
      return "geral";
    }

    if (state.currentAreaId === "tenda") {
      if (actionId === "tent-triage") return "local";
      if (actionId === "finish-day") return "local";
      return "geral";
    }

    if (state.currentAreaId === "residencial") {
      if (actionId.startsWith("res-") || actionId === "finish-day") return "local";
      return "geral";
    }

    if (state.currentAreaId === "estabulo") {
      if (actionId === "stable-talk-handler" || actionId === "stable-travel-dest") return "local";
      if (actionId === "finish-day") return "geral";
      return "geral";
    }

    if (actionId === "finish-day") return "local";
    return "geral";
  };

  applyActionMenuLayout(sectionOrder, classify);
}

function finalizePhase2ActionsLayout() {
  applyActionMenuLayout(
    [
      { id: "investigacao", label: "Investigação" },
      { id: "geral", label: "Geral" }
    ],
    (actionId) => (actionId.startsWith("phase2-") ? "investigacao" : "geral")
  );
}

function finalizePhase3ActionsLayout() {
  applyActionMenuLayout(
    [
      { id: "decisao", label: "Decisão Final" },
      { id: "geral", label: "Geral" }
    ],
    () => "decisao"
  );
}

function showSellSelectionPopup() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (!isShopArea()) {
    addLog("Você precisa estar na loja para vender itens.");
    return;
  }

  const sellables = getSellableInventoryItems();
  if (!sellables.length) {
    addLog("Você não possui itens vendáveis no inventário.");
    return;
  }

  activeTradeDeal = {
    stage: "select",
    items: sellables,
    serviceActive: false
  };
  renderTradePopup();
}

function startTradeForItem(selected) {
  shopMiniStartDoctorService();
  const baseValue = selected.tradeValue;
  const moodBias = randomInt(-4, 3) / 100;
  const stubbornness = randomInt(0, 100) / 100;
  const fairMaxPct = clamp(1.03 + moodBias, 0.94, 1.1);
  const stretchMaxPct = clamp(fairMaxPct + 0.12, 1.06, 1.24);
  const initialOffer = Math.max(1, Math.round(baseValue * clamp(0.84 + moodBias + randomInt(-3, 5) / 100, 0.72, 0.95)));

  activeTradeDeal = {
    stage: "haggle",
    item: selected,
    baseValue,
    stubbornness,
    fairMaxPct,
    stretchMaxPct,
    round: 1,
    maxRounds: randomInt(2, 4),
    merchantOffer: initialOffer,
    moodBias,
    lastMerchantLine: "O lojista examina a peça e faz a primeira oferta.",
    serviceActive: true
  };
  renderTradePopup();
}

function finalizeTradeSale(item, salePrice, sourceLabel) {
  decrementInventoryItem(item.id, 1);
  state.coins += salePrice;
  playCoinSound();
  addLog(`${sourceLabel}: ${item.name} por ${salePrice} moedas.`);
  maybeApplyOverpricedSaleReputationImpact(salePrice, item.tradeValue, item.name);
  closeTradePopup();
  render();
}

function merchantCounterProposal(deal, playerCounter) {
  const cap = Math.max(
    deal.merchantOffer + 1,
    Math.round(deal.baseValue * clamp(deal.fairMaxPct + 0.04 + deal.moodBias, 0.98, 1.18))
  );
  const midpoint = Math.round((deal.merchantOffer + playerCounter) / 2);
  const softened = Math.round(midpoint - deal.baseValue * (0.03 + deal.stubbornness * 0.08));
  return clamp(Math.max(deal.merchantOffer + 1, softened), deal.merchantOffer + 1, cap);
}

function submitTradeCounterOffer() {
  const deal = activeTradeDeal;
  if (!deal || deal.stage !== "haggle" || !deal.item) return;
  const counterPrice = parseCoinInput(tradeOfferInput ? tradeOfferInput.value : "");
  if (!Number.isFinite(counterPrice) || counterPrice <= 0) {
    addLog("Negociação: contraproposta inválida.");
    return;
  }

  if (counterPrice <= deal.merchantOffer) {
    deal.lastMerchantLine = "O lojista ergue a sobrancelha: 'não precisa baixar tanto... fecho no valor que ofereci'.";
    finalizeTradeSale(deal.item, deal.merchantOffer, "Venda concluída");
    return;
  }

  const accepted = tryAcceptCounterOffer(counterPrice, {
    baseValue: deal.baseValue,
    initialOffer: deal.merchantOffer,
    fairMaxPct: deal.fairMaxPct,
    stretchMaxPct: deal.stretchMaxPct,
    stubbornness: deal.stubbornness
  });
  if (accepted) {
    finalizeTradeSale(deal.item, counterPrice, "Barganha aceita");
    return;
  }

  deal.round += 1;
  if (deal.round <= deal.maxRounds) {
    deal.merchantOffer = merchantCounterProposal(deal, counterPrice);
    const lines = [
      "O lojista balança a cabeça e empurra um novo valor no balcão.",
      "Ele suspira, calcula novamente e faz uma contraproposta.",
      "Após alguns segundos de silêncio, surge um novo preço."
    ];
    deal.lastMerchantLine = pickDialogue(lines);
    renderTradePopup();
    return;
  }

  const finalOffer = Math.max(
    deal.merchantOffer,
    Math.round(deal.merchantOffer + deal.baseValue * (0.03 + randomInt(0, 7) / 100))
  );
  deal.merchantOffer = finalOffer;
  deal.lastMerchantLine = "O lojista bate o martelo: 'última oferta. Depois disso, encerro negócio'.";
  deal.stage = "final";
  renderTradePopup();
}

function renderTradePopup() {
  if (!activeTradeDeal) {
    closeTradePopup();
    return;
  }
  openTradePopup();
  if (!tradePopupTitle || !tradePopupText || !tradePopupMeta || !tradePopupList || !tradeOfferInputWrap || !tradeOfferInput) return;

  const deal = activeTradeDeal;
  tradePopupList.innerHTML = "";
  tradeOfferInputWrap.classList.add("hidden");
  tradeOfferInput.value = "";

  if (deal.stage === "tent-items") {
    tradePopupTitle.textContent = "Tenda - Usar Itens";
    tradePopupText.textContent = "Selecione um item para uso imediato na tenda.";
    tradePopupMeta.textContent = "Inclui autocuidado e autotratamento.";
    const entries = [
      {
        label: `Usar tônico (+vida) [${state.tonics}]`,
        disabled: state.tonics <= 0 || state.playerLife >= state.playerMaxLife,
        action: () => { useTonic(); openTentItemsPopup(); }
      },
      {
        label: `Autotratamento da peste`,
        disabled: !state.doctorInfected,
        action: () => { selfTreatPlague(); openTentItemsPopup(); }
      },
      {
        label: `Usar Poção Antipeste [${state.antiPlaguePotions}]`,
        disabled: !state.doctorInfected || state.antiPlaguePotions <= 0,
        action: () => { useAntiPlaguePotion(); openTentItemsPopup(); }
      },
      {
        label: `Usar Kit de Bandagens Raras [${state.rareBandageKits}]`,
        disabled: state.rareBandageKits <= 0,
        action: () => { useRareBandageKit(); openTentItemsPopup(); }
      },
      {
        label: `Usar Medalhão Consagrado [${state.sacredMedallions}]`,
        disabled: state.sacredMedallions <= 0,
        action: () => { useSacredMedallion(); openTentItemsPopup(); }
      },
      {
        label: `Usar Soro Alquímico [${state.alchemicalSerums}]`,
        disabled: state.alchemicalSerums <= 0,
        action: () => { useAlchemicalSerum(); openTentItemsPopup(); }
      }
    ];
    entries.forEach((entry) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = entry.label;
      btn.disabled = !!entry.disabled || state.phase1Failed;
      btn.addEventListener("click", entry.action);
      tradePopupList.appendChild(btn);
    });
    renderTradePopupActions([
      { label: "Voltar", onClick: closeTradePopup }
    ]);
    return;
  }

  if (deal.stage === "triage-roster") {
    ensureTriageState();
    if (!Array.isArray(state.triageRosterIds)) state.triageRosterIds = [];
    tradePopupTitle.textContent = "Tenda - Triagem";
    tradePopupText.textContent = "Personagens da triagem se revezam neste turno. Selecione alguém para observar.";
    const rosterChars = state.triageRosterIds
      .map((characterId) => getTriageCharacterById(characterId))
      .filter(Boolean);
    const patientsCount = rosterChars.filter((entry) => entry.role === "paciente").length;
    const nursesCount = rosterChars.filter((entry) => entry.role === "enfermeira").length;
    tradePopupMeta.textContent = `Presentes na triagem: ${state.triageRosterIds.length} | Pacientes: ${patientsCount} | Enfermeiras: ${nursesCount}`;
    if (!state.triageRosterIds.length) {
      const note = document.createElement("p");
      note.className = "trade-empty-note";
      note.textContent = "Nenhum personagem carregado nesta triagem. Use 'Atualizar triagem' para trazer novos personagens.";
      tradePopupList.appendChild(note);
    }
    state.triageRosterIds.forEach((characterId) => {
      const character = getTriageCharacterById(characterId);
      if (!character) return;
      const outcome = getTriageCharacterOutcome(character.id);
      const row = document.createElement("article");
      row.className = "trade-item-row";
      const nurseStatus = character.role === "enfermeira" ? getTriageNurseStatus(character.id) : "";
      const profileText = character.role === "enfermeira"
        ? (nurseStatus === "escort" ? "Enfermeira (em acompanhamento para o hospital)" : "Enfermeira em serviço")
        : (outcome === "active" ? "Paciente em deslocamento para o hospital" : "Paciente aguardando decisão clínica");
      row.innerHTML = `
        <p><strong>${character.name}</strong></p>
        <p>Perfil: ${profileText}</p>
        <p>Traço: ${character.personality}</p>
      `;
      const seeBtn = document.createElement("button");
      seeBtn.type = "button";
      seeBtn.textContent = "Observar";
      seeBtn.disabled = (character.role === "paciente" && outcome === "active")
        || (character.role === "enfermeira" && nurseStatus === "escort");
      seeBtn.addEventListener("click", () => selectTriageCharacter(character.id));
      row.appendChild(seeBtn);
      tradePopupList.appendChild(row);
    });
    renderTradePopupActions([
      { label: "Atualizar triagem", onClick: () => { refreshTriageRoster(true); triggerMiniMapReaction("tent-triage-refresh"); renderTradePopup(); } },
      { label: "Fechar", onClick: () => { clearTriageFocusToBase(); closeTradePopup(); } }
    ]);
    return;
  }

  if (deal.stage === "stable-travel") {
    tradePopupTitle.textContent = "Estábulo - Destino de Viagem";
    tradePopupText.textContent = "O carroceiro aguarda sua decisão. Escolha a cidade de destino.";
    const travelCost = getTravelCost();
    tradePopupMeta.textContent = state.doctorInfected
      ? `Custo atual: ${travelCost} moedas (risco de contágio elevado).`
      : `Custo atual: ${travelCost} moedas.`;
    WORLD_MAP.filter((city) => city.id !== state.currentCityId).forEach((city) => {
      const row = document.createElement("article");
      row.className = "trade-item-row";
      row.innerHTML = `
        <p><strong>${city.name}</strong></p>
        <p>${city.profile}</p>
      `;
      const goBtn = document.createElement("button");
      goBtn.type = "button";
      goBtn.textContent = `Viajar para ${city.name} (${travelCost} moedas)`;
      goBtn.disabled = state.coins < travelCost;
      goBtn.addEventListener("click", () => {
        closeTradePopup();
        travelToCity(city.id);
      });
      row.appendChild(goBtn);
      tradePopupList.appendChild(row);
    });
    renderTradePopupActions([
      { label: "Fechar", onClick: closeTradePopup }
    ]);
    return;
  }

  if (deal.stage === "stable-handler-dialog") {
    const stable = getCityStableState(state.currentCityId);
    if (stable.pendingReplacement) {
      tradePopupTitle.textContent = "Estábulo - Tratador";
      tradePopupText.textContent = "O estábulo aguarda a chegada de um novo tratador para substituir o anterior.";
      tradePopupMeta.textContent = "";
      renderTradePopupActions([{ label: "Fechar", onClick: closeTradePopup }]);
      return;
    }
    const handler = stable.handler;
    if (!handler || !handler.alive) {
      tradePopupTitle.textContent = "Estábulo - Tratador";
      tradePopupText.textContent = "Não há tratador disponível no momento.";
      tradePopupMeta.textContent = "";
      renderTradePopupActions([{ label: "Fechar", onClick: closeTradePopup }]);
      return;
    }

    tradePopupTitle.textContent = `Tratador: ${handler.name}`;
    if (handler.replacementIntroPending) {
      tradePopupText.textContent = pickStableDialogueLine(state.currentCityId, "replacement", handler.name);
      handler.replacementIntroPending = false;
      addLog(`${handler.name}: "Estou aqui há pouco tempo. Substituí ${stable.previousHandlerName || "o antigo tratador"}, morto pela peste."`, { type: "dialogue" });
    } else {
      tradePopupText.textContent = handler.infected
        ? pickStableDialogueLine(state.currentCityId, "sick", handler.name)
        : pickStableDialogueLine(state.currentCityId, "healthy", handler.name);
    }
    const discount = getTravelDiscountPercent(state.currentCityId);
    tradePopupMeta.textContent = handler.infected
      ? `Status: com peste (${Math.round(handler.infectionSeverity)}/100). História: ${handler.story}`
      : `Status: saudável.${discount > 0 ? ` Desconto atual nas viagens: ${discount}%.` : ""} História: ${handler.story}`;

    const actionsList = [];
    if (handler.infected) {
      actionsList.push({
        label: `Tratar com ervas raras [${state.treatmentBoostCharges}]`,
        disabled: state.treatmentBoostCharges <= 0,
        onClick: stableTreatHandlerWithHerbs
      });
      actionsList.push({
        label: `Tratar com poção antipeste [${state.antiPlaguePotions}]`,
        disabled: state.antiPlaguePotions <= 0,
        onClick: stableTreatHandlerWithPotion
      });
    }
    actionsList.push({ label: "Fechar", onClick: closeTradePopup });
    renderTradePopupActions(actionsList);
    return;
  }

  if (deal.stage === "triage-detail") {
    const character = getTriageCharacterById(state.triageActiveCharacterId);
    if (!character) {
      activeTradeDeal = { stage: "triage-roster", serviceActive: false };
      renderTradePopup();
      return;
    }
    tradePopupTitle.textContent = `Triagem - ${character.name}`;
    tradePopupText.textContent = `Descrição observável: ${character.observable}.`;
    tradePopupMeta.textContent = character.objective
      ? `Objetivo percebido: ${character.objective}`
      : `Personalidade: ${character.personality}.`;
    renderTradePopupActions([
      { label: `Se aproximar de ${character.name}`, onClick: approachTriageCharacter },
      { label: "Voltar à triagem", onClick: () => { clearTriageFocusToBase(); activeTradeDeal = { stage: "triage-roster", serviceActive: false }; renderTradePopup(); } },
      { label: "Fechar", onClick: () => { clearTriageFocusToBase(); closeTradePopup(); } }
    ]);
    return;
  }

  if (deal.stage === "triage-dialogue") {
    const character = getTriageCharacterById(state.triageActiveCharacterId);
    if (!character) {
      activeTradeDeal = { stage: "triage-roster", serviceActive: false };
      renderTradePopup();
      return;
    }
    const step = Math.min(state.triageDialogueStep, character.dialogue.length - 1);
    tradePopupTitle.textContent = `Conversa - ${character.name}`;
    tradePopupText.textContent = character.dialogue[step];
    tradePopupMeta.textContent = "";
    if (state.triageDialogueStep < character.dialogue.length - 1) {
      const responseOptions = getTriageResponseOptions(character, step);
      renderTradePopupActions([
        { label: responseOptions[0].label, onClick: () => progressTriageDialogue(responseOptions[0].tone) },
        { label: responseOptions[1].label, onClick: () => progressTriageDialogue(responseOptions[1].tone) },
        { label: responseOptions[2].label, onClick: () => progressTriageDialogue(responseOptions[2].tone) }
      ]);
      return;
    }

    const finalActions = [];
    if (character.role === "paciente") {
      finalActions.push({ label: `Encaminhar ${character.name} para o hospital`, onClick: () => referTriageCharacterToHospital(false) });
      finalActions.push({
        label: "Registrar conversa e retornar",
        onClick: () => {
          handleTriageGiftOrOffer();
          clearTriageFocusToBase();
          activeTradeDeal = { stage: "triage-roster", serviceActive: false };
          renderTradePopup();
        }
      });
      if (character.bribeAttempt) {
        finalActions.push({ label: "Aceitar suborno para furar fila", onClick: () => handleTriageBribeDecision(true) });
        finalActions.push({ label: "Recusar suborno", onClick: () => { handleTriageBribeDecision(false); renderTradePopup(); } });
      }
    } else {
      finalActions.push({
        label: "Agradecer e retornar à triagem",
        onClick: () => {
          clearTriageFocusToBase();
          activeTradeDeal = { stage: "triage-roster", serviceActive: false };
          renderTradePopup();
        }
      });
    }
    finalActions.push({ label: "Fechar", onClick: () => { clearTriageFocusToBase(); closeTradePopup(); } });
    renderTradePopupActions(finalActions);
    return;
  }

  if (deal.stage === "buy-select") {
    tradePopupTitle.textContent = "Loja - Comprar Itens";
    tradePopupText.textContent = "Escolha um item para comprar.";
    tradePopupMeta.textContent = state.shopDiscountPercent > 0
      ? `Desconto ativo: ${state.shopDiscountPercent}%`
      : "Sem desconto ativo no momento.";
    deal.items.forEach((item) => {
      const row = document.createElement("article");
      row.className = "trade-item-row";
      row.innerHTML = `
        <p><strong>${item.name}</strong></p>
        <p>Preço: ${item.finalPrice} moedas${state.shopDiscountPercent > 0 ? ` (antes ${item.price})` : ""}</p>
        <p>Utilidade: ${item.utility}</p>
        <p>${item.description}</p>
      `;
      const buyBtn = document.createElement("button");
      buyBtn.type = "button";
      buyBtn.textContent = "Comprar";
      buyBtn.disabled = state.phase1Failed || state.coins < item.finalPrice;
      buyBtn.addEventListener("click", () => requestShopBuyConfirmation(item.id));
      row.appendChild(buyBtn);
      tradePopupList.appendChild(row);
    });
    renderTradePopupActions([
      { label: "Fechar", onClick: closeTradePopup }
    ]);
    return;
  }

  if (deal.stage === "buy-confirm") {
    const item = deal.item;
    if (!item) {
      deal.stage = "buy-select";
      renderTradePopup();
      return;
    }
    tradePopupTitle.textContent = "Confirmar Compra";
    tradePopupText.textContent = `Confirmar compra de ${item.name}?`;
    tradePopupMeta.textContent = `Valor: ${deal.finalPrice} moedas`;
    renderTradePopupActions([
      { label: "Sim", onClick: () => resolveShopBuyConfirmation(true) },
      { label: "Não", onClick: () => resolveShopBuyConfirmation(false) },
      { label: "Fechar", onClick: closeTradePopup }
    ]);
    return;
  }

  if (deal.stage === "select") {
    tradePopupTitle.textContent = "Negociação com o Lojista";
    tradePopupText.textContent = "Selecione um item da lista para iniciar a venda. O lojista quase sempre começa abaixo do valor.";
    tradePopupMeta.textContent = "Dica: propostas muito acima do valor podem gerar má reputação.";
    deal.items.forEach((item) => {
      const row = document.createElement("article");
      row.className = "trade-item-row";
      row.innerHTML = `
        <p><strong>${item.name}</strong></p>
        <p>Quantidade: ${item.quantity} ${getQuantityLabel(item.id)}</p>
        <p>Valor de referência: ${item.tradeValue} moedas</p>
        <p>Utilidade: ${item.utility}</p>
      `;
      const selectBtn = document.createElement("button");
      selectBtn.type = "button";
      selectBtn.textContent = "Vender";
      selectBtn.addEventListener("click", () => startTradeForItem(item));
      row.appendChild(selectBtn);
      tradePopupList.appendChild(row);
    });
    renderTradePopupActions([
      { label: "Fechar", onClick: closeTradePopup }
    ]);
    return;
  }

  const item = deal.item;
  tradePopupTitle.textContent = `Negociando: ${item.name}`;
  tradePopupText.textContent = deal.lastMerchantLine || "O lojista aguarda sua decisão.";
  tradePopupMeta.textContent = `Oferta atual: ${deal.merchantOffer} moedas | Referência: ${deal.baseValue}`;
  tradeOfferInputWrap.classList.remove("hidden");
  tradeOfferInput.value = String(deal.merchantOffer);

  if (deal.stage === "final") {
    renderTradePopupActions([
      { label: `Aceitar ${deal.merchantOffer} moedas`, onClick: () => finalizeTradeSale(item, deal.merchantOffer, "Venda concluída") },
      { label: "Encerrar negociação", onClick: () => { addLog(`Negociação encerrada sem venda de ${item.name}.`); closeTradePopup(); render(); } }
    ]);
    return;
  }

  renderTradePopupActions([
    { label: `Aceitar ${deal.merchantOffer} moedas`, onClick: () => finalizeTradeSale(item, deal.merchantOffer, "Venda concluída") },
    { label: "Enviar contraproposta", onClick: submitTradeCounterOffer },
    { label: "Desistir da venda", onClick: () => { addLog(`Negociação encerrada sem venda de ${item.name}.`); closeTradePopup(); render(); } }
  ]);
}

function clearHospitalCorpsesForCity(cityId = state.currentCityId) {
  const cityMini = getCityMiniState(cityId);
  cityMini.hospital.corpseCount = 0;
  if (isHospitalMiniMapScenario() && cityId === state.currentCityId) {
    state.miniMapEntities = state.miniMapEntities.filter((entity) => {
      const tag = String(entity.tag || "");
      return !tag.startsWith("corpse-") && tag !== "corpse-transit";
    });
  }
}

function startCorpseCartCleanup(cityId = state.currentCityId) {
  const cityMini = getCityMiniState(cityId);
  if (cityMini.hospital.corpseCount <= 0) return;
  if (!(isHospitalMiniMapScenario() && cityId === state.currentCityId)) {
    clearHospitalCorpsesForCity(cityId);
    addLog("A carroça removeu os corpos da área de descarte.");
    render();
    return;
  }
  ensureMiniMapScene();
  ensureHospitalMiniState();
  state.miniMapHospital.cartCleanupActive = true;
  state.miniMapHospital.activeMode = "cart-cleanup-enter";
  state.miniMapHospital.modeTimer = 0;
  const cart = createMiniMapEntity("generic", 103, HOSPITAL_MINI_ZONES.discard.y, {
    tag: "corpse-cart",
    variant: "cart",
    scripted: true,
    vx: 0,
    vy: 0
  });
  state.miniMapEntities = state.miniMapEntities.filter((entity) => String(entity.tag || "") !== "corpse-cart");
  state.miniMapEntities.push(cart);
}

function handleCorpseDisposalPayment(cityId = state.currentCityId) {
  const cost = getCorpseCartCost(cityId);
  if (state.coins < cost) {
    addLog(`Moedas insuficientes para pagar a carroça (${cost}).`);
    return;
  }
  state.coins -= cost;
  addLog(`Você pagou ${cost} moedas para remover os corpos do descarte.`);
  closeCorpseDisposalPopup();
  startCorpseCartCleanup(cityId);
  render();
}

function showAmbulatoryReportPopupForCity(cityId = state.currentCityId) {
  const city = getCityById(cityId);
  const cityHosp = getCityHospitalState(cityId);
  if (!cityHosp.reportPending) return;
  if (!ambulatoryReportPopup || !ambulatoryReportText) return;
  const tableRows = cityHosp.ambulatory.length
    ? cityHosp.ambulatory.map((p) => {
      const stageId = getPatientStageIdByHp(p.hp);
      const stageLabel = getStageLabelById(stageId);
      const status = canAmbulatoryRelease(p) ? "Em remissão (liberação disponível)" : stageLabel;
      const evolucao = `${getStageLabelById(p.lastDailyStageFrom || stageId)} -> ${getStageLabelById(p.lastDailyStageTo || stageId)} (${p.lastDailyDelta >= 0 ? "+" : ""}${Math.round(p.lastDailyDelta || 0)} vida)`;
      const obs = p.lastDailyNote || "Sem observações.";
      const daysInAmb = Math.max(0, state.day - p.admittedDay);
      const careReady = daysInAmb >= 3;
      const careAction = p.enhancedCare
        ? `<span class="amb-care-status">Cuidados reforçados ativos (-${AMBULATORY_ENHANCED_CARE_DAILY_COST}/dia)</span>`
        : careReady
          ? `<button type="button" class="amb-care-btn" data-amb-care-id="${p.ambId}" data-city-id="${cityId}">aumentar cuidados com o paciente (-${AMBULATORY_ENHANCED_CARE_DAILY_COST} moedas/dia)</button>`
          : `<span class="amb-care-wait">Disponível em ${Math.max(0, 3 - daysInAmb)} dia(s)</span>`;
      return `
        <tr>
          <td>${p.name}</td>
          <td>${evolucao}</td>
          <td>${status}</td>
          <td>${obs}</td>
          <td>${careAction}</td>
        </tr>
      `;
    }).join("")
    : `
      <tr>
        <td colspan="5">Sem pacientes internados no ambulatório desta cidade.</td>
      </tr>
    `;
  const events = cityHosp.reportEvents.length ? cityHosp.reportEvents.slice(-6) : ["Sem ocorrências no período."];
  ambulatoryReportText.innerHTML = `
    <div class="amb-report-head">
      <strong>#Dia ${state.day}</strong>
      <span>${city.name}</span>
    </div>
    <table class="amb-report-table">
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Evolução clínica</th>
          <th>Status</th>
          <th>Observação</th>
          <th>Cuidados</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    <div class="amb-report-events">
      <strong>Ocorrências recentes</strong>
      <ul>
        ${events.map((line) => `<li>${line}</li>`).join("")}
      </ul>
    </div>
  `;
  openPopupElement(ambulatoryReportPopup);
  ambulatoryReportText.querySelectorAll(".amb-care-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const ambId = Number(button.getAttribute("data-amb-care-id"));
      const targetCityId = button.getAttribute("data-city-id") || state.currentCityId;
      if (!Number.isFinite(ambId) || ambId <= 0) return;
      activateAmbulatoryEnhancedCare(targetCityId, ambId);
      getCityHospitalState(targetCityId).reportPending = true;
      showAmbulatoryReportPopupForCity(targetCityId);
      render();
    });
  });
  cityHosp.reportPending = false;
}

function closeAmbulatoryReportPopup() {
  closePopupElement(ambulatoryReportPopup);
}

function getUnsleptMinutes() {
  return Math.max(0, state.dayClockMinutes - 8 * 60);
}

function resetSleepDeprivationCycle() {
  state.blackoutCount = 0;
  state.nextBlackoutUnsleptMinutes = 30 * 60;
  state.nextExhaustionAlertUnsleptMinutes = 24 * 60;
  state.exhaustionAlertLevel = 0;
  state.blackoutActive = false;
  state.collapsePending = false;
  if (blackoutTimerId !== null) {
    window.clearTimeout(blackoutTimerId);
    blackoutTimerId = null;
  }
  state.actionMixCounters = {};
  if (blackoutOverlay) {
    blackoutOverlay.classList.remove("show");
    blackoutOverlay.classList.add("hidden");
  }
}

function emitExhaustionAlert() {
  const lines = [
    "Seu corpo pede descanso, doutor. Exaustão prolongada compromete decisões clínicas.",
    "A fadiga já afeta sua percepção. Interrompa o plantão e descanse imediatamente.",
    "Você está se tornando um risco para si e para os pacientes. Pare agora e durma.",
    "A exaustão está vencendo. Cada minuto acordado empurra você para o colapso.",
    "Último aviso: descanse. A próxima hora pode custar sua consciência."
  ];
  const idx = Math.min(state.exhaustionAlertLevel, lines.length - 1);
  showHospitalReminderPopup(lines[idx]);
  state.exhaustionAlertLevel += 1;
  state.nextExhaustionAlertUnsleptMinutes += 60;
}

function getBlackoutDurationMs() {
  return 5000 + Math.max(0, state.blackoutCount - 1) * 1800;
}

function closeCollapsePopup() {
  if (!collapsePopup) return;
  collapsePopup.classList.add("hidden");
}

function hideFinalDeathOverlay() {
  if (!finalDeathOverlay) return;
  if (finalDeathTimerId !== null) {
    window.clearTimeout(finalDeathTimerId);
    finalDeathTimerId = null;
  }
  finalDeathOverlay.classList.remove("show");
  finalDeathOverlay.classList.add("hidden");
  finalDeathOverlay.setAttribute("aria-hidden", "true");
}

function showFinalDeathOverlay() {
  if (!finalDeathOverlay) {
    window.location.reload();
    return;
  }
  if (finalDeathTimerId !== null) {
    window.clearTimeout(finalDeathTimerId);
    finalDeathTimerId = null;
  }
  finalDeathOverlay.classList.remove("hidden", "show");
  finalDeathOverlay.setAttribute("aria-hidden", "false");
  void finalDeathOverlay.offsetWidth;
  finalDeathOverlay.classList.add("show");
}

function applyCollapseConsequences() {
  restoreDayItemsFromSnapshot();
  const stolenCoins = state.coins;
  state.coins = 0;
  state.currentPatient = null;
  state.awaitingRestChoice = false;
  state.day += 1;
  state.dayClockMinutes = 8 * 60;
  state.churchActionsToday = 0;
  state.dayAttendances = 0;
  tickRelapses();
  resetSleepDeprivationCycle();
  snapshotDayItems();
  addLog(`${getDoctorDisplayName()} foi saqueado enquanto estava apagado. (-${stolenCoins} moedas)`, { type: "event" });
  addLog("Você desperta no amanhecer seguinte, sem recuperar vida.", { type: "event" });
  showDayStartOverlay(state.day);
  closeCollapsePopup();
  render();
}

function triggerCollapseUntilDawn() {
  state.collapsePending = true;
  state.blackoutActive = true;
  const durationMs = getBlackoutDurationMs();
  if (blackoutOverlay) {
    blackoutOverlay.classList.remove("hidden", "show");
    void blackoutOverlay.offsetWidth;
    blackoutOverlay.style.animationDuration = `${(durationMs / 1000).toFixed(2)}s`;
    blackoutOverlay.classList.add("show");
  }
  const area = getAreaById(getCurrentCity(), state.currentAreaId);
  const where = area ? area.name : "local desconhecido";
  const message = `${getDoctorDisplayName()} caiu no chão do ${where} e lá ficou até o amanhecer.`;
  blackoutTimerId = window.setTimeout(() => {
    if (blackoutOverlay) {
      blackoutOverlay.classList.remove("show");
      blackoutOverlay.classList.add("hidden");
    }
    state.blackoutActive = false;
    blackoutTimerId = null;
    if (collapseText) collapseText.textContent = message;
    if (collapsePopup) collapsePopup.classList.remove("hidden");
  }, durationMs);
}

function triggerExhaustionBlackout() {
  if (state.blackoutActive || state.collapsePending || state.phase !== 1 || state.phase1Failed) return;
  state.blackoutCount += 1;
  state.blackoutActive = true;
  state.nextBlackoutUnsleptMinutes += 60;

  if (state.blackoutCount >= 5) {
    triggerCollapseUntilDawn();
    return;
  }

  const durationMs = getBlackoutDurationMs();
  if (blackoutOverlay) {
    blackoutOverlay.classList.remove("hidden", "show");
    void blackoutOverlay.offsetWidth;
    blackoutOverlay.style.animationDuration = `${(durationMs / 1000).toFixed(2)}s`;
    blackoutOverlay.classList.add("show");
  }
  blackoutTimerId = window.setTimeout(() => {
    if (blackoutOverlay) {
      blackoutOverlay.classList.remove("show");
      blackoutOverlay.classList.add("hidden");
    }
    state.blackoutActive = false;
    blackoutTimerId = null;
    showHospitalReminderPopup("Esses apagões podem acarretar riscos a saúde dr. Lembre-se que seu objetivo é equilibrar um mundo e não dar as mãos com a morte.");
  }, durationMs);
}

function updateSleepDeprivationEffects() {
  if (state.phase !== 1 || state.phase1Failed) return;
  if (state.awaitingRestChoice || state.maskEventActive || state.maskFastForwardActive || state.phase2DreamActive) return;
  const unslept = getUnsleptMinutes();
  if (unslept >= state.nextExhaustionAlertUnsleptMinutes && unslept < 30 * 60) {
    emitExhaustionAlert();
  }
  if (unslept < 30 * 60) return;
  if (unslept >= state.nextBlackoutUnsleptMinutes) {
    triggerExhaustionBlackout();
  }
}

function showDeathPursuitOverlay() {
  if (!deathPursuitOverlay) return;
  deathPursuitOverlay.classList.remove("hidden", "show");
  void deathPursuitOverlay.offsetWidth;
  deathPursuitOverlay.classList.add("show");
  if (deathPursuitTimerId !== null) {
    window.clearTimeout(deathPursuitTimerId);
  }
  deathPursuitTimerId = window.setTimeout(() => {
    deathPursuitOverlay.classList.remove("show");
    deathPursuitOverlay.classList.add("hidden");
    deathPursuitTimerId = null;
  }, 2950);
}

function showInfectionOverlay() {
  if (!infectionOverlay) return;
  infectionOverlay.classList.remove("hidden", "show");
  void infectionOverlay.offsetWidth;
  infectionOverlay.classList.add("show");
  if (infectionOverlayTimerId !== null) {
    window.clearTimeout(infectionOverlayTimerId);
  }
  infectionOverlayTimerId = window.setTimeout(() => {
    infectionOverlay.classList.remove("show");
    infectionOverlay.classList.add("hidden");
    infectionOverlayTimerId = null;
  }, 2550);
}

function showDayStartOverlay(dayNumber = state.day) {
  if (!dayStartOverlay || !dayStartText) return;
  if (dayStartOverlayTimerId !== null) {
    window.clearTimeout(dayStartOverlayTimerId);
    dayStartOverlayTimerId = null;
  }
  dayStartText.textContent = `Dia ${Math.max(1, Math.floor(dayNumber))}`;
  dayStartOverlay.classList.remove("hidden", "show");
  dayStartOverlay.setAttribute("aria-hidden", "false");
  void dayStartOverlay.offsetWidth;
  dayStartOverlay.classList.add("show");
  dayStartOverlayTimerId = window.setTimeout(() => {
    dayStartOverlay.classList.remove("show");
    dayStartOverlay.classList.add("hidden");
    dayStartOverlay.setAttribute("aria-hidden", "true");
    dayStartOverlayTimerId = null;
  }, 3300);
}

function hideDayStartOverlay() {
  if (!dayStartOverlay) return;
  if (dayStartOverlayTimerId !== null) {
    window.clearTimeout(dayStartOverlayTimerId);
    dayStartOverlayTimerId = null;
  }
  dayStartOverlay.classList.remove("show");
  dayStartOverlay.classList.add("hidden");
  dayStartOverlay.setAttribute("aria-hidden", "true");
}

function showMiracleOverlay() {
  if (!miracleOverlay) return;
  miracleOverlay.classList.remove("hidden", "show");
  void miracleOverlay.offsetWidth;
  miracleOverlay.classList.add("show");
  if (miracleOverlayTimerId !== null) {
    window.clearTimeout(miracleOverlayTimerId);
  }
  miracleOverlayTimerId = window.setTimeout(() => {
    miracleOverlay.classList.remove("show");
    miracleOverlay.classList.add("hidden");
    miracleOverlayTimerId = null;
  }, 3100);
}

function hidePhase2DreamOverlay() {
  if (!phase2DreamOverlay || !phase2DreamOptions || !phase2DreamLine) return;
  if (phase2DreamTimerId !== null) {
    window.clearTimeout(phase2DreamTimerId);
    phase2DreamTimerId = null;
  }
  phase2DreamOptions.innerHTML = "";
  phase2DreamLine.textContent = "";
  phase2DreamOverlay.classList.add("hidden");
  phase2DreamOverlay.setAttribute("aria-hidden", "true");
}

function renderPhase2DreamOptions(items) {
  if (!phase2DreamOptions) return;
  phase2DreamOptions.innerHTML = "";
  items.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = item.label;
    btn.addEventListener("click", item.onSelect);
    phase2DreamOptions.appendChild(btn);
  });
}

function applyPhase2Boon(boonId) {
  state.phase2Boon = boonId;
  if (boonId === "vitalidade") {
    state.playerLife = clamp(state.playerLife + 18, 0, state.playerMaxLife);
    addLog("Eco do sonho: vigor adicional acompanha você para a próxima fase.");
    return;
  }
  if (boonId === "dossie") {
    state.evidence = clamp(state.evidence + 14, 0, 100);
    addLog("Eco do sonho: pistas antecipadas surgem no início da investigação.");
    return;
  }
  if (boonId === "discricao") {
    state.suspicion = clamp(state.suspicion - 16, 0, 100);
    addLog("Eco do sonho: seus passos parecem menos visíveis aos conspiradores.");
  }
}

function applyPhase2Penalty(penaltyId) {
  const severityStep = Math.max(0, state.faithBrokenCycles - 1);
  const severityFactor = 1 + severityStep * 0.45;
  state.phase2Boon = `penalty-${penaltyId}`;
  if (penaltyId === "vida") {
    const loss = Math.round(30 * severityFactor);
    state.playerLife = clamp(state.playerLife - loss, 1, state.playerMaxLife);
    addLog(`Cobrança da promessa quebrada: sua vitalidade foi drenada (-${loss} vida).`);
    return;
  }
  if (penaltyId === "suspeita") {
    const gain = Math.round(30 * severityFactor);
    state.suspicion = clamp(state.suspicion + gain, 0, 100);
    addLog(`Cobrança da promessa quebrada: seus rastros ficaram expostos (+${gain} suspeita).`);
    return;
  }
  if (penaltyId === "queda") {
    const popLoss = Math.round(24 * severityFactor);
    const coinLoss = Math.round(15 * severityFactor);
    state.popularity = clamp(state.popularity - popLoss, 0, 100);
    state.coins = Math.max(0, state.coins - coinLoss);
    addLog(`Cobrança da promessa quebrada: você desperta desacreditado e empobrecido (-${popLoss} popularidade, -${coinLoss} moedas).`);
  }
}

function concludePhase2Dream() {
  state.phase2DreamPending = false;
  state.phase2DreamActive = false;
  state.phase2DreamResolved = true;
  state.phase2DreamArmed = false;
  hidePhase2DreamOverlay();
  addLog("Você desperta do sonho com a morte, mas o dia continua na Fase 1.", { type: "event" });
  if (state.dayStartAfterDreamPending) {
    state.dayStartAfterDreamPending = false;
    addLog(`Novo dia começou: Dia ${state.day}, ${formatHour(state.dayClockMinutes)}.`);
    addLog("Você desperta no estábulo. Escolha para onde seguir antes de retomar os atendimentos.");
    showDayStartOverlay(state.day);
    if (Math.random() < 0.5) emitCasualDialogue();
    if (state.faithTier >= 2) triggerPersecutionWhisper();
    if (state.benevolenceTier >= 2) maybeTriggerPlagueTrendInsight();
    applyTimeTheme();
    checkPhase1TransitionTrigger();
    if (state.phase === 1) {
      maybeShowAreaTutorial("estabulo");
    }
  }
  render();
}

function chooseDreamBoon(boonId) {
  applyPhase2Boon(boonId);
  if (phase2DreamLine) {
    phase2DreamLine.textContent = `é hora de ver além do véu, meu caro ${getDoctorDisplayName()}.`;
  }
  renderPhase2DreamOptions([
    {
      label: "Despertar",
      onSelect: concludePhase2Dream
    }
  ]);
}

function chooseDreamPenalty(penaltyId) {
  applyPhase2Penalty(penaltyId);
  if (phase2DreamLine) {
    phase2DreamLine.textContent = `promessas quebradas cobram caro, ${getDoctorDisplayName()}. acorde com o peso do véu.`;
  }
  state.faithPromiseBroken = false;
  state.faithPromiseType = "";
  renderPhase2DreamOptions([
    {
      label: "Despertar",
      onSelect: concludePhase2Dream
    }
  ]);
}

function openDreamBoonChoices() {
  if (state.faithPromiseBroken) {
    const severityStep = Math.max(0, state.faithBrokenCycles - 1);
    const severityFactor = 1 + severityStep * 0.45;
    const lifeLoss = Math.round(30 * severityFactor);
    const suspicionGain = Math.round(30 * severityFactor);
    const popLoss = Math.round(24 * severityFactor);
    const coinLoss = Math.round(15 * severityFactor);
    if (phase2DreamLine) {
      phase2DreamLine.textContent = "Você negou a penitência do milagre. Não há bênçãos hoje, apenas cobrança.";
    }
    renderPhase2DreamOptions([
      { label: `Dívida de Sangue (-${lifeLoss} vida)`, onSelect: () => chooseDreamPenalty("vida") },
      { label: `Marca dos Olhos (+${suspicionGain} suspeita)`, onSelect: () => chooseDreamPenalty("suspeita") },
      { label: `Queda Pública (-${popLoss} popularidade, -${coinLoss} moedas)`, onSelect: () => chooseDreamPenalty("queda") }
    ]);
    return;
  }
  if (phase2DreamLine) {
    phase2DreamLine.textContent = "A morte observa em silêncio: 'por ora, siga seu caminho, doutor'.";
  }
  renderPhase2DreamOptions([
    { label: "Despertar", onSelect: concludePhase2Dream }
  ]);
}

function startPhase2Dream() {
  if (!phase2DreamOverlay || !phase2DreamLine) {
    concludePhase2Dream();
    return;
  }
  hideDayStartOverlay();
  state.phase2DreamActive = true;
  phase2DreamOverlay.classList.remove("hidden");
  phase2DreamOverlay.setAttribute("aria-hidden", "false");
  phase2DreamOptions.innerHTML = "";
  phase2DreamLine.textContent = `${getDoctorDisplayName()} adormece profundamente. Uma velha conhecida então visita-o em seus sonhos.`;
  if (phase2DreamTimerId !== null) {
    window.clearTimeout(phase2DreamTimerId);
  }
  phase2DreamTimerId = window.setTimeout(() => {
    phase2DreamTimerId = null;
    if (!state.phase2DreamActive) return;
    phase2DreamLine.textContent = `este não é o nosso primeiro e nem ultimo encontro, ${getDoctorDisplayName()}.`;
    if (state.faithPromiseBroken) {
      renderPhase2DreamOptions([
        { label: "Encarar a cobrança da morte", onSelect: openDreamBoonChoices }
      ]);
      return;
    }
    renderPhase2DreamOptions([
      { label: "Conversar com a morte", onSelect: openDreamBoonChoices },
      { label: "Acordar do sonho", onSelect: concludePhase2Dream }
    ]);
  }, 2400);
}

function clearMaskEventTimers() {
  if (maskInviteDelayTimerId !== null) {
    window.clearTimeout(maskInviteDelayTimerId);
    maskInviteDelayTimerId = null;
  }
  if (maskFastForwardTimerId !== null) {
    window.clearInterval(maskFastForwardTimerId);
    maskFastForwardTimerId = null;
  }
  if (maskBallTimerId !== null) {
    window.clearTimeout(maskBallTimerId);
    maskBallTimerId = null;
  }
}

function hideMaskOverlays() {
  clearMaskEventTimers();
  if (maskInviteOverlay) {
    maskInviteOverlay.classList.add("hidden");
    maskInviteOverlay.setAttribute("aria-hidden", "true");
  }
  if (maskFastClockOverlay) {
    maskFastClockOverlay.classList.add("hidden");
    maskFastClockOverlay.setAttribute("aria-hidden", "true");
  }
  if (maskBallOverlay) {
    maskBallOverlay.classList.add("hidden");
    maskBallOverlay.setAttribute("aria-hidden", "true");
  }
  document.body.classList.remove("phase-ball");
}

function renderMaskBallOptions(options) {
  if (!maskBallOptions) return;
  maskBallOptions.innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = opt.label;
    btn.addEventListener("click", opt.onSelect);
    maskBallOptions.appendChild(btn);
  });
}

function openMaskInvitation(isFreshDelivery = false) {
  if (!maskInviteOverlay || !maskInviteHost || !maskInviteOptions) return;
  state.maskEventActive = true;
  state.maskBallStage = 0;
  maskInviteHost.textContent = `Convite do baile anual de ${state.maskHostName}.`;
  maskInviteOptions.innerHTML = "";
  if (state.doctorInfected) {
    const holdBtn = document.createElement("button");
    holdBtn.type = "button";
    holdBtn.textContent = "Guardar convite e tratar a peste";
    holdBtn.addEventListener("click", () => {
      state.maskInvitePending = false;
      state.maskEventActive = false;
      hideMaskOverlays();
      addLog("Você guarda o convite no inventário. Cure-se para poder comparecer ao baile.", { type: "event" });
      render();
    });
    maskInviteOptions.appendChild(holdBtn);
    maskInviteOverlay.classList.remove("hidden");
    maskInviteOverlay.setAttribute("aria-hidden", "false");
    return;
  }
  const openBtn = document.createElement("button");
  openBtn.type = "button";
  openBtn.textContent = "Abrir convite e ir ao baile";
  openBtn.addEventListener("click", startMaskFastForward);
  maskInviteOptions.appendChild(openBtn);

  const keepBtn = document.createElement("button");
  keepBtn.type = "button";
  keepBtn.textContent = "Guardar convite";
  keepBtn.addEventListener("click", () => {
    state.maskInvitePending = false;
    state.maskEventActive = false;
    hideMaskOverlays();
    addLog("Você guarda o envelope lacrado para abrir em outro momento.", { type: "event" });
    render();
  });
  maskInviteOptions.appendChild(keepBtn);
  maskInviteOverlay.classList.remove("hidden");
  maskInviteOverlay.setAttribute("aria-hidden", "false");
  if (!isFreshDelivery) {
    addLog("Você rompe o lacre do envelope e confirma presença no baile.", { type: "event" });
  }
}

function openMaskInvitationFromInventory() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (state.maskInvitations <= 0) {
    addLog("Você não possui convite lacrado no inventário.");
    return;
  }
  if (state.currentPatient && state.currentPatient.active) {
    addLog("Finalize o atendimento atual antes de abrir o convite.");
    return;
  }
  if (maskInviteDelayTimerId !== null) {
    addLog("O mensageiro ainda não chegou. Sua fama ainda está percorrendo a cidade.");
    return;
  }
  openMaskInvitation(false);
  render();
}

function startMaskFastForward() {
  if (!maskInviteOverlay || !maskFastClockOverlay || !maskFastClockText) return;
  state.maskInvitations = 0;
  maskInviteOverlay.classList.add("hidden");
  maskInviteOverlay.setAttribute("aria-hidden", "true");
  maskFastClockOverlay.classList.remove("hidden");
  maskFastClockOverlay.setAttribute("aria-hidden", "false");
  state.maskFastForwardActive = true;
  const targetSeconds = 22 * 3600;
  if (getClockMinutesOfDay(state.dayClockMinutes) * 60 >= targetSeconds) {
    state.day += 1;
    state.dayClockMinutes = 18 * 60;
  }
  let fastSeconds = Math.floor(state.dayClockMinutes * 60);
  maskFastClockText.textContent = formatHourWithSeconds(fastSeconds);
  clearMaskEventTimers();
  maskFastForwardTimerId = window.setInterval(() => {
    // Salta em blocos até os últimos 5 segundos antes das 22:00.
    fastSeconds += 9 * 60;
    if (fastSeconds >= targetSeconds - 5) {
      fastSeconds = targetSeconds - 5;
      state.dayClockMinutes = fastSeconds / 60;
      maskFastClockText.textContent = formatHourWithSeconds(fastSeconds);
      state.maskFastForwardActive = false;
      window.clearInterval(maskFastForwardTimerId);
      maskFastForwardTimerId = null;

      let finalSecond = fastSeconds;
      const tickFinalSeconds = () => {
        maskFastClockText.textContent = formatHourWithSeconds(finalSecond);
        state.dayClockMinutes = finalSecond / 60;
        renderStats();
        if (finalSecond >= targetSeconds) {
          startMaskBallScene();
          return;
        }
        finalSecond += 1;
        maskBallTimerId = window.setTimeout(tickFinalSeconds, 210);
      };
      tickFinalSeconds();
      return;
    }
    state.dayClockMinutes = fastSeconds / 60;
    maskFastClockText.textContent = formatHourWithSeconds(fastSeconds);
    renderStats();
  }, 45);
}

function startMaskBallScene() {
  if (!maskFastClockOverlay || !maskBallOverlay || !maskBallText || !maskBallTitle) return;
  maskFastClockOverlay.classList.add("hidden");
  maskFastClockOverlay.setAttribute("aria-hidden", "true");
  maskBallOverlay.classList.remove("hidden");
  maskBallOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("phase-ball");
  maskBallTitle.textContent = `Baile de Máscaras de ${state.maskHostName}`;
  state.maskBallStage = 1;
  state.maskBallClues = 0;
  state.maskBallInteractions = 0;
  state.maskBallItems = [];
  state.maskBallApex = false;
  renderMaskBallHub("O salão pulsa em vermelho escuro. Todos usam máscaras. O ar parece deslocado no tempo.");
}

function addMaskBallClue(amount, line) {
  state.maskBallClues = clamp(state.maskBallClues + amount, 0, 99);
  state.maskBallInteractions += 1;
  addLog(line, { type: "event" });
}

function addMaskBallItem(itemId, label) {
  if (state.maskBallItems.includes(itemId)) return false;
  state.maskBallItems.push(itemId);
  if (itemId === "selo-negro") state.blackCouncilSeals += 1;
  if (itemId === "chave-onix") state.onyxKeys += 1;
  if (itemId === "ampola") state.paleAmpoules += 1;
  addLog(`Item obtido no baile: ${label}.`, { type: "event" });
  return true;
}

function getMaskBallStatusLine() {
  const items = state.maskBallItems.length ? state.maskBallItems.join(", ") : "nenhum";
  return `Pistas: ${state.maskBallClues} | Interações: ${state.maskBallInteractions} | Itens: ${items}.`;
}

function renderMaskBallHub(introLine = "") {
  if (!maskBallText) return;
  const lead = introLine ? `${introLine}\n\n` : "";
  const tension = state.maskBallClues >= 5
    ? "A estranheza já não pode ser ignorada: há um ritual em curso sob a música."
    : "Você circula entre risos contidos e olhares opacos por trás das máscaras.";
  maskBallText.textContent = `${lead}${tension}\n${getMaskBallStatusLine()}`;

  const options = [
    { label: "Conversar com o convidado da máscara de corvo", onSelect: inspectCrowMaskGuest },
    { label: "Inspecionar a mesa de taças e frutas", onSelect: inspectBanquetTable },
    { label: "Explorar o corredor de espelhos", onSelect: inspectMirrorCorridor },
    { label: "Observar a orquestra e os músicos", onSelect: inspectOrchestra }
  ];
  if (state.maskBallClues >= 4) {
    options.push({ label: "Aproximar-se do anfitrião", onSelect: approachMaskHost });
  }
  renderMaskBallOptions(options);
}

function inspectCrowMaskGuest() {
  if (!maskBallText) return;
  maskBallText.textContent = "O convidado de máscara de corvo inclina a cabeça: 'Nomes são máscaras que a cidade veste quando teme a verdade.'";
  renderMaskBallOptions([
    {
      label: "Perguntar sobre o anfitrião",
      onSelect: () => {
        addMaskBallClue(1, "O convidado cita 'Vesper' como curador de crises fabricadas.");
        renderMaskBallHub("Ele ri baixo: 'Aqui, surtos obedecem calendário.'");
      }
    },
    {
      label: "Perguntar sobre a regra da máscara",
      onSelect: () => {
        addMaskBallClue(1, "O convidado sussurra que o ar do salão muda quando alguém quebra a regra.");
        renderMaskBallHub("A palavra 'antídoto' ecoa no fim da frase, quase inaudível.");
      }
    },
    { label: "Encerrar conversa", onSelect: () => renderMaskBallHub("Ele se afasta como se nunca tivesse estado ali.") }
  ]);
}

function inspectBanquetTable() {
  if (!maskBallText) return;
  const gotItem = addMaskBallItem("selo-negro", "selo-negro do conselho");
  addMaskBallClue(1, "Sob a toalha, você vê caixas com o mesmo símbolo usado em registros de surtos.");
  maskBallText.textContent = gotItem
    ? "Entre taças, você encontra um selo-negro gravado. O cheiro nas bebidas lembra desinfetante e ferro."
    : "As taças continuam intactas demais para uma festa lotada. O símbolo do selo-negro reaparece.";
  renderMaskBallOptions([{ label: "Voltar ao salão", onSelect: () => renderMaskBallHub() }]);
}

function inspectMirrorCorridor() {
  if (!maskBallText) return;
  if (!state.maskBallItems.includes("chave-onix")) {
    addMaskBallItem("chave-onix", "chave de ônix");
    addMaskBallClue(1, "No corredor de espelhos, um servo deixa cair uma chave marcada com sigilo médico.");
    maskBallText.textContent = "Reflexos mostram pessoas em posições que não combinam com seus movimentos. Você recolhe uma chave de ônix.";
    renderMaskBallOptions([{ label: "Voltar ao salão", onSelect: () => renderMaskBallHub() }]);
    return;
  }
  if (state.maskBallItems.includes("ampola")) {
    addMaskBallClue(1, "Os espelhos agora mostram máscaras sem rosto.");
    maskBallText.textContent = "O corredor parece mais estreito. Nos espelhos, alguns convidados já não têm feições.";
    renderMaskBallOptions([{ label: "Voltar ao salão", onSelect: () => renderMaskBallHub() }]);
    return;
  }
  if (state.maskBallItems.includes("chave-onix")) {
    addMaskBallItem("ampola", "ampola incolor");
    addMaskBallClue(2, "A chave abre um nicho com uma ampola incolor e a inscrição 'não é a hora'.");
    maskBallText.textContent = "Você abre um compartimento secreto e encontra uma ampola incolor. Quem preparou isso sabia que alguém cairia.";
    renderMaskBallOptions([{ label: "Voltar ao salão", onSelect: () => renderMaskBallHub() }]);
  }
}

function inspectOrchestra() {
  if (!maskBallText) return;
  addMaskBallClue(1, "A melodia repete intervalos usados para sinalizar trocas de turno de carroças noturnas.");
  maskBallText.textContent = "A orquestra toca em compasso clínico, quase mecânico. Um violinista murmura: 'a cidade inteira dança quando eles mandam'.";
  renderMaskBallOptions([{ label: "Retornar ao centro do salão", onSelect: () => renderMaskBallHub() }]);
}

function approachMaskHost() {
  if (!maskBallText) return;
  if (state.maskBallClues < 6 || state.maskBallInteractions < 5) {
    maskBallText.textContent = "O anfitrião apenas acena de longe. Você sente que ainda faltam peças para entender o que acontece aqui.";
    renderMaskBallOptions([{ label: "Continuar investigando o baile", onSelect: () => renderMaskBallHub() }]);
    return;
  }
  startMaskBallApex();
}

function startMaskBallApex() {
  state.maskBallApex = true;
  if (!maskBallText) return;
  maskBallText.textContent = "No salão interno, todos viram ao mesmo tempo para você. O ar fica espesso e quente por baixo da máscara.";
  renderMaskBallOptions([
    {
      label: "Tentar manter a máscara e recuar",
      onSelect: () => {
        if (!maskBallText) return;
        maskBallText.textContent = "A máscara cola ao rosto, como breu. Você tenta respirar, mas só encontra fogo na garganta.";
        renderMaskBallOptions([
          { label: "Arrancar a máscara para respirar", onSelect: triggerMaskRuleViolation }
        ]);
      }
    }
  ]);
}

function triggerMaskRuleViolation() {
  if (!maskBallText) return;
  state.maskBallStage = 4;
  state.doctorInfected = true;
  state.doctorInfectionSeverity = clamp(Math.max(state.doctorInfectionSeverity, 78), 0, 100);
  showInfectionOverlay();
  maskBallText.textContent = "Ao violar a regra, sua garganta queima. A peste invade em um golpe seco.";
  addLog("No baile de máscaras, você quebrou a única regra e foi contaminado.", { type: "event" });
  renderMaskBallOptions([]);

  let countdown = 8;
  const tickCollapse = () => {
    if (!maskBallText) return;
    state.playerLife = clamp(state.playerLife - 3, 1, state.playerMaxLife);
    maskBallText.textContent = `A visão escurece... ${countdown}`;
    countdown -= 1;
    renderStats();
    if (countdown >= 0) {
      maskBallTimerId = window.setTimeout(tickCollapse, 420);
      return;
    }
    maskBallText.textContent = "\"Um tolo, esperava bem mais deste. Dê o antídoto, não é a hora de encontrar a morte.\"";
    maskBallTimerId = window.setTimeout(() => {
      state.doctorInfected = false;
      state.doctorInfectionSeverity = 0;
      state.maskInvitePending = false;
      state.maskEventActive = false;
      state.maskTriggerResolved = true;
      hideMaskOverlays();
      transitionToPhase2();
    }, 1900);
  };
  tickCollapse();
}

function tickClock() {
  if (!state.gameStarted) return;
  state.playTimeSeconds += 0.25;
  stepMiniMap(0.25);
  renderMiniMap();
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice || state.phase2DreamActive || state.maskEventActive || state.maskFastForwardActive || state.blackoutActive || state.collapsePending) return;
  // 12h in-game in 5 minutes real time => 2.4 in-game minutes per real second.
  const before = state.dayClockMinutes;
  state.dayClockMinutes += 0.6;
  const crossedMidnights = Math.floor(state.dayClockMinutes / (24 * 60)) - Math.floor(before / (24 * 60));
  if (crossedMidnights > 0) {
    state.day += crossedMidnights;
    showDayStartOverlay(state.day);
  }
  applyPersecutionDissipation(0.6);
  decayBloodStains(0.6);
  trackHospitalNeglect(0.6);
  processAllAmbulatoryTurns();
  updateSleepDeprivationEffects();
  applyTimeTheme();
  renderStats();
}

function startClockTimer() {
  if (clockTimerId !== null) return;
  clockTimerId = window.setInterval(tickClock, 250);
}

function applyWorkFatigue(patient) {
  const baseCost = getActionLifeCostByHour();
  let realCost = baseCost;

  if (state.protectionCharges > 0) {
    state.protectionCharges -= 1;
    if (Math.random() < 0.7) realCost = 0;
  }

  state.playerLife -= realCost;
  if (patient) {
    patient.doctorLifeSpent += realCost;
  }

  addLog(`Horário de plantão: ${formatHour(state.dayClockMinutes)}. Custo de vida da ação: -${realCost}.`);
  tryDoctorContagionExposure();
  applyDoctorPlagueProgression();

  return realCost;
}

function createPatient(isRelapse = false, relapseName = "") {
  state.patientCounter += 1;
  const cityRisk = getCurrentCityRisk();
  const paymentMultiplier = getCurrentCityPaymentMultiplier();
  const riskSpread = Math.round(cityRisk * 10);
  const severity = isRelapse ? randomInt(52, 82) : randomInt(48, 88);
  const hp = isRelapse ? randomInt(36, 64) : randomInt(40, 78);
  const infectionPower = isRelapse ? randomInt(8 + riskSpread, 14 + riskSpread) : randomInt(7 + riskSpread, 13 + riskSpread);
  const canPay = isRelapse ? Math.random() < 0.55 : Math.random() < 0.72;
  const offeredBase = canPay ? randomInt(state.minPatientPayment, state.minPatientPayment + 12) : 0;
  const offeredPayment = Math.round(offeredBase * paymentMultiplier);

  return {
    id: state.patientCounter,
    name: isRelapse ? `${relapseName} (recaída)` : `Paciente #${state.patientCounter}`,
    isRecurring: isRelapse,
    hp,
    severity,
    infectionPower,
    canPay,
    offeredPayment,
    symptoms: pickSymptoms(),
    active: true,
    treatmentCount: 0,
    doctorLifeSpent: 0,
    freeCareAccepted: false,
    wasReleasedBefore: isRelapse,
    needsFreeCareDecision: !canPay
  };
}

function queueRecurringPatientDialogue(patientName) {
  if (state.pendingDialogue) return;
  state.pendingDialogue = {
    id: "recurring-return",
    title: "Paciente Recorrente",
    prompt: `${patientName}: "Doutor(a), eu achei que estava salvo... voltei a piorar." Como você responde?`,
    options: [
      {
        text: "Acolher e reforçar acompanhamento",
        outcome: `${getDoctorDisplayName()}: "Você fez certo em voltar. Vamos recomeçar juntos e monitorar de perto."`,
        effects: { popularity: 2 }
      },
      {
        text: "Adotar postura firme e direta",
        outcome: `${getDoctorDisplayName()}: "A remissão era instável. Precisamos de disciplina total no tratamento agora."`,
        effects: { popularity: 1, persecution: -1 }
      }
    ]
  };
}

function classifyLogType(text, explicitType = "") {
  if (explicitType) return explicitType;
  const normalized = text.toLowerCase();
  if (normalized.includes("sucesso") || normalized.includes("curado") || normalized.includes("superou")) return "success";
  if (normalized.includes("falha")) return "fail";
  if (normalized.includes("óbito") || normalized.includes("não resistiu") || normalized.includes("colapsa")) return "death";
  if (normalized.includes(": '") || normalized.includes("situação rara")) return "dialogue";
  if (normalized.includes("viagem") || normalized.includes("transição") || normalized.includes("recaída")) return "event";
  return "info";
}

function getLogTag(type) {
  if (type === "success") return "Sucesso";
  if (type === "fail") return "Falha";
  if (type === "death") return "Óbito";
  if (type === "dialogue") return "Fala";
  if (type === "event") return "Situação";
  return "Registro";
}

function addLog(text, options = {}) {
  const entry = document.createElement("p");
  const type = classifyLogType(text, options.type || "");
  entry.classList.add("log-entry", `log-${type}`);
  entry.innerHTML = `<span class="log-tag">${getLogTag(type)}</span>${text}`;
  log.prepend(entry);
}

function maybeQueueDialogueResponse(context) {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (state.pendingDialogue) return;
  if (state.currentPatient && state.currentPatient.needsFreeCareDecision) return;

  let chance = 0.2;
  if (context === "church") chance = 0.34;
  if (context === "hospital") chance = 0.3;
  if (context === "travel") chance = 0.25;
  if (Math.random() > chance) return;

  const pool = RESPONSIVE_DIALOGUE_EVENTS.filter((event) => event.contexts.includes(context));
  if (!pool.length) return;
  state.pendingDialogue = pool[randomInt(0, pool.length - 1)];
}

function buildBloodEchoes(mode = "none") {
  if (!bloodWarningEchoes) return;
  bloodWarningEchoes.innerHTML = "";
  if (mode === "swarm") {
    for (let i = 0; i < 26; i += 1) {
      const echo = document.createElement("span");
      echo.className = "blood-echo";
      echo.textContent = "eu vejo você";
      echo.style.left = `${randomInt(4, 86)}%`;
      echo.style.top = `${randomInt(6, 88)}%`;
      echo.style.fontSize = `${randomInt(22, 54)}px`;
      echo.style.transform = `rotate(${randomInt(-26, 24)}deg)`;
      bloodWarningEchoes.appendChild(echo);
    }
    return;
  }
  if (mode === "rows") {
    const rowCount = 13;
    for (let i = 0; i < rowCount; i += 1) {
      const row = document.createElement("div");
      row.className = "blood-row";
      row.style.top = `${4 + i * 7.2}%`;
      row.style.transform = `rotate(${randomInt(-3, 3)}deg)`;
      row.style.opacity = `${0.28 + Math.random() * 0.48}`;
      row.style.animationDelay = `${(i % 5) * 0.11}s`;
      row.textContent = "eu vejo você ".repeat(18);
      bloodWarningEchoes.appendChild(row);
    }
  }
}

function triggerBloodWarningOverlay(mode = "normal") {
  if (!bloodWarningOverlay) return;
  playDreadSignal();
  const isSwarm = mode === "swarm" || mode === "rows";
  const isFullwrite = mode === "rows";
  bloodWarningOverlay.classList.remove("hidden", "show", "swarm", "fullwrite");
  buildBloodEchoes(mode === "normal" ? "none" : mode);
  if (isSwarm) bloodWarningOverlay.classList.add("swarm");
  if (isFullwrite) bloodWarningOverlay.classList.add("fullwrite");
  void bloodWarningOverlay.offsetWidth;
  bloodWarningOverlay.classList.add("show");
  if (bloodWarningTimerId !== null) {
    window.clearTimeout(bloodWarningTimerId);
  }
  bloodWarningTimerId = window.setTimeout(() => {
    bloodWarningOverlay.classList.add("hidden");
    bloodWarningOverlay.classList.remove("show", "swarm", "fullwrite");
    if (bloodWarningEchoes) bloodWarningEchoes.innerHTML = "";
    bloodWarningTimerId = null;
  }, isFullwrite ? 4200 : isSwarm ? 3600 : 3200);
}

function trackChurchInsistenceAtMaxPersecution() {
  if (state.currentAreaId !== "igreja" || state.persecutionLevel < 10) {
    state.churchInsistenceAtMaxPersecution = 0;
    state.churchDreadManifestLevel = 0;
    return;
  }
  state.churchInsistenceAtMaxPersecution += 1;
  if (state.churchInsistenceAtMaxPersecution === 2) {
    state.churchDreadManifestLevel = 1;
    triggerBloodWarningOverlay("normal");
    addLog("Um recado surge como sangue no seu campo de visão: 'eu vejo você'.", { type: "event" });
    return;
  }
  if (state.churchInsistenceAtMaxPersecution >= 5) {
    state.churchDreadManifestLevel = 3;
    triggerBloodWarningOverlay("rows");
    increaseBloodStains(randomInt(8, 14));
    addLog("Fileiras inteiras cobrem sua visão: 'eu vejo você' se repete de ponta a ponta.", { type: "event" });
    return;
  }
  if (state.churchInsistenceAtMaxPersecution >= 3) {
    state.churchDreadManifestLevel = 2;
    triggerBloodWarningOverlay("swarm");
    increaseBloodStains(randomInt(4, 8));
    if (state.churchInsistenceAtMaxPersecution % 2 === 1) {
      addLog("A mensagem se multiplica pelas paredes: 'eu vejo você... eu vejo você...'", { type: "event" });
    }
  }
}

function syncFaithTierByChoices() {
  const previous = state.faithTier;
  state.faithTier = currentFaithTierByVisits();
  if (state.faithTier > previous) {
    addLog("Sua influência religiosa cresceu com esse posicionamento.", { type: "event" });
  }
}

function applyDialogueEffects(effects = {}) {
  if (effects.popularity) updatePopularity(effects.popularity, "impacto de resposta em diálogo");
  if (effects.persecution) {
    setPersecutionLevel(state.persecutionLevel + effects.persecution);
  }
  if (effects.coins) {
    state.coins = Math.max(0, state.coins + effects.coins);
  }
  if (effects.protection) state.protectionCharges += effects.protection;
  if (effects.plagueTrend) state.plagueTrendLevel = clamp(state.plagueTrendLevel + effects.plagueTrend, 0, 10);
  if (effects.faithVisits) {
    state.faithVisits = Math.max(0, state.faithVisits + effects.faithVisits);
    syncFaithTierByChoices();
  }
  if (effects.evidence) state.evidence = clamp(state.evidence + effects.evidence, 0, 100);
  if (effects.suspicion) state.suspicion = clamp(state.suspicion + effects.suspicion, 0, 100);
  if (effects.unlockResidential) {
    unlockResidentialArea(state.currentCityId, "investigação discreta");
  }
  if (effects.freeCare) {
    state.freeCareResolved = Math.max(0, state.freeCareResolved + effects.freeCare);
    maybeProgressBenevolenceNarrative();
  }
}

function describeDialogueImpact(effects = {}) {
  const parts = [];
  if (effects.popularity) parts.push(`Popularidade ${effects.popularity > 0 ? "+" : ""}${effects.popularity}`);
  if (effects.persecution) parts.push(`Perseguição ${effects.persecution > 0 ? "+" : ""}${effects.persecution}`);
  if (effects.coins) parts.push(`Moedas ${effects.coins > 0 ? "+" : ""}${effects.coins}`);
  if (effects.protection) parts.push(`Proteção +${effects.protection}`);
  if (effects.plagueTrend) parts.push(`Tendência da peste ${effects.plagueTrend > 0 ? "+" : ""}${effects.plagueTrend}`);
  if (effects.faithVisits) parts.push(`Religiosidade +${effects.faithVisits}`);
  if (effects.evidence) parts.push(`Evidência ${effects.evidence > 0 ? "+" : ""}${effects.evidence}`);
  if (effects.suspicion) parts.push(`Exposição ${effects.suspicion > 0 ? "+" : ""}${effects.suspicion}`);
  if (effects.unlockResidential) parts.push("Área Residencial desbloqueada");
  if (effects.freeCare) parts.push(`Beneficência +${effects.freeCare}`);
  return parts.join(" | ");
}

function answerDialogueOption(index) {
  const event = state.pendingDialogue;
  if (!event) return;
  const option = event.options[index];
  if (!option) return;

  state.dialogueChoicesMade += 1;
  addLog(`${event.title}: ${option.outcome}`, { type: "dialogue" });
  const impact = describeDialogueImpact(option.effects);
  if (impact) addLog(`Impacto da resposta: ${impact}.`, { type: "event" });
  applyDialogueEffects(option.effects);
  notePlayerAction("dialogue", 0.8);
  state.pendingDialogue = null;
  render();
}

function renderNarrativeSpotlight() {
  if (state.phase !== 1 || !state.pendingDialogue) {
    narrativeSpotlight.classList.add("hidden");
    narrativeSpotlight.innerHTML = "";
    return;
  }

  const event = state.pendingDialogue;
  narrativeSpotlight.classList.remove("hidden");
  narrativeSpotlight.innerHTML = `
    <div class="spotlight-header">
      <strong>${event.title}</strong>
      <span class="tag">Escolha de Resposta</span>
    </div>
    <p class="spotlight-body">${event.prompt}</p>
    <div class="spotlight-options">
      ${event.options.map((option, idx) => `<button data-dialogue-option="${idx}" type="button">${option.text}</button>`).join("")}
    </div>
  `;

  narrativeSpotlight.querySelectorAll("button[data-dialogue-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-dialogue-option"));
      answerDialogueOption(index);
    });
  });
}

function pickDialogue(pool) {
  if (!pool || pool.length === 0) return "";
  const index = (state.dialogueSeed + randomInt(0, pool.length - 1)) % pool.length;
  state.dialogueSeed += 1;
  return pool[index];
}

function getCityDialogueSet() {
  return CITY_DIALOGUES[state.currentCityId] || null;
}

function notePlayerAction(type, weight = 1) {
  state.actionHistory.push({ type, weight, stamp: Date.now() });
  if (state.actionHistory.length > 80) {
    state.actionHistory.splice(0, state.actionHistory.length - 80);
  }
}

function recentActionWeight(type) {
  const recent = state.actionHistory.slice(-20);
  return recent
    .filter((entry) => entry.type === type)
    .reduce((sum, entry) => sum + entry.weight, 0);
}

function inferNarrativeSignal() {
  const lifeRatio = state.playerLife / Math.max(1, state.playerMaxLife);
  const faithSignal = state.faithTier * 2 + state.churchActionsToday + recentActionWeight("church");
  const compassionSignal = state.benevolenceTier * 2 + state.freeCareResolved * 0.35 + recentActionWeight("free-care");
  const threatSignal = state.persecutionLevel + state.plagueTrendLevel * 0.7 + (state.doctorInfected ? 3 : 0) + recentActionWeight("ominous");
  const resilienceSignal = (state.cured - state.deaths) * 0.35 + state.popularity * 0.04 + recentActionWeight("cured");
  const strainSignal = (1 - lifeRatio) * 6 + (getClockHour() >= 18 ? 1.5 : 0) + (getClockHour() >= 24 ? 2 : 0);

  return {
    faithSignal,
    compassionSignal,
    threatSignal,
    resilienceSignal,
    strainSignal
  };
}

function inferSpeakerFamily(signal) {
  if (signal.threatSignal >= Math.max(signal.faithSignal, signal.compassionSignal) + 1.5) return "ominous";
  if (signal.compassionSignal >= signal.faithSignal + 1) return "empathy";
  if (signal.faithSignal >= 2) return "faith";
  return "neutral";
}

function inferMotif(signal) {
  if (signal.threatSignal >= 6) return "threat";
  if (signal.compassionSignal >= 4 && signal.resilienceSignal >= 2) return "compassion";
  if (signal.faithSignal >= 3) return "faith";
  if (state.plagueTrendLevel >= 3) return "plague";
  return "resilience";
}

function inferResponsiveDialogue(context = "general") {
  const signal = inferNarrativeSignal();
  let speakerFamily = inferSpeakerFamily(signal);
  if (context === "ominous") speakerFamily = "ominous";
  if (context === "faith") speakerFamily = "faith";
  if (context === "empathy") speakerFamily = "empathy";

  let motif = inferMotif(signal);
  if (context === "hospital" && state.plagueTrendLevel >= 2) motif = "plague";
  if (context === "faith") motif = "faith";
  if (context === "empathy") motif = "compassion";
  if (context === "ominous") motif = "threat";
  const openingPool = signal.threatSignal >= 5 || signal.strainSignal >= 4
    ? INFERENCE_LEXICON.openings.tense
    : INFERENCE_LEXICON.openings.calm;

  const speaker = pickDialogue(INFERENCE_LEXICON.speakers[speakerFamily]);
  const opening = pickDialogue(openingPool);
  const motifText = pickDialogue(INFERENCE_LEXICON.motifs[motif]);

  if (!speaker || !opening || !motifText) return "";
  return `${speaker}, ${opening}: '${motifText}.'`;
}

function currentFaithTierByVisits() {
  if (state.faithVisits >= 9) return 3;
  if (state.faithVisits >= 5) return 2;
  if (state.faithVisits >= 2) return 1;
  return 0;
}

function emitCasualDialogue() {
  if (Math.random() < 0.2) {
    const historyLine = getDeathHistoryNarrativeLine();
    if (historyLine) {
      addLog(historyLine, { type: "dialogue" });
      return;
    }
  }
  const citySet = getCityDialogueSet();
  let line = inferResponsiveDialogue("general");
  if (!line) {
    line = citySet && Math.random() < 0.7
      ? pickDialogue(citySet.casual)
      : pickDialogue(NARRATIVE_DIALOGUES.casual);
  }
  if (state.faithTier >= 1 && Math.random() < 0.55) {
    line = inferResponsiveDialogue("faith")
      || pickDialogue(state.faithTier >= 2 ? NARRATIVE_DIALOGUES.faithTier2 : NARRATIVE_DIALOGUES.faithTier1);
  }
  if (line) addLog(line);
}

function triggerPersecutionWhisper(force = false) {
  if (!force && state.persecutionLevel < 2) return;
  const citySet = getCityDialogueSet();
  const pool = state.persecutionLevel >= 5 ? NARRATIVE_DIALOGUES.persecutionHigh : NARRATIVE_DIALOGUES.persecutionLow;
  if (force || Math.random() < clamp(0.18 + state.persecutionLevel * 0.08, 0.18, 0.72)) {
    const line = inferResponsiveDialogue("ominous")
      || (citySet && Math.random() < 0.65 ? pickDialogue(citySet.ominous) : pickDialogue(pool));
    if (line) addLog(line);
    notePlayerAction("ominous", 1);
  }
}

function progressFaithNarrative(sourceLabel) {
  state.faithVisits += 1;
  state.faithPoints = clamp(state.faithPoints + 1, 0, 999);
  const previousTier = state.faithTier;
  state.faithTier = currentFaithTierByVisits();

  if (state.faithTier > previousTier) {
    addLog(`Novo ciclo narrativo desbloqueado (${sourceLabel}): diálogos de fé se espalham pela cidade.`);
  }

  if (state.faithTier >= 1) {
    setPersecutionLevel(state.persecutionLevel + (state.faithTier >= 2 ? 2 : 1));
  }

  if (!state.religiousCareerThoughtsShown && state.faithVisits >= 25) {
    state.religiousCareerThoughtsShown = true;
    addLog("Após tantas idas à igreja, surge um pensamento insistente: abandonar o bisturi e seguir a carreira religiosa.", { type: "event" });
  }
  maybeNotifyPrayerUnlock();
}

function gainFaithPoints(amount, reason) {
  if (amount <= 0) return;
  state.faithPoints = clamp(state.faithPoints + amount, 0, 999);
  addLog(`Fé +${amount}: ${reason}. (Total: ${state.faithPoints})`);
}

function maybeGrantReligiousItem(sourceLabel) {
  const roll = Math.random();
  if (roll < 0.32) {
    state.rosaries += 1;
    gainFaithPoints(3, "o terço reforça sua disciplina espiritual");
    addLog(`Item religioso obtido (${sourceLabel}): Terço Antigo.`);
    maybeNotifyPrayerUnlock();
    return;
  }
  if (roll < 0.5) {
    state.sacredBibles += 1;
    gainFaithPoints(5, "a bíblia aprofunda sua devoção");
    addLog(`Item religioso obtido (${sourceLabel}): Bíblia Sagrada.`);
    maybeNotifyPrayerUnlock();
  }
}

function canUsePrayerForPatient() {
  return state.faithVisits >= 35 && state.confessions >= 1 && state.sacredBibles > 0 && state.rosaries > 0;
}

function maybeNotifyPrayerUnlock() {
  if (state.prayerUnlockedNotified) return;
  if (!canUsePrayerForPatient()) return;
  state.prayerUnlockedNotified = true;
  addLog("Novo recurso desbloqueado: Orar pelo paciente no hospital. A eficácia cresce com seus pontos de fé.", { type: "event" });
}

function getPrayerMiracleChance() {
  const itemBoost = (state.sacredBibles > 0 ? 0.04 : 0) + (state.rosaries > 0 ? 0.03 : 0);
  const faithBoost = state.faithPoints * 0.0026;
  const tierBoost = state.faithTier * 0.02;
  return clamp(0.04 + faithBoost + tierBoost + itemBoost, 0.04, 0.3);
}

function currentBenevolenceTierByFreeCare() {
  if (state.freeCareResolved >= 12) return 3;
  if (state.freeCareResolved >= 7) return 2;
  if (state.freeCareResolved >= 3) return 1;
  return 0;
}

function getDiscountByBenevolenceTier(tier) {
  if (tier >= 3) return 18;
  if (tier >= 2) return 12;
  if (tier >= 1) return 6;
  return 0;
}

function maybeProgressBenevolenceNarrative() {
  const previousTier = state.benevolenceTier;
  state.benevolenceTier = currentBenevolenceTierByFreeCare();
  state.shopDiscountPercent = getDiscountByBenevolenceTier(state.benevolenceTier);
  state.plagueTrendLevel = clamp(Math.floor(state.freeCareResolved / 2), 0, 10);

  if (state.benevolenceTier > previousTier) {
    addLog(`Reconhecimento de bem-feitoria desbloqueado: desconto de ${state.shopDiscountPercent}% nas lojas.`);
    const empathyPool = state.benevolenceTier >= 2 ? NARRATIVE_DIALOGUES.empathyTier2 : NARRATIVE_DIALOGUES.empathyTier1;
    addLog(inferResponsiveDialogue("empathy") || pickDialogue(empathyPool));
  } else if (state.benevolenceTier >= 1 && Math.random() < 0.35) {
    const empathyPool = state.benevolenceTier >= 2 ? NARRATIVE_DIALOGUES.empathyTier2 : NARRATIVE_DIALOGUES.empathyTier1;
    addLog(inferResponsiveDialogue("empathy") || pickDialogue(empathyPool));
  }
}

function maybeTriggerPlagueTrendInsight(force = false) {
  if (state.plagueTrendLevel < 2) return;
  const citySet = getCityDialogueSet();
  const chance = clamp(0.12 + state.plagueTrendLevel * 0.06, 0.12, 0.72);
  if (force || Math.random() < chance) {
    addLog(
      inferResponsiveDialogue("hospital")
      || (citySet && Math.random() < 0.6 ? pickDialogue(citySet.plague) : pickDialogue(NARRATIVE_DIALOGUES.plagueTrend))
    );
  }
}

function maybeTriggerLocalTransitionEvent() {
  // Evento raro durante deslocamento interno na cidade.
  if (Math.random() > 0.22) return;
  const citySet = getCityDialogueSet();
  const cityId = state.currentCityId;

  const roll = Math.random();
  if (roll < 0.38) {
    const coins = randomInt(1, 4);
    state.coins += coins;
    addLog(`Situação rara: você encontra ${coins} moeda${coins > 1 ? "s" : ""} caída${coins > 1 ? "s" : ""} na rua.`);
    return;
  }

  if (roll < 0.74) {
    const prophecyLine = citySet && Math.random() < 0.72
      ? pickDialogue(citySet.prophecy)
      : pickDialogue(NARRATIVE_DIALOGUES.localRare.prophecy);
    addLog(`Situação rara: ${prophecyLine}`);
    setPersecutionLevel(state.persecutionLevel + 1);
    return;
  }

  addLog(`Situação rara: ${NARRATIVE_DIALOGUES.localRare.childNote}`);
  setPersecutionLevel(state.persecutionLevel + 2);
  maybeTriggerPlagueTrendInsight(true);

  if (Math.random() < 0.28) {
    grantCitySpecificItem(cityId, "situação rara da cidade");
  }
}

function getChurchPopularityMultiplier() {
  // Retorno decrescente no mesmo dia para evitar farm de popularidade.
  return clamp(1 - (state.churchActionsToday - 1) * 0.18, 0.15, 1);
}

function applyChurchPopularity(baseGain, reason) {
  const multiplier = getChurchPopularityMultiplier();
  const applied = Math.round(baseGain * multiplier);
  if (applied > 0) {
    updatePopularity(applied, reason);
  } else {
    addLog("O público parece saturado de sermões hoje; sua influência quase não cresce.");
  }
  return applied;
}

function emitChurchDreadDialogue() {
  const count = state.churchActionsToday;
  if (count <= 2) return;

  let pool = NARRATIVE_DIALOGUES.churchDread.low;
  if (count >= 5) pool = NARRATIVE_DIALOGUES.churchDread.high;
  else if (count >= 3) pool = NARRATIVE_DIALOGUES.churchDread.mid;

  addLog(`Clima sombrio na igreja: ${pickDialogue(pool)}`);
  if (count >= 4) {
    setPersecutionLevel(state.persecutionLevel + 1);
  }
}

function getDiscountedPrice(basePrice) {
  const discountFactor = 1 - state.shopDiscountPercent / 100;
  return Math.max(1, Math.ceil(basePrice * discountFactor));
}

function updatePopularity(delta, reason) {
  state.popularity = clamp(state.popularity + delta, 0, 100);
  const signal = delta >= 0 ? "+" : "";
  addLog(`Popularidade ${signal}${delta}: ${reason}. (Atual: ${state.popularity})`);
  checkPhase1TransitionTrigger();
}

function getTreatmentChance(patient, tech) {
  let chance = tech.base;
  const stage = getPatientStage(patient);
  const affinity = patient.symptoms.some((s) => tech.bestFor.includes(s));

  chance += 0.08;
  if (affinity) chance += 0.12;
  if (stage.id === "critico") chance -= 0.04;
  if (stage.id === "remissao") chance += 0.06;
  if (patient.hp < 25) chance -= 0.03;
  if (state.treatmentBoostCharges > 0) chance += 0.1;

  return clamp(chance, 0.15, 0.93);
}

function getPlayerHealthState() {
  const ratio = state.playerLife / state.playerMaxLife;
  if (state.doctorInfected) return { label: "Com peste", level: "danger" };
  if (ratio <= 0.32) return { label: "Crítico", level: "danger" };
  if (ratio <= 0.65) return { label: "Atenção", level: "warn" };
  return { label: "Saudável", level: "good" };
}

function getPopularityState() {
  if (state.popularity <= 30) return { label: "Rejeitado", level: "danger" };
  if (state.popularity <= 65) return { label: "Instável", level: "warn" };
  return { label: "Respeitado", level: "good" };
}

function getMoneyState() {
  if (state.coins < 12) return { label: "Escasso", level: "danger" };
  if (state.coins < 30) return { label: "Moderado", level: "warn" };
  return { label: "Confortável", level: "good" };
}

function renderStats() {
  if (!globalStats || !hudObjectives || !hudTraitsInfo) return;
  const healthState = getPlayerHealthState();
  const popularityState = getPopularityState();
  const moneyState = getMoneyState();
  const city = getCurrentCity();
  const area = getAreaById(city, state.currentAreaId);
  const overnightText = getClockHour() >= 24 ? " (virou a noite sem dormir)" : "";
  if (hudDoctorName) hudDoctorName.textContent = getDoctorDisplayName();
  const coreStatsMarkup = [
    { text: `Dia ${state.day} - ${formatHour(state.dayClockMinutes)}${overnightText}`, level: "" },
    { text: `Saúde: ${state.playerLife}/${state.playerMaxLife} (${healthState.label})`, level: healthState.level },
    { text: `Popularidade: ${state.popularity}/100 (${popularityState.label})`, level: popularityState.level },
    { text: `Moedas: ${state.coins} (${moneyState.label})`, level: moneyState.level }
  ];
  globalStats.innerHTML = coreStatsMarkup
    .map((item) => `<div class="hud-item ${item.level}">${item.text}</div>`)
    .join("");

  const traitCategories = {
    "Fé": [
      `Religiosidade social: ${state.faithVisits} visitas (nível ${state.faithTier})`,
      `Pontos de fé: ${state.faithPoints}`,
      `Confissões com o padre: ${state.confessions}`,
      `Itens sagrados: Bíblia ${state.sacredBibles}, Terço ${state.rosaries}`,
      `Ações de fé hoje: ${state.churchActionsToday}`
    ],
    "Medicina": [
      `Casos: ${state.resolvedCases} | Curados: ${state.cured} | Óbitos: ${state.deaths}`,
      `Cidade/Área atual: ${city.name} / ${area ? area.name : state.currentAreaId}`
    ],
    "Social": [
      `Bem-feitoria: ${state.freeCareResolved} atendimentos gratuitos (nível ${state.benevolenceTier})`,
      `Desconto em lojas: ${state.shopDiscountPercent}%`,
      `Sensação de perseguição: ${state.persecutionLevel}/10`
    ],
    "Inteligência": [
      state.phase !== 1
        ? `Evidências: ${state.evidence}/100 | Exposição: ${state.suspicion}/100`
        : "Leitura de padrões: em observação."
    ]
  };
  const traitsMarkup = [
    ...traitCategories["Fé"],
    ...traitCategories["Medicina"],
    ...traitCategories["Social"],
    ...traitCategories["Inteligência"]
  ];
  hudTraitsInfo.innerHTML = traitsMarkup
    .map((line) => `<div class="hud-item">${line}</div>`)
    .join("");
  if (hudTraitsExpandModalList) hudTraitsExpandModalList.innerHTML = getHudTraitsCategorizedMarkup(traitCategories);

  const missionLines = getActiveMissions();
  hudObjectives.innerHTML = missionLines
    .map((mission) => `<div class="hud-item">${mission}</div>`)
    .join("");

  if (state.phase !== 1) {
    hudObjectives.innerHTML += `
      <div class="hud-item">Evidências: ${state.evidence}/100 | Exposição: ${state.suspicion}/100</div>
    `;
  }
  if (hudObjectivesExpandModalList) hudObjectivesExpandModalList.innerHTML = hudObjectives.innerHTML;
}

function renderPatientPanel() {
  if (state.phase !== 1) {
    patientInfo.innerHTML = "<p>Nenhum paciente nesta fase.</p>";
    return;
  }

  if (!state.currentPatient) {
    patientInfo.innerHTML = "<p>Aguardando novo paciente.</p>";
    return;
  }

  const p = state.currentPatient;
  const stage = getPatientStage(p);
  const stageClass = `status-${stage.id}`;
  const hpRatio = clamp(p.hp / 100, 0, 1);
  const hpPercent = Math.round(hpRatio * 100);
  const hpState = hpPercent <= 39 ? "Crítico" : hpPercent <= 69 ? "Moderado" : hpPercent <= 89 ? "Em remissão" : "Curado";
  const paymentInfo = p.canPay
    ? `Pode pagar: ${p.offeredPayment} moedas`
    : "Sem recursos: atendimento somente gratuito (se você aceitar)";
  const recurrenceInfo = p.isRecurring
    ? '<span class="tag current">Paciente recorrente</span>'
    : '<span class="tag">Primeiro atendimento</span>';

  patientInfo.innerHTML = `
    <div class="patient-grid">
      <article class="patient-block ${stageClass}">
        <p><strong>${p.name}</strong></p>
        <p>${recurrenceInfo}</p>
        <p>Estágio clínico: <strong>${stage.label}</strong></p>
        <p>Vida: ${Math.max(0, p.hp)} / 100 (${hpState})</p>
      </article>
      <article class="patient-block ${stageClass}">
        <p>Sintomas: ${p.symptoms.join(", ")}</p>
        <p>${paymentInfo}</p>
        <p>Pressão da peste: ${p.infectionPower}</p>
      </article>
      <article class="patient-block">
        <p>Severidade: ${p.severity}/100</p>
        <p>Tratamentos aplicados: ${p.treatmentCount}</p>
        <p>Vida gasta pelo médico neste paciente: ${p.doctorLifeSpent}</p>
      </article>
      <article class="patient-block">
        <p>Barra de vida</p>
        <p>
          <span style="display:block;height:10px;border:1px solid var(--border);border-radius:999px;overflow:hidden;">
            <span style="display:block;height:100%;width:${hpPercent}%;background:${hpPercent <= 39 ? "var(--danger)" : hpPercent <= 69 ? "var(--warn)" : "var(--ok)"};"></span>
          </span>
        </p>
      </article>
    </div>
  `;
}

function renderActiveEffects() {
  if (!activeEffects) return;
  const effects = [];
  if (state.treatmentBoostCharges > 0) effects.push(`Ervas Raras ativas (${state.treatmentBoostCharges})`);
  if (state.protectionCharges > 0) effects.push(`Manto Encerado ativo (${state.protectionCharges})`);
  if (state.precisionKitCharges > 0) effects.push(`Kit de Instrumentos ativo (${state.precisionKitCharges})`);
  if (state.doctorInfected) effects.push(`Peste ativa no médico (${state.doctorInfectionSeverity}/100)`);
  if (state.faithPromiseBroken) effects.push("Penitência quebrada: dívida com a morte");
  if (isMedicalVowActive()) effects.push("Penitência ativa: sem exercer medicina até o próximo descanso");
  if (state.rareBandageKits > 0) effects.push(`Kit de Bandagens Raras disponível (${state.rareBandageKits})`);
  if (state.sacredMedallions > 0) effects.push(`Medalhão Consagrado disponível (${state.sacredMedallions})`);
  if (state.alchemicalSerums > 0) effects.push(`Soro Alquímico disponível (${state.alchemicalSerums})`);
  if (state.sacredBibles > 0) effects.push(`Bíblia Sagrada em posse (${state.sacredBibles})`);
  if (state.rosaries > 0) effects.push(`Terço Antigo em posse (${state.rosaries})`);
  if (canUsePrayerForPatient()) effects.push("Oração por paciente desbloqueada");

  if (effects.length === 0) {
    activeEffects.innerHTML = '<div class="effect-item empty">Nenhum efeito ativo no momento.</div>';
    return;
  }

  activeEffects.innerHTML = effects.map((effect) => `<div class="effect-item">${effect}</div>`).join("");
}

function renderMaps() {
  const currentCity = getCurrentCity();
  if (mapMenuTitle) mapMenuTitle.textContent = `Mapa de ${currentCity.name}`;
  const currentArea = getAreaById(currentCity, state.currentAreaId);
  const canNavigate = canNavigateNow();
  const visibleAreas = currentCity.areas.filter((area) => isAreaVisible(area));
  const cityMapConfig = CITY_LOCAL_MAP_CONFIG[currentCity.id] || CITY_LOCAL_MAP_CONFIG.valedouro;
  const cityLayout = cityMapConfig.layout || {};
  const cityFallback = cityMapConfig.default || [];
  const cityConnections = cityMapConfig.connections || [];
  const cityDecorations = cityMapConfig.decorations || [];

  const localAreas = visibleAreas.map((area, idx) => {
    const unlocked = isAreaUnlocked(area);
    const isCurrentArea = area.id === state.currentAreaId;
    const moveDisabled = isCurrentArea || !unlocked || !canNavigate;
    const preset = cityLayout[area.id];
    const fallback = cityFallback[idx % cityFallback.length];
    const pos = preset || fallback;
    const areaStateClass = `${isCurrentArea ? "is-current" : ""} ${!unlocked ? "is-locked" : ""}`.trim();
    const safeName = String(area.name || "").replace(/"/g, "&quot;");
    const safeDesc = String(area.description || "").replace(/"/g, "&quot;");
    const areaIcon = CITY_AREA_ICONS[area.id] || "•";
    return `
      <button
        class="city-area-node ${areaStateClass}"
        data-map-action="move"
        data-area-id="${area.id}"
        data-area-name="${safeName}"
        data-area-desc="${safeDesc}"
        data-node-x="${pos.x}"
        data-node-y="${pos.y}"
        title="${safeName} - ${safeDesc}"
        style="left:${pos.x}%;top:${pos.y}%;"
        aria-label="${safeName}"
        ${moveDisabled ? "disabled" : ""}
      >
        <span class="city-node-icon" aria-hidden="true">${areaIcon}</span>
      </button>
    `;
  }).join("");
  const positionByAreaId = new Map();
  visibleAreas.forEach((area, idx) => {
    const preset = cityLayout[area.id];
    const fallback = cityFallback[idx % cityFallback.length];
    positionByAreaId.set(area.id, preset || fallback);
  });
  const roads = cityConnections
    .filter(([fromId, toId]) => positionByAreaId.has(fromId) && positionByAreaId.has(toId))
    .map(([fromId, toId]) => {
      const a = positionByAreaId.get(fromId);
      const b = positionByAreaId.get(toId);
      return `<line x1="${a.x}%" y1="${a.y}%" x2="${b.x}%" y2="${b.y}%"></line>`;
    })
    .join("");
  const decorations = cityDecorations
    .map((entry) => `
      <div
        class="city-map-deco ${entry.kind || "district"}"
        style="left:${entry.x}%;top:${entry.y}%;width:${entry.w}%;height:${entry.h}%;"
        title="${String(entry.label || "").replace(/"/g, "&quot;")}"
        aria-hidden="true"
      >
        <span>${entry.label || ""}</span>
      </div>
    `)
    .join("");
  cityMapInfo.innerHTML = `
    <article class="map-item city-map-card">
      <div class="city-map-board ${cityMapConfig.boardClass || ""}">
        <svg class="city-map-roads" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          ${roads}
        </svg>
        ${decorations}
        ${localAreas}
        <div id="cityMapPointLabel" class="city-map-point-label hidden"></div>
      </div>
      <p id="cityMapHoverText" class="city-map-hover-text">Selecione uma área para se deslocar.</p>
    </article>
  `;

  if (!currentArea) {
    resetActionMenuContext();
    state.currentAreaId = "hospital";
  }
}

function moveToArea(areaId) {
  if (!canNavigateNow()) return;
  if (state.currentPatient && state.currentPatient.active) {
    addLog("Você está em atendimento e não pode sair da área agora.");
    return;
  }

  const city = getCurrentCity();
  const area = getAreaById(city, areaId);
  if (!area || !isAreaVisible(area)) return;
  if (!isAreaUnlocked(area)) {
    addLog(`${area.name} está bloqueada nesta fase.`);
    return;
  }

  if (state.currentAreaId !== area.id) {
    resetActionMenuContext();
  }
  state.currentAreaId = area.id;
  if (area.id === "estabulo") {
    maybeUpdateStableHandlerOnEntry(state.currentCityId);
  }
  if (area.id === "residencial") {
    getResidentialCityIntel(state.currentCityId);
    state.residentialSelectedHouseId = "";
  }
  if (area.id !== "loja") closeTradePopup();
  resetShopMenuState();
  if (area.id === "estabulo") playStableHorseSound();
  if (area.id !== "igreja") {
    state.churchInsistenceAtMaxPersecution = 0;
    state.churchDreadManifestLevel = 0;
  }
  notePlayerAction("move-area", 0.5);
  if (!isShopArea()) state.shopOpen = false;
  addLog(`Você se deslocou para: ${area.name} em ${city.name}.`);
  maybeTriggerLocalTransitionEvent();
  if (Math.random() < 0.45) emitCasualDialogue();
  if (state.faithTier >= 2) triggerPersecutionWhisper();
  if (state.benevolenceTier >= 2) maybeTriggerPlagueTrendInsight();
  maybeQueueDialogueResponse("street");
  maybeShowAreaTutorial(area.id);
  if (area.id === "hospital") {
    showAmbulatoryReportPopupForCity(state.currentCityId);
    showCorpseDisposalPopup(state.currentCityId);
  }
  render();
}

function travelToCity(cityId) {
  if (!canTravelNow()) {
    if (!isStableArea()) {
      addLog("Você precisa estar no estábulo para viajar.");
    }
    return;
  }
  if (!isStableArea()) {
    addLog("Você precisa estar no estábulo para viajar.");
    return;
  }
  if (cityId === state.currentCityId) return;
  const travelCost = getTravelCost();
  if (state.phase === 1 && state.coins < travelCost) {
    addLog(`Moedas insuficientes para viajar. Custo atual: ${travelCost} moedas.`);
    return;
  }

  const destination = getCityById(cityId);
  if (state.phase === 1) {
    state.coins -= travelCost;
    addLog(`Viagem contratada com o carroceiro: -${travelCost} moedas.`);
  }
  playTravelGallopSound();
  state.currentCityId = destination.id;
  state.mapSelectedCityId = destination.id;
  if (state.currentAreaId !== "estabulo") {
    resetActionMenuContext();
  }
  state.currentAreaId = "estabulo";
  maybeUpdateStableHandlerOnEntry(state.currentCityId);
  closeTradePopup();
  resetShopMenuState();
  notePlayerAction("travel-city", 1);
  state.shopOpen = false;
  addLog(`Viagem concluída. Você chegou em ${destination.name}.`);
  triggerTravelTransitionScene(destination);
  emitCasualDialogue();
  triggerPersecutionWhisper();
  maybeTriggerPlagueTrendInsight();
  maybeQueueDialogueResponse("travel");
  maybeShowAreaTutorial("estabulo");
  render();
}

function triggerTravelTransitionScene(destination) {
  if (Math.random() > 0.55) return;

  const merchantChance = 0.48;
  if (Math.random() < merchantChance) {
    const rareItem = RARE_TRAVEL_ITEMS[randomInt(0, RARE_TRAVEL_ITEMS.length - 1)];
    const surge = randomInt(0, 6);
    const price = rareItem.basePrice + surge;
    state.travelEncounter = {
      type: "merchant",
      destinationName: destination.name,
      offerItemId: rareItem.id,
      offerPrice: price
    };
    addLog(`No caminho para ${destination.name}, um caixeiro viajante oferece um item raro: ${rareItem.name}.`);
    return;
  }

  const sceneRoll = Math.random();
  if (sceneRoll < 0.34) {
    const lostTime = randomInt(24, 46);
    state.dayClockMinutes += lostTime;
    addLog(`Transição inusitada: uma ponte cede e você perde ${lostTime} minutos na rota.`);
  } else if (sceneRoll < 0.67) {
    const coins = randomInt(4, 10);
    state.coins += coins;
    addLog(`Transição inusitada: viajantes agradecidos pagam ${coins} moedas por um socorro rápido na estrada.`);
  } else {
    setPersecutionLevel(state.persecutionLevel + 1);
    addLog("Transição inusitada: um homem delirante aponta a estrada e fala sobre sacos de peste ao anoitecer.");
  }
}

if (worldMapInfo) {
  worldMapInfo.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.dataset.mapAction !== "travel" && target.dataset.mapAction !== "select-city") return;
    const cityId = target.dataset.cityId;
    if (!cityId) return;
    if (target.dataset.mapAction === "select-city") {
      state.mapSelectedCityId = cityId;
      addLog(`Mapa local aberto para ${getCityById(cityId).name}.`, { type: "event" });
      render();
      return;
    }
    travelToCity(cityId);
  });
}

cityMapInfo.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const actionNode = target.closest("[data-map-action]");
  if (!(actionNode instanceof HTMLElement)) return;
  if (actionNode.dataset.mapAction === "move") {
    const areaId = actionNode.dataset.areaId;
    if (!areaId) return;
    moveToArea(areaId);
    return;
  }
  if (actionNode.dataset.mapAction === "travel-selected") {
    const cityId = actionNode.dataset.cityId;
    if (!cityId) return;
    travelToCity(cityId);
  }
});

cityMapInfo.addEventListener("mouseover", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const areaNode = target.closest(".city-area-node");
  if (!(areaNode instanceof HTMLElement)) return;
  const hoverText = cityMapInfo.querySelector("#cityMapHoverText");
  if (!(hoverText instanceof HTMLElement)) return;
  const pointLabel = cityMapInfo.querySelector("#cityMapPointLabel");
  const x = Number(areaNode.dataset.nodeX || "0");
  const y = Number(areaNode.dataset.nodeY || "0");
  const areaName = areaNode.dataset.areaName || "Área";
  const areaDesc = areaNode.dataset.areaDesc || "";
  hoverText.textContent = `${areaName}: ${areaDesc}`;
  if (pointLabel instanceof HTMLElement) {
    pointLabel.textContent = areaName;
    pointLabel.style.left = `${x + 3}%`;
    pointLabel.style.top = `${Math.max(6, y - 4)}%`;
    pointLabel.classList.remove("hidden");
  }
});

cityMapInfo.addEventListener("focusin", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const areaNode = target.closest(".city-area-node");
  if (!(areaNode instanceof HTMLElement)) return;
  const hoverText = cityMapInfo.querySelector("#cityMapHoverText");
  if (!(hoverText instanceof HTMLElement)) return;
  const pointLabel = cityMapInfo.querySelector("#cityMapPointLabel");
  const x = Number(areaNode.dataset.nodeX || "0");
  const y = Number(areaNode.dataset.nodeY || "0");
  const areaName = areaNode.dataset.areaName || "Área";
  const areaDesc = areaNode.dataset.areaDesc || "";
  hoverText.textContent = `${areaName}: ${areaDesc}`;
  if (pointLabel instanceof HTMLElement) {
    pointLabel.textContent = areaName;
    pointLabel.style.left = `${x + 3}%`;
    pointLabel.style.top = `${Math.max(6, y - 4)}%`;
    pointLabel.classList.remove("hidden");
  }
});

cityMapInfo.addEventListener("mouseleave", () => {
  const hoverText = cityMapInfo.querySelector("#cityMapHoverText");
  const pointLabel = cityMapInfo.querySelector("#cityMapPointLabel");
  if (!(hoverText instanceof HTMLElement)) return;
  hoverText.textContent = "Selecione uma área para se deslocar.";
  if (pointLabel instanceof HTMLElement) {
    pointLabel.classList.add("hidden");
  }
});

cityMapInfo.addEventListener("focusout", () => {
  const active = document.activeElement;
  if (active instanceof HTMLElement && active.closest("#cityMapInfo .city-area-node")) return;
  const pointLabel = cityMapInfo.querySelector("#cityMapPointLabel");
  if (pointLabel instanceof HTMLElement) {
    pointLabel.classList.add("hidden");
  }
});

function getInventoryQuantity(itemId) {
  if (itemId === "rare-herbs") return state.treatmentBoostCharges;
  if (itemId === "waxed-cloak") return state.protectionCharges;
  if (itemId === "tonic") return state.tonics;
  if (itemId === "precision-kit") return state.precisionKitCharges;
  if (itemId === "anti-plague-potion") return state.antiPlaguePotions;
  if (itemId === "rare-bandage-kit") return state.rareBandageKits;
  if (itemId === "sacred-medallion") return state.sacredMedallions;
  if (itemId === "alchemical-serum") return state.alchemicalSerums;
  if (itemId === "mask-ball-invite") return state.maskInvitations;
  if (itemId === "valedouro-seal") return state.valedouroSeals;
  if (itemId === "brumasul-coral") return state.brumasulCorals;
  if (itemId === "pedrafria-shard") return state.pedrafriaShards;
  if (itemId === "black-council-seal") return state.blackCouncilSeals;
  if (itemId === "onyx-key") return state.onyxKeys;
  if (itemId === "pale-ampoule") return state.paleAmpoules;
  if (itemId === "sacred-bible") return state.sacredBibles;
  if (itemId === "rosary") return state.rosaries;
  return 0;
}

function getQuantityLabel(itemId) {
  if (itemId === "tonic" || itemId === "anti-plague-potion" || itemId === "alchemical-serum") return "frascos";
  if (itemId === "rare-bandage-kit") return "kits";
  if (itemId === "sacred-medallion") return "medalhões";
  if (itemId === "sacred-bible") return "volumes";
  if (itemId === "rosary") return "unidades";
  if (itemId === "mask-ball-invite") return "convite";
  if (itemId === "valedouro-seal" || itemId === "brumasul-coral" || itemId === "pedrafria-shard" || itemId === "black-council-seal" || itemId === "onyx-key" || itemId === "pale-ampoule") return "unidades";
  return "cargas";
}

function getInventoryCompactMarkup(collected) {
  if (!collected.length) {
    return "<p>Nenhum item coletado ainda. Compre na loja ou receba recompensas.</p>";
  }
  return collected
    .map(
      (item) => `
      <article class="inventory-item">
        <p><strong>${item.name}</strong> - Quantidade: ${item.quantity} ${getQuantityLabel(item.id)}</p>
      </article>
    `
    )
    .join("");
}

function getInventoryFullMarkup(collected) {
  if (!collected.length) {
    return "<p>Nenhum item coletado ainda. Compre na loja ou receba recompensas.</p>";
  }
  return collected
    .map(
      (item) => `
      <article class="inventory-item">
        <p><strong>${item.name}</strong> - Quantidade: ${item.quantity} ${getQuantityLabel(item.id)}</p>
        <p>Valor: ${item.price || item.basePrice || item.value || "-"} moedas</p>
        <p>${item.cityId ? `Origem: ${getCityById(item.cityId).name}` : "Origem: comércio e coleta"}</p>
        <p>Utilidade: ${item.utility}</p>
        <p>Descrição: ${item.description}</p>
      </article>
    `
    )
    .join("");
}

function renderInventory() {
  if (!inventoryInfo) return;
  const allItems = [...shopItems, ...RARE_TRAVEL_ITEMS, ...CITY_SPECIFIC_ITEMS, ...MASK_BALL_ITEMS, ...RELIGIOUS_ITEMS];
  const collected = allItems
    .map((item) => ({
      ...item,
      quantity: getInventoryQuantity(item.id)
    }))
    .filter((item) => item.quantity > 0);

  inventoryInfo.innerHTML = getInventoryCompactMarkup(collected);
  if (inventoryPopupList) inventoryPopupList.innerHTML = getInventoryFullMarkup(collected);
  if (inventoryExpandModalList) inventoryExpandModalList.innerHTML = getInventoryFullMarkup(collected);
}

function findRareTravelItem(itemId) {
  return RARE_TRAVEL_ITEMS.find((item) => item.id === itemId) || null;
}

function findCitySpecificItemByCityId(cityId) {
  return CITY_SPECIFIC_ITEMS.find((item) => item.cityId === cityId) || null;
}

function grantCitySpecificItem(cityId, sourceLabel = "exploração") {
  const item = findCitySpecificItemByCityId(cityId);
  if (!item) return false;
  if (item.id === "valedouro-seal") state.valedouroSeals += 1;
  if (item.id === "brumasul-coral") state.brumasulCorals += 1;
  if (item.id === "pedrafria-shard") state.pedrafriaShards += 1;
  addLog(`Item da cidade encontrado (${sourceLabel}): ${item.name}.`, { type: "event" });
  return true;
}

function buyFromTravelMerchant() {
  if (!state.travelEncounter || state.travelEncounter.type !== "merchant") return;
  const item = findRareTravelItem(state.travelEncounter.offerItemId);
  if (!item) {
    state.travelEncounter = null;
    render();
    return;
  }
  if (state.coins < state.travelEncounter.offerPrice) {
    addLog("Moedas insuficientes para comprar o item raro do caixeiro viajante.");
    return;
  }

  state.coins -= state.travelEncounter.offerPrice;
  playPurchaseSound();
  item.add(state);
  addLog(`Compra rara concluída: ${item.name} por ${state.travelEncounter.offerPrice} moedas.`);
  state.travelEncounter = null;
  render();
}

function declineTravelMerchant() {
  if (!state.travelEncounter) return;
  addLog("Você recusa a oferta do caixeiro viajante e segue viagem.");
  state.travelEncounter = null;
  render();
}

function useRareBandageKit() {
  if (state.rareBandageKits <= 0 || state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  state.rareBandageKits -= 1;
  state.treatmentBoostCharges += 4;
  state.precisionKitCharges += 1;
  addLog("Kit de Bandagens Raras usado: +4 cargas de eficácia e +1 de precisão.");
  render();
}

function useSacredMedallion() {
  if (state.sacredMedallions <= 0 || state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  state.sacredMedallions -= 1;
  state.protectionCharges += 8;
  addLog("Medalhão Consagrado ativado: +8 cargas de proteção.");
  render();
}

function useAlchemicalSerum() {
  if (state.alchemicalSerums <= 0 || state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  state.alchemicalSerums -= 1;
  state.playerLife = clamp(state.playerLife + 12, 0, state.playerMaxLife);
  if (state.doctorInfected) {
    state.doctorInfectionSeverity = clamp(state.doctorInfectionSeverity - 30, 0, 100);
    if (state.doctorInfectionSeverity <= 0) cureDoctorPlague("soro alquímico");
  }
  addLog("Soro Alquímico utilizado: +12 de vida e forte contenção da peste.");
  render();
}

function tickRelapses() {
  state.relapseQueue.forEach((item) => {
    item.daysUntilReturn -= 1;
  });
}

function popDueRelapse() {
  const index = state.relapseQueue.findIndex((item) => item.daysUntilReturn <= 0);
  if (index === -1) return null;
  const [relapse] = state.relapseQueue.splice(index, 1);
  return relapse;
}

function nextPatient() {
  if (isMedicalVowActive()) {
    addLog("Penitência ativa: você prometeu não exercer a medicina até o próximo descanso.");
    return;
  }
  if (state.triageReferrals.length > 0) {
    const referred = state.triageReferrals.shift();
    const cityHosp = getCityHospitalState(state.currentCityId);
    if (cityHosp.pendingTriageEscort && cityHosp.pendingTriageEscort.triageSource === referred.triageSource) {
      referred.triageEscorted = true;
      cityHosp.pendingTriageEscort.status = "called";
      if (cityHosp.pendingTriageEscort.nurseId) {
        setTriageNurseStatus(cityHosp.pendingTriageEscort.nurseId, "idle");
      }
    }
    state.currentPatient = referred;
    state.dayAttendances += 1;
    addLog(`Paciente da triagem chegou ao hospital: ${state.currentPatient.name}.`, { type: "event" });
    addLog(`${state.currentPatient.name} aguarda condução clínica imediata.`);
    if (state.currentPatient.canPay) {
      addLog(`${state.currentPatient.name} pode remunerar o atendimento com ${state.currentPatient.offeredPayment} moedas.`);
    } else {
      addLog(`${state.currentPatient.name} não possui recursos. Decida se fará atendimento gratuito.`);
    }
    maybeQueueDialogueResponse("hospital");
    return;
  }
  const dueRelapse = popDueRelapse();

  if (dueRelapse) {
    state.currentPatient = createPatient(true, dueRelapse.originalName);
    state.relapses += 1;
    updatePopularity(-2, `${state.currentPatient.name} retornou com recaída`);
    addLog(`Paciente recorrente identificado: recaída confirmada de ${dueRelapse.originalName}.`, { type: "event" });
    addLog(`${dueRelapse.originalName}: "Doutor(a), eu voltei... a febre nunca foi embora por completo."`, { type: "dialogue" });
    addLog(`${getDoctorDisplayName()}: "Você fez bem em retornar. Vamos retomar o tratamento imediatamente."`, { type: "dialogue" });
    queueRecurringPatientDialogue(dueRelapse.originalName);
  } else {
    state.currentPatient = createPatient(false);
    addLog(`${state.currentPatient.name} chegou ao hospital com quadro inicial grave.`);
  }

  if (state.currentPatient.canPay) {
    addLog(`${state.currentPatient.name} pode remunerar o atendimento com ${state.currentPatient.offeredPayment} moedas.`);
  } else {
    addLog(`${state.currentPatient.name} não possui dinheiro nem bens. Você decide se aceita atendimento gratuito.`);
  }

  if (state.faithTier >= 1 && Math.random() < clamp(0.18 + state.faithTier * 0.12, 0.2, 0.6)) {
    addLog(inferResponsiveDialogue("faith") || pickDialogue(NARRATIVE_DIALOGUES.hospitalFaith));
  }
  if (state.benevolenceTier >= 1 && Math.random() < clamp(0.2 + state.benevolenceTier * 0.12, 0.22, 0.68)) {
    const empathyPool = state.benevolenceTier >= 2 ? NARRATIVE_DIALOGUES.empathyTier2 : NARRATIVE_DIALOGUES.empathyTier1;
    addLog(inferResponsiveDialogue("empathy") || pickDialogue(empathyPool));
  }
  maybeTriggerPlagueTrendInsight();
  if (Math.random() < 0.35) {
    emitCasualDialogue();
  }
  triggerPersecutionWhisper();
  maybeQueueDialogueResponse("hospital");
}

function summonNextPatient() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (!isClinicalArea()) {
    addLog("Só é possível chamar pacientes no Hospital.");
    return;
  }
  if (isMedicalVowActive()) {
    addLog("Penitência ativa: você não pode exercer medicina até o próximo descanso.");
    return;
  }
  if (state.currentPatient && state.currentPatient.active) {
    addLog("Já existe um atendimento em andamento.");
    return;
  }
  nextPatient();
  if (state.currentPatient && state.currentPatient.active && !state.currentPatient.needsFreeCareDecision) {
    setActionMenuSectionForCurrentArea("tratamentos");
  } else {
    setActionMenuSectionForCurrentArea("consultorio");
  }
  hospitalMiniOnSummon();
  render();
}

function checkPhase1GameOver() {
  if (state.playerLife > 0) return false;
  if (state.phase1Failed) return true;

  state.phase1Failed = true;
  registerDoctorDeathHistory();
  actions.innerHTML = "";
  addLog("Sem forças para continuar. O médico colapsa no plantão.");
  addLog("Fim de jogo: sua vida chegou a 0.");
  addLog("Nunca mais o amanhecer.", { type: "death" });
  showFinalDeathOverlay();
  renderStats();
  return true;
}

function maybeGrantEffortReward(patient) {
  if (patient.doctorLifeSpent <= 10) return;

  updatePopularity(4, `o esforço de ${patient.doctorLifeSpent} pontos de vida foi reconhecido`);
  if (Math.random() < 0.45) {
    state.tonics += 1;
    addLog("Familiares próximos entregam um tônico restaurador em agradecimento.");
  }
}

function receivePatientPayment(patient, result) {
  if (!patient.canPay) return;
  if (result === "abandon") return;

  let payment = patient.offeredPayment;
  if (result === "cured") payment += randomInt(1, 3);
  if (result === "death") payment = Math.max(state.minPatientPayment, payment - randomInt(0, 2));
  if (result === "released") payment = Math.max(state.minPatientPayment, payment - randomInt(0, 1));

  const finalPayment = Math.max(state.minPatientPayment, payment);
  state.coins += finalPayment;
  playCoinSound();
  addLog(`Remuneração recebida: +${finalPayment} moedas.`);
}

function getPatientStageIdByHp(hpValue) {
  const hp = clamp(hpValue, 0, 100);
  return CLINICAL_STAGES.find((s) => hp >= s.minHp && hp <= s.maxHp)?.id || "critico";
}

function getStageLabelById(stageId) {
  return CLINICAL_STAGES.find((s) => s.id === stageId)?.label || "Crítico";
}

function addAmbulatoryReportEvent(cityId, text) {
  const cityHosp = getCityHospitalState(cityId);
  cityHosp.reportEvents.push(text);
  if (cityHosp.reportEvents.length > 24) {
    cityHosp.reportEvents = cityHosp.reportEvents.slice(cityHosp.reportEvents.length - 24);
  }
}

function transferPatientToAmbulatory() {
  if (!state.currentPatient || !state.currentPatient.active) return false;
  const cityHosp = getCityHospitalState(state.currentCityId);
  if (cityHosp.ambulatory.length >= 4) {
    addLog("Ambulatório lotado (4/4). Libere uma vaga para isolar outro paciente.");
    return false;
  }

  const p = state.currentPatient;
  const stageAtAdmission = getPatientStage(p).id;
  const ambPatient = {
    ambId: cityHosp.nextAmbulatoryId++,
    cityId: state.currentCityId,
    name: p.name,
    hp: p.hp,
    severity: p.severity,
    infectionPower: p.infectionPower,
    symptoms: [...p.symptoms],
    canPay: p.canPay,
    offeredPayment: p.offeredPayment,
    treatmentCount: p.treatmentCount,
    doctorLifeSpent: p.doctorLifeSpent,
    freeCareAccepted: !!p.freeCareAccepted,
    isRecurring: !!p.isRecurring,
    triageSource: p.triageSource || "",
    admittedDay: state.day,
    admittedMinute: getClockMinutesOfDay(state.dayClockMinutes),
    terminalBoost: stageAtAdmission === "critico",
    canRelease: false,
    resolved: false,
    lastDailyDelta: 0,
    lastDailyStageFrom: stageAtAdmission,
    lastDailyStageTo: stageAtAdmission,
    lastDailyNote: "Aguardando primeira evolução diária.",
    enhancedCare: false,
    enhancedCareSinceDay: -1
  };
  cityHosp.ambulatory.push(ambPatient);
  addAmbulatoryReportEvent(
    state.currentCityId,
    `${ambPatient.name} foi encaminhado ao ambulatório (${stageAtAdmission}).`
  );
  addLog(`${ambPatient.name} foi encaminhado ao ambulatório para isolamento e repouso.`);
  state.currentPatient = null;
  if (isHospitalMiniMapScenario()) {
    removeHospitalActivePatientEntity();
    hospitalSetMode("doctor-return", 0.8);
    syncHospitalAmbulatoryEntities();
  }
  return true;
}

function resolveAmbulatoryDeathVisual(cityId) {
  const cityMini = getCityMiniState(cityId);
  cityMini.hospital.corpseCount = clamp((cityMini.hospital.corpseCount || 0) + 1, 0, 24);
  if (isHospitalMiniMapScenario() && cityId === state.currentCityId) {
    showCorpseDisposalPopup(cityId);
  }
  if (!isHospitalMiniMapScenario() || cityId !== state.currentCityId) return;
  ensureMiniMapScene();
  const corpseFlowBusy = ["dead-inert", "nurse-carry"].includes(state.miniMapHospital.activeMode || "");
  if (corpseFlowBusy) return;
  const corpse = createMiniMapEntity("corpse", HOSPITAL_MINI_ZONES.ambulatory.x, HOSPITAL_MINI_ZONES.ambulatory.y, {
    tag: "corpse-transit",
    variant: "dead",
    scripted: true,
    vx: 0,
    vy: 0
  });
  state.miniMapEntities.push(corpse);
  hospitalSetMode("dead-inert", 0.8);
}

function processAmbulatoryTurnForPatient(ambPatient, careBoostActive = false) {
  const baseRecovery = ambPatient.terminalBoost ? 0.8 : 0.6;
  const severityFactor = clamp((ambPatient.severity - 45) / 90, -0.2, 0.24);
  const damageChance = clamp(0.3 + severityFactor * 0.5, 0.2, 0.52);
  const recoveryBonus = careBoostActive ? 0.3 : 0;
  const recoveryChance = clamp(baseRecovery - severityFactor * 0.25 + recoveryBonus, 0.4, 0.96);
  const roll = Math.random();

  if (roll < recoveryChance) {
    const hpGain = randomInt(7, ambPatient.terminalBoost ? 18 : 14);
    const sevDrop = randomInt(7, ambPatient.terminalBoost ? 18 : 13);
    ambPatient.hp = clamp(ambPatient.hp + hpGain, 0, 100);
    ambPatient.severity = clamp(ambPatient.severity - sevDrop, 0, 100);
  } else if (roll < recoveryChance + damageChance) {
    const hpLoss = randomInt(6, 16);
    const sevUp = randomInt(6, 14);
    ambPatient.hp = clamp(ambPatient.hp - hpLoss, 0, 100);
    ambPatient.severity = clamp(ambPatient.severity + sevUp, 0, 100);
  } else {
    // Estável, com pequenas oscilações
    ambPatient.hp = clamp(ambPatient.hp + randomInt(-3, 5), 0, 100);
    ambPatient.severity = clamp(ambPatient.severity + randomInt(-3, 4), 0, 100);
  }

  const pressure = Math.max(1, Math.floor(ambPatient.infectionPower / 2.4));
  ambPatient.hp = clamp(ambPatient.hp - randomInt(0, Math.max(1, pressure - 1)), 0, 100);
  ambPatient.severity = clamp(ambPatient.severity + randomInt(0, Math.max(1, pressure)), 0, 100);
}

function canAmbulatoryRelease(ambPatient) {
  const daysElapsed = state.day - ambPatient.admittedDay;
  return daysElapsed >= 1 && getPatientStageIdByHp(ambPatient.hp) === "remissao";
}

function processCityAmbulatoryTurns(cityId, forceAll = false) {
  const cityHosp = getCityHospitalState(cityId);
  const absoluteNow = getAbsoluteGameMinutes();
  const currentCycle = getAmbulatoryCycleIndex(absoluteNow);

  // Migração de saves antigos que guardavam minuto absoluto.
  if (Number.isFinite(cityHosp.turnCursorMinute) && cityHosp.turnCursorMinute > 20000) {
    cityHosp.turnCursorMinute = getAmbulatoryCycleIndex(cityHosp.turnCursorMinute);
  }
  if (!Number.isFinite(cityHosp.turnCursorMinute)) {
    cityHosp.turnCursorMinute = currentCycle;
  }

  if (!cityHosp.ambulatory.length) {
    if (!forceAll && currentCycle > cityHosp.turnCursorMinute) {
      cityHosp.turnCursorMinute = currentCycle;
      cityHosp.reportPending = true;
      addAmbulatoryReportEvent(cityId, `#Dia ${state.day}: sem internados no ambulatório.`);
    }
    return;
  }

  let turns = 0;
  const cyclesToRun = forceAll ? 1 : Math.max(0, currentCycle - cityHosp.turnCursorMinute);
  while (turns < cyclesToRun) {
    cityHosp.turnCursorMinute += 1;
    turns += 1;
    const beforeCount = cityHosp.ambulatory.length;
    let deathsInTurn = 0;
    let curedInTurn = 0;
    const survivors = [];
    cityHosp.ambulatory.forEach((ambPatient) => {
      const prevHp = ambPatient.hp;
      const prevStage = getPatientStageIdByHp(ambPatient.hp);
      let careBoostActive = false;
      if (ambPatient.enhancedCare) {
        if (state.coins >= AMBULATORY_ENHANCED_CARE_DAILY_COST) {
          state.coins -= AMBULATORY_ENHANCED_CARE_DAILY_COST;
          careBoostActive = true;
          addAmbulatoryReportEvent(
            cityId,
            `${ambPatient.name}: cuidados reforçados mantidos (-${AMBULATORY_ENHANCED_CARE_DAILY_COST} moedas).`
          );
        } else {
          ambPatient.enhancedCare = false;
          ambPatient.enhancedCareSinceDay = -1;
          addAmbulatoryReportEvent(
            cityId,
            `${ambPatient.name}: cuidados reforçados suspensos por falta de moedas.`
          );
        }
      }
      processAmbulatoryTurnForPatient(ambPatient, careBoostActive);
      const stageId = getPatientStageIdByHp(ambPatient.hp);
      const deltaHp = ambPatient.hp - prevHp;
      ambPatient.canRelease = canAmbulatoryRelease(ambPatient);
      ambPatient.lastDailyDelta = deltaHp;
      ambPatient.lastDailyStageFrom = prevStage;
      ambPatient.lastDailyStageTo = stageId;
      if (ambPatient.hp <= 0) {
        ambPatient.lastDailyNote = "Óbito durante isolamento.";
        addAmbulatoryReportEvent(cityId, `${ambPatient.name} foi a óbito no ambulatório.`);
        resolveAmbulatoryDeathVisual(cityId);
        registerTriagePatientOutcome(ambPatient.triageSource, "death", ambPatient.name);
        state.deaths += 1;
        state.resolvedCases += 1;
        updatePopularity(-3, `${ambPatient.name} foi a óbito no ambulatório`);
        maybeGrantEffortReward(ambPatient);
        deathsInTurn += 1;
        return;
      }
      if (stageId === "curado") {
        ambPatient.lastDailyNote = "Recuperação completa.";
        addAmbulatoryReportEvent(cityId, `${ambPatient.name} se curou no ambulatório.`);
        registerTriagePatientOutcome(ambPatient.triageSource, "cured", ambPatient.name);
        state.cured += 1;
        state.resolvedCases += 1;
        updatePopularity(6, `${ambPatient.name} foi curado no ambulatório`);
        receivePatientPayment(ambPatient, "cured");
        curedInTurn += 1;
        return;
      }
      if (stageId !== prevStage) {
        const fromLabel = CLINICAL_STAGES.find((s) => s.id === prevStage)?.label || prevStage;
        const toLabel = CLINICAL_STAGES.find((s) => s.id === stageId)?.label || stageId;
        addAmbulatoryReportEvent(cityId, `${ambPatient.name}: ${fromLabel} -> ${toLabel}.`);
      }
      if (ambPatient.canRelease) {
        ambPatient.lastDailyNote = "Atingiu remissão. Elegível para alta.";
        addAmbulatoryReportEvent(cityId, `${ambPatient.name} atingiu remissão e pode receber alta.`);
      } else if (Math.abs(ambPatient.hp - prevHp) >= 6) {
        const trend = ambPatient.hp > prevHp ? "melhora" : "piora";
        ambPatient.lastDailyNote = trend === "melhora" ? "Resposta clínica favorável." : "Queda clínica significativa.";
        addAmbulatoryReportEvent(cityId, `${ambPatient.name} apresentou ${trend} (${Math.round(prevHp)} -> ${Math.round(ambPatient.hp)} vida).`);
      } else {
        ambPatient.lastDailyNote = "Oscilação leve; manter observação.";
      }
      survivors.push(ambPatient);
    });
    cityHosp.ambulatory = survivors;
    const afterCount = cityHosp.ambulatory.length;
    addAmbulatoryReportEvent(
      cityId,
      `#Dia ${state.day}: internados ${beforeCount} -> ${afterCount} | Curas: ${curedInTurn} | Óbitos: ${deathsInTurn}.`
    );
  }
  if (turns > 0) cityHosp.reportPending = true;
}

function processAllAmbulatoryTurns() {
  WORLD_MAP.forEach((city) => {
    processCityAmbulatoryTurns(city.id);
  });
}

function activateAmbulatoryEnhancedCare(cityId, ambId) {
  const cityHosp = getCityHospitalState(cityId);
  const ambPatient = cityHosp.ambulatory.find((item) => item.ambId === ambId);
  if (!ambPatient) return false;
  const daysInAmb = Math.max(0, state.day - ambPatient.admittedDay);
  if (daysInAmb < 3) {
    addLog("Cuidados reforçados só podem ser ativados após 3 dias no ambulatório.");
    return false;
  }
  if (ambPatient.enhancedCare) {
    addLog(`Cuidados reforçados já estão ativos para ${ambPatient.name}.`);
    return false;
  }
  if (state.coins < AMBULATORY_ENHANCED_CARE_DAILY_COST) {
    addLog(`Moedas insuficientes para ativar cuidados reforçados (${AMBULATORY_ENHANCED_CARE_DAILY_COST} moedas).`);
    return false;
  }
  state.coins -= AMBULATORY_ENHANCED_CARE_DAILY_COST;
  ambPatient.enhancedCare = true;
  ambPatient.enhancedCareSinceDay = state.day;
  addAmbulatoryReportEvent(cityId, `${ambPatient.name} recebeu reforço de cuidados (-${AMBULATORY_ENHANCED_CARE_DAILY_COST} moedas/dia).`);
  addLog(`Cuidados reforçados ativados para ${ambPatient.name}.`);
  startAmbulatoryCareEscort(cityId, ambId);
  return true;
}

function releaseAmbulatoryPatient(ambId) {
  const cityHosp = getCityHospitalState(state.currentCityId);
  const idx = cityHosp.ambulatory.findIndex((item) => item.ambId === ambId);
  if (idx < 0) return;
  const ambPatient = cityHosp.ambulatory[idx];
  if (!canAmbulatoryRelease(ambPatient)) {
    addLog(`${ambPatient.name} ainda não pode ser liberado do ambulatório.`);
    return;
  }
  cityHosp.ambulatory.splice(idx, 1);
  registerTriagePatientOutcome(ambPatient.triageSource, "released", ambPatient.name);
  state.released += 1;
  state.resolvedCases += 1;
  updatePopularity(2, `${ambPatient.name} liberado do ambulatório em remissão`);
  receivePatientPayment(ambPatient, "released");
  addAmbulatoryReportEvent(state.currentCityId, `${ambPatient.name} foi liberado em remissão.`);
  addLog(`${ambPatient.name} foi liberado do ambulatório (remissão).`);
}

function concludeCase(result) {
  const patient = state.currentPatient;
  if (!patient) return;
  hospitalMiniOnConclude(result);
  registerTriagePatientOutcome(patient.triageSource, result, patient.name);

  patient.active = false;
  state.dayAttendances += 1;
  state.resolvedCases += 1;

  if (result === "cured") {
    state.consecutiveDeaths = 0;
    notePlayerAction("cured", 2);
    state.cured += 1;
    updatePopularity(6, `${patient.name} foi curado`);
    addLog(`${patient.name} recebeu alta definitiva.`);
  }

  if (result === "death") {
    state.consecutiveDeaths += 1;
    notePlayerAction("death", 1.5);
    state.deaths += 1;
    updatePopularity(-3, `${patient.name} foi a óbito`);
    maybeGrantEffortReward(patient);
    addLog(`${patient.name} não resistiu à peste.`);
    if (state.consecutiveDeaths >= 2) {
      const persecutionBoost = state.consecutiveDeaths >= 4 ? 2 : 1;
      setPersecutionLevel(state.persecutionLevel + persecutionBoost);
      addLog("a morte está a perseguir.", { type: "event" });
      showDeathPursuitOverlay();
      if (state.consecutiveDeaths >= 4) triggerPersecutionWhisper(true);
    }
  }

  if (result === "abandon") {
    state.consecutiveDeaths = 0;
    notePlayerAction("abandon", 1.5);
    state.abandoned += 1;
    updatePopularity(-8, `você desistiu de ${patient.name}`);
    addLog(`Você encerrou o atendimento de ${patient.name} antes do desfecho clínico.`);
  }

  if (result === "released") {
    state.consecutiveDeaths = 0;
    notePlayerAction("released", 1);
    state.released += 1;
    updatePopularity(2, `${patient.name} foi liberado em remissão`);
    addLog(`${patient.name} saiu em remissão. O risco de recaída permanece.`);

    const relapseChance = patient.hp < 45 ? 0.24 : 0.14;
    if (Math.random() < relapseChance) {
      state.relapseQueue.push({
        originalName: patient.name,
        daysUntilReturn: randomInt(2, 6)
      });
      addLog(`Sinais de possível recaída foram notados no prontuário de ${patient.name}.`);
    }
  }

  receivePatientPayment(patient, result);

  if (result === "cured" || result === "released") {
    const cityFindChance = result === "cured" ? 0.18 : 0.1;
    if (Math.random() < cityFindChance) {
      grantCitySpecificItem(state.currentCityId, "recompensa da cidade");
    }
  }

  if (patient.freeCareAccepted && result !== "abandon") {
    notePlayerAction("free-care", 2);
    state.freeCareResolved += 1;
    maybeProgressBenevolenceNarrative();
    maybeTriggerPlagueTrendInsight();
  }

  state.currentPatient = null;
  if (result === "death") {
    setActionMenuSectionForCurrentArea("consultorio");
  }
  if (result === "released" || result === "abandon") {
    setActionMenuSectionForCurrentArea("consultorio");
  }
  if (result === "cured" || result === "death") maybeQueueDialogueResponse("hospital");
  checkPhase1TransitionTrigger();
}

function applyTechnique(tech) {
  if (!state.currentPatient || !state.currentPatient.active || state.phase1Failed) return;
  if (!isClinicalArea()) {
    addLog("Você precisa estar no Hospital para tratar pacientes.");
    return;
  }
  if (isMedicalVowActive()) {
    addLog("Penitência ativa: você não pode aplicar tratamentos até o próximo descanso.");
    return;
  }
  if (state.awaitingRestChoice) {
    addLog("Finalize primeiro sua escolha de descanso para iniciar um novo dia.");
    return;
  }

  const patient = state.currentPatient;
  const cityHosp = getCityHospitalState(state.currentCityId);

  if (patient.needsFreeCareDecision) {
    addLog("Decida antes se aceita atendimento gratuito ou se recusa o paciente.");
    render();
    return;
  }

  if (tech.id === "isolamento" && cityHosp.ambulatory.length >= 4) {
    addLog("Ambulatório desta cidade está cheio (4/4). Isolamento e repouso indisponível.");
    render();
    return;
  }

  playTreatmentSound(tech.id);
  hospitalMiniOnTreatmentAction();
  const doctorCost = applyWorkFatigue(patient);
  patient.treatmentCount += 1;

  if (tech.id === "isolamento") {
    addLog(`Isolamento e repouso selecionado para ${patient.name}. Encaminhando ao ambulatório...`);
    const moved = transferPatientToAmbulatory();
    if (moved) {
      if (!state.phase1Failed) render();
      return;
    }
  }

  const chance = getTreatmentChance(patient, tech);
  const success = Math.random() < chance;

  if (success) {
    let severityReduction = randomInt(10, 19);
    let hpGain = randomInt(5, 12);
    if (state.precisionKitCharges > 0) {
      state.precisionKitCharges -= 1;
      severityReduction += 3;
      hpGain += 2;
    }
    patient.severity = clamp(patient.severity - severityReduction, 0, 100);
    patient.hp = clamp(patient.hp + hpGain, 0, 100);
    addLog(`${tech.name} (${Math.round(chance * 100)}%): sucesso. ${tech.onSuccess}`);
    addLog(`Severidade -${severityReduction}, vida do paciente +${hpGain}.`);
  } else {
    const severityRise = randomInt(4, 10);
    const hpLoss = randomInt(3, 8);
    patient.severity = clamp(patient.severity + severityRise, 0, 100);
    patient.hp = clamp(patient.hp - hpLoss, 0, 100);
    addLog(`${tech.name} (${Math.round(chance * 100)}%): falha. ${tech.onFail}`);
    addLog(`Severidade +${severityRise}, vida do paciente -${hpLoss}.`);
  }

  const plagueSeverityRise = randomInt(1, Math.max(1, patient.infectionPower - 2));
  const plagueHpLoss = randomInt(1, Math.max(2, patient.infectionPower - 3));
  patient.severity = clamp(patient.severity + plagueSeverityRise, 0, 100);
  patient.hp = clamp(patient.hp - plagueHpLoss, 0, 100);
  if (state.treatmentBoostCharges > 0) state.treatmentBoostCharges -= 1;
  addLog(`A peste progride: severidade +${plagueSeverityRise}, vida -${plagueHpLoss}.`);
  addLog(`Desgaste do procedimento aplicado neste turno: -${doctorCost} de vida.`);

  if (patient.hp <= 0) {
    concludeCase("death");
  } else if (getPatientStage(patient).id === "curado") {
    concludeCase("cured");
  }

  if (checkPhase1GameOver()) {
    renderPatientPanel();
    return;
  }

  if (!state.phase1Failed) render();
}

function abandonPatient() {
  if (!state.currentPatient || state.phase !== 1 || state.phase1Failed) return;
  if (state.awaitingRestChoice) return;
  applyWorkFatigue(state.currentPatient);
  if (checkPhase1GameOver()) {
    renderPatientPanel();
    return;
  }
  concludeCase("abandon");
  if (!state.phase1Failed) render();
}

function acceptFreePatient() {
  if (!state.currentPatient || state.phase !== 1 || state.phase1Failed) return;
  if (state.awaitingRestChoice) return;
  if (isMedicalVowActive()) {
    addLog("Penitência ativa: você não pode assumir atendimentos enquanto o voto durar.");
    return;
  }
  if (!state.currentPatient.needsFreeCareDecision) return;
  applyWorkFatigue(state.currentPatient);
  if (checkPhase1GameOver()) {
    renderPatientPanel();
    return;
  }
  state.currentPatient.needsFreeCareDecision = false;
  state.currentPatient.freeCareAccepted = true;
  setActionMenuSectionForCurrentArea("tratamentos");
  addLog(`Você aceitou ${state.currentPatient.name} de forma gratuita.`);
  updatePopularity(1, "a comunidade viu compaixão no atendimento gratuito");
  render();
}

function refusePoorPatient() {
  if (!state.currentPatient || state.phase !== 1 || state.phase1Failed) return;
  if (state.awaitingRestChoice) return;
  if (isMedicalVowActive()) {
    addLog("Penitência ativa: você não pode conduzir triagem clínica enquanto o voto durar.");
    return;
  }
  if (!state.currentPatient.needsFreeCareDecision) return;
  applyWorkFatigue(state.currentPatient);
  if (checkPhase1GameOver()) {
    renderPatientPanel();
    return;
  }

  state.refusedPoor += 1;
  hospitalMiniOnRefuse();
  registerTriagePatientOutcome(state.currentPatient.triageSource, "closed", state.currentPatient.name);
  updatePopularity(-4, `você recusou ${state.currentPatient.name} por falta de recursos`);
  addLog(`${state.currentPatient.name} foi recusado por não poder pagar.`);
  state.currentPatient = null;
  setActionMenuSectionForCurrentArea("consultorio");
  checkPhase1TransitionTrigger();
  render();
}

function releasePatient() {
  if (!state.currentPatient || state.phase !== 1 || state.phase1Failed) return;
  if (state.awaitingRestChoice) return;
  if (isMedicalVowActive()) {
    addLog("Penitência ativa: você não pode conceder alta enquanto o voto durar.");
    return;
  }
  if (state.currentPatient.needsFreeCareDecision) {
    addLog("Decida antes se aceita gratuitamente ou recusa o paciente sem recursos.");
    return;
  }
  if (getPatientStage(state.currentPatient).id !== "remissao") {
    addLog("Só é possível liberar paciente em estágio de remissão.");
    render();
    return;
  }
  applyWorkFatigue(state.currentPatient);
  if (checkPhase1GameOver()) {
    renderPatientPanel();
    return;
  }
  concludeCase("released");
  if (!state.phase1Failed) render();
}

function finishWorkDay() {
  if (state.phase !== 1 || state.phase1Failed) return;
  if (state.awaitingRestChoice) return;
  if (state.currentPatient && state.currentPatient.active) {
    addLog("Você está em atendimento. Para encerrar o dia, primeiro desista do paciente atual.");
    return;
  }
  state.awaitingRestChoice = true;
  addLog(`Plantão encerrado às ${formatHour(state.dayClockMinutes)}. Escolha onde descansar.`);
  render();
}

function startNextDay(recoveredLife, restLabel, coinCost) {
  if (state.dayAttendances === 0) {
    updatePopularity(-10, "dia encerrado sem nenhum atendimento");
  }

  if (coinCost > 0) {
    state.coins -= coinCost;
  }
  state.playerLife = clamp(state.playerLife + recoveredLife, 0, state.playerMaxLife);
  // Descanso sempre inicia um novo dia, independentemente do horário em que foi acionado.
  state.day += 1;
  state.dayClockMinutes = 8 * 60;
  state.churchActionsToday = 0;
  state.dayAttendances = 0;
  state.awaitingRestChoice = false;
  resetActionMenuContext();
  state.currentAreaId = "estabulo";
  maybeUpdateStableHandlerOnEntry(state.currentCityId);
  resetSleepDeprivationCycle();
  if (state.medicalVowUntilDay > 0 && state.day > state.medicalVowUntilDay) {
    state.medicalVowUntilDay = 0;
    addLog("Sua penitência de abstinência médica foi cumprida.");
  }
  tickRelapses();
  processAllAmbulatoryTurns();
  snapshotDayItems();
  addLog(`Você descansou em ${restLabel} e recuperou ${recoveredLife} de vida.`);
  if (state.faithMiracleDreamPending) {
    state.phase2DreamPending = true;
    state.phase2DreamArmed = true;
    state.faithMiracleDreamPending = false;
    state.dayStartAfterDreamPending = true;
    startPhase2Dream();
    render();
    return;
  }
  state.dayStartAfterDreamPending = false;
  addLog(`Novo dia começou: Dia ${state.day}, ${formatHour(state.dayClockMinutes)}.`);
  addLog("Você desperta no estábulo. Escolha para onde seguir antes de retomar os atendimentos.");
  showDayStartOverlay(state.day);
  if (Math.random() < 0.5) emitCasualDialogue();
  if (state.faithTier >= 2) triggerPersecutionWhisper();
  if (state.benevolenceTier >= 2) maybeTriggerPlagueTrendInsight();
  applyTimeTheme();
  checkPhase1TransitionTrigger();
  if (state.phase !== 1) return;

  render();
  maybeShowAreaTutorial("estabulo");
}

function restAtInn() {
  if (!state.awaitingRestChoice || state.phase !== 1 || state.phase1Failed) return;
  if (state.coins < 20) {
    addLog("Moedas insuficientes para descansar na hospedaria (20 moedas).");
    return;
  }
  startNextDay(35, "hospedaria", 20);
}

function restAtClinic() {
  if (!state.awaitingRestChoice || state.phase !== 1 || state.phase1Failed) return;
  startNextDay(5, "posto de atendimento", 0);
}

function cancelEndDay() {
  if (!state.awaitingRestChoice || state.phase !== 1 || state.phase1Failed) return;
  if (state.phase2DreamPending) {
    addLog("Você precisa descansar agora. Algo o aguarda quando os olhos se fecharem.");
    return;
  }
  state.awaitingRestChoice = false;
  addLog("Você decide seguir trabalhando neste dia.");
  render();
}

function useTonic() {
  if (state.tonics <= 0 || state.phase !== 1 || state.phase1Failed) return;
  if (state.playerLife >= state.playerMaxLife) {
    addLog("Sua vida já está no máximo.");
    return;
  }

  state.tonics -= 1;
  const recovered = randomInt(5, 9);
  state.playerLife = clamp(state.playerLife + recovered, 0, state.playerMaxLife);
  addLog(`Você utiliza um tônico e recupera ${recovered} pontos de vida.`);
  render();
}

function selfTreatPlague() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (!state.doctorInfected) {
    addLog("Você não está contaminado no momento.");
    return;
  }

  applyWorkFatigue(null);
  if (checkPhase1GameOver()) {
    render();
    return;
  }

  const reduction = randomInt(4, 9);
  state.doctorInfectionSeverity = clamp(state.doctorInfectionSeverity - reduction, 0, 100);
  addLog(`Autotratamento aplicado. Contaminação -${reduction}.`);

  const cureChance = clamp(0.08 + ((100 - state.doctorInfectionSeverity) * 0.0024), 0.08, 0.38);
  if (state.doctorInfectionSeverity <= 2 || Math.random() < cureChance) {
    cureDoctorPlague("autotratamento");
  }
  render();
}

function useAntiPlaguePotion() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (!state.doctorInfected) {
    addLog("Sem infecção ativa: guarde a poção para quando precisar.");
    return;
  }
  if (state.antiPlaguePotions <= 0) {
    addLog("Você não possui Poções Antipeste.");
    return;
  }

  applyWorkFatigue(null);
  if (checkPhase1GameOver()) {
    render();
    return;
  }

  state.antiPlaguePotions -= 1;
  const reduction = randomInt(20, 34);
  state.doctorInfectionSeverity = clamp(state.doctorInfectionSeverity - reduction, 0, 100);
  addLog(`Poção Antipeste usada. Contaminação -${reduction}.`);

  const cureChance = state.doctorInfectionSeverity <= 25 ? 0.7 : 0.45;
  if (state.doctorInfectionSeverity <= 5 || Math.random() < cureChance) {
    cureDoctorPlague("uso de poções e autotratamento");
  }
  render();
}

function buyItem(item) {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (!isShopArea()) return;
  const finalPrice = getDiscountedPrice(item.price);
  if (state.coins < finalPrice) {
    addLog(`Moedas insuficientes para comprar ${item.name}.`);
    return;
  }

  shopMiniStartDoctorService();
  state.coins -= finalPrice;
  playPurchaseSound();
  item.buy(state);
  if (state.shopDiscountPercent > 0) {
    addLog(`Desconto de bem-feitoria aplicado: -${state.shopDiscountPercent}% em ${item.name}.`);
  }
  shopMiniCompleteDoctorService();
  render();
}

function resetShopMenuState() {
  state.shopMenuView = "root";
  state.shopPendingBuyItemId = "";
}

function getShopItemById(itemId) {
  return shopItems.find((item) => item.id === itemId) || null;
}

function openShopRootMenu() {
  resetShopMenuState();
  closeTradePopup();
  render();
}

function openShopBuyMenu() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (!isShopArea()) return;
  const buyables = shopItems.map((item) => ({
    ...item,
    finalPrice: getDiscountedPrice(item.price)
  }));
  activeTradeDeal = {
    stage: "buy-select",
    items: buyables,
    serviceActive: false
  };
  renderTradePopup();
}

function openShopSellMenu() {
  showSellSelectionPopup();
}

function requestShopBuyConfirmation(itemId) {
  const item = getShopItemById(itemId) || shopItems.find((it) => it.id === itemId);
  if (!item || !activeTradeDeal) return;
  shopMiniStartDoctorService();
  activeTradeDeal.stage = "buy-confirm";
  activeTradeDeal.item = item;
  activeTradeDeal.finalPrice = getDiscountedPrice(item.price);
  activeTradeDeal.serviceActive = true;
  renderTradePopup();
}

function resolveShopBuyConfirmation(confirmPurchase) {
  const deal = activeTradeDeal;
  if (!deal || deal.stage !== "buy-confirm" || !deal.item) return;
  const item = deal.item;
  const finalPrice = getDiscountedPrice(item.price);
  if (confirmPurchase) {
    if (state.coins < finalPrice) {
      addLog(`Moedas insuficientes para comprar ${item.name}.`);
    } else {
      state.coins -= finalPrice;
      playPurchaseSound();
      item.buy(state);
      if (state.shopDiscountPercent > 0) {
        addLog(`Desconto de bem-feitoria aplicado: -${state.shopDiscountPercent}% em ${item.name}.`);
      }
    }
  } else {
    addLog(`Compra cancelada: ${item.name}.`);
  }
  shopMiniCompleteDoctorService();
  deal.stage = "buy-select";
  deal.item = null;
  deal.finalPrice = 0;
  deal.items = shopItems.map((shopItem) => ({
    ...shopItem,
    finalPrice: getDiscountedPrice(shopItem.price)
  }));
  deal.serviceActive = false;
  render();
  renderTradePopup();
}

function getItemTradeValue(item) {
  const raw = item.price || item.basePrice || item.value || 0;
  return Math.max(1, Math.round(raw));
}

function getSellableInventoryItems() {
  const allItems = [...shopItems, ...RARE_TRAVEL_ITEMS, ...CITY_SPECIFIC_ITEMS, ...MASK_BALL_ITEMS, ...RELIGIOUS_ITEMS];
  return allItems
    .map((item) => ({
      ...item,
      quantity: getInventoryQuantity(item.id),
      tradeValue: getItemTradeValue(item)
    }))
    .filter((item) => item.quantity > 0 && item.tradeValue > 0);
}

function decrementInventoryItem(itemId, amount = 1) {
  const delta = Math.max(1, Math.round(amount));
  if (itemId === "rare-herbs") state.treatmentBoostCharges = Math.max(0, state.treatmentBoostCharges - delta);
  if (itemId === "waxed-cloak") state.protectionCharges = Math.max(0, state.protectionCharges - delta);
  if (itemId === "tonic") state.tonics = Math.max(0, state.tonics - delta);
  if (itemId === "precision-kit") state.precisionKitCharges = Math.max(0, state.precisionKitCharges - delta);
  if (itemId === "anti-plague-potion") state.antiPlaguePotions = Math.max(0, state.antiPlaguePotions - delta);
  if (itemId === "rare-bandage-kit") state.rareBandageKits = Math.max(0, state.rareBandageKits - delta);
  if (itemId === "sacred-medallion") state.sacredMedallions = Math.max(0, state.sacredMedallions - delta);
  if (itemId === "alchemical-serum") state.alchemicalSerums = Math.max(0, state.alchemicalSerums - delta);
  if (itemId === "mask-ball-invite") state.maskInvitations = Math.max(0, state.maskInvitations - delta);
  if (itemId === "valedouro-seal") state.valedouroSeals = Math.max(0, state.valedouroSeals - delta);
  if (itemId === "brumasul-coral") state.brumasulCorals = Math.max(0, state.brumasulCorals - delta);
  if (itemId === "pedrafria-shard") state.pedrafriaShards = Math.max(0, state.pedrafriaShards - delta);
  if (itemId === "black-council-seal") state.blackCouncilSeals = Math.max(0, state.blackCouncilSeals - delta);
  if (itemId === "onyx-key") state.onyxKeys = Math.max(0, state.onyxKeys - delta);
  if (itemId === "pale-ampoule") state.paleAmpoules = Math.max(0, state.paleAmpoules - delta);
  if (itemId === "sacred-bible") state.sacredBibles = Math.max(0, state.sacredBibles - delta);
  if (itemId === "rosary") state.rosaries = Math.max(0, state.rosaries - delta);
}

function parseCoinInput(raw) {
  const normalized = String(raw || "").replace(",", ".").trim();
  const value = Number(normalized);
  if (!Number.isFinite(value)) return NaN;
  return Math.max(0, Math.round(value));
}

function getCurrentGameHourStamp() {
  return state.day * 24 + Math.floor(getClockMinutesOfDay(state.dayClockMinutes) / 60);
}

function getTriageCharacterOutcome(characterId) {
  if (!characterId) return "available";
  return state.triageCharacterOutcomeById[characterId] || "available";
}

function setTriageCharacterOutcome(characterId, outcome) {
  if (!characterId) return;
  state.triageCharacterOutcomeById[characterId] = outcome;
}

function canTriageCharacterAppear(characterId) {
  const outcome = getTriageCharacterOutcome(characterId);
  return outcome === "available" || outcome === "released";
}

function registerTriagePatientOutcome(characterId, result, patientName = "") {
  if (!characterId) return;
  if (result === "released") {
    setTriageCharacterOutcome(characterId, "released");
    return;
  }
  if (result === "cured") {
    setTriageCharacterOutcome(characterId, "cured");
    const cleanName = String(patientName || "").trim();
    if (cleanName && !state.triageCuredHopeNames.includes(cleanName)) {
      state.triageCuredHopeNames.push(cleanName);
      if (state.triageCuredHopeNames.length > 12) {
        state.triageCuredHopeNames = state.triageCuredHopeNames.slice(-12);
      }
    }
    return;
  }
  if (result === "death") {
    setTriageCharacterOutcome(characterId, "dead");
    return;
  }
  setTriageCharacterOutcome(characterId, "closed");
}

function maybeEmitTriageHopeCitation(character) {
  if (!character) return;
  const names = state.triageCuredHopeNames.filter((name) => name !== character.name);
  if (!names.length) return;
  if (Math.random() > 0.45) return;
  const hopefulName = names[randomInt(0, names.length - 1)];
  const lines = [
    `${character.name}: "Se ${hopefulName} conseguiu sair curado, talvez eu também ainda tenha chance."`,
    `${character.name}: "Ouvi dizer que ${hopefulName} saiu daqui vivo. Tento me agarrar nisso."`,
    `${character.name}: "Estão comentando sobre ${hopefulName}. A cidade chama isso de sinal de esperança."`
  ];
  addLog(pickDialogue(lines), { type: "dialogue" });
}

function refreshTriageRoster(force = false) {
  const currentHour = getCurrentGameHourStamp();
  if (!force && state.triageRosterIds.length >= 6 && state.triageLastSeenHour === currentHour) return;
  const before = state.triageRosterIds.join("|");
  const ids = TRIAGE_CHARACTER_LIBRARY
    .filter((entry) => canTriageCharacterAppear(entry.id))
    .map((entry) => entry.id);
  if (!ids.length) {
    state.triageRosterIds = [];
    state.triageLastSeenHour = currentHour;
    return;
  }
  for (let i = ids.length - 1; i > 0; i -= 1) {
    const j = randomInt(0, i);
    const tmp = ids[i];
    ids[i] = ids[j];
    ids[j] = tmp;
  }
  const nurses = ids.filter((id) => getTriageCharacterById(id)?.role === "enfermeira");
  const roster = ids.slice(0, 8);
  if (nurses.length > 0) {
    const hasNurse = roster.some((id) => getTriageCharacterById(id)?.role === "enfermeira");
    if (!hasNurse) {
      const nurseId = nurses[0];
      if (roster.length >= 8) {
        roster[roster.length - 1] = nurseId;
      } else {
        roster.push(nurseId);
      }
    }
  }
  state.triageRosterIds = roster;
  state.triageLastSeenHour = currentHour;
  const after = state.triageRosterIds.join("|");
  if (force || (isTentMiniMapScenario() && before !== after)) {
    tentMiniOnRosterRefresh();
  }
}

function getTriageCharacterById(id) {
  return TRIAGE_CHARACTER_LIBRARY.find((entry) => entry.id === id) || null;
}

function getTriageNurseStatus(characterId) {
  if (!characterId) return "idle";
  if (!state.triageNurseStatusById || typeof state.triageNurseStatusById !== "object") {
    state.triageNurseStatusById = {};
  }
  return state.triageNurseStatusById[characterId] || "idle";
}

function setTriageNurseStatus(characterId, status) {
  if (!characterId) return;
  if (!state.triageNurseStatusById || typeof state.triageNurseStatusById !== "object") {
    state.triageNurseStatusById = {};
  }
  state.triageNurseStatusById[characterId] = status || "idle";
}

function clearTriageFocusToBase() {
  state.triageActiveCharacterId = "";
  state.triageDialogueStep = 0;
  state.triageEmpathyScore = 0;
  if (isTentMiniMapScenario() && state.miniMapTent && state.miniMapTent.mode === "transfer") {
    state.miniMapTent.focusCharacterId = "";
    return;
  }
  tentMiniOnCharacterFocus("");
}

function clearPendingTriageEscort(cityId = state.currentCityId) {
  const cityHosp = getCityHospitalState(cityId);
  if (!cityHosp.pendingTriageEscort) return;
  const nurseId = cityHosp.pendingTriageEscort.nurseId || "";
  if (nurseId) setTriageNurseStatus(nurseId, "idle");
  cityHosp.pendingTriageEscort = null;
}

function openTentItemsPopup() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (state.currentAreaId !== "tenda") return;
  activeTradeDeal = {
    stage: "tent-items",
    serviceActive: false
  };
  renderTradePopup();
}

function selectResidentialHouse(houseId) {
  if (state.phase !== 1 || state.phase1Failed || state.currentAreaId !== "residencial") return;
  const intel = getResidentialCityIntel(state.currentCityId);
  const house = intel.houses.find((entry) => entry.id === houseId);
  if (!house) return;
  state.residentialSelectedHouseId = house.id;
  addLog(`Investigação residencial: foco em ${house.label}.`, { type: "event" });
  notePlayerAction("residential-select", 0.6);
  render();
}

function maybeWitnessDoorMarkerFigure() {
  const hour = getClockMinutesOfDay(state.dayClockMinutes) / 60;
  const inNightWindow = hour >= 18 || hour < 5;
  if (!inNightWindow) return false;
  const intel = getResidentialCityIntel(state.currentCityId);
  const now = getAbsoluteGameMinutes();
  if (now - intel.lastFigureSeenAt < RESIDENTIAL_FIGURE_COOLDOWN_MINUTES) return false;
  if (Math.random() > RESIDENTIAL_FIGURE_CHANCE) return false;

  intel.lastFigureSeenAt = now;
  state.evidence = clamp(state.evidence + 4, 0, 100);
  state.suspicion = clamp(state.suspicion + 2, 0, 100);
  addLog("Você avista uma figura encapuzada marcando uma porta com tinta escura. Ao tentar alcançar, ela desaparece no beco.", { type: "event" });
  addLog("Rastro coletado: marca fresca, cheiro químico e passos apressados rumo à neblina.", { type: "event" });
  return true;
}

function observeResidentialHouse() {
  if (state.phase !== 1 || state.phase1Failed || state.currentAreaId !== "residencial") return;
  const house = getSelectedResidentialHouse(state.currentCityId);
  if (!house) {
    addLog("Selecione uma casa para observar primeiro.", { type: "event" });
    return;
  }
  if (house.hasMark) {
    addLog(`${house.label}: há um símbolo irregular na porta, como se fosse reaplicado toda madrugada.`, { type: "event" });
  } else {
    addLog(`${house.label}: nenhuma marca visível na entrada por enquanto.`, { type: "event" });
  }
  maybeWitnessDoorMarkerFigure();
  notePlayerAction("residential-observe", 0.8);
  render();
}

function approachResidentialHouse() {
  if (state.phase !== 1 || state.phase1Failed || state.currentAreaId !== "residencial") return;
  const house = getSelectedResidentialHouse(state.currentCityId);
  if (!house) {
    addLog("Selecione uma casa para se aproximar.", { type: "event" });
    return;
  }
  if (house.hasMark) {
    addLog(`Você se aproxima de ${house.label} e vê riscos antigos sob a marca atual, como camadas de uma mesma assinatura.`, { type: "event" });
  } else {
    addLog(`Você ronda ${house.label}; sem marca na madeira, mas há sinais de vigilância por trás da cortina.`, { type: "event" });
  }
  maybeWitnessDoorMarkerFigure();
  notePlayerAction("residential-approach", 0.8);
  render();
}

function knockResidentialHouseDoor() {
  if (state.phase !== 1 || state.phase1Failed || state.currentAreaId !== "residencial") return;
  const house = getSelectedResidentialHouse(state.currentCityId);
  if (!house) {
    addLog("Selecione uma casa para bater na porta.", { type: "event" });
    return;
  }

  if (!house.opensDoor) {
    if (house.closedType === "voices") {
      addLog(`${house.label}: ninguém abre. Vozes baixas discutem lá dentro, depois silêncio absoluto.`, { type: "dialogue" });
    } else {
      addLog(`${house.label}: ninguém atende. A casa parece vazia, com pó acumulado na soleira.`, { type: "event" });
    }
    notePlayerAction("residential-knock-closed", 0.9);
    render();
    return;
  }

  const styleLines = RESIDENTIAL_DIALOGUE_STYLES[house.style] || RESIDENTIAL_DIALOGUE_STYLES.logico;
  addLog(`${house.label}: ${pickDialogue(styleLines)}`, { type: "dialogue" });
  notePlayerAction("residential-knock-open", 1);
  if (Math.random() < 0.3) {
    state.evidence = clamp(state.evidence + 1, 0, 100);
    addLog("O relato reforça um padrão: marca na porta, febre em seguida, repetido em ruas diferentes.", { type: "event" });
  }
  render();
}

function clearResidentialHouseSelection() {
  state.residentialSelectedHouseId = "";
  render();
}

function stableTalkToHandler() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (!isStableArea()) return;
  const stable = getCityStableState(state.currentCityId);
  if (stable.pendingReplacement) {
    addLog("O estábulo está aguardando um novo tratador. Volte em outra visita.", { type: "event" });
    render();
    return;
  }
  const handler = stable.handler;
  if (!handler || !handler.alive) {
    addLog("Não há tratador disponível no momento no estábulo desta cidade.", { type: "event" });
    render();
    return;
  }
  stableMiniOnTalkHandler();
  activeTradeDeal = {
    stage: "stable-handler-dialog",
    serviceActive: false
  };
  renderTradePopup();
}

function openStableTravelPopup() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (!isStableArea()) return;
  stableMiniOnTalkDriver();
  activeTradeDeal = {
    stage: "stable-travel",
    serviceActive: false
  };
  renderTradePopup();
}

function pickStableDialogueLine(cityId, mood = "healthy", handlerName = "tratador") {
  const byCity = {
    valedouro: {
      healthy: [
        `${handlerName}: "A lama engole roda fácil por aqui. Se for viajar, parta antes do nevoeiro fechar."`,
        `${handlerName}: "Os cascos estão firmes hoje. Em Valedouro, cavalo cansado vira sentença."`
      ],
      sick: [
        `${handlerName}: "A febre não cede... mas os cavalos ainda me reconhecem pelo assobio."`,
        `${handlerName}: "Se eu cair, cuide das rédeas por mim. Esta peste não poupa ninguém."`
      ],
      replacement: [
        `${handlerName}: "Assumi faz pouco. O antigo tratador não resistiu à peste de Valedouro."`,
        `${handlerName}: "Cheguei para cobrir a vaga do falecido. Ainda estou aprendendo a rotina desta lama."`
      ]
    },
    brumasul: {
      healthy: [
        `${handlerName}: "Quando a maré sobe, até a estrada muda de humor. Melhor viajar com pressa e propósito."`,
        `${handlerName}: "Aqui em Brumasul o sal corrói tudo, menos a teimosia de quem precisa seguir."`
      ],
      sick: [
        `${handlerName}: "Ouço o mar mesmo de olhos fechados... e essa febre lateja como tempestade."`,
        `${handlerName}: "A tosse vem em ondas. Se eu piorar, avise o carroceiro para reduzir risco."`
      ],
      replacement: [
        `${handlerName}: "Sou novo no posto. O último tratador caiu com a peste e não voltou das docas."`,
        `${handlerName}: "Vim substituir o antigo. Dizem que a doença o levou numa noite de mar agitado."`
      ]
    },
    pedrafria: {
      healthy: [
        `${handlerName}: "Em Pedrafria, trilha segura vale mais que coragem. Cavalo bem ferrado salva viagem."`,
        `${handlerName}: "O frio endurece tudo: corda, casco e gente. Mas hoje os animais estão estáveis."`
      ],
      sick: [
        `${handlerName}: "A geada ajuda a dor a ficar mais funda. Esta peste me prende o peito."`,
        `${handlerName}: "Tento manter o ritmo, doutor, mas a febre me derruba antes do amanhecer."`
      ],
      replacement: [
        `${handlerName}: "Assumi ontem. O tratador anterior morreu de peste antes da primeira geada forte."`,
        `${handlerName}: "Cheguei para ocupar o posto vazio. Aqui a peste levou mais um homem do estábulo."`
      ]
    }
  };
  const cityPack = byCity[cityId] || byCity.valedouro;
  const pool = cityPack[mood] || cityPack.healthy;
  return pool[randomInt(0, pool.length - 1)];
}

function stableTreatHandlerWithHerbs() {
  const stable = getCityStableState(state.currentCityId);
  const handler = stable.handler;
  if (!handler || !handler.alive || !handler.infected) return;
  if (state.treatmentBoostCharges <= 0) {
    addLog("Sem ervas raras disponíveis para tratar o tratador.", { type: "event" });
    return;
  }
  state.treatmentBoostCharges -= 1;
  const cureChance = 0.58;
  if (Math.random() < cureChance) {
    handler.infected = false;
    handler.infectionSeverity = 0;
    handler.infectionVisits = 0;
    handler.discountUnlocked = true;
    addLog(`${handler.name} respondeu ao tratamento com ervas e se recuperou.`, { type: "event" });
  } else {
    handler.infectionSeverity = clamp(handler.infectionSeverity + randomInt(8, 16), 0, 100);
    addLog(`As ervas aliviaram pouco. ${handler.name} permanece debilitado.`, { type: "event" });
    if (handler.infectionSeverity >= 96 && Math.random() < 0.35) {
      handler.alive = false;
      stable.pendingReplacement = true;
      stable.previousHandlerName = handler.name;
      stable.previousHandlerCause = "peste";
      addLog(`${handler.name} não resistiu à peste. Um novo tratador deve assumir em breve.`, { type: "event" });
    }
  }
  render();
  renderTradePopup();
}

function stableTreatHandlerWithPotion() {
  const stable = getCityStableState(state.currentCityId);
  const handler = stable.handler;
  if (!handler || !handler.alive || !handler.infected) return;
  if (state.antiPlaguePotions <= 0) {
    addLog("Sem poção antipeste para tratar o tratador.", { type: "event" });
    return;
  }
  state.antiPlaguePotions -= 1;
  const cureChance = 0.86;
  if (Math.random() < cureChance) {
    handler.infected = false;
    handler.infectionSeverity = 0;
    handler.infectionVisits = 0;
    handler.discountUnlocked = true;
    addLog(`${handler.name} foi curado com poção antipeste. O estábulo agora confia em você para viagens.`, { type: "event" });
  } else {
    handler.infectionSeverity = clamp(handler.infectionSeverity + randomInt(4, 10), 0, 100);
    addLog(`A poção falhou em conter totalmente a peste de ${handler.name}.`, { type: "event" });
  }
  render();
  renderTradePopup();
}

function openTriagePopup() {
  ensureTriageState();
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) {
    addLog("A triagem não pode ser aberta agora.", { type: "event" });
    return;
  }
  if (state.currentAreaId !== "tenda") {
    addLog("A triagem só pode ser aberta na tenda de atendimento.", { type: "event" });
    return;
  }
  if (isTentMiniMapScenario()) {
    state.miniMapTent.mode = "idle";
    state.miniMapTent.transferCharacterId = "";
    state.miniMapTent.transferNurseId = "";
    state.miniMapTent.transferPhase = "";
    ensureMiniMapScene(true);
  }
  tentMiniOnCharacterFocus("");
  activeTradeDeal = {
    stage: "triage-roster",
    serviceActive: false
  };
  openTradePopup();
  if (tradePopupTitle) tradePopupTitle.textContent = "Tenda - Triagem";
  if (tradePopupText) tradePopupText.textContent = "Carregando personagens da triagem...";
  if (tradePopupMeta) tradePopupMeta.textContent = "";
  if (tradePopupList) tradePopupList.innerHTML = "";
  if (tradePopupActions) tradePopupActions.innerHTML = "";
  try {
    renderTradePopup();
  } catch (error) {
    if (tradePopupText) tradePopupText.textContent = "Falha ao abrir a triagem. Atualize a lista da triagem e tente novamente.";
    if (tradePopupMeta) tradePopupMeta.textContent = "Ocorreu uma inconsistência de estado e o popup foi aberto em modo de segurança.";
    if (tradePopupActions) {
      tradePopupActions.innerHTML = "";
      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.textContent = "Fechar";
      closeBtn.addEventListener("click", closeTradePopup);
      tradePopupActions.appendChild(closeBtn);
    }
    addLog(`Erro ao abrir triagem: ${error instanceof Error ? error.message : "falha desconhecida"}`, { type: "event" });
  }
}

function selectTriageCharacter(characterId) {
  const character = getTriageCharacterById(characterId);
  if (!character) return;
  if (character.role === "enfermeira" && getTriageNurseStatus(character.id) === "escort") return;
  if (character.role === "paciente" && getTriageCharacterOutcome(character.id) === "active") return;
  state.triageActiveCharacterId = character.id;
  state.triageDialogueStep = 0;
  state.triageEmpathyScore = 0;
  activeTradeDeal = {
    stage: "triage-detail",
    serviceActive: false
  };
  renderTradePopup();
}

function approachTriageCharacter() {
  if (!state.triageActiveCharacterId) return;
  const character = getTriageCharacterById(state.triageActiveCharacterId);
  if (!character) return;
  if (character.role === "enfermeira" && getTriageNurseStatus(character.id) === "escort") return;
  maybeEmitTriageHopeCitation(character);
  tentMiniOnCharacterFocus(state.triageActiveCharacterId);
  activeTradeDeal = {
    stage: "triage-dialogue",
    serviceActive: false
  };
  renderTradePopup();
}

function progressTriageDialogue(choiceType = "neutro") {
  const character = getTriageCharacterById(state.triageActiveCharacterId);
  if (!character) return;
  const tone = choiceType === "frio" ? "negativo" : choiceType;
  const step = Math.min(state.triageDialogueStep, character.dialogue.length - 1);
  const scriptedOutcome = character.responseOutcomeByStep
    && character.responseOutcomeByStep[String(step)]
    && character.responseOutcomeByStep[String(step)][tone];
  if (scriptedOutcome) {
    addLog(`${character.name}: ${scriptedOutcome}`, { type: "event" });
  }
  if (tone === "empatia") state.triageEmpathyScore += 1;
  if (tone === "negativo") state.triageEmpathyScore -= 1;
  state.triageDialogueStep = Math.min(character.dialogue.length, state.triageDialogueStep + 1);
  renderTradePopup();
}

function createPatientFromTriage(character, priority = false) {
  const patient = createPatient(false);
  patient.name = character.name;
  patient.hp = clamp(randomInt(28, 74), 1, 100);
  patient.severity = clamp(randomInt(36, 88), 0, 100);
  patient.infectionPower = randomInt(20, 52);
  patient.symptoms = [...symptomsPool].sort(() => Math.random() - 0.5).slice(0, randomInt(2, 3));
  patient.canPay = Math.random() < 0.74;
  patient.offeredPayment = patient.canPay ? randomInt(state.minPatientPayment, state.minPatientPayment + 10) : 0;
  patient.needsFreeCareDecision = !patient.canPay;
  patient.triagePriority = priority;
  patient.triageSource = character.id;
  patient.triageEscorted = false;
  return patient;
}

function referTriageCharacterToHospital(priority = false) {
  const character = getTriageCharacterById(state.triageActiveCharacterId);
  if (!character || character.role !== "paciente") return;
  if (!canTriageCharacterAppear(character.id)) return;
  const escortNurseId = tentMiniOnReferCharacter(character.id);
  if (!escortNurseId) {
    addLog("Nenhuma enfermeira disponível para conduzir o paciente ao hospital no momento.", { type: "event" });
    return;
  }
  const referred = createPatientFromTriage(character, priority);
  setTriageCharacterOutcome(character.id, "active");
  if (priority) {
    state.triageReferrals.unshift(referred);
  } else {
    state.triageReferrals.push(referred);
  }
  const cityHosp = getCityHospitalState(state.currentCityId);
  if (!cityHosp.pendingTriageEscort || cityHosp.pendingTriageEscort.triageSource !== character.id) {
    cityHosp.pendingTriageEscort = {
      triageSource: character.id,
      nurseId: escortNurseId,
      patientName: character.name,
      status: "waiting"
    };
  } else {
    cityHosp.pendingTriageEscort.nurseId = escortNurseId;
  }
  setTriageNurseStatus(escortNurseId, "escort");
  addLog(`${character.name} foi encaminhado para o hospital e entrará na fila de atendimento.`, { type: "event" });
  clearTriageFocusToBase();
  activeTradeDeal = {
    stage: "triage-roster",
    serviceActive: false
  };
  render();
  renderTradePopup();
}

function handleTriageGiftOrOffer() {
  const character = getTriageCharacterById(state.triageActiveCharacterId);
  if (!character || character.role !== "paciente") return;
  if (state.triageEmpathyScore < 1) return;
  if (character.rewardType === "gift") {
    const giftRoll = Math.random();
    if (giftRoll < 0.45) {
      state.tonics += 1;
      addLog(`${character.name} oferece 1 tônico em agradecimento por sua escuta.`, { type: "event" });
    } else if (giftRoll < 0.75) {
      state.antiPlaguePotions += 1;
      addLog(`${character.name} entrega uma Poção Antipeste guardada pela família.`, { type: "event" });
    } else {
      state.rareBandageKits += 1;
      addLog(`${character.name} deixa um Kit de Bandagens Raras por gratidão.`, { type: "event" });
    }
  } else if (character.rewardType === "cheap-offer") {
    const cheapItem = shopItems[randomInt(0, shopItems.length - 1)];
    const cheapPrice = Math.max(1, Math.round(getDiscountedPrice(cheapItem.price) * 0.32));
    if (state.coins >= cheapPrice) {
      const accept = window.confirm(`${character.name} oferece ${cheapItem.name} por um preço simbólico. Aceitar?`);
      if (accept) {
        state.coins -= cheapPrice;
        cheapItem.buy(state);
        addLog(`Oferta empática aceita: ${cheapItem.name} foi adquirido por valor reduzido.`);
      }
    }
  }
}

function handleTriageBribeDecision(acceptBribe) {
  const character = getTriageCharacterById(state.triageActiveCharacterId);
  if (!character || !character.bribeAttempt) return;
  if (acceptBribe) {
    state.coins += character.bribeCoins;
    updatePopularity(-4, `você aceitou suborno de ${character.name} na triagem`);
    addLog(`${character.name} entregou algumas moedas para furar a fila do hospital.`, { type: "event" });
    referTriageCharacterToHospital(true);
    return;
  }
  updatePopularity(1, `você recusou suborno de ${character.name}`);
  addLog(`Você recusou o suborno de ${character.name}.`, { type: "event" });
  character.bribeAttempt = false;
}

function tryAcceptCounterOffer(counterPrice, context) {
  const { baseValue, initialOffer, fairMaxPct, stretchMaxPct, stubbornness } = context;
  if (counterPrice <= initialOffer) return true;

  const ratio = counterPrice / Math.max(1, baseValue);
  if (ratio <= fairMaxPct) {
    const chance = clamp(0.86 - (ratio - 1) * 0.55 - stubbornness * 0.08, 0.6, 0.93);
    return Math.random() < chance;
  }
  if (ratio <= stretchMaxPct) {
    const chance = clamp(0.38 - (ratio - fairMaxPct) * 1.2 - stubbornness * 0.1, 0.12, 0.42);
    return Math.random() < chance;
  }
  const lowChance = clamp(0.1 - (ratio - stretchMaxPct) * 0.55 - stubbornness * 0.08, 0.02, 0.1);
  return Math.random() < lowChance;
}

function maybeApplyOverpricedSaleReputationImpact(salePrice, baseValue, itemName) {
  const ratio = salePrice / Math.max(1, baseValue);
  if (ratio < 1.22) return;

  let hitChance = 0;
  let popLoss = 0;
  if (ratio >= 1.5) {
    hitChance = 0.82;
    popLoss = randomInt(4, 7);
  } else if (ratio >= 1.35) {
    hitChance = 0.55;
    popLoss = randomInt(2, 5);
  } else {
    hitChance = 0.28;
    popLoss = randomInt(1, 3);
  }

  if (Math.random() > hitChance) return;
  updatePopularity(-popLoss, `comentários sobre sobrepreço na venda de ${itemName}`);
}

function promptSellItem() {
  showSellSelectionPopup();
}

function churchPromiseAction() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (state.currentAreaId !== "igreja") return;
  if (!state.doctorInfected) {
    addLog("A promessa só pode ser feita quando você está contaminado pela peste.");
    return;
  }

  playPrayerSound();
  state.churchActionsToday += 1;
  notePlayerAction("church", 1.3);
  progressFaithNarrative("promessa de cura");
  applyWorkFatigue(null);
  if (checkPhase1GameOver()) return;
  openChoiceModal({
    title: "Promessa de Cura",
    text: "Escolha a penitência da promessa.",
    actions: [
      {
        label: "Entregar todas as moedas (chance base: 72%)",
        onClick: () => resolveChurchPromiseChoice({ id: "all-coins", label: "entregar todas as moedas", cureChance: 0.72 })
      },
      {
        label: "Deixar de exercer a medicina até o próximo descanso (chance base: 88%)",
        onClick: () => resolveChurchPromiseChoice({ id: "no-medicine", label: "deixar de exercer a medicina", cureChance: 0.88 })
      },
      {
        label: "Cancelar promessa",
        onClick: () => {
          addLog("Promessa cancelada. Nenhuma penitência foi selada.");
          finalizeChurchPromiseFlow();
        }
      }
    ]
  });
}

function applyPromisePenalty(selected) {
  if (selected.id === "all-coins") {
    const donated = state.coins;
    state.coins = 0;
    const extraTithes = Math.min(state.faithBrokenCycles, state.tonics);
    if (extraTithes > 0) {
      state.tonics -= extraTithes;
      addLog(`Penitência agravada: além das moedas, ${extraTithes} tônico(s) foram exigidos.`);
    }
    addLog(`Penitência cumprida: ${donated} moedas foram entregues à igreja.`);
    return;
  }
  const abstinenceDays = 1 + state.faithBrokenCycles;
  state.medicalVowUntilDay = Math.max(state.medicalVowUntilDay, state.day + abstinenceDays - 1);
  addLog(`Penitência cumprida: você não poderá exercer medicina pelos próximos ${abstinenceDays} descanso(s).`);
}

function finalizeChurchPromiseFlow() {
  emitChurchDreadDialogue();
  trackChurchInsistenceAtMaxPersecution();
  maybeQueueDialogueResponse("church");
  render();
}

function resolveChurchPromiseChoice(selected) {
  const relapsePenalty = state.faithBrokenCycles * 0.08 + state.faithMiracleUses * 0.04;
  const tensionPenalty = state.persecutionLevel * 0.012;
  const miracleBoost = clamp(state.faithPoints * 0.0018, 0, 0.16)
    + (state.sacredBibles > 0 ? 0.03 : 0)
    + (state.rosaries > 0 ? 0.025 : 0);
  const finalChance = clamp(selected.cureChance + miracleBoost - tensionPenalty - relapsePenalty, 0.06, 0.93);

  if (Math.random() < finalChance) {
    state.faithPromiseType = selected.id;
    state.faithMiracleUses += 1;
    state.faithMiracleDreamPending = true;
    cureDoctorPlague("promessa de fé");
    showMiracleOverlay();
    updatePopularity(30, "cura pela fé reconhecida como milagre");
    addLog(`Milagre atribuído à promessa (${Math.round(finalChance * 100)}%): cura alcançada.`);
    openChoiceModal({
      title: "Cumprir Penitência",
      text: `Você foi curado. Deseja cumprir a penitência (${selected.label}) agora?`,
      actions: [
        {
          label: "Cumprir penitência",
          onClick: () => {
            applyPromisePenalty(selected);
            state.faithPromiseBroken = false;
            finalizeChurchPromiseFlow();
          }
        },
        {
          label: "Não cumprir",
          onClick: () => {
            state.faithPromiseBroken = true;
            state.faithBrokenCycles += 1;
            addLog("Você recusou pagar a penitência do milagre. A dívida seguirá para o sonho da noite.");
            finalizeChurchPromiseFlow();
          }
        }
      ]
    });
    return;
  }

  const backlash = randomInt(2, 6);
  state.doctorInfectionSeverity = clamp(state.doctorInfectionSeverity + backlash, 0, 100);
  addLog(`A promessa falha (${Math.round(finalChance * 100)}%). A peste reage: +${backlash} contaminação.`);
  triggerPersecutionWhisper(true);
  finalizeChurchPromiseFlow();
}

function churchDivineRevelationAction() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (state.currentAreaId !== "igreja") return;
  playPrayerSound();
  state.churchActionsToday += 1;
  notePlayerAction("church", 1.35);
  progressFaithNarrative("revelação divina");
  applyWorkFatigue(null);
  if (checkPhase1GameOver()) return;

  gainFaithPoints(randomInt(3, 6), "visão simbólica durante a revelação");
  if (Math.random() < 0.42) maybeGrantReligiousItem("revelação divina");

  const visions = [
    "Você vê portas marcadas sob chuva negra e um coral de vozes sem rosto.",
    "Em transe breve, três carroças aparecem levando sacos selados para bairros distintos.",
    "Uma figura de máscara rubra ergue um frasco e a multidão aplaude em silêncio."
  ];
  addLog(`Revelação divina: ${pickDialogue(visions)}`);
  applyChurchPopularity(2, "relatos de revelação na igreja");
  emitChurchDreadDialogue();
  triggerPersecutionWhisper(true);
  trackChurchInsistenceAtMaxPersecution();
  maybeQueueDialogueResponse("church");
  render();
}

function churchConfessionAction() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (state.currentAreaId !== "igreja") return;
  playPrayerSound();
  state.churchActionsToday += 1;
  notePlayerAction("church", 1.15);
  progressFaithNarrative("confissão com o padre");
  applyWorkFatigue(null);
  if (checkPhase1GameOver()) return;

  state.confessions += 1;
  state.hasConfessed = true;
  gainFaithPoints(randomInt(2, 4), "confissão e absolvição parcial");
  maybeNotifyPrayerUnlock();
  setPersecutionLevel(state.persecutionLevel - 1);
  if (Math.random() < 0.36) maybeGrantReligiousItem("confissão");

  addLog("Padre-confessor: 'A peste do corpo teme menos o remédio que a persistência da alma.'");
  applyChurchPopularity(1, "confissão pública e orientação espiritual");
  emitChurchDreadDialogue();
  triggerPersecutionWhisper();
  trackChurchInsistenceAtMaxPersecution();
  maybeQueueDialogueResponse("church");
  render();
}

function prayForPatient() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (!isClinicalArea()) {
    addLog("A oração clínica só pode ser conduzida no Hospital.");
    return;
  }
  if (!canUsePrayerForPatient()) {
    addLog("Você ainda não reúne os requisitos espirituais para orar por pacientes.");
    return;
  }
  if (!state.currentPatient || !state.currentPatient.active) {
    addLog("Não há paciente ativo para receber oração.");
    return;
  }
  if (state.currentPatient.needsFreeCareDecision) {
    addLog("Decida antes se aceita gratuitamente ou recusa o paciente sem recursos.");
    return;
  }

  const patient = state.currentPatient;
  hospitalMiniOnTreatmentAction();
  applyWorkFatigue(patient);
  if (checkPhase1GameOver()) {
    renderPatientPanel();
    return;
  }

  const chance = getPrayerMiracleChance();
  if (Math.random() < chance) {
    patient.hp = 100;
    patient.severity = 0;
    addLog(`Oração clínica (${Math.round(chance * 100)}%): milagre de cura em ${patient.name}.`);
    concludeCase("cured");
    updatePopularity(4, `milagre de oração em ${patient.name}`);
    gainFaithPoints(2, "milagre testemunhado na enfermaria");
  } else {
    const hpGain = randomInt(3, 8);
    const sevDrop = randomInt(4, 9);
    patient.hp = clamp(patient.hp + hpGain, 0, 100);
    patient.severity = clamp(patient.severity - sevDrop, 0, 100);
    addLog(`Oração clínica (${Math.round(chance * 100)}%): sem milagre total, mas ${patient.name} estabiliza (+${hpGain} vida, -${sevDrop} severidade).`);
  }

  if (!state.phase1Failed) render();
}

function churchFaithAction() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (state.currentAreaId !== "igreja") return;
  playPrayerSound();
  state.churchActionsToday += 1;
  notePlayerAction("church", 1.2);
  progressFaithNarrative("ação de fé");
  applyWorkFatigue(null);
  if (checkPhase1GameOver()) return;

  const recovered = randomInt(3, 7);
  state.playerLife = clamp(state.playerLife + recovered, 0, state.playerMaxLife);
  if (state.doctorInfected) {
    const reduce = randomInt(4, 9);
    state.doctorInfectionSeverity = clamp(state.doctorInfectionSeverity - reduce, 0, 100);
    addLog(`Rito de fé realizado: +${recovered} vida e -${reduce} contaminação.`);
    if (state.doctorInfectionSeverity <= 0) cureDoctorPlague("auxílio espiritual");
  } else {
    addLog(`Rito de fé realizado: +${recovered} vida.`);
  }
  if (Math.random() < 0.18) maybeGrantReligiousItem("ação de fé");
  applyChurchPopularity(1, "a comunidade viu seu compromisso na igreja");
  addLog(inferResponsiveDialogue("faith") || pickDialogue(state.faithTier >= 2 ? NARRATIVE_DIALOGUES.faithTier2 : NARRATIVE_DIALOGUES.faithTier1));
  emitChurchDreadDialogue();
  triggerPersecutionWhisper();
  trackChurchInsistenceAtMaxPersecution();
  maybeQueueDialogueResponse("church");
  render();
}

function churchCounselAction() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (state.currentAreaId !== "igreja") return;
  playPrayerSound();
  state.churchActionsToday += 1;
  notePlayerAction("church", 1);
  progressFaithNarrative("conselhos religiosos");
  applyWorkFatigue(null);
  if (checkPhase1GameOver()) return;

  const popGain = randomInt(2, 4);
  const donation = randomInt(2, 6);
  state.coins += donation;
  if (Math.random() < 0.12) maybeGrantReligiousItem("conselhos com o padre");
  applyChurchPopularity(popGain, "conselhos à comunidade após o sermão");
  addLog(`Conselhos na igreja renderam +${donation} moedas em doações.`);
  addLog(inferResponsiveDialogue("faith") || pickDialogue(state.faithTier >= 2 ? NARRATIVE_DIALOGUES.faithTier2 : NARRATIVE_DIALOGUES.faithTier1));
  emitChurchDreadDialogue();
  triggerPersecutionWhisper();
  trackChurchInsistenceAtMaxPersecution();
  maybeQueueDialogueResponse("church");
  render();
}

function churchRandomCareAction() {
  if (state.phase !== 1 || state.phase1Failed || state.awaitingRestChoice) return;
  if (state.currentAreaId !== "igreja") return;
  playPrayerSound();
  state.churchActionsToday += 1;
  notePlayerAction("church", 1);
  progressFaithNarrative("atendimento aleatório da igreja");
  applyWorkFatigue(null);
  if (checkPhase1GameOver()) return;

  const roll = Math.random();
  if (Math.random() < 0.2) maybeGrantReligiousItem("atendimento aleatório");
  if (roll < 0.34) {
    state.tonics += 1;
    addLog("Atendimento aleatório: um devoto entrega 1 tônico como agradecimento.");
    applyChurchPopularity(2, "ajuda emergencial na igreja");
  } else if (roll < 0.67) {
    const coins = randomInt(4, 9);
    state.coins += coins;
    addLog(`Atendimento aleatório: família local doa ${coins} moedas.`);
    applyChurchPopularity(1, "plantão comunitário na igreja");
  } else {
    if (state.doctorInfected) {
      const reduce = randomInt(6, 12);
      state.doctorInfectionSeverity = clamp(state.doctorInfectionSeverity - reduce, 0, 100);
      addLog(`Atendimento aleatório: fórmula monástica reduz ${reduce} de contaminação.`);
      if (state.doctorInfectionSeverity <= 0) cureDoctorPlague("fórmula monástica");
    } else {
      const recovered = randomInt(2, 5);
      state.playerLife = clamp(state.playerLife + recovered, 0, state.playerMaxLife);
      addLog(`Atendimento aleatório: descanso breve da igreja recupera ${recovered} de vida.`);
    }
    applyChurchPopularity(1, "presença constante em atendimentos aleatórios");
  }
  if (Math.random() < 0.55) {
    addLog(inferResponsiveDialogue("faith") || pickDialogue(state.faithTier >= 2 ? NARRATIVE_DIALOGUES.faithTier2 : NARRATIVE_DIALOGUES.faithTier1));
  }
  emitChurchDreadDialogue();
  triggerPersecutionWhisper(true);
  trackChurchInsistenceAtMaxPersecution();
  maybeQueueDialogueResponse("church");
  render();
}

function renderPhase1Actions() {
  actions.innerHTML = "";
  const patient = state.currentPatient;
  const hasActivePatient = !!(patient && patient.active);
  const stage = patient ? getPatientStage(patient).id : "";
  const awaitingFreeDecision = patient && patient.needsFreeCareDecision;
  const medicalVowActive = isMedicalVowActive();

  if (!state.gameStarted) {
    const waitingBtn = document.createElement("button");
    waitingBtn.textContent = "Defina seu nome e inicie a jornada";
    waitingBtn.disabled = true;
    annotateActionButton(waitingBtn, "waiting-start");
    actions.appendChild(waitingBtn);
    finalizePhase1ActionsLayout();
    return;
  }

  if (state.awaitingRestChoice) {
    const innBtn = document.createElement("button");
    innBtn.textContent = "Descansar na hospedaria (20 moedas, +35 vida)";
    innBtn.disabled = state.phase1Failed || state.coins < 20;
    innBtn.addEventListener("click", restAtInn);
    annotateActionButton(innBtn, "rest-inn");
    actions.appendChild(innBtn);

    const clinicBtn = document.createElement("button");
    clinicBtn.textContent = "Descansar no posto (+5 vida, sem custo)";
    clinicBtn.disabled = state.phase1Failed;
    clinicBtn.addEventListener("click", restAtClinic);
    annotateActionButton(clinicBtn, "rest-clinic");
    actions.appendChild(clinicBtn);

    if (!state.phase2DreamPending) {
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Voltar ao plantão";
      cancelBtn.disabled = state.phase1Failed;
      cancelBtn.addEventListener("click", cancelEndDay);
      annotateActionButton(cancelBtn, "rest-cancel");
      actions.appendChild(cancelBtn);
    }
    finalizePhase1ActionsLayout();
    return;
  }

  if (state.travelEncounter && state.travelEncounter.type === "merchant") {
    const item = findRareTravelItem(state.travelEncounter.offerItemId);
    if (item) {
      const merchantInfo = document.createElement("button");
      merchantInfo.textContent = `Caixeiro viajante: ${item.name} (${state.travelEncounter.offerPrice} moedas)`;
      merchantInfo.disabled = true;
      annotateActionButton(merchantInfo, "merchant-info");
      actions.appendChild(merchantInfo);

      const buyBtn = document.createElement("button");
      buyBtn.textContent = "Comprar item raro";
      buyBtn.disabled = state.coins < state.travelEncounter.offerPrice;
      buyBtn.addEventListener("click", buyFromTravelMerchant);
      annotateActionButton(buyBtn, "merchant-buy");
      actions.appendChild(buyBtn);

      const declineBtn = document.createElement("button");
      declineBtn.textContent = "Recusar e seguir";
      declineBtn.addEventListener("click", declineTravelMerchant);
      annotateActionButton(declineBtn, "merchant-decline");
      actions.appendChild(declineBtn);
      finalizePhase1ActionsLayout();
      return;
    }
    state.travelEncounter = null;
  }

  const tonicBtn = document.createElement("button");
  tonicBtn.textContent = `Usar tônico (+vida) [${state.tonics}]`;
  tonicBtn.disabled = state.tonics <= 0 || state.phase1Failed || state.playerLife >= state.playerMaxLife;
  tonicBtn.addEventListener("click", useTonic);
  annotateActionButton(tonicBtn, "use-tonic");
  actions.appendChild(tonicBtn);

  const selfTreatBtn = document.createElement("button");
  selfTreatBtn.textContent = "Autotratamento da peste";
  selfTreatBtn.disabled = state.phase1Failed || !state.doctorInfected || hasActivePatient;
  selfTreatBtn.addEventListener("click", selfTreatPlague);
  annotateActionButton(selfTreatBtn, "self-treat-plague");
  actions.appendChild(selfTreatBtn);

  const antiPotionBtn = document.createElement("button");
  antiPotionBtn.textContent = `Usar Poção Antipeste [${state.antiPlaguePotions}]`;
  antiPotionBtn.disabled = state.phase1Failed || !state.doctorInfected || state.antiPlaguePotions <= 0 || hasActivePatient;
  antiPotionBtn.addEventListener("click", useAntiPlaguePotion);
  annotateActionButton(antiPotionBtn, "use-anti-plague-potion");
  actions.appendChild(antiPotionBtn);

  const rareBandageBtn = document.createElement("button");
  rareBandageBtn.textContent = `Usar Kit de Bandagens Raras [${state.rareBandageKits}]`;
  rareBandageBtn.disabled = state.phase1Failed || state.rareBandageKits <= 0 || hasActivePatient;
  rareBandageBtn.addEventListener("click", useRareBandageKit);
  annotateActionButton(rareBandageBtn, "use-rare-bandage");
  actions.appendChild(rareBandageBtn);

  const medallionBtn = document.createElement("button");
  medallionBtn.textContent = `Usar Medalhão Consagrado [${state.sacredMedallions}]`;
  medallionBtn.disabled = state.phase1Failed || state.sacredMedallions <= 0 || hasActivePatient;
  medallionBtn.addEventListener("click", useSacredMedallion);
  annotateActionButton(medallionBtn, "use-sacred-medallion");
  actions.appendChild(medallionBtn);

  const serumBtn = document.createElement("button");
  serumBtn.textContent = `Usar Soro Alquímico [${state.alchemicalSerums}]`;
  serumBtn.disabled = state.phase1Failed || state.alchemicalSerums <= 0 || hasActivePatient;
  serumBtn.addEventListener("click", useAlchemicalSerum);
  annotateActionButton(serumBtn, "use-alchemical-serum");
  actions.appendChild(serumBtn);

  if (state.currentAreaId === "hospital") {
    const cityHosp = getCityHospitalState(state.currentCityId);
    if (awaitingFreeDecision) {
      const acceptFreeBtn = document.createElement("button");
      acceptFreeBtn.textContent = "Aceitar atendimento gratuito";
      acceptFreeBtn.disabled = state.phase1Failed || medicalVowActive;
      acceptFreeBtn.addEventListener("click", acceptFreePatient);
      annotateActionButton(acceptFreeBtn, "accept-free-patient");
      actions.appendChild(acceptFreeBtn);

      const refuseBtn = document.createElement("button");
      refuseBtn.textContent = "Recusar paciente sem recursos";
      refuseBtn.disabled = state.phase1Failed || medicalVowActive;
      refuseBtn.addEventListener("click", refusePoorPatient);
      annotateActionButton(refuseBtn, "refuse-poor-patient");
      actions.appendChild(refuseBtn);
    }

    techniques.forEach((tech) => {
      const chance = patient ? Math.round(getTreatmentChance(patient, tech) * 100) : Math.round(tech.base * 100);
      const isolationFull = tech.id === "isolamento" && cityHosp.ambulatory.length >= 4;
      const btn = document.createElement("button");
      btn.textContent = `${tech.name} (${chance}%)`;
      if (isolationFull) {
        btn.textContent = `${tech.name} (amb. lotado 4/4)`;
        btn.title = "Ambulatório desta cidade está cheio (4/4).";
      }
      btn.disabled = !patient || !patient.active || state.phase1Failed || awaitingFreeDecision || medicalVowActive || isolationFull;
      btn.addEventListener("click", () => applyTechnique(tech));
      annotateActionButton(btn, `tech-${tech.id}`);
      actions.appendChild(btn);
    });

    const prayerChance = Math.round(getPrayerMiracleChance() * 100);
    const prayerBtn = document.createElement("button");
    prayerBtn.textContent = canUsePrayerForPatient()
      ? `Orar pelo paciente (${prayerChance}% milagre)`
      : "Orar pelo paciente (bloqueado)";
    prayerBtn.disabled = !canUsePrayerForPatient() || !patient || !patient.active || state.phase1Failed || awaitingFreeDecision || medicalVowActive;
    prayerBtn.addEventListener("click", prayForPatient);
    annotateActionButton(prayerBtn, "pray-patient");
    actions.appendChild(prayerBtn);

    const releaseBtn = document.createElement("button");
    releaseBtn.textContent = "Liberar paciente";
    releaseBtn.disabled = !patient || stage !== "remissao" || state.phase1Failed || awaitingFreeDecision || medicalVowActive;
    releaseBtn.addEventListener("click", releasePatient);
    annotateActionButton(releaseBtn, "release-patient");
    actions.appendChild(releaseBtn);

    const abandonBtn = document.createElement("button");
    abandonBtn.textContent = "Desistir do paciente";
    abandonBtn.disabled = !patient || !patient.active || state.phase1Failed || awaitingFreeDecision;
    abandonBtn.addEventListener("click", abandonPatient);
    annotateActionButton(abandonBtn, "abandon-patient");
    actions.appendChild(abandonBtn);

    const nextPatientBtn = document.createElement("button");
    nextPatientBtn.textContent = "Chamar próximo paciente";
    nextPatientBtn.disabled = state.phase1Failed || hasActivePatient || medicalVowActive;
    nextPatientBtn.addEventListener("click", summonNextPatient);
    annotateActionButton(nextPatientBtn, "summon-patient");
    actions.appendChild(nextPatientBtn);

    cityHosp.ambulatory
      .filter((ambPatient) => canAmbulatoryRelease(ambPatient))
      .forEach((ambPatient) => {
        const releaseAmbBtn = document.createElement("button");
        releaseAmbBtn.textContent = `Liberar do ambulatório: ${ambPatient.name}`;
        releaseAmbBtn.disabled = state.phase1Failed || hasActivePatient;
        releaseAmbBtn.title = `Vida ${Math.round(ambPatient.hp)}/100 | Em remissão`;
        releaseAmbBtn.addEventListener("click", () => {
          releaseAmbulatoryPatient(ambPatient.ambId);
          render();
        });
        annotateActionButton(releaseAmbBtn, `release-amb-${ambPatient.ambId}`);
        actions.appendChild(releaseAmbBtn);
      });

  }

  if (state.currentAreaId === "loja") {
    const openBuyBtn = document.createElement("button");
    openBuyBtn.textContent = "Comprar item";
    openBuyBtn.disabled = state.phase1Failed;
    openBuyBtn.addEventListener("click", openShopBuyMenu);
    annotateActionButton(openBuyBtn, "shop-open-buy");
    actions.appendChild(openBuyBtn);

    const openSellBtn = document.createElement("button");
    openSellBtn.textContent = "Vender item";
    openSellBtn.disabled = state.phase1Failed;
    openSellBtn.addEventListener("click", openShopSellMenu);
    annotateActionButton(openSellBtn, "shop-open-sell");
    actions.appendChild(openSellBtn);
  }

  if (state.currentAreaId === "tenda") {
    const triageBtn = document.createElement("button");
    triageBtn.textContent = "Triagem";
    triageBtn.disabled = state.phase1Failed;
    triageBtn.onclick = () => openTriagePopup();
    triageBtn.addEventListener("click", openTriagePopup);
    annotateActionButton(triageBtn, "tent-triage");
    actions.appendChild(triageBtn);
  }

  if (state.currentAreaId === "residencial") {
    const intel = getResidentialCityIntel(state.currentCityId);
    const selectedHouse = getSelectedResidentialHouse(state.currentCityId);

    intel.houses.forEach((house) => {
      const houseBtn = document.createElement("button");
      houseBtn.textContent = house.label;
      houseBtn.disabled = state.phase1Failed;
      houseBtn.addEventListener("click", () => selectResidentialHouse(house.id));
      annotateActionButton(houseBtn, `res-house-${house.id}`);
      actions.appendChild(houseBtn);
    });

    const observeBtn = document.createElement("button");
    observeBtn.textContent = "Observar casa";
    observeBtn.disabled = state.phase1Failed || !selectedHouse;
    observeBtn.addEventListener("click", observeResidentialHouse);
    annotateActionButton(observeBtn, "res-observe-house");
    actions.appendChild(observeBtn);

    const approachBtn = document.createElement("button");
    approachBtn.textContent = "Se aproximar";
    approachBtn.disabled = state.phase1Failed || !selectedHouse;
    approachBtn.addEventListener("click", approachResidentialHouse);
    annotateActionButton(approachBtn, "res-approach-house");
    actions.appendChild(approachBtn);

    const knockBtn = document.createElement("button");
    knockBtn.textContent = "Bater na porta";
    knockBtn.disabled = state.phase1Failed || !selectedHouse;
    knockBtn.addEventListener("click", knockResidentialHouseDoor);
    annotateActionButton(knockBtn, "res-knock-house");
    actions.appendChild(knockBtn);

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Limpar seleção da casa";
    clearBtn.disabled = state.phase1Failed || !selectedHouse;
    clearBtn.addEventListener("click", clearResidentialHouseSelection);
    annotateActionButton(clearBtn, "res-clear-house");
    actions.appendChild(clearBtn);
  }

  if (state.currentAreaId === "estabulo") {
    const handlerBtn = document.createElement("button");
    handlerBtn.textContent = "Conversar com tratador";
    handlerBtn.disabled = state.phase1Failed || hasActivePatient;
    handlerBtn.addEventListener("click", stableTalkToHandler);
    annotateActionButton(handlerBtn, "stable-talk-handler");
    actions.appendChild(handlerBtn);

    const travelBtn = document.createElement("button");
    travelBtn.textContent = `Escolher destino de viagem (${getTravelCost()} moedas)`;
    travelBtn.disabled = state.phase1Failed || hasActivePatient;
    travelBtn.addEventListener("click", openStableTravelPopup);
    annotateActionButton(travelBtn, "stable-travel-dest");
    actions.appendChild(travelBtn);
  }

  if (state.currentAreaId === "igreja") {
    const faithActionDistorted = state.persecutionLevel >= 10 && state.churchDreadManifestLevel >= 2;
    const faithBtn = document.createElement("button");
    faithBtn.textContent = "Ação de Fé";
    faithBtn.disabled = state.phase1Failed || hasActivePatient;
    if (faithActionDistorted) faithBtn.classList.add("faith-tremor");
    faithBtn.addEventListener("click", churchFaithAction);
    annotateActionButton(faithBtn, "church-faith");
    actions.appendChild(faithBtn);

    const counselBtn = document.createElement("button");
    counselBtn.textContent = "Dar Conselhos";
    counselBtn.disabled = state.phase1Failed || hasActivePatient;
    if (faithActionDistorted) counselBtn.classList.add("faith-tremor");
    counselBtn.addEventListener("click", churchCounselAction);
    annotateActionButton(counselBtn, "church-counsel");
    actions.appendChild(counselBtn);

    const randomCareBtn = document.createElement("button");
    randomCareBtn.textContent = "Atendimento Aleatório";
    randomCareBtn.disabled = state.phase1Failed || hasActivePatient;
    if (faithActionDistorted) randomCareBtn.classList.add("faith-tremor");
    randomCareBtn.addEventListener("click", churchRandomCareAction);
    annotateActionButton(randomCareBtn, "church-random-care");
    actions.appendChild(randomCareBtn);

    const revelationBtn = document.createElement("button");
    revelationBtn.textContent = "Revelação Divina";
    revelationBtn.disabled = state.phase1Failed || hasActivePatient;
    if (faithActionDistorted) revelationBtn.classList.add("faith-tremor");
    revelationBtn.addEventListener("click", churchDivineRevelationAction);
    annotateActionButton(revelationBtn, "church-revelation");
    actions.appendChild(revelationBtn);

    const confessionBtn = document.createElement("button");
    confessionBtn.textContent = "Confessar com o Padre";
    confessionBtn.disabled = state.phase1Failed || hasActivePatient;
    if (faithActionDistorted) confessionBtn.classList.add("faith-tremor");
    confessionBtn.addEventListener("click", churchConfessionAction);
    annotateActionButton(confessionBtn, "church-confession");
    actions.appendChild(confessionBtn);

    const promiseBtn = document.createElement("button");
    promiseBtn.textContent = "Fazer promessa (cura da peste)";
    promiseBtn.disabled = state.phase1Failed || hasActivePatient || !state.doctorInfected;
    if (faithActionDistorted) promiseBtn.classList.add("faith-tremor");
    promiseBtn.addEventListener("click", churchPromiseAction);
    annotateActionButton(promiseBtn, "church-promise");
    actions.appendChild(promiseBtn);
  }

  if (state.maskInvitations > 0 && state.phase === 1) {
    const inviteBtn = document.createElement("button");
    inviteBtn.textContent = state.doctorInfected
      ? "Convite do baile (trate a peste para abrir)"
      : "Abrir convite lacrado do baile";
    inviteBtn.disabled = state.phase1Failed || hasActivePatient || state.doctorInfected;
    inviteBtn.addEventListener("click", openMaskInvitationFromInventory);
    annotateActionButton(inviteBtn, "open-mask-invite");
    actions.appendChild(inviteBtn);
  }

  const finishDayBtn = document.createElement("button");
  finishDayBtn.textContent = "Finalizar dia de trabalho";
  finishDayBtn.disabled = state.phase1Failed || hasActivePatient;
  finishDayBtn.addEventListener("click", finishWorkDay);
  annotateActionButton(finishDayBtn, "finish-day");
  actions.appendChild(finishDayBtn);
  finalizePhase1ActionsLayout();
}

function transitionToPhase2() {
  state.phase = 2;
  state.phase2DreamPending = false;
  state.phase2DreamActive = false;
  state.phase2DreamArmed = false;
  state.maskInvitePending = false;
  state.maskEventActive = false;
  state.maskFastForwardActive = false;
  state.maskBallStage = 0;
  state.maskBallClues = 0;
  state.maskBallInteractions = 0;
  state.maskBallItems = [];
  state.maskBallApex = false;
  state.maskTriggerResolved = true;
  state.pendingDialogue = null;
  resetSleepDeprivationCycle();
  hidePhase2DreamOverlay();
  hideMaskOverlays();
  document.body.classList.remove("phase-ball");
  clearPhase1ThemeOverrides();
  document.body.className = "phase-2";
  phaseTitle.textContent = "Fase 2: Rastro Oculto";
  addLog("As estatísticas da ala médica escondem um padrão impossível.");
  addLog("Você entende: a peste também é uma ferramenta política.");
  render();
}

function runInvestigation(action) {
  const evidenceGain = randomInt(action.evidence - 4, action.evidence + 6);
  const suspicionGain = randomInt(action.suspicion - 4, action.suspicion + 6);
  state.evidence = Math.min(100, state.evidence + evidenceGain);
  state.suspicion = Math.min(100, state.suspicion + suspicionGain);

  addLog(action.text);
  addLog(`+${evidenceGain} evidência, +${suspicionGain} exposição.`);

  if (state.suspicion >= 100 && state.evidence < 85) {
    addLog("Você foi marcado pelos conspiradores cedo demais. Recomece para tentar outro caminho.");
    actions.innerHTML = "";
    const restart = document.createElement("button");
    restart.textContent = "Reiniciar campanha";
    restart.addEventListener("click", () => window.location.reload());
    annotateActionButton(restart, "phase2-restart");
    actions.appendChild(restart);
    return;
  }

  if (state.evidence >= 100) {
    transitionToPhase3();
    return;
  }

  render();
}

function renderPhase2Actions() {
  actions.innerHTML = "";
  phase2Actions.forEach((a) => {
    const btn = document.createElement("button");
    btn.textContent = a.label;
    btn.addEventListener("click", () => runInvestigation(a));
    annotateActionButton(btn, `phase2-${a.id}`);
    actions.appendChild(btn);
  });
  finalizePhase2ActionsLayout();
}

function transitionToPhase3() {
  state.phase = 3;
  state.pendingDialogue = null;
  clearPhase1ThemeOverrides();
  document.body.className = "phase-3";
  phaseTitle.textContent = "Fase 3: O Coração da Conspiração";
  addLog("No salão interno, o conselho revela o plano: controlar o caos para impedir colapso total.");
  addLog("Você pode quebrar a engrenagem ou vestir a máscara dos que a comandam.");
  render();
}

function chooseEnding(kind) {
  state.ending = kind;
  actions.innerHTML = "";

  if (kind === "destroy") {
    addLog("Você destrói os arquivos, laboratórios e líderes do círculo.");
    addLog("A peste recua, mas instituições entram em guerra por vacâncias de poder.");
    addLog("Final: Ruptura. A liberdade surge junto de consequências imprevisíveis.");
  } else {
    addLog("Você aceita o pacto e assume um assento no círculo.");
    addLog("A ordem é preservada, mas à custa de novos surtos planejados.");
    addLog("Final: Continuidade. Você salva o presente e condena o futuro.");
  }

  const restart = document.createElement("button");
  restart.textContent = "Jogar novamente";
  restart.addEventListener("click", () => window.location.reload());
  annotateActionButton(restart, "phase3-restart");
  actions.appendChild(restart);
  finalizePhase3ActionsLayout();
  renderStats();
}

function renderPhase3Actions() {
  actions.innerHTML = "";

  const destroy = document.createElement("button");
  destroy.textContent = "Destruir a Conspiração";
  destroy.addEventListener("click", () => chooseEnding("destroy"));
  annotateActionButton(destroy, "phase3-destroy");

  const join = document.createElement("button");
  join.textContent = "Juntar-se à Conspiração";
  join.addEventListener("click", () => chooseEnding("join"));
  annotateActionButton(join, "phase3-join");

  actions.appendChild(destroy);
  actions.appendChild(join);
  finalizePhase3ActionsLayout();
}

function render() {
  if (exitGameBtn) {
    exitGameBtn.classList.toggle("hidden", !state.gameStarted);
  }
  if (state.gameStarted && state.playerLife <= 0) {
    checkPhase1GameOver();
    return;
  }
  renderStats();
  renderActiveEffects();
  renderPatientPanel();
  renderMaps();
  renderInventory();
  renderNarrativeSpotlight();
  renderMiniMap();

  if (state.phase === 1) renderPhase1Actions();
  if (state.phase === 2) renderPhase2Actions();
  if (state.phase === 3 && !state.ending) renderPhase3Actions();
  syncPersistentUiPopups();
  queueCustomScrollbarRefresh();
}

function init() {
  state.mapMenuOpen = true;
  state.mapSelectedCityId = state.currentCityId;
  ensureAllCitiesHospitalState();
  ensureAllCitiesStableState();
  ensureAllCitiesMiniState();
  initBloodStains();
  if (mapMenuToggle) mapMenuToggle.addEventListener("click", showCityInfoPopup);
  if (inventoryToggle) inventoryToggle.addEventListener("click", toggleInventoryPanel);
  if (inventoryExpandBtn) inventoryExpandBtn.addEventListener("click", openInventoryExpanded);
  if (hudTraitsExpandBtn) hudTraitsExpandBtn.addEventListener("click", openHudTraitsPopup);
  if (hudObjectivesExpandBtn) hudObjectivesExpandBtn.addEventListener("click", openHudObjectivesPopup);
  startJourneyBtn.addEventListener("click", startJourney);
  exitGameBtn.addEventListener("click", openExitModal);
  exitCancelBtn.addEventListener("click", closeExitModal);
  exitSaveBtn.addEventListener("click", () => exitGame(true));
  exitNoSaveBtn.addEventListener("click", () => exitGame(false));
  if (choiceCloseBtn) choiceCloseBtn.addEventListener("click", closeChoiceModal);
  if (hospitalReminderClose) hospitalReminderClose.addEventListener("click", closeHospitalReminderPopup);
  if (miniMapAreaClose) miniMapAreaClose.addEventListener("click", closeMiniMapAreaPopup);
  if (cityInfoClose) cityInfoClose.addEventListener("click", closeCityInfoPopup);
  if (inventoryPopupClose) inventoryPopupClose.addEventListener("click", closeInventoryPopup);
  if (inventoryExpandModalClose) inventoryExpandModalClose.addEventListener("click", closeInventoryPopup);
  if (inventoryExpandModal) {
    inventoryExpandModal.addEventListener("click", (event) => {
      if (event.target === inventoryExpandModal) closeInventoryPopup();
    });
  }
  if (hudObjectivesExpandModalClose) hudObjectivesExpandModalClose.addEventListener("click", closeHudObjectivesExpandModal);
  if (hudObjectivesExpandModal) {
    hudObjectivesExpandModal.addEventListener("click", (event) => {
      if (event.target === hudObjectivesExpandModal) closeHudObjectivesExpandModal();
    });
  }
  if (hudTraitsExpandModalClose) hudTraitsExpandModalClose.addEventListener("click", closeHudTraitsExpandModal);
  if (hudTraitsExpandModal) {
    hudTraitsExpandModal.addEventListener("click", (event) => {
      if (event.target === hudTraitsExpandModal) closeHudTraitsExpandModal();
    });
  }
  if (hudSectionPopupClose) hudSectionPopupClose.addEventListener("click", closeHudSectionPopup);
  if (inviteNoticeClose) inviteNoticeClose.addEventListener("click", closeInviteNoticePopup);
  if (ambulatoryReportClose) ambulatoryReportClose.addEventListener("click", closeAmbulatoryReportPopup);
  if (corpseDisposalClose) corpseDisposalClose.addEventListener("click", closeCorpseDisposalPopup);
  if (corpseDisposalLaterBtn) corpseDisposalLaterBtn.addEventListener("click", closeCorpseDisposalPopup);
  if (corpseDisposalPayBtn) {
    corpseDisposalPayBtn.addEventListener("click", () => {
      const cityId = corpseDisposalPayBtn.dataset.cityId || state.currentCityId;
      handleCorpseDisposalPayment(cityId);
    });
  }
  if (tradeCloseBtn) tradeCloseBtn.addEventListener("click", closeTradePopup);
  if (tradeOfferInput) {
    tradeOfferInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") submitTradeCounterOffer();
    });
  }
  if (miniMapStage) {
    miniMapStage.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const zone = target.closest(".mini-zone");
      if (!(zone instanceof HTMLElement)) return;
      const zoneId = zone.dataset.zoneId || "";
      const zoneLabel = zone.dataset.zoneLabel || zone.textContent || "Área";
      showMiniMapAreaPopup(zoneId, zoneLabel);
    });
    miniMapStage.addEventListener("keydown", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      const zone = target.closest(".mini-zone");
      if (!(zone instanceof HTMLElement)) return;
      event.preventDefault();
      const zoneId = zone.dataset.zoneId || "";
      const zoneLabel = zone.dataset.zoneLabel || zone.textContent || "Área";
      showMiniMapAreaPopup(zoneId, zoneLabel);
    });
  }
  if (collapseOkBtn) collapseOkBtn.addEventListener("click", applyCollapseConsequences);
  if (finalDeathRestartBtn) finalDeathRestartBtn.addEventListener("click", () => window.location.reload());
  saveSlotsList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest("[data-save-slot]");
    if (!(card instanceof HTMLElement)) return;
    const slotId = Number(card.dataset.saveSlot);
    if (!SAVE_SLOT_IDS.includes(slotId)) return;
    selectSaveSlot(slotId);
  });
  deleteSaveBtn.addEventListener("click", deleteSelectedSave);
  doctorNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") startJourney();
  });
  tutorialBackBtn.addEventListener("click", closeTutorialModal);
  tutorialNextBtn.addEventListener("click", closeTutorialModal);
  tutorialSkipBtn.addEventListener("click", disableTutorial);
  actions.addEventListener("mouseover", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest("button");
    if (!(btn instanceof HTMLButtonElement)) return;
    triggerActionMixOnHover(btn);
  });
  actions.addEventListener("click", (event) => {
    if (actionMixClickRelay) return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest("button");
    if (!(btn instanceof HTMLButtonElement)) return;
    if ((btn.dataset.actionId || "") === "tent-triage") {
      event.preventDefault();
      event.stopPropagation();
      openTriagePopup();
      return;
    }
    const mixedActionId = (btn.dataset.mixedActionId || "").trim();
    if (!mixedActionId) return;
    const partnerBtn = actions.querySelector(`button[data-action-id="${mixedActionId}"]`);
    if (!(partnerBtn instanceof HTMLButtonElement) || partnerBtn === btn) return;
    event.preventDefault();
    event.stopPropagation();
    btn.textContent = btn.dataset.baseLabel || btn.textContent || "";
    btn.dataset.mixedActionId = "";
    triggerMiniMapReaction(mixedActionId);
    actionMixClickRelay = true;
    partnerBtn.click();
    actionMixClickRelay = false;
  }, true);
  actions.addEventListener("click", (event) => {
    if (actionMixClickRelay) return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest("button");
    if (!(btn instanceof HTMLButtonElement)) return;
    const actionId = (btn.dataset.actionId || "").trim();
    if (!actionId) return;
    triggerMiniMapReaction(actionId);
  });
  renderMapMenuState();
  renderSaveSlots();
  applyTimeTheme();
  startClockTimer();
  hidePhase2DreamOverlay();
  hideMaskOverlays();
  resetSleepDeprivationCycle();
  closeCollapsePopup();
  closeHospitalReminderPopup();
  closeChoiceModal();
  closeCityInfoPopup();
  closeInventoryPopup();
  closeHudSectionPopup();
  closeHudObjectivesExpandModal();
  closeHudTraitsExpandModal();
  closeInviteNoticePopup();
  closeAmbulatoryReportPopup();
  closeCorpseDisposalPopup();
  closeTradePopup();
  resetShopMenuState();
  hideFinalDeathOverlay();
  syncInventoryPanelState();
  if (miracleOverlay) miracleOverlay.classList.add("hidden");
  if (infectionOverlay) infectionOverlay.classList.add("hidden");
  introModal.classList.remove("hidden");
  tutorialModal.classList.add("hidden");
  exitModal.classList.add("hidden");
  doctorNameInput.focus();
  render();
}

init();
