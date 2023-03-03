import Auction from '@/components/auction/Auction'
import { Seo } from '@/components/Seo'

function HomePage() {
  return (
    <section className='h-screen pb-4 md:pb-0 md:h-full'>
      <Seo />
      <Auction />
    </section>
  )
}

export default HomePage
