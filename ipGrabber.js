document.addEventListener('DOMContentLoaded', function() {
    // Pobierz adres IP klienta z zewnętrznego API
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const userAgent = navigator.userAgent;
            const platform = navigator.platform;
            
            // Przygotuj dane do wysłania na e-mail przez Formspree
            const formData = {
                subject: "🚨 Nowe wejście na Twoją stronę Mobywatel!",
                ip_address: ip,
                platform: platform,
                user_agent: userAgent,
                time: new Date().toLocaleString()
            };
            
            // TUTAJ WKLEJ SWÓJ UNIKALNY LINK Z FORMSPREE
            const formspreeUrl = 'https://formspree.io/f/mbgdzbzl';
            
            // Wyślij dane do Formspree
            fetch(formspreeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Powiadomienie zostało wysłane!');
                } else {
                    console.error('Błąd wysyłania do Formspree');
                }
            })
            .catch(error => {
                console.error('Błąd:', error);
            });
        })
        .catch(error => {
            console.error('Błąd podczas pobierania IP:', error);
        });
});