document.addEventListener('DOMContentLoaded', function() {
    // Pobierz adres IP klienta z zewnętrznego API
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const userAgent = navigator.userAgent;
            
            // Sformatuj wiadomość w ładny sposób dla Discorda
            const discordMessage = {
                content: null,
                embeds: [{
                    title: "🚨 Nowe wejście na stronę!",
                    color: 16711680, // Kolor czerwony
                    fields: [
                        { name: "🌍 Adres IP", value: `\`${ip}\``, inline: true },
                        { name: "💻 Urządzenie / Platforma", value: `\`${navigator.platform}\``, inline: true },
                        { name: "🔍 Przeglądarka (User Agent)", value: `\`${userAgent}\``, inline: false }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };
            
            // Wklej tutaj swój link do webhooka z Discorda
            const webhookUrl = 'https://discord.com/api/webhooks/1559168046608678924/h29TgyUYzncMrWJvvEolxpoaaLW-QbWC39G57hHYKFYKCfGbEIYYeYF6F3nOi590-CKU';
            
            // Wyślij dane bezpośrednio na Discorda
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(discordMessage)
            })
            .catch(error => {
                console.error('Błąd podczas wysyłania na Discorda:', error);
            });
        })
        .catch(error => {
            console.error('Błąd podczas pobierania IP:', error);
        });
});