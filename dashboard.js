// INITIALIZE SUPABASE
const _supabaseUrl = 'https://nhmsfopeabjowgvtilru.supabase.co/';
const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obXNmb3BlYWJqb3dndnRpbHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODc4NjUsImV4cCI6MjA5MjI2Mzg2NX0.um5iUuUN4tE0oj5SE3U5MAOjdwRlveIKoNJcfOQ5BO4';
const client = supabase.createClient(_supabaseUrl, _supabaseKey);

const scriptures = [
    { text: "“And he gave some, apostles; and some, prophets... For the perfecting of the saints...”", ref: "Ephesians 4:11-12" },
    { text: "“The law of the Spirit of life in Christ Jesus has made me free from sin and death.”", ref: "Romans 8:2" },
    { text: "“As newborn babes, desire the pure milk of the word, that you may grow thereby.”", ref: "1 Peter 2:2" }
];

let currentIndex = 0;

async function initDashboard() {
    // 1. Authenticate User
    const { data: { user } } = await client.auth.getUser();
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // 2. Fetch Personal Data
    const { data: profile, error } = await client
        .from('profiles')
        .select('full_name, matric_num, cohort')
        .eq('id', user.id)
        .single();

    if (profile) {
        document.getElementById('student-name').innerText = profile.full_name;
        document.getElementById('matric-no').innerText = profile.matric_num;
        document.getElementById('cohort-display').innerText = `${profile.cohort.toUpperCase()} COHORT`;
        document.getElementById('student-status').innerText = "ONLINE";
    }

    // 3. Start Scripture Carousel
    rotateScripture();
    setInterval(rotateScripture, 8000);
}

function rotateScripture() {
    const section = document.getElementById('scripture-carousel');
    const text = document.getElementById('scripture-text');
    const ref = document.getElementById('scripture-ref');

    section.style.opacity = '0';
    setTimeout(() => {
        text.innerText = scriptures[currentIndex].text;
        ref.innerText = scriptures[currentIndex].ref;
        section.style.opacity = '1';
        currentIndex = (currentIndex + 1) % scriptures.length;
    }, 500);
}

// ... existing initDashboard and scripture logic ...

// LOGOUT LOGIC
const logoutTrigger = document.getElementById('logout-trigger');

async function checkNotifications(studentId) {
    const { count, error } = await client
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', studentId)
        .eq('is_read', false);

    if (!error && count > 0) {
        document.getElementById('global-noti-dot').style.display = 'block';
    }
}

// Update your existing initDashboard to call this:
// ... after you get the profile ...
// checkNotifications(user.id);


if (logoutTrigger) {
    logoutTrigger.addEventListener('click', async () => {
        const confirmLogout = confirm("Are you sure you want to leave the Academy?");
        if (confirmLogout) {
            // Sign out from Supabase
            const { error } = await client.auth.signOut();
            if (error) {
                console.error("Error logging out:", error.message);
            } else {
                // Redirect to landing page
                window.location.href = "index.html";
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', initDashboard);
