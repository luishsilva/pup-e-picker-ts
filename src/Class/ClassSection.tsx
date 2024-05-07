// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

type ClassSectionProps = {
  activeTab: number,
  children: ReactNode,
  setActiveTab: (tabIndex: number) => void
}

export class ClassSection extends Component<ClassSectionProps> {
  render() {

    const { activeTab, setActiveTab } = this.props;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the all Dogs */}
            <div className={`selector ${activeTab === 0 && 'active'}`} onClick={() => setActiveTab(0)} >
              All Dogs ( 0 )
            </div>

            {/* This should display the favorited count */}
            <div className={`selector ${activeTab === 1 && 'active'}`} onClick={() => setActiveTab(1)} >
              favorited ( 0 )
            </div>

            {/* This should display the unfavorited count */}
            <div className={`selector ${activeTab === 2 && 'active'}`} onClick={() => setActiveTab(2)} >
              unfavorited ( 0 )
            </div>
            <div className={`selector ${activeTab === 3 && 'active'}`} onClick={() => setActiveTab(3)} >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">
          { this.props.children }
        </div>
      </section>
    );
  }
}
