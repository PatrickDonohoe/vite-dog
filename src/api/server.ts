const token = '9bcd1983-9357-48cc-8a15-b7864cddfd4c'
const endpoint = 'https://flask-dog.onrender.com'
// const endpoint = 'http://127.0.0.1:5000'

export const server_calls = {
  // breed_info routes
  get_breeds_info: async () => {
    const response = await fetch(`${endpoint}/api/info`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data from the server')
    }

    return await response.json()
  },

  get_breed_info: async (breed_id: number) => {
    const response = await fetch(`${endpoint}/api/info/${breed_id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data from the server')
    }

    return await response.json()
  },

  create_breed_info: async (data:any = {}) => {
    const response = await fetch(`${endpoint}/api/info`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to create new data on the server')
    }

    return await response.json()
  },

  update_breed_info: async (breed_id: number, data:any = {}) => {
    const response = await fetch(`${endpoint}/api/info/${breed_id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to update data on the server')
    }

    return await response.json()
  },

  delete_breed_info: async (breed_id:number) => {
    const response = await fetch(`${endpoint}/api/info/${breed_id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error('Failed to delete data from the server')
    }

    return;
  },

  // users routes
  get_users: async () => {
    const response = await fetch(`${endpoint}/api/users`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data from the server')
    }

    return await response.json()
  },

  get_user: async (id:string) => {
    const response = await fetch(`${endpoint}/api/users/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data from the server')
    }

    return await response.json()
  },

  create_user: async (data:any = {}) => {
    const response = await fetch(`${endpoint}/api/users`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to create new data on the server')
    }

    return await response.json()
  },

  update_user: async (id: string, data:any = {}) => {
    const response = await fetch(`${endpoint}/api/users/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to update data on the server')
    }

    return await response.json()
  },

  delete_user: async (id:string) => {
    const response = await fetch(`${endpoint}/api/users/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error('Failed to delete data from the server')
    }

    return;
  },

  // profiles routes
  create_profile: async (data: any = {}) => {
    const response = await fetch(`${endpoint}/api/profiles`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to create data on the server')
    }

    return await response.json()
  },

  // get_profile: async ()

  // notes routes
  get_notes: async ( user_id: string|undefined ) => {
    
    const response = await fetch(`${endpoint}/api/notes/all/${user_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${token}`
        }
      }
    )

    if ( user_id == undefined ) {
      throw new Error('User is unauthenticated.')
    }

    if (!response.ok) {
      throw new Error('Failed to fetch data from the server')
    }

    return await response.json()
  },

  // get_note: async (breedNotes_Id: string) => {
  //   const response = await fetch(`${endpoint}/api/notes${breedNotes_Id}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'x-access-token': `Bearer ${token}`
  //     }
  //   })

  //   if (!response.ok) {
  //     throw new Error('Failed to fetch data from the server')
  //   }

  //   return await response.json()
  // },

  create_note: async (data:any = {}) => {
    const response = await fetch(`${endpoint}/api/notes`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to create new data on the server')
    }

    return await response.json()
  },

  update_note: async (breedNotes_Id: string, data:any = {}) => {
    console.log(breedNotes_Id)
    const response = await fetch(`${endpoint}/api/notes/${breedNotes_Id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to update data on the server')
    }

    return await response.json()
  },

  delete_note: async (breedNotes_Id:string) => {
    const response = await fetch(`${endpoint}/api/notes/${breedNotes_Id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error('Failed to delete data from the server')
    }

    return;
  },

  // dog_dict routes
  get_dogdict: async (dict_breed_name:string[]) => {
    const response = await fetch(`${endpoint}/api/dogdict/${dict_breed_name}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get data from the server')
    }
    
    return await response.json();
  },

  get_dogdicts: async () => {
    const response = await fetch(`${endpoint}/api/dogdict`,
    {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
    })

    if (!response.ok) {
      throw new Error('Failed to get data from the server.')
    }

    return await response.json();
  }
};