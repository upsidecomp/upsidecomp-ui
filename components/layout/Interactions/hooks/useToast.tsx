import * as ReactToastify from 'react-toastify'

const CustomTransitions = ReactToastify.cssTransition({
  enter: 'slideInUp',
  exit: 'slideIn',
  duration: [300, 100]
})

const DEFAULT_OPTIONS = {
  transition: CustomTransitions
}

export const toast = {
  dismiss: () => {
    ReactToastify.toast.dismiss()
  },
  success: (message, options = DEFAULT_OPTIONS) => {
    ReactToastify.toast.dismiss()
    ReactToastify.toast.success(message, options)
  },
  error: (message, options = DEFAULT_OPTIONS) => {
    ReactToastify.toast.dismiss()
    ReactToastify.toast.error(message, options)
  },
  info: (message, options = DEFAULT_OPTIONS) => {
    ReactToastify.toast.dismiss()
    ReactToastify.toast.info(message, options)
  },
  warn: (message, options = DEFAULT_OPTIONS) => {
    ReactToastify.toast.dismiss()
    ReactToastify.toast.warn(message, options)
  }
}
