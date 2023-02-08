export function LanguageSelector(
  lang: string,
  sete: React.Dispatch<React.SetStateAction<string>>,
): JSX.Element {
  return (
    <div>
      <div>
        <select
          value={lang}
          onChange={(e) => {
            sete(e.target.value);
          }}
        >
          <option value="ru">Русский</option>
          <option value="ua">Українська</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
}
