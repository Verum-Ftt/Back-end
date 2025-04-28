import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { exec, execSync } from 'node:child_process'

const prisma = new PrismaClient()

function generationUniqueDatabaseURL(schemaId: string){
    if(!process.env.DATABASE_URL){
        throw new Error('Please provider a DATABASE_URL enviroment variable.')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schemaId)

    return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () =>{
    const databaseURL = generationUniqueDatabaseURL(schemaId)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    console.log('Database created')
})

afterAll(async () =>{
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
    await prisma.$disconnect()
    
    console.log('Database droped')
})