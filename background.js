// 1. Create the context menu when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "intelligentTranslate",
    title: "Translate (BN <-> EN)", // The text shown in the right-click menu
    contexts: ["selection"] // Show only when text is selected
  });
});

// 2. Listen for when the user clicks the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Check if our menu item was clicked and if there is text selected
  if (info.menuItemId === "intelligentTranslate" && info.selectionText) {
    const selectedText = info.selectionText;

    // --- Enhanced Intelligent Language Detection Logic ---

    // Unicode range for Bengali characters (U+0980 to U+09FF)
    const banglaRegex = /[\u0980-\u09FF]/g;
    const englishRegex = /[a-zA-Z]/g;

    let sourceLang = 'en'; // Default source language
    let targetLang = 'bn'; // Default target language

    // Count characters for each language to determine dominant language
    const banglaMatches = selectedText.match(banglaRegex) || [];
    const englishMatches = selectedText.match(englishRegex) || [];

    const banglaCount = banglaMatches.length;
    const englishCount = englishMatches.length;
    const totalLangChars = banglaCount + englishCount;

    // Use case 1: Dominant Bengali text (or mixed with Bengali majority)
    // Example: "আমি ভালো আছি", "আমি well আছি" (mixed but Bengali dominant)
    if (banglaCount > englishCount) {
      sourceLang = 'bn';
      targetLang = 'en';
    }
    // Use case 2: Dominant English text
    // Example: "I am fine", "I am ভালো" (mixed but English dominant)
    else if (englishCount > banglaCount) {
      sourceLang = 'en';
      targetLang = 'bn';
    }
    // Use case 3: Equal mix or no language characters detected
    // Example: "123", "😊", "###", or perfect 50/50 mix (rare)
    // Let Google auto-detect for best results
    else if (totalLangChars === 0 || banglaCount === englishCount) {
      sourceLang = 'auto';
      targetLang = 'bn'; // Default to Bengali for local users
    }
    // Use case 4: Fallback safety (should rarely reach here)
    else {
      sourceLang = 'auto';
      targetLang = 'en';
    }

    // Prepare the text for the URL (e.g., replace spaces with %20)
    const encodedText = encodeURIComponent(selectedText);

    // Create the dynamic Google Translate URL
    const translateUrl = `https://translate.google.com/?sl=${sourceLang}&tl=${targetLang}&text=${encodedText}&op=translate`;

    // --- *** THIS IS THE MAJOR CHANGE *** ---
    
    // Define properties for the new popup window
    const popupOptions = {
      url: translateUrl,
      type: "popup", // This specifies to open as a small window
      width: 500,    // Set a good width for the translator
      height: 600    // Set a good height
    };

    // Create the new popup window instead of a new tab
    chrome.windows.create(popupOptions);
  }
});