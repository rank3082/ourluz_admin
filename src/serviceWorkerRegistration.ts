export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
        });
    }
}

// export function register() {
//     if ('serviceWorker' in navigator) {
//         window.addEventListener('load', () => {
//             navigator.serviceWorker
//                 .register('/service-worker.js')
//                 .then(registration => {
//                     console.log('ServiceWorker registered:', registration);
//                     // Listen for the beforeinstallprompt event
//                     window.addEventListener('beforeinstallprompt', (event: any) => {
//                         event.preventDefault(); // Prevent the default prompt
//                         const installPrompt = event;
//
//                         // Show a custom install prompt UI or button
//                         // For example, you can display a button to trigger the install prompt
//                         const installButton = document.getElementById('install-button');
//                         if (installButton) {
//                             installButton.style.display = 'block';
//                             installButton.addEventListener('click', () => {
//                                 installPrompt.prompt();
//                                 installPrompt.userChoice.then((choiceResult:any) => {
//                                     if (choiceResult.outcome === 'accepted') {
//                                         console.log('User accepted the install prompt');
//                                     } else {
//                                         console.log('User dismissed the install prompt');
//                                     }
//                                     installButton.style.display = 'none'; // Hide the button
//                                 });
//                             });
//                         }
//                     });
//                 })
//                 .catch(error => {
//                     console.log('ServiceWorker registration failed:', error);
//                 });
//         });
//     }
// }
//
//
