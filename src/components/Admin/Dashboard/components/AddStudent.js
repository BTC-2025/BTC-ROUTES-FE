import React from 'react';
import { FiEdit2, FiUserPlus } from 'react-icons/fi';
import {
    FormSection,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormRow,
    FormGroup,
    Label,
    Input,
    Select,
    FileInfo,
    FormActions,
    PrimaryButton,
    SecondaryButton,
    Spinner
} from './StyledComponents';

const AddStudent = ({
    studentForm,
    handleStudentInputChange,
    handlePhotoUpload,
    handleAddStudent,
    handleUpdateStudent,
    handleCancelEdit,
    isEditing,
    loading
}) => {
    return (
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
                            <FormGroup>
                                <Label>College</Label>
                                <Input
                                    type='text'
                                    name='college'
                                    value={studentForm.college}
                                    onChange={handleStudentInputChange}
                                    disabled={loading}
                                />
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
    );
};

export default AddStudent;
