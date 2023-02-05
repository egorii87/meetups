import { useState } from 'react';

export const SelectLang = () => {
  const [lang, setLang] = useState<string>('ru');

  return (
    <div className="App-header">
      <div>
        <select
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
          }}
        >
          <option value="ru">Russian</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
};
