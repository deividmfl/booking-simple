import loadable from "@loadable/component"
import { IconBaseProps, IconType } from "react-icons"

interface typesPropsIcon {
  icon: string;
  props?: IconBaseProps
}

export function Icon({ icon, props }: typesPropsIcon): JSX.Element {
  const lib = icon.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(" ")[0].toLocaleLowerCase()

  const ElementIcon: IconType = loadable(() => import(`react-icons/hi`), {
    resolveComponent: (el: JSX.Element) => el[icon as keyof JSX.Element]
  })

  return <ElementIcon {...props} />
}