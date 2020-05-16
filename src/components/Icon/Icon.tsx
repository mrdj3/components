import React, { CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core'
import { IconType } from './interfaces'

// maps between hospital run icon names and font awesome
const iconMap = {
  add: 'plus',
  admin: 'user-shield',
  appointment: 'calendar',
  'appointment-add': 'calendar-plus',
  'appointment-remove': 'calendar-minus',
  calendar: 'calendar-alt',
  dashboard: 'columns',
  'down-arrow': 'chevron-down',
  edit: 'edit',
  image: 'camera',
  incident: 'file-alt',
  lab: 'microscope',
  'left-arrow': 'chevron-left',
  medication: 'pills',
  patient: 'user',
  'patient-add': 'user-plus',
  'patient-remove': 'user-minus',
  patients: 'users',
  remove: 'minus',
  'right-arrow': 'chevron-right',
  save: 'save',
  setting: 'cog',
  'up-arrow': 'chevron-up',
}

function getFontAwesomeIcon(icon: IconType): string {
  return iconMap[icon]
}

interface Props {
  /** The type of icon to display */
  icon: IconType
  /** Outline version or filled-in version. Note some icons may be missing outline version. */
  outline?: boolean
  /**
   * Defines the class of the icon.
   */
  className?: string
  /**
   * Defines the style of the icon.
   */
  style?: CSSProperties
  /** Function to execute when user clicks on icon */
  onClick?: (event: React.MouseEvent<any>) => void
}

/**
 * Icons provide contextual clues to users to make it easier to recognize functionality
 */
const Icon = (props: Props) => {
  const { icon, outline, className, style, onClick } = props
  const iconPrefix = (outline ? 'far' : 'fas') as IconPrefix
  const faIconName = getFontAwesomeIcon(icon) as IconName

  return (
    <FontAwesomeIcon
      onClick={onClick}
      icon={[iconPrefix, faIconName]}
      className={className}
      style={style}
    />
  )
}

Icon.defaultProps = {
  outline: false,
}

export { Icon }
