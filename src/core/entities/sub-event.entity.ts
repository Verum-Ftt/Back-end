export interface SubEventsProps {
    id?: string,
    created_by: string,
    event_id: string,
    subjective_id: string,
    title: string,
    description: string,
    sub_event_date: Date,
    date_created?: Date,
}

export class SubEvent{
    private props: SubEventsProps;

    constructor(props: SubEventsProps, id?: string){
        this.props = {
            ...props,
            id: id ?? props.id,
            date_created: props.date_created ?? new Date()
        }
    }

    get id(): string | undefined{
        return this.props.id
    }

    get createdBy(): string {
        return this.props.created_by
    }

    get eventId(): string {
        return this.props.event_id
    }

    get subjectiveId(): string {
        return this.props.subjective_id
    }

    get title(): string{
        return this.props.title
    }

    public updateTitle(newTitle: string){
        const actualTitle = this.props.title 

        if (newTitle != actualTitle ){
            this.props.title = newTitle
        }
    }

    get description(): string{
        return this.props.description
    }

    public updateDescription(newDescription: string){
        const actualescription = this.props.description 

        if (newDescription != actualescription ){
            this.props.title = newDescription
        }
    }

    get subEventDate(): Date{
        return this.props.sub_event_date
    }

    get dateCreated(): Date | undefined{
        return this.props.date_created
    }

    toJSON(): SubEventsProps {
        return { ...this.props }
    }
}