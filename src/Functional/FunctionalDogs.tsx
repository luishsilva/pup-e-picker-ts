import { DogCard } from '../Shared/DogCard'
import { Dog } from '../types'
import { toast } from 'react-hot-toast'

export const FunctionalDogs = ({
  activeTab,
  allDogs,
  updateDog,
  deleteDog,
  isLoading,
}: {
  allDogs: Dog[]
  activeTab: string
  updateDog: (id: number, isFavorite: boolean) => Promise<void>
  deleteDog: (id: number) => Promise<void>
  isLoading: boolean
}) => {
  const filteredDogs =
    activeTab === 'all-dogs'
      ? allDogs
      : allDogs.filter((dog) =>
          activeTab == 'favorited' ? dog.isFavorite : !dog.isFavorite
        )

  return (
    <>
      {
        <div className="d-flex justify-content-between flex-wrap">
          {filteredDogs.length > 0 &&
            filteredDogs.map((dog) => (
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
                  deleteDog(dog.id).catch(() => {
                    toast.error('Failed to delete the Dog, Please try again.', {
                      duration: 2000,
                    })
                  })
                }}
                onHeartClick={() => {
                  updateDog(dog.id, false).catch(() => {
                    toast.error('Failed to update the Dog, Please try again.', {
                      duration: 2000,
                    })
                  })
                }}
                onEmptyHeartClick={() => {
                  updateDog(dog.id, true).catch(() => {
                    toast.error('Failed to update the Dog, Please try again.', {
                      duration: 2000,
                    })
                  })
                }}
                isLoading={isLoading}
              />
            ))}
        </div>
      }
    </>
  )
}
