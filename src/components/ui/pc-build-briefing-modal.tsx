"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import {
  Field,
  FieldCheckboxGroup,
  FieldSelect,
  FieldTextarea,
  FormWizard,
  Honeypot,
  ModalShell,
  SuccessPanel,
  type WizardStep,
} from "@/components/ui/form-modal";
import {
  PC_BUILD_SCOPES,
  pcBuildBrandPreferenceOptions,
  pcBuildBudgetOptions,
  pcBuildDeadlineOptions,
  pcBuildFpsOptions,
  pcBuildIncludeItemsOptions,
  pcBuildOwnedItemsOptions,
  pcBuildPurposeOptions,
  pcBuildResolutionOptions,
  pcBuildScopeOptions,
  pcBuildStyleOptions,
  type PcBuildScope,
} from "@/configs/app.config";
import { useSubmitStatus } from "@/hooks/use-submit-status";
import { formatPhoneBR, isValidPhoneBR } from "@/utils/format-phone-br";

const SUCCESS_AUTOCLOSE_MS = 3500;

export interface PcBuildBriefingModalProps {
  open: boolean;
  onClose: () => void;
}

interface BriefingFormState {
  scope: PcBuildScope | "";
  partsOwned: string;
  purpose: string;
  purposeOther: string;
  gamesOrSoftware: string;
  resolution: string;
  fps: string;
  budget: string;
  deadline: string;
  ownedItems: string[];
  includeItems: string[];
  style: string;
  brandPreference: string;
  firstName: string;
  lastName: string;
  phone: string;
  notes: string;
  hp: string;
}

const initialState: BriefingFormState = {
  scope: "",
  partsOwned: "",
  purpose: "",
  purposeOther: "",
  gamesOrSoftware: "",
  resolution: "",
  fps: "",
  budget: "",
  deadline: "",
  ownedItems: [],
  includeItems: [],
  style: "",
  brandPreference: "",
  firstName: "",
  lastName: "",
  phone: "",
  notes: "",
  hp: "",
};

const GAMING_PURPOSES = new Set(["Jogos", "Uso misto", "Streaming / criação de conteúdo"]);

export function PcBuildBriefingModal({ open, onClose }: PcBuildBriefingModalProps) {
  const titleId = useId();
  const [form, setForm] = useState<BriefingFormState>(initialState);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const { status, error, setStatus, setError, reset } = useSubmitStatus({
    autoCloseMs: SUCCESS_AUTOCLOSE_MS,
    onAutoClose: onClose,
  });

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => firstFieldRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
    setForm(initialState);
    setPhoneError(null);
    reset();
  }, [open, reset]);

  const updateField = <K extends keyof BriefingFormState>(key: K, value: BriefingFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleScopeChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      scope: value as PcBuildScope | "",
      // Reset campos dependentes ao trocar de escopo
      partsOwned: "",
      purpose: "",
      purposeOther: "",
      gamesOrSoftware: "",
      resolution: "",
      fps: "",
      budget: "",
      ownedItems: [],
      includeItems: [],
      style: "",
      brandPreference: "",
    }));
  };

  const handlePhoneChange = (value: string) => {
    updateField("phone", formatPhoneBR(value));
    if (phoneError) setPhoneError(null);
  };

  const submit = async () => {
    if (!isValidPhoneBR(form.phone)) {
      setPhoneError("Informe um telefone válido com DDD (ex: (34) 99999-9999)");
      throw new Error("Telefone inválido");
    }

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/pc-build-briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          scope: form.scope,
          purpose: form.purpose,
          purposeOther: form.purposeOther,
          gamesOrSoftware: form.gamesOrSoftware,
          resolution: form.resolution,
          fps: form.fps,
          budget: form.budget,
          deadline: form.deadline,
          partsOwned: form.partsOwned,
          ownedItems: form.ownedItems,
          includeItems: form.includeItems,
          style: form.style,
          brandPreference: form.brandPreference,
          notes: form.notes,
          hp: form.hp,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Erro ao enviar briefing");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erro ao enviar briefing");
    }
  };

  /**
   * Steps dinâmicos: quais aparecem depende do escopo.
   * - assembly-only: escopo+peças → contato (2 steps)
   * - consulting: escopo → uso → contato (3 steps; pula performance/extras)
   * - hybrid/quote-and-build: 4 steps completos
   */
  const steps = useMemo<ReadonlyArray<WizardStep>>(() => {
    const list: WizardStep[] = [];

    const needsParts =
      form.scope === PC_BUILD_SCOPES.ASSEMBLY_ONLY || form.scope === PC_BUILD_SCOPES.HYBRID;

    // STEP 1 — Escopo (+ peças se aplicável)
    list.push({
      id: "scope",
      title: "O que você precisa?",
      subtitle: "Isso nos ajuda a entender se vamos cotar peças, só montar ou consultar.",
      validate: () => {
        if (!form.scope) return "Selecione uma das opções para continuarmos.";
        if (form.scope === PC_BUILD_SCOPES.ASSEMBLY_ONLY && !form.partsOwned.trim()) {
          return "Liste as peças que você já tem para podermos avaliar a montagem.";
        }
        return null;
      },
      content: (
        <>
          <FieldSelect
            label="Escopo do serviço"
            required
            value={form.scope}
            onChange={handleScopeChange}
            options={pcBuildScopeOptions}
          />
          {needsParts && (
            <FieldTextarea
              label="Quais peças você já tem?"
              rows={4}
              required={form.scope === PC_BUILD_SCOPES.ASSEMBLY_ONLY}
              placeholder="Ex: Processador Ryzen 5 5600, RAM 16GB, SSD 1TB, fonte 650W, gabinete..."
              value={form.partsOwned}
              onChange={(v) => updateField("partsOwned", v)}
            />
          )}
        </>
      ),
    });

    // STEP 2 — Uso & Performance (pulado se assembly-only)
    if (form.scope && form.scope !== PC_BUILD_SCOPES.ASSEMBLY_ONLY) {
      const isConsulting = form.scope === PC_BUILD_SCOPES.CONSULTING;
      const showFps = !isConsulting && GAMING_PURPOSES.has(form.purpose);

      list.push({
        id: "usage",
        title: "Como você vai usar?",
        subtitle: "Quanto mais souber sobre o uso, mais precisa será a recomendação.",
        validate: () => {
          if (!form.purpose) return "Conte para que você vai usar o PC.";
          if (form.purpose === "Outro" && !form.purposeOther.trim()) {
            return "Descreva o uso pretendido.";
          }
          return null;
        },
        content: (
          <>
            <FieldSelect
              label="Para que você vai usar o PC?"
              required
              value={form.purpose}
              onChange={(v) => updateField("purpose", v)}
              options={pcBuildPurposeOptions}
            />
            {form.purpose === "Outro" && (
              <Field
                label="Descreva o uso"
                required
                placeholder="Conte um pouco sobre o uso pretendido"
                value={form.purposeOther}
                onChange={(v) => updateField("purposeOther", v)}
              />
            )}
            <Field
              label="Programas / jogos que pretende usar"
              placeholder="Ex: CS2, Valorant, Photoshop, Blender (opcional)"
              value={form.gamesOrSoftware}
              onChange={(v) => updateField("gamesOrSoftware", v)}
            />
            {!isConsulting && (
              <FieldSelect
                label="Resolução do monitor"
                value={form.resolution}
                onChange={(v) => updateField("resolution", v)}
                options={pcBuildResolutionOptions}
              />
            )}
            {showFps && (
              <FieldSelect
                label="FPS desejado em jogos"
                value={form.fps}
                onChange={(v) => updateField("fps", v)}
                options={pcBuildFpsOptions}
              />
            )}
          </>
        ),
      });
    }

    // STEP 3 — Orçamento, prazo & extras (pulado se assembly-only)
    if (form.scope && form.scope !== PC_BUILD_SCOPES.ASSEMBLY_ONLY) {
      const isConsulting = form.scope === PC_BUILD_SCOPES.CONSULTING;

      list.push({
        id: "budget",
        title: "Orçamento, prazo e extras",
        subtitle: isConsulting
          ? "Não precisa ter certeza — sua faixa de investimento orienta nossa sugestão."
          : "Defina o investimento previsto e o que mais quer incluir no setup.",
        validate: () => {
          if (!form.budget) return "Selecione uma faixa de orçamento (escolha 'Preciso de uma sugestão' se ainda não decidiu).";
          return null;
        },
        content: (
          <>
            <FieldSelect
              label="Faixa de orçamento"
              required
              value={form.budget}
              onChange={(v) => updateField("budget", v)}
              options={pcBuildBudgetOptions}
            />
            <FieldSelect
              label="Prazo desejado"
              value={form.deadline}
              onChange={(v) => updateField("deadline", v)}
              options={pcBuildDeadlineOptions}
            />
            {!isConsulting && (
              <>
                <FieldCheckboxGroup
                  label="Você já possui:"
                  options={pcBuildOwnedItemsOptions}
                  values={form.ownedItems}
                  onChange={(vs) => updateField("ownedItems", vs)}
                  helperText="Marque os itens que você já tem (não precisaremos cotar)."
                />
                <FieldCheckboxGroup
                  label="Quer incluir no orçamento:"
                  options={pcBuildIncludeItemsOptions}
                  values={form.includeItems}
                  onChange={(vs) => updateField("includeItems", vs)}
                />
                <FieldSelect
                  label="Estilo visual do PC"
                  value={form.style}
                  onChange={(v) => updateField("style", v)}
                  options={pcBuildStyleOptions}
                />
                <FieldSelect
                  label="Preferência de plataforma"
                  value={form.brandPreference}
                  onChange={(v) => updateField("brandPreference", v)}
                  options={pcBuildBrandPreferenceOptions}
                />
              </>
            )}
          </>
        ),
      });
    }

    // STEP FINAL — Contato (sempre presente)
    list.push({
      id: "contact",
      title: "Como te chamamos?",
      subtitle: "Última etapa — seus dados para retornarmos com a proposta.",
      validate: () => {
        if (!form.firstName.trim()) return "Informe seu nome.";
        if (!form.lastName.trim()) return "Informe seu sobrenome.";
        if (!isValidPhoneBR(form.phone)) {
          return "Informe um telefone válido com DDD (ex: (34) 99999-9999).";
        }
        return null;
      },
      content: (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              ref={firstFieldRef}
              label="Nome"
              required
              autoComplete="given-name"
              value={form.firstName}
              onChange={(v) => updateField("firstName", v)}
            />
            <Field
              label="Sobrenome"
              required
              autoComplete="family-name"
              value={form.lastName}
              onChange={(v) => updateField("lastName", v)}
            />
          </div>
          <Field
            label="Telefone / WhatsApp"
            required
            type="tel"
            autoComplete="tel"
            placeholder="(34) 99999-9999"
            inputMode="tel"
            value={form.phone}
            onChange={handlePhoneChange}
            error={phoneError ?? undefined}
          />
          <FieldTextarea
            label="Observações"
            placeholder="Algo mais que devemos saber? (opcional)"
            value={form.notes}
            onChange={(v) => updateField("notes", v)}
          />
        </>
      ),
    });

    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, phoneError]);

  return (
    <ModalShell open={open} onClose={onClose} titleId={titleId} size="xl">
      {status === "success" ? (
        <SuccessPanel
          titleId={titleId}
          title="Briefing recebido!"
          message="Vamos analisar suas respostas e voltamos com uma proposta personalizada o mais rápido possível."
        />
      ) : (
        <>
          {/* Honeypot fica fora do wizard pra persistir entre steps */}
          <Honeypot value={form.hp} onChange={(v) => updateField("hp", v)} />
          <FormWizard
            steps={steps}
            eyebrow="Briefing — Montagem de PC"
            submitting={status === "submitting"}
            submitLabel="Enviar briefing"
            onSubmit={submit}
            onCancel={onClose}
            footerSlot={
              error ? (
                <p
                  role="alert"
                  className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-[13px] leading-[1.45] text-red-300"
                >
                  {error}
                </p>
              ) : null
            }
          />
        </>
      )}
    </ModalShell>
  );
}
