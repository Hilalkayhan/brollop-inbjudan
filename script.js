// ==================================================
// ELEMENT
// ==================================================

const invitationIntro =
    document.getElementById("invitationIntro");

const invitationCard =
    document.getElementById("invitationCard");

const sealButton =
    document.getElementById("sealButton");

const scrollHint =
    document.getElementById("scrollHint");


// ==================================================
// MUSIK
// ==================================================

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");


// Lagom volym
backgroundMusic.volume = 0.65;


// Vi vill inte loopa låten
backgroundMusic.loop = false;


// ==================================================
// ÖPPNINGSANIMATION
// ==================================================

let invitationOpened = false;

let scrollHelpHidden = false;


// Lås sidan tills inbjudan öppnats
document.body.style.overflow = "hidden";


// ==================================================
// ÖPPNA INBJUDAN
// ==================================================

function openInvitation() {

    if (invitationOpened) {
        return;
    }


    invitationOpened = true;


    // ==================================================
    // STARTA MUSIKEN
    // ==================================================

    // Eftersom detta sker direkt efter att gästen
    // trycker på sigillet tillåter mobilen normalt
    // att ljudet börjar spela.

    backgroundMusic.play()

        .then(() => {

            musicButton.textContent =
                "❚❚";

        })

        .catch(error => {

            console.log(
                "Musiken kunde inte starta:",
                error
            );

            musicButton.textContent =
                "♪";

        });


    // ==================================================
    // STARTA ÖPPNINGSANIMATIONEN
    // ==================================================

    invitationCard.classList.add(
        "open"
    );


    // ==================================================
    // NÄR ANIMATIONEN ÄR KLAR
    // ==================================================

    setTimeout(() => {

        invitationIntro.classList.add(
            "finished"
        );


        // Visa musikknappen
        musicButton.classList.add(
            "visible"
        );


        // Tillåt scrollning
        document.body.style.overflow =
            "";


        // Börja högst upp
        window.scrollTo({

            top: 0,

            behavior: "auto"

        });


        // Visa scrollhjälpen
        setTimeout(() => {

            if (!scrollHelpHidden) {

                scrollHint.classList.add(
                    "visible"
                );

            }

        }, 500);


    }, 3000);

}


// Klick på sigillet
sealButton.addEventListener(
    "click",
    openInvitation
);


// ==================================================
// MUSIKKNAPP
// ==================================================

musicButton.addEventListener(
    "click",

    function () {

        // Om musiken är pausad
        if (backgroundMusic.paused) {

            backgroundMusic.play()

                .then(() => {

                    musicButton.textContent =
                        "❚❚";

                })

                .catch(error => {

                    console.log(
                        "Musiken kunde inte spelas:",
                        error
                    );

                });

        }


        // Om musiken spelar
        else {

            backgroundMusic.pause();

            musicButton.textContent =
                "♪";

        }

    }
);


// ==================================================
// NÄR LÅTEN ÄR SLUT
// ==================================================

backgroundMusic.addEventListener(
    "ended",

    function () {

        // Visa musik-symbolen
        musicButton.textContent =
            "♪";

    }
);


// ==================================================
// DÖLJ SCROLLHJÄLP
// ==================================================

window.addEventListener(
    "scroll",

    function () {

        if (scrollHelpHidden) {
            return;
        }


        if (window.scrollY > 40) {

            scrollHelpHidden =
                true;


            scrollHint.classList.remove(
                "visible"
            );

        }

    },

    {
        passive: true
    }
);


// ==================================================
// NEDRÄKNING
// ==================================================

const weddingDate =
    new Date(
        "2026-11-07T17:00:00"
    );


function updateCountdown() {

    const now =
        new Date();


    const difference =
        weddingDate - now;


    // Om datumet har passerat
    if (difference <= 0) {

        document.getElementById(
            "days"
        ).textContent = "00";


        document.getElementById(
            "hours"
        ).textContent = "00";


        document.getElementById(
            "minutes"
        ).textContent = "00";


        document.getElementById(
            "seconds"
        ).textContent = "00";


        return;
    }


    // ==================================================
    // RÄKNA UT TID
    // ==================================================

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            difference /
            (1000 * 60 * 60)
        ) % 24;


    const minutes =
        Math.floor(
            difference /
            (1000 * 60)
        ) % 60;


    const seconds =
        Math.floor(
            difference / 1000
        ) % 60;


    // ==================================================
    // VISA TID
    // ==================================================

    document.getElementById(
        "days"
    ).textContent =
        String(days).padStart(
            2,
            "0"
        );


    document.getElementById(
        "hours"
    ).textContent =
        String(hours).padStart(
            2,
            "0"
        );


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds).padStart(
            2,
            "0"
        );

}


// Kör direkt
updateCountdown();


// Uppdatera varje sekund
setInterval(
    updateCountdown,
    1000
);


// ==================================================
// SUPABASE
// ==================================================

const SUPABASE_URL =
    "https://srpoqwijijqixphklrsp.supabase.co";


const SUPABASE_KEY =
    "sb_publishable_BQ1_4ADATlbMzQ8Fjxc8Lg_Ew-K1z8O";


const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ==================================================
// OSA ELEMENT
// ==================================================

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );


const attendanceButtons =
    document.querySelectorAll(
        ".attendance-button"
    );


const attendanceInput =
    document.getElementById(
        "attendance"
    );


const guestCountSection =
    document.getElementById(
        "guestCountSection"
    );


const guestCountDisplay =
    document.getElementById(
        "guestCount"
    );


const minusGuest =
    document.getElementById(
        "minusGuest"
    );


const plusGuest =
    document.getElementById(
        "plusGuest"
    );


const confirmation =
    document.getElementById(
        "confirmation"
    );


const formError =
    document.getElementById(
        "formError"
    );


let guestCount = 1;


// ==================================================
// JA / NEJ
// ==================================================

attendanceButtons.forEach(
    button => {

        button.addEventListener(
            "click",

            function () {

                // Ta bort tidigare val
                attendanceButtons.forEach(
                    otherButton => {

                        otherButton.classList.remove(
                            "selected"
                        );

                    }
                );


                // Markera nya valet
                this.classList.add(
                    "selected"
                );


                const selectedValue =
                    this.dataset.value;


                attendanceInput.value =
                    selectedValue;


                // Ta bort eventuellt fel
                formError.textContent =
                    "";


                // ==================================================
                // NEJ
                // ==================================================

                if (
                    selectedValue === "Nej"
                ) {

                    guestCountSection.style.display =
                        "none";

                }


                // ==================================================
                // JA
                // ==================================================

                else {

                    guestCountSection.style.display =
                        "block";

                }

            }
        );

    }
);


// ==================================================
// ÖKA ANTAL GÄSTER
// ==================================================

plusGuest.addEventListener(
    "click",

    function () {

        if (guestCount < 20) {

            guestCount++;


            guestCountDisplay.textContent =
                guestCount;

        }

    }
);


// ==================================================
// MINSKA ANTAL GÄSTER
// ==================================================

minusGuest.addEventListener(
    "click",

    function () {

        if (guestCount > 1) {

            guestCount--;


            guestCountDisplay.textContent =
                guestCount;

        }

    }
);


// ==================================================
// SKICKA OSA
// ==================================================

rsvpForm.addEventListener(
    "submit",

    async function (event) {

        // Stoppa omladdning
        event.preventDefault();


        // Ta bort gammalt fel
        formError.textContent =
            "";


        // ==================================================
        // NAMN
        // ==================================================

        const guestName =
            document
                .getElementById(
                    "guestName"
                )
                .value
                .trim();


        // ==================================================
        // JA / NEJ
        // ==================================================

        const attendance =
            attendanceInput.value;


        // ==================================================
        // KONTROLLERA NAMN
        // ==================================================

        if (!guestName) {

            formError.textContent =
                "Skriv ditt för- och efternamn.";

            return;

        }

        const nameParts =
            guestName
                .split(/\s+/)
                .filter(Boolean)
        
        if (nameParts.length < 2) {
            formError.textContent =
                "Vänligen ange både förnman och efternamn";
            
            return;
        }


        // ==================================================
        // KONTROLLERA SVAR
        // ==================================================

        if (!attendance) {

            formError.textContent =
                "Välj om du kan medverka.";

            return;

        }


        // ==================================================
        // ANTAL PERSONER
        // ==================================================

        let numberOfGuests = 0;


        if (
            attendance === "Ja"
        ) {

            numberOfGuests =
                guestCount;

        }


        if (
            attendance === "Nej"
        ) {

            numberOfGuests =
                0;

        }


        // ==================================================
        // DATA TILL SUPABASE
        // ==================================================

        const rsvpData = {

            name:
                guestName,

            attending:
                attendance,

            guests:
                numberOfGuests

        };


        // ==================================================
        // SKICKA-KNAPP
        // ==================================================

        const submitButton =
            rsvpForm.querySelector(
                ".submit-button"
            );


        submitButton.disabled =
            true;


        submitButton.textContent =
            "Skickar...";


        // ==================================================
        // SKICKA TILL SUPABASE
        // ==================================================

        try {

            const { error } =
                await supabaseClient
                    .from("rsvp")
                    .insert([
                        rsvpData
                    ]);


            // ==================================================
            // FEL FRÅN SUPABASE
            // ==================================================

            if (error) {

                console.error(
                    "Supabase error:",
                    error
                );


                formError.textContent =
                    "Något gick fel. Försök igen.";


                submitButton.disabled =
                    false;


                submitButton.textContent =
                    "Skicka OSA";


                return;

            }


            // ==================================================
            // LYCKADES
            // ==================================================

            console.log(
                "OSA registrerad!"
            );


            // Göm formuläret
            rsvpForm.style.display =
                "none";


            // Visa bekräftelsen
            confirmation.style.display =
                "block";

        }


        // ==================================================
        // ANNAT FEL
        // ==================================================

        catch (error) {

            console.error(
                "Fel vid OSA:",
                error
            );


            formError.textContent =
                "Något gick fel. Kontrollera internetanslutningen och försök igen.";


            submitButton.disabled =
                false;


            submitButton.textContent =
                "Skicka OSA";

        }

    }
);