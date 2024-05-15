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

  const refetchData = () => Requests.getAllDogs().then(setAllDogs);

  const updateDog = (id: number, isFavorite: boolean) => {
    setIsloading(true);
    return new Promise<void>(() => {
      Requests.updateDog(id, isFavorite)
        .then(() => refetchData())
        .finally(() => setIsloading(false))
        .catch(() => {
          toast.error('Faild to update the Dog, Please try again.', {
            duration: 2000,
          });
        });
    });
  }

  const deleteDog = (id: number) => {
    setIsloading(true);
    return new Promise<void>(() => {
      Requests.deleteDog(id)
        .then(() => {
          refetchData()
            .then(() => {
              toast.success('Dog deleted succesfully.', {
                duration: 2000,
              });
            });
        })
        .finally(() => setIsloading(false))
        .catch(() => {
          toast.error('Faild to delete the Dog, Please try again.', {
            duration: 2000,
          });
        });
    })
  }

  const addDog = (dog: Omit<Dog, "id">) => {
    setIsloading(true);
    return Requests.postDog(dog).then(() => {
      refetchData()
      .then(() => {
        toast.success('Dog created succesfully.', {
          duration: 2000,
        });
      })
      .finally(() => setIsloading(false))
      .catch(() => {
        toast.error('Faild to add a new Dog, Please try again.', {
          duration: 2000,
        });
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
        {activeTab <= 2 && <FunctionalDogs activeTab={activeTab}  allDogs={allDogs}  deleteDog={deleteDog} isLoading={isLoading} updateDog={updateDog} />}
        {activeTab === 3 && <FunctionalCreateDogForm addDog={addDog} isLoading={isLoading} />}
      </FunctionalSection>
    </div>
  );
}
