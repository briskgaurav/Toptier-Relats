import { SplitText } from 'gsap/SplitText'
import gsap from 'gsap'
gsap.registerPlugin(SplitText)

export function splitTextByChars(selector) {
    return new SplitText(selector, {
      type: 'chars',
      linesClass: 'line'
    });
  }