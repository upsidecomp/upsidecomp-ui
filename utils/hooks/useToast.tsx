import * as ReactToastify from 'react-toastify'

const CustomTransitions = ReactToastify.cssTransition({
  enter: 'slideInUp',
  exit: 'slideIn',
  collapse: true,
  collapseDuration: 300,
})

const DEFAULT_OPTIONS = {
  transition: CustomTransitions,
}

export const toast = {
  dismiss: () => {
    ReactToastify.toast.dismiss()
  },
  success: (message: any, options = DEFAULT_OPTIONS) => {
    ReactToastify.toast.dismiss()
    ReactToastify.toast.success(message, options)
  },
  error: (message: any, options = DEFAULT_OPTIONS) => {
    ReactToastify.toast.dismiss()
    ReactToastify.toast.error(message, options)
  },
  info: (message: any, options = DEFAULT_OPTIONS) => {
    ReactToastify.toast.dismiss()
    ReactToastify.toast.info(message, options)
  },
  warn: (message: any, options = DEFAULT_OPTIONS) => {
    ReactToastify.toast.dismiss()
    ReactToastify.toast.warn(message, options)
  },
}
