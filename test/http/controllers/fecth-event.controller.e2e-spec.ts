import request from "supertest"
import { Test } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";


describe('Fetch events (E2E)', () => {
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

    test('[GET] /events/get', async () => {
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

        await prisma.events.createMany({
          data: [
            {
              description: 'Evento da semana 007',
              date: '2020-01-11T00:00:00.123Z',
              created_by: academic.id,
            },
            {
              description: 'Evento da semana 008',
              date: '2020-01-11T00:00:00.123Z',
              created_by: academic.id,
            },
            {
              description: 'Evento da semana 009',
              date: '2020-01-11T00:00:00.123Z',
              created_by: academic.id,
            }
          ]
        })

        const response = await request(app.getHttpServer()).get('/events/get').set('Authorization', `Bearer ${ access_token }`)

        expect(response.status).toBe(200) 
        expect(response.body).toEqual({
          events: [
            expect.objectContaining({ description: 'Evento da semana 007' }),
            expect.objectContaining({ description: 'Evento da semana 008' }),
            expect.objectContaining({ description: 'Evento da semana 009' })
          ],
        })
    })
})