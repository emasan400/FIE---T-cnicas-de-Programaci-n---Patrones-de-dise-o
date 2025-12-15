import React, { useState, useEffect } from 'react';
import { PATTERN_DATA } from './data';
import { CategoryType } from './types';
import PatternVisualizer from './components/PatternVisualizer';
import CodeViewer from './components/CodeViewer';
import { 
  Box, 
  Layers, 
  Share2, 
  Layout, 
  ChevronRight, 
  BookOpen, 
  Monitor,
  Menu,
  X,
  CheckCircle2,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(CategoryType.CREATIONAL);
  const [activePatternId, setActivePatternId] = useState<string>(PATTERN_DATA[0].patterns[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark Mode Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Helper to find current pattern object
  const currentCategoryData = PATTERN_DATA.find(c => c.type === activeCategory);
  const currentPattern = currentCategoryData?.patterns.find(p => p.id === activePatternId) || PATTERN_DATA[0].patterns[0];

  const getCategoryIcon = (type: CategoryType) => {
    switch (type) {
      case CategoryType.CREATIONAL: return <Box size={18} />;
      case CategoryType.STRUCTURAL: return <Layout size={18} />;
      case CategoryType.BEHAVIORAL: return <Share2 size={18} />;
      case CategoryType.ARCHITECTURAL: return <Layers size={18} />;
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 leading-tight">
              <BookOpen className="text-indigo-600 dark:text-indigo-400 shrink-0" />
              Patrones de Diseño
            </h1>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {PATTERN_DATA.map((cat) => (
              <div key={cat.type}>
                <div 
                  className={`flex items-center gap-2 mb-2 px-2 text-xs font-bold uppercase tracking-wider
                    ${activeCategory === cat.type ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}
                  `}
                >
                  {getCategoryIcon(cat.type)}
                  {cat.type}
                </div>
                <div className="space-y-1">
                  {cat.patterns.map((pattern) => (
                    <button
                      key={pattern.id}
                      onClick={() => {
                        setActiveCategory(cat.type);
                        setActivePatternId(pattern.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all flex items-center justify-between group
                        ${activePatternId === pattern.id 
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}
                      `}
                    >
                      {pattern.name} 
                      {activePatternId === pattern.id && <ChevronRight size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </nav>
        
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-xs text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700">
              Material Educativo Interactivo
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-slate-50 dark:bg-slate-950">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 z-30 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <button onClick={toggleMobileMenu} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
                <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">Patrones de diseño</span>
             </div>
             <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </div>

        <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
          
          {/* Header Section */}
          <header>
            <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide 
                  ${currentCategoryData?.color === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : ''}
                  ${currentCategoryData?.color === 'emerald' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : ''}
                  ${currentCategoryData?.color === 'orange' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300' : ''}
                  ${currentCategoryData?.color === 'purple' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' : ''}
                `}>
                    {activeCategory}
                </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {currentPattern.name}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl border-l-4 border-indigo-500 pl-4">
                {currentPattern.description}
            </p>
          </header>

          {/* Top Section: Visualizer & Context Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
            
            {/* Visualizer Column */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800 mb-4">
                  <Share2 size={18} className="text-slate-500 dark:text-slate-400" /> Modelo de Interacción
              </h3>
              <PatternVisualizer type={currentPattern.visualType} />
            </div>

            {/* Academic Context Column */}
            <div>
                 <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800 mb-4">
                    <BookOpen size={18} className="text-slate-500 dark:text-slate-400" /> Contexto Académico
                </h3>
                <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm leading-relaxed text-justify">
                        {currentPattern.academicContext}
                    </div>
                    
                    <div className="mt-6">
                        <span className="font-bold text-slate-800 dark:text-slate-200 block mb-3 text-sm uppercase tracking-wide">¿Cuándo aplicar este patrón?</span>
                        <ul className="space-y-3">
                            {getUsagePoints(currentPattern.id).map((point, i) => (
                                <li key={i} className="flex gap-3 items-start text-sm">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

          </div>

          {/* Full Width Section: Real World Examples */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
              <h4 className="text-slate-800 dark:text-white font-bold text-lg flex items-center gap-2 mb-6 uppercase tracking-wide">
                  <Monitor size={20} className="text-indigo-600 dark:text-indigo-400" />
                  Aplicaciones en el Mundo Real
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPattern.realWorldExamples.map((ex, i) => (
                      <li key={i} className="flex flex-col gap-3 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-lg border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 font-bold text-base">
                            <CheckCircle2 size={18} />
                            <span>{ex.title}</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {ex.explanation}
                          </p>
                      </li>
                  ))}
              </ul>
          </section>

          {/* Code Section */}
          <section className="pt-10 border-t border-slate-200 dark:border-slate-800">
             <div className="mb-4">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                    Implementación Técnica
                 </h3>
                 <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 ml-4">
                     Ejemplo simplificado en TypeScript.
                 </p>
             </div>
             <CodeViewer code={currentPattern.codeSnippet} output={currentPattern.outputSnippet} />
          </section>

        </div>
      </main>
    </div>
  );
};

// Helper for usage points
function getUsagePoints(id: string): string[] {
    const usageMap: Record<string, string[]> = {
        'singleton': ['Cuando necesitas controlar estrictamente el acceso a un recurso compartido (logger, driver BD).', 'Cuando necesitas una variable global más estricta y limpia.'],
        'factory': ['Cuando no sabes de antemano qué tipos exactos y dependencias tendrán los objetos.', 'Para extender las librerías internas de un framework.'],
        'builder': ['Para evitar un "Constructor Telescópico" con demasiados parámetros.', 'Cuando quieres crear distintas representaciones de un mismo producto complejo.'],
        'prototype': ['Cuando el código no debe depender de las clases concretas de objetos a copiar.', 'Para reducir el costo de creación de objetos inicializados.'],
        'adapter': ['Cuando quieres usar una clase existente pero su interfaz no es compatible con el resto del código.', 'Para crear clases reutilizables que cooperen con clases incompatibles.'],
        'facade': ['Para ofrecer una interfaz limitada y sencilla a un subsistema complejo.', 'Para estructurar un subsistema en capas.'],
        'proxy': ['Lazy Initialization: Cargar objetos pesados solo bajo demanda.', 'Control de Acceso: Comprobar permisos antes de ejecutar tareas.', 'Logging: Mantener un historial de solicitudes.'],
        'bridge': ['Cuando quieres dividir una clase monolítica en variantes funcionales.', 'Para cambiar implementaciones en tiempo de ejecución.'],
        'iterator': ['Para ocultar la complejidad de una estructura de datos (árbol, grafo).', 'Para reducir la duplicación de código de recorrido.'],
        'memento': ['Para producir instantáneas (snapshots) del estado.', 'Para implementar la función "Deshacer" (Undo).'],
        'state': ['Cuando un objeto se comporta diferente dependiendo de su estado actual.', 'Cuando tienes condicionales monstruosos (switch/if) que alteran el flujo según campos de estado.'],
        'strategy': ['Cuando quieres usar diferentes variantes de un algoritmo dentro de un objeto y poder cambiarlas en ejecución.', 'Para aislar la lógica de negocio de los detalles de implementación de algoritmos.'],
        'observer': ['Cuando el cambio en un objeto requiere cambiar otros, y no sabes cuántos objetos hay.', 'Para implementar arquitecturas reactivas o dirigidas por eventos.'],
        'mvc': ['Para desarrollos web o de escritorio que requieren separar datos de presentación.', 'Para facilitar el testing unitario de la lógica sin depender de la UI.'],
        'layered': ['Para aplicaciones empresariales tradicionales.', 'Cuando se espera que el sistema evolucione y se necesite cambiar capas completas (ej. cambiar de Oracle a Mongo).'],
        'soa': ['Para integrar múltiples aplicaciones en una gran empresa.', 'Para permitir que clientes muy diversos (Web, Móvil, B2B) consuman la misma lógica.'],
        'data-centric': ['Sistemas donde la integridad y consistencia de datos es lo primordial.', 'Aplicaciones CAD o entornos de desarrollo colaborativo.'],
        'client-server': ['Para distribuir la carga de trabajo.', 'Para centralizar recursos y gestión de seguridad en el servidor.']
    };
    return usageMap[id] || ['Contexto general de aplicación.'];
}

export default App;