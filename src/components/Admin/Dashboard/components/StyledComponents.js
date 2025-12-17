import styled, { keyframes } from 'styled-components';

// Animations
export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Spinner & Loading
export const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid ${props => props.small ? '#667eea' : '#ffffff'};
  border-radius: 50%;
  width: ${props => props.small ? '16px' : '40px'};
  height: ${props => props.small ? '16px' : '40px'};
  animation: ${spin} 1s linear infinite;
`;

export const LoadingOverlay = styled.div`
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

// Notification
export const Notification = styled.div`
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

// Login Components
export const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #011096 0%, #0B47B0 50%, #6EA8FE 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`;

export const LoginCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  animation: ${slideIn} 0.5s ease-out;
`;

export const LoginHeader = styled.div`
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

export const LoginNote = styled.div`
  text-align: center;
  color: #888;
  margin-top: 1.5rem;
  font-size: 0.9rem;
`;

// Dashboard Layout
export const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
`;

export const Sidebar = styled.div`
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

export const SidebarHeader = styled.div`
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

export const SidebarToggle = styled.button`
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

export const SidebarNav = styled.ul`
  list-style: none;
  padding: 1rem 0;
  margin: 0;
  
  li {
    margin: 0.5rem 0;
  }
`;

export const NavLink = styled.button`
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

export const LogoutButton = styled(NavLink)`
  color: #e74c3c !important;
  margin-top: 2rem !important;
  
  &:hover {
    background-color: #c0392b !important;
    color: white !important;
    border-left-color: #e74c3c !important;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  margin-left: ${props => props.sidebarCollapsed ? '80px' : '280px'};
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const ContentHeader = styled.div`
  background: white;
  padding: 1.25rem 2.5rem;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
`;

export const MobileHeader = styled.div`
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

export const MobileMenuToggle = styled.button`
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

export const ContentBody = styled.div`
  padding: 2.5rem;
  position: relative;
`;

// Dashboard Stats
export const DashboardSection = styled.div`
  margin-bottom: 2rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

export const StatCard = styled.div`
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

export const StatIcon = styled.div`
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

  &.assessments {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  }

  &.assignments {
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  }
`;

export const StatInfo = styled.div`
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

// Form Components
export const FormSection = styled.div``;
export const ListSection = styled.div``;

export const Card = styled.div`
  border: none;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  background: white;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`;

export const CardHeader = styled.div`
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

export const CardBody = styled.div`
  padding: 2rem;
`;

export const Form = styled.form``;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 1rem;
`;

export const Input = styled.input`
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

export const Select = styled.select`
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

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  }
`;

export const FileInfo = styled.small`
  color: #6c757d;
  margin-top: 0.75rem;
  display: block;
  font-style: italic;
`;

export const FormActions = styled.div`
  padding-top: 2rem;
  border-top: 2px solid #f8f9fa;
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
`;

// Buttons
export const ButtonBase = styled.button`
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

export const PrimaryButton = styled(ButtonBase)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  margin-top: 10px;
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

export const SecondaryButton = styled(ButtonBase)`
  background: #6c757d;
  color: white;
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
  
  &:hover:not(:disabled) {
    background: #5a6268;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
  }
`;

export const SearchBox = styled.div`
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

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
  
  p {
    margin-top: 1.5rem;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

// Student Card Components
export const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StudentCard = styled.div`
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

export const StudentCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const StudentPhoto = styled.div`
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

export const PhotoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 50%;
  font-size: ${props => props.large ? '2.5rem' : props.small ? '1rem' : '1.5rem'};
`;

export const StudentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StudentName = styled.h4`
  margin: 0;
  color: #2c3e50;
  font-weight: 700;
  font-size: ${props => props.large ? '1.8rem' : '1.25rem'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StudentEmail = styled.p`
  margin: 0.5rem 0 0 0;
  color: #6c757d;
  font-size: ${props => props.large ? '1.1rem' : '0.9rem'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StudentId = styled.p`
  margin: 0.25rem 0 0 0;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const StudentDetails = styled.div`
  margin-bottom: 1.5rem;
`;

export const DetailItem = styled.div`
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

export const CardActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`;

export const ActionButtonBase = styled.button`
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

export const ActionButton = styled(ActionButtonBase)`
  background: ${props => props.danger ? '#dc3545' : props.primary ? '#007bff' : '#6c757d'};
  color: white;
  
  &:hover:not(:disabled) {
    background: ${props => props.danger ? '#c82333' : props.primary ? '#0056b3' : '#545b62'};
  }
`;

export const ViewButton = styled(ActionButtonBase)`
  background: #17a2b8;
  color: white;
  
  &:hover:not(:disabled) {
    background: #138496;
  }
`;

// Badge
export const Badge = styled.span`
  background: ${props => props.success ? '#28a745' : props.primary ? '#007bff' : props.warning ? '#ffc107' : props.danger ? '#dc3545' : '#6c757d'};
  color: ${props => props.warning ? '#212529' : 'white'};
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// Modal Components
export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  animation: ${slideIn} 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ModalHeader = styled.div`
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

export const CloseButton = styled.button`
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

export const ModalBody = styled.div`
  padding: 2rem;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 2px solid #f8f9fa;
`;

// Student Detail Modal
export const StudentDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f8f9fa;
`;

export const StudentDetailInfo = styled.div`
  flex: 1;
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

export const DetailCard = styled.div`
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

export const DetailLabel = styled.div`
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailValue = styled.div`
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 700;
`;

// Attendance Components
export const AttendanceSection = styled.div`
  padding: 20px 0;
`;

export const AttendanceListSection = styled.div`
  padding: 20px 0;
`;

export const AttendanceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #495057;
  }

  tr:hover {
    background-color: #f8f9fa;
  }
`;

export const AttendanceActions = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

export const AttendanceButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #ddd;
  background-color: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#495057'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#f8f9fa'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
        switch (props.status) {
            case 'P': return '#d4edda';
            case 'A': return '#f8d7da';
            case 'L': return '#fff3cd';
            case 'H': return '#d1ecf1';
            default: return '#e9ecef';
        }
    }};
  color: ${props => {
        switch (props.status) {
            case 'P': return '#155724';
            case 'A': return '#721c24';
            case 'L': return '#856404';
            case 'H': return '#0c5460';
            default: return '#495057';
        }
    }};
`;

export const AttendanceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AttendanceListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  gap: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
    border-color: #007bff;
  }
`;

export const AttendanceDate = styled.div`
  flex: 1;
`;

export const AttendanceStats = styled.div`
  display: flex;
  gap: 15px;
  flex: 2;
`;

export const Stat = styled.span`
  font-size: 14px;
  color: #6c757d;
`;

export const AttendanceDetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
`;

export const StudentInfoCompact = styled.div`
  display: flex;
  align-items: center;
`;

export const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AttendanceSubmit = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
`;

// Table for Records
export const RecordsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e9ecef;
  }

  th {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    font-weight: 700;
    color: #2c3e50;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
  }

  tr:hover {
    background-color: #f8f9fa;
  }

  td {
    color: #495057;
  }
`;

// Filter Controls
export const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;
