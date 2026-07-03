/**
 * Fuente única de verdad del contenido educativo y de la lista de piezas
 * que existen en la escena 3D. `explodeOrder` define el orden del recorrido
 * de scroll (de la fuente de energía a la indicación de la hora).
 */

export type ClockCategory =
  | "energia"
  | "transmision"
  | "regulacion"
  | "estructura"
  | "visualizacion";

export interface ClockComponent {
  id: string;
  name: string;
  category: ClockCategory;
  shortDescription: string;
  importance: string;
  explodeOrder: number;
  relatedIds?: string[];
}

export const clockComponents: ClockComponent[] = [
  {
    id: "corona",
    name: "Corona",
    category: "energia",
    shortDescription:
      "El botón giratorio en el lateral de la caja. Al girarlo se da cuerda al muelle real; al tirar de él, se pueden ajustar la hora y, en algunos calibres, la fecha.",
    importance:
      "Es el único punto de entrada de energía e información desde el exterior. Sin ella no habría forma de recargar el muelle ni de poner el reloj en hora.",
    explodeOrder: 1,
    relatedIds: ["muelle-real", "tren-cuerda"],
  },
  {
    id: "tren-cuerda",
    name: "Tren de cuerda (trinquete)",
    category: "energia",
    shortDescription:
      "Conjunto de piñones y un trinquete que transforma el giro de la corona en el enrollado del muelle dentro del barrilete, permitiendo el giro en un solo sentido.",
    importance:
      "El trinquete impide que el muelle se destense de golpe al soltar la corona: sin él, toda la energía acumulada se liberaría de forma incontrolada.",
    explodeOrder: 2,
    relatedIds: ["corona", "barrilete"],
  },
  {
    id: "muelle-real",
    name: "Muelle real (resorte principal)",
    category: "energia",
    shortDescription:
      "Una cinta metálica muy larga enrollada en espiral dentro del barrilete. Almacena energía mecánica al tensarse y la libera lentamente al distenderse.",
    importance:
      "Es la fuente de energía de todo el reloj: sin él ninguna otra pieza tiene fuerza para moverse. La reserva de marcha del reloj depende de cuánta energía puede almacenar.",
    explodeOrder: 3,
    relatedIds: ["barrilete", "corona"],
  },
  {
    id: "barrilete",
    name: "Barrilete",
    category: "energia",
    shortDescription:
      "Tambor cilíndrico dentado que contiene el muelle real en su interior y transmite su fuerza, ya suavizada, al resto del tren de ruedas.",
    importance:
      "Convierte la energía bruta y desigual del muelle en un giro constante y controlado; es el primer eslabón de la cadena que reparte esa fuerza por todo el mecanismo.",
    explodeOrder: 4,
    relatedIds: ["muelle-real", "rueda-central"],
  },
  {
    id: "rueda-central",
    name: "Rueda de centro (minutero)",
    category: "transmision",
    shortDescription:
      "Primera rueda del tren de ruedas tras el barrilete. Da una vuelta completa por hora y mueve directamente la aguja de los minutos.",
    importance:
      "Fija la referencia temporal principal del reloj: toda la reducción de velocidad posterior (segundos) y la lectura de la hora en la esfera dependen de su giro exacto.",
    explodeOrder: 5,
    relatedIds: ["barrilete", "rueda-intermedia", "aguja-minutero"],
  },
  {
    id: "rueda-intermedia",
    name: "Rueda intermedia (tercera rueda)",
    category: "transmision",
    shortDescription:
      "Rueda de paso que conecta la rueda de centro con la rueda de segundos, aumentando progresivamente la velocidad de giro.",
    importance:
      "Sin esta reducción intermedia el salto de velocidad entre el minutero y el segundero sería demasiado brusco para que los engranajes lo transmitieran con precisión.",
    explodeOrder: 6,
    relatedIds: ["rueda-central", "rueda-segundos"],
  },
  {
    id: "rueda-segundos",
    name: "Rueda de segundos",
    category: "transmision",
    shortDescription:
      "Gira una vez por minuto y mueve la aguja de los segundos, cuando el calibre la incluye.",
    importance:
      "Es la parte del tren de ruedas que gira más rápido antes del escape, por lo que amplifica cualquier error de fabricación: su precisión es un indicador directo de la calidad del reloj.",
    explodeOrder: 7,
    relatedIds: ["rueda-intermedia", "rueda-escape", "aguja-segundero"],
  },
  {
    id: "rueda-escape",
    name: "Rueda de escape",
    category: "regulacion",
    shortDescription:
      "Última rueda del tren, con dientes de perfil especial. En vez de girar libremente, es frenada y liberada diente a diente por el áncora.",
    importance:
      "Es la válvula que deja escapar la energía del muelle en pulsos discretos y regulares en lugar de un flujo continuo: sin ella el reloj no marcaría el tiempo, simplemente se desenrollaría de golpe.",
    explodeOrder: 8,
    relatedIds: ["rueda-segundos", "ancora"],
  },
  {
    id: "ancora",
    name: "Áncora (pallet fork)",
    category: "regulacion",
    shortDescription:
      "Pieza en forma de horquilla con dos rubíes (paletas) que engranan alternativamente con la rueda de escape, bloqueándola y soltándola en cada oscilación del volante.",
    importance:
      "Es el intermediario mecánico entre el tren de ruedas y el volante: transforma las oscilaciones regulares del volante en el 'tic-tac' que libera la energía paso a paso, y a la vez le da al volante el pequeño impulso que necesita para no detenerse.",
    explodeOrder: 9,
    relatedIds: ["rueda-escape", "volante"],
  },
  {
    id: "volante",
    name: "Volante (balance)",
    category: "regulacion",
    shortDescription:
      "Una rueda con peso concentrado en el borde que oscila hacia adelante y atrás sobre su propio eje, como el péndulo de un reloj de pared pero en horizontal.",
    importance:
      "Es el oscilador que marca el ritmo real del reloj: cada oscilación completa corresponde a una fracción de segundo fija. Toda la precisión del reloj depende de que estas oscilaciones sean extremadamente regulares.",
    explodeOrder: 10,
    relatedIds: ["ancora", "espiral"],
  },
  {
    id: "espiral",
    name: "Espiral (muelle del balance)",
    category: "regulacion",
    shortDescription:
      "Un muelle finísimo enrollado en espiral, unido al eje del volante, que lo empuja de vuelta al centro tras cada oscilación.",
    importance:
      "Es lo que convierte el volante en un oscilador isócrono: gracias a la espiral, cada oscilación dura lo mismo independientemente de su amplitud, lo cual es la base física de que un reloj mecánico pueda ser preciso.",
    explodeOrder: 11,
    relatedIds: ["volante", "raqueta"],
  },
  {
    id: "raqueta",
    name: "Raqueta (regulador)",
    category: "regulacion",
    shortDescription:
      "Pequeña palanca que modifica la longitud efectiva de la espiral, adelantando o atrasando ligeramente el ritmo del volante.",
    importance:
      "Es el único ajuste fino de precisión del reloj: permite compensar pequeñas variaciones de fabricación para que el reloj ni adelante ni atrase en exceso.",
    explodeOrder: 12,
    relatedIds: ["espiral"],
  },
  {
    id: "rubies",
    name: "Rubíes (jewels)",
    category: "estructura",
    shortDescription:
      "Pequeños cojinetes de rubí sintético, extremadamente duros y pulidos, colocados en los puntos donde los ejes de las ruedas giran a más velocidad o soportan más carga.",
    importance:
      "Reducen la fricción y el desgaste hasta niveles que el metal contra metal no podría igualar; sin ellos el reloj se desgastaría rápido y perdería precisión con el tiempo.",
    explodeOrder: 13,
    relatedIds: ["ancora", "volante", "rueda-escape"],
  },
  {
    id: "platina",
    name: "Platina",
    category: "estructura",
    shortDescription:
      "La placa base de latón sobre la que se apoyan y alinean todos los ejes de ruedas del movimiento.",
    importance:
      "Es el esqueleto del reloj: fija la posición relativa exacta de cada rueda entre sí. Cualquier desalineación aquí impide que los engranajes engranen correctamente.",
    explodeOrder: 14,
    relatedIds: ["puentes"],
  },
  {
    id: "puentes",
    name: "Puentes",
    category: "estructura",
    shortDescription:
      "Piezas metálicas atornilladas sobre la platina que sujetan el otro extremo de cada eje, dejando las ruedas 'flotando' entre platina y puente.",
    importance:
      "Sujetan los ejes con la rigidez necesaria para que soporten miles de oscilaciones por hora sin desalinearse ni generar fricción extra.",
    explodeOrder: 15,
    relatedIds: ["platina"],
  },
  {
    id: "esfera",
    name: "Esfera (dial)",
    category: "visualizacion",
    shortDescription:
      "La cara visible del reloj, con los índices o números de las horas, sobre la que se desplazan las agujas.",
    importance:
      "Es la interfaz entre todo el mecanismo interno y quien lee la hora: por preciso que sea el movimiento, su información solo es útil si se puede leer con claridad.",
    explodeOrder: 16,
    relatedIds: ["aguja-horario", "aguja-minutero"],
  },
  {
    id: "aguja-horario",
    name: "Aguja horaria",
    category: "visualizacion",
    shortDescription:
      "La aguja más corta, da una vuelta completa a la esfera cada 12 horas, movida por un engranaje reductor desde la rueda de centro.",
    importance:
      "Traduce el giro rápido interno del tren de ruedas a la escala de tiempo que realmente importa a quien consulta el reloj: las horas del día.",
    explodeOrder: 17,
    relatedIds: ["aguja-minutero", "esfera"],
  },
  {
    id: "aguja-minutero",
    name: "Aguja minutera",
    category: "visualizacion",
    shortDescription:
      "Solidaria al eje de la rueda de centro, da una vuelta completa cada hora.",
    importance:
      "Es la lectura de tiempo más usada habitualmente y el punto de referencia que también sincroniza, mediante un tren de ruedas reductor, el movimiento de la aguja horaria.",
    explodeOrder: 18,
    relatedIds: ["rueda-central", "aguja-horario"],
  },
  {
    id: "aguja-segundero",
    name: "Aguja segundera",
    category: "visualizacion",
    shortDescription:
      "Cuando existe, da una vuelta completa cada minuto y es la aguja donde se aprecia visualmente el 'tic-tac' del escape.",
    importance:
      "Es la evidencia visual directa de que el escape está funcionando: su avance a saltos regulares es la manifestación externa de todo el mecanismo de regulación.",
    explodeOrder: 19,
    relatedIds: ["rueda-segundos"],
  },
  {
    id: "cristal",
    name: "Cristal",
    category: "estructura",
    shortDescription:
      "La cubierta transparente (zafiro, mineral o acrílico) que protege la esfera y las agujas del exterior.",
    importance:
      "Protege el mecanismo de polvo, humedad y golpes sin impedir la lectura de la hora; su dureza determina buena parte de la resistencia del reloj al uso diario.",
    explodeOrder: 20,
    relatedIds: ["esfera"],
  },
  {
    id: "caja",
    name: "Caja",
    category: "estructura",
    shortDescription:
      "El envoltorio exterior metálico que aloja y protege todo el movimiento, la esfera y el cristal.",
    importance:
      "Es la última línea de defensa del mecanismo frente a golpes, agua y polvo, y la que finalmente sostiene todo el conjunto sobre la muñeca.",
    explodeOrder: 21,
    relatedIds: ["platina", "cristal"],
  },
];

export function getComponentById(id: string): ClockComponent | undefined {
  return clockComponents.find((c) => c.id === id);
}

export function getComponentsByCategory(
  category: ClockCategory,
): ClockComponent[] {
  return clockComponents
    .filter((c) => c.category === category)
    .sort((a, b) => a.explodeOrder - b.explodeOrder);
}

export const orderedComponents = [...clockComponents].sort(
  (a, b) => a.explodeOrder - b.explodeOrder,
);
