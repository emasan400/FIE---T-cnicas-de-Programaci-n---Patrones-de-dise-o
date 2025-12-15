import { CategoryType, CategoryData } from './types';

export const PATTERN_DATA: CategoryData[] = [
  {
    type: CategoryType.CREATIONAL,
    color: "blue",
    description: "Orientado a objetos. Solucionan problemas de creación de instancias.",
    patterns: [
      {
        id: "singleton",
        name: "Singleton",
        category: CategoryType.CREATIONAL,
        description: "Asegura que una clase tenga absolutamente una única instancia en todo el sistema y proporciona una variable global estática para acceder a ella.",
        academicContext: "El patrón Singleton aborda dos problemas (violando el Principio de Responsabilidad Única): garantizar que una clase tenga una única instancia y proporcionar un acceso global a dicha instancia. Es común en objetos que manejan conexiones a base de datos o sistemas de archivos. Se implementa haciendo privado el constructor y creando un método estático de acceso.",
        realWorldExamples: [
            { title: "java.lang.Runtime", explanation: "Permite a la aplicación interactuar con el entorno en el que se ejecuta. Solo hay un entorno por ejecución." },
            { title: "Spring Beans", explanation: "Por defecto, el contenedor de Spring crea una sola instancia de cada componente inyectable (Scope Singleton)." },
            { title: "Logger Services", explanation: "Centraliza la escritura de logs en un solo archivo o salida para evitar conflictos de acceso concurrentes." }
        ],
        visualType: "singleton",
        visualSteps: [
          "Estado inicial: No existe instancia en memoria.",
          "Cliente A solicita instancia: El sistema detecta vacío y crea la Instancia Única.",
          "Cliente B solicita instancia: El sistema detecta que YA existe y la devuelve (Bloquea creación).",
          "Cliente C solicita instancia: Se devuelve la misma referencia de memoria."
        ],
        codeSnippet: `class Singleton {
  private static instance: Singleton;
  private value: number;

  private constructor() { 
      this.value = Math.random();
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public logic(): void {
      console.log("Singleton Value: " + this.value);
  }
}

// Uso
const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
s1.logic();
s2.logic();`,
        outputSnippet: `Singleton Value: 0.5821...
Singleton Value: 0.5821...
// (Ambos son el mismo objeto)`
      },
      {
        id: "factory",
        name: "Factory Method",
        category: CategoryType.CREATIONAL,
        description: "Define un método para crear objetos, permitiendo que las subclases alteren el tipo de objetos que se crearán sin cambiar el código que los usa.",
        academicContext: "El Factory Method sugiere reemplazar las llamadas directas de construcción de objetos (new) por llamadas a un método fábrica especial. Esto cumple con el Principio Open/Closed: podemos introducir nuevos tipos de productos al programa sin romper el código cliente existente.",
        realWorldExamples: [
          { title: "Java Calendar.getInstance()", explanation: "Devuelve una instancia de GregorianCalendar o BuddhistCalendar según la configuración regional." },
          { title: "Logística", explanation: "Una clase LogísticaBase delega a LogísticaMarítima o LogísticaTerrestre la creación del transporte adecuado (Barco o Camión)." },
          { title: "Pasarelas de Pago", explanation: "PaymentFactory crea instancias de PaypalProcessor, StripeProcessor o BankTransferProcessor según la selección del usuario." }
        ],
        visualType: "factory",
        visualSteps: [
          "El cliente solicita un 'Transporte' genérico a la Fábrica.",
          "La lógica interna de la Fábrica decide qué tipo específico crear (ej. Camión).",
          "La Fábrica instancia el objeto concreto (new Camion()).",
          "El cliente recibe el objeto y lo usa sin saber si es camión o barco."
        ],
        codeSnippet: `abstract class Creator {
  public abstract factoryMethod(): Product;

  public operation(): string {
    const product = this.factoryMethod();
    return "Creator: " + product.operation();
  }
}

class ConcreteCreatorA extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

// Uso
const factory = new ConcreteCreatorA();
console.log(factory.operation());`,
        outputSnippet: `Creator: Resultado de ConcreteProductA`
      },
      {
        id: "builder",
        name: "Builder",
        category: CategoryType.CREATIONAL,
        description: "Permite construir objetos complejos paso a paso. Útil cuando un objeto necesita muchas configuraciones opcionales antes de ser usado.",
        academicContext: "Permite producir diferentes tipos y representaciones de un objeto empleando el mismo código de construcción. A diferencia de otros patrones creacionales, Builder no requiere que los productos tengan una interfaz común. Es ideal para evitar constructores con listas de parámetros interminables (Constructor Telescópico).",
        realWorldExamples: [
          { title: "StringBuilder (Java/C#)", explanation: "Construye cadenas de texto complejas agregando partes incrementalmente (append) antes de generar el string final." },
          { title: "Peticiones HTTP", explanation: "Librerías como Axios o Fetch permiten configurar headers, body y auth paso a paso antes de enviar la solicitud." },
          { title: "Configuración de Pizza", explanation: "Permite seleccionar masa, salsa, e ingredientes paso a paso para crear una Pizza final única." }
        ],
        visualType: "builder",
        visualSteps: [
          "Se instancia el Builder vacío.",
          "Paso 1: Se agrega la estructura base.",
          "Paso 2: Se configura un módulo opcional.",
          "Paso 3: Se agregan detalles finales.",
          "Build: Se compila y entrega el Objeto Complejo final."
        ],
        codeSnippet: `class CarBuilder {
  private car: Car;
  constructor() { this.car = new Car(); }
  
  setSeats(n: number) { this.car.seats = n; return this; }
  setEngine(engine: string) { this.car.engine = engine; return this; }
  setGPS(hasGPS: boolean) { this.car.gps = hasGPS; return this; }
  
  build() { return this.car; }
}

// Uso
const car = new CarBuilder()
            .setSeats(2)
            .setEngine("V8")
            .setGPS(true)
            .build();
console.log(car);`,
        outputSnippet: `{
  seats: 2,
  engine: "V8",
  gps: true
}`
      },
      {
        id: "prototype",
        name: "Prototype",
        category: CategoryType.CREATIONAL,
        description: "Permite copiar objetos existentes sin hacer que el código dependa de sus clases. Ideal para duplicar configuraciones complejas.",
        academicContext: "Permite copiar objetos existentes sin que el código dependa de sus clases. Útil cuando el costo de crear un nuevo objeto es alto (ej. consultas a BD, cálculos pesados) o cuando se necesita una copia exacta del estado actual.",
        realWorldExamples: [
          { title: "JavaScript Objects", explanation: "Todos los objetos en JS son prototipos. `Object.create()` crea uno nuevo usando otro como molde." },
          { title: "Configuración de Juegos", explanation: "Clonar un enemigo base (con stats configurados) para crear hordas, en lugar de configurar cada uno desde cero." },
          { title: "Simulación Biológica", explanation: "En simulaciones celulares, una célula se divide creando una copia exacta (clon) de sí misma." }
        ],
        visualType: "prototype",
        visualSteps: [
          "Existe un Objeto Original con propiedades definidas (ADN).",
          "El cliente solicita una copia exacta.",
          "El objeto ejecuta 'clone()': Copia sus valores a una nueva instancia.",
          "Resultado: Un nuevo objeto independiente listo para usarse."
        ],
        codeSnippet: `class Robot implements Prototype {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x; this.y = y;
  }

  clone(): Robot {
    // Clonación superficial
    return new Robot(this.x, this.y);
  }
}

const r1 = new Robot(10, 20);
const r2 = r1.clone();
console.log(r1 === r2); // false (referencia)
console.log(r2.x); // 10 (valor)`,
        outputSnippet: `false
10`
      }
    ]
  },
  {
    type: CategoryType.STRUCTURAL,
    color: "emerald",
    description: "Cómo interactúan y se componen las partes del sistema.",
    patterns: [
      {
        id: "adapter",
        name: "Adapter",
        category: CategoryType.STRUCTURAL,
        description: "Actúa como un traductor entre dos objetos incompatibles, permitiendo que colaboren sin modificar su código fuente.",
        academicContext: "Actúa como un envoltorio (wrapper). Convierte la interfaz de una clase en otra que esperan los clientes. Permite integrar clases legacy o librerías de terceros sin modificar su código fuente.",
        realWorldExamples: [
          { title: "Drivers JDBC", explanation: "Permiten que una aplicación Java estándar hable con Oracle, MySQL o PostgreSQL usando la misma interfaz." },
          { title: "Integración de APIs", explanation: "Un adaptador transforma datos XML de un servicio viejo a JSON para que el frontend moderno lo entienda." },
          { title: "Enchufes Eléctricos", explanation: "El adaptador físico permite conectar un enchufe europeo (redondo) en una toma americana (plana)." }
        ],
        visualType: "adapter",
        visualSteps: [
          "El Cliente envía una señal 'Cuadrada' (Formato moderno).",
          "El Adaptador intercepta, recibe la señal y la traduce.",
          "El Adaptador envía una señal 'Redonda' (Formato legacy).",
          "El Sistema Viejo recibe la señal entendible y procesa."
        ],
        codeSnippet: `interface MediaPlayer {
  play(file: string): void;
}

class AdvancedPlayer {
  playVlc(file: string) { console.log("Playing vlc: " + file); }
}

class Adapter implements MediaPlayer {
  private advPlayer = new AdvancedPlayer();
  
  play(file: string) {
    // Adaptación de interfaz
    this.advPlayer.playVlc(file);
  }
}

const player = new Adapter();
player.play("movie.vlc");`,
        outputSnippet: `Playing vlc: movie.vlc`
      },
      {
        id: "facade",
        name: "Fachada (Facade)",
        category: CategoryType.STRUCTURAL,
        description: "Proporciona una interfaz simplificada (una 'fachada') a una biblioteca, un framework o un conjunto complejo de clases.",
        academicContext: "Define una interfaz de nivel más alto que hace que el subsistema sea más fácil de usar. Es útil para estructurar un sistema en capas, reduciendo el acoplamiento entre los clientes y los componentes del subsistema.",
        realWorldExamples: [
            { title: "jQuery", explanation: "Oculta la complejidad de las llamadas al DOM nativo del navegador detrás de métodos simples como `$(...).hide()`." },
            { title: "Compiladores", explanation: "Un IDE usa una fachada para compilar: `build()`, ocultando el análisis léxico, sintáctico y generación de código." },
            { title: "Smart Home Hub", explanation: "Un botón 'Modo Cine' (Fachada) apaga luces, baja persianas y enciende la TV (Subsistemas)." }
        ],
        visualType: "facade",
        visualSteps: [
          "El Cliente pide una tarea macro a la Fachada (ej. Encender PC).",
          "La Fachada activa internamente el Subsistema A (CPU).",
          "La Fachada activa el Subsistema B (Memoria).",
          "La Fachada activa el Subsistema C (Disco).",
          "El Cliente recibe la confirmación sin lidiar con los subsistemas."
        ],
        codeSnippet: `class ComputerFacade {
  private cpu = new CPU();
  private memory = new Memory();
  private disk = new HardDrive();

  start() {
    this.cpu.freeze();
    this.memory.load(0, this.disk.read(0, 10));
    this.cpu.jump(0);
    this.cpu.execute();
    console.log("Computer started");
  }
}`,
        outputSnippet: `CPU freeze
Disk read
Memory load
CPU execute
Computer started`
      },
      {
        id: "proxy",
        name: "Proxy",
        category: CategoryType.STRUCTURAL,
        description: "Controla el acceso a un objeto original. Permite hacer algo antes o después de que la solicitud llegue al objeto real.",
        academicContext: "Controla el acceso al objeto original, permitiendo hacer algo antes o después de que la solicitud llegue al objeto original. Tipos comunes: Proxy remoto, Proxy virtual (carga bajo demanda), Proxy de protección (permisos).",
        realWorldExamples: [
            { title: "Hibernate (Lazy Loading)", explanation: "No carga los datos de la base de datos hasta que el código realmente pide acceder a ellos." },
            { title: "Servidor Proxy Nginx", explanation: "Recibe peticiones web, verifica seguridad o cache, y luego las pasa al servidor real." },
            { title: "CDN (Content Delivery)", explanation: "Un proxy caché entrega imágenes estáticas al usuario sin molestar al servidor principal." }
        ],
        visualType: "proxy",
        visualSteps: [
          "El Cliente envía una solicitud al Proxy (Escudo).",
          "El Proxy detiene la solicitud y verifica permisos/seguridad.",
          "Acceso Concedido: El Proxy deja pasar la solicitud al Objeto Real.",
          "El Objeto Real procesa y responde a través del Proxy."
        ],
        codeSnippet: `class RealImage implements Image {
  display() { console.log("Mostrando imagen HD"); }
}

class ProxyImage implements Image {
  private realImage: RealImage;
  private filename: string;

  constructor(filename: string) { this.filename = filename; }

  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(); // Lazy Loading
    }
    this.realImage.display();
  }
}`,
        outputSnippet: `// Primera llamada
Cargando imagen...
Mostrando imagen HD

// Segunda llamada
Mostrando imagen HD`
      },
      {
        id: "bridge",
        name: "Bridge",
        category: CategoryType.STRUCTURAL,
        description: "Divide una clase grande en dos jerarquías separadas (abstracción e implementación) que pueden desarrollarse independientemente.",
        academicContext: "Evita la 'Explosión de Clases' (Producto Cartesiano) usando Composición sobre Herencia. En lugar de crear subclases para cada combinación (ej. CírculoRojo, CírculoAzul, CuadradoRojo...), se crean dos jerarquías: 'Forma' y 'Color'. La 'Forma' tiene una referencia (puente) al 'Color'. Esto permite agregar nuevas Formas o Colores sin modificar el otro lado.",
        realWorldExamples: [
            { title: "Drivers Gráficos", explanation: "La API gráfica (Abstracción) es la misma, pero el driver (Implementación) cambia si usas Nvidia o AMD." },
            { title: "Sistemas Operativos", explanation: "La función 'Guardar Archivo' (Abstracción) delega al sistema de archivos específico (NTFS, EXT4) (Implementación)." },
            { title: "Métodos de Pago", explanation: "Abstracción (Pagar Online/Pagar Tienda) vs Implementación (Paypal/Stripe/Banco). Se pueden combinar libremente." }
        ],
        visualType: "bridge",
        visualSteps: [
          "Lado A: Abstracción (Control Remoto). Lado B: Implementación (Dispositivos).",
          "Conexión: Se enchufa el Control a la TV (Puente establecido).",
          "Acción: El Control envía señal a través del puente -> TV funciona.",
          "Cambio: Se desenchufa TV y se enchufa Radio. Misma interfaz, distinta implementación."
        ],
        codeSnippet: `interface Device {
  enable(): void;
  disable(): void;
}

class RemoteControl {
  protected device: Device;
  constructor(device: Device) { this.device = device; }
  
  toggle() {
    console.log("Remote: Toggle Power");
    this.device.enable();
  }
}

// Uso dinámico
const tv = new TvDevice();
const remote = new RemoteControl(tv);
remote.toggle();`,
        outputSnippet: `Remote: Toggle Power
TV: Turning on...`
      }
    ]
  },
  {
    type: CategoryType.BEHAVIORAL,
    color: "orange",
    description: "Pendiente de cambios. Asignación de responsabilidades.",
    patterns: [
      {
        id: "iterator",
        name: "Iterador",
        category: CategoryType.BEHAVIORAL,
        description: "Permite recorrer elementos de una colección sin exponer su estructura interna (lista, pila, árbol).",
        academicContext: "Extrae el comportamiento de recorrido de una colección en un objeto separado llamado iterador. Permite recorrer diferentes estructuras (árboles, listas, grafos) con una interfaz uniforme, soportando múltiples recorridos simultáneos.",
        realWorldExamples: [
            { title: "Spotify Playlist", explanation: "El botón 'Siguiente' sabe cuál es la próxima canción sin que tú sepas cómo está guardada la lista en memoria." },
            { title: "Java Iterable", explanation: "Permite usar bucles `for-each` sobre cualquier colección." },
            { title: "Social Feeds", explanation: "Carga de posts infinita. El iterador pide 'más posts' al llegar al final sin importar si vienen de caché o red." }
        ],
        visualType: "iterator",
        visualSteps: [
          "Se crea el Iterador apuntando al inicio de la colección.",
          "Llamada next(): Devuelve Elemento 1 y avanza el puntero.",
          "Llamada next(): Devuelve Elemento 2 y avanza el puntero.",
          "Llamada next(): Fin de la colección."
        ],
        codeSnippet: `const numbers = [1, 2, 3];
const iterator = numbers[Symbol.iterator]();

let result = iterator.next();
while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}`,
        outputSnippet: `1
2
3`
      },
      {
        id: "memento",
        name: "Memento",
        category: CategoryType.BEHAVIORAL,
        description: "Permite guardar y restaurar el estado previo de un objeto sin revelar los detalles de su implementación.",
        academicContext: "Permite guardar y restaurar el estado previo de un objeto sin revelar los detalles de su implementación (encapsulamiento). Fundamental para operaciones de 'Deshacer'.",
        realWorldExamples: [
            { title: "Editores de Texto", explanation: "La función Ctrl+Z restaura el estado del documento a un punto anterior guardado." },
            { title: "Videojuegos", explanation: "Los puntos de guardado (Save points) almacenan el estado del jugador para cargarlo después." },
            { title: "Git", explanation: "Cada 'Commit' es un memento del estado de los archivos en un momento dado." }
        ],
        visualType: "memento",
        visualSteps: [
          "El Objeto tiene un Estado A.",
          "Se toma una 'Foto' (Memento) del Estado A y se guarda en una caja fuerte.",
          "El Objeto cambia su estado a B.",
          "Se solicita Restaurar: Se saca la foto de la caja y el Objeto vuelve a ser A."
        ],
        codeSnippet: `class Editor {
  private text: string = "";

  type(words: string) { this.text += words; }
  save(): Memento { return new Memento(this.text); }
  restore(m: Memento) { this.text = m.getState(); }
}

const editor = new Editor();
editor.type("Hola");
const saved = editor.save(); // Checkpoint
editor.type(" Mundo");
console.log(editor.text); // Hola Mundo
editor.restore(saved);
console.log(editor.text); // Hola`,
        outputSnippet: `Hola Mundo
Hola`
      },
      {
        id: "state",
        name: "State",
        category: CategoryType.BEHAVIORAL,
        description: "Permite a un objeto alterar su comportamiento cuando su estado interno cambia. Parece que el objeto cambió de clase.",
        academicContext: "El patrón sugiere encapsular los comportamientos específicos de cada estado en clases separadas y delegar la ejecución al objeto que representa el estado actual. Elimina máquinas de estados gigantes basadas en condicionales.",
        realWorldExamples: [
            { title: "Proceso de Compra", explanation: "Un pedido en estado 'Pendiente' permite pagar. En estado 'Enviado' no permite pagar, solo rastrear." },
            { title: "Reproductor Multimedia", explanation: "El botón Play funciona distinto si está pausado (reanuda) o detenido (inicia de cero)." },
            { title: "Semáforo", explanation: "El comportamiento de los autos cambia (parar, esperar, avanzar) según el estado de la luz." }
        ],
        visualType: "state",
        visualSteps: [
          "El Contexto está en Estado 'Bloqueado'.",
          "Usuario hace clic: El Estado 'Bloqueado' rechaza la acción.",
          "Evento externo cambia el estado a 'Desbloqueado'.",
          "Usuario hace clic: El Estado 'Desbloqueado' ejecuta la acción."
        ],
        codeSnippet: `interface State {
  clickPlay(player: Player): void;
}

class LockedState implements State {
  clickPlay(player: Player) {
    console.log("Locked... do nothing");
  }
}

class ReadyState implements State {
  clickPlay(player: Player) {
    console.log("Playing music...");
    player.changeState(new PlayingState());
  }
}`,
        outputSnippet: `Playing music...
(Estado cambia a PlayingState)`
      },
      {
        id: "strategy",
        name: "Strategy",
        category: CategoryType.BEHAVIORAL,
        description: "Permite definir una familia de algoritmos, poner cada uno en una clase separada y hacer sus objetos intercambiables.",
        academicContext: "Permite definir una familia de algoritmos, poner cada uno en una clase separada y hacer sus objetos intercambiables. El cliente puede elegir el algoritmo concreto en tiempo de ejecución.",
        realWorldExamples: [
            { title: "GPS y Rutas", explanation: "El algoritmo cambia si eliges ruta 'Más rápida', 'Sin peajes' o 'Caminando'." },
            { title: "Formatos de Imagen", explanation: "Al guardar, eliges la estrategia de compresión: JPG (con pérdida) o PNG (sin pérdida)." },
            { title: "Ordenamiento", explanation: "Collections.sort() puede usar QuickSort o MergeSort según el tamaño de la lista (Estrategia interna)." }
        ],
        visualType: "strategy",
        visualSteps: [
          "Contexto configurado con Estrategia A (Rápida).",
          "Ejecución: Los datos fluyen por el camino A (Proceso veloz).",
          "El usuario cambia la configuración a Estrategia B (Lenta/Detallada).",
          "Ejecución: Los mismos datos ahora fluyen por el camino B."
        ],
        codeSnippet: `interface RouteStrategy {
  buildRoute(a: string, b: string): void;
}

class CarStrategy implements RouteStrategy {
  buildRoute(a: string, b: string) { console.log("Ruta carretera para auto"); }
}

class WalkStrategy implements RouteStrategy {
  buildRoute(a: string, b: string) { console.log("Ruta peatonal"); }
}

const context = new Context(new CarStrategy());
context.execute("Home", "Work");`,
        outputSnippet: `Ruta carretera para auto`
      },
      {
        id: "observer",
        name: "Observer",
        category: CategoryType.BEHAVIORAL,
        description: "Permite definir un mecanismo de suscripción para notificar a múltiples objetos sobre cualquier evento que le suceda al objeto que están observando.",
        academicContext: "Define una dependencia de uno a muchos entre objetos. Cuando el objeto 'Sujeto' cambia su estado, notifica a todos los 'Observadores'. Es clave en arquitecturas dirigidas por eventos.",
        realWorldExamples: [
            { title: "Newsletter / YouTube", explanation: "Cuando el creador sube contenido (Sujeto), todos los suscriptores (Observers) reciben una alerta." },
            { title: "Interfaz de Usuario", explanation: "Un botón (Sujeto) notifica a múltiples funciones (Observers) cuando es clickeado." },
            { title: "Bolsa de Valores", explanation: "El Ticker de una acción notifica a miles de pantallas de traders cuando el precio cambia." }
        ],
        visualType: "observer",
        visualSteps: [
          "El Sujeto central tiene una lista de suscriptores.",
          "Ocurre un evento importante en el Sujeto.",
          "El Sujeto emite una onda expansiva (Broadcast) a todos.",
          "Cada Observador reacciona independientemente a la señal."
        ],
        codeSnippet: `class Subject {
  private observers: Observer[] = [];
  
  subscribe(o: Observer) { this.observers.push(o); }
  
  notify(msg: string) {
    this.observers.forEach(o => o.update(msg));
  }
}

const sub = new Subject();
sub.subscribe({ update: (msg) => console.log("Obs1: " + msg) });
sub.subscribe({ update: (msg) => console.log("Obs2: " + msg) });

sub.notify("Hello World");`,
        outputSnippet: `Obs1: Hello World
Obs2: Hello World`
      }
    ]
  },
  {
    type: CategoryType.ARCHITECTURAL,
    color: "purple",
    description: "Estructura de alto nivel. Objetivo final del sistema.",
    patterns: [
      {
        id: "soa",
        name: "Orientada a Servicios (SOA)",
        category: CategoryType.ARCHITECTURAL,
        description: "El sistema se compone de servicios independientes que se comunican a través de una red.",
        academicContext: "Arquitectura donde los componentes son servicios autónomos y débilmente acoplados. Se comunican mediante un bus de servicios o protocolos estándar (SOAP/REST). Facilita la escalabilidad y reutilización empresarial.",
        realWorldExamples: [
            { title: "E-commerce Enterprise", explanation: "Servicio de Inventario, Servicio de Pagos y Servicio de Envíos son independientes y se hablan por red." },
            { title: "Gobierno Digital", explanation: "Diferentes ministerios exponen servicios de datos que se consumen entre sí." },
            { title: "Sitios de Viajes", explanation: "Agregan vuelos de múltiples aerolíneas consumiendo sus servicios web." }
        ],
        visualType: "soa",
        visualSteps: [
          "Servicio A inicia un proceso y necesita datos.",
          "Envía una solicitud al Bus de Servicios (Red).",
          "El Bus enruta la solicitud al Servicio B.",
          "Servicio B responde y la información regresa al A."
        ],
        codeSnippet: `// Definición de Servicio (WSDL / Interface)
interface UserService {
  getUser(id: string): User;
}

// Comunicación vía protocolo (ej. SOAP/HTTP)
<soap:Envelope>
  <soap:Body>
    <GetUser><Id>123</Id></GetUser>
  </soap:Body>
</soap:Envelope>`,
        outputSnippet: `HTTP 200 OK
{ "id": "123", "name": "John" }`
      },
      {
        id: "data-centric",
        name: "Centrada en Datos",
        category: CategoryType.ARCHITECTURAL,
        description: "Una base de datos central es el núcleo del sistema, y los clientes acceden a ella frecuentemente.",
        academicContext: "El estado del sistema se mantiene en un almacén de datos central. Los componentes clientes son relativamente independientes entre sí, pero fuertemente acoplados al almacén de datos. Garantiza consistencia de datos.",
        realWorldExamples: [
            { title: "Sistemas ERP", explanation: "Todos los módulos (RRHH, Ventas, Logística) leen y escriben en la misma gran base de datos." },
            { title: "Dropbox / Google Drive", explanation: "El almacenamiento de archivos es la verdad central; los clientes solo sincronizan." },
            { title: "Registro de Windows", explanation: "Una base de datos central de configuración que usan todas las aplicaciones del SO." }
        ],
        visualType: "data-centric",
        visualSteps: [
          "La Base de Datos Central está activa (latido).",
          "Cliente A escribe un dato en el centro.",
          "Cliente B, sincronizado, lee inmediatamente el cambio.",
          "Cliente C actualiza ese dato. Todo converge al centro."
        ],
        codeSnippet: `// Componente A
db.execute("INSERT INTO orders VALUES (...)");

// Componente B
const orders = db.execute("SELECT * FROM orders");
process(orders);

// No hay comunicación directa A -> B.
// Todo pasa por la DB.`,
        outputSnippet: `Query OK, 1 row affected.
Rows matched: 1`
      },
      {
        id: "layered",
        name: "Por Capas (N-Tier)",
        category: CategoryType.ARCHITECTURAL,
        description: "Organiza el código en capas jerárquicas (Presentación, Negocio, Datos). Cada capa solo habla con la de abajo.",
        academicContext: "Estructura el sistema en grupos de sub-tareas, donde cada grupo es una capa. La regla fundamental es que una capa solo puede utilizar los servicios de la capa inmediatamente inferior (Layers estricto) o inferiores (Layers relajado).",
        realWorldExamples: [
            { title: "Aplicaciones Web Clásicas", explanation: "Frontend (JS) -> Backend API (Java/C#) -> Base de Datos (SQL)." },
            { title: "Android OS", explanation: "Apps -> Framework Java -> Librerías C++ -> Kernel Linux." },
            { title: "Firmware de Red", explanation: "Modelo OSI de 7 capas (Física, Enlace, Red, Transporte, etc)." }
        ],
        visualType: "layered",
        visualSteps: [
          "Petición llega a la capa superior (Presentación).",
          "Pasa a la capa intermedia (Negocio) para procesar reglas.",
          "Llega a la capa inferior (Datos) para persistencia.",
          "La respuesta sube paso a paso hasta volver al usuario."
        ],
        codeSnippet: `// Controller (Presentation)
function getUser(id) {
  return userService.findById(id); 
}

// Service (Business)
class UserService {
  findById(id) {
    // Validaciones lógicas...
    return userRepository.query(id);
  }
}

// Repository (Data)
class UserRepository {
  query(id) { return db.find(id); }
}`,
        outputSnippet: `UI <- Service <- Repo <- DB`
      },
      {
        id: "mvc",
        name: "MVC",
        category: CategoryType.ARCHITECTURAL,
        description: "Separa la aplicación en tres roles: Modelo (Datos), Vista (Interfaz) y Controlador (Lógica de entrada).",
        academicContext: "Divide la aplicación en tres componentes interconectados. El Modelo gestiona datos y lógica. La Vista muestra la información. El Controlador acepta entradas y las convierte en comandos para el Modelo o la Vista.",
        realWorldExamples: [
            { title: "Django / Rails", explanation: "Frameworks web que fuerzan esta estructura para mantener el código ordenado." },
            { title: "iOS Development (UIKit)", explanation: "Usa ViewControllers para gestionar las vistas y los modelos de datos." },
            { title: "Unity UI", explanation: "Separación entre la lógica del juego (Modelo), los scripts de input (Controller) y el Canvas (Vista)." }
        ],
        visualType: "mvc",
        visualSteps: [
          "Usuario envía input al Controlador.",
          "Controlador manipula el Modelo (Datos).",
          "El Modelo cambia y notifica a la Vista.",
          "La Vista se actualiza y el ciclo se cierra."
        ],
        codeSnippet: `// Model
class User { 
  name: string; 
}

// Controller
class UserController {
  changeName(u: User, n: string) {
    u.name = n;
    view.render(u);
  }
}

// View
const view = {
  render: (u) => console.log("Render HTML: " + u.name)
}`,
        outputSnippet: `Render HTML: NewName`
      },
      {
        id: "client-server",
        name: "Cliente-Servidor",
        category: CategoryType.ARCHITECTURAL,
        description: "Muchos clientes solicitan recursos a un servidor centralizado que responde.",
        academicContext: "Los clientes inician la comunicación solicitando servicios. Los servidores esperan solicitudes y responden. Permite distribución física y escalabilidad del servidor independiente del cliente.",
        realWorldExamples: [
            { title: "Navegador Web", explanation: "Chrome (Cliente) pide páginas a Google.com (Servidor)." },
            { title: "Email", explanation: "Outlook (Cliente) descarga correos del servidor Exchange." },
            { title: "Bases de Datos", explanation: "Herramienta SQL (Cliente) se conecta al motor de BD (Servidor) para lanzar queries." }
        ],
        visualType: "client-server",
        visualSteps: [
          "El Cliente envía un Paquete de Solicitud (Request).",
          "La solicitud viaja rápidamente por la red.",
          "El Servidor procesa y genera respuesta.",
          "El Paquete de Respuesta (Response) regresa al cliente."
        ],
        codeSnippet: `// Client
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));

// Server (Node.js express)
app.get('/data', (req, res) => {
  res.json({ message: "Hello Client" });
});`,
        outputSnippet: `{ message: "Hello Client" }`
      }
    ]
  }
];