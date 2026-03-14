import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const TIME_UNITS = [
  { label: "Mes", value: "mes" },
  { label: "Ano", value: "ano" },
];

function parsePositiveNumber(value) {
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

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatPercent(value) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function InputField({ label, value, onChangeText, placeholder, helper, error }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7c6f65"
        keyboardType="decimal-pad"
        style={[styles.input, error ? styles.inputError : null]}
      />
      <Text style={error ? styles.errorText : styles.helperText}>{error || helper}</Text>
    </View>
  );
}

function UnitSelector({ value, onChange }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>Unidade de tempo da taxa e do periodo</Text>
      <View style={styles.segmentedControl}>
        {TIME_UNITS.map((unit) => {
          const selected = value === unit.value;

          return (
            <Pressable
              key={unit.value}
              onPress={() => onChange(unit.value)}
              style={[styles.segmentButton, selected ? styles.segmentButtonActive : null]}
            >
              <Text
                style={[styles.segmentText, selected ? styles.segmentTextActive : null]}
              >
                {unit.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.helperText}>
        A taxa e o tempo devem usar a mesma unidade, conforme a RN02.
      </Text>
    </View>
  );
}

export default function App() {
  const [capital, setCapital] = useState("");
  const [taxa, setTaxa] = useState("");
  const [tempo, setTempo] = useState("");
  const [timeUnit, setTimeUnit] = useState("mes");
  const [submitted, setSubmitted] = useState(false);

  const validation = useMemo(() => {
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
  }, [capital, taxa, tempo]);

  const visibleErrors = submitted ? validation.errors : {};
  const unitLabel = timeUnit === "mes" ? "mes" : "ano";
  const unitLabelPlural = timeUnit === "mes" ? "meses" : "anos";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.safeArea}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.heroCard}>
            <Text style={styles.eyebrow}>Calculadora financeira</Text>
            <Text style={styles.title}>Juros simples</Text>
            <Text style={styles.subtitle}>
              Informe capital, taxa e tempo para calcular os juros de acordo com a formula J = C * i * t.
            </Text>
          </View>

          <View style={styles.card}>
            <InputField
              label="Capital inicial"
              value={capital}
              onChangeText={setCapital}
              placeholder="Ex.: 1500"
              helper="Informe um valor maior que 0."
              error={visibleErrors.capital}
            />

            <InputField
              label="Taxa de juros (%)"
              value={taxa}
              onChangeText={setTaxa}
              placeholder="Ex.: 5"
              helper="A taxa sera convertida automaticamente para decimal (RN01)."
              error={visibleErrors.taxa}
            />

            <InputField
              label={`Tempo em ${unitLabelPlural}`}
              value={tempo}
              onChangeText={setTempo}
              placeholder={`Ex.: ${timeUnit === "mes" ? "12" : "2"}`}
              helper={`Use a mesma unidade da taxa: ${unitLabel}.`}
              error={visibleErrors.tempo}
            />

            <UnitSelector value={timeUnit} onChange={setTimeUnit} />

            <Pressable style={styles.primaryButton} onPress={() => setSubmitted(true)}>
              <Text style={styles.primaryButtonText}>Calcular juros</Text>
            </Pressable>

            {!validation.isValid && submitted ? (
              <View style={styles.alertBox}>
                <Text style={styles.alertTitle}>Erro de validacao</Text>
                <Text style={styles.alertText}>
                  Preencha capital, taxa e tempo com valores numericos maiores que 0.
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Resultado</Text>

            {validation.isValid ? (
              <>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Capital</Text>
                  <Text style={styles.resultValue}>{formatCurrency(validation.result.capital)}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Taxa decimal</Text>
                  <Text style={styles.resultValue}>{formatPercent(validation.result.taxaDecimal)}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Periodo</Text>
                  <Text style={styles.resultValue}>
                    {validation.result.tempo} {validation.result.tempo === 1 ? unitLabel : unitLabelPlural}
                  </Text>
                </View>
                <View style={styles.resultDivider} />
                <View style={styles.resultRow}>
                  <Text style={styles.resultHighlightLabel}>Juros</Text>
                  <Text style={styles.resultHighlightValue}>
                    {formatCurrency(validation.result.juros)}
                  </Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Montante</Text>
                  <Text style={styles.resultValue}>{formatCurrency(validation.result.montante)}</Text>
                </View>
              </>
            ) : (
              <Text style={styles.emptyState}>
                Preencha os campos e toque em calcular para ver o valor dos juros e o montante final.
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4efe7",
  },
  content: {
    padding: 20,
    paddingTop: 38,
    gap: 18,
  },
  heroCard: {
    backgroundColor: "#20382f",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  eyebrow: {
    color: "#d7e8d9",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    color: "#fffaf2",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 10,
  },
  subtitle: {
    color: "#d7e8d9",
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    backgroundColor: "#fffaf2",
    borderRadius: 24,
    padding: 20,
    gap: 12,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    color: "#2e241d",
    fontSize: 15,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#f3ebe1",
    borderWidth: 1,
    borderColor: "#d8c5af",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: "#2e241d",
  },
  inputError: {
    borderColor: "#b5442d",
  },
  helperText: {
    color: "#6e6258",
    fontSize: 13,
    lineHeight: 18,
  },
  errorText: {
    color: "#b5442d",
    fontSize: 13,
    lineHeight: 18,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#f3ebe1",
    borderRadius: 16,
    padding: 4,
    gap: 4,
  },
  segmentButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  segmentButtonActive: {
    backgroundColor: "#d59b52",
  },
  segmentText: {
    color: "#6e6258",
    fontWeight: "700",
  },
  segmentTextActive: {
    color: "#2e241d",
  },
  primaryButton: {
    backgroundColor: "#c56c3f",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },
  primaryButtonText: {
    color: "#fffaf2",
    fontSize: 16,
    fontWeight: "800",
  },
  alertBox: {
    backgroundColor: "#fde7df",
    borderRadius: 16,
    padding: 14,
    gap: 4,
  },
  alertTitle: {
    color: "#8f2f1e",
    fontSize: 15,
    fontWeight: "800",
  },
  alertText: {
    color: "#8f2f1e",
    lineHeight: 20,
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    minHeight: 220,
  },
  resultTitle: {
    color: "#2e241d",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 14,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },
  resultLabel: {
    color: "#6e6258",
    fontSize: 15,
  },
  resultValue: {
    color: "#2e241d",
    fontSize: 15,
    fontWeight: "700",
    flexShrink: 1,
    textAlign: "right",
  },
  resultHighlightLabel: {
    color: "#2e241d",
    fontSize: 17,
    fontWeight: "800",
  },
  resultHighlightValue: {
    color: "#0b6e4f",
    fontSize: 22,
    fontWeight: "800",
  },
  resultDivider: {
    height: 1,
    backgroundColor: "#ece3d8",
    marginVertical: 6,
  },
  emptyState: {
    color: "#6e6258",
    fontSize: 15,
    lineHeight: 22,
  },
});
