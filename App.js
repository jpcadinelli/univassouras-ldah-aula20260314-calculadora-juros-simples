import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import { InputField } from "./src/components/InputField";
import { ResultCard } from "./src/components/ResultCard";
import { UnitSelector } from "./src/components/UnitSelector";
import { styles } from "./src/styles/appStyles";
import { buildValidation } from "./src/utils/calculator";

export default function App() {
  const [capital, setCapital] = useState("");
  const [taxa, setTaxa] = useState("");
  const [tempo, setTempo] = useState("");
  const [timeUnit, setTimeUnit] = useState("mes");
  const [submitted, setSubmitted] = useState(false);

  const validation = useMemo(() => {
    return buildValidation(capital, taxa, tempo);
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

          <ResultCard
            validation={validation}
            unitLabel={unitLabel}
            unitLabelPlural={unitLabelPlural}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
