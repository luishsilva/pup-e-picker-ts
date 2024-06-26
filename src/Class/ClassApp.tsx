import { Component } from 'react'
import { ClassSection } from './ClassSection'
import { ClassDogs } from './ClassDogs'
import { ClassCreateDogForm } from './ClassCreateDogForm'
import { Requests } from '../api'
import { Dog } from '../types'
import { toast } from 'react-hot-toast'

type ClassAppStateType = {
  activeTab: number
  allDogs: Dog[]
  isLoading: boolean
}

export class ClassApp extends Component<
  Record<string, never>,
  ClassAppStateType
> {
  state: ClassAppStateType = {
    activeTab: 0,
    allDogs: [],
    isLoading: false,
  }

  componentDidMount(): void {
    this.refetchData()
  }

  refetchData = () =>
    Requests.getAllDogs().then((dogs) => {
      this.setState({ allDogs: dogs })
    })

  setActiveTab = (tabIndex: number) => this.setState({ activeTab: tabIndex })

  updateDog = (id: number, isFavorite: boolean) => {
    this.setState({ isLoading: true })
    return Requests.updateDog(id, isFavorite)
      .then(() => this.refetchData())
      .catch(() => {
        toast.error('Failed to update the Dog, Please try again.', {
          duration: 2000,
        })
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  deleteDog = (id: number) => {
    this.setState({ isLoading: true })
    return Requests.deleteDog(id)
      .then(() => this.refetchData())
      .catch(() => {
        toast.error('Failed to update the Dog, Please try again.', {
          duration: 2000,
        })
      })
      .then(() => {
        toast.success('Dog deleted successfully.', {
          duration: 2000,
        })
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  postDog = (dog: Omit<Dog, 'id'>) => {
    this.setState({ isLoading: true })
    return Requests.postDog(dog)
      .then(() => this.refetchData())
      .catch(() => {
        toast.error('Failed to add a new Dog, Please try again.', {
          duration: 2000,
        })
      })
      .then(() => {
        toast.success('Dog created successfully.', {
          duration: 2000,
        })
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  render() {
    const { activeTab, allDogs, isLoading } = this.state

    return (
      <div className="App" style={{ backgroundColor: 'goldenrod' }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          allDogs={allDogs}
          setActiveTab={this.setActiveTab}
        >
          {activeTab <= 2 && (
            <ClassDogs
              activeTab={activeTab}
              allDogs={allDogs}
              deleteDog={this.deleteDog}
              isLoading={isLoading}
              updateDog={this.updateDog}
            />
          )}
          {activeTab === 3 && (
            <ClassCreateDogForm postDog={this.postDog} isLoading={isLoading} />
          )}
        </ClassSection>
      </div>
    )
  }
}
