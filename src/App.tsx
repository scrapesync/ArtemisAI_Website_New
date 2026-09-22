import { Nav } from './sections/Nav/Nav'
import { Hero } from './sections/Hero/Hero'
import { WhatWeDo } from './sections/WhatWeDo/WhatWeDo'
import { Belief } from './sections/Belief/Belief'
import { HowWeDoIt } from './sections/HowWeDoIt/HowWeDoIt'

export function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatWeDo />
        <Belief />
        <HowWeDoIt />
      </main>
    </>
  )
}
