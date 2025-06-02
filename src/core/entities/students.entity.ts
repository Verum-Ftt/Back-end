export interface StudentsProps {
    id?: string,
    name: string,
    email: string,
    active?: boolean,
    phone: string,
    RA: string,
    created_at?: Date,
    period: number,
    course: string,
    class: string,
}

export class Student{
    private props: StudentsProps;

    constructor(props: StudentsProps, id?: string){
        this.props = {
            ...props,
            id: id ?? props.id, // Garante que o id seja atribuído se passado separadamente
            active: props.active ?? true, // Valor padrão
            created_at: props.created_at ?? new Date(), // Valor padrão
        }
    }

    get id(): string | undefined{
        return this.props.id
    }

    get name(): string | undefined{
        return this.props.name
    }

    get email(): string | undefined{
        return this.props.email
    }

    set email(email: string){
        if(!email.includes('@')){
            throw new Error('Invalid email format.')
        }
    }

}