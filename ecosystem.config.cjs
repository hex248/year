module.exports = {
  apps: [
    {
      name: "year",
      script: "src/server.ts",
      interpreter: "/root/.bun/bin/bun",
      interpreter_args: "run",
    },
  ],
};
