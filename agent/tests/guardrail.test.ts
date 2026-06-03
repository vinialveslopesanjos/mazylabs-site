import { describe, expect, it } from "vitest";
import { parseAndGuardrail } from "../src/agents/guardrail.js";

describe("parseAndGuardrail", () => {
  it("keeps short chunked answers", () => {
    const output = parseAndGuardrail(
      JSON.stringify({
        decision: "answer",
        riskLevel: "low",
        chunks: ["Fazemos sim.", "Me conta qual relatorio hoje esta mais manual?"],
        internalSummary: "Lead asked about report automation.",
        memoryPatch: {
          painPoints: ["relatorios manuais"],
          servicesInterest: ["automacao", "dados"],
          stage: "qualifying",
          summary: "Lead quer automatizar relatorios manuais."
        }
      }),
      4
    );

    expect(output.decision).toBe("answer");
    expect(output.chunks).toHaveLength(2);
    expect(output.memoryPatch.stage).toBe("qualifying");
  });

  it("forces handoff when model claims to be human", () => {
    const output = parseAndGuardrail(
      JSON.stringify({
        decision: "answer",
        riskLevel: "low",
        chunks: ["Sou o Vinicius e garanto que resolvemos."],
        internalSummary: "Unsafe.",
        memoryPatch: {}
      }),
      4
    );

    expect(output.decision).toBe("handoff");
    expect(output.riskLevel).toBe("high");
  });
});
