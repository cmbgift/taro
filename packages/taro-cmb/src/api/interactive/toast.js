import { inlineStyle, interactiveHelper } from '../utils'

const noop = function () {}

export default class Toast {
  options = {
    title: '',
    icon: 'none',
    image: '',
    duration: 1500,
    mask: false,
    success: noop,
    fail: noop,
    complete: noop
  }

  style = {
    maskStyle: {
      'position': 'fixed',
      'z-index': '1000',
      'top': '0',
      'right': '0',
      'left': '0',
      'bottom': '0'
    },
    toastStyle: {
      'z-index': '5000',
      'box-sizing': 'border-box',
      'display': 'flex',
      'flex-direction': 'column',
      'justify-content': 'center',
      '-webkit-justify-content': 'center',
      'position': 'fixed',
      'top': '50%',
      'left': '50%',
      'min-width': '120px',
      'max-width': '200px',
      'min-height': '120px',
      'padding': '7px 20px',
      'transform': 'translate(-50%, -50%)',
      'border-radius': '5px',
      'text-align': 'center',
      'line-height': '1.6',
      'color': '#e4e4e4',
      'background': 'rgba(0, 0, 0, 0.8)'
    },
    successStyle: {
      'margin': '0',
      'vertical-align': 'middle',
      'font-family': 'taro',
      '-webkit-font-smoothing': 'antialiased',
      'color': '#FFFFFF',
      'font-size': '55px',
      'line-height': '1'
    },
    loadingStyle: {
      'margin': '6px auto',
      'width': '38px',
      'height': '38px',
      '-webkit-animation': 'taroLoading 1s linear infinite',
      'animation': 'taroLoading 1s linear infinite',
      'background': 'transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAArlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8tivQqAAAAOnRSTlMABQ1FFgkRPx6VThrVoFwym3NJOi0jzIuDd2BYJ/K3r49+aGM2vFMq99/Dq4dv7Ojkp9rQx8CzbKR74jOHmAAAAmxJREFUSMeN0dl2qkAQheFqmhlFxiCIKKISpzhFMe//YqeKo0mMKP1fsdCP3izgMbVnFm6c52414IEErak8jtbrdb/fz/Ovrzh2k+lrZSXj8TiKfhPX3XjyUyDZxviOxEQ2m03FlWbRiwzDaCJVNUnCBsBsx6CQbLxAVhhT5FSz60MmmP8oXMepTZ9Ld2OnRUWkKDj7I/Jul0iksYeHBQWJIvHY3e24S8QpGl9T4UiSJOHwqwQFGg2eVCZIbHsK3/mXywVFAE/TbRT2QIdrkrMnE8CLLJvI/PY61R67cHhZaA+w6zR9tVrt9xW05BOZq0C5RBypjTBzjtXHyKsRGg6thShMkz7DYIQ5DNrzUJgpXhhE5iBQamIa7jqfz6ORKkIUIp4C/IxFIJTvYRZMsiw7J2IkJVLCOsN8MSJzrAfdGRJdjEhEfBjNMEmMMCIaZEQYiMU1DGan00mYaBScT5joMBI+7E/L5TIUI4qP9WC8xDQxohIpwUXxOREj+hTTwfvEHDFSEpHBQvH2KYsI1qMYwP4NS0SITKLEi4JIxkR2BUgssiiOx0G7UAOKARYdsZPaJlhalkGgA5XiIZ1O1EaslIwCdf0O1TJNClM01m3ksjb8lVDCEE3I4JqH4HA4mC+EHpKR4Lv8gC0W9tNVOhaGMvzEuiQWO0NtFKplWWis+4NXCyK7js0eR6myTET+e/SFxG67PW7uf2KSWhPrj8DYeleTj4+PWW5a15tMkYigaZxsdrZbIsPh8P29y/6LG1GgMdlAcCXv8xshI8HTgu6WBBH3hygMXqXHb7UYlkTIMGhPt6NsxKGu6f//AMNSS+zC75pHAAAAAElFTkSuQmCC) no-repeat',
      'background-size': '100%'
    },
    imageStyle: {
      'margin': '6px auto',
      'width': '40px',
      'height': '40px',
      'background': 'transparent no-repeat',
      'background-size': '100%'
    },
    textStyle: {
      'margin': '0',
      'font-size': '14px'
    }
  }

  create (options = {}) {
    // style
    const { maskStyle, toastStyle, successStyle, loadingStyle, imageStyle, textStyle } = this.style

    // configuration
    const config = {
      ...this.options,
      ...options
    }

    // wrapper
    this.el = document.createElement('div')
    this.el.className = 'taro__toast'
    this.el.style.opacity = '0'
    this.el.style.transition = 'opacity 0.1s linear'

    // mask
    this.mask = document.createElement('div')
    this.mask.setAttribute('style', inlineStyle(maskStyle))
    this.mask.style.display = config.mask ? 'block' : 'none'

    // icon
    this.icon = document.createElement('p')
    if (config.image) {
      this.icon.setAttribute('style', inlineStyle({
        ...imageStyle,
        'background-image': `url(${config.image})`
      }))
    } else {
      const iconStyle = config.icon === 'loading' ? loadingStyle : successStyle
      this.icon.setAttribute('style', inlineStyle({
        ...iconStyle,
        ...(config.icon === 'none' ? { 'display': 'none' } : {})
      }))
      if (config.icon !== 'loading') this.icon.textContent = ''
    }

    // toast
    this.toast = document.createElement('div')
    this.toast.setAttribute('style', inlineStyle({
      ...toastStyle,
      ...(config.icon === 'none' ? {
        'min-height': '0',
        'padding': '7px 20px'
      } : {})
    }))

    // title
    this.title = document.createElement('p')
    this.title.setAttribute('style', inlineStyle(textStyle))
    this.title.textContent = config.title

    // result
    this.toast.appendChild(this.icon)
    this.toast.appendChild(this.title)
    this.el.appendChild(this.mask)
    this.el.appendChild(this.toast)

    // show immediately
    document.body.appendChild(this.el)
    // set body position fixed style
    interactiveHelper().handleAfterCreate()
    setTimeout(() => { this.el.style.opacity = '1' }, 0)
    this.type = config._type

    // disappear after duration
    config.duration >= 0 && this.hide(config.duration, this.type)

    const errMsg = this.type === 'loading' ? 'showLoading:ok' : 'showToast:ok'
    config.success && config.success({ errMsg })
    config.complete && config.complete({ errMsg })
    return Promise.resolve({ errMsg })
  }

  show (options = {}) {
    const config = {
      ...this.options,
      ...options
    }

    if (this.hideOpacityTimer) clearTimeout(this.hideOpacityTimer)
    if (this.hideDisplayTimer) clearTimeout(this.hideDisplayTimer)

    // title
    this.title.textContent = config.title || ''

    // mask
    this.mask.style.display = config.mask ? 'block' : 'none'

    // image
    const { toastStyle, successStyle, loadingStyle, imageStyle } = this.style
    if (config.image) {
      this.icon.setAttribute('style', inlineStyle({
        ...imageStyle,
        'background-image': `url(${config.image})`
      }))
      this.icon.textContent = ''
    } else {
      if (!config.image && config.icon) {
        const iconStyle = config.icon === 'loading' ? loadingStyle : successStyle
        this.icon.setAttribute('style', inlineStyle({
          ...iconStyle,
          ...(config.icon === 'none' ? { 'display': 'none' } : {})
        }))
        this.icon.textContent = config.icon === 'loading' ? '' : ''
      }
    }

    // toast
    this.toast.setAttribute('style', inlineStyle({
      ...toastStyle,
      ...(config.icon === 'none' ? {
        'min-height': '0',
        'padding': '7px 20px'
      } : {})
    }))

    // show
    this.el.style.display = 'block'
    // set body position fixed style
    interactiveHelper().handleAfterCreate()
    setTimeout(() => { this.el.style.opacity = '1' }, 0)
    this.type = config._type

    // disappear after duration
    config.duration >= 0 && this.hide(config.duration, this.type)

    const errMsg = this.type === 'loading' ? 'showLoading:ok' : 'showToast:ok'
    config.success && config.success({ errMsg })
    config.complete && config.complete({ errMsg })
    return Promise.resolve({ errMsg })
  }

  hide (duration = 0, type) {
    if (this.type !== type) return

    if (this.hideOpacityTimer) clearTimeout(this.hideOpacityTimer)
    if (this.hideDisplayTimer) clearTimeout(this.hideDisplayTimer)

    this.hideOpacityTimer = setTimeout(() => {
      this.el.style.opacity = '0'
      // reset body style as default
      interactiveHelper().handleBeforeDestroy()
      this.hideDisplayTimer = setTimeout(() => { this.el.style.display = 'none' }, 100)
    }, duration)
  }
}
