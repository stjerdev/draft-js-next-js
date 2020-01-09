import dateFormat from "dateformat"

export const DateTimeFormatter = ({ value }) => {
  if (!value) {
    return ""
  }
  let fechaHora = new Date(value)
  return dateFormat(fechaHora, "dd/mm/yyyy HH:MM") + " hs"
}
export const dateFormatter = ({ value }) => {
  if (!value) {
    return ""
  }
  let fechaHora = new Date(value)
  return dateFormat(fechaHora, "dd/mm/yyyy")
}
