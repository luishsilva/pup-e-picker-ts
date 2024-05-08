import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

type ClassDogsProps = {
  allDogs: Dog[],
  activeTab: number,
  updateDog: (id: number, isFavorite: boolean) => Promise<void>,
  deleteDog: (id: number) => Promise<void>,
}

export class ClassDogs extends Component<ClassDogsProps> {
  render() {

    const { allDogs, activeTab, deleteDog, updateDog } = this.props

    const filteredDogs = activeTab === 0 
    ? allDogs
    : allDogs.filter((dog) => activeTab == 1 ? dog.isFavorite : !dog.isFavorite);

    return (
      <>
        { filteredDogs.length && filteredDogs.map((dog) => (
          <DogCard
            dog={{
              description: dog.description,
              id: dog.id,
              image: dog.image,
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
            isLoading={false}
          />
        ))}
      </>
    );
  }
}
