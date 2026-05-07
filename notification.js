const _supabaseUrl = 'https://nhmsfopeabjowgvtilru.supabase.co/';
const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obXNmb3BlYWJqb3dndnRpbHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODc4NjUsImV4cCI6MjA5MjI2Mzg2NX0.um5iUuUN4tE0oj5SE3U5MAOjdwRlveIKoNJcfOQ5BO4';
const client = supabase.createClient(_supabaseUrl, _supabaseKey);

async function loadNotifications() {
    const { data: { user } } = await client.auth.getUser();
    
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    const { data: notes, error } = await client
        .from('notifications')
        .select('*')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });

    const container = document.getElementById('inbox-list');
    container.innerHTML = ''; 

    if (error || !notes || notes.length === 0) {
        container.innerHTML = '<div class="empty-state">THE RHEMA STREAM IS CURRENTLY EMPTY</div>';
        return;
    }

    notes.forEach((note, index) => {
        const card = document.createElement('div');
        // Combined your is_read check with the new CSS class
        card.className = `noti-card ${note.is_read ? 'read' : ''}`;
        
        // Added a tiny delay to each card for a "staggered" entrance
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="noti-header">
                <span class="admin-tag">Admin [Verified] <i class="fas fa-check-circle"></i></span>
                <span class="noti-time">${new Date(note.created_at).toLocaleDateString()}</span>
            </div>
            <div class="noti-title">${note.title}</div>
            <div class="noti-body">${note.message}</div>
        `;
        
        if (!note.is_read) {
            markAsRead(note.id);
        }
        
        container.appendChild(card);
    });
}

async function markAsRead(noteId) {
    await client
        .from('notifications')
        .update({ is_read: true })
        .eq('id', noteId);
}

document.addEventListener('DOMContentLoaded', loadNotifications);