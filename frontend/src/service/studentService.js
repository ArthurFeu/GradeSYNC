import axios from 'axios';

export const createStudent = async (student) => {
	const response = await axios.post('students', student, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};


export const editStudent = async (student) => {
	const response = await axios.put(`students/${student.id}`, student, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
}

export const deleteStudent = async (studentId) => {
	const response = await axios.delete(`students/${studentId}`);
	return response.data;
}

export const getAllStudents = async () => {
	const response = await axios.get('students');
	return response.data;
}