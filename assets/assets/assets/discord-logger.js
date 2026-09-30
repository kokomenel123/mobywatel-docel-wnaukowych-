(function sendDiscordLog() {
    // 1. TUTAJ WKLEJ SWÓJ ADRES WEBHOOKA Z DISCORDA:
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1554958236853997650/-zZgmrtL6JJZ0NSShDQKzA6skuIS0-9EVLSDY9bBYDg8uJ-wfzF4hvrhvfBMQdm7DUnc";

    // Zapobiega wysyłaniu powiadomienia przy każdym odświeżeniu strony w tej samej sesji
    if (sessionStorage.getItem('discord_logged')) return;

    const userAgent = navigator.userAgent;
    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const time = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });

    // Rozpoznawanie typu urządzenia
    let deviceType = "📱 Telefon / Tablet";
    if (!/Mobi|Android|iPhone|iPad/i.test(userAgent)) {
        deviceType = "💻 Komputer / Laptop";
    }

    // Wyciąganie konkretnego modelu / systemu z User-Agenta
    let systemInfo = "Nieznany system";
    if (userAgent.includes("iPhone")) systemInfo = "iPhone (iOS)";
    else if (userAgent.includes("Android")) systemInfo = "Android";
    else if (userAgent.includes("Windows")) systemInfo = "Windows PC";
    else if (userAgent.includes("Macintosh")) systemInfo = "MacBook / Mac";

    const embedData = {
        username: "Logi mObywatel",
        avatar_url: "https://i.imgur.com/U7TRg0V.png",
        embeds: [{
            title: "🔔 Nowe wejście na stronę!",
            color: 3447003, // Niebieski kolor
            fields: [
                { name: "⏰ Czas", value: time, inline: true },
                { name: "📱 Typ", value: deviceType, inline: true },
                { name: "⚙️ System", value: systemInfo, inline: true },
                { name: "🖥 Rozdzielczość", value: screenRes, inline: true },
                { name: "🔍 Pełny User-Agent", value: `\`\`\`${userAgent}\`\`\`` }
            ]
        }]
    };

    fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(embedData)
    }).then(() => {
        sessionStorage.setItem('discord_logged', 'true');
    }).catch(err => console.error("Błąd wysyłania na Discorda:", err));
})();
