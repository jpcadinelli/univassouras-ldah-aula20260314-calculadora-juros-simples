import { Pressable, Text, View } from "react-native";

import { styles } from "../styles/appStyles";
import { TIME_UNITS } from "../utils/calculator";

export function UnitSelector({ value, onChange }) {
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
              <Text style={[styles.segmentText, selected ? styles.segmentTextActive : null]}>
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
