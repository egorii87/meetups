import styles from './LanguageSelector.module.scss';

type LanguageSelectorprops = {
  selectLang: (value: string) => void;
  lang: string;
};

export function LanguageSelector({
  selectLang,
  lang,
}: LanguageSelectorprops): JSX.Element {
  return (
    <div>
      <div>
        <select
          className={styles.select}
          value={lang}
          onChange={(e) => {
            selectLang(e.target.value);
            localStorage.setItem('lang', e.target.value);
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
