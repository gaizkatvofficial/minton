let player;

function loadSchedule() {
    fetch('https://gaizkatvofficial.github.io/minton/schedule.json')
        .then(response => response.json())
        .then(data => {
            const scheduleList = document.getElementById('scheduleList');
            scheduleList.innerHTML = '';

            for (const category in data) {
                const categoryContainer = document.createElement('div');
                const categoryTitle = document.createElement('h3');
                categoryTitle.classList.add('category-title');
                categoryTitle.textContent = category;
                categoryContainer.appendChild(categoryTitle);

                const ul = document.createElement('ul');
                data[category].forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.setAttribute('data-title', item.title.toLowerCase());
                    listItem.setAttribute('data-category', category.toLowerCase());
                    listItem.setAttribute('data-date', item.date);
                    listItem.innerHTML = `${item.time} - ${item.title} on ${item.date} <br>
                                    <span>Video ID: ${item.videoId}</span>
                                    <button class="copy-btn" onclick="copyToClipboard('${item.videoId}')">
                                        <i class="fas fa-copy"></i> Copy Video ID
                                    </button>`;
                    ul.appendChild(listItem);
                });

                categoryContainer.appendChild(ul);
                scheduleList.appendChild(categoryContainer);
            }
        })
        .catch(error => console.error('Error loading schedule:', error));
}

function searchSchedule() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const scheduleList = document.getElementById('scheduleList');
    const allItems = scheduleList.querySelectorAll('li');

    allItems.forEach(item => {
        const title = item.getAttribute('data-title');
        const category = item.getAttribute('data-category');
        if (title.includes(searchInput) || category.includes(searchInput)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function searchScheduleByDate() {
    const dateInput = document.getElementById('dateInput').value;
    const scheduleList = document.getElementById('scheduleList');
    const allItems = scheduleList.querySelectorAll('li');

    allItems.forEach(item => {
        const date = item.getAttribute('data-date');
        if (date === dateInput) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Video ID copied to clipboard!');
}

document.addEventListener('DOMContentLoaded', () => {
    loadSchedule();
    startClock();
    // Tambahkan animasi untuk elemen-elemen
    document.querySelectorAll('.fade-in, .slide-in').forEach(element => {
        element.classList.add('fade-in');
    });
});

function startClock() {
    const clockElement = document.getElementById('clock');
    setInterval(() => {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString();
    }, 1000);
}

function loadPlayer() {
    const videoId = document.getElementById('videoId').value.trim();

    if (isNaN(videoId) || videoId.length < 4 || videoId.length > 8) {
        document.getElementById('error-message').style.display = 'block';
        return;
    }

    // Inisialisasi JW Player
    jwplayer('player').setup({
        file: `https://tvpull.careryun.com/live/ballbar_${videoId}.m3u8`,
        image: 'https://da.gd/oeye',
        width: '100%',
        height: 'auto',
        autostart: true
    });

    document.getElementById('error-message').style.display = 'none';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function showTutorial(language) {
    const tutorialContent = document.getElementById('tutorialContent');
    const tutorialSummary = `
                    <h2>How to Use Pecintaminton App</h2>
                    <ul>
                        <li><strong>Activate Dark Mode</strong> for visual comfort.</li>
                        <li><strong>Enter Video ID</strong> and click the button to load the video.</li>
                        <li><strong>View the event schedule</strong> and copy the required Video ID for upcoming events.</li>
                        <li><strong>Select the appropriate language tutorial.</strong></li>
                        <li><strong>Join the Telegram group</strong> for more information.</li>
                    </ul>
                `;

    const tutorialSummaryID = `
                    <h2>Cara Menggunakan Aplikasi Pecintaminton</h2>
                    <ul>
                        <li><strong>Aktifkan Mode Gelap</strong> untuk kenyamanan visual.</li>
                        <li><strong>Masukkan Video ID</strong> dan klik tombol untuk memuat video.</li>
                        <li><strong>Lihat jadwal acara</strong> dan salin Video ID yang diperlukan untuk acara mendatang.</li>
                        <li><strong>Pilih tutorial bahasa</strong> yang sesuai.</li>
                        <li><strong>Bergabung dengan grup Telegram</strong> untuk informasi lebih lanjut.</li>
                    </ul>
                `;

    if (language === 'en') {
        tutorialContent.innerHTML = tutorialSummary;
    } else {
        tutorialContent.innerHTML = tutorialSummaryID;
    }
}
