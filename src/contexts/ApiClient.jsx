
import axios from "axios";
import Cookies from 'js-cookie';
import { Parameters, useConfig } from "../hooks/config/useConfig";

const ACCESS_TOKEN_COOKIE_NAME = "nat";
const REFRESH_TOKEN_COOKIE_NAME = "rat";

export default class ApiClient {

  constructor() {
    this.config = useConfig()
    this.base_url = this.config.get(Parameters.API_URL);
    this.instance = axios.create({
      baseURL: this.base_url
    });
    this._accessToken = undefined;
    this.refreshToken = undefined;
    this.activeOutages = null;
    
  }

  async refreshAccessToken() {
    try {
      if (!this.refreshToken) {
        return false;
      }
      const res = await axios.post(`${this.config.get(Parameters.API_URL)}/auth/refresh`, {
        token: this.refreshToken
      });
      if (res.status === 200) {
        this.accessToken = res.data.access_token;
        this.#saveTokens();
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async initialize() {
    this.#init401Interceptor();
    return await this.connect()
  }

  get accessToken() {
    return this._accessToken;
  }

  set accessToken(newToken) {
    this._accessToken = newToken;
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
  }

  #saveTokens() {
    Cookies.set(ACCESS_TOKEN_COOKIE_NAME, this.accessToken, { expires: 10 });
    Cookies.set(REFRESH_TOKEN_COOKIE_NAME, this.refreshToken, { expires: 365 })
  }

  /**
   * init the authorisation error interceptor
   * will try to refresh the access token if a refresk token exists
   */
  #init401Interceptor() {
    this.instance.interceptors.response.use((response) => {
      return response
    }, async function (error) {
      console.warn('!!!rejected');
      const originalRequest = error.config;
      if (error.config.url !== "/auth/refresh" && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (this.refresh_token && this.refresh_token !== "") {
          const success = await this.refreshAccessToken();
          if (success) {
            originalRequest.headers['Authorization'] = `Bearer ${this.accessToken}`;
          }
          return this.instance(originalRequest);
        }
      }
      return Promise.reject(error);
    });
  }

  /**
   * try to connect user and returns status
   * @returns Boolean true if user is connected, false otherwise
   */
  async connect() {
    var connected = false;
    if (this.accessToken) {
      connected = true;
    } else {
      const access_token = await Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
      if (access_token) {
        this.accessToken = access_token;
        connected = true;
      } else {
        connected = await this.refreshAccessToken();
      }
    }

    return connected;
  }

  /**
   * try to log in an user
   * @param {string} user email of the user to log in
   * @param {string} password activation code of the user to log in
   * @returns {boolean} returns true if user is connected
   */
  async login(email, password) {
    try {
      const res = await axios.post(`${this.config.get(Parameters.API_URL)}/auth/login`, {
        email: email,
        password: password
      });
      if (res.status === 200) {
        this.accessToken = res.data.access_token;
        this.refreshToken = res.data.refresh_token;
        this.#saveTokens();
        Cookies.set("user_email", email, { expires: 365 });
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async postRequest(url, data, config) {
    return this.instance.post(url, data, config)
  }

  async putRequest (url, data, config) {
    return this.instance.put(url, data, config)
  }

  async deleteRequest(url, config) {
    return this.instance.delete(url, config)
  }

  async getRequest(url, config) {
    return this.instance.get(url, config)
  }

  async postHandler(url, data, config) {
    let err = null;
    const resp = await this.postRequest(url, data, config)
      .catch(e => {
        err = e;
      })
    if (err) {
      return [null, err]
    } else if (resp.status >= 200 && resp.status < 205) {
      return [resp.data, null]
    } else {
      console.warn(resp);
      return [resp.data, new Error(resp.statusText)]
    }
  }

  async putHandler(url, payload) {
    let err = null;
    const resp = await this.putRequest(url, payload)
      .catch(e => {
        err = e;
      })
    if (err) {
      return [null, err]
    } else if (resp.status >= 200 && resp.status < 205) {
      return [resp, null]
    } else {
      return [resp.data, new Error(resp.statusText)]
    }
  }

  async deleteHandler(url, config) {
    let err = null;
    const resp = await this.deleteRequest(url, config)
      .catch(e => {
        err = e;
      })
    if (err) {
      return [false, err]
    } else if (resp.status === 204) {
      return [true, null]
    } else {
      return [false, new Error(resp.statusText)]
    }
  }

  /**
   * return the given value as a number if possible, otherwise returns null
   * @param {any} dirty value supposed to be an int
   * @returns {Integer|null}
   */
  cleanInt(dirty) {
    if (!isNaN(dirty)) {
      return Number(dirty);
    } else {
      return null;
    }
  }


  
    async ping() {
      let err = null;
      var res = await axios.get(`${this.config.get(Parameters.API_URL)}/ping`)
        .catch(e => {
          err = e;
        })
      if (err) {
        console.error(err);
      }
      return res.data;
    }


    async getHandler(url, defaultValue) {
      let err = null;
      const res = await this.getRequest(url)
        .catch(e => {
          err = e;
        })
  
      if (err) {
        console.error('getHandler', url, err);
        return [null, err];
      }
  
      if (res.status >= 200 && res.status < 205) {
        return [res.data, null];
      } else {
        return [defaultValue, null];
      }
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  async postContext(outageId, payload) {
    return await this.postHandler('/api/outage/context/' + outageId, payload)
  }



  async postNpsVote(ballotId, payload) {
    return await this.postHandler(`/api/vote/nps/${ballotId}`, payload)
  }

  async getBallot(ballotId) {
    return await this.getHandler('/api/vote/ballot/' + ballotId, null)
  }

  async getNpsResults(ballotId) {
    return await this.getHandler(`/api/vote/nps/counting/${ballotId}`)
  }

  async getFeedStats(outageId) {
    return await this.getHandler('/api/outage/feedbacks/stats/' + outageId, null)
  }




  //user profile

  async getProfile() {
    return await this.getHandler('/api/me/profile', null);
  }

  async getServiceCatalog() {
    return await this.getHandler('/api/services/list', []);
  }

  async getUserServices() {
    return await this.getHandler('/api/me/services', [])
  }

  async saveUserServices(payload) {
    return this.putHandler('/api/me/services', payload)
  }

  async deleteUserService(subscriptionId) {
    if (subscriptionId) {
      let err = null;
      const res = await this.instance.delete(`/api/me/service/${subscriptionId}`)
        .catch(e => {
          err = e;
        })

      if (err) {
        console.error('deleteUserService', err);
        return [null, err]
      }

      if (res.status === 204) {
        return [true, null]
      } else {
        return [false, null]
      }

    } else {
      return [false, null]
    }
  }

  async getNewslink() {
    const [resp, err] = await this.getHandler('/api/home/news', []);
    if (err) {
      return [null, err];
    } else {
      return [resp, null];
    }
  }

  async deleteNewslink(item) {
    if (item === null || item.id === null) {
      return [false, null]
    }
    return await this.deleteHandler('/api/home/news/' + item.id);
  }

  async updateNewslink(item) {
    if (item === null || item.id === null) {
      return [false, null]
    }
    return await this.putHandler('/api/home/news/' + item.id, item);
  }

  async addNewslink(item) {
    if (item === null) {
      return [false, null]
    }
    return await this.postHandler('/api/home/news/', item)
  }

  async getHeadline() {
    const [resp, err] = await this.getHandler('/api/home/headline', []);
    if (err) {
      console.error('getHeadline', err);
      return [null, err];
    } else {
      return [resp, null];
    }
  }

  async getOutages() {
    const [data, err] = await this.getHandler(`/api/outage/list`, [])

    if (err) {
      console.error(err);
    }

    this.activeOutages = data.length;
    return [data, err];
  }


  /**
* retrieves an outage by ID
* @param  {Number} outageID id of the outage
* @return {?JSON}      outage object of null
*/
  async getOutageByID(outageID) {
    return await this.getHandler(`/api/outage/${outageID}`, null)
  }

  /**
* retrieves an outage by ID
* @param  {Number} incident number of the parent incident in snow
* @return {?JSON}      outage object of null
*/
  async getOutageByNumber(inct) {
    return await this.getHandler(`/api/outage/incident/${inct}`, null)
  }

  async getOutageStats(outageID, stat) { //NEXT: code it
    return ([{
      'total': 100,
      'segments': [
        {
          'total': 60,
          'name': 'yes'
        },
        {
          'total': 40,
          'name': 'no'
        }
      ]
    }, null]);
  }

  //return the total number of active outages
  async getActiveCounter() {
    if (!this.activeOutages) {
      this.getOutages().catch(e => {
        console.error(e);
      })
    }
    return [this.activeOutages, null];
  }

  async getMyRoles() {
    return ['admin', 'incident-admin', 'data-admin', 'user-admin'];
    //return this.getHandler('/api/me/roles', []) //NEXT: uncomment and test
  }

  async getUSerRoles(userId) {
    return [
      {
        id: 1,
        name: 'granted role name',
        granted: true
      },
      {
        id: 2,
        name: 'ungranted role',
        granted: false
      }
    ]
  }
  

  async getOutageMilestones(outageId) {
    return await this.getHandler(`/api/outage/milestone/${outageId}`, []);
  }

  async getOutageEvents(outageId) {
    return await this.getHandler(`/api/outage/${outageId}/events`, []);
  }

  async getOutageUsers(outageId) {
    return [null, null]; //NEXT: code it NEVER USED
  }

  async getOutageLocations(outageId) {
    return await this.getHandler(`/api/outage/location/${outageId}/all`, [])
  }

  async getOutageDetails(outageId) {
    return await this.getHandler(`/api/outage/details/${outageId}`, []);
  }

  async getOutageServices(outageId) {
    return await this.getHandler(`/api/outage/services/${outageId}/all`, [])
  }

  async getMaintenances() {
    return await this.getHandler('/api/maintenance/active')
  }

  async addMaintenance(payload) {
    return await this.postHandler('/api/maintenance/new', payload)
  }

  async updateMaintenance(maintenance) {
    return await this.putHandler(`api/maintenance/${maintenance.id}`, maintenance)
  }

  async deleteMaintenance(maintenance) {
    return await this.deleteHandler(`api/maintenance/${maintenance.id}`)
  }

  async addIncident(incident) {
    return await this.postHandler('/api/incident/new', incident)
  }

  async updateIncident(incident) {
    return await this.putHandler(`api/incident/${incident.id}`, incident)
  }

  async deleteIncident(incident) {
    return await this.deleteHandler(`api/incident/${incident.id}`)
  }

  async getIncidents() {
    return await this.getHandler('/api/incident/active')
  }

  async addOutageDetail(outageId, detail) {
    return await this.postHandler(`/api/outage/details/${outageId}`, detail)
  }

  async updateOutageDetail(outageId, detail) {
    return await this.putHandler(`/api/outage/details/${detail.id}`, detail)
  }

  async deleteOutageDetail(outageId, detail) {
    return await this.deleteHandler(`/api/outage/details/${detail.id}`)
  }

  async getOutageEtas(outageId) {
    return await this.getHandler(`/api/outage/eta/${outageId}`)
  }

  async addOutageEta(outageId, eta) {
    if (eta.id) {
      delete eta.id
    }
    if (!eta.latestEta) {
      eta.latestEta = eta.earliestEta
    }
    console.info(eta)   
    return await this.postHandler(`/api/outage/eta/${outageId}`, eta)
  }

  async addOutageEvent(outageId, event) {
    return await this.postHandler(`/api/outage/event/${outageId}`, event)
  }

  async updateOutageEvent(outageId, event) {
    return await this.putHandler(`/api/outage/event/${event.id}`, event)
  }

  async deleteOutageEvent(eventId) {
    return await this.deleteHandler(`/api/outage/event/${eventId}`)
  }

  async addOutageLocation(outageId, payload) {
    console.info('addOutageLocation', payload)
    return await this.postHandler('/api/outage/location', payload)
  }

  async updateOutageLocation(outageId, location) {
    console.log(location)
    return await this.putHandler(`/api/outage/location/${location.id}`, location)
  }

  async deleteOutageLocation(locationId, location) {
    return await this.deleteHandler(`/api/outage/location/${location.id}`)
  }

  async addOutageMilestone(outageId, milestone) {
    const resp = await this.postHandler(`/api/outage/milestone/${outageId}`, milestone)
    return resp
  }

  async updateOutageMilestone(outageId, milestone) {
    return await this.putHandler(`/api/outage/milestone/${milestone.id}`, milestone)
  }

  async deleteOutageMilestone(outageId, milestone) {
    console.info(milestone)
    return await this.deleteHandler(`/api/outage/milestone/${milestone.id}`)
  }

  async addOutageService(outageId, payload) {
    return await this.postHandler('/api/outage/services', payload)
  }

  async updateOutageService(service) {
    return await this.putHandler(`/api/outage/services/${service.id}`, service)
  }

  async deleteOutageService(itemId) {
    return await this.deleteHandler(`/api/outage/services/${itemId}`)
  }

  // async outageStatuses(){ //TODO: memoize
  //   console.info('outageStatuses called')
  //   return await this.getHandler('/api/outage/status/all')
  // }

  // async outageTypes(){ //TODO: code & memoize

  // }

  outageStatusLabel(id) {
    switch (id) {
      case 1:
        return 'préalerte'
      case 2:
        return 'service perturbé'
      case 3:
        return 'correction engagée'
      case 4:
        return 'rétablissement en cours'
      case 5:
        return 'contournement en place'
      case 6:
        return 'au nominal'
      default:
        return ''
    }
  }

  outageTypeLabel(id) {
    switch (id) {
      case 1:
        return 'Interruption'
      case 2:
        return 'préalerte'
      case 3:
        return 'maintenance'
      case 4:
        return 'ralentissement'
      case 5:
        return 'panne fonctionnelle'
      default:
        return '';
    }
  }

  async getMilestones() {
    return await this.getHandler('/api/milestones/all')
  }

  async getEventTypes() {
    return await this.getHandler('/api/events/all')
  }

  async createUsers(users) {
    return users.map(u => {
      return {
        ...u,
        result: true,
        code: 123456
      }
    })
  }

  

}