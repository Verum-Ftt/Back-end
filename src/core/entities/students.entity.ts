export interface StudentsProps {
    id?: string,
    name: string,
    email: string,
    active?: boolean,
    phone: string,
    RA: string,
    date_created?: Date,
    period: number,
    course: string,
    grade: string,
}

export class Student{
    private props: StudentsProps;

    constructor(props: StudentsProps, id?: string){
        this.props = {
            ...props,
            id: id ?? props.id, 
            active: props.active ?? true, 
            date_created: props.date_created ?? new Date(), 
        }
    }

    get id(): string | undefined {
        return this.props.id
    }

    get name(): string {
        return this.props.name
    }

    public updateName(name: string) {
        if (name.length < 3) {
            throw new Error('O nome deve ter pelo menos 3 caracteres.')
        }
        this.props.name = name
    }

    get email(): string {
        return this.props.email
    }

    public updateEmail(email: string) {
        if (!email.includes('@')) {
            throw new Error('Invalid email format.')
        }
        this.props.email = email
    }

    get active(): boolean {
        return this.props.active! // O '!' assume que 'active' sempre terá um valor devido ao construtor
    }

    activate(): void {
        if (!this.props.active) {
            this.props.active = true;
        }
    }

    desactivate(): void {
        if (this.props.active) {
            this.props.active = false;
        }
    }

    get phone(): string {
        return this.props.phone
    }

    public updatePhone(phone: string) {
        this.props.phone = phone
    }

    get RA(): string {
        return this.props.RA
    }

    public updateRA(RA: string) {
        this.props.RA = RA
    }

    get date_created(): Date {
        return this.props.date_created!
    }

    get period(): number{
        return this.props.period
    }

    public updatePeriod(period: number) {
        this.props.period = period
    }

    get course(): string{
        return this.props.course
    }

    public updateCourse(course: string){
        this.props.course = course
    }

    get grade(): string{
        return this.props.grade
    }

    public updateGrade(grade: string) {
        this.props.grade = grade
    }

    // Método para converter a entidade para um objeto simples (DTO ou para persistência)
    toJSON(): StudentsProps {
        return { ...this.props }
    }
}