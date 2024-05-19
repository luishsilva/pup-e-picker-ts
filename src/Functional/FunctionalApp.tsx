import { useEffect, useState } from 'react';
import { FunctionalCreateDogForm } from './FunctionalCreateDogForm';
import { FunctionalDogs } from './FunctionalDogs';
import { FunctionalSection } from './FunctionalSection';
import { Requests } from '../api';
import { ActiveTab, Dog } from '../types';
import { toast } from 'react-hot-toast';

export function FunctionalApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all-dogs');
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refetchData();
  }, []);

  const refetchData = () => Requests.getAllDogs().then(setAllDogs);

  const updateDog = (id: number, isFavorite: boolean) => {
    setIsLoading(true);
    return Requests.updateDog(id, isFavorite)
      .then(() => refetchData())
      .finally(() => setIsLoading(false))
      .catch(() => {
        toast.error('Failed to update the Dog, Please try again.', {
          duration: 2000,
        });
      });
  };

  const deleteDog = (id: number) => {
    setIsLoading(true);
    return new Promise<void>(() => {
      Requests.deleteDog(id)
        .then(() => {
          refetchData().then(() => {
            toast.success('Dog deleted successfully.', {
              duration: 2000,
            });
          });
        })
        .finally(() => setIsLoading(false))
        .catch(() => {
          toast.error('Failed to delete the Dog, Please try again.', {
            duration: 2000,
          });
        });
    });
  };

  const addDog = (dog: Omit<Dog, 'id'>) => {
    setIsLoading(true);
    return Requests.postDog(dog)
    .then(() => refetchData())
    .then(() => {
      toast.success('Dog created successfully.', {
        duration: 2000,
      });
    })
    .finally(() => setIsLoading(false));
  };

  return (
    <div className="App" style={{ backgroundColor: 'skyblue' }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        allDogs={allDogs}
        setActiveTab={setActiveTab}
      >
        {activeTab !== 'create-dog' && (
          <FunctionalDogs
            activeTab={activeTab}
            allDogs={allDogs}
            deleteDog={deleteDog}
            isLoading={isLoading}
            updateDog={updateDog}
          />
        )}
        {activeTab === 'create-dog' && (
          <FunctionalCreateDogForm addDog={addDog} isLoading={isLoading} />
        )}
      </FunctionalSection>
    </div>
  );
}
