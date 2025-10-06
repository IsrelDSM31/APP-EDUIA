import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const riskAnalysisService = {
  // Obtener todos los análisis de riesgo
  getAllRiskAnalysis: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString 
        ? `${ENDPOINTS.RISK_ANALYSIS}?${queryString}` 
        : ENDPOINTS.RISK_ANALYSIS;
      return await apiService.get(url);
    } catch (error) {
      throw error;
    }
  },

  // Obtener análisis de riesgo por estudiante
  getRiskAnalysisByStudent: async (studentId) => {
    try {
      return await apiService.get(ENDPOINTS.RISK_ANALYSIS_BY_STUDENT(studentId));
    } catch (error) {
      throw error;
    }
  },

  // Predecir riesgo para un estudiante
  predictRisk: async (studentData) => {
    try {
      return await apiService.post(ENDPOINTS.PREDICT_RISK, studentData);
    } catch (error) {
      throw error;
    }
  },

  // Obtener estadísticas de riesgo
  getRiskStatistics: async () => {
    try {
      return await apiService.get(ENDPOINTS.RISK_STATISTICS);
    } catch (error) {
      throw error;
    }
  },
};

