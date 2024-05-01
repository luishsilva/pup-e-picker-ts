import { useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";

export function FunctionalApp() {
  
  const [activeTab, setActiveTab] = useState<number>(1);
  console.log(activeTab)
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      >
        {activeTab < 3 && <FunctionalDogs />}
        {activeTab === 3 && <FunctionalCreateDogForm />}
      </FunctionalSection>
    </div>
  );
}
