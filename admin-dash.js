// INITIALIZE SUPABASE
const _supabaseUrl = 'https://nhmsfopeabjowgvtilru.supabase.co/';
const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obXNmb3BlYWJqb3dndnRpbHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODc4NjUsImV4cCI6MjA5MjI2Mzg2NX0.um5iUuUN4tE0oj5SE3U5MAOjdwRlveIKoNJcfOQ5BO4';
const client = supabase.createClient(_supabaseUrl, _supabaseKey);

let selectedStudentId = null;

async function fetchStudents() {
    console.log("Checking the database...");

    // FIX: Removed the .eq('role', 'student') temporarily 
    // This ensures you see EVERYONE first. We can add filters back later.
    const { data: students, error } = await client
        .from('profiles')
        .select('*');

    if (error) {
        console.error("Supabase Error:", error.message);
        return;
    }

    // LOG THE DATA: Press F12 in your browser to see this!
    console.log("Students found in DB:", students);

    const grid = document.getElementById('studentGrid');
    const totalDisplay = document.getElementById('total-students');
    
    if (totalDisplay) totalDisplay.innerText = students.length;
    if (!grid) return;

    grid.innerHTML = '';

    if (students.length === 0) {
        grid.innerHTML = '<div class="loader">No Revivalists found in the system yet.</div>';
        return;
    }

    students.forEach(student => {
        const card = document.createElement('div');
        card.className = 'student-card';
        
        // Use full_name or fallback to ID if name is missing
        const displayName = student.full_name || student.id.substring(0, 8);
        
        card.innerHTML = `
            <h4>${displayName}</h4>
            <p>ID: ${student.matric_num || 'PENDING'}<br>Role: ${student.role || 'User'}</p>
            <button class="msg-btn" onclick="openDrawer('${student.id}', '${displayName}')">
                <i class="fas fa-paper-plane"></i> MESSAGE
            </button>
        `;
        grid.appendChild(card);
    });
}

function openDrawer(id, name) {
    selectedStudentId = id;
    document.getElementById('target-student-name').innerText = name;
    document.getElementById('messageDrawer').classList.add('open');
}

function closeDrawer() {
    document.getElementById('messageDrawer').classList.remove('open');
}

async function sendMessage() {
    const title = document.getElementById('msg-title').value;
    const message = document.getElementById('msg-content').value;

    if (!title || !message) return alert("Fill all fields, Boss.");

    const { error } = await client
        .from('notifications')
        .insert([{ 
            student_id: selectedStudentId, 
            title: title, 
            message: message,
            is_read: false 
        }]);

    if (!error) {
        alert("Message Dispatched Successfully.");
        closeDrawer();
        document.getElementById('msg-title').value = '';
        document.getElementById('msg-content').value = '';
    } else {
        alert("Error: " + error.message);
    }
}

async function logout() {
    await client.auth.signOut();
    window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', fetchStudents);