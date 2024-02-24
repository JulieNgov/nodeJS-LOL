import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getChampions = async (req, res) => {
    prisma.champion.findMany()
    .then((champions) => {
        res.json(champions)
    })
    .catch((error) => {
        res.json({ error: error.message })
    })
}

const getChampion = async (req, res) => {
  const { id } = req.params
  try {
    const champion = await prisma.champion.findUnique({
      where: { id: parseInt(id) }
    })
    res.json(champion)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createChampion = async (req, res) => {
    let champion = req.body
    
    prisma.champion.create({
        data: {
            name: champion.name,
            type: champion.type
        }
    })
    .then((champion) => {
        res.json(champion)
    })
    .catch((error) => {
        res.json({ error: error.message })
    })
}

const updateChampion = async (req, res) => {
  const { id } = req.params
  const { name, type } = req.body
  try {
    const champion = await prisma.champion.update({
      where: { id: parseInt(id) },
      data: {
        name,
        type
      }
    })
    res.json(champion)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteChampion = async (req, res) => {
    let id = Number(req.params.id)

    prisma.champion.delete({
        where: {
            id: id
        }
    })
    .then((champion) => {
        res.json(champion)
    })
    .catch((error) => {
        res.json({ error: error.message })
    })
}

export { getChampions, getChampion, createChampion, updateChampion, deleteChampion }