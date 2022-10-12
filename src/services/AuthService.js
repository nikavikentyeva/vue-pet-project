const API_URL = 'https://dummyjson.com'

class AuthService {
  async LoginUserAndGetToken () {
    let res = await fetch(API_URL + 'auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        username: 'kminchelle',
        password: '0lelplR',
        // expiresInMins: 60, // optional
      })
    })
    return res.json()
  }
}

export default new AuthService()