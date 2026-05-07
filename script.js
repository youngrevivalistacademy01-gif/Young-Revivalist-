// 1. Rename 'supabase' to 'client' to avoid the naming conflict
const _supabaseUrl = 'https://nhmsfopeabjowgvtilru.supabase.co/';
const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obXNmb3BlYWJqb3dndnRpbHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODc4NjUsImV4cCI6MjA5MjI2Mzg2NX0.um5iUuUN4tE0oj5SE3U5MAOjdwRlveIKoNJcfOQ5BO4';

// Use the global 'supabase' object from the library to create our 'client'
const client = supabase.createClient(_supabaseUrl, _supabaseKey);

const signupBtn = document.getElementById('signup-btn');

console.log("Script connected. System ready.");

signupBtn.addEventListener('click', async () => {
    console.log("Attempting to join the Academy...");

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullname = document.getElementById('fullname').value;
    const messageDisplay = document.getElementById('message');

    if (!email || !password || !fullname) {
        alert("A Revivalist must provide all details.");
        return;
    }

    signupBtn.innerText = "IDENTIFYING...";

    // 2. Use 'client' instead of 'supabase' here
    const { data, error } = await client.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { full_name: fullname }
        }
    });

    if (error) {
        messageDisplay.innerText = error.message;
        messageDisplay.style.color = "red";
        signupBtn.innerText = "JOIN THE ACADEMY";
    } else {
        // 3. Create the profile which triggers the YRA number
        const { error: profileError } = await client
            .from('profiles')
            .insert([
                { id: data.user.id, full_name: fullname }
            ]);

        if (profileError) {
            console.error(profileError);
            messageDisplay.innerText = "Database error. Contact admin.";
        } else {
            messageDisplay.innerText = "Welcome, Revivalist. Check your email.";
            messageDisplay.style.color = "green";
            signupBtn.innerText = "SUCCESS";
            // 3. THE REDIRECT: Wait 3 seconds then go to login page
            setTimeout(() => {
                window.location.href = "login.html"; // Ensure this filename matches your login page
            }, 3000);
        }
    }
});