export interface EventProps{
    id?: string,
    created_by: string,
    title: string,
    event_date: Date,
    description: string,
    date_created?: Date,
    is_active?: boolean,
}

export class Event {
    private props: EventProps;

    constructor(props: EventProps, id?: string){
        this.props = {
            ...props,
            id: id ?? props.id,
            date_created: props.date_created ?? new Date(),
            is_active: props.is_active ?? true,
        }
    }

    get id(): string {
        return this.props.id!
    }

    get created_by(): string{
        return this.props.created_by!
    }

    get title(): string {
        return this.props.title
    }

    public updateTitle(title: string) {
        this.props.title = title
    }

    get date(): Date {
        return this.props.event_date
    }

    public updateDate(newDate: Date){
        this.props.event_date = newDate
    }

    get description(): string {
        return this.props.description
    }

    public updateDescription(description: string) {
        this.props.description = description
    }

    get eventDate(): Date{
        return this.props.event_date
    }

    public updateEventDate(newDate: Date){
        this.props.event_date = newDate
    }

    get dateCreated(): Date{
        return this.props.date_created!
    }

    get isActive(): boolean{
        return this.props.is_active!
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