[![Stories in Ready](https://badge.waffle.io/redfieldstefan/brubuddy.png?label=ready&title=Ready)](https://waffle.io/redfieldstefan/brubuddy)

Brewtorial
=========

#API

##User Routes:

###*POST /api/users/create_user*
**Creates a new user**

Example input: `{ displayName: 'test', email: 'test@example.com', password: 'foobaz123' }`

###*GET /api/users/sign_in*
**Signs in an existing user**

Example input: `'test@example.com:foobaz123'`

###*GET /api/users/profile/*
**Fetches signed in user's profile**

Example url: `www.host.com/api/users/profile/`

Example response: `{ email: 'test@example.com', displayName: 'test' }`

###*PUT /api/users/:id*
**Updates user profile**

Example url: `www.host.com/api/users/123abc`

Example input: `{ displayName: 'new name' }`

###*DEL /api/users/:id*
**Deletes user profile**

Example url: `www.host.com/api/users/123abc`

##Recipe Routes:

###*POST /api/recipe*
**Creates a new recipe**

Example input:
```
{
  description: 'Test Recipe',
    header: {
      abv: 4
      brewTime: 400,
      difficulty: 1,
      ibu: 40,
      og: 15,
      style: 'Porter',
      title: 'Test'
    },
    equipment: ['Wort Chiller', 'Glass Carboy'],
    ingredients: [
      {
        item: Hops,
        amount: 4,
        unit: 'Pounds'
      }
    ],
    steps: [
      {
        directions: 'Add hops',
        offset: {
          days: 0,
          hours: 0,
          minutes: 10
        }
      }
    ],
  }
