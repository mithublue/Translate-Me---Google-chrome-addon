# Translate Me (BN <-> EN)

A lightweight Chrome extension that provides quick and easy translation between English and Bengali with intelligent language detection.

## Features

- **Enhanced Smart Language Detection**: Automatically detects whether the selected text is in English or Bengali using intelligent character counting
- **One-Click Translation**: Simply right-click on any selected text and choose "Translate (BN <-> EN)" from the context menu
- **Mixed Language Support**: Handles text containing both Bengali and English by determining the dominant language
- **Clean Popup Interface**: Opens translations in a clean, focused popup window (500x600px)
- **Preserves Formatting**: Maintains the original text formatting during translation
- **Lightweight**: Minimal impact on browser performance

## Installation

### From Chrome Web Store (Upcoming)
1. Visit the Chrome Web Store listing for "Translate Me (BN <-> EN)"
2. Click "Add to Chrome"
3. Confirm by clicking "Add extension" in the popup

### Manual Installation (for development)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the extension directory
5. The extension is now installed and ready to use

## How to Use

1. **Select Text**: Highlight any text on a webpage
2. **Right-Click**: Right-click on the selected text
3. **Translate**: Choose "Translate (BN <-> EN)" from the context menu
4. **View Translation**: A new popup window will open with the translation

## Supported Languages

- **Source Languages**: English (en), Bengali (bn), Auto-detect
- **Target Languages**: Bengali (bn), English (en)

The extension automatically detects the source language and translates to the other language.

## How Language Detection Works

The extension uses an enhanced character-counting algorithm to intelligently determine the language of your selected text:

### Detection Logic

1. **Pure Bengali Text** → Translates to English
   - Example: "আমি ভালো আছি" → "I am fine"

2. **Pure English Text** → Translates to Bengali
   - Example: "I am fine" → "আমি ভালো আছি"

3. **Mixed Language Text (Bengali Dominant)** → Translates to English
   - Example: "আমি well আছি" (more Bengali characters) → English translation
   - The algorithm counts Bengali vs English characters and chooses based on majority

4. **Mixed Language Text (English Dominant)** → Translates to Bengali
   - Example: "I am ভালো" (more English characters) → Bengali translation

5. **No Language Characters (Numbers, Symbols, Emojis)** → Auto-detect
   - Example: "12345", "😊", "###" → Google Translate auto-detects the language
   - Default target: Bengali (for local users)

6. **Equal Mix** → Auto-detect
   - Rare case where Bengali and English character counts are exactly equal
   - Google Translate handles detection automatically

### Technical Implementation

- Uses Unicode range `\u0980-\u09FF` to identify Bengali characters
- Counts characters using regex matching instead of simple presence check
- More accurate for real-world mixed-language scenarios
- Fallback to auto-detection ensures reliability

### Use Case Examples

| Selected Text | Detected Language | Translates To | Reason |
|---------------|------------------|---------------|---------|
| "আমি খুব ভালো আছি" | Bengali | English | Pure Bengali text |
| "Hello world" | English | Bengali | Pure English text |
| "আমার name হলো John" | Bengali | English | 10 Bengali chars vs 8 English = Bengali dominant |
| "My নাম is John" | English | Bengali | 12 English chars vs 4 Bengali = English dominant |
| "12345" | Auto | Bengali | No language characters detected |
| "😊 ❤️" | Auto | Bengali | Only emojis, no language characters |

## Permissions

This extension requires the following permissions:
- `contextMenus`: To add the translation option to the right-click menu
- `tabs`: To open the translation in a new popup window

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please [open an issue](https://github.com/yourusername/translate-me-extension/issues) on GitHub.

---

*Note: This extension uses Google Translate for translations. Please ensure you have an active internet connection for the translation service to work.*
