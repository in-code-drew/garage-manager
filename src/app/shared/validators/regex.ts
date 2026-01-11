// Email
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone: only numbers, 8-12
export const PHONE_REGEX = /^[0-9]{8,12}$/;

// ISO Date: YYYY-MM-DD
export const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// IT Carplate: AA123BB (only higher case and numbers)
export const PLATE_IT_REGEX = /^[A-Z]{2}\d{3}[A-Z]{2}$/;