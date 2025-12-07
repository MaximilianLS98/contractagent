import { headers } from "next/headers";
import HistoryPage from "./clientPage";


export default async function Page() {
    const history = await fetch('http://localhost:3000/api/history', {
		headers: {
			// Forward cookies to the API route
			cookie: (await headers()).get('cookie') ?? '',
		},
	});
    const historyData = await history.json()
    return (
        <div>
            <HistoryPage documentsLive={historyData.documents} />
        </div>
    )
}
