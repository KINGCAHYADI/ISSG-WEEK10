const fs = require('fs');
const https = require('https');
const crypto = require('crypto');

// Target hash untuk dicocokkan
const targetMD5 = '578ed5a4eecf5a15803abdc49f6152d6';

// Fungsi untuk memeriksa hash dari daftar kata sandi
function checkPasswordList(passwordList) {
    for (const pwd of passwordList) {
        // Hitung hash MD5 untuk setiap kata sandi
        const currentHash = crypto.createHash('md5').update(pwd).digest('hex');

        // Bandingkan hash dengan hash target
        if (currentHash === targetMD5) {
            console.log(`Bob's password is: ${pwd}`);
            return pwd;
        }
    }

    console.log('Password not found in the list.');
    return null;
}

// Fungsi untuk mengunduh file wordlist dan menjalankan pemeriksaan
function fetchAndCrack(url) {
    https.get(url, (response) => {
        let fileContent = '';

        // Ambil data secara bertahap
        response.on('data', (chunk) => {
            fileContent += chunk;
        });

        // Proses data setelah selesai diterima
        response.on('end', () => {
            const passwords = fileContent.split('\n').map((line) => line.trim());
            checkPasswordList(passwords);
        });
    }).on('error', (error) => {
        console.error('Failed to download the wordlist:', error.message);
    });
}

// URL untuk wordlist di GitHub
const wordlistSource = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/500-worst-passwords.txt';

// Jalankan proses dictionary attack
fetchAndCrack(wordlistSource);
