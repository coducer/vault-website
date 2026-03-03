import { useEffect, useState } from "react"

export type ScreenType = "mobile" | "tablet" | "desktop"
export type LayoutMode = "compact" | "expanded"

export const useBreakpoints = () => {
  const getScreenType = (): ScreenType => {
    if (typeof window === "undefined") return "desktop"

    if (window.matchMedia("(max-width: 767px)").matches)
      return "mobile"

    if (
      window.matchMedia("(min-width: 768px) and (max-width: 1023px)")
        .matches
    )
      return "tablet"

    return "desktop"
  }

  const [screenType, setScreenType] =
    useState<ScreenType>(getScreenType)

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)")
    const tablet = window.matchMedia(
      "(min-width: 768px) and (max-width: 1023px)"
    )

    const handler = () => setScreenType(getScreenType())

    mobile.addEventListener("change", handler)
    tablet.addEventListener("change", handler)

    return () => {
      mobile.removeEventListener("change", handler)
      tablet.removeEventListener("change", handler)
    }
  }, [])

  const layoutMode: LayoutMode =
    screenType === "desktop" ? "expanded" : "compact"

  return {
    screenType,
    layoutMode,
    isMobile: screenType === "mobile",
    isTablet: screenType === "tablet",
    isDesktop: screenType === "desktop",
  }
}
