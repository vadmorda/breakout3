document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JavaScript loaded correctly.");

  function showPage(pageToShow) {
    console.log(`🔄 Attempting to show: ${pageToShow}`);
    
    document.querySelectorAll(".page").forEach((page) => {
      page.style.display = "none"; // Hide all pages
    });

    const targetPage = document.getElementById(pageToShow);
    if (targetPage) {
      targetPage.style.display = "block"; // Show the requested page
      console.log(`📌 Successfully showing page: ${pageToShow}`);
    } else {
      console.error(`❌ ERROR: Page '${pageToShow}' not found!`);
    }
  }

  // 🔹 Ensure Breakout Starts at the Intro Page
  showPage("page-intro-3");

  // 🔹 Bunker Code Check
  const codeInput = document.getElementById("bunker-code");
  const checkCodeButton = document.getElementById("check-code");
  const errorMessage = document.getElementById("code-error");

  if (checkCodeButton) {
    checkCodeButton.addEventListener("click", function () {
      console.log("🔍 Checking bunker code...");

      if (codeInput.value.trim() === "19423") { // ✅ Corrected bunker code
        console.log("✅ Correct code! Unlocking Challenge 1...");
        showPage("challenge-1");
      } else {
        errorMessage.classList.remove("hidden");
        console.warn("❌ Incorrect bunker code.");
      }
    });
  }

  // 🔹 Handle the decryption process
  const decryptionInput = document.getElementById("decryption-input");
  const checkDecryptionButton = document.getElementById("check-decryption");
  const decryptionFeedback = document.getElementById("decryption-feedback");
  const decryptionSuccess = document.getElementById("decryption-success");

  if (checkDecryptionButton) {
    checkDecryptionButton.addEventListener("click", function () {
      let userAnswer = decryptionInput.value.trim().toLowerCase();
      userAnswer = userAnswer.replace(/[.,]/g, "").replace(/\s+/g, " ");

      const correctMessage = "this is a test message we are offering mexico the territory of texas new mexico and arizona";

      if (userAnswer === correctMessage) {
        console.log("✅ Correct decryption! Unlocking transition page...");
        decryptionFeedback.classList.add("hidden");
        decryptionSuccess.classList.remove("hidden");

        // 🔹 Make sure the transition button appears
        let transitionButton = document.getElementById("go-to-transition");
        if (transitionButton) {
          transitionButton.style.display = "block"; // ✅ Ensure button is visible
          
          // ✅ Ensure clicking the button moves to transition-page
          transitionButton.addEventListener("click", function () {
            console.log("🚀 Moving to transition page...");
            showPage("transition-page");
          });

        } else {
          console.error("❌ ERROR: Transition button not found in DOM!");
        }
      } else {
        decryptionFeedback.classList.remove("hidden");
      }
    });
  }

  // 🔹 Ensure Challenge 2 is loaded when the student clicks "Proceed to Challenge 2"
  const challenge2Button = document.getElementById("start-challenge-2");
  if (challenge2Button) {
    challenge2Button.addEventListener("click", function () {
      console.log("🚀 Moving to Challenge 2...");
      showPage("challenge-2");
    });
  } else {
    console.error("❌ ERROR: Challenge 2 button not found!");
  }
});
