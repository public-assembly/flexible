import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
    memo,
  } from 'react';
  import { BigNumber } from 'ethers';
  import { useContractRead } from 'wagmi';
  import { platformThemeRegistryAbi } from '../abi/platformThemeRegistryAbi';
  import { useWeb3Storage } from '../hooks/useWeb3Storage';
  
  type ThemeProviderProps = {
    children?: ReactNode;
    platformIndex?: number;
  };
  
  /**
   * Assign default values to the context provider
   */
  const ThemeContext = createContext({
    themeCID: '',
    newMetadata: '',
    background: '',
    setBackground: (background: string) => {},
    text: '',
    setText: (text: string) => {},
    accent: '',
    setAccent: (accent: string) => {},
    accentText: '',
    setAccentText: (accentText: string) => {},
    border: '',
    setBorder: (border: string) => {},
    fontFamily: '',
    setFontFamily: (fontFamily: string) => {},
  });
  
  export const ThemeProvider = memo(function ThemeProvider({
    children,
    platformIndex,
  }: ThemeProviderProps) {
    /**
     * Read the registry contract defined as an environment variable
     */
    const themeRegistry = process.env
      .NEXT_PUBLIC_REGISTRY_CONTRACT as `0x${string}`;
    /**
     * Assign a state variable to the theme content object
     */
    const [themeCID, setThemeCID] = useState<string>('');
    /**
     * Set state variables for the parameters derived from the theme content object
     */
    const [background, setBackground] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [accent, setAccent] = useState<string>('');
    const [accentText, setAccentText] = useState<string>('');
    const [border, setBorder] = useState<string>('');
    const [fontFamily, setFontFamily] = useState<string>('');
    /**
     * Read the desired ipfs string from the registry contract
     */
    const contractRead = useContractRead({
      address: themeRegistry,
      abi: platformThemeRegistryAbi,
      functionName: 'getPlatformTheme',
      args: [BigNumber.from(platformIndex)],
      onSuccess(data: any) {
        setThemeCID(data.substring('ipfs://'.length));
      },
      onError(error: any) {
        console.log(error);
      },
    });
    /**
     * Unpack the metadata stored on ipfs
     */
    const { unpackedMetadata } = useWeb3Storage(themeCID);
    /**
     * Set the state variables to the values fetched from the theme content object
     */
    useEffect(() => {
      if (unpackedMetadata) {
        const parsedMetadata = JSON.parse(unpackedMetadata);
        setBackground(parsedMetadata.theme?.color.background);
        setText(parsedMetadata.theme?.color.text);
        setAccent(parsedMetadata.theme?.color.accent);
        setAccentText(parsedMetadata.theme?.color.accentText);
        setBorder(parsedMetadata.theme.color?.border);
        setFontFamily(parsedMetadata.theme.font?.heading.fontFamily);
      }
    }, [unpackedMetadata]);
    /**
     * Set the variables in the local stylesheet to their corresponding values
     */
    document.documentElement.style.setProperty('--background', background);
    document.documentElement.style.setProperty('--text', text);
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accentText', accentText);
    document.documentElement.style.setProperty('--border', border);
    document.documentElement.style.setProperty('--fontFamily', fontFamily);
  
    const newMetadata = JSON.stringify(
      {
        theme: {
          color: { background, text, accent, accentText, border },
          font: { heading: { fontFamily } },
        },
      },
      null,
      3
    );
  
    // prettier-ignore
    const fontUrl = 'https://dweb.link/ipfs/bafybeih3dpotmeewpv543kzbwhxykm6pqtcw46i6lymcjhvblg6sv455se/' + fontFamily + '.ttf';
    const rule = `@font-face {
    font-family: '${fontFamily}';
    src: url('${fontUrl}') format('woff2');
    }`;
  
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(rule));
    document.head.appendChild(style);
  
    return (
      <ThemeContext.Provider
        value={{
          themeCID,
          newMetadata,
          background,
          setBackground,
          text,
          setText,
          accent,
          setAccent,
          accentText,
          setAccentText,
          border,
          setBorder,
          fontFamily,
          setFontFamily,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  });
  
  // Access the context value of the ThemeProvider
  export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw Error('useThemeContext hook must be used within a ThemeProvider');
    }
    return context;
  };