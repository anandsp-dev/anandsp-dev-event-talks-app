
const fs = require('fs');

const eventName = "TechFest 2026";
const eventDate = "March 5, 2026";

const talks = [
    {
        title: "The Future of AI in Cloud",
        speakers: ["Dr. Ava Sharma"],
        category: ["AI", "Cloud", "Future"],
        duration: "1 hour",
        description: "An in-depth look at the convergence of Artificial Intelligence and cloud computing, exploring emerging trends and future possibilities."
    },
    {
        title: "Sustainable Software Development",
        speakers: ["Ben Carter", "Dr. Chloe Davis"],
        category: ["Sustainability", "Software Engineering"],
        duration: "1 hour",
        description: "Strategies and practices for building software that is environmentally friendly and energy-efficient."
    },
    {
        title: "Advanced JavaScript Patterns",
        speakers: ["Ethan Green"],
        category: ["JavaScript", "Web Development"],
        duration: "1 hour",
        description: "Dive deep into modern JavaScript patterns and best practices for robust and scalable web applications."
    },
    {
        title: "DevOps for Machine Learning Workflows",
        speakers: ["Fiona Hall"],
        category: ["DevOps", "Machine Learning", "MLOps"],
        duration: "1 hour",
        description: "Implementing DevOps principles for efficient and reliable machine learning model deployment and management."
    },
    {
        title: "Quantum Computing Fundamentals",
        speakers: ["Dr. George White"],
        category: ["Quantum Computing", "Science"],
        duration: "1 hour",
        description: "An introductory session to the principles of quantum computing and its potential impact on various industries."
    },
    {
        title: "Building Secure APIs",
        speakers: ["Hannah Black", "Ivan Petrov"],
        category: ["Security", "API", "Web Development"],
        duration: "1 hour",
        description: "Best practices and common pitfalls in designing and implementing secure Application Programming Interfaces."
    }
];

const generateSchedule = (talks) => {
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0); // Start at 10:00 AM

    let scheduleHtml = '';
    let talkIndex = 0;

    for (let i = 0; i < 6; i++) {
        const talk = talks[talkIndex];
        const talkStartTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        currentTime.setMinutes(currentTime.getMinutes() + 60); // 1 hour for the talk
        const talkEndTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        scheduleHtml += `
            <div class="talk" data-categories="${talk.category.map(c => c.toLowerCase()).join(' ')}">
                <div class="time">${talkStartTime} - ${talkEndTime}</div>
                <div class="details">
                    <h3>${talk.title}</h3>
                    <p class="speakers">Speaker(s): ${talk.speakers.join(', ')}</p>
                    <p class="categories">Categories: ${talk.category.join(', ')}</p>
                    <p class="description">${talk.description}</p>
                </div>
            </div>
        `;
        talkIndex++;

        if (i === 2) { // After 3rd talk, add lunch break
            const lunchStartTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            currentTime.setMinutes(currentTime.getMinutes() + 60); // 1 hour for lunch
            const lunchEndTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            scheduleHtml += `
                <div class="break">
                    <div class="time">${lunchStartTime} - ${lunchEndTime}</div>
                    <div class="details">
                        <h3>Lunch Break</h3>
                        <p>Enjoy your meal!</p>
                    </div>
                </div>
            `;
            currentTime.setMinutes(currentTime.getMinutes() + 10); // 10 min transition after lunch
        } else if (i < 5) { // Add transition between talks, not after the last one
            currentTime.setMinutes(currentTime.getMinutes() + 10); // 10 min transition
        }
    }
    return scheduleHtml;
};


const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${eventName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 900px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 10px 0;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        header h1 {
            margin: 0;
            font-size: 2.5em;
        }
        header p {
            margin: 5px 0 0;
            font-size: 1.1em;
        }
        .search-bar {
            margin: 20px 0;
            padding: 15px;
            background-color: #e9e9e9;
            border-radius: 5px;
            display: flex;
            align-items: center;
        }
        .search-bar label {
            margin-right: 10px;
            font-weight: bold;
        }
        .search-bar input[type="text"] {
            flex-grow: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1em;
        }
        .schedule-track {
            margin-top: 20px;
        }
        .talk, .break {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            margin-bottom: 10px;
            padding: 15px;
            border-radius: 5px;
            display: flex;
            align-items: flex-start;
        }
        .talk .time, .break .time {
            font-weight: bold;
            color: #0056b3;
            width: 120px;
            flex-shrink: 0;
            font-size: 1.1em;
        }
        .talk .details, .break .details {
            flex-grow: 1;
        }
        .talk h3, .break h3 {
            margin-top: 0;
            color: #333;
            font-size: 1.4em;
        }
        .talk p, .break p {
            margin: 5px 0;
            line-height: 1.5;
        }
        .talk .speakers {
            font-style: italic;
            color: #555;
        }
        .talk .categories {
            font-size: 0.9em;
            color: #777;
        }
        .break {
            background-color: #dff0d8;
            border-color: #d6e9c6;
            color: #3c763d;
        }
        .break .time {
            color: #3c763d;
        }
        .no-results {
            text-align: center;
            padding: 20px;
            font-style: italic;
            color: #777;
        }
        footer {
            text-align: center;
            padding: 20px;
            margin-top: 30px;
            color: #777;
            font-size: 0.9em;
            border-top: 1px solid #eee;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>TechFest 2026</h1>
            <p>${eventDate}</p>
        </header>

        <main>
            <div class="search-bar">
                <label for="category-search">Search by Category:</label>
                <input type="text" id="category-search" placeholder="e.g., AI, Web Development">
            </div>

            <section class="schedule-track">
                <h2>Event Schedule</h2>
                <div id="schedule-content">
                    <!-- Schedule will be generated here by JavaScript -->
                </div>
                <div id="no-results-message" class="no-results" style="display: none;">
                    No talks found for the given category.
                </div>
            </section>
        </main>

        <footer>
            <p>&copy; 2026 TechFest 2026. All rights reserved.</p>
        </footer>
    </div>

    <script>
        const talksData = [
  {
    "title": "The Future of AI in Cloud",
    "speakers": [
      "Dr. Ava Sharma"
    ],
    "category": [
      "AI",
      "Cloud",
      "Future"
    ],
    "duration": "1 hour",
    "description": "An in-depth look at the convergence of Artificial Intelligence and cloud computing, exploring emerging trends and future possibilities."
  },
  {
    "title": "Sustainable Software Development",
    "speakers": [
      "Ben Carter",
      "Dr. Chloe Davis"
    ],
    "category": [
      "Sustainability",
      "Software Engineering"
    ],
    "duration": "1 hour",
    "description": "Strategies and practices for building software that is environmentally friendly and energy-efficient."
  },
  {
    "title": "Advanced JavaScript Patterns",
    "speakers": [
      "Ethan Green"
    ],
    "category": [
      "JavaScript",
      "Web Development"
    ],
    "duration": "1 hour",
    "description": "Dive deep into modern JavaScript patterns and best practices for robust and scalable web applications."
  },
  {
    "title": "DevOps for Machine Learning Workflows",
    "speakers": [
      "Fiona Hall"
    ],
    "category": [
      "DevOps",
      "Machine Learning",
      "MLOps"
    ],
    "duration": "1 hour",
    "description": "Implementing DevOps principles for efficient and reliable machine learning model deployment and management."
  },
  {
    "title": "Quantum Computing Fundamentals",
    "speakers": [
      "Dr. George White"
    ],
    "category": [
      "Quantum Computing",
      "Science"
    ],
    "duration": "1 hour",
    "description": "An introductory session to the principles of quantum computing and its potential impact on various industries."
  },
  {
    "title": "Building Secure APIs",
    "speakers": [
      "Hannah Black",
      "Ivan Petrov"
    ],
    "category": [
      "Security",
      "API",
      "Web Development"
    ],
    "duration": "1 hour",
    "description": "Best practices and common pitfalls in designing and implementing secure Application Programming Interfaces."
  }
];

        const renderSchedule = (filteredTalks) => {
            const scheduleContent = document.getElementById('schedule-content');
            const noResultsMessage = document.getElementById('no-results-message');
            scheduleContent.innerHTML = '';

            if (filteredTalks.length === 0) {
                noResultsMessage.style.display = 'block';
                return;
            } else {
                noResultsMessage.style.display = 'none';
            }

            let currentTime = new Date();
            currentTime.setHours(10, 0, 0, 0); // Start at 10:00 AM

            let talkIndex = 0;
            for (let i = 0; i < 6; i++) {
                const talk = filteredTalks[talkIndex];
                const talkStartTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                currentTime.setMinutes(currentTime.getMinutes() + 60); // 1 hour for the talk
                const talkEndTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                // Constructing HTML string using concatenation instead of template literals to avoid escaping issues
                if (talk) { // Only render talk if it exists in filteredTalks
                    scheduleContent.innerHTML += '' +
                        '<div class="talk" data-categories="' + talk.category.map(c => c.toLowerCase()).join(' ') + '">' +
                            '<div class="time">' + talkStartTime + ' - ' + talkEndTime + '</div>' +
                            '<div class="details">' +
                                '<h3>' + talk.title + '</h3>' +
                                '<p class="speakers">Speaker(s): ' + talk.speakers.join(', ') + '</p>' +
                                '<p class="categories">Categories: ' + talk.category.join(', ') + '</p>' +
                                '<p class="description">' + talk.description + '</p>' +
                            '</div>' +
                        '</div>';
                    talkIndex++;
                }


                if (i === 2) { // After 3rd talk, add lunch break
                    const lunchStartTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    currentTime.setMinutes(currentTime.getMinutes() + 60); // 1 hour for lunch
                    const lunchEndTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    scheduleContent.innerHTML += '' +
                        '<div class="break">' +
                            '<div class="time">' + lunchStartTime + ' - ' + lunchEndTime + '</div>' +
                            '<div class="details">' +
                                '<h3>' + lunchStartTime + ' - ' + lunchEndTime + '</h3>' +
                                '<p>Enjoy your meal!</p>' +
                            '</div>' +
                        '</div>';
                    currentTime.setMinutes(currentTime.getMinutes() + 10); // 10 min transition after lunch
                } else if (i < 5) { // Add transition between talks, not after the last one
                    currentTime.setMinutes(currentTime.getMinutes() + 10); // 10 min transition
                }
            }
        };

        document.addEventListener('DOMContentLoaded', () => {
            renderSchedule(talksData); // Initial render of all talks

            const searchInput = document.getElementById('category-search');
            searchInput.addEventListener('keyup', (event) => {
                const searchTerm = event.target.value.toLowerCase();
                const filteredTalks = talksData.filter(talk =>
                    talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
                );\n                renderSchedule(filteredTalks);\n            });\n        });\n    </script>\n</body>\n</html>