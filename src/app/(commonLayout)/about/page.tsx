export const dynamic = "force-dynamic"; // this page will be rendered on each request, but not bild at build time

export default async function AboutPage() {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // throw new Error("This is an error from about page.");
    return (
        <div>
            <h1>This is about page component.</h1>
        </div>
    )
}