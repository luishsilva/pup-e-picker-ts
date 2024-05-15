import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Dog } from '../types';

type ClassSectionProps = {
  activeTab: number;
  allDogs: Dog[];
  children: ReactNode;
  setActiveTab: (tabIndex: number) => void;
};

export class ClassSection extends Component<ClassSectionProps> {
  render() {
    const { activeTab, allDogs, setActiveTab } = this.props;
    const favoritedDogs = allDogs.filter(dog => dog.isFavorite).length;
    const unfavoritedDogs = allDogs.filter(dog => !dog.isFavorite).length;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={'/functional'} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the all Dogs */}
            <div
              className={`selector ${activeTab === 0 && 'active'}`}
              onClick={() => setActiveTab(0)}
            >
              All Dogs ( {allDogs.length} )
            </div>

            {/* This should display the favorited count */}
            <div
              className={`selector ${activeTab === 1 && 'active'}`}
              onClick={() => setActiveTab(1)}
            >
              favorited ( {favoritedDogs} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${activeTab === 2 && 'active'}`}
              onClick={() => setActiveTab(2)}
            >
              unfavorited ( {unfavoritedDogs} )
            </div>
            <div
              className={`selector ${activeTab === 3 && 'active'}`}
              onClick={() => setActiveTab(3)}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{this.props.children}</div>
      </section>
    );
  }
}
