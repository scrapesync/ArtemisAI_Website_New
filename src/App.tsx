import { Nav } from './sections/Nav/Nav'
import { Hero } from './sections/Hero/Hero'
import { WhatWeDo } from './sections/WhatWeDo/WhatWeDo'

export function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatWeDo />
      </main>
    </>
  )
}
