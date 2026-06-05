/**
 * YRA Assignment Engine - JavaScript Routing & Data Layer
 * Handles dynamic content generation and direct text string compilation
 */

// Central Curriculum Question Matrix
const ASSIGNMENT_DATABASE = {
    "1": {
        index: "Module 01", cohort: "Foundational",
        title: "The True Gospel of Jesus Christ",
        questions: [
            "Explain the core distinction between living under a performance-driven legal system versus resting in the unconditional Grace of the True Gospel.",
            "How does an uncompromised understanding of the Finished Work of Christ alter a believer's everyday approach to prayer and righteousness?"
        ]
    },
    "2": {
        index: "Module 02", cohort: "Foundational",
        title: "The Finished Work of Christ and Salvation Realities",
        questions: [
            "Define the absolute legal boundaries of substitution and identification. What exactly took place on the cross for your identity?",
            "What are the permanent spiritual mechanics that occur instantly within the new birth regarding eternal security and justification?"
        ]
    },
    "3": {
        index: "Module 03", cohort: "Foundational",
        title: "The Reality of Grace, Faith and the New Birth",
        questions: [
            "Analyze faith not as a mechanism of emotional leverage, but as a response to an already completed reality of Grace.",
            "Describe the precise transformation of the human spirit during regeneration and how to train your new nature to override sensory feedback."
        ]
    },
    "4": {
        index: "Module 04", cohort: "Identity",
        title: "Identity in Christ and Sonship",
        questions: [
            "What are the functional legal rights and daily inheritance metrics unlocked when moving from the posture of a servant to the absolute positioning of Sonship?",
            "How do you structurally manage your identity when outer circumstances directly contradict your scriptural standing in Christ?"
        ]
    },
    "5": {
        index: "Module 05", cohort: "Identity",
        title: "Kingdom Authority and the Dominion Mandate",
        questions: [
            "Differentiate between delegated authority (exousia) and raw power (dunamis). How are you legally authorized to manifest this authority daily?",
            "What structural role does speech, declaration, and systematic alignment with the Word play in enforced victory over hostile external systems?"
        ]
    },
    "6": {
        index: "Module 06", cohort: "Maturity",
        title: "Walking in Love: The Highest Proof of Discipleship",
        questions: [
            "How does authentic vertical love for God explicitly define and regulate our horizontal relational boundaries with people?",
            "Provide a biblical critique of practicing rebuke and correction in love while maintaining a clean heart posture of absolute reconciliation."
        ]
    },
    "7": {
        index: "Module 07", cohort: "Maturity",
        title: "Death to Self and Inner Transformation",
        questions: [
            "Define the practical execution of crucifying the flesh. What daily habits guarantee freedom from the cultural control engines of mammon and fear?",
            "How does internal transformation validate itself through the clean, organic, and noticeable cultivation of the Fruit of the Spirit?"
        ]
    },
    "8": {
        index: "Module 08", cohort: "Maturity",
        title: "Responsibility, Stewardship and Kingdom Character",
        questions: [
            "Why is responsibility classified as an actual lifestyle rather than a situational obligation? Discuss through the lens of character excellence.",
            "Detail your personal framework for time and resource stewardship to ensure absolute operational accountability within your current assignments."
        ]
    },
    "9": {
        index: "Module 09", cohort: "Ambassadors",
        title: "Kingdom Community, Spiritual Family and Mentorship",
        questions: [
            "Why is isolation dangerous to a believer's longevity? Outline the structural defenses provided by deep covenant relationships and spiritual families.",
            "What are the rules of engagement for true mentorship and spiritual fatherhood, and how do they collapse tracking latency on your growth trajectory?"
        ]
    },
    "10": {
        index: "Module 10", cohort: "Ambassadors",
        title: "Discipleship, Evangelism and Kingdom Mission",
        questions: [
            "Analyze the Great Commission as a definitive socio-cultural mandate rather than a simple religious invitation.",
            "What exact follow-up steps guarantee that converts transition cleanly into stable, self-replicating disciples inside your target network field?"
        ]
    },
    "11": {
        index: "Module 11", cohort: "Ambassadors",
        title: "Kingdom Leadership and Ambassadorship",
        questions: [
            "Contrast the methodology of worldly leadership with the structural blueprint of servant leadership demonstrated by Christ.",
            "How should a diplomat of heaven manage and utilize corporate influence without succumbing to compromise or political dilution?"
        ]
    },
    "12": {
        index: "Module 12", cohort: "Ambassadors",
        title: "Productivity, Excellence and Societal Transformation",
        questions: [
            "Analyze how true value creation and sharp financial intelligence act as active weapons for programmatic economic empowerment.",
            "Outline your direct strategic execution plan for leveraging modern technological tools to drive tangible transformation in your current marketplace sphere."
        ]
    }
};

// Global reference for keeping current context state clear
let globalActiveModule = null;

/**
 * Initializes the viewport page engine layout contexts
 */
function initializeAssignmentEngine() {
    const urlParameters = new URLSearchParams(window.location.search);
    const moduleId = urlParameters.get('id') || "1"; 
    
    globalActiveModule = ASSIGNMENT_DATABASE[moduleId];

    if (!globalActiveModule) {
        document.getElementById('target-title').innerText = "Data Matrix Context Missing";
        return;
    }

    // Dynamic Header Assignments
    document.getElementById('target-index').innerText = `${globalActiveModule.cohort} Class • ${globalActiveModule.index}`;
    document.getElementById('target-title').innerText = globalActiveModule.title;

    const questionsContainer = document.getElementById('dynamic-questions-container');
    questionsContainer.innerHTML = ""; 

    // Generate response input fields sequentially
    globalActiveModule.questions.forEach((questionText, keyIndex) => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-item';
        
        const inputId = `answer-q${keyIndex + 1}`;

        questionBlock.innerHTML = `
            <label class="question-label" for="${inputId}">
                Question 0${keyIndex + 1}: ${questionText}
            </label>
            <textarea 
                id="${inputId}" 
                class="answer-field" 
                rows="5" 
                required 
                placeholder="Type your structured analytical response here..."></textarea>
        `;
        questionsContainer.appendChild(questionBlock);
    });
}

/**
 * Compiles structural assignment payloads and delivers them to the target WhatsApp context API
 */
function handleAssignmentSubmission(event) {
    event.preventDefault(); // Stop native page reload routing

    const matricDigitsInput = document.getElementById('matric-digits');
    const cleanMatricValue = matricDigitsInput.value.trim();

    if (!cleanMatricValue) {
        alert("Please enter a valid Student Matric Number.");
        return;
    }

    const compiledMatricString = `YRA / ${cleanMatricValue}`;
    
    // Admin Target Phone Number (Replace with the actual admin's WhatsApp number in international format, without the '+' sign)
    const adminPhoneNumber = "2348000000000"; 

    // Build the formatted textual document payload for instant clarity inside chat views
    let messagePayload = `*🎓 YRA ASSIGNMENT SUBMISSION*\n`;
    messagePayload += `----------------------------------\n`;
    messagePayload += `*👤 Student Matric:* ${compiledMatricString}\n`;
    messagePayload += `*🏫 Cohort Class:* ${globalActiveModule.cohort}\n`;
    messagePayload += `*📚 Module:* ${globalActiveModule.index} - ${globalActiveModule.title}\n`;
    messagePayload += `----------------------------------\n\n`;

    // Extract content safely loop by loop from the DOM layout sheet
    globalActiveModule.questions.forEach((questionText, keyIndex) => {
        const inputId = `answer-q${keyIndex + 1}`;
        const studentResponse = document.getElementById(inputId).value.trim();
        
        messagePayload += `*📝 QUESTION 0${keyIndex + 1}:*\n_${questionText}_\n\n`;
        messagePayload += `*✍️ ANSWER:*\n${studentResponse}\n\n`;
        messagePayload += `----------------------------------\n\n`;
    });

    // Binds character escapes securely across standard URI interfaces
    const encodedUriMessage = encodeURIComponent(messagePayload);
    const targetWhatsAppUrl = `https://api.whatsapp.com/send?phone=${07016279796}&text=${encodedUriMessage}`;

    // Fire intent instantly to route data outward securely
    window.open(targetWhatsAppUrl, '_blank');
}

// Attach event hooks neatly following clean parsing lifecycle standards
document.addEventListener('DOMContentLoaded', () => {
    initializeAssignmentEngine();
    
    const formElement = document.getElementById('assignment-form');
    if (formElement) {
        formElement.addEventListener('submit', handleAssignmentSubmission);
    }
});
