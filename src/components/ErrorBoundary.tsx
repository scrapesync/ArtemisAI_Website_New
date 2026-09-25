import { Component, type ErrorInfo, type ReactNode } from 'react'

import { CONTACT_EMAIL } from '../lib/constants'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
}

interface State {
  failed: boolean
}

/**
 * Stops one thrown error from blanking the whole page.
 *
 * This is a single-page app with no server-rendered fallback: if any component throws during
 * render, React unmounts the entire tree and the visitor is left looking at an empty black
 * document with no way to tell that anything went wrong. That is the worst possible failure
 * for a marketing page, because it is indistinguishable from a broken link.
 *
 * The fallback keeps the brand, says plainly what happened, and offers the same escape hatch
 * as the `<noscript>` block in index.html — both are "the page could not run" states, and a
 * visitor who wants the trial should still be able to get it.
 *
 * Still a class: `componentDidCatch` has no hook equivalent.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // No analytics on this site yet (backlog #27), so the console is the only place this can
    // go. Worth keeping regardless — it is what someone will look at when a visitor reports
    // a blank page from a browser we could not test on.
    console.error('ArtemisAI: unrecoverable render error', error, info.componentStack)
  }

  render(): ReactNode {
    if (!this.state.failed) return this.props.children

    return (
      <div className={styles.root} role="alert">
        <div className={styles.inner}>
          <p className={styles.kicker}>ArtemisAI</p>
          <h1 className={styles.head}>This page didn’t load properly.</h1>
          <p className={styles.body}>
            Something went wrong on our side, not yours. Reloading usually fixes it.
          </p>
          <p className={styles.body}>
            If it doesn’t, email{' '}
            <a className={styles.link} href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{' '}
            and we’ll set you up with the 14-day free trial directly.
          </p>
          <button
            className={styles.action}
            type="button"
            onClick={() => window.location.reload()}
          >
            Reload the page
          </button>
        </div>
      </div>
    )
  }
}
