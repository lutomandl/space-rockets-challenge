import moment from 'moment';

export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp) {
  return moment.parseZone(timestamp).format('MMMM D, YYYY, H:mm:ss A [GMT] Z')
}

export function formatDateTimeLocal(timestamp) {
  return moment(timestamp).format('MMMM D, YYYY, H:mm:ss A [GMT] Z')
}
