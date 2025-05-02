import request from "supertest"
import { Test } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";


describe('Create events (E2E)', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let jwt: JwtService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
    
        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)
        jwt = moduleRef.get(JwtService)

        await app.init();
      });

    test('[POST] /events', async () => {
        const academic = await prisma.academics.create({
            data:{
                name: 'Jhon Doe',
                email: 'JhonDoe@example.com',
                phone: '2655467',
                RA: '09876858',
                password: 'Seven',
            }
        })
        
        const access_token = jwt.sign({ sub: academic.id })

        const response = await request(app.getHttpServer())
          .post('/events')
          .set('Authorization', `Bearer ${access_token}`)
          .send({
              description: 'Evento da semana 007',
              date: '2020-01-11T00:00:00.123Z',
              created_by: academic.id,
          })

        expect(response.status).toBe(201) 

        const eventOnDatabase = await prisma.events.findFirst({
          where: {
            description: 'Evento da semana 007',
          }
        })

        expect(eventOnDatabase).toBeTruthy()
    })
})