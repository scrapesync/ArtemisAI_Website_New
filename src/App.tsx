import { Nav } from './sections/Nav/Nav'
import { Hero } from './sections/Hero/Hero'
import { WhatWeDo } from './sections/WhatWeDo/WhatWeDo'
import { Belief } from './sections/Belief/Belief'
import { HowWeDoIt } from './sections/HowWeDoIt/HowWeDoIt'
import { Collabs } from './sections/Collabs/Collabs'
import { ConnectOnce } from './sections/ConnectOnce/ConnectOnce'
import { FaqFooter } from './sections/FaqFooter/FaqFooter'

export function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatWeDo />
        <Belief />
        <HowWeDoIt />
        <Collabs />
        <ConnectOnce />
        <FaqFooter />
      </main>
    </>
  )
}
