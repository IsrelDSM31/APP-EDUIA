// API Configuration
export const API_CONFIG = {
  // before production
  // BASE_URL: 'http://192.168.1.69:8000/api', // IP local de tu PC - funciona para emulador y dispositivo físico

  // BASE_URL: 'https://eduia.on-forge.com/api', // IP local de tu PC - funciona para emulador y dispositivo físico
  BASE_URL: 'http://18.219.43.140/api', // url prod aws
  // BASE_URL: 'http://10.0.2.2:8000/api', // Solo para emulador Android (si la IP no funciona)
  // BASE_URL: 'http://localhost:8000/api', // Solo para web/iOS Simulator
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

// Endpoints
export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  ME: '/auth/user',
  REFRESH_TOKEN: '/auth/refresh',

  // Estudiantes
  STUDENTS: '/students',
  STUDENT_BY_ID: (id) => `/students/${id}`,
  STUDENT_GRADES: (id) => `/students/${id}/grades`,
  STUDENT_ATTENDANCE: (id) => `/students/${id}/attendance`,
  STUDENT_ALERTS: (id) => `/students/${id}/alerts`,
  STUDENT_RISK_ANALYSIS: (id) => `/students/${id}/risk-analysis`,

  // Profesores
  TEACHERS: '/teachers',
  TEACHER_BY_ID: (id) => `/teachers/${id}`,
  TEACHER_STUDENTS: (id) => `/teachers/${id}/students`,
  TEACHER_COURSES: (id) => `/teachers/${id}/courses`,

  // Calificaciones
  GRADES: '/grades',
  GRADE_BY_ID: (id) => `/grades/${id}`,
  GRADES_BY_COURSE: (courseId) => `/courses/${courseId}/grades`,

  // Asistencias
  ATTENDANCE: '/attendance',
  ATTENDANCE_BY_ID: (id) => `/attendance/${id}`,
  ATTENDANCE_BY_STUDENT: (studentId) => `/students/${studentId}/attendance`,
  MARK_ATTENDANCE: '/attendance/mark',

  // Alertas
  ALERTS: '/alerts',
  ALERT_BY_ID: (id) => `/alerts/${id}`,
  ALERTS_UNREAD: '/alerts/unread',
  MARK_ALERT_READ: (id) => `/alerts/${id}/read`,

  // Análisis de Riesgo IA
  RISK_ANALYSIS: '/risk-analysis',
  RISK_ANALYSIS_BY_STUDENT: (studentId) => `/students/${studentId}/risk-analysis`,
  PREDICT_RISK: '/risk-analysis/predict',
  RISK_STATISTICS: '/risk-analysis/statistics',

  // Dashboard
  DASHBOARD_STATS: '/dashboard/stats',
  DASHBOARD_RECENT_ACTIVITIES: '/dashboard/recent-activities',

  // Grade Management (Sistema completo)
  GRADE_MANAGEMENT_STUDENTS: '/grade-management/students',
  GRADE_MANAGEMENT_STUDENT_GRADES: (id) => `/grade-management/students/${id}/grades`,
  GRADE_MANAGEMENT_DELETE: (studentId, subjectId) => `/grade-management/students/${studentId}/subjects/${subjectId}`,

  // Attendance Management (Sistema completo)
  ATTENDANCE_MANAGEMENT_STUDENT: (id) => `/attendance-management/students/${id}/attendance`,
  ATTENDANCE_MANAGEMENT_DELETE: (studentId, attendanceId) => `/attendance-management/students/${studentId}/attendance/${attendanceId}`,

  // Chatbot
  CHATBOT_MESSAGE: '/chatbot/message',
  CHATBOT_HISTORY: '/chatbot/history',

  // Profile
  PROFILE: '/profile',
  PROFILE_UPDATE: '/profile',
  PROFILE_AVATAR: '/profile/avatar',

  // Google Classroom
  GOOGLE_CLASSROOM_AUTH_CONFIG: '/google-classroom/auth-config',
  GOOGLE_CLASSROOM_EXCHANGE_CODE: '/google-classroom/exchange-code',
  GOOGLE_CLASSROOM_COURSES: '/google-classroom/courses',
  GOOGLE_CLASSROOM_COURSE_STUDENTS: (courseId) => `/google-classroom/courses/${courseId}/students`,
  GOOGLE_CLASSROOM_COURSE_WORK: (courseId) => `/google-classroom/courses/${courseId}/coursework`,
  GOOGLE_CLASSROOM_SYNC_STUDENTS: (courseId) => `/google-classroom/courses/${courseId}/sync-students`,
  GOOGLE_CLASSROOM_DISCONNECT: '/google-classroom/disconnect',
  GOOGLE_CLASSROOM_STATUS: '/google-classroom/status',

  // Gamification
  GAMIFICATION_STUDENT_POINTS: (studentId) => `/gamification/students/${studentId}/points`,
  GAMIFICATION_STUDENT_ACHIEVEMENTS: (studentId) => `/gamification/students/${studentId}/achievements`,
  GAMIFICATION_STUDENT_RANK: (studentId) => `/gamification/students/${studentId}/rank`,
  GAMIFICATION_POINTS_HISTORY: (studentId) => `/gamification/students/${studentId}/history`,
  GAMIFICATION_ALL_ACHIEVEMENTS: '/gamification/achievements',
  GAMIFICATION_RANKING: '/gamification/ranking',
  GAMIFICATION_ADD_POINTS: '/gamification/points/add',

  // Calendario
  CALENDAR_EVENTS: '/calendar/events',
  CALENDAR_EVENT_BY_ID: (id) => `/calendar/events/${id}`,
  CALENDAR_CREATE_EVENT: '/calendar/events',
  CALENDAR_UPDATE_EVENT: (id) => `/calendar/events/${id}`,
  CALENDAR_DELETE_EVENT: (id) => `/calendar/events/${id}`,
  CALENDAR_UPCOMING_EXAMS: '/calendar/events/upcoming-exams',
  CALENDAR_REMINDERS: '/calendar/reminders',
  CALENDAR_CREATE_REMINDER: '/calendar/reminders',
  CALENDAR_SYNC_GOOGLE: '/calendar/sync/google',
  CALENDAR_SYNC_OUTLOOK: '/calendar/sync/outlook',
  CALENDAR_SYNC_SETTINGS: '/calendar/sync/settings',
  CALENDAR_EXPORT: '/calendar/export',

  // Materias/Subjects
  SUBJECTS: '/subjects',
  SUBJECT_BY_ID: (id) => `/subjects/${id}`,
  CURRENT_SUBJECTS: '/subjects/current',
  UPCOMING_SUBJECTS: '/subjects/upcoming',
  SUBJECT_SCHEDULE: (id) => `/subjects/${id}/schedule`,

};

