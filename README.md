[![Stories in Ready](https://badge.waffle.io/redfieldstefan/brubuddy.png?label=ready&title=Ready)](https://waffle.io/redfieldstefan/brubuddy)

Brewtorial
=========

#API

##User Routes:

###POST /api/users/create_user

Example input: `{ displayName: 'test', email: 'test@example.com', password: 'foobaz123' }`

###GET /api/users/sign_in

Example input: `'test@example.com:foobaz123'`

###GET /api/users/profile/

Example url: `www.host.com/api/users/profile/`

Example response: `{ email: 'test@example.com', displayName: 'test' }`

###PUT /api/users/:id

Example url: `www.host.com/api/users/123abc`

Example input: `{ displayName: 'new name' }`

###DEL /api/users/:id

Example url: `www.host.com/api/users/123abc`
