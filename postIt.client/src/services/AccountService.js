
import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Collaborator } from '../models/Collborator.js'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop.js'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyCollaborations() {
    try {
      const res = await api.get('account/collaborators')
      logger.log('🙆 my collabs', res.data)
      AppState.myCollaborations = res.data.map(collab => new Collaborator(collab))
    } catch (error) {
      Pop.error(error)
    }
  }

  async editAccount(body) {
    try {
      const res = await api.put('account', body)
      // logger.log(res.data, '[UPDATING ACCOUNT]')
      AppState.account = new Account(res.data)
    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
  }

}

export const accountService = new AccountService()
