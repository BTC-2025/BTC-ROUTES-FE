import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiCheckCircle, FiX, FiExternalLink } from 'react-icons/fi';
import { FaProjectDiagram } from 'react-icons/fa';
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
    TextArea,
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

const Assignment = ({ students, showNotification, loading: parentLoading }) => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [filterStudent, setFilterStudent] = useState('');
    const [filterTopic, setFilterTopic] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        topic: '',
        submissionDate: '',
        githubLink: '',
        driveLink: '',
        marks: '',
        status: 'Pending',
        trainerFeedback: '',
        studentId: ''
    });

    const topics = ['Frontend', 'Backend', 'Full Stack', 'AI/ML', 'Flutter', 'Data Science', 'DevOps'];

    const fetchAssignments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:3003/api/assignment/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAssignments(response.data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
            showNotification('Failed to load assignments', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const payload = {
                ...formData,
                marks: formData.marks ? parseInt(formData.marks) : null
            };

            if (isEditing) {
                await axios.put(`http://localhost:3003/api/assignment/update/${editingId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                showNotification('Assignment updated successfully!', 'success');
            } else {
                await axios.post('http://localhost:3003/api/assignment/create', payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                showNotification('Assignment added successfully!', 'success');
            }
            resetForm();
            fetchAssignments();
        } catch (error) {
            console.error('Error saving assignment:', error);
            showNotification('Failed to save assignment', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (assignment) => {
        setFormData({
            title: assignment.title,
            topic: assignment.topic,
            submissionDate: assignment.submissionDate || '',
            githubLink: assignment.githubLink || '',
            driveLink: assignment.driveLink || '',
            marks: assignment.marks || '',
            status: assignment.status,
            trainerFeedback: assignment.trainerFeedback || '',
            studentId: assignment.studentId
        });
        setIsEditing(true);
        setEditingId(assignment.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this assignment?')) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`http://localhost:3003/api/assignment/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            showNotification('Assignment deleted successfully!', 'success');
            fetchAssignments();
        } catch (error) {
            console.error('Error deleting assignment:', error);
            showNotification('Failed to delete assignment', 'error');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            topic: '',
            submissionDate: '',
            githubLink: '',
            driveLink: '',
            marks: '',
            status: 'Pending',
            trainerFeedback: '',
            studentId: ''
        });
        setIsEditing(false);
        setEditingId(null);
        setShowForm(false);
    };

    const getStatusBadge = (status) => {
        const statusProps = {
            'Pending': {},
            'Submitted': { primary: true },
            'Reviewed': { warning: true },
            'Approved': { success: true },
            'Resubmit': { danger: true }
        };
        return <Badge {...statusProps[status]}>{status}</Badge>;
    };

    const filteredAssignments = assignments.filter(a => {
        const matchesStudent = !filterStudent || a.studentId === parseInt(filterStudent);
        const matchesTopic = !filterTopic || a.topic === filterTopic;
        return matchesStudent && matchesTopic;
    });

    return (
        <>
            <Card>
                <CardHeader className="flex-header">
                    <h5>
                        <FaProjectDiagram size={20} />
                        Assignment & Project Records ({filteredAssignments.length})
                    </h5>
                    <PrimaryButton onClick={() => setShowForm(true)} style={{ marginTop: 0 }}>
                        <FiPlus size={18} />
                        Add Assignment
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

                        <Label style={{ marginBottom: 0, marginLeft: '1rem' }}>Filter by Topic:</Label>
                        <FilterSelect
                            value={filterTopic}
                            onChange={(e) => setFilterTopic(e.target.value)}
                        >
                            <option value="">All Topics</option>
                            {topics.map(topic => (
                                <option key={topic} value={topic}>{topic}</option>
                            ))}
                        </FilterSelect>
                    </FilterRow>

                    {loading ? (
                        <EmptyState>
                            <Spinner />
                            <p>Loading assignments...</p>
                        </EmptyState>
                    ) : filteredAssignments.length === 0 ? (
                        <EmptyState>
                            <FaProjectDiagram size={48} color="#6c757d" />
                            <p>No assignments found.</p>
                        </EmptyState>
                    ) : (
                        <RecordsTable>
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Title</th>
                                    <th>Topic</th>
                                    <th>Submission</th>
                                    <th>Links</th>
                                    <th>Marks</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAssignments.map(assignment => (
                                    <tr key={assignment.id}>
                                        <td>{assignment.Student?.name || 'N/A'}</td>
                                        <td>{assignment.title}</td>
                                        <td><Badge primary>{assignment.topic}</Badge></td>
                                        <td>{assignment.submissionDate ? new Date(assignment.submissionDate).toLocaleDateString() : '-'}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {assignment.githubLink && (
                                                    <a href={assignment.githubLink} target="_blank" rel="noopener noreferrer" title="GitHub">
                                                        <FiExternalLink size={16} />
                                                    </a>
                                                )}
                                                {assignment.driveLink && (
                                                    <a href={assignment.driveLink} target="_blank" rel="noopener noreferrer" title="Drive">
                                                        <FiExternalLink size={16} />
                                                    </a>
                                                )}
                                                {!assignment.githubLink && !assignment.driveLink && '-'}
                                            </div>
                                        </td>
                                        <td>{assignment.marks || '-'}</td>
                                        <td>{getStatusBadge(assignment.status)}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <ActionButton primary onClick={() => handleEdit(assignment)}>
                                                    <FiEdit2 size={14} />
                                                </ActionButton>
                                                <ActionButton danger onClick={() => handleDelete(assignment.id)}>
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
                    <ModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
                        <ModalHeader>
                            <h3>{isEditing ? 'Edit Assignment' : 'Add New Assignment'}</h3>
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
                                        <Label>Assignment Title *</Label>
                                        <Input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Portfolio Website"
                                            required
                                            disabled={loading}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Topic *</Label>
                                        <Select
                                            name="topic"
                                            value={formData.topic}
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
                                        >
                                            <option value="">Select Topic</option>
                                            {topics.map(topic => (
                                                <option key={topic} value={topic}>{topic}</option>
                                            ))}
                                        </Select>
                                    </FormGroup>
                                </FormRow>

                                <FormRow>
                                    <FormGroup>
                                        <Label>Submission Date</Label>
                                        <Input
                                            type="date"
                                            name="submissionDate"
                                            value={formData.submissionDate}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Status *</Label>
                                        <Select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Submitted">Submitted</option>
                                            <option value="Reviewed">Reviewed</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Resubmit">Resubmit</option>
                                        </Select>
                                    </FormGroup>
                                </FormRow>

                                <FormRow>
                                    <FormGroup>
                                        <Label>GitHub Link</Label>
                                        <Input
                                            type="url"
                                            name="githubLink"
                                            value={formData.githubLink}
                                            onChange={handleInputChange}
                                            placeholder="https://github.com/..."
                                            disabled={loading}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Drive Link</Label>
                                        <Input
                                            type="url"
                                            name="driveLink"
                                            value={formData.driveLink}
                                            onChange={handleInputChange}
                                            placeholder="https://drive.google.com/..."
                                            disabled={loading}
                                        />
                                    </FormGroup>
                                </FormRow>

                                <FormGroup>
                                    <Label>Marks</Label>
                                    <Input
                                        type="number"
                                        name="marks"
                                        value={formData.marks}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="100"
                                        placeholder="Enter marks (0-100)"
                                        disabled={loading}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Trainer Feedback</Label>
                                    <TextArea
                                        name="trainerFeedback"
                                        value={formData.trainerFeedback}
                                        onChange={handleInputChange}
                                        placeholder="Enter feedback for the student..."
                                        rows="4"
                                        disabled={loading}
                                    />
                                </FormGroup>

                                <ModalActions>
                                    <PrimaryButton type="submit" disabled={loading}>
                                        {loading ? <Spinner small /> : <FiCheckCircle size={18} />}
                                        {loading ? 'Saving...' : isEditing ? 'Update' : 'Add Assignment'}
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

export default Assignment;
