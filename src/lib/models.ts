import clientPromise from './mongodb'

export interface Project {
  _id?: string
  name: string
  description: string
  technologies: string[]
  link?: string
}

export interface SocialMedia {
  platform: string
  url: string
  icon?: string
}

export interface PortfolioData {
  _id?: string
  name: string
  title: string
  description: string
  skills: string[]
  projects: Project[]
  socialMedia: SocialMedia[]
  updatedAt?: Date
}

export async function getPortfolioData(): Promise<PortfolioData | null> {
  try {
    const client = await clientPromise
    const db = client.db('portfolio')
    const collection = db.collection('portfolio')
    
    const data = await collection.findOne({})
    if (data) {
      return data as PortfolioData
    }
    
    // Return default portfolio data based on LinkedIn profile
    return {
      name: "Yogi B.",
      title: "Grain Handler | Fullstack Web Developer",
      description: "I'm all about diving into the latest in tech and love picking up new skills along the way. Currently, you'll find me tinkering with PHP (Codeigniter, Laravel, Slim), GO (Echo), AngularJS & Angular CLI, CSS, JavaScript, TypeScript, jQuery, Tailwind, Bootstrap, Node.js (Express.js), Redis, and Micro Services (RabbitMQ). I'm all about keeping it simple yet impactful in every project I dive into.",
      skills: [
        "PHP", "Codeigniter", "Laravel", "Slim", "Golang", "Echo", "AngularJS", "Angular CLI",
        "CSS", "JavaScript", "TypeScript", "jQuery", "Tailwind", "Bootstrap", "Node.js", "Express.js",
        "Redis", "RabbitMQ", "Micro Services", "API Development", "Full Stack Development"
      ],
      socialMedia: [
        {
          platform: "LinkedIn",
          url: "https://linkedin.com/in/yogibagus",
          icon: "Linkedin"
        }
      ],
      projects: [
        {
          name: "Pusaka Super App",
          description: "Developing APIs in Golang and seamlessly integrating them into Angular frontends and to be consumed by Mobile Platforms for Kemenag and NUCARE - LAZISNU.",
          technologies: ["Golang", "Angular", "API Development", "Mobile Integration"],
          link: ""
        },
        {
          name: "Dariguru.com E-commerce",
          description: "Building an e-commerce platform about card games and board games for teachers.",
          technologies: ["Full Stack Development", "E-commerce", "Web Development"],
          link: ""
        },
        {
          name: "Certificate Generator",
          description: "Integrating payment gateway and building certificate generator system.",
          technologies: ["Payment Gateway", "Certificate Generation", "Web Development"],
          link: ""
        }
      ]
    }
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    return null
  }
}

export async function updatePortfolioData(data: PortfolioData): Promise<boolean> {
  try {
    const client = await clientPromise
    const db = client.db('portfolio')
    const collection = db.collection('portfolio')
    
    // Remove _id field if it exists to avoid MongoDB immutable field error
    const { _id, ...dataWithoutId } = data as any
    const dataToSave = { ...dataWithoutId, updatedAt: new Date() }
    
    const result = await collection.replaceOne(
      {},
      dataToSave,
      { upsert: true }
    )
    
    return result.acknowledged
  } catch (error) {
    console.error('Error updating portfolio data:', error)
    return false
  }
}
