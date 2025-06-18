export interface SubjectivesProps{
    id?: string,
    created_by: string,
    title: string,
    description: string,
    date_created?: Date,
}

export class Subjectives {
    private props: SubjectivesProps

    constructor(props: SubjectivesProps, id?: string){
        this.props = {
            ...props,
            id: id ?? props.id,
            date_created: props.date_created ?? new Date()
        }
    }

    get id(): string | undefined {
        return this.props.id
    }

    get created_by(): string | undefined {
        return this.props.created_by
    }

    get title(): string{
        return this.props.title
    }

    get description(): string{
        return this.props.description
    }

    get date_created(): Date | undefined{
        return this.props.date_created
    }

    toJSON(): SubjectivesProps {
        return { ...this.props }
    }
}