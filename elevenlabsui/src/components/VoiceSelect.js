function VoiceSelect({ voices, value, onChange }) {
  return (
    <div className="mb-3">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
      >
        {voices.length === 0 ? (
          <option>Loading voices...</option>
        ) : (
          voices.map((voice) => (
            <option key={voice.voice_id} value={voice.voice_id}>
              {voice.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
}

export default VoiceSelect;
