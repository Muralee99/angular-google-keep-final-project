module.exports = {
  users: {
    admin: {password: 'password', scopes: 'notes:all notes:read notes:edit categories:all categories:read categories:edit'.split(' ')},
    stranger: {password: 'password', scopes: 'notes:all notes:read categories:all categories:read'.split(' ')}	
  },
  jwtSecret: '08098grrgaorugh',
  port: 3000,
  enableAuth: true
}
