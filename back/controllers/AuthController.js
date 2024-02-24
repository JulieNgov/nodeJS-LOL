import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

//Sign up
const signUp = async (req, res) => {
    const { email, pseudo, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    prisma.user.create({
        data: {
            email,
            pseudo,
            password: hashedPassword
        }
    })
    .then(user => {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' })
        res.json(token)
    })
    .catch(error => {
        res.json({ error: error.message })
    })
}

//Log in
const logIn = async (req, res) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return res.json({ error: 'User not found' })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.json({ error: 'Invalid password' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' })

    res.json(token)
}

export { signUp, logIn }