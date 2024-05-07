import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

type State = {
  activeTab: number
}

export class ClassApp extends Component<State> {

  state: State = {
    activeTab: 0
  }

 setActiveTab = (tabIndex: number) => this.setState({activeTab: tabIndex})

  render() {

    const { activeTab } = this.state

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          setActiveTab={this.setActiveTab}
        >
          {activeTab <= 2 && <ClassDogs />}
          {activeTab === 3 && <ClassCreateDogForm />}
        </ClassSection>
      </div>
    );
  }
}
