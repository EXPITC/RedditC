import { useMemo } from 'react'

const formatNumber = (n: number) => {
  const formattedNumber = useMemo(
    () =>
      new Intl.NumberFormat('en-GB', {
        notation: 'compact',
        compactDisplay: 'short'
      }).format(n),
    [n]
  )
  return formattedNumber
}

export default formatNumber
