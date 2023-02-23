import React from 'react'
import { Label } from '../Label'
import { Switch } from '../Switch'

type Props = {
  id: string;
}

const AutogenerateShadesInput = ({id}: Props) => {
  return (
    <div className="flex items-center space-x-2">
    <Switch id={id} />
    <Label
      className="cursor-pointer text-xs md:text-base"
      htmlFor={id}
    >
      Autogenerate Shades
    </Label>
  </div>
  )
}

export default AutogenerateShadesInput