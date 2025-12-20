const axios = require('axios');

// Test signup functionality
async function testSignup() {
    const testUser = {
        firstName: "TestUser",
        emailId: `test${Date.now()}@example.com`, // Unique email
        password: "TestPass123!"
    };

    console.log('Testing signup with:', testUser);

    try {
        const response = await axios.post('http://localhost:3000/user/register', testUser, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:5173'
            },
            withCredentials: true
        });

        console.log('✅ Signup successful!');
        console.log('Response:', response.data);
        
        // Test if we can access protected route
        const token = response.data.token;
        const checkResponse = await axios.get('http://localhost:3000/user/check', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Origin': 'http://localhost:5173'
            },
            withCredentials: true
        });
        
        console.log('✅ Auth check successful!');
        console.log('User data:', checkResponse.data);
        
    } catch (error) {
        console.log('❌ Signup failed!');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Error:', error.response.data);
        } else if (error.request) {
            console.log('Network error:', error.message);
        } else {
            console.log('Error:', error.message);
        }
    }
}

// Test server health first
async function testHealth() {
    try {
        const response = await axios.get('http://localhost:3000/health');
        console.log('✅ Server is running:', response.data);
        return true;
    } catch (error) {
        console.log('❌ Server is not running or not accessible');
        return false;
    }
}

async function runTests() {
    console.log('🔍 Testing signup functionality...\n');
    
    const serverRunning = await testHealth();
    if (!serverRunning) {
        console.log('Please start the backend server first: cd backend && npm start');
        return;
    }
    
    console.log('');
    await testSignup();
}

runTests();