import React, { useMemo, useState } from 'react';
import { FiUsers, FiBook, FiCalendar } from 'react-icons/fi';
import { FaLaptop, FaBuilding, FaClipboardList, FaProjectDiagram } from 'react-icons/fa';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts';
import {
    DashboardSection,
    StatsGrid,
    StatCard,
    StatIcon,
    StatInfo,
    Card,
    CardHeader,
    CardBody
} from './StyledComponents';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#43e97b', '#fa709a'];

const MONTHS = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' }
];

const Dashboard = ({ students, assessments = [], assignments = [] }) => {
    // State for selected month filter (default to current month)
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    // Get month name for display
    const selectedMonthName = MONTHS.find(m => m.value === selectedMonth)?.label || 'Unknown';

    // Filter students who joined in selected month
    const filteredData = useMemo(() => {
        const filteredStudents = students.filter(student => {
            if (!student.joiningDate) return false;
            const joinDate = new Date(student.joiningDate);
            return joinDate.getMonth() === selectedMonth;
        });

        // Group by course
        const courseCount = filteredStudents.reduce((acc, student) => {
            const course = student.course || 'Unknown';
            acc[course] = (acc[course] || 0) + 1;
            return acc;
        }, {});

        // Convert to chart data format
        return Object.entries(courseCount).map(([course, count]) => ({
            course,
            students: count
        }));
    }, [students, selectedMonth]);

    // Get list of filtered students for display
    const filteredStudents = useMemo(() => {
        return students.filter(student => {
            if (!student.joiningDate) return false;
            const joinDate = new Date(student.joiningDate);
            return joinDate.getMonth() === selectedMonth;
        });
    }, [students, selectedMonth]);

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

            {/* Monthly Students Chart */}
            <Card style={{ }}>
                <CardHeader className="flex-header">
                    <h5>
                        <FiCalendar size={20} />
                        Students Joined in {selectedMonthName} ({filteredStudents.length})
                    </h5>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ margin: 0, fontWeight: 500 }}>Select Month:</label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                background: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            {MONTHS.map(month => (
                                <option key={month.value} value={month.value} style={{ color: '#333' }}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </CardHeader>
                <CardBody>
                    {filteredData.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
                            <FiUsers size={48} />
                            <p style={{ marginTop: '1rem' }}>No students joined in {selectedMonthName}</p>
                        </div>
                    ) : (
                        <>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart
                                        data={filteredData}
                                        margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                                        <XAxis
                                            dataKey="course"
                                            tick={{ fill: '#495057', fontSize: 12 }}
                                            axisLine={{ stroke: '#e9ecef' }}
                                        />
                                        <YAxis
                                            tick={{ fill: '#495057', fontSize: 12 }}
                                            axisLine={{ stroke: '#e9ecef' }}
                                            allowDecimals={false}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                background: 'white',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                        <Legend />
                                        <Bar
                                            dataKey="students"
                                            name="Students"
                                            radius={[8, 8, 0, 0]}
                                        >
                                            {filteredData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Monthly Students List */}
                            <div style={{ marginTop: '1.5rem' }}>
                                <h6 style={{ color: '#2c3e50', marginBottom: '1rem', fontWeight: 600 }}>
                                    {selectedMonthName} Joiners List
                                </h6>
                                <div className="table-responsive">
                                    <table className="table table-sm table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Name</th>
                                                <th>Course</th>
                                                <th>Joining Date</th>
                                                <th>Mode</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStudents.map(student => (
                                                <tr key={student.id}>
                                                    <td>{student.name}</td>
                                                    <td>{student.course}</td>
                                                    <td>{new Date(student.joiningDate).toLocaleDateString()}</td>
                                                    <td>
                                                        <span className={`badge ${student.preferred_mode === 'online' ? 'bg-success' : 'bg-primary'}`}>
                                                            {student.preferred_mode}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </CardBody>
            </Card>
        </DashboardSection>
    );
};

export default Dashboard;


