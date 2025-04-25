export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Work in Progress By Reginald Turner | Contact: 725-233-0331 |
          <a
            href="mailto:QoreAi.info@gmail.com"
            className="font-medium underline underline-offset-4 hover:text-primary ml-1"
          >
            QoreAi.info@gmail.com
          </a>
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} QoreAI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
