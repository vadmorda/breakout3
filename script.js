document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript loaded correctly.");

    // 🔹 FUNCTION TO SHOW PAGES
    function showPage(pageToShow) {
        console.log(`🔄 Attempting to show: ${pageToShow}`);

        document.querySelectorAll(".page").forEach((page) => {
            page.classList.remove("active");
            page.classList.add("hidden");
        });

        const targetPage = document.getElementById(pageToShow);
        if (targetPage) {
            targetPage.classList.add("active");
            targetPage.classList.remove("hidden");
            console.log(`📌 Successfully showing page: ${pageToShow}`);
        } else {
            console.error(`❌ ERROR: Page '${pageToShow}' not found!`);
        }
    }

    // ✅ INTRO PAGE BUTTON FUNCTIONALITY
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

    // ✅ CHALLENGE 1: Decryption Process
    document.getElementById("check-decryption")?.addEventListener("click", function () {
        let userAnswer = document.getElementById("decryption-input").value.trim().toLowerCase();
        userAnswer = userAnswer.replace(/[.,]/g, "").replace(/\s+/g, " ");

        const correctMessage = "this is a test message we are offering mexico the territory of texas new mexico and arizona";

        if (userAnswer === correctMessage) {
            console.log("✅ Correct decryption! Unlocking transition page...");
            document.getElementById("decryption-feedback").classList.add("hidden");
            document.getElementById("decryption-success").classList.remove("hidden");
        } else {
            document.getElementById("decryption-feedback").classList.remove("hidden");
        }
    });

    // ✅ FIXED: CHALLENGE 1 BUTTON TO TRANSITION PAGE
    document.getElementById("go-to-transition")?.addEventListener("click", function () {
        console.log("🚀 Moving to transition page...");
        showPage("transition-page");
    });

    // ✅ CHALLENGE 2 FUNCTIONALITY
    const questions = [
        { question: "What was Germany's strategy in 1917?", answers: ["Total war", "War of attrition", "Defensive retreat"], correct: 1 },
        { question: "Which major event took place in April 1917?", answers: ["Zimmermann Telegram", "U.S. enters the war", "Battle of the Somme"], correct: 1 },
        { question: "What was the significance of the Russian Revolution?", answers: ["Russia exited the war", "Germany surrendered", "Britain gained troops"], correct: 0 }
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

    document.getElementById("start-challenge-2")?.addEventListener("click", function () {
        console.log("🚀 Moving to Challenge 2...");
        showPage("challenge-2");
        loadQuestion();
    });

    document.getElementById("next-question")?.addEventListener("click", function () {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            console.log("✅ All questions answered! Moving to Challenge 3...");
            showPage("challenge-3");
            loadLetter();
        }
    });

    // ✅ CHALLENGE 3 FUNCTIONALITY
    const letters = [
        { text: "Today, the trenches are flooded with rain. The mud reaches our knees, and the artillery does not stop...", front: "Western", country: "British", year: "1916" },
        { text: "Our officers are worried. The Germans are pushing hard, and our resources are running low...", front: "Eastern", country: "Russian", year: "1915" },
        { text: "Shells fall all around us. The gas attacks have become unbearable. I have seen comrades choke to death...", front: "Western", country: "French", year: "1917" }
    ];

    let currentLetterIndex = 0;

    function loadLetter() {
        if (currentLetterIndex >= letters.length) {
            document.getElementById("next-letter").classList.add("hidden");
            document.getElementById("go-to-next-section").classList.remove("hidden");
            return;
        }

        document.getElementById("letter-text").innerText = letters[currentLetterIndex].text;
        document.querySelectorAll(".answer-button").forEach(button => button.style.backgroundColor = "");
        document.getElementById("next-letter").classList.add("hidden");
    }

    document.querySelectorAll(".answer-button").forEach(button => {
        button.addEventListener("click", function () {
            const questionType = this.getAttribute("data-question");
            const selectedAnswer = this.getAttribute("data-answer");
            const correctAnswer = letters[currentLetterIndex][questionType];

            if (selectedAnswer === correctAnswer) {
                this.style.backgroundColor = "green";
            } else {
                this.style.backgroundColor = "red";
            }

            document.getElementById("next-letter").classList.remove("hidden");
        });
    });

    document.getElementById("next-letter")?.addEventListener("click", function () {
        currentLetterIndex++;
        loadLetter();
    });

    document.getElementById("go-to-next-section")?.addEventListener("click", function () {
        showPage("challenge-4");
    });

    // ✅ CHALLENGE 4: DRAG AND DROP FIXED
    const timelineEvents = document.querySelectorAll(".timeline-event");
    let draggedItem = null;

    timelineEvents.forEach(event => {
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

});

