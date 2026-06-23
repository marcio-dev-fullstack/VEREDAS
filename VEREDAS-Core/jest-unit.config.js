/*
 * MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033
 */

module.exports = {
  displayName: "unit",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  // Não usa globalSetup/globalTeardown para ser mais rápido

  // --- Configurações de Cobertura de Código ---
  collectCoverage: true,
  // Define o diretório de saída para o relatório
  coverageDirectory: "<rootDir>/../coverage/unit",
  // Especifica de quais arquivos a cobertura deve ser coletada
  collectCoverageFrom: [
    "<rootDir>/src/**/*.service.ts",
    "<rootDir>/src/**/*.controller.ts",
  ],
  // Define o formato do relatório (incluindo HTML)
  coverageReporters: ["json", "lcov", "text", "clover", "html"],
  // Define o limite mínimo de cobertura. A execução dos testes falhará se não for atingido.
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
