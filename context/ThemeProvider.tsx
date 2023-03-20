import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  memo,
} from "react"
import { BigNumber } from "ethers"
import { useContractRead } from "wagmi"
import { platformThemeRegistryAbi } from "../abi/platformThemeRegistryAbi"
import { useWeb3Storage } from "../hooks/useWeb3Storage"

type ThemeProviderProps = {
  children?: ReactNode
  platformIndex?: number
}

/**
 * Assign default values to the context provider
 */
const ThemeContext = createContext({
  themeCID: "",
  newMetadata: "",
  /**
   * Configurable properties
   */
  image: "",
  setImage: (image: string) => {},
  backgroundColor: "",
  setBackgroundColor: (backgroundColor: string) => {},
  primary: "",
  setPrimary: (primary: string) => {},
  secondary: "",
  setSecondary: (secondary: string) => {},
  tertiary: "",
  setTertiary: (tertiary: string) => {},
  highlight: "",
  setHighlight: (highlight: string) => {},
  headline: "",
  setHeadline: (headline: string) => {},
  headlineSize: "",
  setHeadlineSize: (headlineSize: string) => {},
  body: "",
  setBody: (body: string) => {},
  caption: "",
  setCaption: (caption: string) => {},
  shadowColor: "",
  setShadowColor: (shadowColor: string) => {},
  shadowSpread: "",
  setShadowSpread: (shadowSpread: string) => {},
  objectRadius: "",
  setObjectRadius: (objectRadius: string) => {},
  buttonRadius: "",
  setButtonRadius: (buttonRadius: string) => {},
})

export const ThemeProvider = memo(function ThemeProvider({
  children,
  platformIndex,
}: ThemeProviderProps) {
  const themeRegistry = "0x9a23AE640040e4d34E9e00E500003000017144F4"
  /**
   * Assign a state variable to the theme content object
   */
  const [themeCID, setThemeCID] = useState<string>("")
  /**
   * Set state variables for the parameters derived from the theme content object
   */
  const [image, setImage] = useState<string>("")
  const [backgroundColor, setBackgroundColor] = useState<string>(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-background"
    )
  )
  const [primary, setPrimary] = useState<string>(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-primary"
    )
  )
  const [secondary, setSecondary] = useState<string>(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-secondary"
    )
  )
  const [tertiary, setTertiary] = useState<string>(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-tertiary"
    )
  )
  const [highlight, setHighlight] = useState<string>(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-highlight"
    )
  )
  const [headline, setHeadline] = useState<string>(
    getComputedStyle(document.documentElement).getPropertyValue("--headline")
  )
  const [headlineSize, setHeadlineSize] = useState<string>(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--headline-size")
      .slice(0, -2)
  )
  const [body, setBody] = useState<string>(
    getComputedStyle(document.documentElement).getPropertyValue("--body")
  )
  const [caption, setCaption] = useState<string>(
    getComputedStyle(document.documentElement).getPropertyValue("--caption")
  )

  const [shadowColor, setShadowColor] = useState<string>(
    getComputedStyle(document.documentElement).getPropertyValue("--color-shadow")
  )
  const [shadowSpread, setShadowSpread] = useState<string>(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--shadow-spread"
    )
    .slice(0, -2)
  )
  const [objectRadius, setObjectRadius] = useState<string>(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--border-radius-object")
      .slice(0, -2)
  )
  const [buttonRadius, setButtonRadius] = useState<string>(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--border-radius-button")
      .slice(0, -2)
  )
  /**
   * Read the desired ipfs string from the registry contract
   */
  useContractRead({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    functionName: "getPlatformTheme",
    args: [BigNumber.from(platformIndex)],
    onSuccess(data: any) {
      setThemeCID(data.substring("ipfs://".length))
    },
    onError(error: any) {
      console.log(error)
    },
  })
  /**
   * Unpack the metadata stored on ipfs
   */
  const { unpackedMetadata } = useWeb3Storage(themeCID)
  /**
   * Set the state variables to the values fetched from the theme content object
   */
  useEffect(() => {
    if (unpackedMetadata) {
      const parsedMetadata = JSON.parse(unpackedMetadata)
      setImage(parsedMetadata.theme.background?.image)
      setBackgroundColor(parsedMetadata.theme.background?.backgroundColor)
      setPrimary(parsedMetadata.theme.colors?.primary)
      setSecondary(parsedMetadata.theme.colors?.secondary)
      setTertiary(parsedMetadata.theme.colors?.tertiary)
      setHighlight(parsedMetadata.theme.colors?.highlight)
      setHeadline(parsedMetadata.theme.fonts?.headline)
      setHeadlineSize(parsedMetadata.theme.fonts?.headlineSize)
      setBody(parsedMetadata.theme.fonts?.body)
      setCaption(parsedMetadata.theme.fonts?.caption)
      setShadowColor(parsedMetadata.theme.dropshadow?.shadowColor)
      setShadowSpread(parsedMetadata.theme.dropshadow?.shadowSpread)
      setObjectRadius(parsedMetadata.theme.cornerRadius?.objectRadius)
      setButtonRadius(parsedMetadata.theme.cornerRadius?.buttonRadius)
    }
  }, [unpackedMetadata])
  /**
   * Set the variables in the local stylesheet to their corresponding values
   */

  // prettier-ignore
  document.documentElement.style.setProperty("--color-background", backgroundColor);
  // prettier-ignore
  document.documentElement.style.setProperty("--color-primary", primary);
  // prettier-ignore
  document.documentElement.style.setProperty("--color-secondary", secondary);
  // prettier-ignore
  document.documentElement.style.setProperty("--color-tertiary", tertiary);
  // prettier-ignore
  document.documentElement.style.setProperty("--color-highlight", highlight);
  // prettier-ignore
  document.documentElement.style.setProperty("--headline", headline);
  // prettier-ignore
  document.documentElement.style.setProperty("--headline-size", headlineSize + 'px');
  // prettier-ignore
  document.documentElement.style.setProperty("--body", body);
  // prettier-ignore
  document.documentElement.style.setProperty("--caption", caption);
  // prettier-ignore
  document.documentElement.style.setProperty("--color-shadow", shadowColor);
  // prettier-ignore
  document.documentElement.style.setProperty("--shadow-spread", shadowSpread + 'px');
  // prettier-ignore
  document.documentElement.style.setProperty("--border-radius-object", objectRadius + 'px');
  // prettier-ignore
  document.documentElement.style.setProperty("--border-radius-button", buttonRadius + 'px');

  const newMetadata = JSON.stringify(
    {
      theme: {
        background: {
          image: image || "",
          backgroundColor: backgroundColor || "",
        },
        colors: {
          primary: primary || "",
          secondary: secondary || "",
          tertiary: tertiary || "",
          highlight: highlight || "",
        },
        fonts: {
          headline: headline || "",
          headlineSize: headlineSize || "",
          body: body || "",
          caption: caption || "",
        },
        dropshadow: {
          shadowColor: shadowColor || "",
          shadowSpread: shadowSpread || "",
        },
        cornerRadius: {
          objectRadius: objectRadius || "",
          buttonRadius: buttonRadius || "",
        },
      },
    },
    null,
    3
  )

  // prettier-ignore
  const headlineFontUrl = 'https://dweb.link/ipfs/bafybeih3dpotmeewpv543kzbwhxykm6pqtcw46i6lymcjhvblg6sv455se/' + headline + '.ttf';
  const headlineRule = `@font-face {
    font-family: '${headline}';
    src: url('${headlineFontUrl}') format('woff2');
    }`

  const headlineStyle = document.createElement("style")
  headlineStyle.appendChild(document.createTextNode(headlineRule))
  document.head.appendChild(headlineStyle)

  // prettier-ignore
  const bodyFontUrl = 'https://dweb.link/ipfs/bafybeih3dpotmeewpv543kzbwhxykm6pqtcw46i6lymcjhvblg6sv455se/' + body + '.ttf';
  const bodyRule = `@font-face {
    font-family: '${body}';
    src: url('${bodyFontUrl}') format('woff2');
    }`

  const bodyStyle = document.createElement("style")
  bodyStyle.appendChild(document.createTextNode(bodyRule))
  document.head.appendChild(bodyStyle)

  // prettier-ignore
  const captionFontUrl = 'https://dweb.link/ipfs/bafybeih3dpotmeewpv543kzbwhxykm6pqtcw46i6lymcjhvblg6sv455se/' + caption + '.ttf';
  const captionRule = `@font-face {
    font-family: '${caption}';
    src: url('${captionFontUrl}') format('woff2');
    }`

  const captionStyle = document.createElement("style")
  captionStyle.appendChild(document.createTextNode(captionRule))
  document.head.appendChild(captionStyle)

  return (
    <ThemeContext.Provider
      value={{
        themeCID,
        newMetadata,
        /**
         * Configurable properties
         */
        image,
        setImage,
        backgroundColor,
        setBackgroundColor,
        primary,
        setPrimary,
        secondary,
        setSecondary,
        tertiary,
        setTertiary,
        highlight,
        setHighlight,
        headline,
        setHeadline,
        headlineSize,
        setHeadlineSize,
        body,
        setBody,
        caption,
        setCaption,
        shadowColor,
        setShadowColor,
        shadowSpread,
        setShadowSpread,
        objectRadius,
        setObjectRadius,
        buttonRadius,
        setButtonRadius,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
})

// Access the context value of the ThemeProvider
export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw Error("useThemeContext hook must be used within a ThemeProvider")
  }
  return context
}
