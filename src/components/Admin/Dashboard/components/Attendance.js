import React from 'react';
import { FiCheckCircle, FiCalendar } from 'react-icons/fi';
import {
    AttendanceSection,
    AttendanceListSection,
    Card,
    CardHeader,
    CardBody,
    Input,
    Label,
    AttendanceTable,
    AttendanceActions,
    AttendanceButton,
    StatusBadge,
    AttendanceSubmit,
    PrimaryButton,
    Spinner,
    StudentInfoCompact,
    PhotoPlaceholder,
    DateSelector,
    EmptyState,
    AttendanceList,
    AttendanceListItem,
    AttendanceDate,
    AttendanceStats,
    Stat
} from './StyledComponents';

// Mark Attendance Component
export const MarkAttendance = ({
    students,
    attendance,
    setAttendance,
    handleAttendanceStatus,
    markAttendance,
    loading
}) => {
    return (
        <AttendanceSection>
            <Card>
                <CardHeader>
                    <h5>
                        <FiCheckCircle size={20} />
                        Mark Attendance - {attendance.date}
                    </h5>
                    <DateSelector>
                        <Label>Select Date:</Label>
                        <Input
                            type="date"
                            value={attendance.date}
                            onChange={(e) => setAttendance(prev => ({ ...prev, date: e.target.value }))}
                        />
                    </DateSelector>
                </CardHeader>
                <CardBody>
                    <AttendanceTable>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Course</th>
                                <th>Batch</th>
                                <th>Mode</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => {
                                const record = attendance.records.find(r => r.studentId === student.id);
                                const status = record ? record.status : '';

                                return (
                                    <tr key={student.id}>
                                        <td>
                                            <StudentInfoCompact>
                                                {student.photo ? (
                                                    <img
                                                        src={`http://localhost:3003/uploads/${student.photo}`}
                                                        alt={student.name}
                                                        style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                                                    />
                                                ) : (
                                                    <PhotoPlaceholder small style={{ width: '30px', height: '30px', marginRight: '10px' }}>
                                                        {student.name?.charAt(0)?.toUpperCase() || 'U'}
                                                    </PhotoPlaceholder>
                                                )}
                                                {student.name}
                                            </StudentInfoCompact>
                                        </td>
                                        <td>{student.course}</td>
                                        <td>{student.batch}</td>
                                        <td>{student.preferred_mode}</td>
                                        <td>
                                            <StatusBadge status={status}>
                                                {status === 'P' && 'Present'}
                                                {status === 'A' && 'Absent'}
                                                {status === 'L' && 'Leave'}
                                                {status === 'H' && 'Half Day'}
                                                {!status && 'Not Marked'}
                                            </StatusBadge>
                                        </td>
                                        <td>
                                            <AttendanceActions>
                                                <AttendanceButton
                                                    active={status === 'P'}
                                                    onClick={() => handleAttendanceStatus(student.id, 'P')}
                                                >
                                                    P
                                                </AttendanceButton>
                                                <AttendanceButton
                                                    active={status === 'A'}
                                                    onClick={() => handleAttendanceStatus(student.id, 'A')}
                                                >
                                                    A
                                                </AttendanceButton>
                                                <AttendanceButton
                                                    active={status === 'L'}
                                                    onClick={() => handleAttendanceStatus(student.id, 'L')}
                                                >
                                                    L
                                                </AttendanceButton>
                                                <AttendanceButton
                                                    active={status === 'H'}
                                                    onClick={() => handleAttendanceStatus(student.id, 'H')}
                                                >
                                                    H
                                                </AttendanceButton>
                                            </AttendanceActions>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </AttendanceTable>

                    {students.length > 0 && (
                        <AttendanceSubmit>
                            <PrimaryButton onClick={markAttendance} disabled={loading || attendance.records.length === 0}>
                                {loading ? <Spinner small /> : <FiCheckCircle size={18} />}
                                {loading ? 'Submitting...' : `Mark Attendance for ${attendance.records.length} Students`}
                            </PrimaryButton>
                        </AttendanceSubmit>
                    )}
                </CardBody>
            </Card>
        </AttendanceSection>
    );
};

// View Attendance Component
export const ViewAttendance = ({
    attendanceList,
    selectedDate,
    setSelectedDate,
    filteredRecords,
    loading
}) => {
    const uniqueDates = [...new Set(attendanceList.map(r => r.date))];

    return (
        <AttendanceListSection>
            <Card>
                <CardHeader>
                    <h5>
                        <FiCalendar size={20} /> Attendance Records
                    </h5>
                </CardHeader>
                <CardBody>
                    {attendanceList.length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="dateSelect" style={{ marginRight: '10px', fontWeight: 'bold' }}>
                                Select Date:
                            </label>
                            <select
                                id="dateSelect"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                style={{
                                    padding: '8px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="">-- Choose a Date --</option>
                                {uniqueDates.map(date => (
                                    <option key={date} value={date}>
                                        {new Date(date).toLocaleDateString()}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {loading ? (
                        <p>Loading attendance records...</p>
                    ) : selectedDate === '' ? (
                        <EmptyState>
                            <FiCalendar size={48} color="#6c757d" />
                            <p>Please select a date to view attendance.</p>
                        </EmptyState>
                    ) : filteredRecords.length === 0 ? (
                        <EmptyState>
                            <FiCalendar size={48} color="#6c757d" />
                            <p>No attendance found for this date.</p>
                        </EmptyState>
                    ) : (
                        <AttendanceList>
                            {filteredRecords.map(record => (
                                <AttendanceListItem key={record.id}>
                                    <AttendanceDate>
                                        <strong>{record.Student.name.toUpperCase()}</strong>
                                    </AttendanceDate>
                                    <AttendanceStats>
                                        <Stat>Course:<strong>{record.Student.course}</strong></Stat>
                                    </AttendanceStats>
                                    <AttendanceStats>
                                        <Stat>Batch:<strong>{record.Student.batch}</strong></Stat>
                                    </AttendanceStats>
                                    <AttendanceStats>
                                        <Stat>Mode: <strong>{record.Student.preferred_mode}</strong></Stat>
                                    </AttendanceStats>
                                    <AttendanceStats>
                                        <Stat>Status: {record.status}</Stat>
                                        {record.reason && <Stat>Reason: {record.reason}</Stat>}
                                    </AttendanceStats>
                                </AttendanceListItem>
                            ))}
                        </AttendanceList>
                    )}
                </CardBody>
            </Card>
        </AttendanceListSection>
    );
};

export default { MarkAttendance, ViewAttendance };
