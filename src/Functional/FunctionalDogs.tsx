import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export const FunctionalDogs = ({activeTab, allDogs, updateDog, deleteDog, isLoading} : 
  {
    allDogs:Dog[]; 
    activeTab: number; 
    updateDog: (id: number, isFavorite: boolean) => Promise<void>; 
    deleteDog: (id: number) => Promise<void>,
    isLoading: boolean
  }) => {

  const filteredDogs = activeTab === 0 
    ? allDogs
    : allDogs.filter((dog) => activeTab == 1 ? dog.isFavorite : !dog.isFavorite);

    return (
    <>
      {
        <div className="d-flex justify-content-between flex-wrap">
          {filteredDogs.length > 0 && filteredDogs.map((dog) => (
            <DogCard
              dog={{
                id: dog.id,
                image: dog.image,
                description: dog.description,
                isFavorite: dog.isFavorite,
                name: dog.name,
              }}
              key={dog.id}
              onTrashIconClick={() => {
                deleteDog(dog.id);
              }}
              onHeartClick={() => {
                updateDog(dog.id, false);
              }}
              onEmptyHeartClick={() => {
                updateDog(dog.id, true);
              }}
              isLoading={isLoading}
            />
          ))}
        </div>
      }
    </>
  );
};
