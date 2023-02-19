import { RefObject, useEffect, useMemo, useState } from 'react'


const useOnViewport = (ref: RefObject<HTMLElement>) => {

  const [isIntersecting, setIntersecting] = useState(false)

  const onClient = !!(typeof window !== 'undefined' && window.document && window.document.createElement)

  const observer = onClient ? useMemo(() => new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  ), [ref]) : null

  useEffect(() => {
    ref.current && observer?.observe(ref.current)

    return () => observer?.disconnect()
  }, [])

  return isIntersecting
}


export default useOnViewport
