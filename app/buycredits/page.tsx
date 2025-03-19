import CheckoutForm from "@/components/stripe/checkoutForm"


export default async function Page() {

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-5xl font-semibold mb-4">Kjøp tokens</h1>
            <p>Trenger du flere dokumenter analysert, eller teste vår premium modell?</p>
            <CheckoutForm uiMode="hosted" />
        </div>
    )
}