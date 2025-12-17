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
    StudentGrid,
    StudentCard,
    StudentCardHeader,
    StudentPhoto,
    PhotoPlaceholder,
    StudentInfo,
    StudentName,
    StudentEmail,
    StudentDetails,
    DetailItem,
    Badge,
    CardActions,
    ActionButton,
    ViewButton
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
                                        {student.college && (
                                            <DetailItem>
                                                <strong>College:</strong> {student.college}
                                            </DetailItem>
                                        )}
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
    );
};

export default ViewStudents;
