import NextNProgress from 'nextjs-progressbar'

export function TopProgressBar() {
  return (
    <NextNProgress
      color='var(--highlight-color)'
      startPosition={0.125}
      stopDelayMs={200}
      height={2}
      showOnShallow={true}
      options={{ showSpinner: false }}
    />
  )
}
