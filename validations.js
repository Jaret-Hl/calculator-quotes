// Validaciones para datos de contacto
const validations = {
  // Validar nombre (mínimo 2 caracteres, solo letras y espacios)
  validateName(name) {
    if (!name || name.trim().length < 2) {
      return { valid: false, error: "El nombre debe tener al menos 2 caracteres." };
    }
    if (!/^[a-záéíóúñ\s]+$/i.test(name)) {
      return { valid: false, error: "El nombre solo puede contener letras y espacios." };
    }
    return { valid: true };
  },

  // Validar email
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return { valid: false, error: "Ingresa un correo electrónico válido." };
    }
    return { valid: true };
  },

  // Validar teléfono (10 dígitos para México)
  validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone.replace(/\D/g, ""))) {
      return { valid: false, error: "Ingresa un teléfono válido (10 dígitos)." };
    }
    return { valid: true };
  },

  // Validar empresa (mínimo 2 caracteres)
  validateCompany(company) {
    if (!company || company.trim().length < 2) {
      return { valid: false, error: "El nombre de la empresa debe tener al menos 2 caracteres." };
    }
    return { valid: true };
  },

  // Validar todos los campos de contacto
  validateContactData(data) {
    const errors = {};
    
    const nameValidation = this.validateName(data.name);
    if (!nameValidation.valid) errors.name = nameValidation.error;

    const companyValidation = this.validateCompany(data.company);
    if (!companyValidation.valid) errors.company = companyValidation.error;

    const emailValidation = this.validateEmail(data.email);
    if (!emailValidation.valid) errors.email = emailValidation.error;

    const phoneValidation = this.validatePhone(data.phone);
    if (!phoneValidation.valid) errors.phone = phoneValidation.error;

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }
};
