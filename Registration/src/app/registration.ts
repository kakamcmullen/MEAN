export class Registration {
    constructor(
        public id: number = null,
        public FirstName: string = '',
        public LastName: string = '',
        public Email: string = '',
        public Password: string = '',
        public PasswordConfirmation: string = '',
        public StreetAdress: string = '',
        public Unit: string = '',
        public City: string = '',
        public State: string = '',
        public Feeling: string = '',
        public Created_at: Date = new Date(),
        public Updated_at: Date = new Date()
    ) {}
}
