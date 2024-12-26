// Klasse Sprache UI Version 0.0001
class classSprache {
    constructor() {
        this.titel = "Sprache"; // Add titel property
        //this.createSpracheWindow();
        // MENU.register_to_MENU(this.titel);
        // Registriere ein Objekt mit der MENU_Klick Methode
        MENU.register_to_MENU({
            MENU_Name: this.titel,
            MENU_Klick: this.MENU_Klick.bind(this) // Wichtig: .bind(this) verwenden!
        });
    }

    // ----------------------------- Sprache WinBox ----------------
    createSpracheWindow() {
        let htmlContent = `<div id="google_translate_element"></div>`;
        // Erstelle das Sprachfenster der WinBox zentriert
        this.spracheWindow = new WinBox({
            title: "Sprache wechseln",
            width: 230,
            height: 100,
            html: htmlContent,
            class: ["no-max", "no-full", "no-min"],
            x: "center",
            y: "center",
            // min: true, // Fenster wird minimiert gestartet
            oncreate: () => {
                // Lade das Google Translate Skript nach Erstellung des Fensters
                const script1 = document.createElement('script');
                script1.innerHTML = `
                    function googleTranslateElementInit() {
                        new google.translate.TranslateElement({
                            pageLanguage: 'de'
                        }, 'google_translate_element');
                    }
                `;
                document.body.appendChild(script1);
                const script2 = document.createElement('script');
                script2.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
                document.body.appendChild(script2);
            },
            onclose: () => {
                // Entferne die WinBox-Instanz, wenn das Fenster geschlossen wird
                this.spracheWindow = null;
            }
        });
    }

    MENU_Klick() {  // Add MENU_Klick function
        if (this.spracheWindow) {
            this.spracheWindow.focus(); // Bring the window to front
        } else {
            this.createSpracheWindow(); // Recreate the window if it's closed
        }
    }
}

const meine_sprache = new classSprache();

// EOF  classSprache
