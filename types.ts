export enum CategoryType {
  CREATIONAL = 'Creación',
  STRUCTURAL = 'Estructura',
  BEHAVIORAL = 'Comportamiento',
  ARCHITECTURAL = 'Arquitectura'
}

export interface RealExample {
  title: string;
  explanation: string;
}

export interface PatternData {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  academicContext: string;
  realWorldExamples: RealExample[]; // Richer structure with explanation
  codeSnippet: string;
  outputSnippet: string; 
  visualType: string;
  visualSteps: string[];
}

export interface CategoryData {
  type: CategoryType;
  color: string;
  description: string;
  patterns: PatternData[];
}