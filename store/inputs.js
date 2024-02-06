const AvailableReports = require('../server/controllers/availableReports')
export const state = () => {
  return {
    monthMap: {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec'
    },
    isBusy: false,
    isSubmitted: false,
    client: null,
    clients: [],
    clientReports: [],
    annotations: {},
    sections: [],
    overview: [],
    period: null,
    availableReports: {},
    year: null,
    mode: 'Quaterly',
    modes: [
      'Quaterly',
      'Monthly'
    ],
    month: null,
    team: 'da',
    teams: [
      {
        text: 'Digital Advertising',
        id: 'da',
        value: 'da',
        isSelected: true,
        isApproved: false
      },
      {
        text: 'SEO',
        id: 'seo',
        value: 'seo',
        isSelected: false,
        isApproved: false
      },
      {
        text: 'Customer Care',
        id: 'cc',
        value: 'cc',
        isSelected: false,
        isApproved: true
      }
    ]
  }
}

export const actions = {
  init ({ commit }) {
    const availableReports = new AvailableReports()
    const report = availableReports.getAvailableReports()
    const year = new Date().getFullYear()
    commit('ON_UPDATE', { availableReports: report, year })
  },
  onUpdate ({ commit }, payload) {
    commit('ON_UPDATE', payload)
  },
  onNested ({ commit }, payload) {
    commit('ON_NESTED', payload)
  },
  fillClients ({ commit }) {
    this.$axios
      .$get('/api/v1/hub/clients')
      .then(clients => commit('FILL_CLIENTS', clients))
  }
}

export const getters = {
  years (state) {
    return [...Object.keys(state.availableReports)]
  },
  months (state) {
    const months = state.availableReports[state.year].months
      .map(month => ({ text: state.monthMap[month], value: month }))
    return [{ text: 'Select', value: null }, ...months]
  },
  periods (state) {
    const quarters = state.availableReports[state.year].quarters
    return [{ text: 'Select', value: null }, ...quarters]
  },
  monthly (state) {
    return state.mode === 'Monthly'
  },
  selectedDate (state) {
    let val = null
    if (state.year && state.month) {
      const thirtyOne = [1, 3, 5, 7, 8, 10, 12]
      const mo = state.month < 10
        ? `0${state.month}`
        : state.month
      const day = state.month === 2
        ? '28'
        : thirtyOne.includes(state.month)
          ? '31'
          : '30'
      val = {
        from: `${state.year}-${mo}-01`,
        to: `${state.year}-${mo}-${day}`
      }
    }
    return val
  },
  selectedQuarter (state) {
    let val = null
    if (state.year && state.period) {
      const ranges = {
        Q1: { start: '01-01', end: '03-31' },
        Q2: { start: '04-01', end: '06-30' },
        Q3: { start: '07-01', end: '09-30' },
        Q4: { start: '10-01', end: '12-31' }
      }
      val = {
        from: `${state.year}-${ranges[state.period].start}`,
        to: `${state.year}-${ranges[state.period].end}`
      }
    }
    return val
  }
}

export const mutations = {
  ON_UPDATE (state, obj) {
    const keys = Object.keys(obj)
    keys.forEach((key) => {
      state[key] = obj[key]
    })
  },
  ON_NESTED (state, payload) {
    state.teams.forEach((team) => {
      team.isSelected = false
    })
    const i = state.teams.findIndex(team => team.id === payload.id)
    state.teams[i][payload.prop] = payload.value
  },
  FILL_CLIENTS (state, clients) {
    state.clients = clients
  }
}
