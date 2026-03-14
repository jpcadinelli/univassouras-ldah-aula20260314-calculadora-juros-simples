import { Text, TextInput, View } from "react-native";

import { styles } from "../styles/appStyles";

export function InputField({ label, value, onChangeText, placeholder, helper, error }) {
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
