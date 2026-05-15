const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  console.log("Seeding CMS Blocks...")
  
  const blocks = [
    {
      type: "HERO",
      title: "Hero Section",
      content: JSON.stringify({
        heading: "LAARA INNOVATIONS",
        subheading: "Advanced Drone Solutions & Digital Transformation",
        ctaText: "Explore Projects",
        ctaLink: "/#projects"
      }),
      order: 0
    },
    {
      type: "FEATURE_CARDS",
      title: "Our Segments",
      content: JSON.stringify([
        { title: "Hands on Training", desc: "Practical workshops in drone tech.", icon: "GraduationCap" },
        { title: "Research Programs", desc: "Advanced R&D in aerodynamics.", icon: "FlaskConical" },
        { title: "Digital Services", desc: "Full-stack development solutions.", icon: "Code2" }
      ]),
      order: 1
    },
    {
      type: "CONTACT_FORM",
      title: "Contact Section",
      content: JSON.stringify({
        heading: "Get In Touch",
        email: "contact@laara.com"
      }),
      order: 2
    }
  ]

  for (const block of blocks) {
    await prisma.pageBlock.upsert({
      where: { id: `seed-${block.type.toLowerCase()}` },
      update: block,
      create: { ...block, id: `seed-${block.type.toLowerCase()}` }
    })
  }

  console.log("Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
