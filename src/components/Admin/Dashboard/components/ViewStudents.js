import React from 'react';
import { FiUsers, FiSearch, FiUserPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import {
    ListSection,
    Card,
    CardHeader,
    CardBody,
    SearchBox,
    Input,
    EmptyState,
    SecondaryButton,
    Badge,
    ActionButton
} from './StyledComponents';

const ViewStudents = ({
    students,
    searchTerm,
    setSearchTerm,
    handleViewStudent,
    handleEditStudent,
    handleDeleteStudent,
    setActiveSection,
    loading
}) => {
    const filteredStudents = students.filter(student =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ListSection>
            <Card>
                <CardHeader className="flex-header">
                    <h5>
                        <FiUsers size={20} />
                        Student Records
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
                        <div className="table-responsive">
                            <table className="table table-hover table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                        {/* <th>Email</th> */}
                                        <th>Course</th>
                                        <th>Batch</th>
                                        <th>Mode</th>
                                        {/* <th>College</th> */}
                                        <th>Period</th>
                                        <th>Joined</th>
                                        <th>Ending</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map(student => (
                                        <tr key={student.id}>
                                            <td style={{ fontWeight: '600' }}>{student.name}</td>
                                            {/* <td>{student.email}</td> */}
                                            <td><Badge primary>{student.course}</Badge></td>
                                            <td>{student.batch}</td>
                                            <td>
                                                <Badge success={student.preferred_mode === 'online'}>
                                                    {student.preferred_mode}
                                                </Badge>
                                            </td>
                                            {/* <td>{student.college || '-'}</td> */}
                                            <td>{student.period_months} months</td>
                                            <td>{new Date(student.joiningDate).toLocaleDateString()}</td>
                                            <td>{new Date(student.endDate).toLocaleDateString()}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <ActionButton
                                                        onClick={() => handleViewStudent(student)}
                                                        title="View Details"
                                                        disabled={loading}
                                                    >
                                                        <FiEye size={14} />
                                                    </ActionButton>
                                                    <ActionButton
                                                        primary
                                                        onClick={() => handleEditStudent(student)}
                                                        title="Edit Student"
                                                        disabled={loading}
                                                    >
                                                        <FiEdit2 size={14} />
                                                    </ActionButton>
                                                    <ActionButton
                                                        danger
                                                        onClick={() => handleDeleteStudent(student.id)}
                                                        title="Delete Student"
                                                        disabled={loading}
                                                    >
                                                        <FiTrash2 size={14} />
                                                    </ActionButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardBody>
            </Card>
        </ListSection>
    );
};

export default ViewStudents;

