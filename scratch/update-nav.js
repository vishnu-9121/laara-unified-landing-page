const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const navBlock = await prisma.pageBlock.findFirst({
    where: { type: 'NAV_LINKS' }
  })

  if (navBlock) {
    let content = JSON.parse(navBlock.content)
    let changed = false

    content = content.map(link => {
      if (link.label === 'About' || link.label === 'About Us') {
        if (link.label !== 'About Us' || link.href !== '/about') {
          changed = true
          return { ...link, label: 'About Us', href: '/about' }
        }
      }
      if (link.label === 'Contact' || link.label === 'Contact Us') {
        if (link.label !== 'Contact Us' || link.href !== '/contact') {
          changed = true
          return { ...link, label: 'Contact Us', href: '/contact' }
        }
      }
      return link
    })

    if (changed) {
      await prisma.pageBlock.update({
        where: { id: navBlock.id },
        data: { content: JSON.stringify(content) }
      })
      console.log('Updated NAV_LINKS in database.')
    } else {
      console.log('NAV_LINKS already up to date or no "About" link found.')
    }
  } else {
    console.log('No NAV_LINKS block found in database.')
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
