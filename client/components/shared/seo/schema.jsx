export default async function Schema(object) {
    return (
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(object).replace(/</g, '\\u003c'),
                }}
            />
    )
}