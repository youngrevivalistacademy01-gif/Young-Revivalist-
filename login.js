// INITIALIZE SUPABASE
const _supabaseUrl = 'https://nhmsfopeabjowgvtilru.supabase.co/';
const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obXNmb3BlYWJqb3dndnRpbHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODc4NjUsImV4cCI6MjA5MjI2Mzg2NX0.um5iUuUN4tE0oj5SE3U5MAOjdwRlveIKoNJcfOQ5BO4';
const client = supabase.createClient(_supabaseUrl, _supabaseKey);

const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value;
    const errorDisplay = document.getElementById('error-msg');

    if (!email || !password) {
        errorDisplay.innerText = "CREDENTIALS REQUIRED.";
        return;
    }

    loginBtn.innerText = "VERIFYING...";
    errorDisplay.innerText = "";

    // 1. Attempt to sign in with Email & Password
    const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        // Handle incorrect details
        errorDisplay.innerText = "ACCESS DENIED: " + error.message.toUpperCase();
        loginBtn.innerText = "ENTER THE ACADEMY";
    } else {
        // 2. Success! Redirect to the student portal
        loginBtn.innerText = "ACCESS GRANTED";
        window.location.href = "dash.html";
    }
});