export async function loadFonts() {
    const webFontLoader = await import("webfontloader");

    webFontLoader.load({
        google: {
            families: ["Lato: 100,200,300,400,500,600,700"],
        },
    });
}
