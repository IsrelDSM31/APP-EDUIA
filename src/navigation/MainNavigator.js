import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeButton from '../components/common/HomeButton';

// Screens
import AlertsScreen from '../screens/alerts/AlertsScreen';
import AttendanceScreen from '../screens/attendance/AttendanceScreen';
import EditSubjectAttendanceScreen from '../screens/attendance/EditSubjectAttendanceScreen';
import JustifyAttendanceScreen from '../screens/attendance/JustifyAttendanceScreen';
import RegisterAttendanceScreen from '../screens/attendance/RegisterAttendanceScreen';
import StudentAttendanceDetailScreen from '../screens/attendance/StudentAttendanceDetailScreen';
import ViewSubjectAttendanceScreen from '../screens/attendance/ViewSubjectAttendanceScreen';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import ChatbotScreen from '../screens/chatbot/ChatbotScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import GamificationScreen from '../screens/gamification/GamificationScreen';
import EditSubjectGradeScreen from '../screens/grades/EditSubjectGradeScreen';
import GradesScreen from '../screens/grades/GradesScreen';
import StudentGradesDetailScreen from '../screens/grades/StudentGradesDetailScreen';
import GoogleClassroomScreen from '../screens/integrations/GoogleClassroomScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import RiskAnalysisScreen from '../screens/risk/RiskAnalysisScreen';
import AddEditStudentScreen from '../screens/students/AddEditStudentScreen';
import StudentAlertsScreen from '../screens/students/StudentAlertsScreen';
import StudentDetailScreen from '../screens/students/StudentDetailScreen';
import StudentGamificationScreen from '../screens/students/StudentGamificationScreen';
import StudentGradesScreen from '../screens/students/StudentGradesScreen';
import StudentRiskAnalysisScreen from '../screens/students/StudentRiskAnalysisScreen';
import StudentsListScreen from '../screens/students/StudentsListScreen';
// Importar desde attendance para usarlo en students también
import StudentAttendanceDetailFromAttendance from '../screens/attendance/StudentAttendanceDetailScreen';
import AddEditTeacherScreen from '../screens/teachers/AddEditTeacherScreen';
import TeacherDetailScreen from '../screens/teachers/TeacherDetailScreen';
import TeachersListScreen from '../screens/teachers/TeachersListScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigators para cada módulo
const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="DashboardHome" 
      component={DashboardScreen}
      options={{ title: 'Dashboard' }}
    />
  </Stack.Navigator>
);

const StudentsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="StudentsList" 
      component={StudentsListScreen}
      options={({ navigation }) => ({ 
        title: 'Estudiantes',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="StudentDetail" 
      component={StudentDetailScreen}
      options={({ navigation }) => ({ 
        title: 'Detalle del Estudiante',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="AddEditStudent" 
      component={AddEditStudentScreen}
      options={({ route, navigation }) => ({ 
        title: route.params?.student ? 'Editar Estudiante' : 'Agregar Estudiante',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="StudentGrades" 
      component={StudentGradesScreen}
      options={({ navigation }) => ({ 
        title: 'Calificaciones',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="StudentAlerts" 
      component={StudentAlertsScreen}
      options={({ navigation }) => ({ 
        title: 'Alertas',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="StudentRiskAnalysis" 
      component={StudentRiskAnalysisScreen}
      options={({ navigation }) => ({ 
        title: 'Análisis de Riesgo',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="StudentGamification" 
      component={StudentGamificationScreen}
      options={({ navigation }) => ({ 
        title: 'Gamificación',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="StudentAttendanceDetail" 
      component={StudentAttendanceDetailFromAttendance}
      options={({ navigation }) => ({ 
        title: 'Asistencias del Estudiante',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="JustifyAttendance" 
      component={JustifyAttendanceScreen}
      options={({ navigation }) => ({ 
        title: 'Justificar Asistencia',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
  </Stack.Navigator>
);

const TeachersStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="TeachersList" 
      component={TeachersListScreen}
      options={({ navigation }) => ({ 
        title: 'Profesores',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="TeacherDetail" 
      component={TeacherDetailScreen}
      options={({ navigation }) => ({ 
        title: 'Detalle del Profesor',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="AddEditTeacher" 
      component={AddEditTeacherScreen}
      options={({ route, navigation }) => ({ 
        title: route.params?.teacher ? 'Editar Profesor' : 'Agregar Profesor',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
  </Stack.Navigator>
);

const AcademicStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="GradesScreen" 
      component={GradesScreen}
      options={({ navigation }) => ({ 
        title: 'Calificaciones',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="StudentGradesDetail" 
      component={StudentGradesDetailScreen}
      options={({ navigation }) => ({ 
        title: 'Calificaciones del Estudiante',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="EditSubjectGrade" 
      component={EditSubjectGradeScreen}
      options={({ navigation }) => ({ 
        title: 'Editar Calificaciones',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="AttendanceScreen" 
      component={AttendanceScreen}
      options={({ navigation }) => ({ 
        title: 'Asistencias',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="StudentAttendanceDetail" 
      component={StudentAttendanceDetailScreen}
      options={({ navigation }) => ({ 
        title: 'Asistencias del Estudiante',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="EditSubjectAttendance" 
      component={EditSubjectAttendanceScreen}
      options={({ navigation }) => ({ 
        title: 'Registrar Asistencia',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="ViewSubjectAttendance" 
      component={ViewSubjectAttendanceScreen}
      options={({ navigation }) => ({ 
        title: 'Ver Asistencias',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="RegisterAttendance" 
      component={RegisterAttendanceScreen}
      options={({ navigation }) => ({ 
        title: 'Registrar Asistencia',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="JustifyAttendance" 
      component={JustifyAttendanceScreen}
      options={({ navigation }) => ({ 
        title: 'Justificar Asistencia',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
  </Stack.Navigator>
);


const CalendarStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="CalendarHome" 
      component={CalendarScreen}
      options={({ navigation }) => ({ 
        title: 'Calendario',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProfileHome" 
      component={ProfileScreen}
      options={({ navigation }) => ({ 
        title: 'Perfil',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="EditProfileScreen" 
      component={EditProfileScreen}
      options={({ navigation }) => ({ 
        title: 'Editar Perfil',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="AlertsScreen" 
      component={AlertsScreen}
      options={({ navigation }) => ({ 
        title: 'Alertas',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="RiskAnalysisScreen" 
      component={RiskAnalysisScreen}
      options={({ navigation }) => ({ 
        title: 'Análisis de Riesgo IA',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="ChatbotScreen" 
      component={ChatbotScreen}
      options={({ navigation }) => ({ 
        title: 'Asistente IA',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="GoogleClassroomScreen" 
      component={GoogleClassroomScreen}
      options={({ navigation }) => ({ 
        title: 'Google Classroom',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name="GamificationScreen" 
      component={GamificationScreen}
      options={({ navigation }) => ({ 
        title: 'Gamificación',
        headerRight: () => <HomeButton navigation={navigation} />
      })}
    />
  </Stack.Navigator>
);

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Academic"
        component={AcademicStack}
        options={{
          tabBarLabel: 'Académico',
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-education" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Students"
        component={StudentsStack}
        options={{
          tabBarLabel: 'Estudiantes',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarLabel: 'Calendario',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;

