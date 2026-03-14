import { Text, View } from "react-native";

import { styles } from "../styles/appStyles";
import { formatCurrency, formatPercent } from "../utils/calculator";

export function ResultCard({ validation, unitLabel, unitLabelPlural }) {
  return (
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
  );
}
