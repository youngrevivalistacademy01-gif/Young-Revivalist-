// INITIALIZE SUPABASE
const _supabaseUrl = 'https://nhmsfopeabjowgvtilru.supabase.co/';
const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obXNmb3BlYWJqb3dndnRpbHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODc4NjUsImV4cCI6MjA5MjI2Mzg2NX0.um5iUuUN4tE0oj5SE3U5MAOjdwRlveIKoNJcfOQ5BO4';
const client = supabase.createClient(_supabaseUrl, _supabaseKey);

const loginBtn = document.getElementById('admin-login-btn');
const emailInput = document.getElementById('admin-email');
const passInput = document.getElementById('admin-password');
const errorMsg = document.getElementById('admin-error-msg');

loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passInput.value;

    errorMsg.innerText = "Authorizing...";

    // 1. Attempt Supabase Auth
    const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        errorMsg.innerText = "ACCESS DENIED: " + error.message;
        return;
    }

    // 2. Extra Security Check (Optional: Check if user has admin role in your profiles table)
    const { data: profile } = await client
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

    // If you haven't set up roles yet, we'll just redirect since it's your account
    window.location.href = "admin-dash.html";
});