import * as React from "react"
import { useThemeContext } from "../context/ThemeProvider"

export function Palette() {
  const {
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
  } = useThemeContext()

  function handleFontChange(e: any) {
    const selectedFont = document.getElementById("headline")
    // @ts-ignore
    setHeadline(selectedFont.value)
  }

  return (
    <div className="space-y-6 font-['Satoshi']">
      {/* Background */}
      <div className="flex flex-col gap-y-4 py-4 px-6 rounded-xl shadow-[0_1px_2px_1px_rgba(0,0,0,0.12)]">
        <div className="flex justify-between items-center gap-x-32">
          <span>Upload image</span>
          <label className="image-picker">
            Upload File
            <input
              id="image"
              type="file"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </div>
        <div className="flex justify-between items-center gap-x-32">
          <label>Color</label>
          <input
            id="backgroundColor"
            type="color"
            className="color-picker"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>
      </div>
      {/* Colors */}
      <div className="flex flex-col gap-y-4 py-4 px-6 rounded-xl shadow-[0_1px_2px_1px_rgba(0,0,0,0.12)]">
        <div className="flex justify-between items-center gap-x-4">
          <label>Primary</label>
          <input
            id="text"
            type="color"
            className="color-picker"
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <label>Secondary</label>
          <input
            id="secondary"
            type="color"
            className="color-picker"
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <label>Tertiary</label>
          <input
            id="tertiary"
            type="color"
            className="color-picker"
            value={tertiary}
            onChange={(e) => setTertiary(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <label>Highlight</label>
          <input
            id="highlight"
            type="color"
            className="color-picker"
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
          />
        </div>
      </div>
      {/* Fonts */}
      <div className="flex flex-col gap-y-4 py-4 px-6 rounded-xl shadow-[0_1px_2px_1px_rgba(0,0,0,0.12)]">
        <div className="flex justify-between items-center gap-x-4">
          <select
            className="dropdown "
            id="headline"
            value={headline}
            onChange={(e) => handleFontChange(e)}
          >
            <option value="antonio">Antonio</option>
            <option value="archivonarrow">Archivo Narrow</option>
            <option value="audiowide">Audiowide</option>
            <option value="ballet">Ballet</option>
            <option value="biorhyme">BioRhyme</option>
            <option value="chicle">Chicle</option>
            <option value="chivomono">Chivo Mono</option>
            <option value="cinzel">Cinzel</option>
            <option value="cormorant">Cormorant</option>
            <option value="domine">Domine</option>
            <option value="dynapuff">DynaPuff</option>
            <option value="eczar">Eczar</option>
            <option value="frankruhllibre">Frank Ruhl Libre</option>
            <option value="grandstander">Grandstander</option>
            <option value="hankengrotesk">Hanken Grotesk</option>
            <option value="ibmplexmono">IBM Plex Mono</option>
            <option value="ibmplexsans">IBM Plex Sans</option>
            <option value="ibmplexserif">IBM Plex Serif</option>
            <option value="inconsolata">Inconsolata</option>
            <option value="inter">Inter</option>
            <option value="jura">Jura</option>
            <option value="kreon">Kreon</option>
            <option value="literata">Literata</option>
            <option value="londrinasolid">Londrina Solid</option>
            <option value="lora">Lora</option>
            <option value="michroma">Michroma</option>
            <option value="montserrat">Montserrat</option>
            <option value="mulish">Mulish</option>
            <option value="newsreader">Newsreader</option>
            <option value="nunito">Nunito</option>
            <option value="opensans">Open Sans</option>
            <option value="orbitron">Orbitron</option>
            <option value="outfit">Outfit</option>
            <option value="oxanium">Oxanium</option>
            <option value="playfairdisplay">Playfair Display</option>
            <option value="poppins">Poppins</option>
            <option value="quicksand">Quicksand</option>
            <option value="raleway">Raleway</option>
            <option value="rokkitt">Rokkitt</option>
            <option value="rubik">Rubik</option>
            <option value="saira">Saira</option>
            <option value="sono">Sono</option>
            <option value="sora">Sora</option>
            <option value="spacegrotesk">Space Grotesk</option>
            <option value="spacemono">Space Mono</option>
            <option value="sticknobills">Stick No Bills</option>
            <option value="unbounded">Unbounded</option>
            <option value="unifrakturmaguntia">Unifraktur Maguntia</option>
            <option value="vollkorn">Vollkorn</option>
            <option value="wallpoet">Wallpoet</option>
          </select>
        </div>
      </div>
    </div>
  )
}
