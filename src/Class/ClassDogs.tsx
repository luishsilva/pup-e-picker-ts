import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

type ClassDogsProps = {
  allDogs: Dog[]
}

export class ClassDogs extends Component<ClassDogsProps> {
  render() {

    const { allDogs } = this.props

    return (
      <>
        { allDogs.length && allDogs.map((dog) => (
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
      </>
    );
  }
}
