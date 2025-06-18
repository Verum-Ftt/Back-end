export interface QrCodeProps{
    id?: string,
    student_id: string,
    sub_event_id: string,
    laboratory_id?: string,
    date_created?: Date,
    update_at?: Date,
    image: string,
    valid?: boolean,
    randomization_version: number,
}

export class QrCode {
    private props: QrCodeProps

    constructor(props: QrCodeProps, id?:string){
        this.props = {
            ...props,
            id: id ?? props.id,
            valid: props.valid ?? true,
            date_created: props.date_created ?? new Date(),
            update_at: props.update_at ?? new Date(),
            randomization_version: props.randomization_version ?? 1,
            laboratory_id: props.laboratory_id,
        }

        if (!this.props.student_id){
            throw new Error('Student ID is mandatory')
        }
        if (!this.props.sub_event_id){
            throw new Error('Sub event ID is mandatory')
        }
        if (!this.props.image){
            throw new Error('Image is mandatory')
        }
    }

    get id(): string | undefined{
        return this.props.id
    }

    get student_id(): string | undefined{
        return this.props.student_id
    }

    get laboratory_id(): string | undefined{
        return this.props.laboratory_id
    }

    get sub_event_id(): string | undefined{
        return this.props.sub_event_id
    }

    get date_created(): Date | undefined{
        return this.props.date_created!
    }

    get image(): string{
        return this.props.image
    }

    get dateCreated(): Date | undefined{
        return this.props.date_created!
    }

    get updateAt(): Date | undefined{
        return this.props.update_at!
    }

    public valid(): void{
        if (!this.props.valid) {
            this.props.valid = false;
        }
    }

    public unvalidate(): void{
        if (this.props.valid) {
            this.props.valid = false;
        }
    }
    
    public updateImage(newImage: string): void{
        if(!newImage){
            throw new Error('The new image cannot be empty.')
        }
        this.props.image = newImage
        this.touch()
    }

    public incrementrandomizationVersion(): void{
        this.props.randomization_version += 1
    }

    private touch(): void { 
        this.props.update_at = new Date();
    }

    public toJSON(): QrCodeProps {
        return { ...this.props }
    }
}