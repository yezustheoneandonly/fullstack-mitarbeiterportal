export default function generateRandomPassword(length) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const all = uppercase + lowercase + numbers + symbols;
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * all.length);
        password += all[randomIndex];
    }

    return password;
}

// Example usage:
//const passwordLength = 12; // You can set the desired length
//const generatedPassword = generateRandomPassword(passwordLength);
//console.log(generatedPassword);
