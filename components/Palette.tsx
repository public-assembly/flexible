import * as React from 'react';
import { useThemeContext } from '../context/ThemeProvider';

export function Palette() {
  /**
   * Grab the state variables and setter functions from the ThemeProvider
   */
  const {
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
  } = useThemeContext();

  function handleFontChange(e: any) {
    const selectedFont = document.getElementById('fontFamily');
    // @ts-ignore
    setFontFamily(selectedFont.value);
    console.log(fontFamily);
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col gap-y-4 border-2 border-[#f6f6f6] py-4 px-6 rounded-xl'>
        <div className='flex justify-between items-center gap-x-32 text-lg'>
          <label>Background</label>
          <input
            id='background'
            type='color'
            className='theming-test__color-picker'
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        </div>
        <div className='flex justify-between items-center gap-x-4 text-lg'>
          <label>Text</label>
          <input
            id='text'
            type='color'
            className='theming-test__color-picker'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='flex justify-between items-center gap-x-4 text-lg'>
          <label>Border</label>
          <input
            id='border'
            type='color'
            className='theming-test__color-picker'
            value={border}
            onChange={(e) => setBorder(e.target.value)}
          />
        </div>
        <div className='flex justify-between items-center gap-x-4 text-lg'>
          <label>Accent</label>
          <input
            id='accent'
            type='color'
            className='theming-test__color-picker'
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
          />
        </div>
        <div className='flex justify-between items-center gap-x-4 text-lg'>
          <label>Accent text</label>
          <input
            id='accentText'
            type='color'
            className='theming-test__color-picker'
            value={accentText}
            onChange={(e) => setAccentText(e.target.value)}
          />
        </div>
      </div>
      <div className='flex flex-col gap-y-4 border-2 border-[#f6f6f6] py-4 px-6 rounded-xl'>
        <div className='flex justify-between items-center gap-x-4 text-lg'>
          <select
            className='theming-test__dropdown '
            id='fontFamily'
            value={fontFamily}
            onChange={(e) => handleFontChange(e)}
          >
            <option value='antonio'>Antonio</option>
            <option value='archivonarrow'>Archivo Narrow</option>
            <option value='audiowide'>Audiowide</option>
            <option value='ballet'>Ballet</option>
            <option value='biorhyme'>BioRhyme</option>
            <option value='chicle'>Chicle</option>
            <option value='chivomono'>Chivo Mono</option>
            <option value='cinzel'>Cinzel</option>
            <option value='cormorant'>Cormorant</option>
            <option value='domine'>Domine</option>
            <option value='dynapuff'>DynaPuff</option>
            <option value='eczar'>Eczar</option>
            <option value='frankruhllibre'>Frank Ruhl Libre</option>
            <option value='grandstander'>Grandstander</option>
            <option value='hankengrotesk'>Hanken Grotesk</option>
            <option value='ibmplexmono'>IBM Plex Mono</option>
            <option value='ibmplexsans'>IBM Plex Sans</option>
            <option value='ibmplexserif'>IBM Plex Serif</option>
            <option value='inconsolata'>Inconsolata</option>
            <option value='inter'>Inter</option>
            <option value='jura'>Jura</option>
            <option value='kreon'>Kreon</option>
            <option value='literata'>Literata</option>
            <option value='londrinasolid'>Londrina Solid</option>
            <option value='lora'>Lora</option>
            <option value='michroma'>Michroma</option>
            <option value='montserrat'>Montserrat</option>
            <option value='mulish'>Mulish</option>
            <option value='newsreader'>Newsreader</option>
            <option value='nunito'>Nunito</option>
            <option value='opensans'>Open Sans</option>
            <option value='orbitron'>Orbitron</option>
            <option value='outfit'>Outfit</option>
            <option value='oxanium'>Oxanium</option>
            <option value='playfairdisplay'>Playfair Display</option>
            <option value='poppins'>Poppins</option>
            <option value='quicksand'>Quicksand</option>
            <option value='raleway'>Raleway</option>
            <option value='rokkitt'>Rokkitt</option>
            <option value='rubik'>Rubik</option>
            <option value='saira'>Saira</option>
            <option value='sono'>Sono</option>
            <option value='sora'>Sora</option>
            <option value='spacegrotesk'>Space Grotesk</option>
            <option value='spacemono'>Space Mono</option>
            <option value='sticknobills'>Stick No Bills</option>
            <option value='unbounded'>Unbounded</option>
            <option value='unifrakturmaguntia'>Unifraktur Maguntia</option>
            <option value='vollkorn'>Vollkorn</option>
            <option value='wallpoet'>Wallpoet</option>
          </select>
        </div>
      </div>
    </div>
  );
}
