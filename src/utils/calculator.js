export const TIME_UNITS = [
  { label: "Mes", value: "mes" },
  { label: "Ano", value: "ano" },
];

export function parsePositiveNumber(value) {
  const normalized = value.replace(",", ".").trim();
  const parsed = Number(normalized);

  if (!normalized) {
    return { value: null, error: "Campo obrigatorio." };
  }

  if (Number.isNaN(parsed)) {
    return { value: null, error: "Informe um numero valido." };
  }

  if (parsed <= 0) {
    return { value: null, error: "O valor deve ser maior que 0." };
  }

  return { value: parsed, error: null };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatPercent(value) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function buildValidation(capital, taxa, tempo) {
  const capitalResult = parsePositiveNumber(capital);
  const taxaResult = parsePositiveNumber(taxa);
  const tempoResult = parsePositiveNumber(tempo);

  const errors = {
    capital: capitalResult.error,
    taxa: taxaResult.error,
    tempo: tempoResult.error,
  };

  if (errors.capital || errors.taxa || errors.tempo) {
    return {
      isValid: false,
      errors,
      result: null,
    };
  }

  const taxaDecimal = taxaResult.value / 100;
  const juros = capitalResult.value * taxaDecimal * tempoResult.value;
  const montante = capitalResult.value + juros;

  return {
    isValid: true,
    errors,
    result: {
      capital: capitalResult.value,
      taxaPercentual: taxaResult.value,
      taxaDecimal,
      tempo: tempoResult.value,
      juros,
      montante,
    },
  };
}
