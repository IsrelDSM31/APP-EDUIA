import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Card from '../../components/common/Card';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const { width } = Dimensions.get('window');

const CalendarScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  // Calendario académico IAEDU 2025-2026
  const academicCalendar = {
    'AGOSTO 2025': {
      days: [
        { day: 21, type: 'inicio-fin', label: 'Inicio de clases' },
        { day: 22, type: 'vacaciones' },
        { day: 23, type: 'consejo', label: 'Consejo Técnico' },
        { day: 24, type: 'consejo' },
        { day: 25, type: 'consejo' },
        { day: 28, type: 'inicio-fin' },
      ],
    },
    'SEPTIEMBRE 2025': {
      days: [
        { day: 15, type: 'consejo', label: 'Consejo Técnico' },
        { day: 22, type: 'consejo' },
        { day: 29, type: 'consejo' },
      ],
    },
    'OCTUBRE 2025': {
      days: [
        { day: 27, type: 'consejo', label: 'Consejo Técnico' },
      ],
    },
    'NOVIEMBRE 2025': {
      days: [
        { day: 2, type: 'inicio-fin', label: 'Día de Muertos' },
        { day: 17, type: 'consejo', label: 'Consejo Técnico' },
        { day: 20, type: 'inicio-fin' },
        { day: 24, type: 'consejo' },
        { day: 27, type: 'entrega', label: 'Entrega de evaluaciones' },
      ],
    },
    'DICIEMBRE 2025': {
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
    'ENERO 2026': {
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
    'FEBRERO 2026': {
      days: [
        { day: 9, type: 'formacion', label: 'Formación Continua' },
        { day: 16, type: 'preinscripcion', label: 'Preinscripción' },
        { day: 23, type: 'consejo', label: 'Consejo Técnico' },
      ],
    },
    'MARZO 2026': {
      days: [
        { day: 15, type: 'consejo', label: 'Consejo Técnico' },
        { day: 18, type: 'inicio-fin' },
        { day: 21, type: 'vacaciones', label: 'Vacaciones de Primavera' },
      ],
    },
    'ABRIL 2026': {
      days: [
        { day: 1, type: 'inicio-fin', label: 'Regreso de vacaciones' },
        { day: 14, type: 'formacion', label: 'Formación Continua' },
        { day: 15, type: 'consejo', label: 'Consejo Técnico' },
        { day: 26, type: 'consejo' },
      ],
    },
    'MAYO 2026': {
      days: [
        { day: 1, type: 'inicio-fin', label: 'Día del Trabajo' },
        { day: 15, type: 'consejo', label: 'Consejo Técnico' },
        { day: 31, type: 'consejo' },
      ],
    },
    'JUNIO 2026': {
      days: [
        { day: 28, type: 'consejo', label: 'Consejo Técnico Final' },
      ],
    },
    'JULIO 2026': {
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
        return '#000000';
      case 'consejo':
        return '#8B1538';
      case 'vacaciones':
        return '#DEB887';
      case 'formacion':
        return '#FFD700';
      case 'descarga':
        return '#87CEEB';
      case 'preinscripcion':
        return '#FF69B4';
      case 'entrega':
        return '#FFFFFF';
      default:
        return colors.background;
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'inicio-fin':
        return 'calendar-star';
      case 'consejo':
        return 'account-group';
      case 'vacaciones':
        return 'beach';
      case 'formacion':
        return 'school';
      case 'descarga':
        return 'file-document-outline';
      case 'preinscripcion':
        return 'account-plus';
      case 'entrega':
        return 'clipboard-check';
      default:
        return 'calendar';
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderMonth = (monthName, monthData) => {
    const monthIndex = Object.keys(academicCalendar).indexOf(monthName);
    const year = monthName.includes('2025') ? 2025 : 2026;
    const month = monthIndex % 12;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const daysArray = [];
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvent = monthData?.days?.find(d => d.day === i);
      daysArray.push({ day: i, event: dayEvent });
    }

    return (
      <Card key={monthName} style={styles.monthCard} elevated={true}>
        <LinearGradient
          colors={['#8B1538', '#6B0F28']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.monthHeader}
        >
          <Icon name="calendar-month" size={24} color="#FFFFFF" />
          <Text style={styles.monthTitle}>{monthName}</Text>
        </LinearGradient>
        
        <View style={styles.weekDays}>
          {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
            <View key={index} style={styles.weekDayContainer}>
              <Text style={[
                styles.weekDayText,
                (index === 0 || index === 6) && styles.weekendText
              ]}>
                {day}
              </Text>
            </View>
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
                    !item.event && styles.normalDay,
                  ]}
                >
                  {item.event && (
                    <View style={styles.eventIconContainer}>
                      <Icon 
                        name={getEventIcon(item.event.type)} 
                        size={10} 
                        color={
                          item.event.type === 'inicio-fin' || item.event.type === 'consejo'
                            ? '#FFFFFF'
                            : '#8B1538'
                        } 
                      />
                    </View>
                  )}
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
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado mejorado */}
        <LinearGradient
          colors={['#8B1538', '#6B0F28', '#4B0518']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerCard}>
            <Icon name="school" size={48} color="#FFFFFF" />
            <Text style={styles.headerTitle}>IAEDU</Text>
            <Text style={styles.headerSubtitle}>Calendario Académico</Text>
            <View style={styles.yearBadge}>
              <Text style={styles.yearText}>2025 - 2026</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Leyenda mejorada */}
        <Card style={styles.legendCard} elevated={true}>
          <View style={styles.legendHeader}>
            <Icon name="information" size={24} color="#8B1538" />
            <Text style={styles.sectionTitle}>Leyenda de Eventos</Text>
          </View>
          
          <View style={styles.legendGrid}>
            {[
              { color: '#000000', text: 'Inicio/Fin de clases y suspensión', icon: 'calendar-star' },
              { color: '#8B1538', text: 'Consejo Técnico Escolar', icon: 'account-group' },
              { color: '#DEB887', text: 'Vacaciones', icon: 'beach' },
              { color: '#FFD700', text: 'Formación Continua', icon: 'school' },
              { color: '#87CEEB', text: 'Descarga Administrativa', icon: 'file-document-outline' },
              { color: '#FF69B4', text: 'Preinscripción', icon: 'account-plus' },
              { color: '#FFFFFF', text: 'Entrega de evaluaciones', icon: 'clipboard-check', border: true },
            ].map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[
                  styles.legendColor,
                  { backgroundColor: item.color },
                  item.border && { borderWidth: 2, borderColor: '#8B1538' }
                ]}>
                  <Icon 
                    name={item.icon} 
                    size={14} 
                    color={item.color === '#000000' || item.color === '#8B1538' ? '#FFFFFF' : '#8B1538'} 
                  />
                </View>
                <Text style={styles.legendText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Estadísticas del año */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="book-open-page-variant" size={28} color="#8B1538" />
            <Text style={styles.statNumber}>200</Text>
            <Text style={styles.statLabel}>Días de clase</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="beach" size={28} color="#DEB887" />
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Días de vacaciones</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="account-group" size={28} color="#6B0F28" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Consejos Técnicos</Text>
          </View>
        </View>

        {/* Calendarios mensuales */}
        <View style={styles.calendarsSection}>
          <Text style={styles.calendarsTitle}>Calendario Mensual</Text>
          {Object.keys(academicCalendar).map((month) =>
            renderMonth(month, academicCalendar[month])
          )}
        </View>

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
  },
  headerGradient: {
    borderRadius: 0,
    marginBottom: spacing.md,
  },
  headerCard: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: spacing.md,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: fontSize.lg,
    color: '#FFFFFF',
    marginTop: spacing.xs,
    opacity: 0.9,
  },
  yearBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginTop: spacing.md,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  yearText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  legendCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  legendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: '#8B1538',
    marginLeft: spacing.sm,
  },
  legendGrid: {
    gap: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  legendColor: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  legendText: {
    fontSize: fontSize.md,
    color: colors.text,
    flex: 1,
    fontWeight: fontWeight.medium,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: '#8B1538',
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  calendarsSection: {
    padding: spacing.md,
  },
  calendarsTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: '#8B1538',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  monthCard: {
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  monthTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 2,
    borderBottomColor: '#8B1538',
  },
  weekDayContainer: {
    width: 40,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: '#8B1538',
  },
  weekendText: {
    color: '#FF6B6B',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.xs,
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
    borderRadius: 8,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  normalDay: {
    backgroundColor: '#FAFAFA',
  },
  eventIconContainer: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  dayText: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: fontWeight.bold,
  },
  dayTextWhite: {
    color: '#FFFFFF',
  },
});

export default CalendarScreen;
