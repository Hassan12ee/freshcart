export interface Order {
}
export interface OrderRes {
  status:  string;
  session: Session;
}

export interface Session {
  url:         string;
  success_url: string;
  cancel_url:  string;
}
