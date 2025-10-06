import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import Card from '../../components/common/Card';
import CustomButton from '../../components/common/CustomButton';
import { gradeManagementService } from '../../services/gradeManagementService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const EditSubjectGradeScreen = ({ route, navigation }) => {
  const { studentId, studentName, subjectId, subjectName, currentData, onSave } = route.params;
  
  const [evaluations, setEvaluations] = useState(
    currentData?.evaluations || [
      { P: 0, Pr: 0, A: 0, E: 0, Ex: 0, Prom: 0 },
      { P: 0, Pr: 0, A: 0, E: 0, Ex: 0, Prom: 0 },
      { P: 0, Pr: 0, A: 0, E: 0, Ex: 0, Prom: 0 },
      { P: 0, Pr: 0, A: 0, E: 0, Ex: 0, Prom: 0 },
    ]
  );
  const [saving, setSaving] = useState(false);

  const updateEvaluation = (evalIndex, component, value) => {
    const numValue = parseFloat(value) || 0;
    if (numValue < 0 || numValue > 10) return;

    const newEvaluations = [...evaluations];
    newEvaluations[evalIndex] = {
      ...newEvaluations[evalIndex],
      [component]: numValue,
    };

    // Calcular promedio de la evaluación
    const evaluation = newEvaluations[evalIndex];
    const prom = (evaluation.P + evaluation.Pr + evaluation.A + evaluation.E + evaluation.Ex) / 5;
    newEvaluations[evalIndex].Prom = parseFloat(prom.toFixed(2));

    setEvaluations(newEvaluations);
  };

  const calculateFinalAverage = () => {
    const validProms = evaluations
      .map(item => item.Prom)
      .filter(prom => prom > 0);
    
    if (validProms.length === 0) return 0;
    
    const sum = validProms.reduce((acc, curr) => acc + curr, 0);
    return sum / validProms.length;
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      await gradeManagementService.saveGrade(studentId, {
        subject_id: subjectId,
        evaluations: evaluations,
      });

      Alert.alert('Éxito', 'Calificaciones guardadas correctamente', [
        {
          text: 'OK',
          onPress: () => {
            if (onSave) onSave();
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.error('Error saving grades:', error);
      Alert.alert('Error', 'No se pudieron guardar las calificaciones');
    } finally {
      setSaving(false);
    }
  };

  const renderEvaluationCard = (evalIndex) => {
    const evaluation = evaluations[evalIndex];
    
    return (
      <Card key={evalIndex} style={styles.evalCard}>
        <View style={styles.evalHeader}>
          <View style={styles.evalTitleContainer}>
            <Icon name="clipboard-text" size={24} color={colors.primary} />
            <Text style={styles.evalTitle}>Unidad {evalIndex + 1}</Text>
          </View>
          <View style={styles.promContainer}>
            <Text style={styles.promLabel}>Prom</Text>
            <Text style={styles.promValue}>{evaluation.Prom.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.componentsGrid}>
          {[
            { key: 'P', label: 'Participación' },
            { key: 'Pr', label: 'Proyecto' },
            { key: 'A', label: 'Asistencia' },
            { key: 'E', label: 'Examen' },
            { key: 'Ex', label: 'Extra' },
          ].map((component) => (
            <View key={component.key} style={styles.componentItem}>
              <Text style={styles.componentLabel}>{component.label}</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.componentKey}>{component.key}</Text>
                <TextInput
                  style={styles.input}
                  value={evaluation[component.key].toString()}
                  onChangeText={(value) => updateEvaluation(evalIndex, component.key, value)}
                  keyboardType="numeric"
                  maxLength={4}
                  selectTextOnFocus
                />
              </View>
            </View>
          ))}
        </View>
      </Card>
    );
  };

  const finalAverage = calculateFinalAverage();
  const estado = finalAverage >= 7 ? 'Aprobado' : finalAverage >= 5 ? 'Riesgo' : 'Reprobado';
  const estadoColor = finalAverage >= 7 ? colors.success : finalAverage >= 5 ? colors.warning : colors.error;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.scrollView}>
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>{studentName}</Text>
          <Text style={styles.infoSubject}>{subjectName}</Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Promedio Final</Text>
              <Text style={[styles.summaryValue, { color: estadoColor }]}>
                {finalAverage.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Estado</Text>
              <View style={[styles.estadoBadge, { backgroundColor: estadoColor }]}>
                <Text style={styles.estadoText}>{estado}</Text>
              </View>
            </View>
          </View>
        </Card>

        <View style={styles.evaluationsContainer}>
          <Text style={styles.sectionTitle}>Evaluaciones</Text>
          <Text style={styles.sectionSubtitle}>
            Califica cada componente de 0 a 10
          </Text>
          
          {[0, 1, 2, 3].map((index) => renderEvaluationCard(index))}
        </View>

        <View style={styles.footer}>
          <CustomButton
            title={saving ? "Guardando..." : "Guardar Calificaciones"}
            onPress={handleSave}
            disabled={saving}
            style={styles.saveButton}
          />
          <CustomButton
            title="Cancelar"
            onPress={() => navigation.goBack()}
            variant="outline"
            style={styles.cancelButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  infoCard: {
    margin: spacing.md,
  },
  infoTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  infoSubject: {
    fontSize: fontSize.lg,
    color: colors.primary,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  summaryLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  estadoBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  estadoText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textLight,
  },
  evaluationsContainer: {
    padding: spacing.md,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  evalCard: {
    marginBottom: spacing.md,
  },
  evalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  evalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  evalTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  promContainer: {
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  promLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  promValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  componentsGrid: {
    gap: spacing.sm,
  },
  componentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  componentLabel: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingLeft: spacing.sm,
  },
  componentKey: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginRight: spacing.xs,
  },
  input: {
    width: 60,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  cancelButton: {
    borderColor: colors.textSecondary,
  },
});

export default EditSubjectGradeScreen;

