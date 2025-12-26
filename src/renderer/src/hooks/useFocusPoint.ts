import { MouseEvent, useEffect, useRef, useState } from 'react'

interface FocusPoint {
  x: number
  y: number
}

interface ReturnFocusPoint {
  focusPoint: FocusPoint | null
  handleFocusClick: (e: MouseEvent<HTMLDivElement>) => void
}

const useFocusPoint = (): ReturnFocusPoint => {
  const [focusPoint, setFocusPoint] = useState<FocusPoint | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleFocusClick = (e: MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setFocusPoint({ x, y })

    timeoutRef.current = setTimeout(() => {
      setFocusPoint(null)
      timeoutRef.current = null
    }, 2000)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return { focusPoint, handleFocusClick }
}

export { useFocusPoint }
