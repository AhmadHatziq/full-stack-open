// Contains custom error classes

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class OwnerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OwnerError';
  }
}

module.exports = {
  ValidationError, OwnerError
}