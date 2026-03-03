import { useEffect, useState } from "react"

export type PlatformType =
  | "ios"
  | "android"
  | "mac"
  | "windows"
  | "unknown"

export const usePlatform = () => {
  const [platform, setPlatform] = useState<PlatformType>("unknown")
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent

    if (/iPad|iPhone|iPod/.test(ua)) setPlatform("ios")
    else if (/Android/.test(ua)) setPlatform("android")
    else if (/Macintosh/.test(ua)) setPlatform("mac")
    else if (/Windows/.test(ua)) setPlatform("windows")
    else setPlatform("unknown")

    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    )
  }, [])

  return { platform, isTouchDevice }
}
