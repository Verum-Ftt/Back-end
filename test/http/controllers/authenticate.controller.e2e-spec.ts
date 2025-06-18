import request from "supertest"
import { hash } from "bcryptjs";
import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "@/infrastructure/database/prisma/prisma.service";

describe('Authenticate (E2E)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
    
        app = moduleRef.createNestApplication()

        prisma = moduleRef.get(PrismaService)

        await app.init();
      });

    test('[POST] /sessions', async () => {
        await prisma.academic.create({
            data:{
                name: 'Jhon Doe',
                email: 'Jhon@example.com',
                phone: '413241',
                RA: '123412',
                password: await hash('Seven', 8)
            }
        })

        const response = await request(app.getHttpServer()).post('/sessions').send({
            email: 'Jhon@example.com',
            password: 'Seven',
        })

        expect(response.status).toBe(201) 
        expect(response.body).toEqual({
            access_token: expect.any(String),
        })
    })
})