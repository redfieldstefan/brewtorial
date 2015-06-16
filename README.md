[![Stories in Ready](https://badge.waffle.io/redfieldstefan/brubuddy.png?label=ready&title=Ready)](https://waffle.io/redfieldstefan/brubuddy)

Brewtorial
=========

#API

##User Routes:

###POST /api/users/create_user

Example input: `{ displayName: 'test', email: 'test@example.com', password: 'foobaz123' }`

###GET /api/users/sign_in

Example input: `'test@example.com:foobaz123'`

###GET /api/users/profile/:id

Example url: `www.host.com/api/users/profile/123abc`

Example output: `{ email: 'test@example.com', displayName: 'test' }`

###PUT /api/users/update/:id

Example url: `www.host.com/api/users/update/123abc`

Example input: `{ displayName: 'new name' }`

###DEL /api/users/remove/:id

Example url: `www.host.com/api/users/remove/123abc`
