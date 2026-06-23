/*
 * MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033
 */

module.exports = {
  displayName: "integration",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.integration.spec.ts"],
  globalSetup: "<rootDir>/test-setup/global-setup.ts",
  globalTeardown: "<rootDir>/test-setup/global-teardown.ts",
  testTimeout: 30000, // Timeout maior para os containers

  // --- Configurações de Cobertura de Código ---
  collectCoverage: true,
  coverageDirectory: "<rootDir>/../coverage/integration",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.service.ts",
    "<rootDir>/src/**/*.controller.ts",
  ],
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
