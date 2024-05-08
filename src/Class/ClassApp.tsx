import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { Dog } from "../types";

type State = {
  activeTab: number,
  allDogs: [],
}

export class ClassApp extends Component<State> {

  state: State = {
    activeTab: 0,
    allDogs: [],
  }

  componentDidMount(): void {
    this.refetchData();
  }

  refetchData = () => Requests.getAllDogs().then((dogs) => {
    this.setState({allDogs: dogs});
  });

 setActiveTab = (tabIndex: number) => this.setState({activeTab: tabIndex})

  render() {

    const { activeTab, allDogs } = this.state

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
          {activeTab <= 2 && <ClassDogs activeTab={activeTab} allDogs={allDogs} />}
          {activeTab === 3 && <ClassCreateDogForm />}
        </ClassSection>
      </div>
    );
  }
}
