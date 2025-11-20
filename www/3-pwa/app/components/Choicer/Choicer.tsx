import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowUp, faArrowLeft, faPlus, faDownload, faFileImport } from '@fortawesome/free-solid-svg-icons';
import categories from '../../categories.json';

type MenuData = {
  [theme: string]: {
    [country: string]: {
      [show: string]: {
        [season: string]: string[];
      };
    };
  };
};

type ChoicerProps = {
  onSelect?: (selected: { theme: string; country: string; show: string; season: string; episode: string }) => void;
};

const Choicer: React.FC<ChoicerProps> = ({ onSelect }) => {
  const [menuData, setMenuData] = useState<MenuData>({} as MenuData);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    setMenuData(categories);
  }, []);

  useEffect(() => {
    localStorage.setItem('menuData', JSON.stringify(menuData));
  }, [menuData]);

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
    setSelectedCountry(null);
    setSelectedShow(null);
    setSelectedSeason(null);
    setSelectedEpisode(null);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setSelectedShow(null);
    setSelectedSeason(null);
    setSelectedEpisode(null);
  };

  const handleShowSelect = (show: string) => {
    setSelectedShow(show);
    setSelectedSeason(null);
    setSelectedEpisode(null);
  };

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season);
    setSelectedEpisode(null);
  };

  const handleEpisodeSelect = (episode: string) => {
    setSelectedEpisode(episode);
    if (selectedTheme && selectedCountry && selectedShow && selectedSeason && onSelect) {
      onSelect({ theme: selectedTheme, country: selectedCountry, show: selectedShow, season: selectedSeason, episode });
    }
  };

  const addTheme = () => {
    if (newItem.trim() && !menuData[newItem]) {
      setMenuData(prev => ({ ...prev, [newItem]: {} }));
      setNewItem("");
    }
  };

  const deleteTheme = (theme: string) => {
    setMenuData(prev => {
      const updated = { ...prev };
      delete updated[theme];
      return updated;
    });
    if (selectedTheme === theme) {
      setSelectedTheme(null);
      setSelectedCountry(null);
      setSelectedShow(null);
      setSelectedSeason(null);
      setSelectedEpisode(null);
    }
  };

  const addCountry = () => {
    if (selectedTheme && newItem.trim() && !menuData[selectedTheme][newItem]) {
      setMenuData(prev => ({
        ...prev,
        [selectedTheme]: {
          ...prev[selectedTheme],
          [newItem]: {}
        }
      }));
      setNewItem("");
    }
  };

  const deleteCountry = (country: string) => {
    if (selectedTheme) {
      setMenuData(prev => {
        const updated = { ...prev };
        delete updated[selectedTheme][country];
        return updated;
      });
      if (selectedCountry === country) {
        setSelectedCountry(null);
        setSelectedShow(null);
        setSelectedSeason(null);
        setSelectedEpisode(null);
      }
    }
  };

  const addShow = () => {
    if (selectedTheme && selectedCountry && newItem.trim() && !menuData[selectedTheme][selectedCountry][newItem]) {
      setMenuData(prev => ({
        ...prev,
        [selectedTheme]: {
          ...prev[selectedTheme],
          [selectedCountry]: {
            ...prev[selectedTheme][selectedCountry],
            [newItem]: {}
          }
        }
      }));
      setNewItem("");
    }
  };

  const deleteShow = (show: string) => {
    if (selectedTheme && selectedCountry) {
      setMenuData(prev => {
        const updated = { ...prev };
        delete updated[selectedTheme][selectedCountry][show];
        return updated;
      });
      if (selectedShow === show) {
        setSelectedShow(null);
        setSelectedSeason(null);
        setSelectedEpisode(null);
      }
    }
  };

  const addSeason = () => {
    if (selectedTheme && selectedCountry && selectedShow && newItem.trim() && !menuData[selectedTheme][selectedCountry][selectedShow][newItem]) {
      setMenuData(prev => ({
        ...prev,
        [selectedTheme]: {
          ...prev[selectedTheme],
          [selectedCountry]: {
            ...prev[selectedTheme][selectedCountry],
            [selectedShow]: {
              ...prev[selectedTheme][selectedCountry][selectedShow],
              [newItem]: []
            }
          }
        }
      }));
      setNewItem("");
    }
  };

  const addEpisode = () => {
    if (selectedTheme && selectedCountry && selectedShow && selectedSeason && newItem.trim()) {
      setMenuData(prev => ({
        ...prev,
        [selectedTheme]: {
          ...prev[selectedTheme],
          [selectedCountry]: {
            ...prev[selectedTheme][selectedCountry],
            [selectedShow]: {
              ...prev[selectedTheme][selectedCountry][selectedShow],
              [selectedSeason]: [...prev[selectedTheme][selectedCountry][selectedShow][selectedSeason], newItem]
            }
          }
        }
      }));
      setNewItem("");
    }
  };

  const deleteSeason = (season: string) => {
    if (selectedTheme && selectedCountry && selectedShow) {
      setMenuData(prev => {
        const updated = { ...prev };
        delete updated[selectedTheme][selectedCountry][selectedShow][season];
        return updated;
      });
      if (selectedSeason === season) {
        setSelectedSeason(null);
        setSelectedEpisode(null);
      }
    }
  };

  const deleteEpisode = (episode: string) => {
    if (selectedTheme && selectedCountry && selectedShow && selectedSeason) {
      setMenuData(prev => ({
        ...prev,
        [selectedTheme]: {
          ...prev[selectedTheme],
          [selectedCountry]: {
            ...prev[selectedTheme][selectedCountry],
            [selectedShow]: {
              ...prev[selectedTheme][selectedCountry][selectedShow],
              [selectedSeason]: prev[selectedTheme][selectedCountry][selectedShow][selectedSeason].filter(e => e !== episode)
            }
          }
        }
      }));
      if (selectedEpisode === episode) {
        setSelectedEpisode(null);
      }
    }
  };


  const exportData = () => {
    const dataStr = JSON.stringify(menuData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'menuData.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setMenuData(data);
        } catch (err) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 16 }}>
      <button style={editBtnStyle} onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? "Выйти из режима редактирования" : "Режим редактирования"}
      </button>
      {isEditMode && (
        <div style={{ marginTop: 16 }}>
          <button style={addBtnStyle} onClick={exportData}><FontAwesomeIcon icon={faDownload} /> Экспорт в JSON</button>
          <input type="file" accept=".json" onChange={handleImport} style={{ marginLeft: 8 }} />
        </div>
      )}
      {!selectedTheme && (
        <div>
          <h3>Выберите тему</h3>
          {Object.keys(menuData).map(theme => (
            <div key={theme} style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
              <button style={btnStyle} onClick={() => handleThemeSelect(theme)}>
                {theme}
              </button>
              {isEditMode && (
                <button style={deleteBtnStyle} onClick={() => deleteTheme(theme)}><FontAwesomeIcon icon={faTrash} /></button>
              )}
            </div>
          ))}
          {isEditMode && (
            <div style={{ marginTop: 16 }}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Новая тема"
                style={inputStyle}
              />
              <button style={addBtnStyle} onClick={addTheme}><FontAwesomeIcon icon={faPlus} /> Добавить тему</button>
            </div>
          )}
        </div>
      )}
      {selectedTheme && !selectedCountry && (
        <div>
          <button style={backBtnStyle} onClick={() => setSelectedTheme(null)}><FontAwesomeIcon icon={faArrowLeft} /> Назад</button>
          <h3>Выберите страну в теме {selectedTheme}</h3>
          {Object.keys(menuData[selectedTheme]).map(country => (
            <div key={country} style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
              <button style={btnStyle} onClick={() => handleCountrySelect(country)}>
                {country}
              </button>
              {isEditMode && (
                <button style={deleteBtnStyle} onClick={() => deleteCountry(country)}><FontAwesomeIcon icon={faTrash} /></button>
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
              <button style={addBtnStyle} onClick={addCountry}><FontAwesomeIcon icon={faPlus} /> Добавить страну</button>
            </div>
          )}
        </div>
      )}
      {selectedTheme && selectedCountry && !selectedShow && (
        <div>
          <button style={backBtnStyle} onClick={() => setSelectedCountry(null)}><FontAwesomeIcon icon={faArrowLeft} /> Назад</button>
          <h3>Сериалы из {selectedCountry}</h3>
          {Object.keys(menuData[selectedTheme][selectedCountry]).map(show => (
            <div key={show} style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
              <button style={btnStyle} onClick={() => handleShowSelect(show)}>
                {show}
              </button>
              {isEditMode && (
                <button style={deleteBtnStyle} onClick={() => deleteShow(show)}><FontAwesomeIcon icon={faTrash} /></button>
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
              <button style={addBtnStyle} onClick={addShow}><FontAwesomeIcon icon={faPlus} /> Добавить сериал</button>
            </div>
          )}
        </div>
      )}
      {selectedTheme && selectedCountry && selectedShow && !selectedSeason && (
        <div>
          <button style={backBtnStyle} onClick={() => setSelectedShow(null)}><FontAwesomeIcon icon={faArrowLeft} /> Назад</button>
          <h3>Выберите сезон в {selectedShow}</h3>
          {Object.keys(menuData[selectedTheme][selectedCountry][selectedShow]).map(season => (
            <div key={season} style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
              <button style={btnStyle} onClick={() => handleSeasonSelect(season)}>
                {season}
              </button>
              {isEditMode && (
                <button style={deleteBtnStyle} onClick={() => deleteSeason(season)}><FontAwesomeIcon icon={faTrash} /></button>
              )}
            </div>
          ))}
          {isEditMode && (
            <div style={{ marginTop: 16 }}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Новый сезон"
                style={inputStyle}
              />
              <button style={addBtnStyle} onClick={addSeason}><FontAwesomeIcon icon={faPlus} /> Добавить сезон</button>
            </div>
          )}
        </div>
      )}
      {selectedTheme && selectedCountry && selectedShow && selectedSeason && !selectedEpisode && (
        <div>
          <button style={backBtnStyle} onClick={() => setSelectedSeason(null)}><FontAwesomeIcon icon={faArrowLeft} /> Назад</button>
          <h3>Эпизоды {selectedSeason}</h3>
          {menuData[selectedTheme][selectedCountry][selectedShow][selectedSeason].map((episode: string) => (
            <div key={episode} style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
              <button style={btnStyle} onClick={() => handleEpisodeSelect(episode)}>
                {episode}
              </button>
              {isEditMode && (
                <button style={deleteBtnStyle} onClick={() => deleteEpisode(episode)}><FontAwesomeIcon icon={faTrash} /></button>
              )}
            </div>
          ))}
          {isEditMode && (
            <div style={{ marginTop: 16 }}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Новый эпизод"
                style={inputStyle}
              />
              <button style={addBtnStyle} onClick={addEpisode}><FontAwesomeIcon icon={faPlus} /> Добавить эпизод</button>
            </div>
          )}
        </div>
      )}
      {selectedTheme && selectedCountry && selectedShow && selectedSeason && selectedEpisode && (
        <div>
          <button style={backBtnStyle} onClick={() => setSelectedEpisode(null)}><FontAwesomeIcon icon={faArrowLeft} /> Назад</button>
          <h3>Вы выбрали:</h3>
          <div style={{fontSize: 18, margin: "16px 0"}}>
            <strong>{selectedTheme}</strong> → <strong>{selectedCountry}</strong> → <strong>{selectedShow}</strong> → <strong>{selectedSeason}</strong> → <strong>{selectedEpisode}</strong>
          </div>
          <button style={btnStyle} onClick={() => {
            setSelectedTheme(null);
            setSelectedCountry(null);
            setSelectedShow(null);
            setSelectedSeason(null);
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