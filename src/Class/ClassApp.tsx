import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { Dog } from "../types";
import { toast } from "react-hot-toast";

type State = {
  activeTab: number,
  allDogs: Dog[],
  isLoading: boolean,
}

export class ClassApp extends Component<State> {

  state: State = {
    activeTab: 0,
    allDogs: [],
    isLoading: false,
  }

  componentDidMount(): void {
    this.refetchData();
  }

  refetchData = () => Requests.getAllDogs().then((dogs) => {
    this.setState({allDogs: dogs});
  });

 setActiveTab = (tabIndex: number) => this.setState({activeTab: tabIndex})

 updateDog = (id: number, isFavorite: boolean) => {
  // should set is log to true
  return new Promise<void>(() => {
    Requests.updateDog(id, isFavorite)
      .then(() => this.refetchData())
      //.finally(() => console.log('sould set is log to false'))
      .catch(() => {
        toast.error('Faild to update the Dog, Please try again.', {
          duration: 2000,
        });
      });
  });
}

  deleteDog = (id: number) => {
    this.setState({ isLoading: true });
    return new Promise<void>(() => {
      Requests.deleteDog(id)
        .then(() => {
          this.refetchData()
            .then(() => {
              toast.success('Dog deleted succesfully.', {
                duration: 2000,
              });
            });
        })
        .finally(() => this.setState({ isLoading: true }))
        .catch(() => {
          toast.error('Faild to delete the Dog, Please try again.', {
            duration: 2000,
          });
        });
    })
  }

  render() {

    const { activeTab, allDogs, isLoading } = this.state

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          allDogs={allDogs}
          setActiveTab={this.setActiveTab}
        >
          {activeTab <= 2 && <ClassDogs activeTab={activeTab} allDogs={allDogs} deleteDog={this.deleteDog} updateDog={this.updateDog} />}
          {activeTab === 3 && <ClassCreateDogForm />}
        </ClassSection>
      </div>
    );
  }
}
