import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (value, format = 'lll') => {
  if (value) {
    if (value instanceof Date) {
      return moment(date).format(format)
    } else if (value.toDate) {
      return moment(value.toDate()).format(format)
    }
  }

  return ''
})
