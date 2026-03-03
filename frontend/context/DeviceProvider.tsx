"use client"

import { createContext, useContext } from "react"
import { useBreakpoints } from "../hooks/useBreakpoints"
import { usePlatform } from "../hooks/usePlatfrom"

const DeviceContext = createContext<any>(null)

export const DeviceProvider = ({ children }: any) => {
  const breakpoints = useBreakpoints()
  const platformData = usePlatform()

  return (
    <DeviceContext.Provider
      value={{ ...breakpoints, ...platformData }}
    >
      {children}
    </DeviceContext.Provider>
  )
}

export const useDevice = () => {
  const context = useContext(DeviceContext)
  if (!context)
    throw new Error("useDevice must be used inside DeviceProvider")
  return context
}
