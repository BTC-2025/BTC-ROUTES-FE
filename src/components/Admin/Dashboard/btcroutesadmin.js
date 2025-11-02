import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../../assests/logo2.png'
import styled, { keyframes } from 'styled-components';
import { 
  FiEdit2, 
  FiTrash2, 
  FiUsers, 
  FiUserPlus, 
  FiActivity, 
  FiLogOut,
  FiHome,
  FiBook,
  FiSearch,
  FiEye,
  FiMenu,
  FiX,
  FiChevronRight,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';
import { 
  FaChalkboardTeacher,
  FaGraduationCap,
  FaLaptop,
  FaBuilding
} from 'react-icons/fa';

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
    photo: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      fetchStudents();
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

      const response = await axios.post('http://localhost:3003/api/student/add-student', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });

    //   setStudents(prev => [...prev, response.data]);

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
      photo: student.photo
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

      const response = await axios.put(`http://localhost:3003/api/student/update/${editingId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });

      setStudents(prev => prev.map(student => 
        student.id === editingId ? response.data : student
      ));
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
    //   setStudents(prev => prev.filter(student => student.id !== id));
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
      photo: null
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
      // If API fails, use local data
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

  // Filter students based on search
  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                onChange={(e) => setLoginData(prev => ({...prev, email: e.target.value}))}
                required
                disabled={loading}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({...prev, password: e.target.value}))}
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
        
        {/* Notification */}
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
      {/* Sidebar */}
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

      {/* Main Content */}
      <MainContent sidebarCollapsed={isSidebarCollapsed}>
        {/* <ContentHeader>
          <MobileHeader>
            <MobileMenuToggle onClick={toggleSidebar}>
              <FiMenu size={24} />
            </MobileMenuToggle>
            <h4>
              {activeSection === 'dashboard' && 'Dashboard'}
              {activeSection === 'addStudent' && (isEditing ? 'Edit Student' : 'Add New Student')}
              {activeSection === 'viewStudents' && `Student List (${filteredStudents.length})`}
            </h4>
          </MobileHeader>
        </ContentHeader> */}

        <ContentHeader>
  <MobileHeader>
    <MobileMenuToggle onClick={toggleSidebar}>
      <FiMenu size={24} />
    </MobileMenuToggle>

    {/* Header content with logo */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between',gap: '10px' }}>
      {/* Logo */}
      <img
        src={logo} // ✅ adjust path as needed
        alt="Logo"
        style={{ width: '100px', height: '40px', objectFit: 'contain' }}
      />

      {/* Dynamic title */}
      <h4 style={{ margin: 0 }}>
        {activeSection === 'dashboard' && 'Dashboard'}
        {activeSection === 'addStudent' && (isEditing ? 'Edit Student' : 'Add New Student')}
        {activeSection === 'attendance' && 'Attendance'}
        {activeSection === 'reports' && 'Reports'}
        {activeSection === 'settings' && 'Settings'}

        {/* Student List title moved last */}
        {activeSection === 'viewStudents' && `Student List (${filteredStudents.length})`}
      </h4>
    </div>
  </MobileHeader>
</ContentHeader>


        <ContentBody>
          {/* Loading Spinner */}
          {loading && (
            <LoadingOverlay>
              <Spinner />
              <p>Loading...</p>
            </LoadingOverlay>
          )}

          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <DashboardSection>
              <StatsGrid>
                <StatCard>
                  <StatIcon className="students">
                    <FiUsers size={24} />
                  </StatIcon>
                  <StatInfo>
                    <h3>{students.length}</h3>
                    <p>Total Students</p>
                  </StatInfo>
                </StatCard>
                <StatCard>
                  <StatIcon className="courses">
                    <FiBook size={24} />
                  </StatIcon>
                  <StatInfo>
                    <h3>{new Set(students.map(s => s.course)).size}</h3>
                    <p>Courses</p>
                  </StatInfo>
                </StatCard>
                <StatCard>
                  <StatIcon className="online">
                    <FaLaptop size={24} />
                  </StatIcon>
                  <StatInfo>
                    <h3>{students.filter(s => s.preferred_mode === 'online').length}</h3>
                    <p>Online Students</p>
                  </StatInfo>
                </StatCard>
                <StatCard>
                  <StatIcon className="offline">
                    <FaBuilding size={24} />
                  </StatIcon>
                  <StatInfo>
                    <h3>{students.filter(s => s.preferred_mode === 'offline').length}</h3>
                    <p>Offline Students</p>
                  </StatInfo>
                </StatCard>
              </StatsGrid>
{/* 
              <RecentActivity>
                <Card>
                  <CardHeader>
                    <h5>Recent Activity</h5>
                  </CardHeader>
                  <CardBody>
                    <ActivityList>
                      <ActivityItem>
                        <ActivityIcon>
                          <FiUsers />
                        </ActivityIcon>
                        <ActivityContent>
                          <p><strong>Total Students:</strong> {students.length} registered</p>
                          <small>Last updated: {new Date().toLocaleDateString()}</small>
                        </ActivityContent>
                      </ActivityItem>
                      <ActivityItem>
                        <ActivityIcon>
                          <FiUserPlus />
                        </ActivityIcon>
                        <ActivityContent>
                          <p><strong>System Status:</strong> All services operational</p>
                          <small>Monitoring active</small>
                        </ActivityContent>
                      </ActivityItem>
                    </ActivityList>
                  </CardBody>
                </Card>
              </RecentActivity> */}
            </DashboardSection>
          )}

          {/* Add/Edit Student Section */}
          {activeSection === 'addStudent' && (
            <FormSection>
              <Card>
                <CardHeader>
                  <h5>
                    {isEditing ? (
                      <>
                        <FiEdit2 size={20} />
                        Edit Student Details
                      </>
                    ) : (
                      <>
                        <FiUserPlus size={20} />
                        Add New Student
                      </>
                    )}
                  </h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={isEditing ? handleUpdateStudent : handleAddStudent}>
                    <FormRow>
                      <FormGroup>
                        <Label>Full Name *</Label>
                        <Input
                          type="text"
                          name="name"
                          value={studentForm.name}
                          onChange={handleStudentInputChange}
                          required
                          disabled={loading}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          name="email"
                          value={studentForm.email}
                          onChange={handleStudentInputChange}
                          required
                          disabled={loading}
                        />
                      </FormGroup>
                    </FormRow>

                    <FormRow>
                      <FormGroup>
                        <Label>Course *</Label>
                        <Select
                          name="course"
                          value={studentForm.course}
                          onChange={handleStudentInputChange}
                          required
                          disabled={loading}
                        >
                          <option value="">Select Course</option>
                          <option value="frontend-development">Frontend Development</option>
                          <option value="backend-development">Backend Development</option>
                          <option value="full-stack">Full Stack Development</option>
                          <option value="mobile app-development">App Development</option>
                          <option value="data-science">Data Science</option>
                          <option value="cyber-security">Cyber Security</option>
                          <option value="ai-ml">AI & Machine Learning</option>
                        </Select>
                      </FormGroup>
                      <FormGroup>
                        <Label>Batch *</Label>
                        <Select
                          name="batch"
                          value={studentForm.batch}
                          onChange={handleStudentInputChange}
                          required
                          disabled={loading}
                        >
                          <option value="">Select Batch</option>
                          <option value="1st batch">1st Batch</option>
                          <option value="2nd batch">2nd Batch</option>
                          <option value="3rd batch">3rd Batch</option>
                          <option value="4th batch">4th Batch</option>
                        </Select>
                      </FormGroup>
                    </FormRow>

                    <FormRow>
                      <FormGroup>
                        <Label>Preferred Mode *</Label>
                        <Select
                          name="preferred_mode"
                          value={studentForm.preferred_mode}
                          onChange={handleStudentInputChange}
                          required
                          disabled={loading}
                        >
                          <option value="offline">Offline</option>
                          <option value="online">Online</option>
                        </Select>
                      </FormGroup>
                      <FormGroup>
                        <Label>Period (Months) *</Label>
                        <Input
                          type="number"
                          name="period_months"
                          value={studentForm.period_months}
                          onChange={handleStudentInputChange}
                          min="1"
                          max="24"
                          required
                          disabled={loading}
                        />
                      </FormGroup>
                    </FormRow>

                    <FormRow>
                      <FormGroup>
                        <Label>Joining Date *</Label>
                        <Input
                          type="date"
                          name="joiningDate"
                          value={studentForm.joiningDate}
                          onChange={handleStudentInputChange}
                          required
                          disabled={loading}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Student Photo</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          disabled={loading}
                        />
                        {studentForm.photo && (
                          <FileInfo>
                            Selected: {studentForm.photo instanceof File ? studentForm.photo.name : studentForm.photo}
                          </FileInfo>
                        )}
                      </FormGroup>
                    </FormRow>

                    <FormActions>
                      <PrimaryButton type="submit" disabled={loading}>
                        {loading ? <Spinner small /> : isEditing ? <FiEdit2 size={18} /> : <FiUserPlus size={18} />}
                        {loading ? 'Processing...' : isEditing ? 'Update Student' : 'Add Student'}
                      </PrimaryButton>
                      {isEditing && (
                        <SecondaryButton type="button" onClick={handleCancelEdit} disabled={loading}>
                          Cancel
                        </SecondaryButton>
                      )}
                    </FormActions>
                  </Form>
                </CardBody>
              </Card>
            </FormSection>
          )}

          {/* View Students Section */}
          {activeSection === 'viewStudents' && (
            <ListSection>
              <Card>
                <CardHeader className="flex-header">
                  <h5>
                    <FiUsers size={20} />
                    Student Records ({filteredStudents.length})
                  </h5>
                  <SearchBox>
                    <FiSearch size={18} className="search-icon" />
                    <Input
                      type="text"
                      placeholder="Search students by name, email, or course..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      disabled={loading}
                    />
                  </SearchBox>
                </CardHeader>
                <CardBody>
                  {filteredStudents.length === 0 ? (
                    <EmptyState>
                      <FiUsers size={48} color="#6c757d" />
                      <p>{searchTerm ? 'No students found matching your search.' : 'No students available.'}</p>
                      {!searchTerm && (
                        <SecondaryButton onClick={() => setActiveSection('addStudent')}>
                          <FiUserPlus size={16} />
                          Add First Student
                        </SecondaryButton>
                      )}
                    </EmptyState>
                  ) : (
                    <StudentGrid>
                      {filteredStudents.map(student => (
                        <StudentCard key={student.id} onClick={() => handleViewStudent(student)}>
                          <StudentCardHeader>
                            <StudentPhoto>
                              {student.photo ? (
                                <img 
                                  src={`http://localhost:3003/uploads/${student.photo}`} 
                                  alt={student.name}
                                //   onError={(e) => {
                                //     e.target.src = 'https://via.placeholder.com/60x60/007bff/ffffff?text=U';
                                //   }}
                                />
                              ) : (
                                <PhotoPlaceholder>
                                  {student.name?.charAt(0)?.toUpperCase() || 'U'}
                                </PhotoPlaceholder>
                              )}
                            </StudentPhoto>
                            <StudentInfo>
                              <StudentName>{student.name}</StudentName>
                              <StudentEmail>{student.email}</StudentEmail>
                            </StudentInfo>
                          </StudentCardHeader>
                          
                          <StudentDetails>
                            <DetailItem>
                              <strong>Course:</strong> 
                              <Badge primary>{student.course}</Badge>
                            </DetailItem>
                            <DetailItem>
                              <strong>Batch:</strong> {student.batch}
                            </DetailItem>
                            <DetailItem>
                              <strong>Mode:</strong> 
                              <Badge success={student.preferred_mode === 'online'}>
                                {student.preferred_mode}
                              </Badge>
                            </DetailItem>
                            <DetailItem>
                              <strong>Period:</strong> {student.period_months} months
                            </DetailItem>
                            <DetailItem>
                              <strong>Joined:</strong> {new Date(student.joiningDate).toLocaleDateString()}
                            </DetailItem>
                            <DetailItem>
                              <strong>Ending:</strong>{new Date(student.endDate).toLocaleDateString()}
                            </DetailItem>
                          </StudentDetails>

                          <CardActions>
                            <ActionButton 
                              primary 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditStudent(student);
                              }}
                              title="Edit Student"
                              disabled={loading}
                            >
                              <FiEdit2 size={14} />
                            </ActionButton>
                            <ActionButton 
                              danger 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteStudent(student.id);
                              }}
                              title="Delete Student"
                              disabled={loading}
                            >
                              <FiTrash2 size={14} />
                            </ActionButton>
                            <ViewButton 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewStudent(student);
                              }}
                              title="View Details"
                              disabled={loading}
                            >
                              <FiEye size={14} />
                            </ViewButton>
                          </CardActions>
                        </StudentCard>
                      ))}
                    </StudentGrid>
                  )}
                </CardBody>
              </Card>
            </ListSection>
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

      {/* Notification */}
      {notification.show && (
        <Notification type={notification.type}>
          {notification.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          {notification.message}
        </Notification>
      )}
    </DashboardContainer>
  );
};

// ... (Keep all the styled components exactly the same as in the previous response)
// The styled components remain unchanged, only the API calls are updated
// Styled Components
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid ${props => props.small ? '#667eea' : '#ffffff'};
  border-radius: 50%;
  width: ${props => props.small ? '16px' : '40px'};
  height: ${props => props.small ? '16px' : '40px'};
  animation: ${spin} 1s linear infinite;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  
  p {
    margin-top: 1rem;
    color: #667eea;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${props => props.type === 'success' ? '#28a745' : '#dc3545'};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 10000;
  animation: ${slideIn} 0.3s ease-out;
  
  svg {
    flex-shrink: 0;
  }
`;

const LoginContainer = styled.div`
  min-height: 100vh;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 background: linear-gradient(135deg, #011096 0%, #0B47B0 50%, #6EA8FE 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`;

const LoginCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  animation: ${slideIn} 0.5s ease-out;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  
  h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    margin-top: 1.5rem;
    font-size: 1.8rem;
    font-weight: 700;
  }
  
  p {
    color: #6c757d;
    margin: 0;
    font-size: 1.1rem;
  }
`;

const LoginNote = styled.div`
  text-align: center;
  color: #888;
  margin-top: 1.5rem;
  font-size: 0.9rem;
`;

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
`;

const Sidebar = styled.div`
  width: ${props => props.collapsed ? '80px' : '280px'};
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
  color: white;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;

  @media (max-width: 768px) {
    width: ${props => props.collapsed ? '0' : '280px'};
    transform: ${props => props.collapsed ? 'translateX(-100%)' : 'translateX(0)'};
  }
`;

const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #4a6278;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  
  h3 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
`;

const SidebarToggle = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 1rem 0;
  margin: 0;
  
  li {
    margin: 0.5rem 0;
  }
`;

const NavLink = styled.button`
  width: calc(100% - 1rem);
  text-align: left;
  background: none;
  border: none;
  color: ${props => props.active ? 'white' : '#bdc3c7'};
  padding: 1.25rem ${props => props.collapsed ? '1rem' : '1.5rem'};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${props => props.collapsed ? '0' : '1rem'};
  justify-content: ${props => props.collapsed ? 'center' : 'flex-start'};
  transition: all 0.3s ease;
  border-left: 4px solid ${props => props.active ? '#3498db' : 'transparent'};
  background-color: ${props => props.active ? 'rgba(52, 73, 94, 0.8)' : 'transparent'};
  cursor: pointer;
  position: relative;
  margin: 0 0.5rem;
  border-radius: 0 12px 12px 0;
  
  &:hover {
    background-color: rgba(52, 73, 94, 0.6);
    color: white;
    border-left-color: #3498db;
    transform: translateX(4px);
  }
  
  svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  ${props => props.collapsed && `
    &:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      background: #2c3e50;
      color: white;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      white-space: nowrap;
      font-size: 0.9rem;
      margin-left: 0.75rem;
      z-index: 1001;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `}
`;

const LogoutButton = styled(NavLink)`
  color: #e74c3c !important;
  margin-top: 2rem !important;
  
  &:hover {
    background-color: #c0392b !important;
    color: white !important;
    border-left-color: #e74c3c !important;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: ${props => props.sidebarCollapsed ? '80px' : '280px'};
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentHeader = styled.div`
  background: white;
  padding: 1.25rem 2.5rem;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
`;

const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  h4 {
    margin: 0;
    color: #2c3e50;
    font-weight: 700;
    font-size: 1.4rem;
  }
`;

const MobileMenuToggle = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 12px;
  display: none;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const ContentBody = styled.div`
  padding: 2.5rem;
  position: relative;
`;

const DashboardSection = styled.div`
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    animation: ${pulse} 2s infinite;
  }
`;

const StatIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  
  &.students {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  &.courses {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  &.online {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
  
  &.offline {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  }
`;

const StatInfo = styled.div`
  h3 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 800;
    color: #2c3e50;
    line-height: 1;
  }
  
  p {
    margin: 0.5rem 0 0 0;
    color: #7f8c8d;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const RecentActivity = styled.div`
  max-width: 800px;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #667eea;
`;

const ActivityIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
  
  p {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
    font-size: 1rem;
  }
  
  small {
    color: #6c757d;
    font-size: 0.875rem;
  }
`;

const FormSection = styled.div``;

const ListSection = styled.div``;

const Card = styled.div`
  border: none;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  background: white;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px 20px 0 0;
  padding: 1.75rem 2rem;
  
  h5 {
    margin: 0;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.3rem;
  }
  
  &.flex-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1.5rem;
    }
  }
`;

const CardBody = styled.div`
  padding: 2rem;
`;

const Form = styled.form``;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 1rem;
`;

const Input = styled.input`
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  transition: all 0.3s ease;
  font-size: 1rem;
  background: white;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    outline: none;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Select = styled.select`
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  transition: all 0.3s ease;
  font-size: 1rem;
  background: white;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    outline: none;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const FileInfo = styled.small`
  color: #6c757d;
  margin-top: 0.75rem;
  display: block;
  font-style: italic;
`;

const FormActions = styled.div`
  padding-top: 2rem;
  border-top: 2px solid #f8f9fa;
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
`;

const ButtonBase = styled.button`
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
  font-size: 1rem;
  letter-spacing: 0.5px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  margin-top:10px;
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background: #6c757d;
  color: white;
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
  
  &:hover:not(:disabled) {
    background: #5a6268;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
  }
`;

const SearchBox = styled.div`
  position: relative;
  width: 350px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
  
  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
    z-index: 1;
  }
  
  input {
    padding-left: 3rem;
    width: 100%;
    border-radius: 50px;
    border: 2px solid #e9ecef;
    
    &:focus {
      border-color: #667eea;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
  
  p {
    margin-top: 1.5rem;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StudentCard = styled.div`
  background: white;
  border: 2px solid #f8f9fa;
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
`;

const StudentCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const StudentPhoto = styled.div`
  width: ${props => props.large ? '120px' : '70px'};
  height: ${props => props.large ? '120px' : '70px'};
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 4px solid #f8f9fa;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PhotoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 50%;
  font-size: ${props => props.large ? '2.5rem' : '1.5rem'};
`;

const StudentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const StudentName = styled.h4`
  margin: 0;
  color: #2c3e50;
  font-weight: 700;
  font-size: ${props => props.large ? '1.8rem' : '1.25rem'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StudentEmail = styled.p`
  margin: 0.5rem 0 0 0;
  color: #6c757d;
  font-size: ${props => props.large ? '1.1rem' : '0.9rem'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StudentId = styled.p`
  margin: 0.25rem 0 0 0;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
`;

const StudentDetails = styled.div`
  margin-bottom: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f8f9fa;
  
  &:last-child {
    border-bottom: none;
  }
  
  strong {
    color: #2c3e50;
    font-weight: 600;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`;

const ActionButtonBase = styled.button`
  border: none;
  border-radius: 10px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ActionButton = styled(ActionButtonBase)`
  background: ${props => props.danger ? '#dc3545' : props.primary ? '#007bff' : '#6c757d'};
  color: white;
  
  &:hover:not(:disabled) {
    background: ${props => props.danger ? '#c82333' : props.primary ? '#0056b3' : '#545b62'};
  }
`;

const ViewButton = styled(ActionButtonBase)`
  background: #17a2b8;
  color: white;
  
  &:hover:not(:disabled) {
    background: #138496;
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
  backdrop-filter: blur(8px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  animation: ${slideIn} 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1.5rem 2rem;
  border-bottom: 2px solid #f8f9fa;
  
  h3 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const CloseButton = styled.button`
  background: #f8f9fa;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e9ecef;
    color: #2c3e50;
    transform: scale(1.1);
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const StudentDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f8f9fa;
`;

const StudentDetailInfo = styled.div`
  flex: 1;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const DetailCard = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 1.5rem;
  border-radius: 16px;
  border-left: 6px solid #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const DetailLabel = styled.div`
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.div`
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 700;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 2px solid #f8f9fa;
`;

const Badge = styled.span`
  background: ${props => props.success ? '#28a745' : props.primary ? '#007bff' : '#6c757d'};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export default BtcRoutesAdmin;