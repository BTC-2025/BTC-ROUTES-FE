import React from 'react';
import { FiUsers, FiBook } from 'react-icons/fi';
import { FaLaptop, FaBuilding, FaClipboardList, FaProjectDiagram } from 'react-icons/fa';
import {
    DashboardSection,
    StatsGrid,
    StatCard,
    StatIcon,
    StatInfo
} from './StyledComponents';

const Dashboard = ({ students, assessments = [], assignments = [] }) => {
    return (
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
                <StatCard>
                    <StatIcon className="assessments">
                        <FaClipboardList size={24} />
                    </StatIcon>
                    <StatInfo>
                        <h3>{assessments.length}</h3>
                        <p>Assessments</p>
                    </StatInfo>
                </StatCard>
                <StatCard>
                    <StatIcon className="assignments">
                        <FaProjectDiagram size={24} />
                    </StatIcon>
                    <StatInfo>
                        <h3>{assignments.length}</h3>
                        <p>Assignments</p>
                    </StatInfo>
                </StatCard>
            </StatsGrid>
        </DashboardSection>
    );
};

export default Dashboard;
