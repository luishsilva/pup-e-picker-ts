import { DogCard } from '../Shared/DogCard'
import { Component } from 'react'
import { Dog } from '../types'

type ClassDogsProps = {
    allDogs: Dog[]
    activeTab: number
    deleteDog: (id: number) => Promise<void>
    isLoading: boolean
    updateDog: (id: number, isFavorite: boolean) => Promise<void>
}

export class ClassDogs extends Component<ClassDogsProps> {
    render() {
        const { activeTab, allDogs, deleteDog, isLoading, updateDog } =
            this.props

        const filteredDogs =
            activeTab === 0
                ? allDogs
                : allDogs.filter((dog) =>
                      activeTab == 1 ? dog.isFavorite : !dog.isFavorite
                  )

        return (
            <div className="d-flex justify-content-between flex-wrap">
                {filteredDogs.length > 0 &&
                    filteredDogs.map((dog) => (
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
                                deleteDog(dog.id)
                            }}
                            onHeartClick={() => {
                                updateDog(dog.id, false)
                            }}
                            onEmptyHeartClick={() => {
                                updateDog(dog.id, true)
                            }}
                            isLoading={isLoading}
                        />
                    ))}
            </div>
        )
    }
}
