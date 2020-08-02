export default {
    required: 'This is required',
    minLength: (num) => `Minimum ${num} ${num === 1 ? 'symbol' : 'symbols'}`,
    maxLength: (num) => `Maximum ${num} ${num === 1 ? 'symbol' : 'symbols'}`,
    qwerty: 'Are you seriously? Qwerty?..',
};
