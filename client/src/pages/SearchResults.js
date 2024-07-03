import { useLocation } from "react-router-dom";

export default function SearchResults() {
    const query = new URLSearchParams(useLocation().search).get('query');

    return (
        <>
        Results for {query}
        </>
    )

}