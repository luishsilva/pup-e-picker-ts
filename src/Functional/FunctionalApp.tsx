import { useEffect, useState } from 'react'
import { FunctionalCreateDogForm } from './FunctionalCreateDogForm'
import { FunctionalDogs } from './FunctionalDogs'
import { FunctionalSection } from './FunctionalSection'
import { Requests } from '../api'
import { ActiveTab, Dog } from '../types'
import { toast } from 'react-hot-toast'

export function FunctionalApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all-dogs')
  const [allDogs, setAllDogs] = useState<Dog[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    refetchData()
  }, [])

  const refetchData = () => Requests.getAllDogs().then(setAllDogs)

  const updateDog = (id: number, isFavorite: boolean) => {
    setIsLoading(true)
    return Requests.updateDog(id, isFavorite)
      .then(() => refetchData())
      .catch(() => {
        // setAllDogs([]); Setting all dogs to null as suggested will clean the allDogs state and then clear the page with no dogs listed this is the behavior desired?
        toast.error('Error updating dog.', {
          duration: 2000,
        })
      })
      .finally(() => setIsLoading(false))
  }

  const deleteDog = (id: number) => {
    setIsLoading(true)
    return Requests.deleteDog(id)
      .then(() => refetchData())
      .catch(() => {
        toast.error('Error deleting dog.', {
          duration: 2000,
        })
      })
      .then(() => {
        toast.success('Dog deleted successfully.', {
          duration: 2000,
        })
      })
      .finally(() => setIsLoading(false))
  }

  const addDog = (dog: Omit<Dog, 'id'>) => {
    setIsLoading(true)
    return Requests.postDog(dog)
      .then(() => refetchData())
      .catch(() => {
        toast.error('Error adding the dog.', {
          duration: 2000,
        })
      })
      .then(() => {
        toast.success('Dog created successfully.', {
          duration: 2000,
        })
      })
      .finally(() => setIsLoading(false))
  }

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
  )
}
