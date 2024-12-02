import { useState } from 'react';

const StartScreen = ({ onStart, onLanguageChange }: { onStart: (name: string) => void, onLanguageChange: (lang: 'sv' | 'en') => void }) => {
    const [name, setName] = useState<string>('');

    const handleStart = () => {
        if (name.trim()) {
            onStart(name.trim());
        }
    };

    return (
        <div className="container">

            <h1>VEM VET MEST?</h1>
            <input
                type="text"
                placeholder="Skriv ditt lagnamn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={15}
            />
            <label>
                <select onChange={(e) => onLanguageChange(e.target.value as 'sv' | 'en')}>
                    <option value="sv">Swedish</option>
                    <option value="en">English</option>
                </select>
            </label>
            <button onClick={handleStart}>Starta</button>
        </div>
    );
};

export default StartScreen;
