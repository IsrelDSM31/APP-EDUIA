import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import LoadingScreen from '../../components/common/LoadingScreen';
import { calendarService } from '../../services/calendarService';
import { subjectService } from '../../services/subjectService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const CalendarScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [currentSubjects, setCurrentSubjects] = useState([]);
  const [upcomingSubjects, setUpcomingSubjects] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [syncStatus, setSyncStatus] = useState({ google: false, outlook: false });

  useEffect(() => {
    loadCalendarData();
    loadSubjects();
    loadSyncStatus();
    
    // Configurar actualización automática cada 5 minutos
    const interval = setInterval(() => {
      loadCalendarData();
      loadSubjects();
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [selectedDate]);

  const loadCalendarData = async () => {
    try {
      const startDate = new Date(selectedDate);
      startDate.setDate(1);
      const endDate = new Date(selectedDate);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);

      const [eventsResponse, examsResponse] = await Promise.all([
        calendarService.getEventsByDate(startDate.toISOString(), endDate.toISOString()),
        calendarService.getUpcomingExams(),
      ]);

      if (eventsResponse && eventsResponse.data) {
        setEvents(eventsResponse.data);
      }
      if (examsResponse && examsResponse.data) {
        setUpcomingExams(examsResponse.data);
      }
    } catch (error) {
      // Error silencioso - los servicios manejan los datos de respaldo
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadSubjects = async () => {
    try {
      const [currentResponse, upcomingResponse] = await Promise.all([
        subjectService.getCurrentSubjects(),
        subjectService.getUpcomingSubjects(),
      ]);

      if (currentResponse && currentResponse.data) {
        setCurrentSubjects(currentResponse.data);
      }
      if (upcomingResponse && upcomingResponse.data) {
        setUpcomingSubjects(upcomingResponse.data);
      }
    } catch (error) {
      // Error silencioso - los servicios manejan los datos de respaldo
    }
  };

  const loadSyncStatus = async () => {
    try {
      const response = await calendarService.getSyncSettings();
      if (response && response.data) {
        setSyncStatus({
          google: response.data.google_calendar_enabled,
          outlook: response.data.outlook_enabled,
        });
      }
    } catch (error) {
      // Error silencioso - configuración por defecto
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadCalendarData();
    loadSubjects();
  };

  const handleSyncGoogle = async () => {
    try {
      await calendarService.syncWithGoogleCalendar();
      Alert.alert('Éxito', 'Sincronización con Google Calendar completada');
      loadSyncStatus();
    } catch (error) {
      Alert.alert('Error', 'No se pudo sincronizar con Google Calendar');
    }
  };

  const handleSyncOutlook = async () => {
    try {
      await calendarService.syncWithOutlook();
      Alert.alert('Éxito', 'Sincronización con Outlook completada');
      loadSyncStatus();
    } catch (error) {
      Alert.alert('Error', 'No se pudo sincronizar con Outlook');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date - now;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60 && diffMins > 0) return `En ${diffMins} min`;
    if (diffHours < 24 && diffHours > 0) return `En ${diffHours}h`;
    if (diffDays > 0) return `En ${diffDays}d`;
    return 'Ahora';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return colors.success;
    if (progress >= 60) return colors.warning;
    return colors.error;
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'exam':
        return 'file-document-edit';
      case 'class':
        return 'school';
      case 'meeting':
        return 'account-group';
      case 'holiday':
        return 'palm-tree';
      case 'assignment':
        return 'clipboard-text';
      default:
        return 'calendar';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'exam':
        return colors.error;
      case 'class':
        return colors.primary;
      case 'meeting':
        return colors.secondary;
      case 'holiday':
        return colors.success;
      case 'assignment':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  const groupEventsByDate = (events) => {
    const grouped = {};
    events.forEach((event) => {
      const date = new Date(event.start_date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(event);
    });
    return grouped;
  };

  if (loading) {
    return <LoadingScreen message="Cargando calendario..." />;
  }

  const groupedEvents = groupEventsByDate(events);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Sección de sincronización */}
        <Card style={styles.syncCard}>
          <Text style={styles.sectionTitle}>Sincronización</Text>
          <View style={styles.syncContainer}>
            <TouchableOpacity
              style={[styles.syncButton, syncStatus.google && styles.syncButtonActive]}
              onPress={handleSyncGoogle}
            >
              <Icon
                name="google"
                size={24}
                color={syncStatus.google ? colors.textLight : colors.textSecondary}
              />
              <Text
                style={[
                  styles.syncButtonText,
                  syncStatus.google && styles.syncButtonTextActive,
                ]}
              >
                Google Calendar
              </Text>
              {syncStatus.google && <Icon name="check" size={16} color={colors.textLight} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.syncButton, syncStatus.outlook && styles.syncButtonActive]}
              onPress={handleSyncOutlook}
            >
              <Icon
                name="microsoft-outlook"
                size={24}
                color={syncStatus.outlook ? colors.textLight : colors.textSecondary}
              />
              <Text
                style={[
                  styles.syncButtonText,
                  syncStatus.outlook && styles.syncButtonTextActive,
                ]}
              >
                Outlook
              </Text>
              {syncStatus.outlook && <Icon name="check" size={16} color={colors.textLight} />}
            </TouchableOpacity>
          </View>
        </Card>

        {/* Materias en curso */}
        {currentSubjects.length > 0 && (
          <Card style={styles.subjectsCard}>
            <Text style={styles.sectionTitle}>Materias en Curso</Text>
            {currentSubjects.map((subject) => (
              <View key={subject.id} style={styles.subjectItem}>
                <View style={styles.subjectIconContainer}>
                  <Icon name="book-open-page-variant" size={24} color={colors.primary} />
                </View>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectCode}>{subject.code}</Text>
                  <Text style={styles.subjectTeacher}>Prof. {subject.teacher}</Text>
                  <View style={styles.subjectDetails}>
                    <View style={styles.progressContainer}>
                      <Text style={styles.progressLabel}>Progreso: {subject.progress}%</Text>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill, 
                            { 
                              width: `${subject.progress}%`,
                              backgroundColor: getProgressColor(subject.progress)
                            }
                          ]} 
                        />
                      </View>
                    </View>
                    <View style={styles.nextClassContainer}>
                      <Icon name="clock-outline" size={16} color={colors.textSecondary} />
                      <Text style={styles.nextClassText}>
                        {formatTime(subject.next_class)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.scheduleText}>{subject.schedule}</Text>
                  <Text style={styles.classroomText}>📍 {subject.classroom}</Text>
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* Materias próximas */}
        {upcomingSubjects.length > 0 && (
          <Card style={styles.subjectsCard}>
            <Text style={styles.sectionTitle}>Próximas Materias</Text>
            {upcomingSubjects.map((subject) => (
              <View key={subject.id} style={styles.subjectItem}>
                <View style={[styles.subjectIconContainer, styles.upcomingIcon]}>
                  <Icon name="calendar-clock" size={24} color={colors.warning} />
                </View>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectCode}>{subject.code}</Text>
                  <Text style={styles.subjectTeacher}>Prof. {subject.teacher}</Text>
                  <View style={styles.upcomingDetails}>
                    <Icon name="calendar-start" size={16} color={colors.warning} />
                    <Text style={styles.startDateText}>
                      Inicia: {formatDate(subject.start_date)}
                    </Text>
                  </View>
                  <Text style={styles.descriptionText}>{subject.description}</Text>
                  <Text style={styles.scheduleText}>{subject.schedule}</Text>
                  <Text style={styles.classroomText}>📍 {subject.classroom}</Text>
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* Próximos exámenes */}
        {upcomingExams.length > 0 && (
          <Card style={styles.examsCard}>
            <Text style={styles.sectionTitle}>Próximos Exámenes</Text>
            {upcomingExams.map((exam) => (
              <View key={exam.id} style={styles.examItem}>
                <View style={styles.examIconContainer}>
                  <Icon name="file-document-edit" size={24} color={colors.error} />
                </View>
                <View style={styles.examInfo}>
                  <Text style={styles.examTitle}>{exam.title}</Text>
                  <Text style={styles.examSubject}>{exam.subject_name}</Text>
                  <Text style={styles.examDate}>{formatDate(exam.start_date)}</Text>
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* Eventos del calendario */}
        <Card style={styles.eventsCard}>
          <View style={styles.eventsHeader}>
            <Text style={styles.sectionTitle}>Eventos</Text>
            {/* Botón deshabilitado - en desarrollo */}
            {/* <TouchableOpacity onPress={() => Alert.alert('Próximamente', 'Funcionalidad en desarrollo')}>
              <Icon name="plus-circle" size={24} color={colors.primary} />
            </TouchableOpacity> */}
          </View>

          {Object.keys(groupedEvents).length === 0 ? (
            <EmptyState
              icon="calendar-blank"
              title="No hay eventos"
              message="No hay eventos programados para este mes"
            />
          ) : (
            Object.keys(groupedEvents).map((date) => (
              <View key={date} style={styles.dateGroup}>
                <Text style={styles.dateHeader}>{date}</Text>
                {groupedEvents[date].map((event) => (
                  <TouchableOpacity
                    key={event.id}
                    style={styles.eventItem}
                    onPress={() => Alert.alert('Evento', event.title + '\n' + event.description)}
                  >
                    <View
                      style={[
                        styles.eventIndicator,
                        { backgroundColor: getEventColor(event.type) },
                      ]}
                    />
                    <Icon
                      name={getEventIcon(event.type)}
                      size={24}
                      color={getEventColor(event.type)}
                      style={styles.eventIcon}
                    />
                    <View style={styles.eventInfo}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventTime}>
                        {new Date(event.start_date).toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))
          )}
        </Card>
      </ScrollView>

      {/* FAB deshabilitado temporalmente - en desarrollo */}
      {/* <TouchableOpacity
        style={styles.fab}
        onPress={() => Alert.alert('Próximamente', 'Funcionalidad en desarrollo')}
      >
        <Icon name="plus" size={24} color={colors.textLight} />
      </TouchableOpacity> */}
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
  syncCard: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  syncContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  syncButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  syncButtonActive: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  syncButtonText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
    flex: 1,
  },
  syncButtonTextActive: {
    color: colors.textLight,
    fontWeight: fontWeight.bold,
  },
  subjectsCard: {
    marginBottom: spacing.md,
  },
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  subjectIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  upcomingIcon: {
    backgroundColor: colors.warning + '20',
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subjectCode: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.xs,
  },
  subjectTeacher: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  subjectDetails: {
    marginBottom: spacing.sm,
  },
  progressContainer: {
    marginBottom: spacing.xs,
  },
  progressLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  nextClassContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  nextClassText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  upcomingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  startDateText: {
    fontSize: fontSize.xs,
    color: colors.warning,
    marginLeft: spacing.xs,
    fontWeight: fontWeight.medium,
  },
  descriptionText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  scheduleText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  classroomText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  examsCard: {
    marginBottom: spacing.md,
  },
  examItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  examIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.error + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  examInfo: {
    flex: 1,
  },
  examTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  examSubject: {
    fontSize: fontSize.sm,
    color: colors.primary,
    marginVertical: spacing.xs,
  },
  examDate: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  eventsCard: {
    marginBottom: spacing.xl,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  dateGroup: {
    marginBottom: spacing.lg,
  },
  dateHeader: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
    textTransform: 'capitalize',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  eventIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  eventIcon: {
    marginRight: spacing.md,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  eventTime: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default CalendarScreen;

