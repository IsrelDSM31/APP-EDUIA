import React, { useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Card from '../../components/common/Card';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const CalendarScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Calendario académico IAEDU 2024-2025
  const academicCalendar = {
    'AGOSTO 2024': {
      days: [
        { day: 1, type: 'normal' },
        { day: 2, type: 'normal' },
        { day: 3, type: 'normal' },
        { day: 21, type: 'inicio-fin', label: 'Inicio de clases' },
        { day: 22, type: 'vacaciones' },
        { day: 23, type: 'consejo', label: 'Consejo Técnico' },
        { day: 24, type: 'consejo' },
        { day: 25, type: 'consejo' },
        { day: 28, type: 'inicio-fin' },
      ],
    },
    'SEPTIEMBRE 2024': {
      days: [
        { day: 15, type: 'consejo', label: 'Consejo Técnico' },
        { day: 22, type: 'consejo' },
        { day: 29, type: 'consejo' },
      ],
    },
    'OCTUBRE 2024': {
      days: [
        { day: 27, type: 'consejo', label: 'Consejo Técnico' },
      ],
    },
    'NOVIEMBRE 2024': {
      days: [
        { day: 2, type: 'inicio-fin', label: 'Día de Muertos' },
        { day: 17, type: 'consejo', label: 'Consejo Técnico' },
        { day: 20, type: 'inicio-fin' },
        { day: 24, type: 'consejo' },
        { day: 27, type: 'entrega', label: 'Entrega de evaluaciones' },
      ],
    },
    'DICIEMBRE 2024': {
      days: [
        { day: 21, type: 'vacaciones', label: 'Vacaciones' },
        { day: 22, type: 'vacaciones' },
        { day: 23, type: 'vacaciones' },
        { day: 24, type: 'vacaciones' },
        { day: 25, type: 'vacaciones' },
        { day: 26, type: 'vacaciones' },
        { day: 27, type: 'vacaciones' },
        { day: 28, type: 'vacaciones' },
        { day: 29, type: 'vacaciones' },
        { day: 30, type: 'vacaciones' },
        { day: 31, type: 'vacaciones' },
      ],
    },
    'ENERO 2025': {
      days: [
        { day: 1, type: 'inicio-fin', label: 'Año Nuevo' },
        { day: 3, type: 'vacaciones' },
        { day: 4, type: 'vacaciones' },
        { day: 5, type: 'vacaciones' },
        { day: 6, type: 'vacaciones' },
        { day: 7, type: 'vacaciones' },
        { day: 8, type: 'vacaciones' },
        { day: 26, type: 'consejo', label: 'Consejo Técnico' },
      ],
    },
    'FEBRERO 2025': {
      days: [
        { day: 9, type: 'formacion', label: 'Formación Continua' },
        { day: 16, type: 'preinscripcion', label: 'Preinscripción' },
        { day: 23, type: 'consejo', label: 'Consejo Técnico' },
      ],
    },
    'MARZO 2025': {
      days: [
        { day: 15, type: 'consejo', label: 'Consejo Técnico' },
        { day: 18, type: 'inicio-fin' },
        { day: 21, type: 'vacaciones', label: 'Vacaciones de Primavera' },
      ],
    },
    'ABRIL 2025': {
      days: [
        { day: 1, type: 'inicio-fin', label: 'Regreso de vacaciones' },
        { day: 14, type: 'formacion', label: 'Formación Continua' },
        { day: 15, type: 'consejo', label: 'Consejo Técnico' },
        { day: 26, type: 'consejo' },
      ],
    },
    'MAYO 2025': {
      days: [
        { day: 1, type: 'inicio-fin', label: 'Día del Trabajo' },
        { day: 15, type: 'consejo', label: 'Consejo Técnico' },
        { day: 31, type: 'consejo' },
      ],
    },
    'JUNIO 2025': {
      days: [
        { day: 28, type: 'consejo', label: 'Consejo Técnico Final' },
      ],
    },
    'JULIO 2025': {
      days: [
        { day: 12, type: 'descarga', label: 'Descarga Administrativa' },
        { day: 16, type: 'inicio-fin', label: 'Fin de clases' },
        { day: 28, type: 'vacaciones', label: 'Vacaciones de Verano' },
        { day: 29, type: 'vacaciones' },
        { day: 30, type: 'vacaciones' },
        { day: 31, type: 'vacaciones' },
      ],
    },
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'inicio-fin':
        return '#000000'; // Negro
      case 'consejo':
        return '#8B1538'; // Vino oscuro
      case 'vacaciones':
        return '#DEB887'; // Beige/crema
      case 'formacion':
        return '#FFD700'; // Amarillo
      case 'descarga':
        return '#87CEEB'; // Azul cielo
      case 'preinscripcion':
        return '#FF69B4'; // Rosa
      case 'entrega':
        return '#FFFFFF'; // Blanco con borde
      default:
        return colors.background;
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderMonth = (monthName, monthData) => {
    const daysInMonth = new Date(2024, Object.keys(academicCalendar).indexOf(monthName) + 8, 0).getDate();
    const firstDay = new Date(2024, Object.keys(academicCalendar).indexOf(monthName) + 7, 1).getDay();
    
    const daysArray = [];
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvent = monthData?.days?.find(d => d.day === i);
      daysArray.push({ day: i, event: dayEvent });
    }

    return (
      <Card key={monthName} style={styles.monthCard}>
        <View style={styles.monthHeader}>
          <Text style={styles.monthTitle}>{monthName}</Text>
        </View>
        <View style={styles.weekDays}>
          {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
            <Text key={index} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>
        <View style={styles.daysGrid}>
          {daysArray.map((item, index) => (
            <View key={index} style={styles.dayCell}>
              {item && (
                <View
                  style={[
                    styles.dayContainer,
                    item.event && {
                      backgroundColor: getEventColor(item.event.type),
                      borderColor: item.event.type === 'entrega' ? '#8B1538' : 'transparent',
                      borderWidth: item.event.type === 'entrega' ? 2 : 0,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      item.event && (
                        item.event.type === 'inicio-fin' || 
                        item.event.type === 'consejo'
                      ) && styles.dayTextWhite,
                    ]}
                  >
                    {item.day}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Encabezado */}
        <Card style={styles.headerCard}>
          <Text style={styles.headerTitle}>IAEDU</Text>
          <Text style={styles.headerSubtitle}>Calendario Académico 2024-2025</Text>
        </Card>

        {/* Leyenda */}
        <Card style={styles.legendCard}>
          <Text style={styles.sectionTitle}>Leyenda</Text>
          <View style={styles.legendGrid}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#000000' }]} />
              <Text style={styles.legendText}>Inicio/Fin de clases y suspensión</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#8B1538' }]} />
              <Text style={styles.legendText}>Consejo Técnico Escolar</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#DEB887' }]} />
              <Text style={styles.legendText}>Vacaciones</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FFD700' }]} />
              <Text style={styles.legendText}>Formación Continua</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#87CEEB' }]} />
              <Text style={styles.legendText}>Descarga Administrativa</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FF69B4' }]} />
              <Text style={styles.legendText}>Preinscripción</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#8B1538' }]} />
              <Text style={styles.legendText}>Entrega de evaluaciones</Text>
            </View>
          </View>
        </Card>

        {/* Calendarios mensuales */}
        {Object.keys(academicCalendar).map((month) =>
          renderMonth(month, academicCalendar[month])
        )}

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  headerCard: {
    marginBottom: spacing.md,
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  headerTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: '#8B1538',
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  legendCard: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  legendGrid: {
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  legendColor: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  legendText: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
  },
  monthCard: {
    marginBottom: spacing.md,
  },
  monthHeader: {
    backgroundColor: '#8B1538',
    padding: spacing.md,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: -spacing.md,
    marginHorizontal: -spacing.md,
    marginBottom: spacing.md,
  },
  monthTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.sm,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  weekDayText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.text,
    width: 40,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 2,
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  dayText: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: fontWeight.medium,
  },
  dayTextWhite: {
    color: '#FFFFFF',
  },
});

export default CalendarScreen;



