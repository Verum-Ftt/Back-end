export interface AcademicProps {
  id?: string,
  name: string,
  email: string,
  active?: boolean, 
  phone: string,
  RA: string,
  password: string,
  created_at?: Date, 
}

export class Academic {
  private props: AcademicProps

  constructor(props: AcademicProps, id?: string) {
    this.props = {
      ...props,
      id: id ?? props.id, 
      active: props.active ?? true, // Valor padrão
      created_at: props.created_at ?? new Date(), // Valor padrão
    }
  }

  get id(): string | undefined {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    if (name.length < 3) {
      throw new Error('O nome deve ter pelo menos 3 caracteres.')
    }
    this.props.name = name
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    if (!email.includes('@')) {
      throw new Error('Invalid email format.')
    }
    this.props.email = email
  }

  get active(): boolean {
    return this.props.active! // O '!' assume que 'active' sempre terá um valor devido ao construtor
  }

  activate(): void {
    this.props.active = true
  }

  desactivate(): void {
    this.props.active = false
  }

  get phone(): string {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
  }

  get RA(): string {
    return this.props.RA
  }

  set RA(RA: string) {
    this.props.RA = RA
  }

  // Não expor o setter de senha diretamente se for hasheada.

  get created_at(): Date {
    return this.props.created_at!
  }

  // Método para converter a entidade para um objeto simples (DTO ou para persistência)
  toJSON(): AcademicProps {
    return { ...this.props }
  }
}