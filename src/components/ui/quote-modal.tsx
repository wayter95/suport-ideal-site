"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";

import { BtnArrow } from "@/components/ui/btn";
import {
  Field,
  FieldSelect,
  FieldTextarea,
  Honeypot,
  ModalShell,
  SuccessPanel,
} from "@/components/ui/form-modal";
import {
  OTHER_OPTION,
  brandsByEquipmentType,
  equipmentTypes,
  serviceCityOptions,
  type EquipmentType,
} from "@/configs/app.config";
import { useSubmitStatus } from "@/hooks/use-submit-status";
import { formatPhoneBR, isValidPhoneBR } from "@/utils/format-phone-br";

const SUCCESS_AUTOCLOSE_MS = 3000;

export interface QuoteModalProps {
  open: boolean;
  subject: string;
  onClose: () => void;
  /**
   * Restringe os tipos de equipamento exibidos no select. `OTHER_OPTION` é sempre
   * acrescentado para flexibilidade. Se omitido, mostra todos.
   */
  allowedTypes?: ReadonlyArray<EquipmentType>;
  /**
   * Quando true, exibe e exige os campos de Cidade e Endereço (para serviços
   * que envolvem deslocamento, ex: visita técnica empresarial).
   */
  requiresAddress?: boolean;
}

/**
 * Calcula a lista efetiva de tipos a exibir. Garante "Outro" no fim e remove duplicatas.
 */
function resolveTypeOptions(
  allowed: ReadonlyArray<EquipmentType> | undefined,
): ReadonlyArray<EquipmentType> {
  if (!allowed || allowed.length === 0) return equipmentTypes;
  const seen = new Set<EquipmentType>();
  const result: EquipmentType[] = [];
  for (const t of allowed) {
    if (t === OTHER_OPTION) continue;
    if (!seen.has(t)) {
      seen.add(t);
      result.push(t);
    }
  }
  result.push(OTHER_OPTION);
  return result;
}

interface QuoteFormState {
  firstName: string;
  lastName: string;
  phone: string;
  equipmentType: EquipmentType | "";
  equipmentTypeOther: string;
  brand: string;
  brandOther: string;
  device: string;
  city: string;
  address: string;
  notes: string;
  hp: string;
}

const initialState: QuoteFormState = {
  firstName: "",
  lastName: "",
  phone: "",
  equipmentType: "",
  equipmentTypeOther: "",
  brand: "",
  brandOther: "",
  device: "",
  city: "",
  address: "",
  notes: "",
  hp: "",
};

function resolveEquipmentType(form: QuoteFormState): string {
  if (form.equipmentType === OTHER_OPTION) return form.equipmentTypeOther.trim() || OTHER_OPTION;
  return form.equipmentType || "";
}

function resolveBrand(form: QuoteFormState): string {
  if (form.brand === OTHER_OPTION) return form.brandOther.trim() || OTHER_OPTION;
  return form.brand || "";
}

export function QuoteModal({
  open,
  subject,
  onClose,
  allowedTypes,
  requiresAddress,
}: QuoteModalProps) {
  const titleId = useId();
  const [form, setForm] = useState<QuoteFormState>(initialState);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const { status, error, setStatus, setError, reset } = useSubmitStatus({
    autoCloseMs: SUCCESS_AUTOCLOSE_MS,
    onAutoClose: onClose,
  });

  const typeOptions = useMemo(() => resolveTypeOptions(allowedTypes), [allowedTypes]);
  // "Tipo único" = só há 1 tipo real além de "Outro". Pré-seleciona e trava o select.
  const singleType = typeOptions.length === 2 ? typeOptions[0] : null;

  useEffect(() => {
    if (open) {
      const initial: QuoteFormState = singleType
        ? { ...initialState, equipmentType: singleType }
        : initialState;
      setForm(initial);
      const t = window.setTimeout(() => firstFieldRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
    setForm(initialState);
    setPhoneError(null);
    reset();
  }, [open, singleType, reset]);

  const updateField = <K extends keyof QuoteFormState>(key: K, value: QuoteFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhoneChange = (value: string) => {
    updateField("phone", formatPhoneBR(value));
    if (phoneError) setPhoneError(null);
  };

  const handleEquipmentTypeChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      equipmentType: value as EquipmentType | "",
      equipmentTypeOther: "",
      brand: "",
      brandOther: "",
    }));
  };

  const handleBrandChange = (value: string) => {
    setForm((prev) => ({ ...prev, brand: value, brandOther: "" }));
  };

  const availableBrands =
    form.equipmentType && form.equipmentType !== OTHER_OPTION
      ? brandsByEquipmentType[form.equipmentType]
      : null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidPhoneBR(form.phone)) {
      setPhoneError("Informe um telefone válido com DDD (ex: (34) 99999-9999)");
      return;
    }
    if (requiresAddress && (!form.city || !form.address.trim())) {
      setError("Informe a cidade e o endereço para a visita técnica.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          service: subject,
          equipmentType: resolveEquipmentType(form),
          brand: resolveBrand(form),
          device: form.device,
          city: requiresAddress ? form.city : "",
          address: requiresAddress ? form.address : "",
          notes: form.notes,
          hp: form.hp,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Erro ao enviar solicitação");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erro ao enviar solicitação");
    }
  };

  return (
    <ModalShell open={open} onClose={onClose} titleId={titleId}>
      {status === "success" ? (
        <SuccessPanel
          titleId={titleId}
          message="Recebemos seus dados e entraremos em contato o mais rápido possível para finalizar seu orçamento."
        />
      ) : (
        <>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-3">
            Solicitar orçamento
          </p>
          <h2
            id={titleId}
            className="mb-2 font-display text-[clamp(20px,2vw,26px)] font-semibold leading-[1.1] tracking-[-0.02em]"
          >
            Preencha seus dados
          </h2>
          <p className="mb-5 text-[14px] leading-[1.5] text-fg-2">
            Enviaremos sua solicitação para nossa equipe e retornaremos com o orçamento o mais
            breve possível.
          </p>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 text-[12px] font-medium text-accent-2">
            <span className="font-mono uppercase tracking-[0.1em] text-[10px] text-fg-3">
              Serviço
            </span>
            <span>{subject}</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Honeypot value={form.hp} onChange={(v) => updateField("hp", v)} />

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

            <FieldSelect
              label="Tipo de equipamento"
              required
              value={form.equipmentType}
              onChange={handleEquipmentTypeChange}
              options={typeOptions}
              disabled={singleType !== null}
              helperText={
                singleType
                  ? `Este serviço atende somente ${singleType}.`
                  : undefined
              }
            />
            {form.equipmentType === OTHER_OPTION && (
              <Field
                label="Qual tipo?"
                required
                placeholder="Descreva o tipo de equipamento"
                value={form.equipmentTypeOther}
                onChange={(v) => updateField("equipmentTypeOther", v)}
              />
            )}

            {availableBrands && (
              <FieldSelect
                label="Marca"
                required
                value={form.brand}
                onChange={handleBrandChange}
                options={availableBrands}
              />
            )}
            {form.brand === OTHER_OPTION && (
              <Field
                label="Qual marca?"
                required
                placeholder="Digite a marca"
                value={form.brandOther}
                onChange={(v) => updateField("brandOther", v)}
              />
            )}

            <Field
              label="Modelo do aparelho"
              placeholder="Ex: iPhone 13, Galaxy S22, Notebook Dell..."
              value={form.device}
              onChange={(v) => updateField("device", v)}
            />

            {requiresAddress && (
              <>
                <FieldSelect
                  label="Cidade"
                  required
                  value={form.city}
                  onChange={(v) => updateField("city", v)}
                  options={serviceCityOptions}
                />
                <Field
                  label="Endereço"
                  required
                  placeholder="Rua, número, bairro e complemento"
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(v) => updateField("address", v)}
                />
              </>
            )}

            <FieldTextarea
              label="Observações"
              placeholder="Descreva o problema ou detalhes adicionais (opcional)"
              value={form.notes}
              onChange={(v) => updateField("notes", v)}
            />

            {error && (
              <p
                role="alert"
                className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-[13px] leading-[1.45] text-red-300"
              >
                {error}
              </p>
            )}

            <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-fg-2 transition-colors hover:border-fg hover:text-fg disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-transparent bg-accent px-6 py-3 text-sm font-semibold text-black shadow-[0_0_0_0_var(--color-accent-glow),0_12px_40px_-10px_var(--color-accent-glow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_var(--color-accent-glow),0_18px_48px_-10px_var(--color-accent-glow)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === "submitting" ? "Enviando…" : "Enviar solicitação"}
                {status !== "submitting" && <BtnArrow />}
              </button>
            </div>
          </form>
        </>
      )}
    </ModalShell>
  );
}
