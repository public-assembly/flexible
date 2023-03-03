import Auction from '@/components/auction/Auction'
import { Seo } from '@/components/Seo'

function HomePage() {
  return (
    <section id='index' className='h-screen pb-4 md:h-full'>
      <Seo />
      <Auction />
    </section>
  )
}

export default HomePage
