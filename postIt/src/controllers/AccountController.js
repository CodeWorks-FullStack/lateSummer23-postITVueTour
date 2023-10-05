import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { collaboratorsService } from '../services/CollaboratorsService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/collaborators', this.getCollaborationsByAccount)
      .put('', this.updateAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getCollaborationsByAccount(req, res, next) {
    try {
      const collabs = await collaboratorsService.getCollaborationsByAccount(req.userInfo.id)
      res.send(collabs)
    } catch (error) {
      next(error)
    }
  }
  async updateAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(req.userInfo, req.body)
      return res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
