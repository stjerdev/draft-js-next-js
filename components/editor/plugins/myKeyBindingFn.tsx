import { getDefaultKeyBinding, KeyBindingUtil } from "draft-js"
const { hasCommandModifier } = KeyBindingUtil

export function myKeyBindingFn(event): any {
  // we press CTRL + K => return 'bbbold'
  // we use hasCommandModifier instead of checking for CTRL keyCode because different OSs have different command keys
  if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 75) {
    return "bbbold"
  }
  if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 68) {
    return "date"
  }

  return getDefaultKeyBinding(event)
}
