// you can use this type for react children if you so choose
import React, { ReactNode, Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { ActiveTab, Dog } from '../types'

type Props = {
  children: ReactNode
  activeTab: string
  allDogs: Dog[]
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>
}

export const FunctionalSection: React.FC<Props> = ({
  children,
  activeTab,
  allDogs,
  setActiveTab,
}) => {
  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite).length
  const unfavoritedDogs = allDogs.filter((dog) => !dog.isFavorite).length

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={'/class'} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <div
            className={`selector ${activeTab === 'all-dogs' && 'active'}`}
            onClick={() => {
              setActiveTab('all-dogs')
            }}
          >
            All Dogs ( {allDogs.length} )
          </div>

          <div
            className={`selector ${activeTab === 'favorited' && 'active'}`}
            onClick={() => {
              setActiveTab('favorited')
            }}
          >
            favorited ( {favoritedDogs} )
          </div>

          <div
            className={`selector ${activeTab === 'unfavorited' && 'active'}`}
            onClick={() => {
              setActiveTab('unfavorited')
            }}
          >
            unfavorited ( {unfavoritedDogs} )
          </div>
          <div
            className={`selector ${activeTab === 'create-dog' && 'active'}`}
            onClick={() => {
              setActiveTab('create-dog')
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  )
}
