import { ComponentProps, createElement, JSXElementConstructor } from 'react'

export const withClassName = <
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
>(
  component: T,
  ...classes: string[]
) => {
  const name = `${typeof component === 'string' ? component : ''}_${classes[0]}`

  return {
    [name](props: ComponentProps<T>) {
      return createElement(component, {
        ...props,
        className: `${props.className} ${classes}`,
      })
    },
  }[name]
}
