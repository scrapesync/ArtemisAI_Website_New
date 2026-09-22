import { Nav } from './sections/Nav/Nav'
import { Hero } from './sections/Hero/Hero'
import { WhatWeDo } from './sections/WhatWeDo/WhatWeDo'
import { Belief } from './sections/Belief/Belief'

export function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatWeDo />
        <Belief />
      </main>
    </>
  )
}
