# ElevenLabs TTS UI - Frontend

This is the React-based user interface for the ElevenLabs text-to-speech application.

For installation and setup instructions, see the main README.md in the project root.

## Interface Overview

The UI provides a clean, minimal interface for generating speech with ElevenLabs API.

### API Key Section

Located at the top of the interface:

- API Key Input: Enter your ElevenLabs API key
- Show/Hide Button: Toggle visibility of your API key
- Clear Button: Remove stored API key from browser

Your API key is stored locally in your browser and only sent directly to ElevenLabs API.

### Text Input

Large text area where you enter the text you want to convert to speech. Supports:
- Plain text
- Emotion commands for v3 model (see below)
- Up to model-specific character limits

### Model Selector

Dropdown menu to choose the ElevenLabs model:

- eleven_v3: Most expressive, 70+ languages, supports emotions
- eleven_turbo_v2_5: Fast, 32 languages, low latency
- eleven_flash_v2_5: Ultra fast, 32 languages
- eleven_multilingual_v2: 29 languages, emotional
- And more options

### Voice Selector

Dropdown menu showing all your available voices:
- Pre-made ElevenLabs voices
- Your cloned voices
- Automatically populated from your account

### Generate Button

Click to convert your text to speech. Shows "Generating..." while processing.

### Audio Player

Appears below the generate button after successful generation. Includes standard controls:
- Play/Pause
- Volume
- Progress bar
- Download option

## How to Use

1. Enter your ElevenLabs API key in the top field
2. Type or paste your text in the text area
3. Select a voice from the dropdown
4. Select a model (eleven_v3 recommended for best quality)
5. Click Generate
6. Audio player appears with your generated speech

## Emotion Commands

When using the eleven_v3 model, you can add emotions using brackets:

- [laugh] - Laughter
- [sigh] - Sighing
- [gasp] - Gasping
- [whisper] - Whispering
- [chuckle] - Light laughter
- And more

Example: "Hello [laugh] this is incredible!"

Note: Emotion commands only work with the eleven_v3 model.

## Tips

- Your API key and selected preferences are saved in browser local storage
- Clear your API key when using shared computers
- Different models have different character limits
- Voice quality varies by model - experiment to find what works best
- The Show/Hide button helps keep your API key private when sharing screen
