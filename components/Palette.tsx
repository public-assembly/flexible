import * as React from "react"
import * as Slider from "@radix-ui/react-slider"
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
  } = useThemeContext()

  return (
    <div className="space-y-6 font-satoshi">
      {/* Background */}
      <div className="flex flex-col gap-y-4 py-4 px-6 rounded-xl shadow-[0_1px_2px_1px_rgba(0,0,0,0.12)]">
        {/* Image upload */}
        {/* <div className="flex items-center justify-between gap-x-32">
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
        </div> */}
        <span className="font-semibold uppercase">Background</span>
        <div className="flex items-center justify-between gap-x-32">
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
        <span className="font-semibold uppercase">Colors</span>
        <div className="flex items-center justify-between gap-x-4">
          <label>Primary</label>
          <input
            id="text"
            type="color"
            className="color-picker"
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <label>Secondary</label>
          <input
            id="secondary"
            type="color"
            className="color-picker"
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <label>Tertiary</label>
          <input
            id="tertiary"
            type="color"
            className="color-picker"
            value={tertiary}
            onChange={(e) => setTertiary(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-x-4">
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
        <span className="font-semibold uppercase">Fonts</span>
        <div className="flex items-center justify-between gap-x-4">
          <span>Headline</span>
          <div>
            <select
              className="font-picker"
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            >
              <option disabled>Select font</option>
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
              <option value="worksans">Work Sans</option>
            </select>
          </div>
        </div>
        {/* Slider */}
        <div className="flex justify-end">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-[161px] h-5"
            value={Number(headlineSize) > 16 ? [Number(headlineSize)] : [16]}
            min={16}
            max={64}
            step={4}
            aria-label="Headline Font Size"
            onValueChange={(newValue) => setHeadlineSize(String(newValue))}
          >
            <Slider.Track className="bg-[#C9D2D2] relative grow rounded-full h-[3px]">
              <Slider.Range className="absolute bg-[#C9D2D2] rounded-full h-full" />
            </Slider.Track>

            <Slider.Thumb className="block w-5 h-5 bg-[#1E1F22] rounded-[10px]">
              <div className="pt-6 pr-4">
                {headlineSize == "" ? "16px" : `${headlineSize}px`}
              </div>
            </Slider.Thumb>
          </Slider.Root>
        </div>
        <br></br>
        <div className="flex items-center justify-between gap-x-4">
          <span>Body</span>
          <div>
            <select
              className="font-picker"
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            >
              <option disabled>Select font</option>
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
              <option value="worksans">Work Sans</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <span>Caption</span>
          <div>
            <select
              className="font-picker"
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            >
              <option disabled>Select font</option>
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
              <option value="worksans">Work Sans</option>
            </select>
          </div>
        </div>
      </div>
      {/* Dropshadow */}
      <div className="flex flex-col gap-y-4 py-4 px-6 rounded-xl shadow-[0_1px_2px_1px_rgba(0,0,0,0.12)]">
        <span className="font-semibold uppercase">Dropshadow</span>
        <div className="flex items-center justify-between gap-x-32">
          <label>Color</label>
          <input
            id="shadowColor"
            type="color"
            className="color-picker"
            value={shadowColor}
            onChange={(e) => setShadowColor(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-x-32">
          <label>Spread</label>
          <div className="flex justify-end">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-[161px] h-5"
              value={[Number(shadowSpread)]}
              min={0}
              max={32}
              step={2}
              aria-label="Dropshadow Spread"
              onValueChange={(newValue) => setShadowSpread(String(newValue))}
            >
              <Slider.Track className="bg-[#C9D2D2] relative grow rounded-full h-[3px]">
                <Slider.Range className="absolute bg-[#C9D2D2] rounded-full h-full" />
              </Slider.Track>

              <Slider.Thumb className="block w-5 h-5 bg-[#1E1F22] rounded-[10px]">
                <div className="pt-6 pr-4">
                  {shadowSpread == "" ? "1px" : `${shadowSpread}px`}
                </div>
              </Slider.Thumb>
            </Slider.Root>
          </div>
        </div>
        <br></br>
      </div>
      {/* Corner radius */}
      <div className="flex flex-col gap-y-4 py-4 px-6 rounded-xl shadow-[0_1px_2px_1px_rgba(0,0,0,0.12)]">
        <span className="font-semibold uppercase">Corner Radius</span>
        <div className="flex items-center justify-between gap-x-32">
          <label>Objects</label>
          <div className="flex justify-end">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-[161px] h-5"
              value={[Number(objectRadius)]}
              min={0}
              max={32}
              step={2}
              aria-label="Object Radius"
              onValueChange={(newValue) => setObjectRadius(String(newValue))}
            >
              <Slider.Track className="bg-[#C9D2D2] relative grow rounded-full h-[3px]">
                <Slider.Range className="absolute bg-[#C9D2D2] rounded-full h-full" />
              </Slider.Track>

              <Slider.Thumb className="block w-5 h-5 bg-[#1E1F22] rounded-[10px]">
                <div className="pt-6 pr-4">
                  {objectRadius == "" ? "0px" : `${objectRadius}px`}
                </div>
              </Slider.Thumb>
            </Slider.Root>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6 gap-x-32">
          <label>Buttons</label>
          <div className="flex justify-end">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-[161px] h-5"
              value={[Number(buttonRadius)]}
              min={0}
              max={32}
              step={2}
              aria-label="Button Radius"
              onValueChange={(newValue) => setButtonRadius(String(newValue))}
            >
              <Slider.Track className="bg-[#C9D2D2] relative grow rounded-full h-[3px]">
                <Slider.Range className="absolute bg-[#C9D2D2] rounded-full h-full" />
              </Slider.Track>

              <Slider.Thumb className="block w-5 h-5 bg-[#1E1F22] rounded-[10px]">
                <div className="pt-6 pr-4">
                  {buttonRadius == "" ? "0px" : `${buttonRadius}px`}
                </div>
              </Slider.Thumb>
            </Slider.Root>
          </div>
        </div>
        <br></br>
      </div>
      <br></br>
    </div>
  )
}
