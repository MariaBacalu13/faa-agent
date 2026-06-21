#!/usr/bin/env node
import { createInterface } from "node:readline";
import { createAgent } from "./agent.js";

const agent = createAgent();
const messages = [];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("╔══════════════════════════════════════════════════════════╗");
console.log("║  FAA Guide — Facultatea de Administrație și Afaceri    ║");
console.log("║  Universitatea din București                           ║");
console.log("║                                                        ║");
console.log("║  Ask me anything about FAA programs, admissions,       ║");
console.log("║  student services, or navigating faa.ro                ║");
console.log("║                                                        ║");
console.log("║  Type 'exit' to quit.                                  ║");
console.log("╚══════════════════════════════════════════════════════════╝");
console.log();

function prompt() {
  rl.question("You: ", async (input) => {
    const trimmed = input.trim();
    if (!trimmed || trimmed.toLowerCase() === "exit") {
      console.log("\nLa revedere! 👋");
      rl.close();
      return;
    }

    messages.push({ role: "user", content: trimmed });

    try {
      const reply = await agent.chat(messages);
      messages.push({ role: "assistant", content: reply });
      console.log(`\nFAA Guide: ${reply}\n`);
    } catch (err) {
      if (err.status === 401) {
        console.error("\nError: Invalid ANTHROPIC_API_KEY. Set it in your environment.\n");
      } else {
        console.error(`\nError: ${err.message}\n`);
      }
    }

    prompt();
  });
}

prompt();
