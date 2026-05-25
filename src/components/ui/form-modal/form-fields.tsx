"use client";

import { useId, type Ref } from "react";

/* ---------------- Field (input texto/tel/etc) ---------------- */

export interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

export function Field({
  ref,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
  inputMode,
  error,
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] font-medium uppercase tracking-[0.08em] text-fg-3">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-md border bg-bg-elev-2 px-4 py-3 text-[15px] text-fg placeholder:text-fg-4 transition-colors focus:outline-none ${
          error ? "border-red-500 focus:border-red-500" : "border-line focus:border-accent"
        }`}
      />
      {error && (
        <p id={errorId} className="text-[12px] leading-[1.4] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------------- FieldSelect ---------------- */

export interface FieldSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<string>;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
}

export function FieldSelect({
  label,
  value,
  onChange,
  options,
  required,
  placeholder = "Selecione…",
  disabled,
  helperText,
}: FieldSelectProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] font-medium uppercase tracking-[0.08em] text-fg-3">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          required={required}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-md border border-line bg-bg-elev-2 px-4 py-3 pr-10 text-[15px] transition-colors focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 ${
            value ? "text-fg" : "text-fg-4"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-bg-elev-2 text-fg">
              {opt}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          width="12"
          height="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fg-3"
        >
          <path d="M1 1.5l5 5 5-5" />
        </svg>
      </div>
      {helperText && <p className="text-[12px] leading-[1.4] text-fg-3">{helperText}</p>}
    </div>
  );
}

/* ---------------- FieldTextarea ---------------- */

export interface FieldTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export function FieldTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  required,
}: FieldTextareaProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] font-medium uppercase tracking-[0.08em] text-fg-3">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="resize-none rounded-md border border-line bg-bg-elev-2 px-4 py-3 text-[15px] text-fg placeholder:text-fg-4 transition-colors focus:border-accent focus:outline-none"
      />
    </div>
  );
}

/* ---------------- FieldCheckboxGroup ---------------- */

export interface FieldCheckboxGroupProps {
  label: string;
  options: ReadonlyArray<string>;
  values: ReadonlyArray<string>;
  onChange: (values: string[]) => void;
  helperText?: string;
}

export function FieldCheckboxGroup({
  label,
  options,
  values,
  onChange,
  helperText,
}: FieldCheckboxGroupProps) {
  const toggle = (opt: string) => {
    const set = new Set(values);
    if (set.has(opt)) set.delete(opt);
    else set.add(opt);
    onChange(Array.from(set));
  };

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-[12px] font-medium uppercase tracking-[0.08em] text-fg-3">
        {label}
      </legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const checked = values.includes(opt);
          return (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2.5 text-[14px] transition-colors ${
                checked
                  ? "border-accent/60 bg-accent-soft text-fg"
                  : "border-line bg-bg-elev-2 text-fg-2 hover:border-line-strong hover:text-fg"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => toggle(opt)}
              />
              <span
                aria-hidden="true"
                className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                  checked ? "border-accent bg-accent text-black" : "border-line-strong bg-transparent"
                }`}
              >
                {checked && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1.5 5l2.5 2.5L8.5 2.5" />
                  </svg>
                )}
              </span>
              {opt}
            </label>
          );
        })}
      </div>
      {helperText && <p className="text-[12px] text-fg-3">{helperText}</p>}
    </fieldset>
  );
}

/* ---------------- Honeypot ---------------- */

export interface HoneypotProps {
  value: string;
  onChange: (value: string) => void;
}

export function Honeypot({ value, onChange }: HoneypotProps) {
  return (
    <input
      type="text"
      name="_hp"
      tabIndex={-1}
      autoComplete="off"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-hidden="true"
      className="absolute left-[-9999px] h-0 w-0 opacity-0"
    />
  );
}
