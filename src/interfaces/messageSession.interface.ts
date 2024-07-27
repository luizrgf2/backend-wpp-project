export interface MessageSessionInterface {
    qr?: string,
    state: "logged" | "await" | "diconnected"
}