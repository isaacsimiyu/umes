import axios from 'axios';


const API_URL = 'http://localhost:3500/api';


export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/models/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error; 
  }
};


export const applyForCourse = async (courseId, studentId) => {
  try {
    const response = await axios.post(`${API_URL}/models/courses/apply`, {
      courseId,
      studentId,
    });
    return response.data;
  } catch (error) {
    console.error('Error applying for course:', error);
    throw error;
  }
};


export const addCourse = async (course) => {
  try {
    const response = await axios.post(`${API_URL}/models/courses`, course);
    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
};


export const updateCutoff = async (programId, cutoff) => {
  try {
    const response = await axios.put(`${API_URL}/models/courses/${programId}/cutoff`, {
      cutoff,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cutoff:', error);
    throw error;
  }
};


export const fetchReports = async (studentId, userRole) => {
  try {
    const response = await axios.get(`${API_URL}/reports`, {
      params: { studentId, userRole },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};


export const downloadReport = async (reportId) => {
  try {
    const response = await axios.get(`${API_URL}/reports/${reportId}/download`, {
      responseType: 'blob', 
    });

    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.pdf'); 
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error downloading report:', error);
    throw error;
  }
};


export const fetchStudentProgress = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/progress/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student progress:', error);
    throw error;
  }
};

export const fetchUniversities = async () => {
  try {
    const response = await axios.get(`${API_URL}models/universities`);
    return response.data;
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw error;
  }
};
