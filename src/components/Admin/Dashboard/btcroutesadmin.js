import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../../assests/logo2.png';
import {
  FiLogOut,
  FiHome,
  FiMenu,
  FiX,
  FiChevronRight,
  FiCheckCircle,
  FiAlertCircle,
  FiCalendar,
  FiUserPlus,
  FiUsers,
  FiActivity,
  FiEdit2
} from 'react-icons/fi';
import {
  FaChalkboardTeacher,
  FaGraduationCap,
  FaClipboardList,
  FaProjectDiagram
} from 'react-icons/fa';

// Import components
import AddStudent from './components/AddStudent';
import ViewStudents from './components/ViewStudents';
import Dashboard from './components/Dashboard';
import Assessment from './components/Assessment';
import Assignment from './components/Assignment';
import { MarkAttendance, ViewAttendance } from './components/Attendance';

// Import styled components
import {
  Spinner,
  LoadingOverlay,
  Notification,
  LoginContainer,
  LoginCard,
  LoginHeader,
  LoginNote,
  DashboardContainer,
  Sidebar,
  SidebarHeader,
  SidebarToggle,
  SidebarNav,
  NavLink,
  LogoutButton,
  MainContent,
  ContentHeader,
  MobileHeader,
  MobileMenuToggle,
  ContentBody,
  Form,
  FormGroup,
  Label,
  Input,
  PrimaryButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalActions,
  CloseButton,
  SecondaryButton,
  TextArea,
  StudentPhoto,
  PhotoPlaceholder,
  StudentName,
  StudentEmail,
  StudentId,
  StudentDetailHeader,
  StudentDetailInfo,
  DetailGrid,
  DetailCard,
  DetailLabel,
  DetailValue,
  Badge
} from './components/StyledComponents';

const BtcRoutesAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    course: '',
    batch: '',
    preferred_mode: 'offline',
    period_months: 1,
    joiningDate: '',
    photo: null,
    college: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);

  // Attendance states
  const [attendance, setAttendance] = useState({
    date: new Date().toISOString().split('T')[0],
    records: []
  });
  const [attendanceList, setAttendanceList] = useState([]);
  const [leaveReason, setLeaveReason] = useState('');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedStudentForLeave, setSelectedStudentForLeave] = useState(null);

  // Assessment and Assignment states for dashboard
  const [assessments, setAssessments] = useState([]);
  const [assignments, setAssignments] = useState([]);

  // Fetch assessments for dashboard
  const fetchAssessments = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3003/api/assessment/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssessments(response.data);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

  // Fetch assignments for dashboard
  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3003/api/assignment/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      fetchStudents();
      fetchAssessments();
      fetchAssignments();
    }
  }, []);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3003/api/student/all-student', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      showNotification('Failed to load students', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch single student
  const fetchStudent = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:3003/api/student/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching student:', error);
      showNotification('Failed to load student details', 'error');
      throw error;
    }
  };

  // Attendance APIs
  const markAttendance = async () => {
    if (attendance.records.length === 0) {
      showNotification('No attendance records to submit', 'error');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://localhost:3003/api/attendance/mark', attendance, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      showNotification('Attendance marked successfully!', 'success');
      setAttendance({
        date: new Date().toISOString().split('T')[0],
        records: []
      });
      fetchAttendanceList();
    } catch (error) {
      console.error('Error marking attendance:', error);
      showNotification('Failed to mark attendance', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceList = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3003/api/attendance/all-attendance', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAttendanceList(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceList();
  }, []);

  // Filter records by selected date
  useEffect(() => {
    if (selectedDate) {
      const filtered = attendanceList.filter(record => record.date === selectedDate);
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords([]);
    }
  }, [selectedDate, attendanceList]);

  // Attendance handlers
  const handleAttendanceStatus = (studentId, status) => {
    if (status === 'L') {
      setSelectedStudentForLeave(studentId);
      setShowLeaveModal(true);
      return;
    }

    setAttendance(prev => {
      const existingRecordIndex = prev.records.findIndex(record => record.studentId === studentId);

      if (existingRecordIndex >= 0) {
        const updatedRecords = [...prev.records];
        updatedRecords[existingRecordIndex] = { studentId, status };
        return { ...prev, records: updatedRecords };
      } else {
        return {
          ...prev,
          records: [...prev.records, { studentId, status }]
        };
      }
    });
  };

  const handleLeaveSubmit = () => {
    if (!leaveReason.trim()) {
      showNotification('Please enter a reason for leave', 'error');
      return;
    }

    setAttendance(prev => {
      const existingRecordIndex = prev.records.findIndex(record => record.studentId === selectedStudentForLeave);

      if (existingRecordIndex >= 0) {
        const updatedRecords = [...prev.records];
        updatedRecords[existingRecordIndex] = {
          studentId: selectedStudentForLeave,
          status: 'L',
          reason: leaveReason
        };
        return { ...prev, records: updatedRecords };
      } else {
        return {
          ...prev,
          records: [
            ...prev.records,
            { studentId: selectedStudentForLeave, status: 'L', reason: leaveReason }
          ]
        };
      }
    });

    setShowLeaveModal(false);
    setLeaveReason('');
    setSelectedStudentForLeave(null);
    showNotification('Leave marked successfully', 'success');
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3003/api/admin/login-admin', loginData);
      const { token, user } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      setIsLoggedIn(true);
      setLoginData({ email: '', password: '' });
      showNotification('Login successful!', 'success');
      fetchStudents();
    } catch (error) {
      console.error('Login error:', error);
      showNotification(
        error.response?.data?.message || 'Invalid credentials!',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle student form input changes
  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentForm(prev => ({
        ...prev,
        photo: file
      }));
    }
  };

  // Add new student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      Object.keys(studentForm).forEach(key => {
        if (studentForm[key] !== null) {
          formData.append(key, studentForm[key]);
        }
      });

      await axios.post('http://localhost:3003/api/student/add-student', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });

      await fetchStudents();
      resetStudentForm();
      setActiveSection('viewStudents');
      showNotification('Student added successfully!', 'success');
    } catch (error) {
      console.error('Error adding student:', error);
      showNotification(
        error.response?.data?.message || 'Failed to add student',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Edit student
  const handleEditStudent = (student) => {
    setStudentForm({
      name: student.name,
      email: student.email,
      course: student.course,
      batch: student.batch,
      preferred_mode: student.preferred_mode,
      period_months: student.period_months,
      joiningDate: student.joiningDate,
      photo: student.photo,
      college: student.college
    });
    setIsEditing(true);
    setEditingId(student.id);
    setActiveSection('addStudent');
    setSelectedStudent(null);
  };

  // Update student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      Object.keys(studentForm).forEach(key => {
        if (studentForm[key] !== null) {
          formData.append(key, studentForm[key]);
        }
      });

      await axios.put(`http://localhost:3003/api/student/update/${editingId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });

      await fetchStudents();
      resetStudentForm();
      setIsEditing(false);
      setEditingId(null);
      setActiveSection('viewStudents');
      showNotification('Student updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating student:', error);
      showNotification(
        error.response?.data?.message || 'Failed to update student',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete student
  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:3003/api/student/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await fetchStudents();
      setSelectedStudent(null);
      showNotification('Student deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting student:', error);
      showNotification(
        error.response?.data?.message || 'Failed to delete student',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset student form
  const resetStudentForm = () => {
    setStudentForm({
      name: '',
      email: '',
      course: '',
      batch: '',
      preferred_mode: 'offline',
      period_months: 1,
      joiningDate: '',
      photo: null,
      college: ''
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    resetStudentForm();
    setIsEditing(false);
    setEditingId(null);
    setActiveSection('viewStudents');
  };

  // Activities prompt
  const handleActivities = () => {
    const activity = prompt('Enter your activity:');
    if (activity) {
      showNotification(`Activity recorded: ${activity}`, 'success');
    }
  };

  // View student details
  const handleViewStudent = async (student) => {
    setLoading(true);
    try {
      const studentData = await fetchStudent(student.id);
      setSelectedStudent(studentData);
    } catch (error) {
      setSelectedStudent(student);
    } finally {
      setLoading(false);
    }
  };

  // Close student details
  const handleCloseStudentDetails = () => {
    setSelectedStudent(null);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setActiveSection('dashboard');
    setSelectedStudent(null);
    showNotification('Logged out successfully', 'success');
  };

  // Get section title
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard': return 'Dashboard';
      case 'addStudent': return isEditing ? 'Edit Student' : 'Add New Student';
      case 'viewStudents': return `Student List (${students.length})`;
      case 'markAttendance': return 'Mark Attendance';
      case 'viewAttendance': return 'View Attendance Records';
      case 'assessment': return 'Assessment & Evaluation';
      case 'assignment': return 'Assignment & Projects';
      default: return 'Dashboard';
    }
  };

  if (!isLoggedIn) {
    return (
      <LoginContainer>
        <LoginCard>
          <LoginHeader>
            <FaGraduationCap size={48} color="#667eea" />
            <h2>Student Record System</h2>
            <p>Admin Login</p>
          </LoginHeader>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="text"
                value={loginData.email}
                onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                required
                disabled={loading}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                required
                disabled={loading}
              />
            </FormGroup>
            <PrimaryButton type="submit" fullWidth disabled={loading}>
              {loading ? <Spinner small /> : <FiLogOut size={18} />}
              {loading ? 'Logging in...' : 'Login'}
            </PrimaryButton>
            <LoginNote>
              <small>Enter your admin credentials</small>
            </LoginNote>
          </Form>
        </LoginCard>

        {notification.show && (
          <Notification type={notification.type}>
            {notification.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
            {notification.message}
          </Notification>
        )}
      </LoginContainer>
    );
  }

  return (
    <DashboardContainer>
      <Sidebar collapsed={isSidebarCollapsed}>
        <SidebarHeader>
          {!isSidebarCollapsed && <FaChalkboardTeacher size={32} />}
          {!isSidebarCollapsed && <h3>Student Records</h3>}
          <SidebarToggle onClick={toggleSidebar}>
            {isSidebarCollapsed ? <FiChevronRight size={20} /> : <FiX size={20} />}
          </SidebarToggle>
        </SidebarHeader>
        <SidebarNav>
          <li>
            <NavLink
              active={activeSection === 'dashboard'}
              onClick={() => setActiveSection('dashboard')}
              collapsed={isSidebarCollapsed}
              data-tooltip="Dashboard"
            >
              <FiHome size={20} />
              {!isSidebarCollapsed && "Dashboard"}
            </NavLink>
          </li>
          <li>
            <NavLink
              active={activeSection === 'addStudent'}
              onClick={() => {
                setActiveSection('addStudent');
                if (isEditing) handleCancelEdit();
              }}
              collapsed={isSidebarCollapsed}
              data-tooltip="Add Student"
            >
              <FiUserPlus size={20} />
              {!isSidebarCollapsed && "Add Student"}
            </NavLink>
          </li>
          <li>
            <NavLink
              active={activeSection === 'viewStudents'}
              onClick={() => setActiveSection('viewStudents')}
              collapsed={isSidebarCollapsed}
              data-tooltip="View Students"
            >
              <FiUsers size={20} />
              {!isSidebarCollapsed && "View Students"}
            </NavLink>
          </li>
          <li>
            <NavLink
              active={activeSection === 'markAttendance'}
              onClick={() => {
                setActiveSection('markAttendance');
                fetchStudents();
              }}
              collapsed={isSidebarCollapsed}
              data-tooltip="Mark Attendance"
            >
              <FiCheckCircle size={20} />
              {!isSidebarCollapsed && "Mark Attendance"}
            </NavLink>
          </li>
          <li>
            <NavLink
              active={activeSection === 'viewAttendance'}
              onClick={() => {
                setActiveSection('viewAttendance');
                fetchAttendanceList();
              }}
              collapsed={isSidebarCollapsed}
              data-tooltip="View Attendance"
            >
              <FiCalendar size={20} />
              {!isSidebarCollapsed && "View Attendance"}
            </NavLink>
          </li>
          <li>
            <NavLink
              active={activeSection === 'assessment'}
              onClick={() => setActiveSection('assessment')}
              collapsed={isSidebarCollapsed}
              data-tooltip="Assessment"
            >
              <FaClipboardList size={20} />
              {!isSidebarCollapsed && "Assessment"}
            </NavLink>
          </li>
          <li>
            <NavLink
              active={activeSection === 'assignment'}
              onClick={() => setActiveSection('assignment')}
              collapsed={isSidebarCollapsed}
              data-tooltip="Assignment"
            >
              <FaProjectDiagram size={20} />
              {!isSidebarCollapsed && "Assignment"}
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleActivities} collapsed={isSidebarCollapsed} data-tooltip="Activities">
              <FiActivity size={20} />
              {!isSidebarCollapsed && "Activities"}
            </NavLink>
          </li>
          <li>
            <LogoutButton onClick={handleLogout} collapsed={isSidebarCollapsed} data-tooltip="Logout">
              <FiLogOut size={20} />
              {!isSidebarCollapsed && "Logout"}
            </LogoutButton>
          </li>
        </SidebarNav>
      </Sidebar>

      <MainContent sidebarCollapsed={isSidebarCollapsed}>
        <ContentHeader>
          <MobileHeader>
            <MobileMenuToggle onClick={toggleSidebar}>
              <FiMenu size={24} />
            </MobileMenuToggle>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: '100px', height: '40px', objectFit: 'contain' }}
              />
              <h4 style={{ margin: 0 }}>{getSectionTitle()}</h4>
            </div>
          </MobileHeader>
        </ContentHeader>

        <ContentBody>
          {loading && (
            <LoadingOverlay>
              <Spinner />
              <p>Loading...</p>
            </LoadingOverlay>
          )}

          {activeSection === 'dashboard' && (
            <Dashboard students={students} assessments={assessments} assignments={assignments} />
          )}

          {activeSection === 'addStudent' && (
            <AddStudent
              studentForm={studentForm}
              handleStudentInputChange={handleStudentInputChange}
              handlePhotoUpload={handlePhotoUpload}
              handleAddStudent={handleAddStudent}
              handleUpdateStudent={handleUpdateStudent}
              handleCancelEdit={handleCancelEdit}
              isEditing={isEditing}
              loading={loading}
            />
          )}

          {activeSection === 'viewStudents' && (
            <ViewStudents
              students={students}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleViewStudent={handleViewStudent}
              handleEditStudent={handleEditStudent}
              handleDeleteStudent={handleDeleteStudent}
              setActiveSection={setActiveSection}
              loading={loading}
            />
          )}

          {activeSection === 'markAttendance' && (
            <MarkAttendance
              students={students}
              attendance={attendance}
              setAttendance={setAttendance}
              handleAttendanceStatus={handleAttendanceStatus}
              markAttendance={markAttendance}
              loading={loading}
            />
          )}

          {activeSection === 'viewAttendance' && (
            <ViewAttendance
              attendanceList={attendanceList}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              filteredRecords={filteredRecords}
              loading={loading}
            />
          )}

          {activeSection === 'assessment' && (
            <Assessment
              students={students}
              showNotification={showNotification}
              loading={loading}
            />
          )}

          {activeSection === 'assignment' && (
            <Assignment
              students={students}
              showNotification={showNotification}
              loading={loading}
            />
          )}
        </ContentBody>
      </MainContent>

      {/* Student Details Modal */}
      {selectedStudent && (
        <ModalOverlay onClick={handleCloseStudentDetails}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>Student Details</h3>
              <CloseButton onClick={handleCloseStudentDetails}>
                <FiX size={24} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <StudentDetailHeader>
                <StudentPhoto large>
                  {selectedStudent.photo ? (
                    <img
                      src={`http://localhost:3003/uploads/${selectedStudent.photo}`}
                      alt={selectedStudent.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100/007bff/ffffff?text=U';
                      }}
                    />
                  ) : (
                    <PhotoPlaceholder large>
                      {selectedStudent.name?.charAt(0)?.toUpperCase() || 'U'}
                    </PhotoPlaceholder>
                  )}
                </StudentPhoto>
                <StudentDetailInfo>
                  <StudentName large>{selectedStudent.name}</StudentName>
                  <StudentEmail>{selectedStudent.email}</StudentEmail>
                  <StudentId>Student ID: #{selectedStudent.id}</StudentId>
                </StudentDetailInfo>
              </StudentDetailHeader>

              <DetailGrid>
                <DetailCard>
                  <DetailLabel>Course</DetailLabel>
                  <DetailValue>
                    <Badge primary>{selectedStudent.course}</Badge>
                  </DetailValue>
                </DetailCard>
                <DetailCard>
                  <DetailLabel>Batch</DetailLabel>
                  <DetailValue>{selectedStudent.batch}</DetailValue>
                </DetailCard>
                <DetailCard>
                  <DetailLabel>Preferred Mode</DetailLabel>
                  <DetailValue>
                    <Badge success={selectedStudent.preferred_mode === 'online'}>
                      {selectedStudent.preferred_mode}
                    </Badge>
                  </DetailValue>
                </DetailCard>
                <DetailCard>
                  <DetailLabel>Period</DetailLabel>
                  <DetailValue>{selectedStudent.period_months} months</DetailValue>
                </DetailCard>
                <DetailCard>
                  <DetailLabel>Joining Date</DetailLabel>
                  <DetailValue>{new Date(selectedStudent.joiningDate).toLocaleDateString()}</DetailValue>
                </DetailCard>
                <DetailCard>
                  <DetailLabel>Status</DetailLabel>
                  <DetailValue>
                    <Badge primary>Active</Badge>
                  </DetailValue>
                </DetailCard>
              </DetailGrid>

              <ModalActions>
                <PrimaryButton onClick={() => handleEditStudent(selectedStudent)} disabled={loading}>
                  <FiEdit2 size={18} />
                  Edit Student
                </PrimaryButton>
                <SecondaryButton onClick={handleCloseStudentDetails} disabled={loading}>
                  Close
                </SecondaryButton>
              </ModalActions>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Leave Modal */}
      {showLeaveModal && (
        <ModalOverlay onClick={() => setShowLeaveModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <ModalHeader>
              <h3>Leave Reason</h3>
              <CloseButton onClick={() => setShowLeaveModal(false)}>
                <FiX size={24} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Enter reason for leave:</Label>
                <TextArea
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="Enter the reason for leave..."
                  rows="4"
                />
              </FormGroup>
              <ModalActions>
                <PrimaryButton onClick={handleLeaveSubmit}>
                  Submit
                </PrimaryButton>
                <SecondaryButton onClick={() => setShowLeaveModal(false)}>
                  Cancel
                </SecondaryButton>
              </ModalActions>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {notification.show && (
        <Notification type={notification.type}>
          {notification.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          {notification.message}
        </Notification>
      )}
    </DashboardContainer>
  );
};

export default BtcRoutesAdmin;