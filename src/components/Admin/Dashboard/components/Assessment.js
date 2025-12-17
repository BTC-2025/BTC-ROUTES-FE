import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiCheckCircle, FiX } from 'react-icons/fi';
import { FaClipboardList } from 'react-icons/fa';
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    FormRow,
    FormGroup,
    Label,
    Input,
    Select,
    FormActions,
    PrimaryButton,
    SecondaryButton,
    Spinner,
    RecordsTable,
    FilterRow,
    FilterSelect,
    Badge,
    EmptyState,
    ActionButton,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalActions,
    CloseButton
} from './StyledComponents';

const Assessment = ({ students, showNotification, loading: parentLoading }) => {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [filterStudent, setFilterStudent] = useState('');

    const [formData, setFormData] = useState({
        testName: '',
        date: new Date().toISOString().split('T')[0],
        type: 'Weekly',
        maxMarks: 100,
        studentMarks: 0,
        result: 'Pass',
        studentId: ''
    });

    const fetchAssessments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:3003/api/assessment/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAssessments(response.data);
        } catch (error) {
            console.error('Error fetching assessments:', error);
            showNotification('Failed to load assessments', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssessments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Auto-calculate result based on marks
        if (name === 'studentMarks' || name === 'maxMarks') {
            const marks = name === 'studentMarks' ? parseInt(value) : formData.studentMarks;
            const max = name === 'maxMarks' ? parseInt(value) : formData.maxMarks;
            const percentage = (marks / max) * 100;
            setFormData(prev => ({
                ...prev,
                result: percentage >= 40 ? 'Pass' : 'Fail'
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            if (isEditing) {
                await axios.put(`http://localhost:3003/api/assessment/update/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                showNotification('Assessment updated successfully!', 'success');
            } else {
                await axios.post('http://localhost:3003/api/assessment/create', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                showNotification('Assessment added successfully!', 'success');
            }
            resetForm();
            fetchAssessments();
        } catch (error) {
            console.error('Error saving assessment:', error);
            showNotification('Failed to save assessment', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (assessment) => {
        setFormData({
            testName: assessment.testName,
            date: assessment.date,
            type: assessment.type,
            maxMarks: assessment.maxMarks,
            studentMarks: assessment.studentMarks,
            result: assessment.result,
            studentId: assessment.studentId
        });
        setIsEditing(true);
        setEditingId(assessment.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this assessment?')) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`http://localhost:3003/api/assessment/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            showNotification('Assessment deleted successfully!', 'success');
            fetchAssessments();
        } catch (error) {
            console.error('Error deleting assessment:', error);
            showNotification('Failed to delete assessment', 'error');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            testName: '',
            date: new Date().toISOString().split('T')[0],
            type: 'Weekly',
            maxMarks: 100,
            studentMarks: 0,
            result: 'Pass',
            studentId: ''
        });
        setIsEditing(false);
        setEditingId(null);
        setShowForm(false);
    };

    const filteredAssessments = filterStudent
        ? assessments.filter(a => a.studentId === parseInt(filterStudent))
        : assessments;

    return (
        <>
            <Card>
                <CardHeader className="flex-header">
                    <h5>
                        <FaClipboardList size={20} />
                        Assessment & Evaluation Records ({filteredAssessments.length})
                    </h5>
                    <PrimaryButton onClick={() => setShowForm(true)} style={{ marginTop: 0 }}>
                        <FiPlus size={18} />
                        Add Assessment
                    </PrimaryButton>
                </CardHeader>
                <CardBody>
                    <FilterRow>
                        <Label style={{ marginBottom: 0 }}>Filter by Student:</Label>
                        <FilterSelect
                            value={filterStudent}
                            onChange={(e) => setFilterStudent(e.target.value)}
                        >
                            <option value="">All Students</option>
                            {students.map(student => (
                                <option key={student.id} value={student.id}>{student.name}</option>
                            ))}
                        </FilterSelect>
                    </FilterRow>

                    {loading ? (
                        <EmptyState>
                            <Spinner />
                            <p>Loading assessments...</p>
                        </EmptyState>
                    ) : filteredAssessments.length === 0 ? (
                        <EmptyState>
                            <FaClipboardList size={48} color="#6c757d" />
                            <p>No assessments found.</p>
                        </EmptyState>
                    ) : (
                        <RecordsTable>
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Test Name</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Max Marks</th>
                                    <th>Obtained</th>
                                    <th>Result</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAssessments.map(assessment => (
                                    <tr key={assessment.id}>
                                        <td>{assessment.Student?.name || 'N/A'}</td>
                                        <td>{assessment.testName}</td>
                                        <td>{new Date(assessment.date).toLocaleDateString()}</td>
                                        <td><Badge primary>{assessment.type}</Badge></td>
                                        <td>{assessment.maxMarks}</td>
                                        <td>{assessment.studentMarks}</td>
                                        <td>
                                            <Badge success={assessment.result === 'Pass'} danger={assessment.result === 'Fail'}>
                                                {assessment.result}
                                            </Badge>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <ActionButton primary onClick={() => handleEdit(assessment)}>
                                                    <FiEdit2 size={14} />
                                                </ActionButton>
                                                <ActionButton danger onClick={() => handleDelete(assessment.id)}>
                                                    <FiTrash2 size={14} />
                                                </ActionButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </RecordsTable>
                    )}
                </CardBody>
            </Card>

            {showForm && (
                <ModalOverlay onClick={() => resetForm()}>
                    <ModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <ModalHeader>
                            <h3>{isEditing ? 'Edit Assessment' : 'Add New Assessment'}</h3>
                            <CloseButton onClick={resetForm}>
                                <FiX size={24} />
                            </CloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label>Student *</Label>
                                    <Select
                                        name="studentId"
                                        value={formData.studentId}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                    >
                                        <option value="">Select Student</option>
                                        {students.map(student => (
                                            <option key={student.id} value={student.id}>{student.name}</option>
                                        ))}
                                    </Select>
                                </FormGroup>

                                <FormRow>
                                    <FormGroup>
                                        <Label>Test Name *</Label>
                                        <Input
                                            type="text"
                                            name="testName"
                                            value={formData.testName}
                                            onChange={handleInputChange}
                                            placeholder="e.g., HTML & CSS Test"
                                            required
                                            disabled={loading}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Date *</Label>
                                        <Input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
                                        />
                                    </FormGroup>
                                </FormRow>

                                <FormRow>
                                    <FormGroup>
                                        <Label>Type *</Label>
                                        <Select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
                                        >
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Final">Final</option>
                                        </Select>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Max Marks *</Label>
                                        <Input
                                            type="number"
                                            name="maxMarks"
                                            value={formData.maxMarks}
                                            onChange={handleInputChange}
                                            min="1"
                                            required
                                            disabled={loading}
                                        />
                                    </FormGroup>
                                </FormRow>

                                <FormRow>
                                    <FormGroup>
                                        <Label>Student Marks *</Label>
                                        <Input
                                            type="number"
                                            name="studentMarks"
                                            value={formData.studentMarks}
                                            onChange={handleInputChange}
                                            min="0"
                                            max={formData.maxMarks}
                                            required
                                            disabled={loading}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Result</Label>
                                        <Select
                                            name="result"
                                            value={formData.result}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                        >
                                            <option value="Pass">Pass</option>
                                            <option value="Fail">Fail</option>
                                        </Select>
                                    </FormGroup>
                                </FormRow>

                                <ModalActions>
                                    <PrimaryButton type="submit" disabled={loading}>
                                        {loading ? <Spinner small /> : <FiCheckCircle size={18} />}
                                        {loading ? 'Saving...' : isEditing ? 'Update' : 'Add Assessment'}
                                    </PrimaryButton>
                                    <SecondaryButton type="button" onClick={resetForm} disabled={loading}>
                                        Cancel
                                    </SecondaryButton>
                                </ModalActions>
                            </Form>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
};

export default Assessment;
