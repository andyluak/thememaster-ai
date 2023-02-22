import React from 'react'
import { TypographyH3 } from '../Typography'

type Props = {
  name: string
}

const PaletteTitle = ({name}: Props) => {
  return (
    <TypographyH3 className="text-lg md:text-xl mt-4">{name}</TypographyH3>
  )
}

export default PaletteTitle