const crypto = require('crypto');

// Given MD5 hash of Alice's PIN
const targetHash = "5531a5834816222280f20d1ef9e95f69";

// Function to generate the MD5 hash
function generateMD5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

// Brute force attack to find the 4-digit PIN
function findPin() {
    for (let i = 0; i <= 9999; i++) {
        // Pad the number to ensure it's 4 digits (e.g., 0000, 0001, ...)
        const pin = i.toString().padStart(4, '0');
        
        // Generate the MD5 hash for the current PIN
        const hash = generateMD5(pin);

        // Check if the generated hash matches the target hash
        if (hash === targetHash) {
            console.log(`PIN found: ${pin}`);
            return pin;
        }
    }
    console.log("PIN not found");
    return null;
}

// Run the brute force function
findPin();
