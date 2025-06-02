export interface EventProps{
    id?: string,
    created_by?: string,
    title: string,
    date: Date,
    description: string,
    created_at: Date,
    is_active: boolean,
}

export class Event {
    private props: EventProps;

    constructor(props: EventProps, id?: string){
        this.props = {
            ...props,
            id: id ?? props.id,
            created_at: props.created_at ?? new Date(),
            is_active: props.is_active ?? true,
        }
    }

    get id(): string | undefined {
        return this.props.id
    }

    get created_by(): string | undefined {
        return this.props.created_by
    }

    get title(): string {
        return this.props.title
    }

    set title(title: string) {
        this.props.title = title
    }

    get date(): Date {
        return this.props.date
    }

    set date(date: Date){
        this.props.date = date
    }

    get description(): string {
        return this.props.description
    }

    set description(description: string) {
        this.props.description = description
    }

    activate(): void {
        this.props.is_active = true
    }

    desactivate(): void {
        this.props.is_active = false
    }

    toJSON(): EventProps {
        return { ...this.props }
    }
}