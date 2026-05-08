// INITIALIZE SUPABASE
const _supabaseUrl = 'https://nhmsfopeabjowgvtilru.supabase.co/';
const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obXNmb3BlYWJqb3dndnRpbHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODc4NjUsImV4cCI6MjA5MjI2Mzg2NX0.um5iUuUN4tE0oj5SE3U5MAOjdwRlveIKoNJcfOQ5BO4';
const client = supabase.createClient(_supabaseUrl, _supabaseKey);

const scriptures = [
    { text: "“And he gave some, apostles; and some, prophets... For the perfecting of the saints...”", ref: "Ephesians 4:11-12" },
    { text: "“The law of the Spirit of life in Christ Jesus has made me free from sin and death.”", ref: "Romans 8:2" },
    { text: "“As newborn babes, desire the pure milk of the word, that you may grow thereby.”", ref: "1 Peter 2:2" },
    { text: "“And it Shall Come to pass afterward, That I will pour my spirit upon all flesh…”", ref: "Joel 2:28" },
    { text: "“His Word was in my heart as a burning fire shut up in my bones…”", ref: "Jeremiah 20:9" },
    { text: "“The spirit of the lord is upon me, cause he has anointed me to preach…”", ref: "Isaiah 61:1-3" },
    { text: "“And I sought for a man among them, that should make up the hedge and stand in the gap…”", ref: "Ezekiel 22:30" },
    { text: "“But we all, with open faces beholding as in a glass the glory of the lord are changed...”", ref: "2nd Corinthians 3:18" }
];

let currentIndex = 0;

// 1. MAIN INITIALIZATION
async function initDashboard() {
    // Check for session first (fastest way to prevent auto-logout)
    const { data: { session } } = await client.auth.getSession();

    if (!session) {
        console.warn("Unauthorized access. Redirecting to login...");
        window.location.href = "login.html";
        return;
    }

    const user = session.user;

    // 2. FETCH PROFILE DATA
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
        
        // Check for notifications once profile is confirmed
        checkNotifications(user.id);
    } else {
        console.error("Profile fetch error:", error);
    }

    // 3. START SCRIPTURE CAROUSEL
    rotateScripture();
    setInterval(rotateScripture, 8000);
}

// 2. NOTIFICATION SYSTEM
async function checkNotifications(studentId) {
    const { count, error } = await client
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', studentId)
        .eq('is_read', false);

    const notiDot = document.getElementById('global-noti-dot');
    if (!error && count > 0 && notiDot) {
        notiDot.style.display = 'block';
    }
}

// 3. UI LOGIC (SCRIPTURES)
function rotateScripture() {
    const section = document.getElementById('scripture-carousel');
    const text = document.getElementById('scripture-text');
    const ref = document.getElementById('scripture-ref');

    if (!section || !text || !ref) return;

    section.style.opacity = '0';
    setTimeout(() => {
        text.innerText = scriptures[currentIndex].text;
        ref.innerText = scriptures[currentIndex].ref;
        section.style.opacity = '1';
        currentIndex = (currentIndex + 1) % scriptures.length;
    }, 500);
}

// 4. LOGOUT LOGIC
const logoutTrigger = document.getElementById('logout-trigger');

if (logoutTrigger) {
    logoutTrigger.addEventListener('click', async (e) => {
        e.preventDefault();
        const confirmLogout = confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            const { error } = await client.auth.signOut();
            if (error) {
                console.error("Error logging out:", error.message);
            } else {
                window.location.href = "login.html";
            }
        }
    });
}

// 5. BOOTSTRAP
document.addEventListener('DOMContentLoaded', initDashboard);
