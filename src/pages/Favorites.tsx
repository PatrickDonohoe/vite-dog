import React, { useState, useEffect } from "react"
import FavoritesTile from "../components/FavoritesTile"
import { server_calls } from "../api/server";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { FavoriteType } from "../types/favoritesType";

const Favorites: React.FC = () => {
  const [favList, setFavList] = useState<FavoriteType[]>([])
  const { user } = useAuth0()

  const getFavList = async () => {
    const data = await server_calls.get_notes(user?.sub)
    console.log(data)
    setFavList(data)
  }
  useEffect(() => {
    getFavList()
  }, [])
  // return favData for each tile or this handled in FavoritesTile.tsx?

  return (
    <div>
      {favList.length ?
        (
          <div className="favorites-tiles">
            {/* get request from get_notes */}
            {favList.map((item, index) => (
              <FavoritesTile
                key={index}
                breedNotes_Id={item.breedNotes_Id}
                notes={item.notes}
                user_id={item.user_id}
                image_id={item.image_id}
              />
            ))}
          </div>
        ) : (<> Loading...</>)}

    </div>
  )
}

export default withAuthenticationRequired(Favorites, { onRedirecting: () => 
  <div>Redirecting you to the login page...</div>, 
});
