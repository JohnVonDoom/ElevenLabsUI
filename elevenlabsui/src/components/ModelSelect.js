const MODELS = [
  { value: 'eleven_v3', label: 'eleven_v3' },
  { value: 'eleven_flash_v2_5', label: 'eleven_flash_v2_5' },
  { value: 'eleven_flash_v2', label: 'eleven_flash_v2' },
  { value: 'eleven_turbo_v2_5', label: 'eleven_turbo_v2_5' },
  { value: 'eleven_turbo_v2', label: 'eleven_turbo_v2' },
  { value: 'eleven_multilingual_v2', label: 'eleven_multilingual_v2' },
  { value: 'eleven_multilingual_v1', label: 'eleven_multilingual_v1' },
  { value: 'eleven_english_sts_v2', label: 'eleven_english_sts_v2' },
  { value: 'eleven_english_sts_v1', label: 'eleven_english_sts_v1' },
];

function ModelSelect({ value, onChange }) {
  return (
    <div className="mb-3">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
      >
        {MODELS.map((model) => (
          <option key={model.value} value={model.value}>
            {model.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModelSelect;
