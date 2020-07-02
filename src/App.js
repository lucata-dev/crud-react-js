import React, { useState } from 'react';
import UserTable from './Table/UserTable'
import AddUserForm from './Table/AddUserForm'
import EditUserForm from './EditUserForm'

const App = () => {

  const userData = [
    { id : 1, name : 'Tania', username : 'sarasa'},
    { id : 2, name : 'Tania2', username : 'sarasa2'},
    { id : 3, name : 'Tania3', username : 'sarasa3'}
  ]

  const initialFormState = { id: null, name: '', username: '' }

  const[editing, setEditing] = useState(false);

  const [currentUser, setCurrentUser] = useState(initialFormState)

  const [users, setUsers] = useState(userData);

  const addUser = (user) => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = id => (
    setUsers(users.filter(user => user.id !== id))
  )

  const editUser = user => {
    setEditing(true)

    setCurrentUser({
      id : user.id,
      name : user.name,
      username : user.username
    })
  }

  const updateUser = (id, updateUser) => {
    setEditing(false)

    setUsers(users.map(u => (u.id === id ? updateUser : u)))
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
        {
          editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )
        }
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} delete={deleteUser} edit={editUser}/>
        </div>
      </div>
    </div>
  );
}

export default App;
