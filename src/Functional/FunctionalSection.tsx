// you can use this type for react children if you so choose
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

type Props = {
  children: ReactNode,
  activeTab: number,
  allDogs: Dog[],
  setActiveTab: (tabIndex: number) => void
}

export const FunctionalSection: React.FC<Props> = ({ children, activeTab, allDogs, setActiveTab })  => {

  const favoritedDogs = allDogs.filter(dog => dog.isFavorite).length;
  const unfavoritedDogs = allDogs.filter(dog => !dog.isFavorite).length;
  
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display all dogs */}
          <div 
            className={`selector ${activeTab === 0 && 'active'}`} 
            onClick={() => {
              setActiveTab(0);
            }}
          >
            All Dogs ( { allDogs.length } )
          </div>

          {/* This should display the favorited count */}
          <div 
            className={`selector ${activeTab === 1 && 'active'}`} 
            onClick={() => {
              setActiveTab(1);
            }}
          >
            favorited ( { favoritedDogs } )
          </div>

          {/* This should display the unfavorited count */}
          <div 
            className={`selector ${activeTab === 2 && 'active'}`} 
            onClick={() => {
              setActiveTab(2);
            }}
          >
            unfavorited ( { unfavoritedDogs } )
          </div>
          <div 
            className={`selector ${activeTab === 3 && 'active'}`} 
            onClick={() => {
              setActiveTab(3);
            }}
            >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {children}
      </div>
    </section>
  );
};
