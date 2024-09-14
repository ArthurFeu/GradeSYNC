export const isValidEmail = (email) => {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const emailLength = email.length <= 255;

	const validation = emailPattern.test(email) && emailLength;
	const errorMessage = 'Informe um email válido';
	return validation || errorMessage;
};

export const isValidName = (name) => {
	const namePattern = /^[a-zA-Z\s]*$/;
	const nameLength = name.length >= 5 && name.length <= 255;

	const validation = namePattern.test(name) && nameLength;
	const errorMessage = 'Informe um nome válido entre 5 e 255 caracteres';
	return validation || errorMessage;
}

export const isValidRA = (ra) => {
	const validation = ra.length === 8;
	const errorMessage = 'Informe um RA válido com 8 caracteres';
	return validation || errorMessage;
}


// if valid returns true
// if invalid returns error message
export const isValidCPF = (cpf) => {
	const isValidFormat = isValidCPFFormat(cpf);
	const isValidDigits = isValidCPFDigits(cpf);

	if (isValidFormat !== true) return isValidFormat;
	if (isValidDigits !== true) return isValidDigits;
	return true;
}

export const isValidCPFFormat = (cpf) => {
	const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;	
	const isValidFormat = cpfPattern.test(cpf);
	return isValidFormat ? true : 'Informe um CPF válido no formato 000.000.000-00';
};

export const isValidCPFDigits = (cpf) => {
	const cleanCPF = cpf.replace(/\D/g, '');

	if (/^(\d)\1+$/.test(cleanCPF)) return 'CPF inválido';

	// Validate verification digits
	let sum = 0;
	let remainder;

	for (let i = 1; i <= 9; i++) {
	sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
	}

	remainder = (sum * 10) % 11;
	if ((remainder == 10) || (remainder == 11)) remainder = 0;
	if (remainder != parseInt(cleanCPF.substring(9, 10))) return 'CPF inválido';

	sum = 0;
	for (let i = 1; i <= 10; i++) {
	sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
	}

	remainder = (sum * 10) % 11;
	if ((remainder == 10) || (remainder == 11)) remainder = 0;
	if (remainder != parseInt(cleanCPF.substring(10, 11))) return 'CPF inválido';

	return true;
};

export const fieldRequired = (field) => {
	return field.length > 0 || 'Campo obrigatório';
}