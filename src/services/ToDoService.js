const API_URL = 'https://dummyjson.com'

class TodoService {
  async addTask (task) {
    await fetch(API_URL + '/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: task.value,
        completed: false,
        userId: 5,
      })
    })
  }

  async getRandom () {
    let res = await fetch(API_URL + '/todos/random')
    return await res.json()
  }

  async removeTask (id) {
    await fetch(API_URL + '/todos/' + id, {
      method: 'DELETE'
    })
  }

  async editTask (id, task) {
   await fetch(API_URL + '/todos/' + id, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: false,
        todo: task
      })
    })
  }

  async getAll () {
    let res = await fetch(API_URL + '/todos?limit=3')
    return await res.json()
  }

  async getSingle (id) {
    let res = await fetch(API_URL + '/todos/'+ id)
    return await res.json()
  }

  async loadNextTask (func) {
    let res = await fetch(API_URL + '/todos?limit=3&skip=' + func)
    return await res.json()
  }
}

export default new TodoService()