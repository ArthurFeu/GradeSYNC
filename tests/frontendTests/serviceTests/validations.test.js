import { 
	isValidEmail,
	isValidCPF,
	isValidName,
	isValidRA,
	isValidCPFDigits,
	isValidCPFFormat
} from '../../../frontend/src/service/validations';

describe('isValidEmail', () => {
	test('valid email', () => {
		const email = 'arthur.feu@gmail.com';
		const result = isValidEmail(email);

		expect(result).toBe(true);
	});

	test('invalid email (punctuation)', () => {
		const email = 'arthur.feu@gmail';
		const result = isValidEmail(email);

		expect(result).toBe('Informe um email válido');
	});

	test('invalid email (length)', () => {
		const email = 'a'.repeat(256) + '@gmail.com';

		const result = isValidEmail(email);
		expect(result).toBe('Informe um email válido');
	});
});

describe('isValidName', () => {
	test('valid name', () => {
		const name = 'Arthur Feu';
		const result = isValidName(name);

		expect(result).toBe(true);
	});

	test('invalid name (characters)', () => {
		const name = 'Arthur Feu123';
		const result = isValidName(name);

		expect(result).toBe('Informe um nome válido entre 5 e 255 caracteres');
	});

	test('invalid name (length)', () => {
		const name = 'a'.repeat(4);
		const result = isValidName(name);

		expect(result).toBe('Informe um nome válido entre 5 e 255 caracteres');
	});
});

describe('isValidRA', () => {
	test('valid RA', () => {
		const ra = '12345678';
		const result = isValidRA(ra);

		expect(result).toBe(true);
	});

	test('invalid RA (length <)', () => {
		const ra = '1234567';
		const result = isValidRA(ra);

		expect(result).toBe('Informe um RA válido com 8 caracteres');
	});

	test('invalid RA (length >)', () => {
		const ra = '123456789';
		const result = isValidRA(ra);

		expect(result).toBe('Informe um RA válido com 8 caracteres');
	});

	test('valid RA (different format -> UFOP based', () => {
		const ra = '21.1.801';
		const result = isValidRA(ra);

		expect(result).toBe(true);
	})
});

describe('isValidCPF', () => {
	test('valid CPF', () => {
		const cpf = '538.151.550-29';
		const result = isValidCPF(cpf);

		expect(result).toBe(true);
	});

	test('invalid CPF (format)', () => {
		const cpf = '12345678910';
		const result = isValidCPF(cpf);

		expect(result).toBe('Informe um CPF válido no formato 000.000.000-00');
	});

	test('invalid CPF (digits)', () => {
		const cpf = '123.456.789-11';
		const result = isValidCPF(cpf);

		expect(result).toBe('CPF inválido');
	});
});

describe('isValidCPFDigits', () => {
	test('valid CPF digits', () => {
		const cpf = '538.151.550-29';
		const result = isValidCPFDigits(cpf);

		expect(result).toBe(true);
	});

	test('invalid CPF digits (first digit)', () => {
		const cpf = '538.151.550-28';
		const result = isValidCPFDigits(cpf);

		expect(result).toBe('CPF inválido');
	});

	test('invalid CPF digits (second digit)', () => {
		const cpf = '538.151.550-20';
		const result = isValidCPFDigits(cpf);

		expect(result).toBe('CPF inválido');
	});
});

describe('isValidCPFFormat', () => {
	test('valid CPF format', () => {
		const cpf = '538.151.550-29';
		const result = isValidCPFFormat(cpf);

		expect(result).toBe(true);
	});

	test('invalid CPF format', () => {
		const cpf = '538.151.550-2';
		const result = isValidCPFFormat(cpf);

		expect(result).toBe('Informe um CPF válido no formato 000.000.000-00');
	});
});

