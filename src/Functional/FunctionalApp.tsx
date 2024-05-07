import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog } from "../types";
import { toast } from 'react-hot-toast';

export function FunctionalApp() {
  
  const [activeTab, setActiveTab] = useState<number>(0);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    refetchData();
  }, []);

  const refetchData = () => {
    return Requests.getAllDogs().then(setAllDogs)
  }

  const updateDog = (id: number, isFavorite: boolean) => {
    return new Promise<void>(() => {
      Requests.updateDog(id, isFavorite)
        .then(() => {
          refetchData()
            .then(() => {
              console.log('Updated...', isFavorite)
            });
        });
    });
  }

  const deleteDog = (id: number) => {
    return new Promise<void>(() => {
      Requests.deleteDog(id)
        .then(() => {
          refetchData()
            .then(() => {
              toast.success('Dog deleted succesfully.', {
                duration: 2000,
              });
            });
        });
    })
  }

  const postDog = (dog: Omit<Dog, "id">) => {
    Requests.postDog(dog).then(() => {
      refetchData()
      .then(() => {
        toast.success('Dog created succesfully.', {
          duration: 2000,
        });
      })
      .finally(() => {
        console.log("Finished....")
      });
    });
  }

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
        {activeTab <= 2 && <FunctionalDogs activeTab={activeTab}  allDogs={allDogs}  deleteDog={deleteDog} updateDog={updateDog} postDog={postDog}/>}
        {activeTab === 3 && <FunctionalCreateDogForm postDog={postDog} />}
      </FunctionalSection>
    </div>
  );
}
