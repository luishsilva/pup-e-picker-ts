import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog } from "../types";

export function FunctionalApp() {
  
  const [activeTab, setActiveTab] = useState<number>(0);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs)
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection 
        activeTab={activeTab} 
        allDogs={allDogs}
        setActiveTab={setActiveTab}
      >
        {activeTab <= 2 && <FunctionalDogs activeTab={activeTab}  allDogs={allDogs}/>}
        {activeTab === 3 && <FunctionalCreateDogForm />}
      </FunctionalSection>
    </div>
  );
}
