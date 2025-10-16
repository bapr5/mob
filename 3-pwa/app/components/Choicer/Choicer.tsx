import React, { useState } from "react";

type MenuData = {
  [country: string]: {
    [show: string]: string[];
  };
};

const menuData: MenuData = {
  Россия: {
    "Кухня": ["Серия 1", "Серия 2", "Серия 3"],
    "Интерны": ["Серия 1", "Серия 2"],
  },
  США: {
    "Friends": ["Episode 1", "Episode 2"],
    "Breaking Bad": ["Episode 1", "Episode 2", "Episode 3"],
  },
  Япония: {
    "Naruto": ["Эпизод 1", "Эпизод 2"],
    "Attack on Titan": ["Эпизод 1"],
  },
};

type ChoicerProps = {
  onSelect?: (selected: { country: string; show: string; episode: string }) => void;
};

const Choicer: React.FC<ChoicerProps> = ({ onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setSelectedShow(null);
    setSelectedEpisode(null);
  };

  const handleShowSelect = (show: string) => {
    setSelectedShow(show);
    setSelectedEpisode(null);
  };

  const handleEpisodeSelect = (episode: string) => {
    setSelectedEpisode(episode);
    if (selectedCountry && selectedShow && onSelect) {
      onSelect({ country: selectedCountry, show: selectedShow, episode });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 16 }}>
      {!selectedCountry && (
        <div>
          <h3>Выберите страну</h3>
          {Object.keys(menuData).map(country => (
            <button key={country} style={btnStyle} onClick={() => handleCountrySelect(country)}>
              {country}
            </button>
          ))}
        </div>
      )}
      {selectedCountry && !selectedShow && (
        <div>
          <button style={backBtnStyle} onClick={() => setSelectedCountry(null)}>← Назад</button>
          <h3>Сериалы из {selectedCountry}</h3>
          {Object.keys(menuData[selectedCountry]).map(show => (
            <button key={show} style={btnStyle} onClick={() => handleShowSelect(show)}>
              {show}
            </button>
          ))}
        </div>
      )}
      {selectedCountry && selectedShow && !selectedEpisode && (
        <div>
          <button style={backBtnStyle} onClick={() => setSelectedShow(null)}>← Назад</button>
          <h3>{selectedShow}: серии</h3>
          {menuData[selectedCountry][selectedShow].map(episode => (
            <button key={episode} style={btnStyle} onClick={() => handleEpisodeSelect(episode)}>
              {episode}
            </button>
          ))}
        </div>
      )}
      {selectedCountry && selectedShow && selectedEpisode && (
        <div>
          <button style={backBtnStyle} onClick={() => setSelectedEpisode(null)}>← Назад</button>
          <h3>Вы выбрали:</h3>
          <div style={{fontSize: 18, margin: "16px 0"}}>
            <strong>{selectedCountry}</strong> → <strong>{selectedShow}</strong> → <strong>{selectedEpisode}</strong>
          </div>
          <button style={btnStyle} onClick={() => {
            setSelectedCountry(null);
            setSelectedShow(null);
            setSelectedEpisode(null);
          }}>Сбросить выбор</button>
        </div>
      )}
    </div>
  );
};

const btnStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "16px",
  margin: "8px 0",
  fontSize: "18px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  background: "#f7f7f7",
  cursor: "pointer",
};

const backBtnStyle: React.CSSProperties = {
  ...btnStyle,
  background: "#e0e0e0",
  color: "#333",
  fontSize: "16px",
  marginBottom: "12px",
};

export default Choicer;