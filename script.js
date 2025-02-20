document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript loaded correctly.");

    // 🔹 FUNCTION TO SHOW PAGES
    function showPage(pageToShow) {
        console.log(`🔄 Attempting to show: ${pageToShow}`);

        document.querySelectorAll(".page").forEach((page) => {
            page.classList.remove("active");
            page.classList.add("hidden");
        });

        document.getElementById("decryption-success")?.classList.add("hidden");
        document.getElementById("challenge-2-success")?.classList.add("hidden");

        const targetPage = document.getElementById(pageToShow);
        if (targetPage) {
            targetPage.classList.add("active");
            targetPage.classList.remove("hidden");
            console.log(`📌 Successfully showing page: ${pageToShow}`);
        } else {
            console.error(`❌ ERROR: Page '${pageToShow}' not found!`);
        }
    }

    // ✅ Handle Bunker Code Input
    document.getElementById("check-code")?.addEventListener("click", function () {
        console.log("🔍 Checking bunker code...");
        const codeInput = document.getElementById("bunker-code");
        if (codeInput && codeInput.value.trim() === "19423") {
            console.log("✅ Correct code! Unlocking Challenge 1...");
            showPage("challenge-1");
        } else {
            document.getElementById("code-error").classList.remove("hidden");
            console.warn("❌ Incorrect bunker code.");
        }
    });

    // ✅ Handle Decryption Process (Challenge 1)
    document.getElementById("check-decryption")?.addEventListener("click", function () {
        let userAnswer = document.getElementById("decryption-input").value.trim().toLowerCase();
        userAnswer = userAnswer.replace(/[.,]/g, "").replace(/\s+/g, " ");

        const correctMessage = "this is a test message we are offering mexico the territory of texas new mexico and arizona";

        if (userAnswer === correctMessage) {
            console.log("✅ Correct decryption! Unlocking transition page...");
            document.getElementById("decryption-feedback").classList.add("hidden");
            document.getElementById("decryption-success").classList.remove("hidden");

            document.getElementById("go-to-transition").addEventListener("click", function () {
                console.log("🚀 Moving to transition page...");
                showPage("transition-page");
            });
        } else {
            document.getElementById("decryption-feedback").classList.remove("hidden");
        }
    });

    // ✅ Proceed to Challenge 2
    document.getElementById("start-challenge-2")?.addEventListener("click", function () {
        console.log("🚀 Moving to Challenge 2...");
        showPage("challenge-2");
        loadQuestion();
    });

    // ✅ QUIZ LOGIC FOR CHALLENGE 2
    const questions = [
        { question: "What was Germany's strategy in 1917?", answers: ["Total war", "War of attrition", "Defensive retreat"], correct: 1 },
        { question: "Which major event took place in April 1917?", answers: ["Zimmermann Telegram", "U.S. enters the war", "Battle of the Somme"], correct: 1 },
        { question: "What was the significance of the Russian Revolution?", answers: ["Russia exited the war", "Germany surrendered", "Britain gained troops"], correct: 0 },
        { question: "What was the purpose of unrestricted submarine warfare?", answers: ["To attack military fleets", "To cut off Britain's food supply", "To defend German waters"], correct: 1 },
    { question: "What was the Zimmerman Telegram?", answers: ["A peace offer", "A proposal for Mexico to attack the U.S.", "A Russian declaration"], correct: 1 },
    { question: "Why did the U.S. enter the war?", answers: ["German attacks on ships", "Allied request", "A Russian alliance"], correct: 0 },
    { question: "Which battle introduced new air war tactics?", answers: ["Battle of the Marne", "Bloody April", "Battle of Ypres"], correct: 1 },
    { question: "Which offensive led to French mutinies?", answers: ["Nivelle Offensive", "Battle of Verdun", "Somme Offensive"], correct: 0 },
    { question: "What major explosion occurred at Messines Ridge?", answers: ["A German factory explosion", "19 Allied mines detonating", "A Zeppelin attack"], correct: 1 },
    { question: "What was the result of the July Offensive in Russia?", answers: ["A Russian victory", "A massive Russian collapse", "A truce"], correct: 1 },
    { question: "What did the Allies do to counter U-boats?", answers: ["Developed radar", "Grouped ships into convoys", "Built underwater defenses"], correct: 1 },
    { question: "What happened at the Third Battle of Ypres?", answers: ["A quick victory", "Heavy losses in mud", "A German retreat"], correct: 1 },
    { question: "Why did Germany resume unrestricted submarine warfare?", answers: ["To provoke the U.S.", "To starve Britain into surrender", "To gain control of the Atlantic"], correct: 1 },
    { question: "Which American ship was sunk by a German U-boat, pushing the U.S. closer to war?", answers: ["Lusitania", "Housatonic", "Titanic"], correct: 1 },
    { question: "How many ships did German U-boats sink in April 1917?", answers: ["500", "886", "1200"], correct: 1 },
    { question: "What did the Zimmerman Telegram propose?", answers: ["An alliance between Germany and Mexico", "A peace treaty with Russia", "The surrender of Austria-Hungary"], correct: 0 },
    { question: "Who abdicated in Russia as a result of the revolution?", answers: ["Vladimir Lenin", "Tsar Nicholas II", "Joseph Stalin"], correct: 1 },
    { question: "What was the French General Nivelle’s promise before his failed offensive?", answers: ["Victory in 48 hours", "An end to the war", "A stronger defense"], correct: 0 },
    { question: "Why did French soldiers mutiny in 1917?", answers: ["Food shortages", "High casualties with no results", "Poor leadership"], correct: 1 },
    { question: "What major change in British naval strategy helped counter U-boat attacks?", answers: ["Introducing warships", "Grouping ships into convoys", "Using underwater mines"], correct: 1 },
    { question: "What was the impact of the Third Battle of Ypres (Passchendaele)?", answers: ["A German victory", "A massive battle fought in terrible conditions", "The capture of Berlin"], correct: 1 },
    { question: "Which nation declared war on Germany in 1917?", answers: ["Spain", "Brazil", "Turkey"], correct: 1 },
    { question: "What did the Balfour Declaration support?", answers: ["A Jewish homeland in Palestine", "A ceasefire with Germany", "The independence of Poland"], correct: 0 },
    { question: "Why was the British victory at Gaza significant?", answers: ["It ended Ottoman rule in Jerusalem", "It allowed Germany to reinforce its allies", "It stopped U-boat attacks"], correct: 0 },
    { question: "What was the result of the Battle of Caporetto?", answers: ["An Italian victory", "A massive Italian defeat", "A British retreat"], correct: 1 },
    { question: "What event allowed Germany to move troops from the Eastern to the Western Front?", answers: ["The Battle of Cambrai", "The Russian Revolution", "The arrival of U.S. troops"], correct: 1 },
    { question: "What was the major technological innovation used by Britain at the Battle of Cambrai?", answers: ["Poison gas", "Tanks", "Flamethrowers"], correct: 1 }
     ];

    let currentQuestionIndex = 0;

    function loadQuestion() {
        const questionText = document.getElementById("question-text");
        const answersContainer = document.getElementById("answers-container");
        const feedback = document.getElementById("quiz-feedback");
        const nextButton = document.getElementById("next-question");

        feedback.classList.add("hidden");
        nextButton.classList.add("hidden");
        answersContainer.innerHTML = "";

        const q = questions[currentQuestionIndex];
        questionText.innerText = q.question;

        q.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.innerText = answer;
            button.classList.add("answer-button");
            button.addEventListener("click", () => {
                if (index === q.correct) {
                    feedback.innerText = "✅ Correct!";
                    feedback.style.color = "green";
                    nextButton.classList.remove("hidden");
                } else {
                    feedback.innerText = "❌ Incorrect! Try again.";
                    feedback.style.color = "red";
                }
                feedback.classList.remove("hidden");
            });
            answersContainer.appendChild(button);
        });
    }

    document.getElementById("next-question")?.addEventListener("click", function () {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            console.log("✅ All questions answered! Showing Challenge 3 button.");
            document.getElementById("challenge-2-success").classList.remove("hidden");

            const challenge3Button = document.getElementById("go-to-challenge-3");
            challenge3Button.classList.remove("hidden");

            challenge3Button.addEventListener("click", function () {
                console.log("🚀 Moving to Challenge 3...");
                showPage("challenge-3");
                loadRandomLetter();
            });
        }
    });

    // ✅ LETTERS DATA FOR CHALLENGE 3
    const letters = [
        { text: "Today, the trenches are flooded with rain. The mud reaches our knees, and the artillery does not stop...", front: "Western", country: "British", year: "1916" },
        { text: "Our officers are worried. The Germans are pushing hard, and our resources are running low...", front: "Eastern", country: "Russian", year: "1915" },
        { text: "Shells fall all around us. The gas attacks have become unbearable. I have seen comrades choke to death...", front: "Western", country: "French", year: "1917" },
        { text: "The battle rages on. I hear the whistle of our commander, and we rush over the top. It is madness. Bullets zip past, and many do not make it.", front: "Western", country: "German", year: "1915" },
        { text: "I tend to the wounded as best as I can. Some cry for their mothers. The bandages run out, and I am forced to use torn shirts instead.", front: "Western", country: "British", year: "1914" },
        { text: "The cavalry is useless in this terrain, and we dig trenches in frozen ground. Supplies are scarce, and frostbite has already claimed some of my friends.", front: "Eastern", country: "Russian", year: "1916" }
    ];

    let availableLetters = [...letters]; 
    let currentLetter = null; 

    function loadRandomLetter() {
        if (availableLetters.length === 0) {
            console.log("✅ All letters used. Proceed to next section.");
            document.getElementById("next-letter").classList.add("hidden");
            document.getElementById("go-to-next-section").classList.remove("hidden");
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableLetters.length);
        currentLetter = availableLetters.splice(randomIndex, 1)[0];

        document.getElementById("letter-text").innerText = currentLetter.text;
    }

    document.querySelectorAll(".answer-button").forEach((button) => {
        button.addEventListener("click", function () {
            if (!currentLetter) return; 

            const questionType = this.getAttribute("data-question");
            const selectedAnswer = this.getAttribute("data-answer");
            const correctAnswer = currentLetter[questionType];

            if (selectedAnswer === correctAnswer) {
                this.style.backgroundColor = "green";
            } else {
                this.style.backgroundColor = "red";
            }

            checkCompletion();
        });
    });

    function checkCompletion() {
        const selectedAnswers = document.querySelectorAll(".answer-button[style='background-color: green;']");
        if (selectedAnswers.length >= 2) {
            if (availableLetters.length > 0) {
                document.getElementById("next-letter").classList.remove("hidden");
            } else {
                document.getElementById("go-to-next-section").classList.remove("hidden");
            }
        }
    }

    document.getElementById("next-letter")?.addEventListener("click", function () {
        loadRandomLetter();
        document.querySelectorAll(".answer-button").forEach(button => button.style.backgroundColor = "");
        document.getElementById("next-letter").classList.add("hidden");
    });

    document.getElementById("go-to-next-section")?.addEventListener("click", function () {
        showPage("transition-challenge-4");
    });

    document.getElementById("start-challenge-4")?.addEventListener("click", function () {
        showPage("challenge-4");
    });
// ✅ Drag-and-Drop Logic for Timeline
    const timelineEvents = document.querySelectorAll(".timeline-event");
    let draggedItem = null;

    timelineEvents.forEach((event) => {
        event.addEventListener("dragstart", function () {
            draggedItem = this;
            setTimeout(() => (this.style.display = "none"), 0);
        });

        event.addEventListener("dragend", function () {
            setTimeout(() => {
                draggedItem.style.display = "block";
                draggedItem = null;
            }, 0);
        });

        event.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        event.addEventListener("drop", function () {
            if (draggedItem !== this) {
                let parent = this.parentNode;
                let items = Array.from(parent.children);
                let draggedIndex = items.indexOf(draggedItem);
                let droppedIndex = items.indexOf(this);

                if (draggedIndex < droppedIndex) {
                    parent.insertBefore(draggedItem, this.nextSibling);
                } else {
                    parent.insertBefore(draggedItem, this);
                }
            }
        });
    });

    // ✅ Check Timeline Order
    document.getElementById("submit-timeline")?.addEventListener("click", function () {
        const correctOrder = ["1914", "1915", "1916", "1917", "1918", "1918"];
        let userOrder = [];

        document.querySelectorAll(".timeline-event").forEach((event) => {
            userOrder.push(event.getAttribute("data-year"));
        });

        if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
            document.getElementById("timeline-feedback").innerText = "✅ Correct order! You've unlocked the final key.";
            document.getElementById("timeline-feedback").style.color = "green";
            document.getElementById("proceed-after-timeline").classList.remove("hidden");
        } else {
            document.getElementById("timeline-feedback").innerText = "❌ Incorrect order! Try again.";
            document.getElementById("timeline-feedback").style.color = "red";
        }

        document.getElementById("timeline-feedback").classList.remove("hidden");
    });

    // ✅ Proceed to Final Section
    document.getElementById("proceed-after-timeline")?.addEventListener("click", function () {
        showPage("challenge-5-intro");
    });


// ✅ Handle Page Transition to Challenge 5 Map Challenge
document.getElementById("start-challenge-5")?.addEventListener("click", function () {
    showPage("challenge-5"); // This will be the next part where students interact with the map
});

  // ✅ CHALLENGE 5: DRAG AND DROP FUNCTIONALITY (NOW INSIDE THE SAME BLOCK)
    const draggables = document.querySelectorAll(".draggable");
    const dropZones = document.querySelectorAll(".drop-zone");

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", function () {
            draggedItem = this;
            setTimeout(() => (this.style.display = "none"), 0);
        });

        draggable.addEventListener("dragend", function () {
            setTimeout(() => {
                draggedItem.style.display = "block";
                draggedItem = null;
            }, 0);
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        zone.addEventListener("drop", function () {
            if (draggedItem) {
                this.textContent = draggedItem.textContent; // Set dropped text
                this.setAttribute("data-placed", draggedItem.getAttribute("data-location")); // Mark as placed
                draggedItem.style.display = "none"; // Hide after placing
            }
        });
    });

    // ✅ CHECK MAP ANSWERS
    document.getElementById("check-map")?.addEventListener("click", function () {
        const correctPlacements = {
            "zone-saint-quentin": "Saint-Quentin",
            "zone-marne": "Marne River",
            "zone-amiens": "Amiens",
            "zone-compiegne": "Compiègne"
        };

        let allCorrect = true;

        for (let zoneID in correctPlacements) {
            const zone = document.getElementById(zoneID);
            if (zone.getAttribute("data-placed") !== correctPlacements[zoneID]) {
                allCorrect = false;
                zone.style.backgroundColor = "#ff4d4d"; // Red if wrong
            } else {
                zone.style.backgroundColor = "#4CAF50"; // Green if correct
            }
        }

        if (allCorrect) {
            document.getElementById("map-feedback").innerText = "✅ All positions correct!";
            document.getElementById("map-feedback").style.color = "green";
            document.getElementById("proceed-to-next-section").classList.remove("hidden");
        } else {
            document.getElementById("map-feedback").innerText = "❌ Some positions are incorrect. Try again.";
            document.getElementById("map-feedback").style.color = "red";
        }
    });

    // ✅ Proceed to Next Section
    document.getElementById("proceed-to-next-section")?.addEventListener("click", function () {
        showPage("next-section-id"); // Replace with actual next section ID
    });

    console.log("✅ Challenge 5 script initialized successfully.");
});
