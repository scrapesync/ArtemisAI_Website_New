/** The five questions people ask before they connect a page. Answers verbatim. */
export const FAQ = [
  {
    q: 'Do I have to give you my Facebook password?',
    a: 'No. You sign in through Facebook’s own permission screen, the same one you use for any connected app. We never see or store your password, and you can revoke access from Facebook whenever you want.',
  },
  {
    q: 'Will Artemis post or reply without asking me?',
    a: 'Not unless you turn that on. By default every reply and every scheduled post is a draft that waits in your queue until you approve it. You review, you decide.',
  },
  {
    q: 'How can it predict how a post will do?',
    a: 'It reads two years of your own page history, so the comparison is your audience rather than an industry average. Every score opens the numbers behind it, and it tells you when it doesn’t have enough history to be confident.',
  },
  {
    q: 'Is my page’s data kept private?',
    a: 'Yes. Your page data is used to answer questions about your page and nothing else. It is never pooled with other accounts or used to train shared models, and you can delete it at any time.',
  },
  {
    q: 'When can I use it?',
    a: 'The pilot is open now and free while it runs. Connect the page you want watched and your first read lands the following morning.',
  },
] as const

export const FOOTER_BLURB =
  'We build tools for the people who actually run the page. Artemis reads every post and comment across your accounts, drafts the reply and finds the window. You review, you decide.'

export const LEGAL = 'ArtemisAI Ltd · Made in the UK · © 2026'
