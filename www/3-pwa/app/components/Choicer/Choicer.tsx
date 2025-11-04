import React, { useState } from "react";

type MenuData = {
  [country: string]: {
    [show: string]: string[];
  };
};

const initialMenuData: MenuData = {
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
  const [menuData, setMenuData] = useState<MenuData>(initialMenuData);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newItem, setNewItem] = useState("");

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

  const addCountry = () => {
    if (newItem.trim() && !menuData[newItem]) {
      setMenuData(prev => ({ ...prev, [newItem]: {} }));
      setNewItem("");
    }
  };

  const deleteCountry = (country: string) => {
    setMenuData(prev => {
      const updated = { ...prev };
      delete updated[country];
      return updated;
    });
    if (selectedCountry === country) {
      setSelectedCountry(null);
      setSelectedShow(null);
      setSelectedEpisode(null);
    }
  };

  const addShow = () => {
    if (selectedCountry && newItem.trim() && !menuData[selectedCountry][newItem]) {
      setMenuData(prev => ({
        ...prev,
        [selectedCountry]: {
          ...prev[selectedCountry],
          [newItem]: []
        }
      }));
      setNewItem("");
    }
  };

  const deleteShow = (show: string) => {
    if (selectedCountry) {
      setMenuData(prev => {
        const updated = { ...prev };
        delete updated[selectedCountry][show];
        return updated;
      });
      if (selectedShow === show) {
        setSelectedShow(null);
        setSelectedEpisode(null);
      }
    }
  };

  const addEpisode = () => {
    if (selectedCountry && selectedShow && newItem.trim()) {
      setMenuData(prev => ({
        ...prev,
        [selectedCountry]: {
          ...prev[selectedCountry],
          [selectedShow]: [...prev[selectedCountry][selectedShow], newItem]
        }
      }));
      setNewItem("");
    }
  };

  const deleteEpisode = (episode: string) => {
    if (selectedCountry && selectedShow) {
      setMenuData(prev => ({
        ...prev,
        [selectedCountry]: {
          ...prev[selectedCountry],
          [selectedShow]: prev[selectedCountry][selectedShow].filter(e => e !== episode)
        }
      }));
      if (selectedEpisode === episode) {
        setSelectedEpisode(null);
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 16 }}>
      <button style={editBtnStyle} onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? "Выйти из режима редактирования" : "Режим редактирования"}
      </button>
      {!selectedCountry && (
        <div>
          <h3>Выберите страну</h3>
          {Object.keys(menuData).map(country => (
            <div key={country} style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
              <button style={btnStyle} onClick={() => handleCountrySelect(country)}>
                {country}
              </button>
              {isEditMode && (
                <button style={deleteBtnStyle} onClick={() => deleteCountry(country)}>Удалить</button>
              )}
            </div>
          ))}
          {isEditMode && (
            <div style={{ marginTop: 16 }}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Новая страна"
                style={inputStyle}
              />
              <button style={addBtnStyle} onClick={addCountry}>Добавить страну</button>
            </div>
          )}
        </div>
      )}
      {selectedCountry && !selectedShow && (
        <div>
          <button style={backBtnStyle} onClick={() => setSelectedCountry(null)}>← Назад</button>
          <h3>Сериалы из {selectedCountry}</h3>
          {Object.keys(menuData[selectedCountry]).map(show => (
            <div key={show} style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
              <button style={btnStyle} onClick={() => handleShowSelect(show)}>
                {show}
              </button>
              {isEditMode && (
                <button style={deleteBtnStyle} onClick={() => deleteShow(show)}>Удалить</button>
              )}
            </div>
          ))}
          {isEditMode && (
            <div style={{ marginTop: 16 }}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Новый сериал"
                style={inputStyle}
              />
              <button style={addBtnStyle} onClick={addShow}>Добавить сериал</button>
            </div>
          )}
        </div>
      )}
      {selectedCountry && selectedShow && !selectedEpisode && (
        <div>
          <button style={backBtnStyle} onClick={() => setSelectedShow(null)}>← Назад</button>
          <h3>{selectedShow}: серии</h3>
          {menuData[selectedCountry][selectedShow].map(episode => (
            <div key={episode} style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
              <button style={btnStyle} onClick={() => handleEpisodeSelect(episode)}>
                {episode}
              </button>
              {isEditMode && (
                <button style={deleteBtnStyle} onClick={() => deleteEpisode(episode)}>Удалить</button>
              )}
            </div>
          ))}
          {isEditMode && (
            <div style={{ marginTop: 16 }}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Новая серия"
                style={inputStyle}
              />
              <button style={addBtnStyle} onClick={addEpisode}>Добавить серию</button>
            </div>
          )}
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

const editBtnStyle: React.CSSProperties = {
  ...btnStyle,
  background: "#007bff",
  color: "#fff",
  marginBottom: "16px",
};

const deleteBtnStyle: React.CSSProperties = {
  ...btnStyle,
  background: "#dc3545",
  color: "#fff",
  marginLeft: "8px",
  padding: "8px 12px",
  fontSize: "14px",
};

const addBtnStyle: React.CSSProperties = {
  ...btnStyle,
  background: "#28a745",
  color: "#fff",
  marginLeft: "8px",
  padding: "8px 12px",
  fontSize: "14px",
};

const inputStyle: React.CSSProperties = {
  padding: "8px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  marginRight: "8px",
  flex: 1,
};

export default Choicer;