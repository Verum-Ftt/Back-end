import request from "supertest"
import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "@/infrastructure/database/prisma/prisma.service";


describe('Create academic (E2E)', () => {
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

    test('[POST] /academics', async () => {
        const response = await request(app.getHttpServer()).post('/academics').send({
            name: 'Jhon Doe',
            email: 'JhonDoe@example.com',
            phone: '2655467',
            RA: '09876858',
            password: 'Seven',
        })

        expect(response.status).toBe(201) 

        const usersOnDatabase = await prisma.academics.findUnique({
          where: {
            email: 'JhonDoe@example.com',
          }
        })

        expect(usersOnDatabase).toBeTruthy()
    })
})