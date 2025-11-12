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

    // --- Intelligent Language Detection Logic ---
    
    // This Regex matches the Unicode range for Bengali characters
    const banglaRegex = /[\u0980-\u09FF]/;

    let sourceLang = 'en'; // Default source language
    let targetLang = 'bn'; // Default target language

    // test() checks if any Bengali character exists in the selected text
    if (banglaRegex.test(selectedText)) {
      // If Bengali found, set source to Bengali (bn) and target to English (en)
      sourceLang = 'bn';
      targetLang = 'en';
    }
    // If no Bengali found, the default (en -> bn) will be used

    // --- End of Logic ---

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