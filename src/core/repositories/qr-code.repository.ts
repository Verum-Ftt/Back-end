import { QrCode, QrCodeProps } from '../entities/qr-code.entity';

export interface QrCodeRepository {
    findById(id: string): Promise <QrCode | null>
    findByStudent(student_id: string): Promise <QrCode | null>
    findBySubEvent(sub_event_id: string): Promise <QrCode | null>
    findByLabortory(laboratory_id: string): Promise <QrCode | null>
    findByDateCreated(date_created: Date): Promise <QrCode | null>
    findAll(): Promise <QrCode[]>
    
    create(data: QrCodeProps): Promise <QrCode>
    update(id: string, data: Partial<QrCodeProps>): Promise <QrCode>
    delete(id: string): Promise <boolean>
}

// Token para injeção de dependência
export const QRCODE_REPOSITORY = 'QrCodeRepository'