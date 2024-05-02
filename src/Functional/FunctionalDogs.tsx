import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export const FunctionalDogs = ({activeTab, allDogs}:{allDogs:Dog[]; activeTab: number}) => {

  const filteredDogs = activeTab === 0 
    ? allDogs
    : allDogs.filter((dog) => activeTab == 1 ? dog.isFavorite : !dog.isFavorite);

    return (
    <>
      {
        <div className="d-flex justify-content-between flex-wrap">
          {filteredDogs.length && filteredDogs.map((dog) => (
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
                alert("clicked trash");
              }}
              onHeartClick={() => {
                alert("clicked heart");
              }}
              onEmptyHeartClick={() => {
                alert("clicked empty heart");
              }}
              isLoading={false}
            />
          ))}
        </div>
      }
    </>
  );
};
