import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
