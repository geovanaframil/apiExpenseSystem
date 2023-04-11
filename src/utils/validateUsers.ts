export default function validateUserInput(body: any): { valid: boolean, errors?: string[] } {
    const { name, lastName, email } = body;
    const errors: string[] = [];
  
    if (!name || name.trim().length === 0) {
      errors.push('O campo /nome é obrigatório');
    }
  
    if (!lastName || lastName.trim().length === 0) {
      errors.push('O campo /sobrenome é obrigatório');
    }
  
    if (!email || email.trim().length === 0) {
      errors.push('O campo /e-mail é obrigatório');
    } else {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        errors.push('O campo /e-mail é inválido');
      }
    }
  
    const valid = errors.length === 0;
    return { valid, errors: valid ? undefined : errors };
  }