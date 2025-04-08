export function generateOtp () {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateJoiError (error) {
    const message = {};

    error.details.forEach((err) => {
        message[err.context.key] = err.message;
    });

    return message;
}