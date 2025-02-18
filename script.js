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

